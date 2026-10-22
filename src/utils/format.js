/** Raqamlarni o'zbek formatida ko'rsatish uchun yordamchilar. */

const NBSP = '\u00A0'

/** 12500 -> "12 500" */
export const formatNumber = (value) => {
  if (!Number.isFinite(value)) return '0'
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, NBSP)
}

/** 12500 -> "12 500 so'm" */
export const formatPrice = (value) => `${formatNumber(value)}${NBSP}so'm`

/** 1.5 -> "1,5" */
export const formatDecimal = (value) => {
  if (!Number.isFinite(value)) return '0'
  const rounded = Math.round(value * 100) / 100
  return String(rounded).replace('.', ',')
}

/**
 * Miqdor va o'lchov birligini birlashtiradi.
 * formatQuantity(1.5, '1 kg') => "1,5 kg"
 */
export const formatQuantity = (quantity, unit = '1 kg') => {
  const qty = formatDecimal(quantity)
  switch (unit) {
    case '1 kg':
      return `${qty} kg`
    case '500 g':
      return `${qty}×${'500 g'} (${formatNumber(quantity * 500)}${NBSP}g)`
    case '250 g':
      return `${qty}×${'250 g'} (${formatNumber(quantity * 250)}${NBSP}g)`
    case '1 litr':
      return `${qty} litr`
    case '1 quti':
      return `${qty} quti`
    case '1 dona':
      return `${qty} dona`
    default:
      return `${qty} ${unit}`
  }
}

/** Ro'yxatdagi umumiy mahsulotlar sonini matn qilish uchun */
export const pluralize = (count, one, many) => {
  return `${formatNumber(count)} ${count === 1 ? one : many}`
}
