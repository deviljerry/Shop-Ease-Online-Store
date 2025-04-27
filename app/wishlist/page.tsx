"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Trash2, Share2, Filter } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// Mock wishlist data
const initialWishlistItems = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    oldPrice: 39.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
    category: "clothing",
    isNew: true,
    inStock: true,
  },
  {
    id: 2,
    name: "Wireless Bluetooth Earbuds",
    price: 89.99,
    oldPrice: 119.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1770&auto=format&fit=crop",
    category: "electronics",
    inStock: true,
  },
  {
    id: 3,
    name: "Organic Fruit Basket",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop",
    category: "food",
    inStock: false,
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 149.99,
    oldPrice: 199.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
    category: "electronics",
    inStock: true,
  },
  {
    id: 5,
    name: "Gourmet Coffee Beans",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop",
    category: "food",
    inStock: true,
  },
  {
    id: 6,
    name: "Wireless Headphones",
    price: 129.99,
    oldPrice: 159.99,
    discount: 19,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    category: "electronics",
    inStock: true,
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  // Filter items based on active tab and search term
  const filteredItems = wishlistItems.filter((item) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "inStock" && item.inStock) ||
      (activeTab === "outOfStock" && !item.inStock) ||
      activeTab === item.category

    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesTab && matchesSearch
  })

  // Sort items based on selected sort option
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "discount":
        const discountA = a.discount || 0
        const discountB = b.discount || 0
        return discountB - discountA
      default: // newest
        return b.id - a.id
    }
  })

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  const addToCart = (id: number) => {
    // In a real app, you would add the item to the cart here
    alert(`Added item ${id} to cart!`)
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
            My Wishlist
          </h1>
          <p className="text-muted-foreground">Items you've saved for later</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearWishlist}
            disabled={wishlistItems.length === 0}
            className="border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-950 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Wishlist
          </Button>
        </div>
      </div>

      {wishlistItems.length > 0 ? (
        <>
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-3/4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Search wishlist..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    <Heart className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="discount">Biggest Discount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950/30 dark:to-purple-950/30">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                  >
                    All Items
                  </TabsTrigger>
                  <TabsTrigger
                    value="inStock"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                  >
                    In Stock
                  </TabsTrigger>
                  <TabsTrigger
                    value="outOfStock"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                  >
                    Out of Stock
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedItems.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl group"
                  >
                    <div className="relative h-48 w-full bg-gray-100">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {item.isNew && (
                        <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600">New</Badge>
                      )}
                      {item.discount && (
                        <Badge variant="destructive" className="absolute top-2 left-2">
                          -{item.discount}%
                        </Badge>
                      )}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Badge variant="outline" className="text-white border-white text-lg">
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          className="flex-1 bg-white text-pink-600 hover:bg-white/90"
                          onClick={() => addToCart(item.id)}
                          disabled={!item.inStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium line-clamp-1">{item.name}</h3>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-pink-500"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-pink-500"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold">${item.price.toFixed(2)}</span>
                        {item.oldPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="capitalize">
                          {item.category}
                        </Badge>
                        <Badge
                          variant={item.inStock ? "secondary" : "outline"}
                          className={
                            item.inStock
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : "text-red-500"
                          }
                        >
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="md:w-1/4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Wishlist Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Items:</span>
                    <span className="font-bold">{wishlistItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>In Stock:</span>
                    <span className="font-bold">{wishlistItems.filter((item) => item.inStock).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Out of Stock:</span>
                    <span className="font-bold">{wishlistItems.filter((item) => !item.inStock).length}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span>Total Value:</span>
                    <span className="font-bold">
                      ${wishlistItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <Button
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    onClick={() => {
                      // Add all in-stock items to cart
                      alert("Added all in-stock items to cart!")
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add All to Cart
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => router.push("/products")}>
                    Continue Shopping
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-pink-50 dark:bg-pink-950/30 rounded-lg">
                  <h3 className="font-medium mb-2">Wishlist Tips</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Items in your wishlist will be saved for 30 days
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      You'll be notified when wishlist items go on sale
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Share your wishlist with friends and family
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="h-24 w-24 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-pink-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Add items to your wishlist by clicking the heart icon on products you love.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            onClick={() => router.push("/products")}
          >
            Explore Products
          </Button>
        </div>
      )}

      {wishlistItems.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                id: 101,
                name: "Designer Sunglasses",
                price: 129.99,
                image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1980&auto=format&fit=crop",
                category: "accessories",
              },
              {
                id: 102,
                name: "Leather Wallet",
                price: 49.99,
                image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1974&auto=format&fit=crop",
                category: "accessories",
              },
              {
                id: 103,
                name: "Fitness Tracker",
                price: 89.99,
                image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=2088&auto=format&fit=crop",
                category: "electronics",
              },
              {
                id: 104,
                name: "Scented Candle Set",
                price: 34.99,
                image: "https://images.unsplash.com/photo-1608181831718-c9ffd8dff25f?q=80&w=1974&auto=format&fit=crop",
                category: "home",
              },
            ].map((item) => (
              <Card key={item.id} className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl group">
                <div className="relative h-48 w-full bg-gray-100">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button className="bg-white text-black hover:bg-white/90">View Product</Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-1">{item.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold">${item.price.toFixed(2)}</span>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-pink-500">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
