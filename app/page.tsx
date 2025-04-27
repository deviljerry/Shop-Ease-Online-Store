import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCarousel from "@/components/product-carousel"
import { featuredProducts, categories } from "@/lib/data"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 py-8">
      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Shop by Category</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Explore our wide selection of products across various categories to find exactly what you need
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl group">
                <div className="relative h-32 w-full bg-gradient-to-r from-pink-500 to-purple-600">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover mix-blend-overlay transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-bold text-white text-xl drop-shadow-md">{category.name}</h3>
                  </div>
                </div>
                <CardContent className="p-3 text-center">
                  <div className="flex items-center justify-center text-sm text-primary">
                    <span>Shop Now</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link href="/products">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <ProductCarousel products={featuredProducts} />
      </section>

      {/* Trending Products by Category */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Trending Now</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover what's popular right now across our different categories
        </p>
        <Tabs defaultValue="clothing" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="clothing">Clothing</TabsTrigger>
            <TabsTrigger value="electronics">Electronics</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="groceries">Groceries</TabsTrigger>
            <TabsTrigger value="footwear">Footwear</TabsTrigger>
          </TabsList>
          {["clothing", "electronics", "food", "groceries", "footwear"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredProducts
                  .filter((product) => product.category === category)
                  .slice(0, 4)
                  .map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl group">
                        <div className="relative h-48 w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
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
                              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                            >
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Promotional Banners */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-64 rounded-lg overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-90"></div>
            <Image
              src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2115&auto=format&fit=crop"
              alt="Special Offer"
              fill
              className="object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex flex-col justify-center p-6 text-white">
              <Badge className="mb-2 w-fit bg-white/20 backdrop-blur-sm text-white border-white/40">Limited Time</Badge>
              <h3 className="text-2xl font-bold mb-2">Summer Sale</h3>
              <p className="mb-4">Get up to 50% off on our summer collection. Don't miss out!</p>
              <Button className="w-fit bg-white text-pink-600 hover:bg-white/90 shadow-lg group-hover:scale-105 transition-transform">
                Shop Now
              </Button>
            </div>
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-90"></div>
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
              alt="New Arrivals"
              fill
              className="object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex flex-col justify-center p-6 text-white">
              <Badge className="mb-2 w-fit bg-white/20 backdrop-blur-sm text-white border-white/40">Just Arrived</Badge>
              <h3 className="text-2xl font-bold mb-2">New Tech Arrivals</h3>
              <p className="mb-4">Discover the latest gadgets and electronics for your everyday needs</p>
              <Button className="w-fit bg-white text-blue-600 hover:bg-white/90 shadow-lg group-hover:scale-105 transition-transform">
                Explore
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
            <p className="text-sm text-muted-foreground">
              Free shipping on all orders over $50. Worldwide delivery available.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Special Discounts</h3>
            <p className="text-sm text-muted-foreground">
              Exclusive deals and special discounts for registered customers. Join now!
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
            <p className="text-sm text-muted-foreground">
              30-day hassle-free return policy. Not satisfied? Get a full refund.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
            <p className="text-sm text-muted-foreground">
              Our customer support team is available 24/7 to assist you with any questions.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter and be the first to know about new products, special offers, and exclusive
            discounts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/70 flex-1"
            />
            <Button className="bg-white text-pink-600 hover:bg-white/90">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
