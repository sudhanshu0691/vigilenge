"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, X, Bot } from "lucide-react"
import { LineChart, BarChart } from "@/components/ui/chart"
import { useChat } from "@/components/chat-provider"
import { WeatherCard } from "@/components/weather-card"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { ref, onValue } from "firebase/database";
import { firebaseDatabase } from "@/firebase/Firebase"

export default function DashboardPage() {
  const [showWarning, setShowWarning] = useState(true)
  const [chartData, setChartData] = useState({ rain: [], soil: [] });

  const isNDRF = useSelector((state: RootState) => state.userInfo.usertype === "ndrf");

  const chatContext = useChat()

  useEffect(() => {
    const usersRef = ref(firebaseDatabase, "/"); // Get reference to your Firebase Realtime Database
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        if (data?.sensor_data) {
          setChartData({
            rain: data?.sensor_data?.rain?.map((ele: any) => ele.value),
            soil: data?.sensor_data?.soil?.map((ele: any) => ele.value),
          })
        }
      } else {
        setChartData({
          rain: [],
          soil: [],
        })
      }
    });


    return () => unsubscribe();

  }, []);

  console.log("chartData", chartData)
  // Simulated data for charts
  const lineChartData = useMemo(() => {
    return {
      datasets: [
        {
          label: "Rainfall (mm)",
          data: chartData.rain,
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Landslide Risk Index",
          data: chartData.soil,
          borderColor: "rgb(239, 68, 68)",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    }
  }, [chartData])

  const barChartData = {
    labels: ["Mumbai", "Delhi", "Indore", "jabalpur", "Kanpur"],
    datasets: [
      {
        label: "Landslide Incidents (Last 5 Years)",
        data: [18, 14, 22, 9, 12],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
    ],
  }

  // Weather data
  const weatherData = [
    {
      location: "Mumbai",
      temperature: "22°C",
      rainfall: "120mm",
      windSpeed: "15 km/h",
      alert: "High",
    },
    {
      location: "Delhi",
      temperature: "24°C",
      rainfall: "85mm",
      windSpeed: "12 km/h",
      alert: "Medium",
    },
    {
      location: "Jabalpur",
      temperature: "23°C",
      rainfall: "110mm",
      windSpeed: "18 km/h",
      alert: "High",
    },
    {
      location: "Kanpur",
      temperature: "27°C",
      rainfall: "45mm",
      windSpeed: "10 km/h",
      alert: "Low",
    },
  ]

  // News data
  const newsData = [
    {
      title: "Heavy rainfall expected in Western Ghats region",
      date: "Today",
      source: "Weather Department",
    },
    {
      title: "New landslide prevention measures implemented in Munnar",
      date: "Yesterday",
      source: "Disaster Management Authority",
    },
    {
      title: "Evacuation drill conducted in landslide-prone areas",
      date: "2 days ago",
      source: "Local Administration",
    },
    {
      title: "Research team develops new landslide prediction model",
      date: "3 days ago",
      source: "Science Journal",
    },
  ]

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={() => chatContext.openChat()} className="gap-2">
            <Bot className="h-4 w-4" />
            Chat with AI Assistant
          </Button>
        </div>
        <p className="text-muted-foreground">
          Monitor landslide risks, weather conditions, and receive real-time alerts
        </p>
      </div>

      {showWarning && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            High landslide risk detected in Munnar region due to continuous heavy rainfall. Please stay alert and follow
            safety guidelines.
          </AlertDescription>
          <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={() => setShowWarning(false)}>
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isNDRF && <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle>Landslide Risk Monitoring</CardTitle>
            <CardDescription>Rainfall and landslide risk index over time</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={lineChartData}
              className="aspect-[2/1] w-full"
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Value",
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
        </Card>}

        <WeatherCard />

        {isNDRF && <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Landslide Incidents by Region</CardTitle>
            <CardDescription>Historical data from the past 5 years</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={barChartData}
              className="aspect-[2/1] w-full"
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Number of Incidents",
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </CardContent>
        </Card>}


        <Card>
          <CardHeader>
            <CardTitle>Latest News</CardTitle>
            <CardDescription>Recent updates and announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newsData.map((item, index) => (
                <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                  <h4 className="font-medium">{item.title}</h4>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{item.date}</span>
                    <span>{item.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

