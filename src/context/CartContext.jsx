import { createContext, useCallback, useContext, useMemo } from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage'
import { STORAGE_KEYS } from '../utils/storage'
import { getCartDetails, normalizeQty } from '../utils/cart'
import { getProductById } from '../data/products'

const CartContext = createContext(null)

const sanitizeItems = (items) =>
  (Array.isArray(items) ? items : [])
    .map((item) => {
      const product = getProductById(item.id)
      if (!product) return null
      const qty = normalizeQty(item.qty, product.step)
      return { id: product.id, qty, addedAt: item.addedAt || Date.now() }
    })
    .filter(Boolean)

export const CartProvider = ({ children }) => {
  const [items, setItems] = useLocalStorage(STORAGE_KEYS.cart, [])

  const cartItems = useMemo(() => sanitizeItems(items), [items])
  const details = useMemo(() => getCartDetails(cartItems), [cartItems])

  const addToCart = useCallback(
    (product, qty = 1) => {
      if (!product) return
      const safeQty = normalizeQty(qty, product.step)
      setItems((prev) => {
        const current = sanitizeItems(prev)
        const existing = current.find((item) => item.id === product.id)
        if (existing) {
          return current.map((item) =>
            item.id === product.id
              ? { ...item, qty: normalizeQty(item.qty + safeQty, product.step) }
              : item
          )
        }
        return [...current, { id: product.id, qty: safeQty, addedAt: Date.now() }]
      })
    },
    [setItems]
  )

  const updateQty = useCallback(
    (id, qty) => {
      const product = getProductById(id)
      if (!product) return
      setItems((prev) =>
        sanitizeItems(prev).map((item) =>
          item.id === id ? { ...item, qty: normalizeQty(qty, product.step) } : item
        )
      )
    },
    [setItems]
  )

  const increaseQty = useCallback(
    (id) => {
      const product = getProductById(id)
      if (!product) return
      setItems((prev) =>
        sanitizeItems(prev).map((item) =>
          item.id === id
            ? { ...item, qty: normalizeQty(item.qty + product.step, product.step) }
            : item
        )
      )
    },
    [setItems]
  )

  const decreaseQty = useCallback(
    (id) => {
      const product = getProductById(id)
      if (!product) return
      setItems((prev) =>
        sanitizeItems(prev)
          .map((item) =>
            item.id === id
              ? { ...item, qty: normalizeQty(item.qty - product.step, product.step) }
              : item
          )
          .filter((item) => item.qty > 0)
      )
    },
    [setItems]
  )

  const removeFromCart = useCallback(
    (id) => {
      setItems((prev) => sanitizeItems(prev).filter((item) => item.id !== id))
    },
    [setItems]
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [setItems])

  const value = useMemo(
    () => ({
      items: cartItems,
      ...details,
      addToCart,
      updateQty,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart
    }),
    [cartItems, details, addToCart, updateQty, increaseQty, decreaseQty, removeFromCart, clearCart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart faqat CartProvider ichida ishlatilishi mumkin')
  return context
}
