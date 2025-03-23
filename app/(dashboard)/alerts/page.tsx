"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Bell, Clock, MapPin, Filter, Plus, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("current")
  const [riskThreshold, setRiskThreshold] = useState([60])
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: true,
    push: true,
    dailySummary: false,
    weeklyReport: true,
  })
  const [monitoredLocations, setMonitoredLocations] = useState([
    { id: 1, name: "Darjeeling", radius: 25 },
    { id: 2, name: "Sikkim", radius: 15 },
    { id: 3, name: "Uttarakhand", radius: 20 },
  ])
  const [newLocation, setNewLocation] = useState("")
  const [newRadius, setNewRadius] = useState(10)

  // Current alerts data
  const currentAlerts = [
    {
      id: 1,
      severity: "high",
      location: "Darjeeling",
      message: "Critical landslide risk due to continuous heavy rainfall",
      time: "2 hours ago",
    },
    {
      id: 2,
      severity: "medium",
      location: "Sikkim",
      message: "Moderate landslide risk, soil saturation increasing",
      time: "5 hours ago",
    },
    {
      id: 3,
      severity: "low",
      location: "Uttarakhand",
      message: "Minor landslide risk, monitoring rainfall patterns",
      time: "1 day ago",
    },
  ]

  // Historical alerts data
  const historicalAlerts = [
    {
      id: 4,
      severity: "high",
      location: "Himachal Pradesh",
      message: "Major landslide reported near Idukki dam area",
      time: "2 weeks ago",
      resolved: true,
    },
    {
      id: 5,
      severity: "high",
      location: "Darjeeling",
      message: "Evacuation ordered due to imminent landslide risk",
      time: "1 month ago",
      resolved: true,
    },
    {
      id: 6,
      severity: "medium",
      location: "Sikkim",
      message: "Road closure due to minor landslide",
      time: "2 months ago",
      resolved: true,
    },
    {
      id: 7,
      severity: "high",
      location: "Malappuram",
      message: "Multiple landslides reported after heavy monsoon rainfall",
      time: "3 months ago",
      resolved: true,
    },
    {
      id: 8,
      severity: "medium",
      location: "Kozhikode",
      message: "Landslide warning issued for hillside communities",
      time: "4 months ago",
      resolved: true,
    },
  ]

  const handleAddLocation = () => {
    if (!newLocation) return

    const newId = monitoredLocations.length > 0 ? Math.max(...monitoredLocations.map((loc) => loc.id)) + 1 : 1

    setMonitoredLocations([...monitoredLocations, { id: newId, name: newLocation, radius: newRadius }])

    setNewLocation("")
    setNewRadius(10)
  }

  const handleRemoveLocation = (id: number) => {
    setMonitoredLocations(monitoredLocations.filter((loc) => loc.id !== id))
  }

  const toggleNotificationPreference = (key: keyof typeof notificationPreferences) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [key]: !notificationPreferences[key],
    })
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
        <p className="text-muted-foreground">Manage your alerts, notification preferences, and monitored locations</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="current">Current Alerts</TabsTrigger>
          <TabsTrigger value="history">Alert History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Active Alerts</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {currentAlerts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Bell className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No active alerts</p>
                <p className="text-muted-foreground">You don't have any active alerts at the moment</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {currentAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`border-l-4 ${
                    alert.severity === "high"
                      ? "border-l-destructive"
                      : alert.severity === "medium"
                        ? "border-l-orange-500"
                        : "border-l-blue-500"
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            alert.severity === "high"
                              ? "destructive"
                              : alert.severity === "medium"
                                ? "default"
                                : "outline"
                          }
                        >
                          {alert.severity === "high"
                            ? "High Risk"
                            : alert.severity === "medium"
                              ? "Medium Risk"
                              : "Low Risk"}
                        </Badge>
                        <CardTitle className="text-base">{alert.location}</CardTitle>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {alert.time}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{alert.message}</p>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      View on Map
                    </Button>
                    <Button size="sm">Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Alert History</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue="3months">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Historical Alerts</CardTitle>
              <CardDescription>Past alerts and notifications from your monitored areas</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-4"></div>
                  <div className="space-y-8 relative">
                    {historicalAlerts.map((alert) => (
                      <div key={alert.id} className="relative pl-10">
                        <div
                          className={`absolute left-0 top-1 h-8 w-8 rounded-full flex items-center justify-center ${
                            alert.severity === "high"
                              ? "bg-destructive text-destructive-foreground"
                              : alert.severity === "medium"
                                ? "bg-orange-500 text-white"
                                : "bg-blue-500 text-white"
                          }`}
                        >
                          <AlertCircle className="h-4 w-4" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{alert.location}</h4>
                              <Badge
                                variant={
                                  alert.severity === "high"
                                    ? "destructive"
                                    : alert.severity === "medium"
                                      ? "default"
                                      : "outline"
                                }
                              >
                                {alert.severity === "high"
                                  ? "High Risk"
                                  : alert.severity === "medium"
                                    ? "Medium Risk"
                                    : "Low Risk"}
                              </Badge>
                              {alert.resolved && (
                                <Badge
                                  variant="outline"
                                  className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100"
                                >
                                  Resolved
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">{alert.time}</span>
                          </div>
                          <p className="text-muted-foreground">{alert.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how and when you want to receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Alert Channels</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notificationPreferences.email}
                        onCheckedChange={() => toggleNotificationPreference("email")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={notificationPreferences.sms}
                        onCheckedChange={() => toggleNotificationPreference("sms")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={notificationPreferences.push}
                        onCheckedChange={() => toggleNotificationPreference("push")}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Summary Reports</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="daily-summary">Daily Summary</Label>
                      </div>
                      <Switch
                        id="daily-summary"
                        checked={notificationPreferences.dailySummary}
                        onCheckedChange={() => toggleNotificationPreference("dailySummary")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="weekly-report">Weekly Report</Label>
                      </div>
                      <Switch
                        id="weekly-report"
                        checked={notificationPreferences.weeklyReport}
                        onCheckedChange={() => toggleNotificationPreference("weeklyReport")}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Risk Threshold</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Alert me when risk level exceeds:</Label>
                        <span className="font-medium">{riskThreshold[0]}%</span>
                      </div>
                      <Slider
                        defaultValue={[60]}
                        max={100}
                        step={5}
                        value={riskThreshold}
                        onValueChange={setRiskThreshold}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monitored Locations</CardTitle>
                <CardDescription>Add or remove locations you want to monitor for landslide risks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="location-name" className="sr-only">
                      Location Name
                    </Label>
                    <Input
                      id="location-name"
                      placeholder="Enter location name"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                    />
                  </div>
                  <div className="w-24">
                    <Label htmlFor="radius" className="sr-only">
                      Radius (km)
                    </Label>
                    <Select
                      value={newRadius.toString()}
                      onValueChange={(value) => setNewRadius(Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Radius" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 km</SelectItem>
                        <SelectItem value="10">10 km</SelectItem>
                        <SelectItem value="15">15 km</SelectItem>
                        <SelectItem value="20">20 km</SelectItem>
                        <SelectItem value="25">25 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddLocation}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>

                <div className="space-y-2">
                  {monitoredLocations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center border rounded-lg">
                      <MapPin className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No locations added yet. Add a location to monitor.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {monitoredLocations.map((location) => (
                        <div key={location.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{location.name}</span>
                            <Badge variant="outline">{location.radius} km</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MapPin className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleRemoveLocation(location.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Location Monitoring</AlertTitle>
                  <AlertDescription>
                    You will receive alerts for landslide risks in your monitored locations based on your notification
                    preferences and risk threshold.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

