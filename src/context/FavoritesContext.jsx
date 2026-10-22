import { createContext, useCallback, useContext, useMemo } from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'
import { getProductById } from '../data/products'

const FavoritesContext = createContext(null)

const sanitizeIds = (ids) =>
  (Array.isArray(ids) ? ids : []).filter((id) => Boolean(getProductById(id)))

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEYS.favorites, [])

  const ids = useMemo(() => sanitizeIds(favorites), [favorites])

  const isFavorite = useCallback((id) => ids.includes(id), [ids])

  const toggleFavorite = useCallback(
    (id) => {
      if (!getProductById(id)) return false
      let added = false
      setFavorites((prev) => {
        const current = sanitizeIds(prev)
        if (current.includes(id)) {
          added = false
          return current.filter((item) => item !== id)
        }
        added = true
        return [...current, id]
      })
      return added
    },
    [setFavorites]
  )

  const addFavorite = useCallback(
    (id) => {
      if (!getProductById(id)) return
      setFavorites((prev) => {
        const current = sanitizeIds(prev)
        return current.includes(id) ? current : [...current, id]
      })
    },
    [setFavorites]
  )

  const removeFavorite = useCallback(
    (id) => {
      setFavorites((prev) => sanitizeIds(prev).filter((item) => item !== id))
    },
    [setFavorites]
  )

  const clearFavorites = useCallback(() => {
    setFavorites([])
  }, [setFavorites])

  const value = useMemo(
    () => ({
      favorites: ids,
      count: ids.length,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites
    }),
    [ids, isFavorite, toggleFavorite, addFavorite, removeFavorite, clearFavorites]
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites faqat FavoritesProvider ichida ishlatilishi mumkin')
  return context
}
