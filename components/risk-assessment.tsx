"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Info, CheckCircle2 } from "lucide-react"

interface RiskAssessmentProps {
  location?: string
}

interface RiskData {
  currentRisk: "high" | "medium" | "low"
  riskFactors: {
    rainfall: number
    soilSaturation: number
    slope: number
    vegetation: string
  }
  historicalIncidents: number
  recommendations: string[]
}

export function RiskAssessment({ location }: RiskAssessmentProps) {
  const [selectedLocation, setSelectedLocation] = useState(location || "")
  const [riskData, setRiskData] = useState<RiskData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const locations = ["Darjeeling", "Sikkim", "Uttarakhand", "Himachal Pradesh"]

  useEffect(() => {
    if (selectedLocation) {
      fetchRiskData(selectedLocation)
    }
  }, [selectedLocation])

  async function fetchRiskData(location: string) {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/landslide-risk?location=${location.toLowerCase()}`)
      if (!response.ok) {
        throw new Error("Failed to fetch risk data")
      }
      const data = await response.json()
      setRiskData(data)
    } catch (err) {
      setError("Could not load risk assessment data. Please try again later.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Landslide Risk Assessment</CardTitle>
        <CardDescription>Detailed risk analysis and recommendations</CardDescription>
        <div className="mt-4">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : riskData ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Current Risk Level</h3>
              <Badge
                variant={
                  riskData.currentRisk === "high"
                    ? "destructive"
                    : riskData.currentRisk === "medium"
                      ? "default"
                      : "outline"
                }
                className="text-sm px-3 py-1"
              >
                {riskData.currentRisk.toUpperCase()}
              </Badge>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Risk Factors</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Rainfall</p>
                  <p className="text-2xl font-bold">{riskData.riskFactors.rainfall} mm</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Soil Saturation</p>
                  <p className="text-2xl font-bold">{riskData.riskFactors.soilSaturation}%</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Slope</p>
                  <p className="text-2xl font-bold">{riskData.riskFactors.slope}°</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Vegetation</p>
                  <p className="text-2xl font-bold capitalize">{riskData.riskFactors.vegetation}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Historical Incidents</h3>
              <p className="text-muted-foreground">
                This area has experienced <span className="font-bold">{riskData.historicalIncidents}</span> landslide
                incidents in the past 5 years.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Recommendations</h3>
              <ul className="space-y-2">
                {riskData.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Alert className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-50">
              <Info className="h-4 w-4" />
              <AlertTitle>Important Note</AlertTitle>
              <AlertDescription>
                This risk assessment is based on current data and historical patterns. Always follow instructions from
                local authorities during emergencies.
              </AlertDescription>
            </Alert>
          </div>
        ) : selectedLocation ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Info className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Select a location to view risk assessment</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

