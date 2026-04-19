import { useState, useEffect } from 'react'

export function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0)
  const rounded = Math.round(target)

  useEffect(() => {
    if (rounded === 0) { setValue(0); return }
    const start = Date.now()
    let raf
    const frame = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(rounded * eased))
      if (p < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [rounded, duration])

  return value
}
