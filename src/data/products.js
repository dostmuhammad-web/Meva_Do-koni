/**
 * MEVA CHEVA MARKET — mahsulotlar bazasi (demo).
 *
 * Barcha narxlar "so'm" da. Ma'lumotlar butunlay lokal — serverga ulanish shart emas.
 * Yangi mahsulot qo'shish uchun `make()` orqali bitta ob'ekt qo'shish yetarli.
 */

export const UNITS = {
  KG: '1 kg',
  G500: '500 g',
  G250: '250 g',
  DONA: '1 dona',
  QUTI: '1 quti',
  LITR: '1 litr'
}

/** Har bir o'lchov birligi uchun miqdor qadami. */
export const UNIT_STEP = {
  '1 kg': 0.5,
  '500 g': 0.5,
  '250 g': 0.25,
  '1 dona': 1,
  '1 quti': 1,
  '1 litr': 1
}

export const UNIT_OPTIONS = Object.keys(UNIT_STEP)

const discountPercent = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

const make = (product) => {
  const unit = product.unit || UNITS.KG
  return {
    inStock: true,
    popular: false,
    isNew: false,
    origin: 'O\'zbekiston',
    rating: 4.5,
    reviews: 0,
    stock: 50,
    ...product,
    unit,
    step: UNIT_STEP[unit],
    discount: discountPercent(product.price, product.oldPrice)
  }
}

