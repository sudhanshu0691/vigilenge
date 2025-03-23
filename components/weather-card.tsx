"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { CloudRain, Thermometer, Wind, Droplets, RefreshCw, Info } from "lucide-react"
import { getMultiLocationWeather } from "@/app/actions/weather"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WeatherData {
  location: string
  temperature: number
  rainfall: number
  windSpeed: number
  humidity: number
  alert: "High" | "Medium" | "Low"
  description: string
  icon: string
}

export function WeatherCard() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  const highRiskLocations = ["Darjeeling", "Sikkim", "Uttarakhand", "Himachal Pradesh"]

  async function fetchWeatherData() {
    try {
      setIsLoading(true)
      setError(null)
      setUsingFallback(false)

      const data = await getMultiLocationWeather(highRiskLocations)
      
      // Check if we're using fallback data
      const isFallback = data.some((item) => item.description === "Offline data")
      setUsingFallback(isFallback)
      setWeatherData(data)
      
      if (isFallback) {
        setError("Using offline weather data. Live updates unavailable.")
      }
    } catch (err) {
      console.error("Weather card error:", err)
      setError("Failed to fetch weather data. Using historical data.")
      setUsingFallback(true)
      
      // Set fallback data
      const fallbackData = highRiskLocations.map(location => ({
        location,
        temperature: 25,
        rainfall: 50,
        windSpeed: 12,
        humidity: 70,
        alert: "Medium" as const,
        description: "Offline data",
        icon: "//cdn.weatherapi.com/weather/64x64/day/296.png"
      }))
      setWeatherData(fallbackData)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherData()

    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Weather Updates</CardTitle>
          <CardDescription>Current conditions in high-risk areas</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={fetchWeatherData} disabled={isLoading} className="h-8 w-8 p-0">
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          <span className="sr-only">Refresh</span>
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="default" className="mb-4 bg-amber-50 text-amber-800 dark:bg-amber-900 dark:text-amber-50">
            <Info className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-40" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))
          ) : weatherData.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No weather data available</p>
          ) : (
            weatherData.map((item, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{item.location}</p>
                    {item.icon && !usingFallback && (
                      <img
                        src={item.icon.startsWith("http") ? item.icon : `https:${item.icon}`}
                        alt={item.description}
                        className="h-6 w-6"
                      />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Thermometer className="h-3 w-3" />
                    <span>{item.temperature}°C</span>
                    <CloudRain className="h-3 w-3 ml-2" />
                    <span>{item.rainfall}mm</span>
                    <Wind className="h-3 w-3 ml-2" />
                    <span>{item.windSpeed} km/h</span>
                    <Droplets className="h-3 w-3 ml-2" />
                    <span>{item.humidity}%</span>
                  </div>
                </div>
                <Badge
                  variant={item.alert === "High" ? "destructive" : item.alert === "Medium" ? "default" : "outline"}
                >
                  {item.alert}
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

