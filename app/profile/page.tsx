"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Package,
  Heart,
  CreditCard,
  MapPin,
  Bell,
  Settings,
  LogOut,
  Edit,
  ShoppingBag,
  CheckCircle,
  Truck,
  Plus,
} from "lucide-react"

// Mock orders data
const orders = [
  {
    id: "ORD-12345",
    date: "2023-06-15",
    status: "Delivered",
    total: 129.97,
    items: [
      {
        id: 1,
        name: "Premium Cotton T-Shirt",
        price: 29.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
      },
      {
        id: 5,
        name: "Running Shoes",
        price: 79.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "ORD-12346",
    date: "2023-05-28",
    status: "Processing",
    total: 34.99,
    items: [
      {
        id: 3,
        name: "Organic Fruit Basket",
        price: 34.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop",
      },
    ],
  },
]

// Mock wishlist data
const wishlist = [
  {
    id: 6,
    name: "Smart Watch",
    price: 149.99,
    oldPrice: 199.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop",
    category: "electronics",
  },
  {
    id: 8,
    name: "Gourmet Coffee Beans",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop",
    category: "food",
  },
  {
    id: 11,
    name: "Wireless Headphones",
    price: 129.99,
    oldPrice: 159.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    category: "electronics",
  },
]

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setUserData({
        ...userData,
        [parent]: {
          ...userData[parent as keyof typeof userData],
          [child]: value,
        },
      })
    } else {
      setUserData({ ...userData, [name]: value })
    }
  }

  const handleLogout = () => {
    // In a real app, you would handle logout here
    router.push("/auth/signin")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="sticky top-20">
            <Card className="mb-6 overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-pink-500 to-purple-600"></div>
              <div className="px-6 pb-6 -mt-12">
                <Avatar className="h-24 w-24 border-4 border-white bg-white">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop"
                    alt="John Doe"
                  />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mt-2">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-muted-foreground">{userData.email}</p>
                <Badge className="mt-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white">Gold Member</Badge>
              </div>
            </Card>

            <div className="space-y-1">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <User className="mr-2 h-4 w-4" />
                Overview
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("orders")}
              >
                <Package className="mr-2 h-4 w-4" />
                Orders
              </Button>
              <Button
                variant={activeTab === "wishlist" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("wishlist")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>
              <Button
                variant={activeTab === "payment" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("payment")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </Button>
              <Button
                variant={activeTab === "addresses" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Addresses
              </Button>
              <Button
                variant={activeTab === "notifications" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
              <Separator className="my-2" />
              <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="hidden">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <ShoppingBag className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">12</h3>
                    <p className="text-muted-foreground">Total Orders</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">3</h3>
                    <p className="text-muted-foreground">Wishlist Items</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">2</h3>
                    <p className="text-muted-foreground">Saved Cards</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your most recent purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.slice(0, 2).map((order) => (
                    <div key={order.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="font-medium">{order.id}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            {new Date(order.date).toLocaleDateString()}
                          </span>
                        </div>
                        <Badge
                          variant={order.status === "Delivered" ? "default" : "outline"}
                          className={order.status === "Delivered" ? "bg-green-500" : ""}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <div className="flex -space-x-4 mr-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="relative h-12 w-12 rounded-md overflow-hidden border">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            {order.items.length} {order.items.length === 1 ? "item" : "items"}
                          </p>
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/orders/${order.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("orders")}>
                    View All Orders
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your account details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                        className="bg-muted/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                        className="bg-muted/40"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="bg-muted/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        className="bg-muted/40"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and track all your orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg overflow-hidden">
                        <div className="bg-muted p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{order.id}</h3>
                              <Badge
                                variant={order.status === "Delivered" ? "default" : "outline"}
                                className={`ml-2 ${order.status === "Delivered" ? "bg-green-500" : ""}`}
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Ordered on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">${order.total.toFixed(2)}</span>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/orders/${order.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-4">
                                <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-muted/50 p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            {order.status === "Delivered" ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                              <Truck className="h-5 w-5 text-primary mr-2" />
                            )}
                            <span className="text-sm">
                              {order.status === "Delivered"
                                ? "Delivered on June 18, 2023"
                                : "Estimated delivery: June 20, 2023"}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">
                            Track Order
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                  <CardDescription>Items you've saved for later</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden group">
                        <div className="relative h-48 bg-muted">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-white text-black hover:bg-white/90">
                                Add to Cart
                              </Button>
                              <Button size="icon" variant="outline" className="bg-white/20 text-white border-white/50">
                                <Heart className="h-4 w-4 fill-current" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="font-bold">${item.price.toFixed(2)}</span>
                            {item.oldPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${item.oldPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <Badge variant="outline" className="capitalize">
                              {item.category}
                            </Badge>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <Heart className="h-4 w-4 mr-1 text-red-500 fill-red-500" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 bg-muted rounded flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="2" x2="22" y1="10" y2="10" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>Default</Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 bg-muted rounded flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <line x1="2" x2="22" y1="10" y2="10" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Mastercard ending in 8888</p>
                          <p className="text-sm text-muted-foreground">Expires 08/2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <CardTitle>Addresses</CardTitle>
                  <CardDescription>Manage your shipping and billing addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">Home Address</h3>
                          <Badge className="mt-1">Default</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="text-muted-foreground">
                        <p>
                          {userData.firstName} {userData.lastName}
                        </p>
                        <p>{userData.address.street}</p>
                        <p>
                          {userData.address.city}, {userData.address.state} {userData.address.zip}
                        </p>
                        <p>{userData.address.country}</p>
                        <p className="mt-1">{userData.phone}</p>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">Work Address</h3>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="text-muted-foreground">
                        <p>
                          {userData.firstName} {userData.lastName}
                        </p>
                        <p>456 Office Building</p>
                        <p>Suite 789</p>
                        <p>San Francisco, CA 94103</p>
                        <p>United States</p>
                        <p className="mt-1">{userData.phone}</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Address
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Order Updates</h3>
                        <p className="text-sm text-muted-foreground">Receive updates about your orders</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="order-email" className="rounded" defaultChecked />
                          <Label htmlFor="order-email">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="order-sms" className="rounded" defaultChecked />
                          <Label htmlFor="order-sms">SMS</Label>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Promotions</h3>
                        <p className="text-sm text-muted-foreground">Receive promotions and special offers</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="promo-email" className="rounded" defaultChecked />
                          <Label htmlFor="promo-email">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="promo-sms" className="rounded" />
                          <Label htmlFor="promo-sms">SMS</Label>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Account Activity</h3>
                        <p className="text-sm text-muted-foreground">Receive updates about your account</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="account-email" className="rounded" defaultChecked />
                          <Label htmlFor="account-email">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="account-sms" className="rounded" defaultChecked />
                          <Label htmlFor="account-sms">SMS</Label>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Newsletter</h3>
                        <p className="text-sm text-muted-foreground">Receive our weekly newsletter</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="newsletter-email" className="rounded" defaultChecked />
                          <Label htmlFor="newsletter-email">Email</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Language Preferences</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Preferred Language</Label>
                        <select
                          id="language"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="zh">Chinese</option>
                        </select>
                      </div>
                      <Button>Save Preferences</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
