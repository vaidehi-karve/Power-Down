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

export default function SmallBizBuilding({ state }) {
  const {
    hasSolar, hasEV, onTOUPlan, hasSmartThermostat, hasHeatPump, communityDone,
    hasCARE, hasSolarWater, hasGasHeater, hasCommunitySolarBadge,
  } = state
  const winColor = onTOUPlan || hasSmartThermostat ? '#bfdbfe' : '#bae6fd'
  const hasSolarAny = hasSolar || hasCommunitySolarBadge
  const sunFill = hasSolarAny ? '#fbbf24' : '#fde68a'

  return (
    <svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Sky */}
      <motion.rect width="360" height="300" rx="16"
        animate={{ fill: hasSolarAny ? '#bae6fd' : '#e0f2fe' }} transition={{ duration: 1.2 }} />

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
      <motion.g animate={{ x: [0, 20, 0] }} transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="300" cy="40" r="24" fill="white" opacity="0.75" />
        <circle cx="322" cy="35" r="18" fill="white" opacity="0.75" />
        <circle cx="340" cy="48" r="14" fill="white" opacity="0.75" />
      </motion.g>
      <motion.g animate={{ x: [0, -14, 0] }} transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 10 }}>
        <circle cx="170" cy="28" r="14" fill="white" opacity="0.4" />
        <circle cx="188" cy="23" r="10" fill="white" opacity="0.4" />
        <circle cx="202" cy="32" r="9" fill="white" opacity="0.4" />
      </motion.g>

      {/* Ground */}
      <rect x="0" y="258" width="360" height="42" fill="#d1fae5" />
      <rect x="0" y="258" width="360" height="4" fill="#a7f3d0" />

      {/* Parking lot */}
      <rect x="0" y="235" width="82" height="65" fill="#e2e8f0" rx="2" />
      {[15, 38, 61].map(x => (
        <rect key={x} x={x} y="240" width="2" height="55" fill="white" opacity="0.6" />
      ))}

      {/* Neighbor businesses */}
      <AnimatePresence>
        {communityDone && (
          <motion.g key="neighbors" {...fade}>
            <rect x="292" y="145" width="68" height="113" fill="#fde68a" rx="3" />
            <rect x="292" y="138" width="68" height="10" fill="#f59e0b" rx="2" />
            <rect x="292" y="148" width="68" height="18" fill="#d97706" opacity="0.4" />
            <rect x="300" y="172" width="22" height="28" fill="#bae6fd" rx="2" />
            <rect x="328" y="172" width="22" height="28" fill="#bae6fd" rx="2" />
            <rect x="312" y="214" width="18" height="44" fill="#92400e" rx="2" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Main building */}
      <rect x="78" y="118" width="210" height="142" fill="#fef3c7" rx="4" />

      {/* Parapet / roof edge */}
      <rect x="74" y="110" width="218" height="12" fill="#f59e0b" rx="3" />
      <rect x="74" y="104" width="218" height="10" fill="#fbbf24" rx="3" />

      {/* Rooftop HVAC vent (for gas smoke) */}
      <rect x="246" y="90" width="10" height="16" fill="#64748b" rx="2" />
      <rect x="243" y="100" width="16" height="5" fill="#475569" rx="1" />

      {/* Gas heater smoke from rooftop vent */}
      <AnimatePresence>
        {hasGasHeater && (
          <motion.g key="smoke" {...fade}>
            <SmokePuff cx={251} cy={85} delay={0} />
            <SmokePuff cx={255} cy={79} delay={0.9} />
            <SmokePuff cx={248} cy={73} delay={1.7} />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Rooftop solar panels */}
      <AnimatePresence>
        {hasSolar && (
          <motion.g key="solar" {...dropIn}>
            {[0, 1, 2, 3, 4].map(i => (
              <g key={i}>
                <rect x={88 + i * 36} y="72" width="30" height="18" fill="#1e3a5f" rx="1.5" />
                <rect x={88 + i * 36} y="72" width="30" height="4" fill="#38bdf8" opacity="0.45" rx="1.5" />
                <line x1={103 + i * 36} y1="72" x2={103 + i * 36} y2="90" stroke="#38bdf8" strokeWidth="0.7" opacity="0.4" />
                <rect x={88 + i * 36} y="82" width="30" height="1.5" fill="#38bdf8" opacity="0.25" />
              </g>
            ))}
            <rect x="85" y="88" width="198" height="3" fill="#475569" rx="1" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Community solar badge on storefront */}
      <AnimatePresence>
        {hasCommunitySolarBadge && (
          <motion.g key="community-solar-badge" {...popIn} style={{ transformOrigin: '270px 120px' }}>
            <circle cx="270" cy="120" r="13" fill="#0ea5e9" />
            <text x="270" y="126" textAnchor="middle" fontSize="12" fill="white">☀</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Solar water heater panel on right roof area */}
      <AnimatePresence>
        {hasSolarWater && (
          <motion.g key="solarwater" {...dropIn}>
            <rect x="216" y="72" width="28" height="18" fill="#0ea5e9" rx="2" opacity="0.9" />
            <rect x="216" y="72" width="28" height="3.5" fill="#38bdf8" opacity="0.6" rx="2" />
            <line x1="230" y1="72" x2="230" y2="90" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
            <rect x="216" y="80" width="28" height="1.5" fill="#38bdf8" opacity="0.35" />
            <rect x="221" y="89" width="3" height="16" fill="#64748b" rx="1" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Awning */}
      <rect x="78" y="133" width="210" height="22" fill="#059669" rx="2" />
      {[90, 114, 138, 162, 186, 210, 234, 258].map(x => (
        <rect key={x} x={x} y="133" width="8" height="22" fill="rgba(255,255,255,0.2)" />
      ))}
      <rect x="78" y="153" width="210" height="4" fill="rgba(0,0,0,0.1)" />

      {/* Shop sign */}
      <rect x="140" y="119" width="86" height="16" fill="white" opacity="0.9" rx="3" />
      <text x="183" y="131" textAnchor="middle" fontSize="9" fill="#059669" fontWeight="bold">POWER DOWN CO.</text>

      {/* CARE badge on storefront */}
      <AnimatePresence>
        {hasCARE && (
          <motion.g key="care" {...popIn} style={{ transformOrigin: '105px 120px' }}>
            <rect x="83" y="114" width="40" height="13" rx="6.5" fill="#22c55e" />
            <text x="103" y="124" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">CARE ✓</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Large display windows */}
      <motion.rect x="86" y="162" width="68" height="60" rx="3"
        animate={{ fill: winColor }} transition={{ duration: 0.8 }} />
      <rect x="86" y="162" width="68" height="60" rx="3" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
      <rect x="119" y="162" width="2" height="60" fill="rgba(0,0,0,0.08)" />
      <rect x="86" y="191" width="68" height="2" fill="rgba(0,0,0,0.08)" />

      {/* Smart thermostat on wall */}
      <AnimatePresence>
        {hasSmartThermostat && (
          <motion.g key="thermostat" {...popIn} style={{ transformOrigin: '161px 175px' }}>
            <rect x="151" y="168" width="20" height="22" rx="3" fill="#334155" />
            <rect x="154" y="171" width="14" height="9" rx="1.5" fill="#38bdf8" opacity="0.9" />
            <circle cx="161" cy="187" r="3" fill="#22c55e" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Door */}
      <rect x="163" y="188" width="40" height="72" fill="#92400e" rx="2" />
      <rect x="168" y="194" width="14" height="24" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="185" y="194" width="14" height="24" rx="2" fill="rgba(255,255,255,0.2)" />
      <circle cx="201" cy="230" r="3" fill="#fbbf24" />

      {/* Right display window */}
      <motion.rect x="212" y="162" width="68" height="60" rx="3"
        animate={{ fill: winColor }} transition={{ duration: 0.8 }} />
      <rect x="212" y="162" width="68" height="60" rx="3" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
      <rect x="245" y="162" width="2" height="60" fill="rgba(0,0,0,0.08)" />
      <rect x="212" y="191" width="68" height="2" fill="rgba(0,0,0,0.08)" />

      {/* Heat pump efficiency star */}
      <AnimatePresence>
        {hasHeatPump && (
          <motion.g key="badge" {...popIn} style={{ transformOrigin: '270px 175px' }}>
            <circle cx="270" cy="175" r="14" fill="#fbbf24" />
            <text x="270" y="180" textAnchor="middle" fontSize="13" fill="white">★</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* EV charger in parking lot */}
      <AnimatePresence>
        {hasEV && (
          <motion.g key="evcharger" {...popIn} style={{ transformOrigin: '25px 220px' }}>
            <rect x="18" y="206" width="12" height="26" fill="#22c55e" rx="2.5" />
            <rect x="16" y="204" width="16" height="6" fill="#16a34a" rx="1.5" />
            <text x="24" y="214" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">⚡</text>
            <path d="M30,222 Q40,222 40,236" stroke="#166534" strokeWidth="2" fill="none" strokeLinecap="round" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Parked EV car */}
      <AnimatePresence>
        {hasEV && (
          <motion.g key="evcar" {...fade}>
            <ellipse cx="55" cy="256" rx="28" ry="4" fill="rgba(0,0,0,0.07)" />
            <rect x="32" y="240" width="54" height="16" rx="5" fill="#3b82f6" />
            <rect x="40" y="234" width="38" height="10" rx="5" fill="#60a5fa" />
            <rect x="45" y="236" width="28" height="7" rx="2" fill="#e0f2fe" opacity="0.7" />
            <circle cx="42" cy="257" r="7" fill="#1e293b" />
            <circle cx="42" cy="257" r="3" fill="#94a3b8" />
            <circle cx="76" cy="257" r="7" fill="#1e293b" />
            <circle cx="76" cy="257" r="3" fill="#94a3b8" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Streetside tree */}
      <rect x="8" y="196" width="7" height="62" fill="#92400e" rx="2" />
      <circle cx="11" cy="190" r="16" fill="#22c55e" />
      <circle cx="5" cy="200" r="10" fill="#16a34a" />
    </svg>
  )
}
