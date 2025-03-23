"use client"

import type * as React from "react"
import { Line, Bar, Pie, Scatter, Bubble, Radar, PolarArea, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale,
} from "chart.js"
import { cn } from "@/lib/utils"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale,
)

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any
  options?: any
}

function LineChart({ data, options, className, ...props }: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <Line data={data} options={options} />
    </div>
  )
}

function BarChart({ data, options, className, ...props }: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <Bar data={data} options={options} />
    </div>
  )
}

function PieChart({ data, options, className, ...props }: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <Pie data={data} options={options} />
    </div>
  )
}

function DoughnutChart({ data, options, className, ...props }: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <Doughnut data={data} options={options} />
    </div>
  )
}

function ScatterChart({ data, options, className, ...props }: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <Scatter data={data} options={options} />
    </div>
  )
}

function BubbleChart({ data, options, className, ...props }: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <Bubble data={data} options={options} />
    </div>
  )
}

function RadarChart({ data, options, className, ...props }: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <Radar data={data} options={options} />
    </div>
  )
}

function PolarAreaChart({ data, options, className, ...props }: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <PolarArea data={data} options={options} />
    </div>
  )
}

export { LineChart, BarChart, PieChart, DoughnutChart, ScatterChart, BubbleChart, RadarChart, PolarAreaChart }

