"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, Menu, X, User, Heart, Bell, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

const banners = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Discover our new summer collection with up to 50% off",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop",
    color: "from-pink-500 to-orange-500",
  },
  {
    id: 2,
    title: "Tech Gadgets",
    description: "Latest tech gadgets for your everyday needs",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=2021&auto=format&fit=crop",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: 3,
    title: "Grocery Specials",
    description: "Fresh groceries delivered to your doorstep",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074&auto=format&fit=crop",
    color: "from-green-500 to-teal-500",
  },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(3)
  const [wishlistCount, setWishlistCount] = useState(5)
  const [notificationCount, setNotificationCount] = useState(2)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="w-full">
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-lg dark:bg-gray-900/90 h-16"
            : "bg-gradient-to-r from-pink-500/90 via-purple-500/90 to-indigo-600/90 backdrop-blur-md h-20",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group">
                <div
                  className={cn(
                    "relative h-10 w-10 overflow-hidden rounded-full transition-all duration-500 transform group-hover:scale-110",
                    isScrolled ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600" : "bg-white",
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center font-bold text-xl",
                      isScrolled
                        ? "text-white"
                        : "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600",
                    )}
                  >
                    S
                  </div>
                </div>
                <span
                  className={cn(
                    "text-2xl font-bold transition-all duration-500 transform group-hover:translate-x-1",
                    isScrolled ? "text-gray-900 dark:text-white" : "text-white",
                  )}
                >
                  ShopEase
                </span>
              </Link>
              <nav className="ml-10 hidden md:flex space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors relative group overflow-hidden",
                      isScrolled
                        ? pathname === item.href
                          ? "text-pink-500"
                          : "text-gray-700 hover:text-pink-500 dark:text-gray-300 dark:hover:text-pink-400"
                        : pathname === item.href
                          ? "text-white"
                          : "text-white/80 hover:text-white",
                    )}
                  >
                    {item.name}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 w-full bg-current transform transition-transform duration-300 translate-x-[-100%] group-hover:translate-x-0",
                        pathname === item.href ? "translate-x-0" : "",
                      )}
                    ></span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div
                className={cn(
                  "relative transition-all duration-300",
                  searchFocused ? "w-[300px]" : "w-[200px] lg:w-[250px]",
                )}
              >
                <Search
                  className={cn(
                    "absolute left-2.5 top-2.5 h-4 w-4 transition-colors",
                    isScrolled ? "text-gray-500" : "text-white/70",
                  )}
                />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className={cn(
                    "pl-8 rounded-full transition-all duration-300",
                    isScrolled
                      ? "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      : "bg-white/20 border-white/30 placeholder:text-white/70 text-white focus:bg-white/30",
                    searchFocused && "ring-2 ring-pink-500/50",
                  )}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "relative rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors",
                      isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white",
                    )}
                  >
                    <Bell className="h-5 w-5" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white animate-pulse">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[300px]">
                  <div className="p-2 font-medium border-b">Notifications</div>
                  <div className="py-2 px-3 text-sm">
                    <div className="mb-2 pb-2 border-b">
                      <p className="font-medium">Your order has been shipped!</p>
                      <p className="text-muted-foreground text-xs">2 minutes ago</p>
                    </div>
                    <div>
                      <p className="font-medium">New arrivals are here!</p>
                      <p className="text-muted-foreground text-xs">1 hour ago</p>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "relative rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors",
                    isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white",
                  )}
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "relative rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors",
                    isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white",
                  )}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors",
                      isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white",
                    )}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/reviews">My Reviews</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/signin">Sign Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                  "rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors",
                  isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white",
                )}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Link href="/auth/signin">
                <Button
                  className={cn(
                    "transition-all duration-300 rounded-full shadow-lg transform hover:scale-105 active:scale-95",
                    isScrolled
                      ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700 text-white"
                      : "bg-white text-pink-500 hover:bg-white/90",
                  )}
                >
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="flex md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu
                      className={cn(
                        "h-6 w-6 transition-colors",
                        isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white",
                      )}
                    />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[80%] sm:w-[350px] bg-gradient-to-b from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between border-b pb-4">
                      <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">
                          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                            S
                          </div>
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">
                          ShopEase
                        </span>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="relative my-4">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="w-full pl-10 rounded-full bg-muted"
                      />
                    </div>

                    <nav className="flex flex-col space-y-4 mt-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "text-base font-medium transition-colors hover:text-pink-500 py-2 border-b border-gray-100 dark:border-gray-800 flex items-center",
                            pathname === item.href ? "text-pink-500" : "text-gray-700 dark:text-gray-300",
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                          {pathname === item.href && <div className="ml-2 h-1.5 w-1.5 rounded-full bg-pink-500"></div>}
                        </Link>
                      ))}
                    </nav>

                    <div className="mt-auto flex flex-col space-y-4 pt-4 border-t">
                      <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <Heart className="mr-2 h-4 w-4" />
                          Wishlist ({wishlistCount})
                        </Button>
                      </Link>
                      <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Cart ({cartCount})
                        </Button>
                      </Link>
                      <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Button>
                      </Link>
                      <Link href="/settings" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <User className="mr-2 h-4 w-4" />
                          Settings
                        </Button>
                      </Link>
                      <Link href="/reviews" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <User className="mr-2 h-4 w-4" />
                          Reviews
                        </Button>
                      </Link>
                      <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700">
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {pathname === "/" && (
        <div className="pt-20">
          <Carousel className="w-full">
            <CarouselContent>
              {banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-90`}></div>
                    <Image
                      src={banner.image || "/placeholder.svg"}
                      alt={banner.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                      <Badge className="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/40 px-4 py-1 animate-pulse">
                        Featured
                      </Badge>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-md animate-fade-in">
                        {banner.title}
                      </h2>
                      <p className="text-lg md:text-xl max-w-2xl drop-shadow-md animate-slide-up">
                        {banner.description}
                      </p>
                      <Button className="mt-6 bg-white text-black hover:bg-white/90 shadow-lg transform hover:scale-105 transition-transform">
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white border-white/40" />
            <CarouselNext className="right-4 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white border-white/40" />
          </Carousel>
        </div>
      )}
    </header>
  )
}
