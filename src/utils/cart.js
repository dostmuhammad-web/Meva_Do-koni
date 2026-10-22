import { getProductById } from '../data/products'
import { siteConfig } from '../data/siteConfig'
import { formatPrice } from './format'

/**
 * Savatchadagi ma'lumotlarni to'liq hisoblaydi:
 * mahsulotlar ro'yxati, umumiy summa, chegirmalar va yetkazib berish narxi.
 */
export const getCartDetails = (items = []) => {
  const detailed = items
    .map((item) => {
      const product = getProductById(item.id)
      if (!product) return null
      const qty = Number(item.qty) || 0
      if (qty <= 0) return null
      const lineTotal = product.price * qty
      const lineOldTotal = (product.oldPrice || product.price) * qty
      return {
        product,
        qty,
        unit: product.unit,
        step: product.step,
        lineTotal,
        lineOldTotal,
        lineSavings: lineOldTotal - lineTotal
      }
    })
    .filter(Boolean)

  const count = detailed.length
  const totalQuantity = detailed.reduce((sum, item) => sum + item.qty, 0)
  const subtotal = detailed.reduce((sum, item) => sum + item.lineTotal, 0)
  const savings = detailed.reduce((sum, item) => sum + item.lineSavings, 0)

  const { basePrice, freeFrom } = siteConfig.delivery
  const deliveryFree = subtotal > 0 && subtotal >= freeFrom
  const delivery = subtotal === 0 ? 0 : deliveryFree ? 0 : basePrice
  const total = subtotal + delivery

  return {
    items: detailed,
    count,
    totalQuantity,
    subtotal,
    savings,
    delivery,
    deliveryFree,
    total,
    freeFrom,
    remainingForFree: Math.max(0, freeFrom - subtotal)
  }
}

/** Miqdorni mahsulotning qadamiga moslashtiradi (masalan 0.5 kg). */
export const normalizeQty = (qty, step = 1) => {
  const safeStep = step > 0 ? step : 1
  const rounded = Math.round((Number(qty) || 0) / safeStep) * safeStep
  return Math.max(safeStep, Math.round(rounded * 1000) / 1000)
}

/** Yetkazib berish narxi matnini qaytaradi. */
export const getDeliveryLabel = (deliveryFree, delivery) => {
  if (deliveryFree) return siteConfig.delivery.freePriceLabel
  return `Yetkazib berish — ${formatPrice(delivery)}`
}
