import { motion, AnimatePresence } from 'framer-motion'
import { calcScore } from '../utils/calculations'

export { calcScore }

export default function ScoreHUD({ state, round, total }) {
  const score = calcScore(state.totalCO2Avoided, state.totalBillSavings)

  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto px-4 py-3">
      {/* Score badge */}
      <motion.div
        key={score}
        initial={{ scale: 1.3, color: '#16a34a' }}
        animate={{ scale: 1, color: '#1e293b' }}
        className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2 card-shadow border border-slate-100"
      >
        <span className="text-lg">⭐</span>
        <div>
          <p className="text-xs text-slate-400 font-medium leading-none">Score</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={score}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-xl font-black text-slate-800 leading-tight"
            >
              {score.toLocaleString()}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Progress pips */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs font-semibold text-slate-500">
          Decision {Math.min(round + 1, total)} of {total}
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                backgroundColor:
                  i < round ? '#22c55e' : i === round ? '#86efac' : '#e2e8f0',
                width: i === round ? 28 : 16,
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* CO2 badge */}
      <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2 card-shadow border border-slate-100">
        <span className="text-lg">🌍</span>
        <div>
          <p className="text-xs text-slate-400 font-medium leading-none">CO₂ saved</p>
          <p className="text-xl font-black text-green-600 leading-tight">
            {Math.max(0, Math.round(state.totalCO2Avoided * 10) / 10)}t
          </p>
        </div>
      </div>
    </div>
  )
}
