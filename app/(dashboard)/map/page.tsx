"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, AlertTriangle } from "lucide-react"

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  // High-risk locations
  const highRiskLocations = [
    { name: "Munnar", lat: 10.0889, lng: 77.0595, risk: "High" },
    { name: "Wayanad", lat: 11.6854, lng: 76.132, risk: "Medium" },
    { name: "Idukki", lat: 9.9189, lng: 77.1025, risk: "High" },
    { name: "Kozhikode", lat: 11.2588, lng: 75.7804, risk: "Low" },
    { name: "Malappuram", lat: 11.051, lng: 76.0711, risk: "Medium" },
    { name: "Darjeeling", lat: 27.0367, lng: 88.2631, risk: "High" },
    { name: "Sikkim", lat: 27.5330, lng: 88.5122, risk: "High" },
    { name: "Uttarakhand", lat: 30.0668, lng: 79.0193, risk: "Medium" },
    { name: "Himachal Pradesh", lat: 31.1048, lng: 77.1734, risk: "Medium" },
  ]

  // Initialize map
  useEffect(() => {
    if (typeof window !== "undefined" && !mapLoaded) {
      // Load Leaflet script
      const script = document.createElement("script")
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      script.crossOrigin = ""
      script.async = true

      // Load Leaflet CSS
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      link.crossOrigin = ""

      document.head.appendChild(link)

      script.onload = () => {
        setMapLoaded(true)
      }

      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }

    if (mapLoaded && mapRef.current && !map) {
      // @ts-ignore - L comes from the Leaflet script
      const leafletMap = L.map(mapRef.current).setView([10.8505, 76.2711], 8) // Kerala center

      // @ts-ignore
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMap)

      // Add markers for high-risk locations
      highRiskLocations.forEach((location) => {
        // @ts-ignore
        const marker = L.marker([location.lat, location.lng]).addTo(leafletMap)
        marker.bindPopup(`<b>${location.name}</b><br>Risk Level: ${location.risk}`)

        // Add circle overlay to indicate risk level
        const color = location.risk === "High" ? "#ef4444" : location.risk === "Medium" ? "#f59e0b" : "#3b82f6"

        // @ts-ignore
        L.circle([location.lat, location.lng], {
          color: color,
          fillColor: color,
          fillOpacity: 0.2,
          radius: 5000,
        }).addTo(leafletMap)
      })

      setMap(leafletMap)
    }
  }, [mapLoaded, map])

  // Handle search
  const handleSearch = () => {
    if (!searchQuery || !map) return

    const location = highRiskLocations.find((loc) => loc.name.toLowerCase() === searchQuery.toLowerCase())

    if (location) {
      // @ts-ignore
      map.setView([location.lat, location.lng], 12)
      setSelectedLocation(location.name)
    }
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Landslide Risk Map</h1>
        <p className="text-muted-foreground">Visualize landslide-prone areas and monitor risk levels</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-full">
              <div ref={mapRef} className="h-full w-full" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
              <CardDescription>
                {selectedLocation ? `Information about ${selectedLocation}` : "Select a location on the map"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedLocation ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{selectedLocation}</span>
                  </div>

                  {(() => {
                    const location = highRiskLocations.find((loc) => loc.name === selectedLocation)

                    if (location) {
                      return (
                        <>
                          <div className="flex items-center gap-2">
                            <AlertTriangle
                              className={`h-4 w-4 ${
                                location.risk === "High"
                                  ? "text-destructive"
                                  : location.risk === "Medium"
                                    ? "text-orange-500"
                                    : "text-blue-500"
                              }`}
                            />
                            <span>Risk Level: </span>
                            <Badge
                              variant={
                                location.risk === "High"
                                  ? "destructive"
                                  : location.risk === "Medium"
                                    ? "default"
                                    : "outline"
                              }
                            >
                              {location.risk}
                            </Badge>
                          </div>

                          <div className="text-sm space-y-2">
                            <p>
                              <span className="font-medium">Terrain:</span> Mountainous with steep slopes
                            </p>
                            <p>
                              <span className="font-medium">Recent Rainfall:</span>{" "}
                              {location.risk === "High"
                                ? "Heavy (120mm in last 24 hours)"
                                : location.risk === "Medium"
                                  ? "Moderate (85mm in last 24 hours)"
                                  : "Light (45mm in last 24 hours)"}
                            </p>
                            <p>
                              <span className="font-medium">Soil Condition:</span>{" "}
                              {location.risk === "High"
                                ? "Highly saturated"
                                : location.risk === "Medium"
                                  ? "Partially saturated"
                                  : "Stable"}
                            </p>
                            <p>
                              <span className="font-medium">Historical Incidents:</span>{" "}
                              {location.name === "Munnar"
                                ? "18 in last 5 years"
                                : location.name === "Wayanad"
                                  ? "14 in last 5 years"
                                  : location.name === "Idukki"
                                    ? "22 in last 5 years"
                                    : location.name === "Kozhikode"
                                      ? "9 in last 5 years"
                                      : location.name === "Darjeeling"
                                        ? "18 in last 5 years"
                                        : location.name === "Sikkim"
                                          ? "18 in last 5 years"
                                          : location.name === "Uttarakhand"
                                            ? "18 in last 5 years"
                                            : "12 in last 5 years"}
                            </p>
                          </div>
                        </>
                      )
                    }

                    return <p>No data available for this location.</p>
                  })()}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mb-2" />
                  <p>Select a location on the map to view details</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Levels</CardTitle>
              <CardDescription>Understanding the landslide risk indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive" />
                  <span className="font-medium">High Risk</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Areas with steep slopes, heavy rainfall, and history of landslides. Immediate precautions required.
                </p>

                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-orange-500" />
                  <span className="font-medium">Medium Risk</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Areas with moderate slopes and rainfall. Stay alert and monitor conditions.
                </p>

                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="font-medium">Low Risk</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Areas with gentle slopes and minimal rainfall. Basic precautions advised.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

