/**
 * Sayt bo'yicha umumiy sozlamalar.
 * Bu qiymatlar demo loyihasi uchun — ularni o'zingiznikisiga almashtirishingiz mumkin.
 */
export const siteConfig = {
  brand: {
    name: 'MEVA CHEVA MARKET',
    shortName: 'MCM',
    tagline: 'Yangi va tabiiy mahsulotlar',
    description:
      'MEVA CHEVA MARKET — yangi va tabiiy meva-sabzavot, quruq meva hamda oziq-ovqat mahsulotlarini demo tarzida onlayn buyurtma qilish imkonini beruvchi sayt.',
    logo: 'logo'
  },

  contact: {
    // Haqiqiy ma'lumotlarni shu yerda kiritingiz
    phone: '+998 71 000 00 00',
    phone2: '+998 90 000 00 00',
    telegram: 'https://t.me/mevachevamarket',
    telegramLabel: '@mevachevamarket',
    instagram: 'https://instagram.com/mevachevamarket',
    instagramLabel: '@mevachevamarket',
    email: 'info@mevachevamarket.uz',
    address: 'Toshkent shahri, Amir Temur ko\'chasi, 1-uy',
    workingHours: 'Har kuni 08:00 dan 22:00 gacha (dushanba — yakshanba)'
  },

  delivery: {
    basePrice: 15000,
    freeFrom: 250000,
    freeLabel: '250 000 so\'mdan ortiq buyurtmalarda yetkazib berish bepul',
    priceLabel: 'Yetkazib berish — 15 000 so\'m',
    freePriceLabel: 'Yetkazib berish — bepul',
    note: 'Yetkazib berish narxi demo sozlamasidan boshqariladi.'
  },

  currency: 'so\'m',

  // Eslatma: bu demo loyiha. Quyidagi matn foydalanuvchiga demo ekanini bildiradi.
  demoNotice:
    'Bu demo loyiha. Mahsulotlar, narxlar va aloqa ma\'lumotlari namuna sifatida kiritilgan, buyurtmalar haqiqiy tizimga yuborilmaydi.',

  social: [
    { id: 'telegram', label: 'Telegram', href: 'https://t.me/mevachevamarket', icon: 'telegram' },
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/mevachevamarket', icon: 'instagram' },
    { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/mevachevamarket', icon: 'facebook' }
  ],

  regions: [
    'Toshkent shahri',
    'Toshkent viloyati',
    'Samarqand',
    'Buxoro',
    'Andijon',
    'Namangan',
    'Farg\'ona',
    'Jizzax',
    'Sirdaryo',
    'Surxondaryo',
    'Qashqadaryo',
    'Navoiy',
    'Xorazm'
  ]
}

export const popularSearches = [
  'olma',
  'banan',
  'pomidor',
  'uzum',
  'anor',
  'sabzi',
  'nok',
  'qulupnay'
]
