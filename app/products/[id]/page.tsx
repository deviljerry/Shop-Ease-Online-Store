"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Heart, Share2, Star, Truck, ShieldCheck, RotateCcw, ChevronRight } from "lucide-react"
import { featuredProducts } from "@/lib/data"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)

  const product = featuredProducts.find((p) => p.id === id)

  const [mainImage, setMainImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("black")
  const [selectedSize, setSelectedSize] = useState("m")

  if (!product) {
    return <div className="container mx-auto px-4 py-12">Product not found</div>
  }

  // Mock product images (in a real app, these would come from the product data)
  const productImages = [
    product.image || "/placeholder.svg",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ]

  // Mock related products
  const relatedProducts = featuredProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    // In a real app, you would add the product to the cart here
    router.push("/cart")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-8">
        <Link href="/products" className="text-sm text-muted-foreground hover:text-primary">
          Products
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <Link href={`/categories/${product.category}`} className="text-sm text-muted-foreground hover:text-primary">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={productImages[mainImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.isNew && <Badge className="absolute top-4 right-4">New</Badge>}
            {product.discount > 0 && (
              <Badge variant="destructive" className="absolute top-4 left-4">
                -{product.discount}%
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square cursor-pointer overflow-hidden rounded-md bg-gray-100 ${
                  mainImage === index ? "ring-2 ring-primary ring-offset-2" : ""
                }`}
                onClick={() => setMainImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.0 (24 reviews)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-xl text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</span>
            )}
            {product.discount > 0 && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                Save ${(product.oldPrice! - product.price).toFixed(2)}
              </Badge>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <RadioGroup id="color" value={selectedColor} onValueChange={setSelectedColor} className="flex space-x-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="black" id="black" className="peer sr-only" />
                  <Label
                    htmlFor="black"
                    className="h-8 w-8 rounded-full bg-black peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2 cursor-pointer"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="white" id="white" className="peer sr-only" />
                  <Label
                    htmlFor="white"
                    className="h-8 w-8 rounded-full bg-white border peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2 cursor-pointer"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="blue" id="blue" className="peer sr-only" />
                  <Label
                    htmlFor="blue"
                    className="h-8 w-8 rounded-full bg-blue-500 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2 cursor-pointer"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="red" id="red" className="peer sr-only" />
                  <Label
                    htmlFor="red"
                    className="h-8 w-8 rounded-full bg-red-500 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2 cursor-pointer"
                  />
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <RadioGroup
                id="size"
                value={selectedSize}
                onValueChange={setSelectedSize}
                className="grid grid-cols-5 gap-2"
              >
                {["xs", "s", "m", "l", "xl"].map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem value={size} id={size} className="peer sr-only" />
                    <Label
                      htmlFor={size}
                      className="flex h-10 w-full items-center justify-center rounded-md border border-muted bg-background text-center text-sm font-medium uppercase peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground cursor-pointer"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-4">
              <Label htmlFor="quantity" className="w-20">
                Quantity
              </Label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <div className="flex h-10 w-12 items-center justify-center border-y">{quantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button size="lg" variant="secondary" className="flex-1">
              Buy Now
            </Button>
            <Button size="icon" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Free shipping over $50</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">2-year warranty</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none dark:prose-invert">
              <p>
                {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel
                ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel
                ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              <p>
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              </p>
              <h3>Features</h3>
              <ul>
                <li>High-quality materials</li>
                <li>Durable construction</li>
                <li>Comfortable fit</li>
                <li>Stylish design</li>
                <li>Versatile use</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Product Details</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Material</span>
                    <span>Premium Cotton</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Color</span>
                    <span>Multiple Options</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Size</span>
                    <span>XS, S, M, L, XL</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Weight</span>
                    <span>0.5 kg</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Dimensions</span>
                    <span>30 x 20 x 10 cm</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Shipping Time</span>
                    <span>3-5 Business Days</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Shipping Cost</span>
                    <span>Free over $50</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Returns</span>
                    <span>30 Days</span>
                  </li>
                  <li className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Warranty</span>
                    <span>2 Years</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <span className="text-lg font-bold">4.0</span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">Based on 24 reviews</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-12 text-sm">5 star</span>
                      <div className="flex-1 h-2 mx-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[60%]"></div>
                      </div>
                      <span className="w-12 text-sm text-right">60%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 text-sm">4 star</span>
                      <div className="flex-1 h-2 mx-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[25%]"></div>
                      </div>
                      <span className="w-12 text-sm text-right">25%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 text-sm">3 star</span>
                      <div className="flex-1 h-2 mx-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[10%]"></div>
                      </div>
                      <span className="w-12 text-sm text-right">10%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 text-sm">2 star</span>
                      <div className="flex-1 h-2 mx-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[3%]"></div>
                      </div>
                      <span className="w-12 text-sm text-right">3%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 text-sm">1 star</span>
                      <div className="flex-1 h-2 mx-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[2%]"></div>
                      </div>
                      <span className="w-12 text-sm text-right">2%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-medium">JD</span>
                        </div>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-xs text-muted-foreground">June 12, 2023</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 5 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">
                      Great product! The quality is excellent and it fits perfectly. I would definitely recommend it to
                      anyone looking for a reliable and stylish option.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-medium">JS</span>
                        </div>
                        <div>
                          <p className="font-medium">Jane Smith</p>
                          <p className="text-xs text-muted-foreground">May 28, 2023</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">
                      I'm very satisfied with my purchase. The shipping was fast and the product exceeded my
                      expectations. Would buy again!
                    </p>
                  </div>

                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Related Products</h2>
          <Link href={`/categories/${product.category}`} className="flex items-center text-primary">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
              <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg">
                <div className="relative h-48 w-full bg-gray-100">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                  />
                  {relatedProduct.isNew && <Badge className="absolute top-2 right-2">New</Badge>}
                  {relatedProduct.discount > 0 && (
                    <Badge variant="destructive" className="absolute top-2 left-2">
                      -{relatedProduct.discount}%
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-1">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">${relatedProduct.price.toFixed(2)}</span>
                      {relatedProduct.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${relatedProduct.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
