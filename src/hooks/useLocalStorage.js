import { useCallback, useEffect, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage'

/**
 * Qiymatni localStorage'da saqlab turadigan useState.
 * @param {string} key - localStorage kaliti
 * @param {*} initialValue - boshlang'ich qiymat
 */
export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => readStorage(key, initialValue))

  useEffect(() => {
    writeStorage(key, value)
  }, [key, value])

  const updateValue = useCallback((next) => {
    setValue((prev) => (typeof next === 'function' ? next(prev) : next))
  }, [])

  return [value, updateValue]
}
