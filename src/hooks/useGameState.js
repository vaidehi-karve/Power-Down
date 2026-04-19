import { useState, useCallback } from 'react'
import { getDecisionsForPersona } from '../data/decisions'
import { getOutcome } from '../data/outcomes'

const initialState = {
  persona: null,
  round: 0,
  decisions: [],
  totalBillSavings: 0,
  totalCO2Avoided: 0,
  totalUpfrontCost: 0,
  currentMonthlyBill: 0,
  hasSolar: false,
  hasEV: false,
  hasSmartThermostat: false,
  onTOUPlan: false,
  noCar: false,
  hasHeatPump: false,
  hasSolarWater: false,
  hasGasHeater: false,
  hasGasCar: false,
  hasCARE: false,
  hasCommunitySolarBadge: false,
  joinedCommunitySolar: false,
  communityDone: false,
  votedYesCharger: false,
  screen: 'welcome', // welcome | persona | decision | outcome | final
  lastOutcome: null,
}

export function useGameState() {
  const [state, setState] = useState(initialState)

  const selectPersona = useCallback((persona) => {
    setState((s) => ({
      ...s,
      persona,
      currentMonthlyBill: persona.monthlyBill,
      screen: 'decision',
      round: 0,
    }))
  }, [])

  const makeDecision = useCallback((decisionId, optionId) => {
    setState((s) => {
      const outcome = getOutcome(decisionId, optionId, s.persona)
      if (!outcome) return s
      return {
        ...s,
        round: s.round + 1,
        decisions: [...s.decisions, { decisionId, optionId, outcome }],
        totalBillSavings: s.totalBillSavings + (outcome.fiveYearSavings || 0),
        totalCO2Avoided: s.totalCO2Avoided + (outcome.co2TonsPerYear || 0),
        totalUpfrontCost: s.totalUpfrontCost + (outcome.upfrontCost || 0),
        currentMonthlyBill: s.currentMonthlyBill + (outcome.monthlyBillChange || 0),
        ...outcome.flags,
        lastOutcome: { decisionId, optionId, outcome },
        screen: 'outcome',
      }
    })
  }, [])

  const continueToNext = useCallback(() => {
    setState((s) => {
      const decisions = getDecisionsForPersona(s.persona.id)
      if (s.round >= decisions.length) {
        return { ...s, screen: 'final' }
      }
      return { ...s, screen: 'decision' }
    })
  }, [])

  const goToPersonaSelect = useCallback(() => {
    setState((s) => ({ ...s, screen: 'persona' }))
  }, [])

  const restart = useCallback(() => {
    setState(initialState)
  }, [])

  const currentDecision = useCallback(() => {
    if (!state.persona) return null
    const decisions = getDecisionsForPersona(state.persona.id)
    return decisions[state.round] ?? null
  }, [state.persona, state.round])

  const totalDecisions = state.persona
    ? getDecisionsForPersona(state.persona.id).length
    : 5

  return {
    state,
    selectPersona,
    makeDecision,
    continueToNext,
    goToPersonaSelect,
    restart,
    currentDecision,
    totalDecisions,
  }
}
