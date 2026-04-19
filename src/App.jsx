import { AnimatePresence, motion } from 'framer-motion'
import { useGameState } from './hooks/useGameState'
import { getDecisionsForPersona } from './data/decisions'
import WelcomeScreen from './components/WelcomeScreen'
import PersonaSelect from './components/PersonaSelect'
import GameLayout from './components/GameLayout'
import FinalScreen from './components/FinalScreen'

const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
}

export default function App() {
  const {
    state,
    selectPersona,
    makeDecision,
    continueToNext,
    goToPersonaSelect,
    restart,
    currentDecision,
    totalDecisions,
  } = useGameState()

  const { screen, persona, lastOutcome, round } = state

  const allDecisions = persona ? getDecisionsForPersona(persona.id) : []

  const isGameScreen = screen === 'decision' || screen === 'outcome'

  if (isGameScreen) {
    const decision = screen === 'decision' ? currentDecision() : null

    // If we're in decision mode but there's no decision left, advance
    if (screen === 'decision' && !decision) {
      continueToNext()
      return null
    }

    return (
      <GameLayout
        screen={screen}
        persona={persona}
        state={state}
        decision={decision}
        lastOutcome={lastOutcome}
        onDecide={makeDecision}
        onContinue={continueToNext}
        round={round}
        total={totalDecisions}
        allDecisions={allDecisions}
      />
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {screen === 'welcome' && <WelcomeScreen onStart={goToPersonaSelect} />}
        {screen === 'persona' && <PersonaSelect onSelect={selectPersona} />}
        {screen === 'final' && <FinalScreen state={state} onRestart={restart} />}
      </motion.div>
    </AnimatePresence>
  )
}
