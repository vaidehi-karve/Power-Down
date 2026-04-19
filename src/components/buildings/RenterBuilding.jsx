import { motion, AnimatePresence } from 'framer-motion'

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.5 } }
const dropIn = { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.5 } }
const popIn = { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0 }, transition: { type: 'spring', stiffness: 280, damping: 18 } }

function SmokePuff({ cx, cy, delay = 0 }) {
  return (
    <motion.circle cx={cx} cy={cy} r="5" fill="#94a3b8"
      animate={{ y: [0, -28], opacity: [0.65, 0], scale: [0.5, 1.6] }}
      transition={{ duration: 2.4, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  )
}

function Win({ x, y, color }) {
  return (
    <>
      <motion.rect x={x} y={y} width="18" height="14" rx="2"
        animate={{ fill: color }} transition={{ duration: 0.9 }} />
      <rect x={x} y={y + 6} width="18" height="1.5" fill="rgba(0,0,0,0.1)" />
      <rect x={x + 8} y={y} width="1.5" height="14" fill="rgba(0,0,0,0.1)" />
    </>
  )
}

export default function RenterBuilding({ state }) {
  const {
    onTOUPlan, hasSmartThermostat, joinedCommunitySolar, noCar, votedYesCharger,
    communityDone, hasCARE, hasSolarWater, hasGasHeater, hasHeatPump, hasCommunitySolarBadge,
    hasEV, hasGasCar,
  } = state
  const winColor = onTOUPlan || hasSmartThermostat ? '#bfdbfe' : '#fde68a'
  const hasSolarAny = joinedCommunitySolar || hasCommunitySolarBadge
  const sunFill = hasSolarAny ? '#fbbf24' : '#fde68a'

  const winCols = [108, 133, 158, 183]
  const winRows = [74, 96, 118, 140, 162]

  return (
    <svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Sky */}
      <rect width="360" height="300" fill="#e0f2fe" rx="16" />

      {/* Sun */}
      <motion.circle cx="46" cy="38" animate={{ r: hasSolarAny ? 24 : 18, fill: sunFill }} transition={{ duration: 1.2 }} />
      <AnimatePresence>
        {hasSolarAny && (
          <motion.g key="sunrays" {...fade}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
              <motion.line key={a}
                x1={46 + 27 * Math.cos(a * Math.PI / 180)}
                y1={38 + 27 * Math.sin(a * Math.PI / 180)}
                x2={46 + 36 * Math.cos(a * Math.PI / 180)}
                y2={38 + 36 * Math.sin(a * Math.PI / 180)}
                stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: a / 500 }}
              />
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Drifting clouds */}
      <motion.g animate={{ x: [0, 22, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="290" cy="45" r="26" fill="white" opacity="0.8" />
        <circle cx="315" cy="40" r="20" fill="white" opacity="0.8" />
        <circle cx="335" cy="52" r="16" fill="white" opacity="0.8" />
      </motion.g>
      <motion.g animate={{ x: [0, -16, 0] }} transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 8 }}>
        <circle cx="220" cy="30" r="14" fill="white" opacity="0.45" />
        <circle cx="238" cy="25" r="11" fill="white" opacity="0.45" />
        <circle cx="253" cy="35" r="9" fill="white" opacity="0.45" />
      </motion.g>

      {/* Street */}
      <rect x="0" y="255" width="360" height="45" fill="#94a3b8" />
      <rect x="0" y="255" width="360" height="3" fill="#64748b" />
      {[30, 80, 130, 180, 230, 280, 330].map(x => (
        <rect key={x} x={x} y="274" width="28" height="4" fill="#e2e8f0" rx="2" />
      ))}
      <rect x="0" y="248" width="360" height="10" fill="#cbd5e1" />

      {/* Neighbor buildings */}
      <AnimatePresence>
        {communityDone && (
          <motion.g key="neighbors" {...fade}>
            <rect x="8" y="158" width="52" height="94" fill="#c7d2fe" rx="3" />
            <rect x="8" y="152" width="52" height="9" fill="#818cf8" rx="2" />
            {[168, 186, 204].map(r => [14, 32, 50].map(c => (
              <rect key={`${r}-${c}`} x={c} y={r} width="10" height="8" fill="#fde68a" rx="1" />
            )))}
            <rect x="300" y="140" width="52" height="112" fill="#bfdbfe" rx="3" />
            <rect x="300" y="134" width="52" height="9" fill="#60a5fa" rx="2" />
            {[150, 168, 186, 204].map(r => [306, 324, 342].map(c => (
              <rect key={`${r}-${c}`} x={c} y={r} width="10" height="8" fill="#fde68a" rx="1" />
            )))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Main building body */}
      <rect x="90" y="58" width="120" height="193" fill="#cbd5e1" rx="4" />
      <rect x="86" y="54" width="128" height="8" fill="#94a3b8" rx="3" />
      <rect x="86" y="44" width="128" height="14" fill="#b0bec5" rx="3" />

      {/* Rooftop gas vent (for smoke) */}
      <rect x="200" y="36" width="8" height="12" fill="#64748b" rx="2" />
      <rect x="197" y="44" width="14" height="4" fill="#475569" rx="1" />

      {/* Gas heater smoke from rooftop vent */}
      <AnimatePresence>
        {hasGasHeater && (
          <motion.g key="smoke" {...fade}>
            <SmokePuff cx={204} cy={32} delay={0} />
            <SmokePuff cx={208} cy={27} delay={0.9} />
            <SmokePuff cx={201} cy={22} delay={1.7} />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Community solar on rooftop */}
      <AnimatePresence>
        {joinedCommunitySolar && (
          <motion.g key="roof-solar" {...dropIn}>
            {[0, 1, 2, 3].map(i => (
              <g key={i}>
                <rect x={96 + i * 27} y="28" width="23" height="14" fill="#1e3a5f" rx="1" />
                <rect x={96 + i * 27} y="28" width="23" height="3" fill="#38bdf8" opacity="0.5" rx="1" />
                <line x1={107 + i * 27} y1="28" x2={107 + i * 27} y2="42" stroke="#38bdf8" strokeWidth="0.6" opacity="0.4" />
              </g>
            ))}
            <rect x="93" y="40" width="118" height="3" fill="#475569" rx="1" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Community solar badge on building facade */}
      <AnimatePresence>
        {hasCommunitySolarBadge && (
          <motion.g key="community-solar-badge" {...popIn} style={{ transformOrigin: '218px 80px' }}>
            <circle cx="218" cy="80" r="13" fill="#0ea5e9" />
            <text x="218" y="86" textAnchor="middle" fontSize="12" fill="white">☀</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Solar water heater panel on right wall */}
      <AnimatePresence>
        {hasSolarWater && (
          <motion.g key="solarwater" {...dropIn}>
            <rect x="216" y="120" width="28" height="18" fill="#0ea5e9" rx="2" opacity="0.9" />
            <rect x="216" y="120" width="28" height="3.5" fill="#38bdf8" opacity="0.6" rx="2" />
            <line x1="230" y1="120" x2="230" y2="138" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
            <rect x="216" y="128" width="28" height="1.5" fill="#38bdf8" opacity="0.35" />
            <rect x="221" y="137" width="3" height="10" fill="#64748b" rx="1" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Windows grid */}
      {winRows.map(r => winCols.map(c => (
        <Win key={`${r}-${c}`} x={c} y={r} color={winColor} />
      )))}

      {/* Smart thermostat badge on building exterior */}
      <AnimatePresence>
        {hasSmartThermostat && (
          <motion.g key="thermostat" {...popIn} style={{ transformOrigin: '218px 140px' }}>
            <rect x="208" y="132" width="20" height="22" rx="3" fill="#334155" />
            <rect x="211" y="135" width="14" height="9" rx="1.5" fill="#38bdf8" opacity="0.9" />
            <circle cx="218" cy="151" r="3" fill="#22c55e" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Lobby / entrance */}
      <rect x="130" y="208" width="42" height="43" fill="#475569" rx="2" />
      <rect x="135" y="212" width="16" height="36" rx="1" fill="#94a3b8" opacity="0.4" />
      <rect x="153" y="212" width="16" height="36" rx="1" fill="#94a3b8" opacity="0.4" />
      <circle cx="151" cy="232" r="2.5" fill="#fbbf24" />

      {/* CARE badge above lobby entrance */}
      <AnimatePresence>
        {hasCARE && (
          <motion.g key="care" {...popIn} style={{ transformOrigin: '151px 202px' }}>
            <rect x="131" y="196" width="40" height="13" rx="6.5" fill="#22c55e" />
            <text x="151" y="206" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">CARE ✓</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Heat pump efficiency star */}
      <AnimatePresence>
        {hasHeatPump && (
          <motion.g key="badge" {...popIn} style={{ transformOrigin: '218px 178px' }}>
            <circle cx="218" cy="178" r="13" fill="#fbbf24" />
            <text x="218" y="184" textAnchor="middle" fontSize="13" fill="white">★</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Parking area */}
      <rect x="222" y="190" width="90" height="62" fill="#d1d5db" rx="3" />
      <rect x="222" y="190" width="90" height="3" fill="#94a3b8" />
      {[228, 252, 276, 300].map(x => (
        <rect key={x} x={x} y="194" width="2" height="55" fill="white" opacity="0.5" />
      ))}

      {/* EV charger in parking */}
      <AnimatePresence>
        {votedYesCharger && (
          <motion.g key="charger" {...popIn} style={{ transformOrigin: '235px 220px' }}>
            <rect x="228" y="200" width="10" height="22" fill="#22c55e" rx="2" />
            <rect x="226" y="198" width="14" height="5" fill="#16a34a" rx="1" />
            <text x="233" y="208" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">⚡</text>
            <path d="M238,216 Q248,216 248,228" stroke="#166534" strokeWidth="2" fill="none" strokeLinecap="round" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Car in parking lot (EV = blue, gas = gray) */}
      <AnimatePresence>
        {(hasEV || hasGasCar) && (
          <motion.g key={hasEV ? 'ev-car' : 'gas-car'} {...fade}>
            <ellipse cx="267" cy="251" rx="26" ry="4" fill="rgba(0,0,0,0.07)" />
            {/* Car body */}
            <rect x="245" y="236" width="52" height="15" rx="5"
              fill={hasEV ? '#3b82f6' : '#94a3b8'} />
            {/* Car roof */}
            <rect x="253" y="228" width="36" height="12" rx="5"
              fill={hasEV ? '#60a5fa' : '#cbd5e1'} />
            {/* Windshield */}
            <rect x="258" y="230" width="26" height="8" rx="2" fill="#e0f2fe" opacity="0.75" />
            {/* Wheels */}
            <circle cx="258" cy="252" r="7" fill="#1e293b" />
            <circle cx="258" cy="252" r="3" fill="#94a3b8" />
            <circle cx="286" cy="252" r="7" fill="#1e293b" />
            <circle cx="286" cy="252" r="3" fill="#94a3b8" />
            {/* EV charge port */}
            {hasEV && <circle cx="297" cy="241" r="4" fill="#22c55e" />}
            {/* Gas cap */}
            {hasGasCar && <circle cx="297" cy="241" r="3.5" fill="#78350f" />}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Street trees */}
      <rect x="43" y="235" width="7" height="18" fill="#92400e" rx="1" />
      <circle cx="46" cy="228" r="13" fill="#22c55e" />
      <rect x="313" y="235" width="7" height="18" fill="#92400e" rx="1" />
      <circle cx="316" cy="228" r="13" fill="#22c55e" />

      {/* Bus stop — rendered after trees so it paints on top */}
      <AnimatePresence>
        {noCar && (
          <motion.g key="busstop" {...fade}>
            <rect x="50" y="230" width="4" height="24" fill="#64748b" rx="1" />
            <rect x="36" y="230" width="32" height="11" fill="#0ea5e9" rx="3" />
            <text x="52" y="238" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">BUS</text>
            <rect x="32" y="248" width="42" height="4" fill="#94a3b8" rx="2" />
            <rect x="34" y="251" width="4" height="7" fill="#94a3b8" rx="1" />
            <rect x="68" y="251" width="4" height="7" fill="#94a3b8" rx="1" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  )
}
