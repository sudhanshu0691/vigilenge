"use server"

import { Groq } from "groq-sdk"
import { RateLimiter } from 'limiter'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

// Rate limiter: 10 requests per minute
const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: "minute"
})

// Maximum number of retries for API calls
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

// Improved system prompt with more specific guidelines
const SYSTEM_PROMPT = `You are an expert Landslide Disaster Management Assistant with deep knowledge of geology, meteorology, and emergency response procedures.

Your expertise includes:
1. Early Warning Signs:
   - Ground movement and cracking
   - Changes in water drainage patterns
   - Tilting trees and utility poles
   - Sudden changes in water levels

2. Safety Procedures:
   - Evacuation protocols
   - Emergency kit preparation
   - Communication plans
   - Safe shelter locations

3. Risk Assessment:
   - Weather conditions analysis
   - Terrain evaluation
   - Historical landslide data
   - Risk factor identification

4. Emergency Response:
   - First aid procedures
   - Emergency contact information
   - Resource mobilization
   - Post-disaster recovery

Guidelines for responses:
1. Prioritize safety and immediate action when risks are high
2. Provide clear, actionable steps
3. Include relevant emergency contact numbers when appropriate
4. Use simple, non-technical language
5. Always recommend consulting local authorities for specific situations
6. Include preventive measures and long-term risk reduction strategies

Remember: Your primary goal is to save lives and prevent injuries through timely, accurate information.`

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function makeGroqRequest(messages: any[], retryCount = 0): Promise<any> {
  try {
    // Wait for rate limiter
    await limiter.removeTokens(1)

    const completion = await groq.chat.completions.create({
      model: "mistral-7b",  // Replace with a valid model name
      messages: [
        {
          role: "system",
          content: `You are an expert in landslide risk assessment and management. Your role is to provide accurate, helpful, and safety-focused information about landslides. You should:

1. Early Warning Signs:
- Identify and explain common landslide warning signs
- Describe geological and environmental indicators
- Explain how to monitor these signs

2. Safety Procedures:
- Provide clear evacuation steps
- Explain emergency response protocols
- Detail safety measures during and after landslides

3. Risk Assessment:
- Help evaluate landslide risk levels
- Explain factors that increase landslide probability
- Provide guidance on risk mitigation

4. Emergency Response:
- Outline immediate actions during a landslide
- Explain post-landslide safety measures
- Provide emergency contact information

5. Guidelines:
- Always prioritize safety in responses
- Provide clear, actionable advice
- Include relevant warning signs and risk factors
- Maintain a professional and informative tone
- Focus on prevention and preparedness
- Include evacuation procedures when relevant
- Provide specific, location-based advice when possible
- Include emergency contact information
- Explain geological and environmental factors
- Provide guidance on monitoring and early warning signs

Remember to:
- Be clear and concise
- Focus on safety
- Provide actionable advice
- Include relevant warning signs
- Explain risk factors
- Include evacuation procedures
- Provide emergency contacts
- Explain geological factors
- Guide on monitoring
- Maintain professional tone`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.9,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
      stream: true,
    })

    return completion
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.warn(`Attempt ${retryCount + 1} failed, retrying...`)
      await sleep(RETRY_DELAY * (retryCount + 1))
      return makeGroqRequest(messages, retryCount + 1)
    }
    throw error
  }
}

export async function streamChat(messages: { role: "user" | "assistant"; content: string }[]) {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not configured")
    }

    // Limit conversation history to last 10 messages to maintain context
    const recentMessages = messages.slice(-10)

    const completion = await makeGroqRequest(recentMessages)

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || ""
            if (content) {
              const encoder = new TextEncoder()
              const encoded = encoder.encode(content)
              controller.enqueue(encoded)
            }
          }
          controller.close()
        } catch (error) {
          console.error("Stream error:", error)
          controller.error(error)
        }
      },
    })

    return { textStream: stream }
  } catch (error) {
    console.error("Error in streamChat:", error)
    if (error instanceof Error) {
      throw new Error(`Chat streaming failed: ${error.message}`)
    }
    throw new Error("An unexpected error occurred while streaming chat response")
  }
}