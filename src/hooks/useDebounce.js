import { useEffect, useState } from 'react'

/** Qiymatni kechiktirilgan holda yangilaydi (qidiruv maydoni uchun). */
export const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(timer)
  }, [value, delay])

  return debounced
}
