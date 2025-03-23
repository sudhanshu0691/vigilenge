"use client"

import { useState } from "react"
import { RiskAssessment } from "@/components/risk-assessment"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart } from "@/components/ui/chart"

export default function RiskAssessmentPage() {
  const [activeTab, setActiveTab] = useState("current")

  // Sample historical risk data for charts
  const historicalRiskData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Munnar",
        data: [30, 35, 40, 50, 70, 85, 95, 90, 75, 60, 45, 35],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.3,
      },
      {
        label: "Wayanad",
        data: [25, 30, 35, 45, 60, 75, 80, 75, 65, 50, 40, 30],
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        tension: 0.3,
      },
      {
        label: "Idukki",
        data: [35, 40, 45, 55, 75, 90, 100, 95, 80, 65, 50, 40],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.3,
      },
      {
        label: "Kozhikode",
        data: [20, 25, 30, 35, 45, 55, 60, 55, 45, 35, 30, 25],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
      },
      {
        label: "Darjeeling",
        data: [30, 35, 40, 50, 70, 85, 95, 90, 75, 60, 45, 35],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.3,
      },
      {
        label: "Sikkim",
        data: [25, 30, 35, 45, 60, 75, 80, 75, 65, 50, 40, 30],
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        tension: 0.3,
      },
      {
        label: "Uttarakhand",
        data: [35, 40, 45, 55, 75, 90, 100, 95, 80, 65, 50, 40],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.3,
      },
      {
        label: "Himachal Pradesh",
        data: [20, 25, 30, 35, 45, 55, 60, 55, 45, 35, 30, 25],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
      },
    ],
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Risk Assessment</h1>
        <p className="text-muted-foreground">
          Analyze landslide risk factors and get recommendations for specific locations
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="current">Current Assessment</TabsTrigger>
          <TabsTrigger value="historical">Historical Data</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <RiskAssessment />

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Factors Explained</CardTitle>
                  <CardDescription>Understanding the key factors that contribute to landslide risk</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Rainfall</h3>
                    <p className="text-sm text-muted-foreground">
                      Heavy rainfall is one of the primary triggers for landslides. Soil becomes saturated, increasing
                      weight and reducing cohesion.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Soil Saturation</h3>
                    <p className="text-sm text-muted-foreground">
                      Indicates how much water the soil is holding. Higher saturation levels mean the soil is less
                      stable and more prone to movement.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Slope</h3>
                    <p className="text-sm text-muted-foreground">
                      Steeper slopes have a higher risk of landslides. Angles above 25° are generally considered
                      high-risk.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Vegetation</h3>
                    <p className="text-sm text-muted-foreground">
                      Plant roots help stabilize soil. Areas with low vegetation cover are more susceptible to
                      landslides.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Safety Guidelines</CardTitle>
                  <CardDescription>What to do before, during, and after a landslide</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Before a Landslide</h3>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-1">
                      <li>Be aware of warning signs like cracks in the ground or tilting trees</li>
                      <li>Prepare an emergency kit and evacuation plan</li>
                      <li>Monitor local news and weather forecasts</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium">During a Landslide</h3>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-1">
                      <li>Evacuate immediately if instructed</li>
                      <li>Move away from the path of the landslide</li>
                      <li>If escape is not possible, curl into a tight ball and protect your head</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium">After a Landslide</h3>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-1">
                      <li>Stay away from the slide area</li>
                      <li>Check for injured or trapped people without entering the slide area</li>
                      <li>Report broken utility lines to appropriate authorities</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="historical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historical Risk Levels</CardTitle>
              <CardDescription>Annual risk level trends for monitored locations</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={historicalRiskData}
                className="aspect-[2/1] w-full"
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Risk Index",
                      },
                      max: 100,
                    },
                    x: {
                      title: {
                        display: true,
                        text: "Month",
                      },
                    },
                  },
                  plugins: {
                    tooltip: {
                      mode: "index",
                      intersect: false,
                    },
                    legend: {
                      position: "top",
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Historical Incidents</CardTitle>
                <CardDescription>Major landslide events in the past 5 years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Munnar Landslide</h3>
                      <span className="text-sm text-muted-foreground">August 2023</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Heavy monsoon rainfall triggered a major landslide that affected 3 villages. 15 casualties
                      reported and significant infrastructure damage.
                    </p>
                    <div className="flex justify-end">
                      <a href="#" className="text-sm text-primary hover:underline">
                        View details
                      </a>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Wayanad Landslide</h3>
                      <span className="text-sm text-muted-foreground">July 2022</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Continuous rainfall for 72 hours caused multiple landslides. 8 casualties reported and 120 people
                      evacuated.
                    </p>
                    <div className="flex justify-end">
                      <a href="#" className="text-sm text-primary hover:underline">
                        View details
                      </a>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Idukki Landslide</h3>
                      <span className="text-sm text-muted-foreground">August 2021</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Major landslide near Idukki dam area. 22 casualties and severe damage to agricultural land.
                    </p>
                    <div className="flex justify-end">
                      <a href="#" className="text-sm text-primary hover:underline">
                        View details
                      </a>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Darjeeling Landslide</h3>
                      <span className="text-sm text-muted-foreground">August 2023</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Heavy monsoon rainfall triggered a major landslide that affected 3 villages. 15 casualties
                      reported and significant infrastructure damage.
                    </p>
                    <div className="flex justify-end">
                      <a href="#" className="text-sm text-primary hover:underline">
                        View details
                      </a>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Sikkim Landslide</h3>
                      <span className="text-sm text-muted-foreground">July 2022</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Continuous rainfall for 72 hours caused multiple landslides. 8 casualties reported and 120 people
                      evacuated.
                    </p>
                    <div className="flex justify-end">
                      <a href="#" className="text-sm text-primary hover:underline">
                        View details
                      </a>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Uttarakhand Landslide</h3>
                      <span className="text-sm text-muted-foreground">August 2021</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Major landslide near Uttarakhand dam area. 22 casualties and severe damage to agricultural land.
                    </p>
                    <div className="flex justify-end">
                      <a href="#" className="text-sm text-primary hover:underline">
                        View details
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Factors Analysis</CardTitle>
                <CardDescription>Historical trends in key risk factors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Annual Rainfall Trends</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Average annual rainfall has increased by 12% over the past decade in high-risk areas.
                    </p>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: "72%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>2015</span>
                      <span>2025</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Deforestation Impact</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Areas with more than 30% forest cover loss have experienced a 40% increase in landslide frequency.
                    </p>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-red-500 rounded-full" style={{ width: "40%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Low Impact</span>
                      <span>High Impact</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Soil Erosion Patterns</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Soil erosion rates have increased by 25% in monitored areas, contributing to increased landslide
                      susceptibility.
                    </p>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-orange-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>2015</span>
                      <span>2025</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

