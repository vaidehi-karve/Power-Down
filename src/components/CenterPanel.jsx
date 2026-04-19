import { motion, AnimatePresence } from 'framer-motion'
import HomeownerBuilding from './buildings/HomeownerBuilding'
import RenterBuilding from './buildings/RenterBuilding'
import SmallBizBuilding from './buildings/SmallBizBuilding'
import ConstructionOverlay from './ConstructionOverlay'
import { useConstruction } from '../hooks/useConstruction'

const DECISION_ICONS = {
  bill: '💡',
  solar: '☀️',
  solar_community: '☀️',
  car: '🚗',
  appliance: '🔧',
  community: '🏘️',
}

const DECISION_LABELS = {
  bill: 'Energy Plan',
  solar: 'Solar',
  solar_community: 'Solar',
  car: 'Car',
  appliance: 'Appliances',
  community: 'Community',
}

const BUILDING_MAP = {
  homeowner: HomeownerBuilding,
  renter: RenterBuilding,
  smallbiz: SmallBizBuilding,
}

export default function CenterPanel({ persona, state, allDecisions, totalDecisions }) {
  const Building = BUILDING_MAP[persona?.id] ?? HomeownerBuilding
  const madeDecisions = state.decisions ?? []
  const constructing = useConstruction(state)

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-sky-50 to-green-50 overflow-hidden">
      {/* Building illustration */}
      <div className="flex-1 flex items-center justify-center p-4 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={persona?.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full"
            style={{ aspectRatio: '360/300' }}
          >
            <Building state={state} />
            <ConstructionOverlay constructing={constructing} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decision history bar */}
      <div className="px-4 pb-4">
        <p className="text-xs text-slate-400 text-center uppercase tracking-widest mb-2 font-medium">
          Decisions made
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          {allDecisions.map((decision, i) => {
            const made = madeDecisions.find(d => d.decisionId === decision.id)
            return (
              <motion.div
                key={decision.id}
                initial={{ scale: 0.8, opacity: 0.4 }}
                animate={{ scale: made ? 1 : 0.85, opacity: made ? 1 : 0.35 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-center transition-all
                  ${made
                    ? 'bg-green-100 border-2 border-green-400 shadow-sm'
                    : 'bg-slate-100 border-2 border-dashed border-slate-300'
                  }`}
                style={{ minWidth: 52 }}
              >
                <span className="text-lg leading-none">{DECISION_ICONS[decision.id]}</span>
                <span className={`text-xs font-semibold leading-tight ${made ? 'text-green-700' : 'text-slate-400'}`}>
                  {DECISION_LABELS[decision.id]}
                </span>
                {made && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-500 text-xs leading-none"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
