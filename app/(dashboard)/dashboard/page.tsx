"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, X, Bot } from "lucide-react";
import { LineChart, BarChart } from "@/components/ui/chart";
import { useChat } from "@/components/chat-provider";
import { WeatherCard } from "@/components/weather-card";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ref, onValue } from "firebase/database";
import { firebaseDatabase } from "@/firebase/Firebase";
import { Chart, ChartOptions } from "chart.js";

export default function DashboardPage() {
  const chartRef = useRef<Chart<"line"> | null>(null);
  const [showWarning, setShowWarning] = useState(true);
  const [chartDataInfo, setChartDataInfo] = useState({
    labels: [],
    rain: [],
    soil: [],
  });

  const isNDRF = useSelector(
    (state: RootState) => state.userInfo.usertype === "ndrf"
  );

  const chatContext = useChat();

  useEffect(() => {
    const usersRef = ref(firebaseDatabase, "/");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setChartDataInfo({
          labels: data?.sensor_data?.rain
            .map((ele: any) => new Date(ele.timestamp))
            .slice(-30),
          rain: data?.sensor_data?.rain
            .map((ele: any) => new Date(ele.value))
            .slice(-30),
          soil: data?.sensor_data?.soil
            .map((ele: any) => new Date(ele.value))
            .slice(-30),
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const lineChartData = useMemo(() => {
    return {
      labels: chartDataInfo.labels,
      datasets: [
        {
          label: "Rainfall (mm)",
          data: chartDataInfo.rain,
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.3,
          fill: true,
        },
        {
          label: "Landslide Risk Index",
          data: chartDataInfo.soil,
          borderColor: "rgb(239, 68, 68)",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }, [chartDataInfo]);

  useEffect(() => {
    if (
      chartRef.current &&
      lineChartData.labels &&
      lineChartData.labels.length > 0
    ) {
      const chart = chartRef.current;
      const latest = new Date(
        lineChartData.labels[lineChartData.labels.length - 1] as Date
      );
      const windowSize = 20 * 60 * 1000;

      const from = new Date(latest.getTime() - windowSize);
      const to = latest;

      if (chart.options.scales && chart.options.scales.x) {
        // @ts-ignore
        chart.options.scales.x.min = from;
        // @ts-ignore
        chart.options.scales.x.max = to;
        chart.update("none");
      }
    }
  }, [lineChartData]);

  const barChartData = {
    labels: ["Mumbai", "Delhi", "Indore", "jabalpur", "Kanpur"],
    datasets: [
      {
        label: "Landslide Incidents (Last 5 Years)",
        data: [18, 14, 22, 9, 12],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
      },
    ],
  };

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
  ];

  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second",
          // @ts-expect-error: stepSize is allowed but not typed
          stepSize: 2,
          tooltipFormat: "HH:mm:ss",
          displayFormats: {
            minute: "HH:mm",
          },
        },
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: false,
        },
        zoom: {
          wheel: {
            enabled: false,
          },
          pinch: {
            enabled: false,
          },
        },
      },
    },
  };

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
          Monitor landslide risks, weather conditions, and receive real-time
          alerts
        </p>
      </div>

      {showWarning && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            High landslide risk detected in Munnar region due to continuous
            heavy rainfall. Please stay alert and follow safety guidelines.
          </AlertDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => setShowWarning(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isNDRF && (
          <Card className="col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle>Landslide Risk Monitoring</CardTitle>
              <CardDescription>
                Rainfall and landslide risk index over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart
                data={lineChartData}
                className="aspect-[2/1] w-full"
                options={options}
                chartRef={chartRef}
              />
            </CardContent>
          </Card>
        )}

        <WeatherCard />

        {isNDRF && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Landslide Incidents by Region</CardTitle>
              <CardDescription>
                Historical data from the past 5 years
              </CardDescription>
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
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Latest News</CardTitle>
            <CardDescription>Recent updates and announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newsData.map((item, index) => (
                <div
                  key={index}
                  className="border-b pb-3 last:border-0 last:pb-0"
                >
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
  );
}
