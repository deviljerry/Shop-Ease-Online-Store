"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, ThumbsUp, ThumbsDown, Filter, MessageSquare } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { featuredProducts } from "@/lib/data"

// Mock reviews data
const reviews = [
  {
    id: 1,
    productId: 1,
    productName: "Premium Cotton T-Shirt",
    productImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
    rating: 5,
    title: "Excellent quality and fit",
    content:
      "This t-shirt is amazing! The fabric is soft and comfortable, and the fit is perfect. I've already ordered two more in different colors.",
    author: "Michael T.",
    date: "2023-05-15",
    helpful: 24,
    unhelpful: 2,
    verified: true,
    images: ["https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1974&auto=format&fit=crop"],
  },
  {
    id: 2,
    productId: 2,
    productName: "Wireless Bluetooth Earbuds",
    productImage: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1770&auto=format&fit=crop",
    rating: 4,
    title: "Great sound quality",
    content:
      "The sound quality is excellent and the battery life is impressive. The only reason I'm giving 4 stars instead of 5 is because the ear tips could be more comfortable for extended wear.",
    author: "Sarah J.",
    date: "2023-06-02",
    helpful: 18,
    unhelpful: 3,
    verified: true,
    images: [],
  },
  {
    id: 3,
    productId: 5,
    productName: "Running Shoes",
    productImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    title: "Perfect for long runs",
    content:
      "These shoes are incredibly comfortable and provide great support. I've been using them for my marathon training and they've been perfect. Highly recommend!",
    author: "David W.",
    date: "2023-04-28",
    helpful: 32,
    unhelpful: 1,
    verified: true,
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop"],
  },
  {
    id: 4,
    productId: 6,
    productName: "Smart Watch",
    productImage: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
    rating: 3,
    title: "Good but battery life is disappointing",
    content:
      "The watch has great features and looks stylish, but the battery life is not as advertised. I need to charge it every day, which is inconvenient.",
    author: "Emily R.",
    date: "2023-05-20",
    helpful: 15,
    unhelpful: 5,
    verified: true,
    images: [],
  },
  {
    id: 5,
    productId: 3,
    productName: "Organic Fruit Basket",
    productImage: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    title: "Fresh and delicious",
    content:
      "All the fruits were perfectly ripe and incredibly fresh. The packaging was also eco-friendly, which I appreciate. Will definitely order again!",
    author: "Jessica P.",
    date: "2023-06-10",
    helpful: 12,
    unhelpful: 0,
    verified: true,
    images: ["https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=2070&auto=format&fit=crop"],
  },
  {
    id: 6,
    productId: 1,
    productName: "Premium Cotton T-Shirt",
    productImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
    rating: 2,
    title: "Shrunk after washing",
    content:
      "The shirt looked great initially, but it shrunk significantly after the first wash, even though I followed the care instructions. Very disappointed.",
    author: "Robert K.",
    date: "2023-05-25",
    helpful: 8,
    unhelpful: 3,
    verified: true,
    images: [],
  },
]

