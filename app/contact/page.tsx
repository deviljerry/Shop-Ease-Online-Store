"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send the form data to your backend here
    console.log("Form submitted:", formData)
    setFormSubmitted(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground">We'd love to hear from you. Get in touch with our team.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p className="text-muted-foreground mb-4">
              Our customer support team is available to help you with any questions.
            </p>
            <p className="font-medium">+1 (555) 123-4567</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p className="text-muted-foreground mb-4">Send us an email and we'll get back to you within 24 hours.</p>
            <p className="font-medium">support@shopease.com</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Visit Us</h3>
            <p className="text-muted-foreground mb-4">Come visit our headquarters and retail showroom.</p>
            <p className="font-medium">123 Shopping Street, Retail City, RC 12345</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>

          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inquiryType">Inquiry Type</Label>
                <RadioGroup
                  value={formData.inquiryType}
                  onValueChange={handleRadioChange}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general">General Inquiry</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="support" id="support" />
                    <Label htmlFor="support">Customer Support</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="billing" id="billing" />
                    <Label htmlFor="billing">Billing Question</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="partnership" id="partnership" />
                    <Label htmlFor="partnership">Partnership Opportunity</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Please provide as much detail as possible..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          ) : (
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground mb-6">
                Thank you for contacting us. We've received your message and will respond to you shortly.
              </p>
              <Button
                onClick={() => {
                  setFormSubmitted(false)
                  setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                    inquiryType: "general",
                  })
                }}
              >
                Send Another Message
              </Button>
            </div>
          )}
        </div>

        <div>
          <Tabs defaultValue="location">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="location">Our Location</TabsTrigger>
              <TabsTrigger value="hours">Business Hours</TabsTrigger>
            </TabsList>
            <TabsContent value="location" className="pt-6">
              <div className="rounded-lg overflow-hidden h-[400px] mb-6 bg-muted relative">
                <Image src="/placeholder.svg?height=800&width=1200" alt="Map location" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="font-medium text-center">ShopEase Headquarters</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-muted-foreground">
                      123 Shopping Street
                      <br />
                      Retail City, RC 12345
                      <br />
                      United States
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">support@shopease.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="hours" className="pt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">Our Business Hours</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between pb-2 border-b">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span>Customer Support</span>
                      <span className="font-medium">24/7</span>
                    </div>
                  </div>
                  <div className="mt-6 text-muted-foreground">
                    <p>
                      Our physical store and showroom are open during the hours listed above. Our online store is always
                      open, and customer support is available 24/7 via email and chat.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Holiday Schedule</h3>
                <div className="space-y-3">
                  <div className="flex justify-between pb-2 border-b">
                    <span>New Year's Day</span>
                    <span className="font-medium">Closed</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span>Independence Day</span>
                    <span className="font-medium">Closed</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span>Thanksgiving</span>
                    <span className="font-medium">Closed</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span>Christmas Day</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Find quick answers to common questions about our services, shipping, returns, and more.
        </p>
        <Button asChild>
          <Link href="/faq">View FAQ</Link>
        </Button>
      </div>
    </div>
  )
}
