import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
          About ShopEase
        </h1>
        <p className="text-xl text-muted-foreground">Your one-stop destination for all your shopping needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 2015, ShopEase began with a simple mission: to make online shopping easy, enjoyable, and
              accessible to everyone. What started as a small venture has now grown into a comprehensive e-commerce
              platform offering thousands of products across multiple categories.
            </p>
            <p>
              Our journey has been defined by our commitment to quality, customer satisfaction, and continuous
              innovation. We've built our reputation on providing exceptional products, competitive prices, and
              outstanding customer service.
            </p>
            <p>
              Today, ShopEase serves customers worldwide, connecting them with the products they love and introducing
              them to new favorites. We're proud of how far we've come, but we're even more excited about where we're
              going.
            </p>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
            alt="ShopEase Team"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold">Our Headquarters</h3>
              <p>San Francisco, California</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 rounded-lg p-8 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
            Our Values
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These core principles guide everything we do at ShopEase
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p className="text-muted-foreground">
                We're committed to offering only the highest quality products that meet our rigorous standards.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Focus</h3>
              <p className="text-muted-foreground">
                Our customers are at the heart of everything we do. We strive to exceed expectations at every
                touchpoint.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 00-3.48 0m3.48-.189v-2.08a6 6 0 01-4.5 0v2.08M12 18a3.75 3.75 0 00.495-.075m-.495.075a3.75 3.75 0 01-.495-.075m.495.075v-.075m0 0a3.75 3.75 0 01-.495-.075M9.75 15v-.075a3.75 3.75 0 00-.495-.075m.495.075v.075m0 0a3.75 3.75 0 01-.495-.075M9 12.75v-1.5m0 1.5c1.012 0 1.867-.668 2.15-1.586m-2.15 1.586c-1.012 0-1.867-.668-2.15-1.586m2.15 1.586v-1.5m-2.15 1.586c-.386.198-.824.308-1.283.308-.459 0-.897-.11-1.283-.308M9 12.75V10.5m0 2.25v-1.5m0 1.5c1.012 0 1.867.668 2.15 1.586m-2.15-1.586c-1.012 0-1.867.668-2.15 1.586m2.15-1.586v1.5m-2.15-1.586c-.386-.198-.824-.308-1.283-.308-.459 0-.897.11-1.283.308m0 0A2.25 2.25 0 005.25 12c0-.31.063-.608.176-.873m.176.873A2.25 2.25 0 017.5 12c0 .31-.063.608-.176.873m.176-.873a2.25 2.25 0 012.248 0M12.75 15v-1.5m0 1.5c-.386.198-.824.308-1.283.308-.459 0-.897-.11-1.283-.308m2.566 0c.386-.198.824-.308 1.283-.308.459 0 .897.11 1.283.308M12.75 15V10.5m0 4.5c-1.012 0-1.867-.668-2.15-1.586m2.15 1.586c1.012 0 1.867-.668 2.15-1.586m-2.15 1.586v-1.5m2.15 1.586c.386.198.824.308 1.283.308.459 0 .897-.11 1.283-.308m0 0a2.25 2.25 0 001.5-2.25c0-.31-.063-.608-.176-.873m.176.873a2.25 2.25 0 01-1.5 2.25m0 0c-.386.198-.824.308-1.283.308-.459 0-.897-.11-1.283-.308m2.566 0L18 12.75v-1.5m0 1.5c-.386.198-.824.308-1.283.308-.459 0-.897-.11-1.283-.308M18 12.75V10.5m0 2.25c-1.012 0-1.867-.668-2.15-1.586m2.15 1.586c1.012 0 1.867-.668 2.15-1.586m-2.15 1.586v-1.5m2.15-1.586c.386-.198.824-.308 1.283-.308.459 0 .897.11 1.283.308m0 0A2.25 2.25 0 0121.75 12c0-.31-.063-.608-.176-.873m.176.873A2.25 2.25 0 0119.5 12c0 .31.063.608.176.873m-.176-.873a2.25 2.25 0 00-2.248 0"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously explore new technologies and approaches to enhance the shopping experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="team" className="mb-16">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950/30 dark:to-purple-950/30">
          <TabsTrigger
            value="team"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
          >
            Our Team
          </TabsTrigger>
          <TabsTrigger
            value="mission"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
          >
            Our Mission
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
          >
            Our History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="team">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
                bio: "With over 15 years of experience in retail and e-commerce, Sarah leads our company with vision and passion.",
              },
              {
                name: "Michael Chen",
                role: "CTO",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
                bio: "Michael oversees our technology infrastructure and ensures we stay at the cutting edge of e-commerce innovation.",
              },
              {
                name: "Jessica Patel",
                role: "Head of Operations",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
                bio: "Jessica ensures that our operations run smoothly, from inventory management to order fulfillment.",
              },
              {
                name: "David Wilson",
                role: "Customer Experience Director",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
                bio: "David is dedicated to making every customer interaction with ShopEase exceptional and memorable.",
              },
            ].map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-0">
                  <div className="relative h-64 w-full">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="mission">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                alt="Our Mission"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                Our Mission
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At ShopEase, our mission is to revolutionize the online shopping experience by providing a seamless,
                  intuitive platform that connects customers with high-quality products from around the world.
                </p>
                <p>
                  We aim to make shopping not just a transaction, but an enjoyable journey of discovery. We believe that
                  everyone deserves access to quality products at fair prices, delivered with exceptional service.
                </p>
                <p>
                  Through innovation, integrity, and customer-centricity, we strive to be the most trusted e-commerce
                  destination globally, where customers can find everything they need and discover products they'll
                  love.
                </p>
              </div>
              <div className="mt-6">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-md hover:shadow-pink-500/20 transform hover:scale-[1.02] transition-all"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="history">
          <div className="space-y-8">
            <div className="relative border-l-2 border-pink-300 dark:border-pink-700 pl-8 pb-8">
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse"></div>
              <h3 className="text-xl font-bold mb-2">2015: The Beginning</h3>
              <p className="text-muted-foreground">
                ShopEase was founded in a small apartment with just three employees and a vision to simplify online
                shopping.
              </p>
            </div>
            <div className="relative border-l-2 border-pink-300 dark:border-pink-700 pl-8 pb-8">
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse"></div>
              <h3 className="text-xl font-bold mb-2">2017: Expansion</h3>
              <p className="text-muted-foreground">
                We expanded our product range to include electronics, home goods, and fashion, growing our team to 25
                employees.
              </p>
            </div>
            <div className="relative border-l-2 border-pink-300 dark:border-pink-700 pl-8 pb-8">
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse"></div>
              <h3 className="text-xl font-bold mb-2">2019: Going Global</h3>
              <p className="text-muted-foreground">
                ShopEase launched international shipping, making our products available to customers worldwide.
              </p>
            </div>
            <div className="relative border-l-2 border-pink-300 dark:border-pink-700 pl-8 pb-8">
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse"></div>
              <h3 className="text-xl font-bold mb-2">2021: Mobile App Launch</h3>
              <p className="text-muted-foreground">
                We introduced our mobile app, making shopping on-the-go easier than ever for our customers.
              </p>
            </div>
            <div className="relative pl-8">
              <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse"></div>
              <h3 className="text-xl font-bold mb-2">2023: Today and Beyond</h3>
              <p className="text-muted-foreground">
                Today, ShopEase serves millions of customers with a team of over 100 dedicated professionals. We
                continue to innovate and grow, always with our customers at the center of everything we do.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="max-w-2xl mx-auto mb-6">
          We're always looking for talented individuals to join our team. Check out our current openings or send us your
          resume.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-pink-600 hover:bg-white/90 transform hover:scale-[1.02] transition-all"
            asChild
          >
            <Link href="/careers">View Careers</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 transform hover:scale-[1.02] transition-all"
            asChild
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
