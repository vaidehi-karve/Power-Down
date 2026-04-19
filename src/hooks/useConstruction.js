import { useState, useEffect, useRef } from 'react'

// Flags that represent physical installations → trigger construction animation
const CONSTRUCTION_FLAGS = {
  hasSolar: 'Solar Panels',
  hasEV: 'EV Charging',
  hasSmartThermostat: 'Smart Thermostat',
  hasHeatPump: 'Heat Pump System',
  hasSolarWater: 'Solar Water Heater',
  joinedCommunitySolar: 'Community Solar Array',
  votedYesCharger: 'EV Charger Station',
  communityDone: 'Community Upgrades',
}

const DURATION_MS = 2200

export function useConstruction(state) {
  const [constructing, setConstructing] = useState(null)
  const prevFlags = useRef({})
  const timerRef = useRef(null)

  useEffect(() => {
    for (const [flag, label] of Object.entries(CONSTRUCTION_FLAGS)) {
      if (state[flag] && !prevFlags.current[flag]) {
        clearTimeout(timerRef.current)
        setConstructing({ flag, label })
        timerRef.current = setTimeout(() => setConstructing(null), DURATION_MS)
        break
      }
    }
    prevFlags.current = Object.fromEntries(
      Object.keys(CONSTRUCTION_FLAGS).map(k => [k, !!state[k]])
    )
    return () => clearTimeout(timerRef.current)
  }, [
    state.hasSolar, state.hasEV, state.hasSmartThermostat, state.hasHeatPump,
    state.hasSolarWater, state.joinedCommunitySolar, state.votedYesCharger,
    state.communityDone,
  ])

  return constructing
}
