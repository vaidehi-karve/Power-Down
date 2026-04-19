import LeftPanel from './LeftPanel'
import CenterPanel from './CenterPanel'
import RightPanel from './RightPanel'

export default function GameLayout({
  screen,
  persona,
  state,
  decision,
  lastOutcome,
  onDecide,
  onContinue,
  round,
  total,
  allDecisions,
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* LEFT: HUD sidebar — hidden on small screens, shown on lg+ */}
      <div className="hidden lg:flex flex-col w-56 xl:w-64 flex-shrink-0 relative z-20">
        <LeftPanel state={state} round={round} total={total} />
      </div>

      {/* Mobile top stats bar (sm only) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-slate-900 text-white px-4 py-2 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-lg">{persona?.avatar}</span>
          <div>
            <p className="text-xs text-slate-400 leading-none">Score</p>
            <p className="text-base font-black text-yellow-400 leading-tight">
              {Math.max(0, Math.round(state.totalCO2Avoided * 50 + state.totalBillSavings / 10)).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i < round ? 'bg-green-400 w-5' : i === round ? 'bg-green-300 w-5' : 'bg-slate-600 w-3'
              }`}
            />
          ))}
        </div>
        <div>
          <p className="text-xs text-slate-400 leading-none">CO₂</p>
          <p className="text-base font-black text-emerald-400 leading-tight">
            {Math.max(0, Math.round(state.totalCO2Avoided * 10) / 10)}t
          </p>
        </div>
      </div>

      {/* CENTER: building illustration */}
      <div className="hidden md:flex flex-1 flex-col min-w-0 lg:mt-0">
        <CenterPanel
          persona={persona}
          state={state}
          allDecisions={allDecisions}
          totalDecisions={total}
        />
      </div>

      {/* RIGHT: decision / outcome panel */}
      <div className="flex-1 md:flex-none md:w-80 xl:w-96 flex-shrink-0 mt-12 lg:mt-0 overflow-hidden">
        <RightPanel
          screen={screen}
          decision={decision}
          persona={persona}
          lastOutcome={lastOutcome}
          state={state}
          onDecide={onDecide}
          onContinue={onContinue}
          round={round}
          total={total}
        />
      </div>
    </div>
  )
}
