/**
 * Kategoriyalar ro'yxati.
 * `slug` — URL uchun, `image` — mahsulot rasmlari papkasidagi asosiy rasm kaliti.
 */
export const categoryGroups = [
  {
    id: 'fruits',
    title: 'Mevalar',
    description: 'Yangi va tabiiy mevalar',
    icon: '🍎',
    categories: [
      { slug: 'olma', name: 'Olma', image: 'olma-1', description: 'Sho\'r, yumshoq va suvli olmalar' },
      { slug: 'banan', name: 'Banan', image: 'banan-1', description: 'Shirin va to\'yimli bananlar' },
      { slug: 'apelsin', name: 'Apelsin', image: 'apelsin-1', description: 'Vitamin C ga boy apelsinlar' },
      { slug: 'mandarin', name: 'Mandarin', image: 'mandarin-1', description: 'Shirin mandarin va murcut' },
      { slug: 'anor', name: 'Anor', image: 'anor-1', description: 'Donador va serb resursli anorlar' },
      { slug: 'uzum', name: 'Uzum', image: 'uzum-1', description: 'Kishmish va navo navlari' },
      { slug: 'nok', name: 'Nok', image: 'nok-1', description: 'Nashi va garmdori noklar' },
      { slug: 'shaftoli', name: 'Shaftoli', image: 'shaftoli-1', description: 'Yumshoq va shirin shaftoli' },
      { slug: 'orik', name: 'O\'rik', image: 'orik-1', description: 'Lola va kurma navlari' },
      { slug: 'gilos', name: 'Gilos', image: 'gilos-1', description: 'Shirin va achchiq giloslar' },
      { slug: 'qulupnay', name: 'Qulupnay', image: 'qulupnay-1', description: 'Mayin va mahalliy qulupnay' },
      { slug: 'tarvuz', name: 'Tarvuz', image: 'tarvuz-1', description: 'Yozgi shirin tarvuzlar' },
      { slug: 'qovun', name: 'Qovun', image: 'qovun-1', description: 'Muskatli va oq qovunlar' },
      { slug: 'mango', name: 'Mango', image: 'mango-1', description: 'Tropik va shirin mangolar' },
      { slug: 'kivi', name: 'Kivi', image: 'kivi-1', description: 'Yangi Zelandiya kivisi' },
      { slug: 'limon', name: 'Limon', image: 'limon-1', description: 'Sarf va sho\'r limonlar' }
    ]
  },
  {
    id: 'vegetables',
    title: 'Sabzavotlar',
    description: 'Yangi va toza sabzavotlar',
    icon: '🥕',
    categories: [
      { slug: 'kartoshka', name: 'Kartoshka', image: 'kartoshka-1', description: 'Yangi va qizil kartoshka' },
      { slug: 'piyoz', name: 'Piyoz', image: 'piyoz-1', description: 'Sarı, qizil va yashil piyoz' },
      { slug: 'sabzi', name: 'Sabzi', image: 'sabzi-1', description: 'Karangi, sariq va aralash sabzi' },
      { slug: 'pomidor', name: 'Pomidor', image: 'pomidor-1', description: 'Uzumchat va katta pomidorlar' },
      { slug: 'bodring', name: 'Bodring', image: 'bodring-1', description: 'Uzun mayin va qalampir bodring' },
      { slug: 'qalampiri', name: 'Bulg\'or qalampiri', image: 'qalampiri-1', description: 'Qizil, sariq va yashil qalampirlar' },
      { slug: 'karam', name: 'Karam', image: 'karam-1', description: 'Oq, yashil va qizil karam' },
      { slug: 'baqlajon', name: 'Baqlajon', image: 'baqlajon-1', description: 'Cho\'kda va katta baqlajonlar' },
      { slug: 'sarimsoq', name: 'Sarimsoq', image: 'sarimsoq-1', description: 'Yangi, quruq va sharbatli sarimsoq' },
      { slug: 'lavlagi', name: 'Lavlagi', image: 'lavlagi-1', description: 'Qizil va oq lavlagi' },
      { slug: 'kokatlar', name: 'Ko\'katlar', image: 'kokatlar-1', description: 'Rayhon, shpinat va salat ko\'katlari' }
    ]
  },
  {
    id: 'other',
    title: 'Boshqa mahsulotlar',
    description: 'Quruq meva, yong\'oq va sharbatlar',
    icon: '🥜',
    categories: [
      { slug: 'quruq-meva', name: 'Quruq mevalar', image: 'quruq-meva-1', description: 'Aralash quruq meva to\'plami' },
      { slug: 'yong-oqlar', name: 'Yong\'oqlar', image: 'yong-oqlar-1', description: 'Premium aralash yong\'oqlar' },
      { slug: 'yong-oq', name: 'Yong\'oq', image: 'yongoq-1', description: 'Qora, qirmizi va parish yong\'oqlari' },
      { slug: 'yeryong-oq', name: 'Yeryong\'oq', image: 'yong-oqlar-2', description: 'Qovurilgan va tuzlangan yeryong\'oq' },
      { slug: 'quritilgan-orik', name: 'Quritilgan o\'rik', image: 'quritilgan-orik-1', description: 'Turli navli quritilgan o\'rik' },
      { slug: 'mayiz', name: 'Mayiz', image: 'mayiz-1', description: 'Qora, oq va yashil mayiz' },
      { slug: 'xurmo', name: 'Xurmo', image: 'xurmo-1', description: 'Quruq va shirin xurmo' },
      { slug: 'bodom', name: 'Bodom', image: 'bodom-1', description: 'Maydalangan va to\'ldirilgan bodom' },
      { slug: 'pista', name: 'Pista', image: 'pista-1', description: 'Tuzlangan va tabiiy pista' },
      { slug: 'sharbat', name: 'Tabiiy sharbatlar', image: 'sharbat-1', description: '100% tabiiy sharbatlar' },
      { slug: 'salat', name: 'Ko\'katlar va salat mahsulotlari', image: 'salat-1', description: 'Tayyor salat aralashlari' }
    ]
  }
]

export const allCategories = categoryGroups.flatMap((group) =>
  group.categories.map((category) => ({ ...category, group: group.id, groupTitle: group.title }))
)

export const categoriesBySlug = allCategories.reduce((acc, category) => {
  acc[category.slug] = category
  return acc
}, {})

export const getCategory = (slug) => categoriesBySlug[slug] || null

export const getCategoriesByGroup = (groupId) =>
  allCategories.filter((category) => category.group === groupId)
