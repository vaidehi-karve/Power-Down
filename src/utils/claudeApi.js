const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY || ''

export async function generateNarration(persona, decision, option, outcome) {
  if (!CLAUDE_API_KEY) return null

  const prompt = `You are narrating outcomes in an energy decision simulation game.

Player profile: ${persona.name} in ${persona.location}
Decision: ${decision.title}
Option chosen: ${option.label}

Real outcomes from EIA data:
- Monthly bill change: ${outcome.monthlyBillChange > 0 ? '+' : ''}$${outcome.monthlyBillChange}
- 5-year savings: $${outcome.fiveYearSavings}
- CO2 avoided per year: ${outcome.co2TonsPerYear} tons
- Upfront cost: $${outcome.upfrontCost}

Write 2-3 sentences that:
1. Acknowledge their specific choice without judging it
2. Give the real financial and environmental numbers
3. Add one surprising real-world fact about this choice

Tone: Informative, honest, never preachy. Audience: General adult public.
Never say "Great choice!" or moralize. Keep it under 60 words.`

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 200,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.content?.[0]?.text ?? null
  } catch {
    return null
  }
}
