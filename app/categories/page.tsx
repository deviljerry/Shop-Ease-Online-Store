import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/data"

export default function CategoriesPage() {
  // Group categories into rows of 3 for better layout
  const groupedCategories = categories.reduce(
    (acc, category, index) => {
      const groupIndex = Math.floor(index / 3)
      if (!acc[groupIndex]) {
        acc[groupIndex] = []
      }
      acc[groupIndex].push(category)
      return acc
    },
    [] as (typeof categories)[],
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
          Shop by Category
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our wide selection of products across various categories. Find exactly what you're looking for with our
          organized collections.
        </p>
      </div>

      <div className="space-y-16">
        {groupedCategories.map((group, groupIndex) => (
          <div key={groupIndex} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {group.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`} className="block">
                <Card className="overflow-hidden h-full transition-all duration-500 hover:shadow-xl group hover:scale-[1.02]">
                  <div className="relative h-64 w-full bg-gradient-to-r from-pink-500 to-purple-600 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Button className="bg-white text-black hover:bg-white/90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Browse {category.name}
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-pink-500 transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Discover our collection of {category.name.toLowerCase()} for every occasion.
                    </p>
                    <div className="flex items-center text-sm text-primary">
                      <span>Shop Now</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 rounded-lg p-8 shadow-lg transform hover:scale-[1.01] transition-transform">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              Can't find what you're looking for?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our product specialists are here to help you find the perfect item. Contact us for personalized
              recommendations.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md hover:shadow-pink-500/20"
            >
              Contact Support
            </Button>
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2070&auto=format&fit=crop"
              alt="Customer Support"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
