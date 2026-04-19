import { motion, AnimatePresence } from 'framer-motion'

export default function ConstructionOverlay({ constructing }) {
  return (
    <AnimatePresence>
      {constructing && (
        <motion.div
          key={constructing.flag}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 rounded-2xl z-20 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'rgba(15, 23, 42, 0.84)' }}
        >
          {/* Top caution stripe */}
          <div className="absolute top-0 left-0 right-0 h-7" style={{
            background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #1e293b 10px, #1e293b 20px)'
          }} />
          {/* Bottom caution stripe */}
          <div className="absolute bottom-0 left-0 right-0 h-7" style={{
            background: 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 10px, #1e293b 10px, #1e293b 20px)'
          }} />

          {/* Content */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.65, repeat: Infinity, ease: 'easeInOut' }}
            className="text-5xl mb-3 select-none"
          >
            👷
          </motion.div>

          <p className="text-white font-bold text-sm mb-4 px-4 text-center">
            Installing {constructing.label}…
          </p>

          {/* Progress bar */}
          <div className="w-44 h-2.5 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-yellow-400 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'linear' }}
            />
          </div>
          <p className="text-slate-400 text-xs mt-2">Just a moment…</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
