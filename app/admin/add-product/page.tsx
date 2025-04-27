"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Upload, X, Plus, Save, ArrowLeft } from "lucide-react"
import { categories } from "@/lib/data"

export default function AddProductPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [productImages, setProductImages] = useState<string[]>(["/placeholder.svg?height=300&width=300"])
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    cost: "",
    sku: "",
    barcode: "",
    category: "",
    tags: "",
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    inventory: "100",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    variants: [] as { color: string; size: string; price: string; stock: string }[],
    seo: {
      title: "",
      description: "",
      keywords: "",
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setProductData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleNestedChange = (parent: string, name: string, value: string) => {
    setProductData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [name]: value,
      },
    }))
  }

  const handleAddVariant = () => {
    setProductData((prev) => ({
      ...prev,
      variants: [...prev.variants, { color: "Black", size: "M", price: productData.price, stock: "10" }],
    }))
  }

  const handleRemoveVariant = (index: number) => {
    setProductData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }))
  }

  const handleUpdateVariant = (index: number, field: string, value: string) => {
    setProductData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) => (i === index ? { ...variant, [field]: value } : variant)),
    }))
  }

  const handleAddImage = () => {
    setProductImages([...productImages, "/placeholder.svg?height=300&width=300"])
  }

  const handleRemoveImage = (index: number) => {
    setProductImages(productImages.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send the product data to your backend here
    console.log("Product data:", productData)
    console.log("Product images:", productImages)
    alert("Product added successfully!")
    router.push("/admin/products")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Add New Product</h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/admin/products">Cancel</Link>
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Save Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details about your product.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter product name"
                      value={productData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Enter product description"
                      rows={5}
                      value={productData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="0.00"
                        value={productData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="comparePrice">Compare at Price ($)</Label>
                      <Input
                        id="comparePrice"
                        name="comparePrice"
                        type="number"
                        placeholder="0.00"
                        value={productData.comparePrice}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cost">Cost per item ($)</Label>
                      <Input
                        id="cost"
                        name="cost"
                        type="number"
                        placeholder="0.00"
                        value={productData.cost}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                      <Input
                        id="sku"
                        name="sku"
                        placeholder="SKU-123456"
                        value={productData.sku}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="barcode">Barcode (ISBN, UPC, GTIN, etc.)</Label>
                      <Input
                        id="barcode"
                        name="barcode"
                        placeholder="123456789012"
                        value={productData.barcode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={productData.category}
                        onValueChange={(value) => setProductData({ ...productData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.slug}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        name="tags"
                        placeholder="summer, sale, new"
                        value={productData.tags}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Product Status</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isNew"
                          checked={productData.isNew}
                          onCheckedChange={(checked) => handleCheckboxChange("isNew", checked as boolean)}
                        />
                        <Label htmlFor="isNew">New Arrival</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isFeatured"
                          checked={productData.isFeatured}
                          onCheckedChange={(checked) => handleCheckboxChange("isFeatured", checked as boolean)}
                        />
                        <Label htmlFor="isFeatured">Featured Product</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isOnSale"
                          checked={productData.isOnSale}
                          onCheckedChange={(checked) => handleCheckboxChange("isOnSale", checked as boolean)}
                        />
                        <Label htmlFor="isOnSale">On Sale</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory</CardTitle>
                  <CardDescription>Manage your product inventory and shipping information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="inventory">Inventory quantity</Label>
                    <Input
                      id="inventory"
                      name="inventory"
                      type="number"
                      placeholder="0"
                      value={productData.inventory}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        placeholder="0.0"
                        value={productData.weight}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="length">Length (cm)</Label>
                      <Input
                        id="length"
                        type="number"
                        placeholder="0.0"
                        value={productData.dimensions.length}
                        onChange={(e) => handleNestedChange("dimensions", "length", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width">Width (cm)</Label>
                      <Input
                        id="width"
                        type="number"
                        placeholder="0.0"
                        value={productData.dimensions.width}
                        onChange={(e) => handleNestedChange("dimensions", "width", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="0.0"
                        value={productData.dimensions.height}
                        onChange={(e) => handleNestedChange("dimensions", "height", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Upload images of your product. The first image will be used as the product thumbnail.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {productImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="relative aspect-square rounded-md overflow-hidden border bg-muted">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Product image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        {index === 0 && (
                          <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                    <div
                      className="border border-dashed rounded-md aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={handleAddImage}
                    >
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Add Image</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="variants" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Variants</CardTitle>
                  <CardDescription>Add variants for different colors, sizes, or other attributes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {productData.variants.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-12 gap-4 font-medium text-sm">
                        <div className="col-span-3">Color</div>
                        <div className="col-span-3">Size</div>
                        <div className="col-span-2">Price</div>
                        <div className="col-span-2">Stock</div>
                        <div className="col-span-2"></div>
                      </div>
                      {productData.variants.map((variant, index) => (
                        <div key={index} className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-3">
                            <Select
                              value={variant.color}
                              onValueChange={(value) => handleUpdateVariant(index, "color", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Black">Black</SelectItem>
                                <SelectItem value="White">White</SelectItem>
                                <SelectItem value="Red">Red</SelectItem>
                                <SelectItem value="Blue">Blue</SelectItem>
                                <SelectItem value="Green">Green</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-3">
                            <Select
                              value={variant.size}
                              onValueChange={(value) => handleUpdateVariant(index, "size", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="XS">XS</SelectItem>
                                <SelectItem value="S">S</SelectItem>
                                <SelectItem value="M">M</SelectItem>
                                <SelectItem value="L">L</SelectItem>
                                <SelectItem value="XL">XL</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="col-span-2">
                            <Input
                              type="number"
                              value={variant.price}
                              onChange={(e) => handleUpdateVariant(index, "price", e.target.value)}
                              placeholder="0.00"
                            />
                          </div>
                          <div className="col-span-2">
                            <Input
                              type="number"
                              value={variant.stock}
                              onChange={(e) => handleUpdateVariant(index, "stock", e.target.value)}
                              placeholder="0"
                            />
                          </div>
                          <div className="col-span-2 flex justify-end">
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveVariant(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No variants added yet.</p>
                    </div>
                  )}
                  <Button variant="outline" onClick={handleAddVariant}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Variant
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Information</CardTitle>
                  <CardDescription>Optimize your product for search engines.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seoTitle">Page Title</Label>
                    <Input
                      id="seoTitle"
                      placeholder="Enter page title"
                      value={productData.seo.title}
                      onChange={(e) => handleNestedChange("seo", "title", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Recommended length: 50-60 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seoDescription">Meta Description</Label>
                    <Textarea
                      id="seoDescription"
                      placeholder="Enter meta description"
                      rows={3}
                      value={productData.seo.description}
                      onChange={(e) => handleNestedChange("seo", "description", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Recommended length: 150-160 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seoKeywords">Meta Keywords</Label>
                    <Input
                      id="seoKeywords"
                      placeholder="keyword1, keyword2, keyword3"
                      value={productData.seo.keywords}
                      onChange={(e) => handleNestedChange("seo", "keywords", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Product Preview</CardTitle>
              <CardDescription>Preview how your product will look on the store.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md overflow-hidden border">
                <div className="relative aspect-square bg-muted">
                  <Image
                    src={productImages[0] || "/placeholder.svg"}
                    alt="Product preview"
                    fill
                    className="object-cover"
                  />
                  {productData.isNew && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      New
                    </div>
                  )}
                  {productData.isOnSale && productData.comparePrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Sale</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium line-clamp-1">{productData.name || "Product Name"}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {productData.description || "Product description will appear here."}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="font-bold">${productData.price || "0.00"}</span>
                    {productData.comparePrice && (
                      <span className="text-sm text-muted-foreground line-through">${productData.comparePrice}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium">
                    {productData.inventory && Number.parseInt(productData.inventory) > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">
                    {productData.category
                      ? categories.find((c) => c.slug === productData.category)?.name || productData.category
                      : "Uncategorized"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Variants:</span>
                  <span className="font-medium">{productData.variants.length}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubmit}>
                <Save className="h-4 w-4 mr-2" />
                Save Product
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
