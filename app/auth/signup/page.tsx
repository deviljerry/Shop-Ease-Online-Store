"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState("customer")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle form submission here
    router.push("/")
  }

  return (
    <div className="container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 min-h-[80vh]">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white mr-2 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center text-pink-500 font-bold">S</div>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200">
            ShopEase
          </span>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "ShopEase transformed my shopping experience! The wide selection and user-friendly interface make it my
              go-to online store for everything from fashion to electronics."
            </p>
            <footer className="text-sm">Sarah Johnson</footer>
          </blockquote>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <Image
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"
          alt="Authentication background"
          fill
          className="absolute inset-0 object-cover"
        />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] lg:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">Enter your details below to create your account</p>
          </div>

          <Tabs defaultValue="customer" className="w-full" onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950 dark:to-purple-950">
              <TabsTrigger
                value="customer"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Customer
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Admin
              </TabsTrigger>
              <TabsTrigger
                value="manager"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Manager
              </TabsTrigger>
              <TabsTrigger
                value="employee"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Employee
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Card className="backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-pink-100 dark:border-pink-900 shadow-lg hover:shadow-pink-200/20 dark:hover:shadow-pink-800/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white">
                  <User className="h-4 w-4" />
                </div>
                <span>Sign Up as {userType.charAt(0).toUpperCase() + userType.slice(1)}</span>
              </CardTitle>
              <CardDescription>
                {userType === "customer"
                  ? "Create an account to start shopping"
                  : `Create a ${userType} account to manage the store`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-pink-500" />
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                      className="border-pink-100 dark:border-pink-900 focus:border-pink-500 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-pink-500" />
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                      className="border-pink-100 dark:border-pink-900 focus:border-pink-500 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-pink-500" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    required
                    className="border-pink-100 dark:border-pink-900 focus:border-pink-500 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-1">
                    <Lock className="h-3.5 w-3.5 text-pink-500" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="border-pink-100 dark:border-pink-900 focus:border-pink-500 transition-all duration-300"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:text-pink-500 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>

                {userType !== "customer" && (
                  <div className="space-y-2">
                    <Label htmlFor="accessCode" className="flex items-center gap-1">
                      <Lock className="h-3.5 w-3.5 text-pink-500" />
                      Access Code
                    </Label>
                    <Input
                      id="accessCode"
                      placeholder="Enter access code"
                      required
                      className="border-pink-100 dark:border-pink-900 focus:border-pink-500 transition-all duration-300"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-pink-500" />
                    Gender
                  </Label>
                  <RadioGroup defaultValue="male" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="male"
                        id="male"
                        className="text-pink-500 border-pink-200 dark:border-pink-800"
                      />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="female"
                        id="female"
                        className="text-pink-500 border-pink-200 dark:border-pink-800"
                      />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="other"
                        id="other"
                        className="text-pink-500 border-pink-200 dark:border-pink-800"
                      />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Create account
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                By clicking create account, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-pink-500 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-pink-500 transition-colors">
                  Privacy Policy
                </Link>
                .
              </div>
            </CardFooter>
          </Card>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="underline underline-offset-4 hover:text-pink-500 transition-colors font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
