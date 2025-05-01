"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useNotifications } from "@/components/notifications-provider"
import { CreditCard, Check } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const { addNotification } = useNotifications()
  const [profileForm, setProfileForm] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    bio: "Product manager with 5+ years of experience in SaaS companies.",
  })
  const [companyForm, setCompanyForm] = useState({
    companyName: "Acme Inc.",
    website: "https://acme.com",
    industry: "technology",
    address: "123 Business St, Suite 100, San Francisco, CA 94107",
  })
  const [loading, setLoading] = useState({
    profile: false,
    company: false,
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCompanyForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleIndustryChange = (value: string) => {
    setCompanyForm((prev) => ({ ...prev, industry: value }))
  }

  const saveProfile = () => {
    setLoading((prev) => ({ ...prev, profile: true }))

    // Simulate API call
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, profile: false }))

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })

      addNotification({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
        type: "success",
      })
    }, 1000)
  }

  const saveCompanyInfo = () => {
    setLoading((prev) => ({ ...prev, company: true }))

    // Simulate API call
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, company: false }))

      toast({
        title: "Company information updated",
        description: "Your company information has been updated successfully.",
      })

      addNotification({
        title: "Company information updated",
        description: "Your company information has been updated successfully.",
        type: "success",
      })
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="Settings" />
      <main className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold">Account Settings</h2>
          <Button>Save Changes</Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account profile information and email address.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={profileForm.firstName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" value={profileForm.lastName} onChange={handleProfileChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Write a short bio about yourself..."
                    className="min-h-[100px]"
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={saveProfile} disabled={loading.profile}>
                  {loading.profile ? "Saving..." : "Save Profile"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company details and business information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={companyForm.companyName}
                    onChange={handleCompanyChange}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      name="website"
                      value={companyForm.website}
                      onChange={handleCompanyChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={companyForm.industry} onValueChange={handleIndustryChange}>
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter your company address..."
                    className="min-h-[80px]"
                    value={companyForm.address}
                    onChange={handleCompanyChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={saveCompanyInfo} disabled={loading.company}>
                  {loading.company ? "Saving..." : "Save Company Info"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure how and when you want to receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <Separator />
                  <div className="space-y-4">
                    {[
                      { id: "sales-alerts", label: "Sales Alerts" },
                      { id: "inventory-updates", label: "Inventory Updates" },
                      { id: "customer-activity", label: "Customer Activity" },
                      { id: "team-messages", label: "Team Messages" },
                      { id: "security-alerts", label: "Security Alerts" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <Label htmlFor={item.id} className="flex-1">
                          {item.label}
                        </Label>
                        <Switch
                          id={item.id}
                          defaultChecked={item.id === "sales-alerts" || item.id === "security-alerts"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Push Notifications</h3>
                  <Separator />
                  <div className="space-y-4">
                    {[
                      { id: "push-sales", label: "Sales Alerts" },
                      { id: "push-inventory", label: "Inventory Updates" },
                      { id: "push-customer", label: "Customer Activity" },
                      { id: "push-team", label: "Team Messages" },
                      { id: "push-security", label: "Security Alerts" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <Label htmlFor={item.id} className="flex-1">
                          {item.label}
                        </Label>
                        <Switch id={item.id} defaultChecked={item.id === "push-sales"} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button
                  onClick={() => {
                    toast({
                      title: "Notification settings saved",
                      description: "Your notification preferences have been updated.",
                    })

                    addNotification({
                      title: "Notification settings saved",
                      description: "Your notification preferences have been updated.",
                      type: "success",
                    })
                  }}
                >
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Theme</h3>
                  <Separator />
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      { id: "light", label: "Light" },
                      { id: "dark", label: "Dark" },
                      { id: "system", label: "System" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={item.id}
                          name="theme"
                          value={item.id}
                          defaultChecked={item.id === "light"}
                          className="h-4 w-4 border-primary text-primary"
                        />
                        <Label htmlFor={item.id}>{item.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Dashboard Layout</h3>
                  <Separator />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { id: "compact", label: "Compact" },
                      { id: "comfortable", label: "Comfortable" },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id={item.id}
                          name="layout"
                          value={item.id}
                          defaultChecked={item.id === "comfortable"}
                          className="h-4 w-4 border-primary text-primary"
                        />
                        <Label htmlFor={item.id}>{item.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button
                  onClick={() => {
                    toast({
                      title: "Appearance settings saved",
                      description: "Your appearance settings have been updated.",
                    })

                    addNotification({
                      title: "Appearance settings saved",
                      description: "Your appearance settings have been updated.",
                      type: "success",
                    })
                  }}
                >
                  Save Appearance Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Manage your billing information and subscription plan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Current Plan</h3>
                  <Separator />
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Enterprise Plan</h4>
                        <p className="text-sm text-muted-foreground">$199.99/month</p>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-emerald-500" />
                        <span>Unlimited products and customers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-emerald-500" />
                        <span>Advanced analytics and reporting</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-emerald-500" />
                        <span>24/7 priority customer support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-emerald-500" />
                        <span>Custom API integrations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-emerald-500" />
                        <span>White-label options</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Payment Method</h3>
                  <Separator />
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="rounded-md bg-muted p-2">
                          <CreditCard className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Mastercard ending in 5678</h4>
                          <p className="text-sm text-muted-foreground">Expires 09/2026</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Billing History</h3>
                  <Separator />
                  <div className="space-y-2">
                    {[
                      { date: "Mar 1, 2025", amount: "$199.99", status: "Paid" },
                      { date: "Feb 1, 2025", amount: "$199.99", status: "Paid" },
                      { date: "Jan 1, 2025", amount: "$199.99", status: "Paid" },
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">{invoice.date}</p>
                          <p className="text-sm text-muted-foreground">Invoice #{2025030 + index}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-medium">{invoice.amount}</p>
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500">
                            {invoice.status}
                          </span>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button
                  onClick={() => {
                    toast({
                      title: "Billing information saved",
                      description: "Your billing information has been updated.",
                    })

                    addNotification({
                      title: "Billing information saved",
                      description: "Your billing information has been updated.",
                      type: "success",
                    })
                  }}
                >
                  Save Billing Information
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and authentication methods.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Change Password</h3>
                  <Separator />
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
                    <Button
                      onClick={() => {
                        toast({
                          title: "Password updated",
                          description: "Your password has been updated successfully.",
                        })

                        addNotification({
                          title: "Password updated",
                          description: "Your password has been updated successfully.",
                          type: "success",
                        })
                      }}
                    >
                      Update Password
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Two-factor authentication is disabled</h4>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        addNotification({
                          title: "2FA setup started",
                          description: "Follow the instructions to set up two-factor authentication.",
                          type: "info",
                        })
                      }}
                    >
                      Enable
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Active Sessions</h3>
                  <Separator />
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Current Session</h4>
                          <p className="text-sm text-muted-foreground">
                            San Francisco, CA • Chrome on macOS • March 31, 2025 at 1:50 PM
                          </p>
                        </div>
                        <div className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-500">
                          Active
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">Previous Session</h4>
                          <p className="text-sm text-muted-foreground">
                            New York, NY • Safari on iOS • March 30, 2025 at 10:15 AM
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Session revoked",
                              description: "The selected session has been revoked.",
                            })

                            addNotification({
                              title: "Session revoked",
                              description: "The selected session has been revoked successfully.",
                              type: "warning",
                            })
                          }}
                        >
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button
                  onClick={() => {
                    toast({
                      title: "Security settings saved",
                      description: "Your security settings have been updated.",
                    })

                    addNotification({
                      title: "Security settings saved",
                      description: "Your security settings have been updated successfully.",
                      type: "success",
                    })
                  }}
                >
                  Save Security Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

