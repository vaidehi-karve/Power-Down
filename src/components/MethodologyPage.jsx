import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const CARDS = [
  {
    color: '#3B82F6',
    heading: '💡 Monthly Bill',
    explanation:
      'Your monthly bill starts at your persona\'s baseline and changes each time you make a decision that affects energy usage or costs.',
    formula: `New Bill = Previous Bill
           + Decision Impact ($/month)

Example: Smart thermostat saves ~$18/month
based on a ~10% reduction in HVAC costs
applied to the baseline bill.

Baseline bills by persona:
  • Homeowner (San Diego):          $180/month
  • Renter (Los Angeles):           $130/month
  • Small Business (Sacramento):    $620/month`,
    source:
      'Source: EIA Residential Energy Consumption Survey (RECS) 2020 — average monthly electricity bills by state and housing type.',
  },
  {
    color: '#10B981',
    heading: '🌍 CO₂ Avoided',
    explanation:
      'Every time you reduce electricity usage or switch to a cleaner source, you avoid CO₂ that would have been emitted by the California grid.',
    formula: `CO₂ Avoided (tons/yr) =
    kWh Saved Per Year
    × CA Grid Emissions Factor
    ÷ 2,000   (convert lbs → tons)

CA Grid Emissions Factor:
    0.512 lbs CO₂ per kWh

Example — Rooftop Solar (7 kW system):
    Annual generation:
        7 kW × 1,500 hrs/yr = 10,500 kWh/yr
    CO₂ avoided:
        10,500 × 0.512 ÷ 2,000 = 2.69 tons/yr`,
    source:
      'Source: EIA Electric Power Annual 2023 — state-level CO₂ emissions factors for electricity generation. California figure: 0.512 lbs CO₂/kWh.',
  },
  {
    color: '#F59E0B',
    heading: '💰 5-Year Savings',
    explanation:
      'This is the total financial impact of each decision over 5 years — projected bill savings minus any upfront costs paid.',
    formula: `5-Year Savings (per decision) =
    (Monthly Bill Change × 60 months)
    − Upfront Cost for that decision

Running total = Σ all decisions' 5-yr savings

Example — Smart thermostat:
    Monthly savings:  $18/month
    Over 5 years:     $18 × 60 = $1,080
    Upfront cost:     $150
    Net 5-yr savings: $1,080 − $150 = $930

Example — New EV:
    Monthly electricity added: +$51/month
    Fuel savings vs. gas car: +$1,071/yr
    Net savings over 5 years: $5,357
    Upfront cost (net):       $27,500
    Net 5-yr savings:         −$10,143`,
    source:
      'Source: EIA retail electricity price data by state (2024) combined with EPA vehicle efficiency ratings and CA gas price averages.',
  },
  {
    color: '#EF4444',
    heading: '💳 Upfront Spent',
    explanation:
      'Some decisions require paying money upfront before you start saving. This is the running total of all one-time costs across your decisions.',
    formula: `Upfront Spent = Σ all one-time costs chosen

Upfront costs used in the game (net of credits):
  • Smart thermostat:              $150
  • Rooftop solar — homeowner:     $11,600
      ($18,000 system − 30% federal
       tax credit − $1,000 CA rebate)
  • Rooftop solar — small biz:     $30,500
      ($45,000 system − 30% credit
       − $1,000 CA rebate)
  • Community solar subscription:  $15
  • Used EV (net):                 $14,000
      ($18,000 − $4,000 federal credit)
  • New EV (net):                  $27,500
      ($35,000 − $7,500 federal credit)
  • Heat pump water heater (net):  $1,500
      ($1,800 − $300 federal rebate)
  • Solar water heater:            $3,200
  • Gas water heater:              $900
  • EV charger vote fee:           $400
  • Do nothing / skip:             $0`,
    source:
      'Source: IRS Form 5695 (2024) for federal tax credits. California rebate from CPUC Self-Generation Incentive Program. EV credits from IRA 2022 Section 30D.',
  },
  {
    color: '#8B5CF6',
    heading: '⭐ Score',
    explanation:
      'Your score rewards decisions that reduce CO₂ AND save money. Every ton of CO₂ avoided is worth 50 points; every $10 saved adds 1 point.',
    formula: `Score =
    (Total CO₂ Avoided tons/yr × 50)
    + (Total 5-Year Savings ÷ 10)

    Minimum score: 0 (never negative)

Example — Smart thermostat only:
    CO₂:     0.4 tons × 50    =  20 pts
    Savings: $930 ÷ 10         =  93 pts
    Score:                        113 pts

Example — Rooftop solar + no car:
    CO₂:     2.7 + 3.8 = 6.5t × 50 = 325 pts
    Savings: $12,325 + $4,329 ÷ 10  = 167 pts
    Score:                              492 pts

Grade thresholds:
    A+  ≥ 500 pts    B  ≥ 150 pts
    A   ≥ 300 pts    C  ≥  50 pts
                     D  <  50 pts`,
    source:
      'Scoring formula designed by the Power Down team to balance environmental and financial impact equally, using EIA data ranges for typical California household decisions.',
  },
]

function FormulaCard({ card }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm mb-5 overflow-hidden"
      style={{ border: '1px solid #E5E7EB', borderLeft: `4px solid ${card.color}` }}
    >
      <div className="p-5">
        <h3 className="text-lg font-black text-slate-900 mb-1">{card.heading}</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{card.explanation}</p>
        <pre
          className="text-xs leading-relaxed rounded-xl overflow-x-auto whitespace-pre-wrap"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            background: '#F3F4F6',
            padding: '12px 16px',
            color: '#1F2937',
          }}
        >
          {card.formula}
        </pre>
        <p className="text-xs text-slate-400 mt-3 leading-relaxed">{card.source}</p>
      </div>
    </div>
  )
}

export default function MethodologyPage({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 overflow-y-auto"
      style={{ background: '#FAFAFA', zIndex: 9999 }}
    >
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Top back button */}
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Game
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            How We Calculate Your Numbers
          </h1>
          <p className="text-slate-500 text-base leading-relaxed">
            Every number in Power Down comes from real US government energy data.
          </p>
        </div>

        {/* Formula cards */}
        {CARDS.map((card) => (
          <FormulaCard key={card.heading} card={card} />
        ))}

        {/* Footer */}
        <div className="border-t border-slate-200 pt-6 mt-2">
          <p className="text-sm text-slate-500 leading-relaxed">
            All financial calculations use 2024 EIA data for California electricity rates.
            CO₂ calculations use the California grid emissions factor of 0.512 lbs/kWh from
            EIA's Electric Power Annual. Upfront costs reflect 2024 market prices and current
            federal/state incentive programs.
          </p>
          <button
            onClick={onClose}
            className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Game
          </button>
        </div>
      </div>
    </motion.div>
  )
}
