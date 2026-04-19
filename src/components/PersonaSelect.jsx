import { motion } from 'framer-motion'
import { PERSONAS } from '../data/personas'

const PERSONA_COLORS = {
  homeowner: {
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    hoverBorder: 'hover:border-amber-400',
    accent: 'bg-amber-400',
    text: 'text-amber-700',
    shadow: 'hover:shadow-amber-100',
    badge: 'bg-amber-100 text-amber-700',
    btn: 'bg-amber-400 hover:bg-amber-300 text-white',
  },
  renter: {
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    hoverBorder: 'hover:border-blue-400',
    accent: 'bg-blue-400',
    text: 'text-blue-700',
    shadow: 'hover:shadow-blue-100',
    badge: 'bg-blue-100 text-blue-700',
    btn: 'bg-blue-500 hover:bg-blue-400 text-white',
  },
  smallbiz: {
    bg: 'bg-green-50',
    border: 'border-green-300',
    hoverBorder: 'hover:border-green-400',
    accent: 'bg-green-400',
    text: 'text-green-700',
    shadow: 'hover:shadow-green-100',
    badge: 'bg-green-100 text-green-700',
    btn: 'bg-green-500 hover:bg-green-400 text-white',
  },
}

export default function PersonaSelect({ onSelect }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="bg-blob w-72 h-72 bg-yellow-200 opacity-30" style={{ position: 'absolute', top: '-4rem', right: '-4rem' }} />
      <div className="bg-blob w-80 h-80 bg-green-200 opacity-30" style={{ position: 'absolute', bottom: '-4rem', left: '-4rem' }} />

      <div className="relative max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-green-600 font-bold text-sm uppercase tracking-widest mb-2">Step 1</p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-3">
            Choose Your Character
          </h2>
          <p className="text-slate-500 text-lg max-w-md mx-auto">
            Your situation determines which decisions you face and which numbers apply to you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {Object.values(PERSONAS).map((persona, i) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              colors={PERSONA_COLORS[persona.id]}
              index={i}
              onSelect={onSelect}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-slate-400 mt-8"
        >
          All bills &amp; costs use real EIA energy price data for California · Source: EIA 2024
        </motion.p>
      </div>
    </div>
  )
}

function PersonaCard({ persona, colors, index, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => onSelect(persona)}
      className={`group cursor-pointer rounded-3xl border-2 ${colors.border} ${colors.hoverBorder} ${colors.bg} p-6 flex flex-col card-shadow-lg hover:shadow-xl ${colors.shadow} transition-all duration-200`}
    >
      {/* Avatar */}
      <div className="text-6xl mb-3 text-center">{persona.avatar}</div>

      <h3 className={`text-2xl font-black text-center mb-1 ${colors.text}`}>
        {persona.name}
      </h3>
      <p className="text-slate-500 text-sm text-center mb-4">{persona.location}</p>

      <p className="text-slate-600 text-sm text-center leading-relaxed mb-5 flex-1">
        {persona.description}
      </p>

      {/* Stats */}
      <div className="space-y-2 border-t border-slate-200 pt-4 mb-5">
        <StatBadge label="💡 Monthly bill" value={`$${persona.monthlyBill}/mo`} colors={colors} />
        <StatBadge
          label="☀️ Solar eligible"
          value={persona.canInstallSolar ? 'Yes!' : 'No (renter)'}
          colors={colors}
        />
        <StatBadge
          label="💰 Savings available"
          value={`$${persona.savings.toLocaleString()}`}
          colors={colors}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className={`w-full py-3 rounded-xl font-bold text-base ${colors.btn} transition-colors shadow-sm`}
      >
        Play →
      </motion.button>
    </motion.div>
  )
}

function StatBadge({ label, value, colors }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-slate-500">{label}</span>
      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors.badge}`}>{value}</span>
    </div>
  )
}
