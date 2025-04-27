"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { categories, featuredProducts } from "@/lib/data"

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string

  const category = categories.find((c) => c.slug === slug)
  const [products, setProducts] = useState(featuredProducts.filter((p) => p.category === slug))

  const [filters, setFilters] = useState({
    priceRange: [0, 200],
    colors: [] as string[],
    onSale: false,
    inStock: false,
    search: "",
  })

  useEffect(() => {
    // Filter products based on selected filters
    let filtered = featuredProducts.filter((p) => p.category === slug)

    // Price range filter
    filtered = filtered.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])

    // Colors filter
    if (filters.colors.length > 0) {
      // This is a mock filter since we don't have color data in our products
      // In a real app, you would filter by the product's color
    }

    // Sale filter
    if (filters.onSale) {
      filtered = filtered.filter((p) => p.discount > 0)
    }

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.description.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    setProducts(filtered)
  }, [slug, filters])

  const handlePriceChange = (value: number[]) => {
    setFilters({ ...filters, priceRange: value })
  }

  const handleColorToggle = (color: string) => {
    setFilters({
      ...filters,
      colors: filters.colors.includes(color) ? filters.colors.filter((c) => c !== color) : [...filters.colors, color],
    })
  }

  if (!category) {
    return <div className="container mx-auto px-4 py-12">Category not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-8">
        <Link href="/categories" className="text-sm text-muted-foreground hover:text-primary">
          Categories
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm font-medium">{category.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <div className="relative">
              <Input
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full"
              />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-4">Price Range</h3>
            <div className="space-y-4">
              <Slider
                defaultValue={[0, 200]}
                max={200}
                step={1}
                value={filters.priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex items-center justify-between">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-4">Color</h3>
            <div className="space-y-2">
              {["Black", "White", "Red", "Blue", "Green"].map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={filters.colors.includes(color.toLowerCase())}
                    onCheckedChange={() => handleColorToggle(color.toLowerCase())}
                  />
                  <Label htmlFor={`color-${color}`}>{color}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-4">Product Status</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="on-sale"
                  checked={filters.onSale}
                  onCheckedChange={(checked) => setFilters({ ...filters, onSale: checked as boolean })}
                />
                <Label htmlFor="on-sale">On Sale</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={filters.inStock}
                  onCheckedChange={(checked) => setFilters({ ...filters, inStock: checked as boolean })}
                />
                <Label htmlFor="in-stock">In Stock</Label>
              </div>
            </div>
          </div>

          <Separator />

          <Button
            variant="outline"
            className="w-full"
            onClick={() =>
              setFilters({
                priceRange: [0, 200],
                colors: [],
                onSale: false,
                inStock: false,
                search: "",
              })
            }
          >
            Reset Filters
          </Button>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="text-muted-foreground">{products.length} products</p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl group">
                    <div className="relative h-48 w-full bg-gray-100">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">New</Badge>
                      )}
                      {product.discount > 0 && (
                        <Badge variant="destructive" className="absolute top-2 left-2">
                          -{product.discount}%
                        </Badge>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button className="bg-white text-black hover:bg-white/90 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          View Product
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">${product.price.toFixed(2)}</span>
                          {product.oldPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-muted-foreground"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search term to find what you're looking for.
              </p>
              <Button
                onClick={() =>
                  setFilters({
                    priceRange: [0, 200],
                    colors: [],
                    onSale: false,
                    inStock: false,
                    search: "",
                  })
                }
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
