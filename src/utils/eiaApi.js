import cachedData from '../data/eia_cached.json'

const EIA_BASE = 'https://api.eia.gov/v2'
const API_KEY = import.meta.env.VITE_EIA_API_KEY || ''

async function fetchEIA(endpoint, params) {
  if (!API_KEY) return null
  const url = new URL(`${EIA_BASE}${endpoint}`)
  url.searchParams.set('api_key', API_KEY)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  try {
    const res = await fetch(url.toString())
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function getCAElectricityPrice() {
  const data = await fetchEIA('/electricity/retail-sales/data', {
    'data[]': 'price',
    'facets[sectorid][]': 'RES',
    'facets[stateid][]': 'CA',
    frequency: 'annual',
    'sort[0][column]': 'period',
    'sort[0][direction]': 'desc',
    length: 1,
  })
  if (data?.response?.data?.[0]?.price) {
    return parseFloat(data.response.data[0].price) / 100 // convert cents to dollars
  }
  return cachedData.electricityPrices.CA.residential
}

export async function getCASolarGeneration() {
  const data = await fetchEIA('/electricity/electric-power-operational-data/data', {
    'data[]': 'generation',
    'facets[fueltypeid][]': 'SUN',
    'facets[location][]': 'CA',
    frequency: 'annual',
    'sort[0][column]': 'period',
    'sort[0][direction]': 'desc',
    length: 8,
  })
  if (data?.response?.data?.length) {
    return data.response.data.map((d) => ({
      year: parseInt(d.period),
      gwh: Math.round(parseFloat(d.generation) / 1000),
    })).reverse()
  }
  return cachedData.solarGeneration.CA.trend
}

export async function getCACO2Trend() {
  const data = await fetchEIA('/co2-emissions/co2-emissions-aggregates/data', {
    'data[]': 'value',
    'facets[stateId][]': 'CA',
    'facets[sectorId][]': 'EC',
    frequency: 'annual',
    'sort[0][column]': 'period',
    'sort[0][direction]': 'desc',
    length: 8,
  })
  if (data?.response?.data?.length) {
    return data.response.data.map((d) => ({
      year: parseInt(d.period),
      mmt: Math.round(parseFloat(d.value) * 10) / 10,
    })).reverse()
  }
  return cachedData.co2Emissions.CA.trend
}

export function getEnergyMix() {
  return cachedData.energyMix.CA.mix
}

export function getCachedData() {
  return cachedData
}
