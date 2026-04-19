import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import ScoreHUD from './ScoreHUD'

const OPTION_COLORS = [
  { border: 'border-green-300', selBorder: 'border-green-500', selBg: 'bg-green-50', dot: 'bg-green-500', icon: '🌱' },
  { border: 'border-blue-300', selBorder: 'border-blue-500', selBg: 'bg-blue-50', dot: 'bg-blue-500', icon: '💡' },
  { border: 'border-amber-300', selBorder: 'border-amber-500', selBg: 'bg-amber-50', dot: 'bg-amber-500', icon: '⚡' },
  { border: 'border-purple-300', selBorder: 'border-purple-500', selBg: 'bg-purple-50', dot: 'bg-purple-500', icon: '🔄' },
]

export default function DecisionScreen({ decision, persona, round, total, state, onDecide }) {
  const [selected, setSelected] = useState(null)
  const intro = typeof decision.intro === 'function' ? decision.intro(persona) : decision.intro

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
      {/* Background blobs */}
      <div className="bg-blob w-64 h-64 bg-green-100 opacity-60" style={{ position: 'absolute', top: '10%', right: '-4rem' }} />
      <div className="bg-blob w-48 h-48 bg-blue-100 opacity-50" style={{ position: 'absolute', bottom: '10%', left: '-3rem' }} />

      {/* HUD */}
      <div className="relative pt-4">
        <ScoreHUD state={state} round={round} total={total} />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-6">
        <div className="max-w-2xl w-full">
          <motion.div
            key={decision.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Decision title */}
            <div className="text-center mb-6">
              <span className="inline-block bg-green-100 text-green-700 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                Decision {round + 1}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
                {decision.title}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed max-w-lg mx-auto bg-white/70 rounded-2xl px-5 py-4 card-shadow border border-slate-100">
                {intro}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {decision.options.map((option, i) => {
                const colors = OPTION_COLORS[i % OPTION_COLORS.length]
                const isSelected = selected === option.id
                return (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelected(option.id)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 card-shadow
                      ${isSelected
                        ? `${colors.selBorder} ${colors.selBg} shadow-md`
                        : `${colors.border} bg-white hover:shadow-md`
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Radio circle */}
                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
                        ${isSelected ? `${colors.dot} border-transparent` : 'border-slate-300 bg-white'}`}>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2.5 h-2.5 rounded-full bg-white"
                          />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{colors.icon}</span>
                          <p className={`font-bold text-base ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                            {option.label}
                          </p>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">{option.description}</p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* CTA */}
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onDecide(decision.id, selected)}
                    className="w-full py-5 bg-green-500 hover:bg-green-400 text-white font-black text-xl rounded-2xl shadow-lg shadow-green-200 transition-colors flex items-center justify-center gap-2"
                  >
                    See My Impact! <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {!selected && (
              <p className="text-center text-slate-400 text-sm font-medium mt-2">
                Pick an option to continue
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