// Mock user's reviews
const userReviews = [
  {
    id: 101,
    productId: 8,
    productName: "Gourmet Coffee Beans",
    productImage: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    title: "Best coffee I've ever had",
    content:
      "These coffee beans make the most amazing brew. Rich flavor with hints of chocolate and caramel. Will definitely buy again!",
    date: "2023-05-05",
    helpful: 7,
    unhelpful: 0,
    status: "published",
  },
  {
    id: 102,
    productId: 11,
    productName: "Wireless Headphones",
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    rating: 4,
    title: "Great sound, comfortable fit",
    content:
      "These headphones have excellent sound quality and are very comfortable to wear for long periods. Battery life is also impressive.",
    date: "2023-04-18",
    helpful: 12,
    unhelpful: 1,
    status: "published",
  },
]

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterRating, setFilterRating] = useState("all")

  // Filter reviews based on active tab, search term, and rating filter
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRating = filterRating === "all" || review.rating === Number.parseInt(filterRating)

    return matchesSearch && matchesRating
  })

  // Sort reviews based on selected sort option
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      case "helpful":
        return b.helpful - a.helpful
      default: // newest
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
            Product Reviews
          </h1>
          <p className="text-muted-foreground">See what our customers are saying about our products</p>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950/30 dark:to-purple-950/30">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
          >
            All Reviews
          </TabsTrigger>
          <TabsTrigger
            value="my-reviews"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
          >
            My Reviews
          </TabsTrigger>
          <TabsTrigger
            value="to-review"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
          >
            To Review
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-3/4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Search reviews..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterRating} onValueChange={setFilterRating}>
                      <SelectTrigger className="w-[150px]">
                        <Star className="h-4 w-4 mr-2 text-yellow-400" />
                        <SelectValue placeholder="Filter by rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Ratings</SelectItem>
                        <SelectItem value="5">5 Stars</SelectItem>
                        <SelectItem value="4">4 Stars</SelectItem>
                        <SelectItem value="3">3 Stars</SelectItem>
                        <SelectItem value="2">2 Stars</SelectItem>
                        <SelectItem value="1">1 Star</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[150px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="highest">Highest Rated</SelectItem>
                        <SelectItem value="lowest">Lowest Rated</SelectItem>
                        <SelectItem value="helpful">Most Helpful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {sortedReviews.length > 0 ? (
                <div className="space-y-6">
                  {sortedReviews.map((review) => (
                    <Card key={review.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Link href={`/products/${review.productId}`} className="shrink-0">
                            <div className="relative h-20 w-20 rounded-md overflow-hidden">
                              <Image
                                src={review.productImage || "/placeholder.svg"}
                                alt={review.productName}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <Link
                                href={`/products/${review.productId}`}
                                className="hover:text-pink-500 transition-colors"
                              >
                                <h3 className="font-medium">{review.productName}</h3>
                              </Link>
                              <div className="flex items-center gap-2">
                                {renderStars(review.rating)}
                                <span className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <h4 className="font-medium mt-2">{review.title}</h4>
                            <p className="text-muted-foreground mt-1">{review.content}</p>

                            {review.images && review.images.length > 0 && (
                              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                                {review.images.map((image, index) => (
                                  <div key={index} className="relative h-16 w-16 rounded-md overflow-hidden shrink-0">
                                    <Image
                                      src={image || "/placeholder.svg"}
                                      alt={`Review image ${index + 1}`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-medium">By {review.author}</span>
                                {review.verified && (
                                  <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                                    Verified Purchase
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ThumbsUp className="h-4 w-4" />
                                  </Button>
                                  <span className="text-sm">{review.helpful}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ThumbsDown className="h-4 w-4" />
                                  </Button>
                                  <span className="text-sm">{review.unhelpful}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No reviews found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    We couldn't find any reviews matching your criteria. Try adjusting your filters or search term.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setFilterRating("all")
                      setSortBy("newest")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>

            <div className="md:w-1/4">
              <div className="sticky top-20 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Review Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-medium">{reviews.filter((r) => r.rating === 5).length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="h-5 w-5 text-gray-300" />
                        </div>
                        <span className="font-medium">{reviews.filter((r) => r.rating === 4).length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          {[...Array(3)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                          {[...Array(2)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-gray-300" />
                          ))}
                        </div>
                        <span className="font-medium">{reviews.filter((r) => r.rating === 3).length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          {[...Array(2)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                          {[...Array(3)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-gray-300" />
                          ))}
                        </div>
                        <span className="font-medium">{reviews.filter((r) => r.rating === 2).length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-gray-300" />
                          ))}
                        </div>
                        <span className="font-medium">{reviews.filter((r) => r.rating === 1).length}</span>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="text-center">
                      <div className="text-3xl font-bold">
                        {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)}
                      </div>
                      <div className="flex justify-center mt-1">
                        {renderStars(
                          Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length),
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Based on {reviews.length} reviews</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Popular Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {featuredProducts.slice(0, 3).map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="relative h-14 w-14 rounded-md overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform group-hover:scale-110"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm line-clamp-1 group-hover:text-pink-500 transition-colors">
                              {product.name}
                            </h4>
                            <div className="flex items-center mt-1">
                              {renderStars(4)}
                              <span className="text-xs text-muted-foreground ml-1">(24)</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4" asChild>
                      <Link href="/products">View All Products</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="my-reviews" className="space-y-6">
          {userReviews.length > 0 ? (
            <div className="space-y-6">
              {userReviews.map((review) => (
                <Card key={review.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Link href={`/products/${review.productId}`} className="shrink-0">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden">
                          <Image
                            src={review.productImage || "/placeholder.svg"}
                            alt={review.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <Link
                            href={`/products/${review.productId}`}
                            className="hover:text-pink-500 transition-colors"
                          >
                            <h3 className="font-medium">{review.productName}</h3>
                          </Link>
                          <div className="flex items-center gap-2">
                            {renderStars(review.rating)}
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <h4 className="font-medium mt-2">{review.title}</h4>
                        <p className="text-muted-foreground mt-1">{review.content}</p>

                        <div className="flex items-center justify-between mt-4">
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            {review.status === "published" ? "Published" : "Pending"}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">You haven't written any reviews yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Share your thoughts on products you've purchased to help other shoppers make informed decisions.
              </p>
              <Button
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                onClick={() => setActiveTab("to-review")}
              >
                Write a Review
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="to-review" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.slice(0, 6).map((product) => (
              <Card key={product.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Link href={`/products/${product.id}`} className="shrink-0">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${product.id}`} className="hover:text-pink-500 transition-colors">
                        <h3 className="font-medium">{product.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        Purchased on {new Date().toLocaleDateString()}
                      </p>
                      <Button
                        className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                        onClick={() => {
                          // Open review form
                        }}
                      >
                        Write a Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 rounded-lg p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
            <p className="text-muted-foreground mb-6">
              Your reviews help other shoppers make informed decisions and help us improve our products and services.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                  <span className="text-pink-500 font-medium">1</span>
                </div>
                <span>Purchase a product</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                  <span className="text-pink-500 font-medium">2</span>
                </div>
                <span>Try it out and form your opinion</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                  <span className="text-pink-500 font-medium">3</span>
                </div>
                <span>Share your thoughts in a review</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Write a Sample Review</h3>
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-8 w-8 cursor-pointer ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-title">Review Title</Label>
                <Input id="review-title" placeholder="Summarize your experience" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-content">Your Review</Label>
                <Textarea
                  id="review-content"
                  placeholder="What did you like or dislike? What did you use this product for?"
                  rows={4}
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                Submit Sample Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
