/**
 * Mahsulot rasmlarini kalit orqali topish.
 * Barcha rasmlar `src/assets/images` papkasida saqlanadi va
 * mahsulot `image` kaliti orqali aniq bir rasmga bog'lanadi.
 */
const imageModules = import.meta.glob('../assets/images/*.svg', {
  eager: true,
  import: 'default'
})

const imageMap = Object.entries(imageModules).reduce((acc, [path, url]) => {
  const fileName = path.split('/').pop().replace(/\.svg$/, '')
  acc[fileName] = url
  return acc
}, {})

export const FALLBACK_IMAGE = imageMap.fallback || ''
export const LOGO_IMAGE = imageMap.logo || ''

/** Kalit bo'yicha rasm URL qaytaradi (topilmasa — zaxira tasvir). */
export const getProductImage = (key) => imageMap[key] || FALLBACK_IMAGE

/** Rasm mavjudligini tekshirish (test va logika uchun). */
export const hasProductImage = (key) => Boolean(imageMap[key])

/** Barcha mavjud rasm kalitlari. */
export const availableImages = Object.keys(imageMap)
