import { siteConfig } from '../data/siteConfig'

const PHONE_PATTERN = /^\+?998[\s-]?(\d[\s-]?){9}$/

export const emptyOrderForm = () => ({
  name: '',
  phone: '',
  region: '',
  address: '',
  note: ''
})

/**
 * Checkout formasi tekshiruvi.
 * Qaytaradi: { field: xatoMatni } — bo'sh ob'ekt esa hammasi to'g'ri.
 */
export const validateOrderForm = (values) => {
  const errors = {}

  const name = (values.name || '').trim()
  if (!name) {
    errors.name = 'Ism va familiyani kiriting'
  } else if (name.length < 3) {
    errors.name = 'Ism-familiya kamida 3 ta belgidan iborat bo\'lishi kerak'
  } else if (!/[\p{L}]{2,}/u.test(name)) {
    errors.name = 'Ism-familiyada kamida 2 ta harf bo\'lishi kerak'
  }

  const phone = (values.phone || '').trim()
  if (!phone) {
    errors.phone = 'Telefon raqamini kiriting'
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = 'Raqam +998 XX XXX XX XX ko\'rinishida bo\'lishi kerak'
  }

  if (!values.region) {
    errors.region = 'Viloyat yoki shaharni tanlang'
  }

  const address = (values.address || '').trim()
  if (!address) {
    errors.address = 'Manzilni kiriting'
  } else if (address.length < 8) {
    errors.address = 'Manzil kamida 8 ta belgidan iborat bo\'lishi kerak'
  }

  return errors
}

/** Buyurtma raqamini yaratadi (demo). */
export const generateOrderNumber = () => {
  const now = new Date()
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
    now.getDate()
  ).padStart(2, '0')}`
  const randomPart = String(Math.floor(1000 + Math.random() * 9000))
  return `MC-${datePart}-${randomPart}`
}

export const formatOrderDate = (value) => {
  const date = value ? new Date(value) : new Date()
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const regionOptions = siteConfig.regions
