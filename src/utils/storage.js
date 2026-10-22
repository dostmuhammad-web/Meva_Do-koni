/** localStorage bilan xavfsiz ishlash yordamlari (SSR/brauzer cheklovlari uchun). */

export const STORAGE_KEYS = {
  cart: 'mcm_cart_v1',
  favorites: 'mcm_favorites_v1',
  orders: 'mcm_orders_v1'
}

export const readStorage = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return parsed === null || parsed === undefined ? fallback : parsed
  } catch (error) {
    console.warn(`localStorage\'ni o\'qishda xatolik (${key}):`, error)
    return fallback
  }
}

export const writeStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`localStorage\'ga yozishda xatolik (${key}):`, error)
  }
}

export const removeStorage = (key) => {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.warn(`localStorage\'dan o\'chirishda xatolik (${key}):`, error)
  }
}
