import { EIA_CONSTANTS } from '../data/outcomes'

const {
  CA_GRID_CO2_LBS_PER_KWH,
  GAS_CO2_LBS_PER_GALLON,
  AVG_MILES_PER_YEAR,
  GAS_CAR_MPG,
} = EIA_CONSTANTS

// Equivalent comparisons for CO2 tons — EPA standard factors
export function co2Equivalents(tonsPerYear) {
  return {
    trees: Math.round(tonsPerYear * 45),           // EPA: 1 tree absorbs ~48 lbs CO2/yr
    carMilesDriven: Math.round(tonsPerYear * 2475), // EPA: 404g CO2/mile avg car
    flightMiles: Math.round((tonsPerYear * 2000) / 0.217), // EPA: 0.217 lbs CO2 per passenger mile flown
    gasGallons: Math.round(tonsPerYear * 2000 / GAS_CO2_LBS_PER_GALLON),
  }
}

// What % of CA grid annual generation does household impact represent
export function gridContributionPct(annualKwh) {
  const CA_ANNUAL_GRID_GWH = 255000 // EIA 2023
  return ((annualKwh / (CA_ANNUAL_GRID_GWH * 1e6)) * 100).toFixed(4)
}

// Neighborhood scale-up: if 20% of households in a 500-unit area adopt
export function neighborhoodImpact(annualCO2Tons) {
  const HOUSEHOLDS = 500
  const ADOPTION_PCT = 0.2
  return Math.round(annualCO2Tons * HOUSEHOLDS * ADOPTION_PCT)
}

// Format currency
export function fmt$(amount) {
  if (amount === null || amount === undefined) return '—'
  const abs = Math.abs(Math.round(amount))
  const str = abs.toLocaleString()
  if (amount < 0) return `-$${str}`
  return `$${str}`
}

// Format CO2 with sign
export function fmtCO2(tons) {
  if (!tons) return '0 tons'
  const t = Math.round(Math.abs(tons) * 10) / 10
  return `${t} tons`
}

// Payback label
export function paybackLabel(months) {
  if (months === null || months === undefined) return null
  if (months === 0) return 'Immediate'
  if (months < 12) return `${months} months`
  const years = Math.round(months / 12 * 10) / 10
  return `${years} years`
}

// Annual gas car CO2
export const annualGasCarCO2Tons =
  (AVG_MILES_PER_YEAR / GAS_CAR_MPG) * GAS_CO2_LBS_PER_GALLON / 2000

// Game score — used in LeftPanel, ScoreHUD, FinalScreen
export function calcScore(co2, savings) {
  return Math.max(0, Math.round(co2 * 50 + savings / 10))
}
