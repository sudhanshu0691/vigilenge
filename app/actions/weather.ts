"use server"

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

export async function getWeatherData(location: string): Promise<WeatherData> {
  try {
    const apiKey = process.env.WEATHER_API_KEY
    if (!apiKey) {
      throw new Error("Weather API key is not configured")
    }
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`
    
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      location: data.location.name,
      temperature: data.current.temp_c,
      rainfall: data.current.precip_mm,
      windSpeed: data.current.wind_kph,
      humidity: data.current.humidity,
      alert: determineAlertLevel(data.current.precip_mm, data.current.humidity),
      description: data.current.condition.text,
      icon: data.current.condition.icon,
    }
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return getFallbackWeatherData(location)
  }
}

function determineAlertLevel(rainfall: number, humidity: number): "High" | "Medium" | "Low" {
  if (rainfall > 100 && humidity > 85) {
    return "High"
  } else if (rainfall > 50 && humidity > 70) {
    return "Medium"
  } else {
    return "Low"
  }
}

export async function getMultiLocationWeather(locations: string[]): Promise<WeatherData[]> {
  try {
    const weatherPromises = locations.map((location) => getWeatherData(location))
    return await Promise.all(weatherPromises)
  } catch (error) {
    console.error("Error fetching multi-location weather:", error)
    return locations.map((location) => getFallbackWeatherData(location))
  }
}

function getFallbackWeatherData(location: string): WeatherData {
  const mockData = {
    darjeeling: {
      temperature: 22,
      rainfall: 95,
      windSpeed: 12,
      humidity: 80,
      alert: "High",
      description: "Heavy rainfall expected",
      icon: "10d",
    },
    sikkim: {
      temperature: 20,
      rainfall: 90,
      windSpeed: 10,
      humidity: 85,
      alert: "High",
      description: "Heavy rainfall expected",
      icon: "10d",
    },
    uttarakhand: {
      temperature: 25,
      rainfall: 60,
      windSpeed: 15,
      humidity: 70,
      alert: "Medium",
      description: "Moderate rainfall expected",
      icon: "10d",
    },
    himachal: {
      temperature: 23,
      rainfall: 55,
      windSpeed: 13,
      humidity: 75,
      alert: "Medium",
      description: "Moderate rainfall expected",
      icon: "10d",
    },
  }

  const normalizedLocation = location.toLowerCase()
  const mockLocationData = mockData[normalizedLocation] || {
    temperature: 25,
    rainfall: 50,
    windSpeed: 12,
    humidity: 70,
    alert: "Medium",
    description: "Cloudy",
  }

  return {
    location: location,
    temperature: mockLocationData.temperature,
    rainfall: mockLocationData.rainfall,
    windSpeed: mockLocationData.windSpeed,
    humidity: mockLocationData.humidity,
    alert: mockLocationData.alert,
    description: "Offline data",
    icon: "//cdn.weatherapi.com/weather/64x64/day/296.png",
  }
} 