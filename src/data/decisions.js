export const DECISIONS = [
  {
    id: 'bill',
    title: 'Your Energy Bill',
    round: 1,
    intro: (persona) =>
      `Your electricity bill just arrived. It's $${persona.monthlyBill}/month. Your utility is offering a time-of-use (TOU) plan — cheaper rates before 4pm and after 9pm, but peak hours (4–9pm) cost 3× more.`,
    options: [
      {
        id: 'tou',
        label: 'Switch to time-of-use plan',
        description: 'Cheaper off-peak rates, but peak hours cost $0.42/kWh.',
      },
      {
        id: 'thermostat',
        label: 'Install a smart thermostat',
        description: '$150 upfront. Automatically shifts HVAC use to off-peak hours.',
      },
      {
        id: 'nothing',
        label: 'Do nothing',
        description: 'Keep your current flat-rate plan.',
      },
      {
        id: 'assistance',
        label: 'Call about low-income assistance programs',
        description: 'Check if you qualify for CARE or FERA discounts.',
      },
    ],
  },
  {
    id: 'solar',
    title: 'Solar Installation',
    round: 2,
    personaFilter: ['homeowner', 'smallbiz'],
    intro: (persona) => {
      const systemCost = persona.id === 'smallbiz' ? 45000 : 18000
      const taxCredit = Math.round(systemCost * 0.3)
      const caRebate = 1000
      const netCost = systemCost - taxCredit - caRebate
      return `A solar installer gives you a quote: $${systemCost.toLocaleString()} installed (before incentives). Federal tax credit: 30% = $${taxCredit.toLocaleString()} back. California rebate: $1,000. Your net cost: $${netCost.toLocaleString()}. Your roof needs replacing in 3 years.`
    },
    options: [
      {
        id: 'install_now',
        label: 'Install now with financing',
        description: 'Zero upfront, pay monthly. System starts producing immediately.',
      },
      {
        id: 'install_later',
        label: 'Install when roof is replaced (3 years)',
        description: 'Bundle the projects. Higher total cost but one disruption.',
      },
      {
        id: 'community_solar',
        label: 'Join community solar instead',
        description: '$15/month subscription, $20/month savings. No installation needed.',
      },
      {
        id: 'decline',
        label: 'Decline — too complicated right now',
        description: 'Focus on other ways to reduce your bill.',
      },
    ],
  },
  {
    id: 'solar_community',
    title: 'Community Solar Program',
    round: 2,
    personaFilter: ['renter'],
    intro: () =>
      `Your building just joined a community solar program. You can subscribe for $15/month and save $20/month on your electricity bill. 40 units in your building — only 12 have signed up so far.`,
    options: [
      {
        id: 'subscribe',
        label: 'Subscribe to community solar',
        description: '$15/month cost, $20/month savings. Net: +$5/month.',
      },
      {
        id: 'recruit',
        label: 'Subscribe and recruit neighbors',
        description: 'Subscribe and try to get 5+ more units to join.',
      },
      {
        id: 'waitlist',
        label: 'Join the waitlist for now',
        description: 'See if the program gets better terms before committing.',
      },
      {
        id: 'pass',
        label: 'Pass — not worth the hassle',
        description: 'Skip the program entirely.',
      },
    ],
  },
  {
    id: 'car',
    title: 'Your Next Car',
    round: 3,
    intro: () => `Your car is dying and you need a replacement. Here are your real options based on EIA fuel cost data for California:`,
    options: [
      {
        id: 'used_gas',
        label: 'Used gas car — $12,000',
        description: 'Familiar, lower upfront. ~$2,100/year in fuel at current CA prices.',
      },
      {
        id: 'used_ev',
        label: 'Used EV — $18,000 (–$4,000 federal credit)',
        description: 'Net $14,000. ~$620/year in electricity. Charging infrastructure needed.',
      },
      {
        id: 'new_ev',
        label: 'New EV — $35,000 (–$7,500 federal credit)',
        description: 'Net $27,500. Best range, full warranty, ~$620/year in electricity.',
      },
      {
        id: 'no_car',
        label: 'No car + transit pass',
        description: '$1,200/year transit cost. Works if you live near good public transit.',
      },
    ],
  },
  {
    id: 'appliance',
    title: 'Home Appliances',
    round: 4,
    intro: () => `Your water heater just died and needs immediate replacement. Here are your options — running costs calculated from EIA residential energy data:`,
    options: [
      {
        id: 'gas_heater',
        label: 'Standard gas water heater — $900',
        description: 'Lower upfront. Runs on gas. ~$400/year operating cost.',
      },
      {
        id: 'electric_heater',
        label: 'Standard electric water heater — $950',
        description: 'Higher running cost than gas in most cases. ~$1,392/year.',
      },
      {
        id: 'heat_pump',
        label: 'Heat pump water heater — $1,800',
        description: '70% more efficient than standard electric. ~$406/year. $300 federal rebate available.',
      },
      {
        id: 'solar_water',
        label: 'Solar water heater — $3,200',
        description: 'Nearly free to run (~$87/year). Needs roof space. 7–10 year payback.',
      },
    ],
  },
  {
    id: 'community',
    title: 'Your Community',
    round: 5,
    intro: () =>
      `Your neighborhood association is voting on installing EV chargers in the shared parking lot. Cost: $400/household one-time fee. Expected to increase property values 2–3% and reduce neighborhood CO₂ by 8 tons/year.`,
    options: [
      {
        id: 'vote_yes',
        label: 'Vote yes and pay the fee',
        description: '$400 upfront. Enables EV ownership for everyone in the building.',
      },
      {
        id: 'vote_yes_sliding',
        label: 'Vote yes, request income-based sliding scale',
        description: 'Support the project while making it accessible to lower-income neighbors.',
      },
      {
        id: 'vote_no',
        label: 'Vote no — too expensive right now',
        description: 'Save the $400. Delay the project until next budget cycle.',
      },
      {
        id: 'propose_solar',
        label: 'Propose solar panels on the community center instead',
        description: 'Higher upfront cost but generates revenue for the HOA.',
      },
    ],
  },
]

export const getDecisionsForPersona = (personaId) => {
  return DECISIONS.filter(
    (d) => !d.personaFilter || d.personaFilter.includes(personaId)
  ).sort((a, b) => a.round - b.round)
}
