import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''

export async function getDidYouKnow(persona, decision, option, outcome) {
  if (!API_KEY) return null
  try {
    const genAI = new GoogleGenerativeAI(API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const prompt = `A ${persona.name} just made this energy decision: ${decision.title}
They chose: ${option.label}
Result: Bill changed by $${outcome.monthlyBillChange}/month, avoided ${outcome.co2TonsPerYear} tons of CO2/year.

Write 2-3 sentences for a high school student explaining one surprising or counterintuitive fact about this choice that they probably didn't know. Be specific with real numbers. Do not repeat the outcome they already saw. Start with "Did you know..." Keep it under 60 words. No bullet points.`

    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch {
    return null
  }
}
