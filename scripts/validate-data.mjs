/**
 * Ma'lumotlar va rasmlar mosligini tekshiruvchi skript.
 * Ishga tushirish: npm run validate
 */
import { readdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { products, PRICE_RANGE } from '../src/data/products.js'
import { allCategories, categoriesBySlug } from '../src/data/categories.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMAGES_DIR = join(__dirname, '..', 'src', 'assets', 'images')

/** Kategoriya slug'i -> rasm turlari (bitta nechta bo'lishi mumkin). */
const CATEGORY_IMAGE_TYPES = {
  olma: ['olma'],
  banan: ['banan'],
  apelsin: ['apelsin'],
  mandarin: ['mandarin'],
  anor: ['anor'],
  uzum: ['uzum'],
  nok: ['nok'],
  shaftoli: ['shaftoli'],
  orik: ['orik'],
  gilos: ['gilos'],
  qulupnay: ['qulupnay'],
  tarvuz: ['tarvuz', 'tarvuz-qirqim'],
  qovun: ['qovun', 'qovun-qirqim'],
  mango: ['mango'],
  kivi: ['kivi'],
  limon: ['limon'],
  kartoshka: ['kartoshka'],
  piyoz: ['piyoz'],
  sabzi: ['sabzi'],
  pomidor: ['pomidor'],
  bodring: ['bodring'],
  qalampiri: ['qalampiri'],
  karam: ['karam'],
  baqlajon: ['baqlajon'],
  sarimsoq: ['sarimsoq'],
  lavlagi: ['lavlagi'],
  kokatlar: ['kokatlar'],
  'quruq-meva': ['quruq-meva'],
  'yong-oqlar': ['yong-oqlar', 'yongoq'],
  'yong-oq': ['yongoq'],
  'yeryong-oq': ['yong-oqlar', 'yongoq'],
  'quritilgan-orik': ['quritilgan-orik'],
  mayiz: ['mayiz'],
  xurmo: ['xurmo'],
  bodom: ['bodom'],
  pista: ['pista'],
  sharbat: ['sharbat'],
  salat: ['salat']
}

const errors = []
const warnings = []
const imageFiles = existsSync(IMAGES_DIR)
  ? readdirSync(IMAGES_DIR).filter((file) => file.endsWith('.svg'))
  : []

const usedImages = new Set()
const ids = new Set()

products.forEach((product) => {
  if (ids.has(product.id)) errors.push(`Takrorlangan ID: ${product.id}`)
  ids.add(product.id)

  if (!categoriesBySlug[product.category])
    errors.push(`${product.id}: noma'lum kategoriya "${product.category}"`)

  const imageKey = product.image
  const fileName = `${imageKey}.svg`
  if (!imageFiles.includes(fileName)) {
    errors.push(`${product.id}: rasm topilmadi -> ${fileName}`)
  }
  usedImages.add(fileName)

  const type = imageKey.replace(/-\d+$/, '')
  const allowed = CATEGORY_IMAGE_TYPES[product.category] || []
  if (!allowed.includes(type)) {
    errors.push(
      `${product.id}: "${product.category}" kategoriyasi uchun "${type}" rasm turi mos emas (ruxsat: ${allowed.join(', ')})`
    )
  }

  if (!product.name || !product.description) errors.push(`${product.id}: nomi yoki tavsifi yo'q`)
  if (!Number.isFinite(product.price) || product.price <= 0) errors.push(`${product.id}: narx noto'g'ri`)
  if (product.oldPrice && product.oldPrice <= product.price)
    errors.push(`${product.id}: eski narx yangisidan katta bo'lishi kerak`)
  if (!product.step || product.step <= 0) errors.push(`${product.id}: miqdor qadami belgilanmagan`)
  if (product.rating < 0 || product.rating > 5) errors.push(`${product.id}: reyting 0-5 oralig'ida emas`)
})

allCategories.forEach((category) => {
  const hasProducts = products.some((product) => product.category === category.slug)
  if (!hasProducts) warnings.push(`Kategoriya "${category.slug}" bo'sh`)

  const categoryImage = `${category.image}.svg`
  if (!imageFiles.includes(categoryImage))
    warnings.push(`Kategoriya "${category.slug}" rasmi topilmadi: ${categoryImage}`)
})

const unusedImages = imageFiles.filter((file) => !usedImages.has(file) && file !== 'fallback.svg')

console.log(`Ma'lumotlar bazasi: ${products.length} ta mahsulot, ${allCategories.length} ta kategoriya`)
console.log(`Rasm fayllari: ${imageFiles.length} ta (ishlatilgan: ${usedImages.size})`)
console.log(`Narx diapazoni: ${PRICE_RANGE.min} – ${PRICE_RANGE.max} so'm`)

if (unusedImages.length) {
  console.log(`\nIshlatilmagan rasmlar (${unusedImages.length}): ${unusedImages.join(', ')}`)
}

if (warnings.length) {
  console.log('\nOgohlantirishlar:')
  warnings.forEach((warning) => console.log(`  ! ${warning}`))
}

if (errors.length) {
  console.log('\nXatolar:')
  errors.forEach((error) => console.log(`  x ${error}`))
  process.exit(1)
}

console.log('\n✓ Barcha tekshiruvlar muvaffaqiyatli o\'tdi.')
