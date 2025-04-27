"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Product {
  id: number
  name: string
  description: string
  price: number
  oldPrice?: number
  image: string
  category: string
  isNew?: boolean
  discount: number
}

interface ProductCarouselProps {
  products: Product[]
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const container = containerRef.current
      const itemWidth = container.scrollWidth / products.length
      container.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      })
    }
  }

  const handlePrevious = () => {
    const newIndex = Math.max(currentIndex - 1, 0)
    setCurrentIndex(newIndex)
    scrollToIndex(newIndex)
  }

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, products.length - 4)
    setCurrentIndex(newIndex)
    scrollToIndex(newIndex)
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] max-w-[280px] snap-start">
            <Link href={`/products/${product.id}`}>
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl group">
                <div className="relative h-56 w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
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
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" className="w-full bg-white text-pink-600 hover:bg-white/90">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
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
                    <Badge variant="outline" className="capitalize">
                      {product.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-sm z-10",
          currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100",
        )}
        onClick={handlePrevious}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md backdrop-blur-sm z-10",
          currentIndex >= products.length - 4 ? "opacity-50 cursor-not-allowed" : "opacity-100",
        )}
        onClick={handleNext}
        disabled={currentIndex >= products.length - 4}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  )
}
