import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Mock data for different locations
const riskData = {
  darjeeling: {
    name: "Darjeeling",
    risk: "High",
    factors: {
      rainfall: 85,
      slope: 75,
      soil: 70,
      vegetation: 65,
    },
    historical: [
      { date: "2023-08-15", severity: "High", casualties: 12 },
      { date: "2023-07-20", severity: "Medium", casualties: 5 },
    ],
  },
  sikkim: {
    name: "Sikkim",
    risk: "High",
    factors: {
      rainfall: 80,
      slope: 70,
      soil: 75,
      vegetation: 60,
    },
    historical: [
      { date: "2023-09-10", severity: "High", casualties: 15 },
      { date: "2023-08-25", severity: "Medium", casualties: 8 },
    ],
  },
  uttarakhand: {
    name: "Uttarakhand",
    risk: "Medium",
    factors: {
      rainfall: 70,
      slope: 65,
      soil: 60,
      vegetation: 55,
    },
    historical: [
      { date: "2023-07-15", severity: "Medium", casualties: 6 },
      { date: "2023-06-20", severity: "Low", casualties: 2 },
    ],
  },
  himachal: {
    name: "Himachal Pradesh",
    risk: "Medium",
    factors: {
      rainfall: 65,
      slope: 60,
      soil: 55,
      vegetation: 50,
    },
    historical: [
      { date: "2023-08-05", severity: "Medium", casualties: 4 },
      { date: "2023-07-10", severity: "Low", casualties: 1 },
    ],
  },
  munnar: {
    currentRisk: "high",
    riskFactors: {
      rainfall: 120,
      soilSaturation: 85,
      slope: 30,
      vegetation: "low",
    },
    historicalIncidents: 18,
    recommendations: [
      "Avoid travel to this area",
      "Follow evacuation orders if issued",
      "Monitor local news for updates",
    ],
  },
  wayanad: {
    currentRisk: "medium",
    riskFactors: {
      rainfall: 85,
      soilSaturation: 70,
      slope: 25,
      vegetation: "moderate",
    },
    historicalIncidents: 14,
    recommendations: [
      "Be prepared for possible evacuation",
      "Secure loose items outside your home",
      "Have emergency supplies ready",
    ],
  },
  idukki: {
    currentRisk: "high",
    riskFactors: {
      rainfall: 110,
      soilSaturation: 80,
      slope: 35,
      vegetation: "low",
    },
    historicalIncidents: 22,
    recommendations: [
      "Avoid travel to this area",
      "Follow evacuation orders if issued",
      "Monitor local news for updates",
    ],
  },
  kozhikode: {
    currentRisk: "low",
    riskFactors: {
      rainfall: 45,
      soilSaturation: 50,
      slope: 15,
      vegetation: "high",
    },
    historicalIncidents: 9,
    recommendations: [
      "Stay informed about weather conditions",
      "Be aware of warning signs of landslides",
      "Review your emergency plan",
    ],
  },
}

// This is a mock API endpoint - in a real app, you would connect to a database or external service
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const location = searchParams.get("location")

  // If a specific location is requested, return data for that location
  if (location && location.toLowerCase() in riskData) {
    return NextResponse.json(riskData[location.toLowerCase()])
  }

  // Otherwise return data for all locations
  return NextResponse.json({
    locations: Object.keys(riskData).map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      ...riskData[key],
    })),
  })
}

