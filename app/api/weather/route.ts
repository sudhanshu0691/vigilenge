import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This is a mock API endpoint that provides fallback weather data
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const location = searchParams.get("location")?.toLowerCase() || ""

  // Mock data for different locations
  const mockData: Record<string, any> = {
    darjeeling: {
      location: {
        name: "Darjeeling",
        region: "West Bengal",
        country: "India",
      },
      current: {
        temp_c: 22,
        precip_mm: 95,
        wind_kph: 12,
        humidity: 80,
        condition: {
          text: "Heavy rain",
          icon: "//cdn.weatherapi.com/weather/64x64/day/308.png",
        },
      },
    },
    sikkim: {
      location: {
        name: "Sikkim",
        region: "Sikkim",
        country: "India",
      },
      current: {
        temp_c: 20,
        precip_mm: 90,
        wind_kph: 10,
        humidity: 85,
        condition: {
          text: "Heavy rain",
          icon: "//cdn.weatherapi.com/weather/64x64/day/308.png",
        },
      },
    },
    uttarakhand: {
      location: {
        name: "Uttarakhand",
        region: "Uttarakhand",
        country: "India",
      },
      current: {
        temp_c: 25,
        precip_mm: 60,
        wind_kph: 15,
        humidity: 70,
        condition: {
          text: "Moderate rain",
          icon: "//cdn.weatherapi.com/weather/64x64/day/302.png",
        },
      },
    },
    himachal: {
      location: {
        name: "Himachal Pradesh",
        region: "Himachal Pradesh",
        country: "India",
      },
      current: {
        temp_c: 23,
        precip_mm: 55,
        wind_kph: 13,
        humidity: 75,
        condition: {
          text: "Moderate rain",
          icon: "//cdn.weatherapi.com/weather/64x64/day/302.png",
        },
      },
    },
  }

  // Default data if location not found
  const defaultData = {
    location: {
      name: location || "Unknown",
      region: "India",
      country: "India",
    },
    current: {
      temp_c: 25,
      precip_mm: 50,
      wind_kph: 12,
      humidity: 70,
      condition: {
        text: "Cloudy",
        icon: "//cdn.weatherapi.com/weather/64x64/day/119.png",
      },
    },
  }

  // Return data for the requested location or default data
  return NextResponse.json(mockData[location] || defaultData)
}

export const locationData = {
  darjeeling: {
    lat: 27.0367,
    lon: 88.2631,
    name: "Darjeeling",
    state: "West Bengal",
    country: "IN",
  },
  sikkim: {
    lat: 27.5330,
    lon: 88.5122,
    name: "Sikkim",
    state: "Sikkim",
    country: "IN",
  },
  uttarakhand: {
    lat: 30.0668,
    lon: 79.0193,
    name: "Uttarakhand",
    state: "Uttarakhand",
    country: "IN",
  },
  himachal: {
    lat: 31.1048,
    lon: 77.1734,
    name: "Himachal Pradesh",
    state: "Himachal Pradesh",
    country: "IN",
  },
}

