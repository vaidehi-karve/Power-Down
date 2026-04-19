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

export default function HomeownerBuilding({ state }) {
  const {
    hasSolar, hasEV, onTOUPlan, hasSmartThermostat, noCar, hasHeatPump,
    communityDone, hasCARE, hasSolarWater, hasGasHeater, hasCommunitySolarBadge,
  } = state
  const winColor = onTOUPlan || hasSmartThermostat ? '#bfdbfe' : '#fde68a'
  const hasSolarAny = hasSolar || hasCommunitySolarBadge
  const sunFill = hasSolarAny ? '#fbbf24' : '#fde68a'
  const skyFill = hasSolarAny ? '#bae6fd' : '#e0f2fe'

  return (
    <svg viewBox="0 0 360 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Sky */}
      <motion.rect width="360" height="300" rx="16"
        animate={{ fill: skyFill }} transition={{ duration: 1.2 }} />

      {/* Sun */}
      <motion.circle cx="316" cy="36" animate={{ r: hasSolarAny ? 26 : 20, fill: sunFill }} transition={{ duration: 1.2 }} />
      <AnimatePresence>
        {hasSolarAny && (
          <motion.g key="sunrays" {...fade}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
              <motion.line key={a}
                x1={316 + 29 * Math.cos(a * Math.PI / 180)}
                y1={36 + 29 * Math.sin(a * Math.PI / 180)}
                x2={316 + 38 * Math.cos(a * Math.PI / 180)}
                y2={36 + 38 * Math.sin(a * Math.PI / 180)}
                stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: a / 500 }}
              />
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Drifting clouds */}
      <motion.g animate={{ x: [0, 28, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="60" cy="50" r="28" fill="white" opacity="0.82" />
        <circle cx="88" cy="44" r="22" fill="white" opacity="0.82" />
        <circle cx="110" cy="55" r="18" fill="white" opacity="0.82" />
      </motion.g>
      <motion.g animate={{ x: [0, -18, 0] }} transition={{ duration: 27, repeat: Infinity, ease: 'easeInOut', delay: 6 }}>
        <circle cx="210" cy="32" r="16" fill="white" opacity="0.5" />
        <circle cx="230" cy="27" r="12" fill="white" opacity="0.5" />
        <circle cx="247" cy="37" r="10" fill="white" opacity="0.5" />
      </motion.g>

      {/* Ground */}
      <rect x="0" y="258" width="360" height="42" fill="#bbf7d0" />
      <rect x="0" y="258" width="360" height="4" fill="#86efac" />

      {/* Driveway */}
      <rect x="256" y="238" width="104" height="62" fill="#e2e8f0" rx="2" />
      <rect x="270" y="238" width="4" height="62" fill="#cbd5e1" opacity="0.5" />
      <rect x="286" y="238" width="4" height="62" fill="#cbd5e1" opacity="0.5" />

      {/* Walkway */}
      <rect x="162" y="255" width="34" height="45" fill="#d1d5db" rx="2" />

      {/* Tree */}
      <rect x="47" y="244" width="10" height="20" fill="#92400e" rx="2" />
      <circle cx="52" cy="236" r="20" fill="#22c55e" />
      <circle cx="43" cy="248" r="13" fill="#16a34a" />
      <circle cx="61" cy="247" r="12" fill="#15803d" />

      {/* Neighbor houses */}
      <AnimatePresence>
        {communityDone && (
          <motion.g key="neighbors" {...fade}>
            <rect x="4" y="214" width="60" height="46" fill="#ede9fe" rx="3" />
            <polygon points="1,214 34,188 67,214" fill="#7c3aed" />
            <rect x="14" y="228" width="15" height="13" fill="#fde68a" rx="2" />
            <rect x="34" y="228" width="15" height="20" fill="#a78bfa" opacity="0.5" rx="2" />
            <rect x="22" y="196" width="24" height="6" fill="#1e3a5f" rx="1" />
            <rect x="296" y="214" width="60" height="46" fill="#dbeafe" rx="3" />
            <polygon points="293,214 326,188 359,214" fill="#2563eb" />
            <rect x="306" y="228" width="15" height="13" fill="#fde68a" rx="2" />
            <rect x="326" y="228" width="15" height="20" fill="#60a5fa" opacity="0.5" rx="2" />
            <rect x="314" y="196" width="24" height="6" fill="#1e3a5f" rx="1" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* House shadow */}
      <ellipse cx="179" cy="260" rx="92" ry="6" fill="rgba(0,0,0,0.06)" />

      {/* House body */}
      <rect x="88" y="158" width="182" height="102" fill="#fef9c3" rx="4" />
      {[175, 190, 205, 220, 237, 250].map(y => (
        <rect key={y} x="88" y={y} width="182" height="1" fill="rgba(0,0,0,0.04)" />
      ))}

      {/* Roof */}
      <polygon points="66,160 179,60 292,160" fill="#b45309" />
      <polygon points="179,60 292,160 272,160 179,78" fill="rgba(0,0,0,0.1)" />
      <rect x="60" y="155" width="238" height="8" fill="#92400e" rx="2" />

      {/* Chimney */}
      <rect x="138" y="73" width="19" height="52" fill="#78350f" rx="2" />
      <rect x="134" y="73" width="27" height="6" fill="#451a03" rx="1" />

      {/* Gas heater smoke from chimney */}
      <AnimatePresence>
        {hasGasHeater && (
          <motion.g key="smoke" {...fade}>
            <SmokePuff cx={144} cy={68} delay={0} />
            <SmokePuff cx={150} cy={63} delay={0.8} />
            <SmokePuff cx={147} cy={55} delay={1.6} />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Solar panels on right roof slope */}
      <AnimatePresence>
        {hasSolar && (
          <motion.g key="solar" {...dropIn}>
            <g transform="rotate(-41, 235, 110)">
              <rect x="208" y="93" width="26" height="17" fill="#1e3a5f" rx="1" />
              <rect x="237" y="93" width="26" height="17" fill="#1e3a5f" rx="1" />
              <rect x="208" y="113" width="26" height="17" fill="#1e3a5f" rx="1" />
              <rect x="237" y="113" width="26" height="17" fill="#1e3a5f" rx="1" />
              <rect x="208" y="93" width="26" height="3" fill="#38bdf8" opacity="0.45" rx="1" />
              <rect x="237" y="93" width="26" height="3" fill="#38bdf8" opacity="0.45" rx="1" />
              <rect x="208" y="113" width="26" height="3" fill="#38bdf8" opacity="0.45" rx="1" />
              <rect x="237" y="113" width="26" height="3" fill="#38bdf8" opacity="0.45" rx="1" />
              <line x1="221" y1="93" x2="221" y2="110" stroke="#38bdf8" strokeWidth="0.6" opacity="0.4" />
              <line x1="250" y1="93" x2="250" y2="110" stroke="#38bdf8" strokeWidth="0.6" opacity="0.4" />
            </g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Community solar badge on left roof face */}
      <AnimatePresence>
        {hasCommunitySolarBadge && (
          <motion.g key="community-solar-badge" {...popIn} style={{ transformOrigin: '114px 130px' }}>
            <circle cx="114" cy="130" r="14" fill="#0ea5e9" />
            <text x="114" y="136" textAnchor="middle" fontSize="13" fill="white">☀</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Solar water heater panel on left side wall */}
      <AnimatePresence>
        {hasSolarWater && (
          <motion.g key="solarwater" {...dropIn}>
            <rect x="90" y="170" width="30" height="18" fill="#0ea5e9" rx="2" opacity="0.9" />
            <rect x="90" y="170" width="30" height="3.5" fill="#38bdf8" opacity="0.6" rx="2" />
            <line x1="105" y1="170" x2="105" y2="188" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
            <rect x="90" y="178" width="30" height="1.5" fill="#38bdf8" opacity="0.35" />
            <rect x="96" y="187" width="3" height="11" fill="#64748b" rx="1" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Window left */}
      <motion.rect x="96" y="178" width="54" height="44" rx="3"
        animate={{ fill: winColor }} transition={{ duration: 0.8 }} />
      <rect x="96" y="199" width="54" height="2" fill="rgba(0,0,0,0.1)" />
      <rect x="122" y="178" width="2" height="44" fill="rgba(0,0,0,0.1)" />
      <rect x="96" y="178" width="54" height="44" rx="3" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />

      {/* Smart thermostat on wall between windows */}
      <AnimatePresence>
        {hasSmartThermostat && (
          <motion.g key="thermostat" {...popIn} style={{ transformOrigin: '179px 185px' }}>
            <rect x="169" y="178" width="20" height="22" rx="3" fill="#334155" />
            <rect x="172" y="181" width="14" height="9" rx="1.5" fill="#38bdf8" opacity="0.9" />
            <circle cx="179" cy="196" r="3" fill="#22c55e" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Window right */}
      <motion.rect x="228" y="178" width="54" height="44" rx="3"
        animate={{ fill: winColor }} transition={{ duration: 0.8 }} />
      <rect x="228" y="199" width="54" height="2" fill="rgba(0,0,0,0.1)" />
      <rect x="254" y="178" width="2" height="44" fill="rgba(0,0,0,0.1)" />
      <rect x="228" y="178" width="54" height="44" rx="3" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />

      {/* Door */}
      <rect x="156" y="206" width="48" height="54" fill="#92400e" rx="3" />
      <rect x="160" y="210" width="18" height="23" rx="2" fill="rgba(0,0,0,0.1)" />
      <rect x="182" y="210" width="18" height="23" rx="2" fill="rgba(0,0,0,0.1)" />
      <circle cx="198" cy="235" r="3.5" fill="#fbbf24" />

      {/* CARE badge above door */}
      <AnimatePresence>
        {hasCARE && (
          <motion.g key="care" {...popIn} style={{ transformOrigin: '180px 199px' }}>
            <rect x="160" y="192" width="40" height="14" rx="7" fill="#22c55e" />
            <text x="180" y="202" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">CARE ✓</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Heat pump efficiency star */}
      <AnimatePresence>
        {hasHeatPump && (
          <motion.g key="badge" {...popIn} style={{ transformOrigin: '278px 168px' }}>
            <circle cx="278" cy="168" r="15" fill="#fbbf24" />
            <text x="278" y="174" textAnchor="middle" fontSize="15" fill="white">★</text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Car / Bus stop */}
      <AnimatePresence mode="wait">
        {!noCar ? (
          <motion.g key="car" {...fade}>
            <ellipse cx="300" cy="288" rx="44" ry="5" fill="rgba(0,0,0,0.07)" />
            <motion.rect x="260" y="264" width="84" height="22" rx="7"
              animate={{ fill: hasEV ? '#3b82f6' : '#94a3b8' }} transition={{ duration: 0.6 }} />
            <motion.rect x="274" y="255" width="56" height="13" rx="6"
              animate={{ fill: hasEV ? '#60a5fa' : '#cbd5e1' }} transition={{ duration: 0.6 }} />
            <rect x="287" y="257" width="38" height="10" rx="2" fill="#e0f2fe" opacity="0.75" />
            <circle cx="282" cy="287" r="9" fill="#1e293b" />
            <circle cx="282" cy="287" r="4" fill="#94a3b8" />
            <circle cx="340" cy="287" r="9" fill="#1e293b" />
            <circle cx="340" cy="287" r="4" fill="#94a3b8" />
            <AnimatePresence>
              {hasEV && (
                <motion.circle key="evport" cx="264" cy="270" r="4.5" fill="#22c55e" {...fade} />
              )}
            </AnimatePresence>
            <motion.rect x="341" y="267" width="5" height="8" rx="1"
              animate={{ fill: hasEV ? '#bfdbfe' : '#fef3c7' }} transition={{ duration: 0.5 }} />
          </motion.g>
        ) : (
          <motion.g key="busstop" {...fade}>
            <rect x="278" y="244" width="4" height="32" fill="#64748b" rx="1" />
            <rect x="264" y="244" width="32" height="12" fill="#0ea5e9" rx="3" />
            <text x="280" y="253" textAnchor="middle" fontSize="7.5" fill="white" fontWeight="bold">BUS</text>
            <rect x="260" y="268" width="42" height="5" fill="#94a3b8" rx="2" />
            <rect x="262" y="272" width="4" height="7" fill="#94a3b8" rx="1" />
            <rect x="296" y="272" width="4" height="7" fill="#94a3b8" rx="1" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Mailbox */}
      <rect x="256" y="236" width="14" height="9" rx="2" fill="#475569" />
      <rect x="253" y="238" width="5" height="5" rx="1" fill="#64748b" />
    </svg>
  )
}
