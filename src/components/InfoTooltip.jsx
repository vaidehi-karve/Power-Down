import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InfoTooltip({ content }) {
  const [visible, setVisible] = useState(false)
  const [showAbove, setShowAbove] = useState(true)
  const buttonRef = useRef(null)

  const handleEnter = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setShowAbove(rect.top > 120)
    }
    setVisible(true)
  }

  const tooltipStyle = showAbove
    ? { bottom: '100%', left: 0, marginBottom: 8, width: 220, maxWidth: 'calc(100vw - 32px)', zIndex: 9999 }
    : { top: '100%', left: 0, marginTop: 8, width: 220, maxWidth: 'calc(100vw - 32px)', zIndex: 9999 }

  const arrowStyle = showAbove
    ? { position: 'absolute', bottom: -6, left: 16, width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid white' }
    : { position: 'absolute', top: -6, left: 16, width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '6px solid white' }

  return (
    <span className="relative inline-flex items-center ml-1.5 flex-shrink-0" style={{ overflow: 'visible' }}>
      <button
        ref={buttonRef}
        onMouseEnter={handleEnter}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible(v => !v)}
        className="w-4 h-4 rounded-full bg-slate-700 hover:bg-slate-500 flex items-center justify-center cursor-pointer transition-colors border-0 outline-none"
        style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 700, lineHeight: 1 }}
        aria-label="More info"
      >
        i
      </button>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: showAbove ? 4 : -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: showAbove ? 4 : -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute pointer-events-none"
            style={tooltipStyle}
          >
            <div className="bg-white text-slate-700 text-xs leading-relaxed rounded-xl shadow-xl border border-slate-200 p-3 normal-case tracking-normal">
              {content}
            </div>
            <div style={arrowStyle} />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