export const products = [
  /* ------------------------------- OLMA ------------------------------- */
  make({
    id: 'olma-red-delicious',
    name: 'Olma "Red Delicious"',
    category: 'olma',
    image: 'olma-1',
    price: 19000,
    oldPrice: 23000,
    unit: UNITS.KG,
    description: 'Qalin, qizil-qizil rangli va shirin ta\'mli olma. Salat va sharbat uchun ideal.',
    origin: 'Andijon viloyati',
    rating: 4.8,
    reviews: 126,
    popular: true,
    stock: 80
  }),
  make({
    id: 'olma-granny-smith',
    name: 'Olma "Granny Smith"',
    category: 'olma',
    image: 'olma-2',
    price: 22000,
    unit: UNITS.KG,
    description: 'Nordon, yashil va juda qarsildoq olma. Pishirish uchun ham, ovqatga qo\'shish uchun ham mos.',
    origin: 'Toshkent viloyati',
    rating: 4.6,
    reviews: 74,
    stock: 60
  }),
  make({
    id: 'olma-golden-delicious',
    name: 'Olma "Golden Delicious"',
    category: 'olma',
    image: 'olma-3',
    price: 18500,
    oldPrice: 21000,
    unit: UNITS.KG,
    description: 'Sariq, yumshoq va juda shirin olma. Bolalar uchun eng sevimli ta\'m.',
    origin: 'Namangan viloyati',
    rating: 4.7,
    reviews: 58,
    isNew: true,
    stock: 45
  }),

  /* ------------------------------- BANAN ------------------------------- */
  make({
    id: 'banan-ekvador',
    name: 'Banan (Ekvador)',
    category: 'banan',
    image: 'banan-1',
    price: 32000,
    oldPrice: 35000,
    unit: UNITS.KG,
    description: 'Yumshoq, krem rangli va shirin banan. Muzlatilgan smoothie uchun ham qulay.',
    origin: 'Ekvador',
    rating: 4.7,
    reviews: 143,
    popular: true,
    stock: 90
  }),
  make({
    id: 'banan-filippin',
    name: 'Banan (Filippin)',
    category: 'banan',
    image: 'banan-2',
    price: 28500,
    unit: UNITS.KG,
    description: 'Kichikroq va biroz nordon banan. Har kuni nonushta uchun qulay narx.',
    origin: 'Filippin',
    rating: 4.4,
    reviews: 62,
    stock: 70
  }),
  make({
    id: 'banan-mini-sariq',
    name: 'Banan mini (sariq)',
    category: 'banan',
    image: 'banan-3',
    price: 39000,
    unit: UNITS.G500,
    description: 'Kichik, quyuq va juda shirin sariq banan. Bolalar uchun muqaddas ta\'m.',
    origin: 'Janubiy-Sharqiy Osiyo',
    rating: 4.9,
    reviews: 41,
    isNew: true,
    stock: 35
  }),

  /* ------------------------------ APELSIN ----------------------------- */
  make({
    id: 'apelsin-navoiy',
    name: 'Apelsin (Navoiy navi)',
    category: 'apelsin',
    image: 'apelsin-1',
    price: 14000,
    oldPrice: 16500,
    unit: UNITS.KG,
    description: 'Sho\'r, sariq va suvli apelsin. Sharbat va to\'g\'ri ovqatlanish uchun ideal.',
    origin: 'Navoiy viloyati',
    rating: 4.7,
    reviews: 98,
    popular: true,
    stock: 85
  }),
  make({
    id: 'apelsin-navel',
    name: 'Apelsin "Navel"',
    category: 'apelsin',
    image: 'apelsin-2',
    price: 15500,
    unit: UNITS.KG,
    description: 'Pushtligi katta, puli kam va ta\'mi muvozanatli apelsin navi.',
    origin: 'O\'zbekiston',
    rating: 4.5,
    reviews: 47,
    stock: 55
  }),
  make({
    id: 'apelsin-koreys',
    name: 'Apelsin (Janubiy Koreya)',
    category: 'apelsin',
    image: 'apelsin-3',
    price: 21000,
    unit: UNITS.KG,
    description: 'Ichimlik, shirin va yengil nordon. Import mahsuloti — qimmat, lekin mazali.',
    origin: 'Janubiy Koreya',
    rating: 4.3,
    reviews: 22,
    isNew: true,
    stock: 25
  }),

  /* ----------------------------- MANDARIN ----------------------------- */
  make({
    id: 'mandarin-samarqand',
    name: 'Mandarin (Samarqand navi)',
    category: 'mandarin',
    image: 'mandarin-1',
    price: 16000,
    oldPrice: 19000,
    unit: UNITS.KG,
    description: 'Shirin, yengil nordon va juda qiziqarli mandarin. Qishda oilaviy stol uchun.',
    origin: 'Samarqand viloyati',
    rating: 4.8,
    reviews: 87,
    popular: true,
    stock: 75
  }),
  make({
    id: 'mandarin-murcut',
    name: 'Mandarin "Murcut"',
    category: 'mandarin',
    image: 'mandarin-2',
    price: 24000,
    unit: UNITS.KG,
    description: 'Uzun va yengil nordon murcut. Quruq holda saqlashga qulay.',
    origin: 'O\'zbekiston',
    rating: 4.9,
    reviews: 39,
    isNew: true,
    stock: 40
  }),
  make({
    id: 'mandarin-qutilab',
    name: 'Mandarin qutilab (250 g)',
    category: 'mandarin',
    image: 'mandarin-3',
    price: 9000,
    unit: UNITS.QUTI,
    description: 'Kichik qutilarga joylangan mandarin. Yo\'lga olib yurish uchun qulay.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 66,
    stock: 120
  }),

  /* -------------------------------- ANOR ------------------------------- */
  make({
    id: 'anor-gulshirin',
    name: 'Anor "Gulshirin"',
    category: 'anor',
    image: 'anor-1',
    price: 26000,
    oldPrice: 30000,
    unit: UNITS.KG,
    description: 'Donador, shirin va serb resursli anor. Sharbat uchun eng yaxshi navi.',
    origin: 'Zarafshon viloyati',
    rating: 4.9,
    reviews: 112,
    popular: true,
    stock: 50
  }),
  make({
    id: 'anor-bedana',
    name: 'Anor "Bedana"',
    category: 'anor',
    image: 'anor-2',
    price: 28000,
    unit: UNITS.KG,
    description: 'Mayda donli, nordon va uzoq saqlanadigan anor navi.',
    origin: 'Jizzax viloyati',
    rating: 4.7,
    reviews: 54,
    stock: 45
  }),
  make({
    id: 'anor-suratlangan',
    name: 'Anor (suratlangan, 1 dona)',
    category: 'anor',
    image: 'anor-3',
    price: 32000,
    unit: UNITS.DONA,
    description: 'Yaxshi saratlangan, chiroyli ko\'rinishli anor. Soxta manzildan yoki sovg\'a uchun.',
    origin: 'Zarafshon viloyati',
    rating: 4.8,
    reviews: 31,
    isNew: true,
    stock: 20
  }),

  /* -------------------------------- UZUM ------------------------------- */
  make({
    id: 'uzum-kishmish',
    name: 'Uzum "Kishmish" (maydasiz)',
    category: 'uzum',
    image: 'uzum-1',
    price: 34000,
    oldPrice: 38000,
    unit: UNITS.KG,
    description: 'Maydasiz, shirin va yumshoq kishmish. Quritilgan mevalar uchun klassik tanlov.',
    origin: 'Namangan viloyati',
    rating: 4.9,
    reviews: 134,
    popular: true,
    stock: 60
  }),
  make({
    id: 'uzum-qora-kishmish',
    name: 'Uzum "Qora kishmish"',
    category: 'uzum',
    image: 'uzum-2',
    price: 29000,
    unit: UNITS.G500,
    description: 'To\'q rangli, nordon va quruq qora kishmish. Kompot uchun eng to\'g\'risi.',
    origin: 'Samarqand viloyati',
    rating: 4.7,
    reviews: 71,
    stock: 55
  }),
  make({
    id: 'uzum-yong-oq-rangli',
    name: 'Uzum (yong\'oq rangli, uzun dona)',
    category: 'uzum',
    image: 'uzum-3',
    price: 42000,
    unit: UNITS.KG,
    description: 'Uzun, yengil shirin va juda chiroyli uzum. Mehmatdon narxi ham bor.',
    origin: 'Farg\'ona viloyati',
    rating: 4.8,
    reviews: 45,
    isNew: true,
    stock: 30
  }),

  /* -------------------------------- NOK ------------------------------- */
  make({
    id: 'nok-garmdori',
    name: 'Nok "Garmdori"',
    category: 'nok',
    image: 'nok-1',
    price: 24000,
    oldPrice: 27000,
    unit: UNITS.KG,
    description: 'Yumshoq, suvli va shirin nok. Quruq meva qilish uchun ham mos.',
    origin: 'Farg\'ona viloyati',
    rating: 4.6,
    reviews: 63,
    stock: 48
  }),
  make({
    id: 'nok-nashi',
    name: 'Nok "Nashi"',
    category: 'nok',
    image: 'nok-2',
    price: 31000,
    unit: UNITS.KG,
    description: 'Juda shirin, miqdori ko\'p va uzoq saqlanadigan nashnavi.',
    origin: 'O\'zbekiston',
    rating: 4.8,
    reviews: 37,
    stock: 35
  }),
  make({
    id: 'nok-quruq',
    name: 'Nok (quritilgan, bo\'lakli)',
    category: 'nok',
    image: 'nok-3',
    price: 26000,
    unit: UNITS.G250,
    description: 'Tabiiy quritilgan nok bo\'laklari. Choy va shirinlik uchun qulay.',
    origin: 'O\'zbekiston',
    rating: 4.5,
    reviews: 28,
    isNew: true,
    stock: 40
  }),

  /* ------------------------------ SHAFTOLI ----------------------------- */
  make({
    id: 'shaftoli-olingan',
    name: 'Shaftoli (olingan, yorqin)',
    category: 'shaftoli',
    image: 'shaftoli-1',
    price: 27000,
    oldPrice: 31000,
    unit: UNITS.KG,
    description: 'Yumshoq, shirin va xushbo\'y shaftoli. Yozgi mavsumning eng sevimli mevasi.',
    origin: 'Samarqand viloyati',
    rating: 4.7,
    reviews: 92,
    popular: true,
    stock: 52
  }),
  make({
    id: 'shaftoli-oq',
    name: 'Shaftoli "Oq shaftoli"',
    category: 'shaftoli',
    image: 'shaftoli-2',
    price: 33000,
    unit: UNITS.KG,
    description: 'Oq, juda shirin va mayin. Qimmat, lekin ta\'mi aynan o\'ziga xos.',
    origin: 'Jizzax viloyati',
    rating: 4.8,
    reviews: 36,
    stock: 30
  }),
  make({
    id: 'shaftoli-nektar',
    name: 'Shaftoli nektar to\'plami',
    category: 'shaftoli',
    image: 'shaftoli-3',
    price: 29000,
    unit: UNITS.KG,
    description: 'Juda shirin va suvli shaftoli — sharbat qilish uchun eng yaxshi navi.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 33,
    isNew: true,
    stock: 42
  }),

  /* -------------------------------- O'RIK ------------------------------ */
  make({
    id: 'orik-lola',
    name: 'O\'rik "Lola"',
    category: 'orik',
    image: 'orik-1',
    price: 35000,
    oldPrice: 39000,
    unit: UNITS.KG,
    description: 'Norbakor, mayin va juda shirin o\'rik. Etilgan o\'rik va murabba uchun eng yaxshisi.',
    origin: 'Zarafshon viloyati',
    rating: 4.9,
    reviews: 108,
    popular: true,
    stock: 44
  }),
  make({
    id: 'orik-kurma',
    name: 'O\'rik "Kurma" (quritilgan)',
    category: 'orik',
    image: 'orik-2',
    price: 42000,
    unit: UNITS.KG,
    description: 'Tabiiy usulda quritilgan, qalin va shirin o\'rik. Uzoq saqlanadi.',
    origin: 'Samarqand viloyati',
    rating: 4.8,
    reviews: 64,
    stock: 38
  }),
  make({
    id: 'orik-kompot',
    name: 'O\'rik "Kompot uchun"',
    category: 'orik',
    image: 'orik-3',
    price: 28000,
    unit: UNITS.KG,
    description: 'Biroz nordon, qattiqroq o\'rik. Kompot va murabba tayyorlash uchun.',
    origin: 'O\'zbekiston',
    rating: 4.4,
    reviews: 29,
    isNew: true,
    stock: 50
  }),

  /* ------------------------------- GILOS ------------------------------- */
  make({
    id: 'gilos-shirin-qizil',
    name: 'Gilos (shirin, qizil)',
    category: 'gilos',
    image: 'gilos-1',
    price: 46000,
    oldPrice: 52000,
    unit: UNITS.KG,
    description: 'Yorqin qizil, shirin va suvli gilos. Yoz faslining eng qimmat va mazali mevasi.',
    origin: 'Navoiy viloyati',
    rating: 4.9,
    reviews: 76,
    popular: true,
    stock: 30
  }),
  make({
    id: 'gilos-qora-achchiq',
    name: 'Gilos (qora, achchiq)',
    category: 'gilos',
    image: 'gilos-2',
    price: 54000,
    unit: UNITS.KG,
    description: 'To\'q rangli, achchiq va qattiqroq gilos. Sharbat uchun eng to\'g\'ri navi.',
    origin: 'Navoiy viloyati',
    rating: 4.8,
    reviews: 34,
    stock: 24
  }),
  make({
    id: 'gilos-mayin',
    name: 'Gilos (mayin, 500 g)',
    category: 'gilos',
    image: 'gilos-3',
    price: 58000,
    unit: UNITS.G500,
    description: 'Yaxshi saralangan mayin gilos. Muzlatib, smoothie uchun saqlash mumkin.',
    origin: 'O\'zbekiston',
    rating: 4.7,
    reviews: 27,
    isNew: true,
    stock: 18
  }),

  /* ------------------------------ QULUPNAY ----------------------------- */
  make({
    id: 'qulupnay-mayin',
    name: 'Qulupnay (mayin, 500 g)',
    category: 'qulupnay',
    image: 'qulupnay-1',
    price: 68000,
    oldPrice: 78000,
    unit: UNITS.G500,
    description: 'Xushbo\'y, shirin va mayin qulupnay. Muzlatib, keyin ham yeyish mumkin.',
    origin: 'O\'zbekiston (import)', rating: 4.9,
    reviews: 88,
    popular: true,
    stock: 25
  }),
  make({
    id: 'qulupnay-mahalliy',
    name: 'Qulupnay (mahalliy, yirik)',
    category: 'qulupnay',
    image: 'qulupnay-2',
    price: 55000,
    unit: UNITS.KG,
    description: 'Yirik va shirin mahalliy qulupnay. Mavsumda eng ko\'p tarqaladigan navi.',
    origin: 'Samarqand viloyati',
    rating: 4.7,
    reviews: 51,
    stock: 28
  }),
  make({
    id: 'qulupnay-muzlatilgan',
    name: 'Qulupnay (muzlatilgan)',
    category: 'qulupnay',
    image: 'qulupnay-3',
    price: 72000,
    unit: UNITS.KG,
    description: 'Tez muzlatilgan qulupnay — smoothie va qatlama uchun qulay.',
    origin: 'Import',
    rating: 4.8,
    reviews: 26,
    isNew: true,
    stock: 16
  }),

  /* ------------------------------- TARVUZ ------------------------------ */
  make({
    id: 'tarvuz-chirsiz',
    name: 'Tarvuz (chirsiz, sariq-qizil)',
    category: 'tarvuz',
    image: 'tarvuz-1',
    price: 9000,
    oldPrice: 11000,
    unit: UNITS.KG,
    description: 'Shirin, chirsiz va qizil ichkisi tarvuz. Yozgi menyular uchun asosiy savdo.',
    origin: 'Navoiy viloyati',
    rating: 4.5,
    reviews: 95,
    stock: 120
  }),
  make({
    id: 'tarvuz-bolaklari',
    name: 'Tarvuz bo\'laklari',
    category: 'tarvuz',
    image: 'tarvuz-qirqim-1',
    price: 12000,
    unit: UNITS.KG,
    description: 'Oldindan to\'g\'ralgan tarvuz bo\'laklari. Uy sharoitida qulay.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 42,
    stock: 60
  }),
  make({
    id: 'tarvuz-yalpiq',
    name: 'Tarvuz (yalpiq, qora-qizil)',
    category: 'tarvuz',
    image: 'tarvuz-2',
    price: 11500,
    unit: UNITS.KG,
    description: 'Qalin, qora-qizil ichkili va juda shirin tarvuz. Shirinlik sevuvchilar uchun.',
    origin: 'Buxoro viloyati',
    rating: 4.7,
    reviews: 33,
    isNew: true,
    stock: 70
  }),

  /* -------------------------------- QOVUN ------------------------------ */
  make({
    id: 'qovun-oq',
    name: 'Qovun "Oq" (kassava)',
    category: 'qovun',
    image: 'qovun-1',
    price: 10000,
    oldPrice: 12500,
    unit: UNITS.KG,
    description: 'Oq, shirin va juda ko\'p suvli qovun. Issiq kunlari uchun eng yaxshisi.',
    origin: 'Jizzax viloyati',
    rating: 4.4,
    reviews: 61,
    stock: 90
  }),
  make({
    id: 'qovun-qizil',
    name: 'Qovun "Qizil" (muskatli)',
    category: 'qovun',
    image: 'qovun-2',
    price: 15000,
    unit: UNITS.KG,
    description: 'Muskatli, qizil ichkili va ayniqsa shirin qovun. Narxi ham, ta\'mi ham baland.',
    origin: 'O\'zbekiston',
    rating: 4.8,
    reviews: 44,
    stock: 55
  }),
  make({
    id: 'qovun-bolaklari',
    name: 'Qovun bo\'laklari',
    category: 'qovun',
    image: 'qovun-qirqim-1',
    price: 18000,
    unit: UNITS.KG,
    description: 'To\'g\'ralib berilgan shirin qovun bo\'laklari — sovuqda yeyish uchun.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 25,
    isNew: true,
    stock: 40
  }),

  /* -------------------------------- MANGO ------------------------------ */
  make({
    id: 'mango-hindiston',
    name: 'Mango (Hindiston)',
    category: 'mango',
    image: 'mango-1',
    price: 45000,
    oldPrice: 52000,
    unit: UNITS.KG,
    description: 'Juda shirin, yumshoq va xushbo\'y mango. Tropik mevalar ichida eng mashhuri.',
    origin: 'Hindiston',
    rating: 4.7,
    reviews: 68,
    popular: true,
    stock: 32
  }),
  make({
    id: 'mango-filippin',
    name: 'Mango (Filippin)',
    category: 'mango',
    image: 'mango-2',
    price: 38000,
    unit: UNITS.KG,
    description: 'Biroz nordon va qattiqroq mango. Uzoq muddat saqlashga qulay.',
    origin: 'Filippin',
    rating: 4.5,
    reviews: 41,
    stock: 36
  }),
  make({
    id: 'mango-bolaklari',
    name: 'Mango bo\'laklari',
    category: 'mango',
    image: 'mango-3',
    price: 49000,
    unit: UNITS.KG,
    description: 'To\'g\'ralgan shirin mango — smoothie va salat uchun tayyor.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 19,
    isNew: true,
    stock: 22
  }),

  /* -------------------------------- KIVI ------------------------------- */
  make({
    id: 'kivi-yangi-zelandiya',
    name: 'Kivi (Yangi Zelandiya)',
    category: 'kivi',
    image: 'kivi-1',
    price: 39000,
    oldPrice: 44000,
    unit: UNITS.KG,
    description: 'Yangi Zelandiya kivisi — nordon, vitaminli va qobiqli. Sharbat uchun ham ajoyib.',
    origin: 'Yangi Zelandiya',
    rating: 4.8,
    reviews: 79,
    popular: true,
    stock: 45
  }),
  make({
    id: 'kivi-ekvador',
    name: 'Kivi (Ekvador)',
    category: 'kivi',
    image: 'kivi-2',
    price: 35000,
    unit: UNITS.KG,
    description: 'Yumshoq va suvli kivi. Narxi o\'rtacha — har kuni yeyish uchun qulay.',
    origin: 'Ekvador',
    rating: 4.6,
    reviews: 55,
    stock: 50
  }),
  make({
    id: 'kivi-smoothie',
    name: 'Kivi smoothie to\'plami (500 g)',
    category: 'kivi',
    image: 'kivi-3',
    price: 42000,
    unit: UNITS.G500,
    description: 'Smoothie uchun to\'ldirilgan kivi. Muzlatib, sharbat qilish mumkin.',
    origin: 'Import',
    rating: 4.7,
    reviews: 24,
    isNew: true,
    stock: 28
  }),

  /* -------------------------------- LIMON ------------------------------ */
  make({
    id: 'limon-togri',
    name: 'Limon (Tog\'ri navi)',
    category: 'limon',
    image: 'limon-1',
    price: 17000,
    oldPrice: 20000,
    unit: UNITS.KG,
    description: 'Sho\'r, nordon va sharbat uchun qulay limon. Choy qo\'shish uchun ham.',
    origin: 'O\'zbekiston',
    rating: 4.5,
    reviews: 64,
    stock: 70
  }),
  make({
    id: 'limon-katta',
    name: 'Limon (katta, sharbati)',
    category: 'limon',
    image: 'limon-2',
    price: 22000,
    unit: UNITS.KG,
    description: 'Katta va ko\'p suvli limon. Uy sharbati tayyorlash uchun eng to\'g\'risi.',
    origin: 'Farg\'ona viloyati',
    rating: 4.6,
    reviews: 38,
    stock: 52
  }),
  make({
    id: 'limon-sharbati-doy',
    name: 'Limon sharbati (to\'ldirilgan)',
    category: 'limon',
    image: 'limon-3',
    price: 9000,
    unit: UNITS.LITR,
    description: 'Tayyor sharbat — sovuqda bir zumda tayyor bo\'ladi. Xotirajamlik uchun qulay.',
    origin: 'O\'zbekiston',
    rating: 4.4,
    reviews: 31,
    isNew: true,
    stock: 60
  }),

  /* ------------------------------ KARTOSHKA ---------------------------- */
  make({
    id: 'kartoshka-yangi',
    name: 'Kartoshka (yangi)',
    category: 'kartoshka',
    image: 'kartoshka-1',
    price: 7500,
    oldPrice: 9000,
    unit: UNITS.KG,
    description: 'Yangi va qarsildoq kartoshka. Pishirish, qovurish — har qanday taomga mos.',
    origin: 'Toshkent viloyati',
    rating: 4.3,
    reviews: 102,
    stock: 140
  }),
  make({
    id: 'kartoshka-qizil',
    name: 'Kartoshka "Red" (qizil)',
    category: 'kartoshka',
    image: 'kartoshka-2',
    price: 12000,
    unit: UNITS.KG,
    description: 'Qizil qobiqli, shirinroq kartoshka. Pishirilgan holda juda mazali.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 48,
    stock: 80
  }),
  make({
    id: 'kartoshka-maydalangan',
    name: 'Kartoshka (maydalangan, to\'g\'ralgan)',
    category: 'kartoshka',
    image: 'kartoshka-3',
    price: 15000,
    unit: UNITS.KG,
    description: 'To\'g\'ralgan kartoshka — pishirishga tayyor. Vaqt tejiladi.',
    origin: 'O\'zbekiston',
    rating: 4.4,
    reviews: 21,
    isNew: true,
    stock: 45
  }),

  /* -------------------------------- PIYOZ ------------------------------ */
  make({
    id: 'piyoz-sariq',
    name: 'Piyoz (sariq)',
    category: 'piyoz',
    image: 'piyoz-1',
    price: 5500,
    oldPrice: 6500,
    unit: UNITS.KG,
    description: 'Yumshoq, shirin va suvli piyoz. Kasha va sho\'rta uchun asosiy mahsulot.',
    origin: 'Toshkent viloyati',
    rating: 4.2,
    reviews: 88,
    stock: 160
  }),
  make({
    id: 'piyoz-qizil',
    name: 'Piyoz (qizil)',
    category: 'piyoz',
    image: 'piyoz-2',
    price: 8000,
    unit: UNITS.KG,
    description: 'Qizil piyoz — ta\'mi yanada quyuq, salat va bo\'laklarda ishlatiladi.',
    origin: 'Samarqand viloyati',
    rating: 4.5,
    reviews: 57,
    stock: 110
  }),
  make({
    id: 'piyoz-yashil',
    name: 'Piyoz (yashil, ko\'kat piyoz)',
    category: 'piyoz',
    image: 'piyoz-3',
    price: 9500,
    unit: UNITS.KG,
    description: 'Yashil piyoz — ta\'m o\'tkir, ko\'katlar uchun va salatga qo\'shish uchun.',
    origin: 'O\'zbekiston',
    rating: 4.7,
    reviews: 26,
    isNew: true,
    stock: 70
  }),

  /* -------------------------------- SABZI ------------------------------ */
  make({
    id: 'sabzi-karangi',
    name: 'Sabzi (karangi)',
    category: 'sabzi',
    image: 'sabzi-1',
    price: 6000,
    oldPrice: 7500,
    unit: UNITS.KG,
    description: 'Karangi, shirin sabzi. Suyuq, sho\'rta va turli taomlarda ishlatiladi.',
    origin: 'Toshkent viloyati',
    rating: 4.3,
    reviews: 73,
    stock: 130
  }),
  make({
    id: 'sabzi-sariq',
    name: 'Sabzi (sariq, kashni)',
    category: 'sabzi',
    image: 'sabzi-2',
    price: 6500,
    unit: UNITS.KG,
    description: 'Sariq va shirin sabzi. Porevo va kotlet uchun ajoyib.',
    origin: 'O\'zbekiston',
    rating: 4.4,
    reviews: 44,
    stock: 100
  }),
  make({
    id: 'sabzi-aralash',
    name: 'Sabzi (aralash, kotlet uchun)',
    category: 'sabzi',
    image: 'sabzi-3',
    price: 8500,
    unit: UNITS.KG,
    description: 'Tayyor aralash sabzi — kotle tayyorlash uchun qulay.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 19,
    isNew: true,
    stock: 60
  }),

  /* ------------------------------- POMIDOR ----------------------------- */
  make({
    id: 'pomidor-uzumchat',
    name: 'Pomidor (uzumchat)',
    category: 'pomidor',
    image: 'pomidor-1',
    price: 13000,
    oldPrice: 15500,
    unit: UNITS.KG,
    description: 'Yorqin, shirin va suvli uzumchat pomidor. Salat uchun eng to\'g\'risi.',
    origin: 'Toshkent viloyati',
    rating: 4.6,
    reviews: 118,
    popular: true,
    stock: 125
  }),
  make({
    id: 'pomidor-dollma',
    name: 'Pomidor (dollma uchun, katta)',
    category: 'pomidor',
    image: 'pomidor-2',
    price: 15000,
    unit: UNITS.KG,
    description: 'Katta va go\'shtli pomidor — dollma va sous uchun.',
    origin: 'O\'zbekiston',
    rating: 4.7,
    reviews: 66,
    stock: 90
  }),
  make({
    id: 'pomidor-cherry-quti',
    name: 'Pomidor "Cherry" (250 g quti)',
    category: 'pomidor',
    image: 'pomidor-3',
    price: 22000,
    unit: UNITS.QUTI,
    description: 'Kichik, juda shirin cherry pomidorlar. Salat va bo\'shqa ovqatlarga qo\'shiladi.',
    origin: 'O\'zbekiston (import)',
    rating: 4.8,
    reviews: 42,
    isNew: true,
    stock: 55
  }),

  /* ------------------------------- BODRING ----------------------------- */
  make({
    id: 'bodring-uzun-mayin',
    name: 'Bodring (uzun mayin)',
    category: 'bodring',
    image: 'bodring-1',
    price: 11000,
    oldPrice: 13000,
    unit: UNITS.KG,
    description: 'Uzun, mayin va qarsildoq bodring. Salatga kesish uchun qulay.',
    origin: 'Toshkent viloyati',
    rating: 4.4,
    reviews: 79,
    stock: 120
  }),
  make({
    id: 'bodring-qalampir',
    name: 'Bodring (qalampir tipidagi)',
    category: 'bodring',
    image: 'bodring-2',
    price: 16000,
    unit: UNITS.KG,
    description: 'Qisqa va to\'langan, terisi qalinroq bodring. Qovurish uchun ham ajoyib.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 35,
    stock: 75
  }),
  make({
    id: 'bodring-turshi',
    name: 'Bodring (turshi uchun)',
    category: 'bodring',
    image: 'bodring-3',
    price: 19000,
    unit: UNITS.KG,
    description: 'Kichik, qarsildoq va suvli bodring — turshi qilish uchun ajoyib.',
    origin: 'O\'zbekiston',
    rating: 4.5,
    reviews: 23,
    isNew: true,
    stock: 60
  }),

  /* ---------------------------- QALAMPIRI ------------------------------ */
  make({
    id: 'qalampiri-qizil',
    name: 'Bulg\'or qalampiri (qizil)',
    category: 'qalampiri',
    image: 'qalampiri-1',
    price: 18000,
    oldPrice: 21000,
    unit: UNITS.KG,
    description: 'Qizil, go\'shtli va shirin qalampiri. Salat va qovurish uchun.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 61,
    stock: 85
  }),
  make({
    id: 'qalampiri-sariq',
    name: 'Bulg\'or qalampiri (sariq)',
    category: 'qalampiri',
    image: 'qalampiri-2',
    price: 19500,
    unit: UNITS.KG,
    description: 'Sariq, xushbo\'y va shirin qalampiri. Bolalar uchun eng yoqadigan navi.',
    origin: 'O\'zbekiston',
    rating: 4.7,
    reviews: 47,
    stock: 80
  }),
  make({
    id: 'qalampiri-yashil',
    name: 'Bulg\'or qalampiri (yashil)',
    category: 'qalampiri',
    image: 'qalampiri-3',
    price: 17000,
    unit: UNITS.KG,
    description: 'Yashil, nordon va tabiiy qalampiri. Sharbat va salat uchun qulay.',
    origin: 'O\'zbekiston',
    rating: 4.5,
    reviews: 28,
    isNew: true,
    stock: 65
  }),

  /* ------------------------------- KARAM ------------------------------- */
  make({
    id: 'karam-oq',
    name: 'Karam (oq)',
    category: 'karam',
    image: 'karam-1',
    price: 9000,
    oldPrice: 10500,
    unit: UNITS.KG,
    description: 'Oq, yumshoq va shirin karam. Yoshurma va turli taomlarda ishlatiladi.',
    origin: 'Toshkent viloyati',
    rating: 4.3,
    reviews: 54,
    stock: 95
  }),
  make({
    id: 'karam-yashil',
    name: 'Karam (yashil, salat uchun)',
    category: 'karam',
    image: 'karam-2',
    price: 11000,
    unit: UNITS.KG,
    description: 'Yashil karam — salat uchun eng mos navi. Mayin va qarsildoq.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 39,
    stock: 70
  }),
  make({
    id: 'karam-qizil',
    name: 'Karam (qizil)',
    category: 'karam',
    image: 'karam-3',
    price: 13500,
    unit: UNITS.KG,
    description: 'Qizil, shirin va qattiqroq karam. Zotli taomlar uchun.',
    origin: 'O\'zbekiston',
    rating: 4.8,
    reviews: 18,
    isNew: true,
    stock: 50
  }),

  /* ------------------------------ BAQLAJON ----------------------------- */
  make({
    id: 'baqlajon-chokda',
    name: 'Baqlajon (cho\'kda)',
    category: 'baqlajon',
    image: 'baqlajon-1',
    price: 9500,
    oldPrice: 11500,
    unit: UNITS.KG,
    description: 'Cho\'kda pishgan, yumshoq ta\'mli baqlajon. Klassik ta’om uchun.',
    origin: 'Toshkent viloyati',
    rating: 4.4,
    reviews: 67,
    stock: 100
  }),
  make({
    id: 'baqlajon-dollma',
    name: 'Baqlajon (dollma uchun)',
    category: 'baqlajon',
    image: 'baqlajon-2',
    price: 12000,
    unit: UNITS.KG,
    description: 'Uzun va go\'shtli baqlajon — dollma uchun eng to\'g\'risi.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 41,
    stock: 75
  }),
  make({
    id: 'baqlajon-katta',
    name: 'Baqlajon (katta, oq-yashil)',
    category: 'baqlajon',
    image: 'baqlajon-3',
    price: 10500,
    unit: UNITS.KG,
    description: 'Katta va yengil nordon baqlajon. Pishirishda ko\'p suv chiqaradi.',
    origin: 'O\'zbekiston',
    rating: 4.3,
    reviews: 17,
    isNew: true,
    stock: 60
  }),

  /* ------------------------------ SARIMSOQ ----------------------------- */
  make({
    id: 'sarimsoq-yangi',
    name: 'Sarimsoq (yangi, 250 g bosh)',
    category: 'sarimsoq',
    image: 'sarimsoq-1',
    price: 6000,
    oldPrice: 7500,
    unit: UNITS.G250,
    description: 'Yangi, shirali sarimsoq boshlari. Xalq ta\'rifiga ko\'ra, eng foydali mahsulot.',
    origin: 'O\'zbekiston',
    rating: 4.8,
    reviews: 104,
    popular: true,
    stock: 130
  }),
  make({
    id: 'sarimsoq-quruq',
    name: 'Sarimsoq (quruq, maydalangan)',
    category: 'sarimsoq',
    image: 'sarimsoq-2',
    price: 11000,
    unit: UNITS.G250,
    description: 'Maydalangan quruq sarimsoq — qalampir va sousga qo\'shish uchun qulay.',
    origin: 'O\'zbekiston',
    rating: 4.7,
    reviews: 36,
    stock: 70
  }),
  make({
    id: 'sarimsoq-sharbati',
    name: 'Sarimsoq (sharbati, 500 g)',
    category: 'sarimsoq',
    image: 'sarimsoq-3',
    price: 13000,
    unit: UNITS.G500,
    description: 'Tayyor sarimsoq sharbati. Isitilgan ovqatga qo\'shish uchun qulay.',
    origin: 'O\'zbekiston',
    rating: 4.9,
    reviews: 22,
    isNew: true,
    stock: 55
  }),

  /* ------------------------------- LAVLAGI ----------------------------- */
  make({
    id: 'lavlagi-qizil',
    name: 'Lavlagi (qizil)',
    category: 'lavlagi',
    image: 'lavlagi-1',
    price: 10000,
    oldPrice: 12000,
    unit: UNITS.KG,
    description: 'Qizil, achchiq va qarsildoq lavlagi. Salat uchun ajoyib.',
    origin: 'Toshkent viloyati',
    rating: 4.4,
    reviews: 48,
    stock: 85
  }),
  make({
    id: 'lavlagi-oq',
    name: 'Lavlagi "Daikon" (oq)',
    category: 'lavlagi',
    image: 'lavlagi-2',
    price: 11500,
    unit: UNITS.KG,
    description: 'Oq, yumshoq va yengil achchiq lavlagi. Yangi lahzada tanlov.',
    origin: 'O\'zbekiston',
    rating: 4.5,
    reviews: 27,
    stock: 70
  }),
  make({
    id: 'lavlagi-kokatlari',
    name: 'Lavlagi ko\'katlari (1 dona)',
    category: 'lavlagi',
    image: 'lavlagi-3',
    price: 7000,
    unit: UNITS.DONA,
    description: 'Yangi lavlagi ildizi va ko\'katlari bilan. To\'g\'ralib ishlatish uchun.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 15,
    isNew: true,
    stock: 60
  }),

  /* ------------------------------- KOKATLAR ---------------------------- */
  make({
    id: 'kokatlar-salat-mix',
    name: 'Ko\'katlar (salat aralashmasi, 250 g)',
    category: 'kokatlar',
    image: 'kokatlar-1',
    price: 9000,
    oldPrice: 10500,
    unit: UNITS.G250,
    description: 'Rayhon, shpinat va salat ko\'katlaridan tayyor aralashm. To\'g\'ralish shart emas.',
    origin: 'O\'zbekiston',
    rating: 4.7,
    reviews: 69,
    popular: true,
    stock: 90
  }),
  make({
    id: 'kokatlar-rayhon',
    name: 'Ko\'katlar (rayhon, ko\'k, 1 dona)',
    category: 'kokatlar',
    image: 'kokatlar-2',
    price: 8000,
    unit: UNITS.DONA,
    description: 'Yangi, xushbo\'y rayhon. Osh va sho\'rta uchun muhim.',
    origin: 'O\'zbekiston',
    rating: 4.8,
    reviews: 51,
    stock: 80
  }),
  make({
    id: 'kokatlar-shpinat',
    name: 'Ko\'katlar (shpinat, 250 g)',
    category: 'kokatlar',
    image: 'kokatlar-3',
    price: 11000,
    unit: UNITS.G250,
    description: 'Yumshoq shpinat — smoothie va issiq taomlar uchun ajoyib.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 24,
    isNew: true,
    stock: 60
  }),

  /* ---------------------------- QURUQ MEVALAR -------------------------- */
  make({
    id: 'quruq-meva-aralash',
    name: 'Quruq mevalar (aralash to\'plam, 500 g)',
    category: 'quruq-meva',
    image: 'quruq-meva-1',
    price: 48000,
    oldPrice: 55000,
    unit: UNITS.G500,
    description: 'Mevalar, yong\'oqlar va mayiz aralashmasi — choy bilan uchish uchun tayyor.',
    origin: 'O\'zbekiston',
    rating: 4.7,
    reviews: 58,
    popular: true,
    stock: 70
  }),
  make({
    id: 'quruq-meva-sukuk',
    name: 'Quruq meva (sukuk yong\'oqli, 500 g)',
    category: 'quruq-meva',
    image: 'quruq-meva-2',
    price: 52000,
    unit: UNITS.G500,
    description: 'Sukuk, mayin va shirin quruq meva to\'plami. Har yil yangi yig\'im.',
    origin: 'Samarqand viloyati',
    rating: 4.6,
    reviews: 31,
    stock: 55
  }),
  make({
    id: 'quruq-meva-energiya',
    name: 'Quruq meva (energiya to\'plami, 500 g)',
    category: 'quruq-meva',
    image: 'quruq-meva-3',
    price: 56000,
    unit: UNITS.G500,
    description: 'Sport va faol hayot uchun energiya beruvchi quruq meva aralashmasi.',
    origin: 'O\'zbekiston',
    rating: 4.8,
    reviews: 20,
    isNew: true,
    stock: 45
  }),

  /* ------------------------------ YONG'OQLAR --------------------------- */
  make({
    id: 'yong-oqlar-premium',
    name: 'Yong\'oqlar (premium aralash, 500 g)',
    category: 'yong-oqlar',
    image: 'yong-oqlar-1',
    price: 72000,
    oldPrice: 82000,
    unit: UNITS.G500,
    description: 'Badam, pista, yong\'oq va kasrat aralashmasi. Saralangan va toza.',
    origin: 'O\'zbekiston (import)',
    rating: 4.9,
    reviews: 74,
    popular: true,
    stock: 60
  }),
  make({
    id: 'yong-oqlar-kalabriya',
    name: 'Yong\'oqlar (Kalabriya, 500 g)',
    category: 'yong-oqlar',
    image: 'yong-oqlar-2',
    price: 68000,
    unit: UNITS.G500,
    description: 'Yorqin va yengil yong\'oq — menyu uchun ideal. Tabiiy namligi saqlangan.',
    origin: 'Kalabriya (import)',
    rating: 4.8,
    reviews: 36,
    stock: 50
  }),
  make({
    id: 'yong-oqlar-kantli',
    name: 'Yong\'oqlar (kantli, 500 g)',
    category: 'yong-oqlar',
    image: 'yong-oqlar-3',
    price: 75000,
    unit: UNITS.G500,
    description: 'Tuz va zira qo\'shilgan yong\'oqlar. To\'g\'ridan-to\'g\'ri yeyishga tayyor.',
    origin: 'O\'zbekiston',
    rating: 4.7,
    reviews: 22,
    isNew: true,
    stock: 48
  }),

  /* ------------------------------- YONG'OQ ----------------------------- */
  make({
    id: 'yongoq-parish',
    name: 'Yong\'oq (parish, 500 g)',
    category: 'yong-oq',
    image: 'yongoq-1',
    price: 58000,
    oldPrice: 65000,
    unit: UNITS.G500,
    description: 'Yorqin yong\'oq donlari — quyuq va shirin. To\'g\'ridan-to\'g\'ri yeyish uchun.',
    origin: 'O\'zbekiston',
    rating: 4.8,
    reviews: 63,
    popular: true,
    stock: 65
  }),
  make({
    id: 'yongoq-qora',
    name: 'Yong\'oq (qora, 500 g)',
    category: 'yong-oq',
    image: 'yongoq-2',
    price: 62000,
    unit: UNITS.G500,
    description: 'To\'q rangli, quyuq va to\'yimli yong\'oq. Sharbat va ta\'mi kuchli.',
    origin: 'Farg\'ona viloyati',
    rating: 4.7,
    reviews: 29,
    stock: 55
  }),
  make({
    id: 'yongoq-qirmizi',
    name: 'Yong\'oq (qirmizi, 500 g)',
    category: 'yong-oq',
    image: 'yongoq-3',
    price: 66000,
    unit: UNITS.G500,
    description: 'Qirmizi yong\'oq — eng mashhur navi. Sho\'r va shirin muvozanatda.',
    origin: 'O\'zbekiston',
    rating: 4.8,
    reviews: 18,
    isNew: true,
    stock: 50
  }),

  /* ----------------------------- YERYONG'OQ ---------------------------- */
  make({
    id: 'yeryong-oq-qovurilgan',
    name: 'Yeryong\'oq (qovurilgan, 500 g)',
    category: 'yeryong-oq',
    image: 'yong-oqlar-2',
    price: 22000,
    oldPrice: 25000,
    unit: UNITS.G500,
    description: 'Qovurilgan, sho\'r va xushbo\'y yeryong\'oq. Ikkinchi ovqat uchun ajoyib.',
    origin: 'O\'zbekiston',
    rating: 4.5,
    reviews: 57,
    stock: 90
  }),
  make({
    id: 'yeryong-oq-tuzlangan',
    name: 'Yeryong\'oq (tuzlangan, qobiqli, 500 g)',
    category: 'yeryong-oq',
    image: 'yong-oqlar-3',
    price: 26000,
    unit: UNITS.G500,
    description: 'Qobiqli va tuzlangan yeryong\'oq. Sayohat uchun ham qulay.',
    origin: 'O\'zbekiston',
    rating: 4.4,
    reviews: 26,
    stock: 80
  }),
  make({
    id: 'yeryong-oq-shirin',
    name: 'Yeryong\'oq (shirin, qovurilgan, 500 g)',
    category: 'yeryong-oq',
    image: 'yong-oqlar-1',
    price: 28000,
    unit: UNITS.G500,
    description: 'Shirin va yumshoq qovurilgan yeryong\'oq. Bolalar uchun eng sevimlisi.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 20,
    isNew: true,
    stock: 75
  }),

  /* -------------------------- QURITILGAN O'RIK ------------------------- */
  make({
    id: 'quritilgan-orik-turli',
    name: 'Quritilgan o\'rik (turli nav, 500 g)',
    category: 'quritilgan-orik',
    image: 'quritilgan-orik-1',
    price: 44000,
    oldPrice: 49000,
    unit: UNITS.G500,
    description: 'Sariq va qizil o\'riklardan tayyor aralashm. Tabiiy quritilgan.',
    origin: 'Samarqand viloyati',
    rating: 4.8,
    reviews: 51,
    popular: true,
    stock: 70
  }),
  make({
    id: 'quritilgan-orik-katta',
    name: 'Quritilgan o\'rik (katta, sariq, 500 g)',
    category: 'quritilgan-orik',
    image: 'quritilgan-orik-2',
    price: 52000,
    unit: UNITS.G500,
    description: 'Yirik va quyuq o\'rik bo\'laklari. Kam suv bilan qovurilgan.',
    origin: 'O\'zbekiston',
    rating: 4.7,
    reviews: 28,
    stock: 60
  }),
  make({
    id: 'quritilgan-orik-sho-rti',
    name: 'Quritilgan o\'rik (sho\'rti, quyuq, 500 g)',
    category: 'quritilgan-orik',
    image: 'quritilgan-orik-3',
    price: 56000,
    unit: UNITS.G500,
    description: 'Quyuq, shirin va uzoq saqlanadigan o\'rik. Past shakar miqdori.',
    origin: 'O\'zbekiston',
    rating: 4.9,
    reviews: 16,
    isNew: true,
    stock: 52
  }),

  /* -------------------------------- MAYIZ ------------------------------ */
  make({
    id: 'mayiz-qora',
    name: 'Mayiz (qora kishmish, 500 g)',
    category: 'mayiz',
    image: 'mayiz-1',
    price: 34000,
    oldPrice: 38000,
    unit: UNITS.G500,
    description: 'To\'q rangli, mayin va nordon mayiz. Kompot va non uchun.',
    origin: 'O\'zbekiston',
    rating: 4.7,
    reviews: 46,
    stock: 80
  }),
  make({
    id: 'mayiz-yashil',
    name: 'Mayiz (yashil, mayin, 500 g)',
    category: 'mayiz',
    image: 'mayiz-2',
    price: 41000,
    unit: UNITS.G500,
    description: 'Yashil rangli mayin mayiz — nordon va o\'ziga xos ta\'m.',
    origin: 'Samarqand viloyati',
    rating: 4.8,
    reviews: 32,
    popular: true,
    stock: 60
  }),
  make({
    id: 'mayiz-oq-uzun',
    name: 'Mayiz (oq, uzun dona, 500 g)',
    category: 'mayiz',
    image: 'mayiz-3',
    price: 46000,
    unit: UNITS.G500,
    description: 'Uzun va oq rangli mayiz. Non va shirinlik uchun.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 19,
    isNew: true,
    stock: 55
  }),

  /* -------------------------------- XURMO ------------------------------ */
  make({
    id: 'xurmo-quruq-turli',
    name: 'Xurmo (quruq, turli, 500 g)',
    category: 'xurmo',
    image: 'xurmo-1',
    price: 36000,
    oldPrice: 41000,
    unit: UNITS.G500,
    description: 'Quruq va shirin xurmo. Choy, go\'shtli taomlar uchun ham qulay.',
    origin: 'O\'zbekiston',
    rating: 4.7,
    reviews: 44,
    stock: 70
  }),
  make({
    id: 'xurmo-yaponcha',
    name: 'Xurmo (yaponcha, qattiq, 500 g)',
    category: 'xurmo',
    image: 'xurmo-2',
    price: 48000,
    unit: UNITS.G500,
    description: 'Qattiq va shirin yaponcha xurmo. Uzoq muddat saqlanadi.',
    origin: 'O\'zbekiston (import)',
    rating: 4.8,
    reviews: 25,
    stock: 58
  }),
  make({
    id: 'xurmo-shirin-yumshoq',
    name: 'Xurmo (shirin, yumshoq, 1 kg)',
    category: 'xurmo',
    image: 'xurmo-3',
    price: 52000,
    unit: UNITS.KG,
    description: 'Yumshoq va juda shirin xurmo. Buni bir marta tatib ko\'rgan xaridor qaytadi.',
    origin: 'O\'zbekiston',
    rating: 4.9,
    reviews: 21,
    isNew: true,
    stock: 45
  }),

  /* -------------------------------- BODOM ------------------------------ */
  make({
    id: 'bodom-maydalangan',
    name: 'Bodom (oq, maydalangan, 500 g)',
    category: 'bodom',
    image: 'bodom-1',
    price: 78000,
    oldPrice: 88000,
    unit: UNITS.G500,
    description: 'Oq, maydalangan va shirin bodom. Non, shirinlik va salatlarga qo\'shiladi.',
    origin: 'O\'zbekiston (import)',
    rating: 4.9,
    reviews: 66,
    popular: true,
    stock: 50
  }),
  make({
    id: 'bodom-qizil',
    name: 'Bodom (qizil, yong\'oqli, 500 g)',
    category: 'bodom',
    image: 'bodom-2',
    price: 85000,
    unit: UNITS.G500,
    description: 'Qizil qobiqli bodom — xushbo\'y va qimmatroq, lekin ta\'mi boy.',
    origin: 'O\'zbekiston (import)',
    rating: 4.8,
    reviews: 27,
    stock: 42
  }),
  make({
    id: 'bodom-toldirilgan',
    name: 'Bodom (to\'ldirilgan, 500 g)',
    category: 'bodom',
    image: 'bodom-3',
    price: 96000,
    unit: UNITS.G500,
    description: 'To\'ldirilgan bodom — sovg\'a uchun ham, stolga qo\'yish uchun ham.',
    origin: 'O\'zbekiston',
    rating: 4.9,
    reviews: 15,
    isNew: true,
    stock: 35
  }),

  /* -------------------------------- PISTA ------------------------------ */
  make({
    id: 'pista-tuzlangan',
    name: 'Pista (tuzlangan, 500 g)',
    category: 'pista',
    image: 'pista-1',
    price: 92000,
    oldPrice: 102000,
    unit: UNITS.G500,
    description: 'Tuzlangan, yong\'oq ichidagi pista. Suffix bo\'yicha eng mashhur tanlov.',
    origin: 'O\'zbekiston (import)',
    rating: 4.9,
    reviews: 58,
    popular: true,
    stock: 45
  }),
  make({
    id: 'pista-tabiiy',
    name: 'Pista (tabiiy, tuzsiz, 500 g)',
    category: 'pista',
    image: 'pista-2',
    price: 98000,
    unit: UNITS.G500,
    description: 'Tuzsiz tabiiy pista — qo\'lda yig\'ilgan, toza va yoqimli.',
    origin: 'O\'zbekiston (import)',
    rating: 4.8,
    reviews: 23,
    stock: 40
  }),
  make({
    id: 'pista-qovurilgan',
    name: 'Pista (qovurilgan, qirqilgan, 500 g)',
    category: 'pista',
    image: 'pista-3',
    price: 105000,
    unit: UNITS.G500,
    description: 'Qovurilgan va qirqilgan pista — desert va ichimliklar uchun qulay.',
    origin: 'O\'zbekiston (import)',
    rating: 4.9,
    reviews: 12,
    isNew: true,
    stock: 32
  }),

  /* ------------------------------- SHARBAT ----------------------------- */
  make({
    id: 'sharbat-olma',
    name: 'Tabiiy sharbat — olma (100%, 1 litr)',
    category: 'sharbat',
    image: 'sharbat-1',
    price: 22000,
    oldPrice: 25000,
    unit: UNITS.LITR,
    description: 'Faqat olma sharbatidan, qo\'shimcha moddalarsiz. Sovuq holda ham, iliq holda ham.',
    origin: 'O\'zbekiston',
    rating: 4.7,
    reviews: 48,
    stock: 70
  }),
  make({
    id: 'sharbat-tort-meva',
    name: 'Tabiiy sharbat — to\'rtinchi meva (1 litr)',
    category: 'sharbat',
    image: 'sharbat-2',
    price: 28000,
    unit: UNITS.LITR,
    description: 'Olma, yong\'oq va boshqa mevalar aralashmasi. Boy va yumshoq ta\'m.',
    origin: 'O\'zbekiston',
    rating: 4.8,
    reviews: 36,
    popular: true,
    stock: 60
  }),
  make({
    id: 'sharbat-sabzavot',
    name: 'Tabiiy sharbat — sabzavot (1 litr)',
    category: 'sharbat',
    image: 'sharbat-3',
    price: 26000,
    unit: UNITS.LITR,
    description: 'Sabzavotlardan tayyorlangan toza sharbat. Organik taomlanish uchun.',
    origin: 'O\'zbekiston',
    rating: 4.5,
    reviews: 18,
    isNew: true,
    stock: 55
  }),

  /* -------------------------------- SALAT ------------------------------ */
  make({
    id: 'salat-mix-tayyor',
    name: 'Salat aralashmasi (tayyor, 250 g)',
    category: 'salat',
    image: 'salat-1',
    price: 24000,
    oldPrice: 27000,
    unit: UNITS.G250,
    description: 'Tayyor ko\'katlar aralashmasi. To\'g\'ralish va yuvish shart emas.',
    origin: 'O\'zbekiston',
    rating: 4.7,
    reviews: 43,
    popular: true,
    stock: 65
  }),
  make({
    id: 'salat-pomidor-bodring',
    name: 'Salat — pomidor va bodring (250 g)',
    category: 'salat',
    image: 'salat-2',
    price: 18000,
    unit: UNITS.G250,
    description: 'To\'g\'ralgan pomidor va bodring. Zaytun moyi bilan yeyish uchun.',
    origin: 'O\'zbekiston',
    rating: 4.6,
    reviews: 29,
    stock: 75
  }),
  make({
    id: 'salat-garnir',
    name: 'Salat garniri — pomidor va piyoz (250 g)',
    category: 'salat',
    image: 'salat-3',
    price: 15500,
    unit: UNITS.G250,
    description: 'Tayyor garnir — ishlab chiqarish vaqtini tejaydi.',
    origin: 'O\'zbekistan',
    rating: 4.5,
    reviews: 17,
    isNew: true,
    stock: 80
  })
]

export const productsById = products.reduce((acc, product) => {
  acc[product.id] = product
  return acc
}, {})

export const getProductById = (id) => productsById[id] || null

export const getProductsByCategory = (categorySlug) =>
  products.filter((product) => product.category === categorySlug)

export const getDiscountedProducts = () => products.filter((product) => product.discount > 0)

export const getPopularProducts = () => products.filter((product) => product.popular)

export const getNewProducts = () => products.filter((product) => product.isNew)

export const getSeasonalProducts = () =>
  products.filter((product) =>
    ['tarvuz', 'qovun', 'shaftoli', 'orik', 'gilos', 'qulupnay', 'mango', 'kivi'].includes(product.category)
  )

export const getRelatedProducts = (product, limit = 4) =>
  products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, limit)

export const PRICE_RANGE = (() => {
  const prices = products.map((product) => product.price)
  return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) }
})()
