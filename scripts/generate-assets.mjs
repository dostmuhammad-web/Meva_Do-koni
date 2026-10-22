/**
 * MEVA CHEVA MARKET — mahsulot rasmlari generatori.
 *
 * Har bir mahsulot turi uchun 3 xil variantda chiroyli SVG illyustratsiya yaratadi
 * (masalan olma-1, olma-2, olma-3). Rasmlar 400x400 px, shaffof fonli.
 *
 * Ishga tushirish:  npm run generate:assets
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'src', 'assets', 'images')
mkdirSync(OUT_DIR, { recursive: true })

/* ------------------------------------------------------------------ */
/*  Yordamchi funksiyalar                                              */
/* ------------------------------------------------------------------ */

const radial = (id, stops, cx = 0.34, cy = 0.26, r = 0.9) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops
    .map(
      ([o, c, a]) =>
        `<stop offset="${o}" stop-color="${c}"${a !== undefined ? ` stop-opacity="${a}"` : ''}/>`
    )
    .join('')}</radialGradient>`

const linear = (id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops
    .map(
      ([o, c, a]) =>
        `<stop offset="${o}" stop-color="${c}"${a !== undefined ? ` stop-opacity="${a}"` : ''}/>`
    )
    .join('')}</linearGradient>`

const softShadow = (cx = 200, cy = 344, rx = 104, ry = 17) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#0f172a" opacity="0.09"/>`

const LEAF_DEFS = `<linearGradient id="leafG" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#63b967"/><stop offset="1" stop-color="#1d7a3c"/>
  </linearGradient>`

const leaf = (x, y, rot, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <path d="M0 0 C 32 -28 88 -24 112 4 C 82 34 28 30 0 0 Z" fill="url(#leafG)"/>
    <path d="M8 2 C 44 2 82 4 106 6" stroke="#14532d" stroke-opacity="0.38" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>`

const stem = (x, y, h = 46, w = 9, color = '#7a4a22') =>
  `<path d="M${x} ${y} C ${x - 4} ${y - h / 2} ${x + 5} ${y - h * 0.7} ${x + 2} ${y - h}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`

const highlight = (cx, cy, rx, ry, rot = -25, o = 0.3) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="#ffffff" opacity="${o}"/>`

const svgDoc = (defs, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400" role="img" fill="none">
  <defs>${defs}</defs>
  ${body}
</svg>
`

/* ------------------------------------------------------------------ */
/*  Mahsulot turlari chizish funksiyalari                               */
/* ------------------------------------------------------------------ */

const TYPES = {
  olma: {
    palettes: [
      ['#ef4444', '#fca5a5', '#991b1b'],
      ['#84cc16', '#d9f99d', '#3f6212'],
      ['#f59e0b', '#fde68a', '#92400e']
    ],
    draw(p) {
      return `${softShadow(200, 338, 108, 18)}
  <path d="M200 128 C 162 92 96 100 78 168 C 62 232 116 328 200 332 C 284 328 338 232 322 168 C 304 100 238 92 200 128 Z" fill="url(#body)"/>
  <path d="M200 130 C 200 176 204 220 200 262" stroke="#000" stroke-opacity="0.08" stroke-width="5" fill="none" stroke-linecap="round"/>
  ${stem(200, 130, 52, 11)}
  ${leaf(206, 84, -18, 0.85)}
  ${highlight(142, 176, 32, 46, -30, 0.32)}
  <ellipse cx="258" cy="252" rx="46" ry="42" fill="${p[2]}" opacity="0.16"/>`
    }
  },

  banan: {
    palettes: [
      ['#fbbf24', '#fde68a', '#b45309'],
      ['#facc15', '#fef08a', '#a16207'],
      ['#eab308', '#fef9c3', '#854d0e']
    ],
    draw(p) {
      return `${softShadow(210, 340, 120, 16)}
  <path d="M96 128 C 84 216 142 300 232 300 C 288 300 326 280 338 252 C 314 268 284 274 254 262 C 190 236 154 188 156 124 C 136 112 108 112 96 128 Z" fill="url(#body)"/>
  <path d="M120 140 C 116 208 160 262 226 274" stroke="${p[2]}" stroke-opacity="0.28" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M138 132 C 134 196 172 242 232 258" stroke="#fff" stroke-opacity="0.35" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M96 128 C 90 116 98 104 112 100 L 118 116 Z" fill="${p[2]}"/>
  <path d="M330 258 C 340 252 346 244 344 236 C 334 240 326 248 324 256 Z" fill="${p[2]}"/>`
    }
  },

  apelsin: {
    palettes: [
      ['#f97316', '#fed7aa', '#9a3412'],
      ['#fb923c', '#ffedd5', '#c2410c'],
      ['#ea580c', '#fdba74', '#7c2d12']
    ],
    draw(p) {
      const dots = []
      for (let i = 0; i < 26; i++) {
        const a = (i / 26) * Math.PI * 2
        const r = 34 + (i % 3) * 24
        dots.push(
          `<circle cx="${(200 + Math.cos(a) * r).toFixed(1)}" cy="${(202 + Math.sin(a) * r * 0.92).toFixed(1)}" r="2.4" fill="${p[2]}" opacity="0.2"/>`
        )
      }
      return `${softShadow(200, 336, 100, 17)}
  <circle cx="200" cy="206" r="106" fill="url(#body)"/>
  ${dots.join('')}
  <circle cx="200" cy="104" r="9" fill="${p[2]}" opacity="0.7"/>
  ${leaf(204, 100, -16, 0.7)}
  ${highlight(150, 156, 32, 42, -30, 0.34)}
  <ellipse cx="262" cy="252" rx="52" ry="46" fill="${p[2]}" opacity="0.14"/>`
    }
  },

  mandarin: {
    palettes: [
      ['#fb923c', '#fed7aa', '#c2410c'],
      ['#f59e0b', '#fde68a', '#b45309'],
      ['#fdba74', '#ffedd5', '#c2410c']
    ],
    draw(p) {
      return `${softShadow(200, 332, 96, 16)}
  <ellipse cx="200" cy="212" rx="104" ry="94" fill="url(#body)"/>
  <path d="M200 118 C 200 168 200 250 200 306" stroke="${p[2]}" stroke-opacity="0.2" stroke-width="4" fill="none"/>
  <path d="M132 150 C 168 178 168 240 136 274" stroke="${p[2]}" stroke-opacity="0.16" stroke-width="4" fill="none"/>
  <path d="M268 150 C 232 178 232 240 264 274" stroke="${p[2]}" stroke-opacity="0.16" stroke-width="4" fill="none"/>
  <ellipse cx="200" cy="122" rx="14" ry="10" fill="${p[2]}" opacity="0.55"/>
  ${leaf(212, 116, -14, 0.6)}
  ${highlight(154, 168, 28, 36, -30, 0.34)}`
    }
  },

  anor: {
    palettes: [
      ['#b91c1c', '#fca5a5', '#7f1d1d'],
      ['#dc2626', '#fecaca', '#7f1d1d'],
      ['#991b1b', '#f87171', '#450a0a']
    ],
    draw(p) {
      return `${softShadow(200, 336, 100, 17)}
  <path d="M170 108 L186 88 L214 88 L230 108 L218 122 L182 122 Z" fill="#7c4a21"/>
  <path d="M178 104 L196 100 L222 104" stroke="#4a2b12" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="200" cy="218" r="106" fill="url(#body)"/>
  <circle cx="164" cy="170" r="7" fill="#7f1d1d" opacity="0.55"/>
  <circle cx="238" cy="178" r="6" fill="#7f1d1d" opacity="0.45"/>
  <circle cx="210" cy="258" r="8" fill="#7f1d1d" opacity="0.4"/>
  ${highlight(148, 168, 30, 40, -30, 0.28)}
  <path d="M200 116 L200 130" stroke="#7c4a21" stroke-width="6" stroke-linecap="round"/>`
    }
  },

  uzum: {
    palettes: [
      ['#7c3aed', '#c4b5fd', '#4c1d95'],
      ['#6b21a8', '#a78bfa', '#3b0764'],
      ['#5b21b6', '#ddd6fe', '#2e1065']
    ],
    draw(p) {
      const grapes = []
      const rows = [1, 2, 3, 4, 3, 2]
      let y = 128
      rows.forEach((count, ri) => {
        for (let j = 0; j < count; j++) {
          const x = 200 + (j - (count - 1) / 2) * 46
          grapes.push(
            `<circle cx="${x}" cy="${y}" r="25" fill="url(#body)"/><circle cx="${(x - 7).toFixed(1)}" cy="${(y - 8).toFixed(1)}" r="7" fill="#fff" opacity="0.32"/>`
          )
        }
        y += 40
      })
      return `${softShadow(200, 340, 96, 16)}
  ${stem(200, 132, 40, 8, '#6b4423')}
  ${leaf(206, 96, -20, 0.7)}
  ${grapes.join('')}`
    }
  },

  nok: {
    palettes: [
      ['#84cc16', '#ecfccb', '#3f6212'],
      ['#eab308', '#fef9c3', '#854d0e'],
      ['#a3e635', '#f7fee7', '#3f6212']
    ],
    draw(p) {
      return `${softShadow(200, 340, 96, 16)}
  <path d="M200 86 C 170 86 158 122 158 152 C 158 180 130 198 118 240 C 102 296 138 340 200 340 C 262 340 298 296 282 240 C 270 198 242 180 242 152 C 242 122 230 86 200 86 Z" fill="url(#body)"/>
  ${stem(200, 90, 44, 9)}
  ${leaf(206, 52, -18, 0.62)}
  ${highlight(164, 246, 30, 44, -14, 0.3)}
  <ellipse cx="238" cy="272" rx="40" ry="34" fill="${p[2]}" opacity="0.14"/>`
    }
  },

  shaftoli: {
    palettes: [
      ['#f97316', '#fed7aa', '#9a3412'],
      ['#ef4444', '#fecaca', '#991b1b'],
      ['#fb923c', '#ffedd5', '#c2410c']
    ],
    draw(p) {
      return `${softShadow(200, 336, 100, 17)}
  <circle cx="200" cy="208" r="108" fill="url(#body)"/>
  <path d="M200 100 C 214 150 214 258 200 312" stroke="${p[2]}" stroke-opacity="0.3" stroke-width="6" fill="none" stroke-linecap="round"/>
  ${stem(200, 104, 40, 9)}
  ${leaf(206, 68, -18, 0.7)}
  ${highlight(150, 162, 32, 42, -30, 0.34)}`
    }
  },

  orik: {
    palettes: [
      ['#fb923c', '#ffedd5', '#c2410c'],
      ['#f59e0b', '#fef3c7', '#b45309'],
      ['#fdba74', '#fff7ed', '#9a3412']
    ],
    draw(p) {
      return `${softShadow(200, 330, 88, 15)}
  <circle cx="200" cy="210" r="96" fill="url(#body)"/>
  <path d="M200 116 C 210 166 210 252 200 302" stroke="${p[2]}" stroke-opacity="0.3" stroke-width="5" fill="none" stroke-linecap="round"/>
  ${stem(200, 118, 36, 8)}
  ${leaf(205, 88, -18, 0.58)}
  ${highlight(160, 170, 26, 34, -30, 0.34)}`
    }
  },

  gilos: {
    palettes: [
      ['#dc2626', '#fca5a5', '#7f1d1d'],
      ['#b91c1c', '#f87171', '#450a0a'],
      ['#ef4444', '#fecaca', '#991b1b']
    ],
    draw(p) {
      return `${softShadow(200, 340, 100, 16)}
  <path d="M156 250 C 170 170 190 130 200 108" stroke="#3f7d23" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M244 250 C 232 170 210 130 200 108" stroke="#3f7d23" stroke-width="7" fill="none" stroke-linecap="round"/>
  ${leaf(200, 108, -12, 0.62)}
  <circle cx="150" cy="266" r="62" fill="url(#body)"/>
  <circle cx="250" cy="266" r="62" fill="url(#body)"/>
  ${highlight(126, 238, 18, 24, -30, 0.4)}
  ${highlight(226, 238, 18, 24, -30, 0.4)}`
    }
  },

  qulupnay: {
    palettes: [
      ['#e11d48', '#fecdd3', '#881337'],
      ['#f43f5e', '#ffe4e6', '#9f1239'],
      ['#be123c', '#fecdd3', '#4c0519']
    ],
    draw(p) {
      const seeds = []
      const pts = [
        [160, 190],
        [200, 172],
        [240, 190],
        [140, 230],
        [180, 220],
        [220, 220],
        [260, 230],
        [158, 270],
        [200, 262],
        [242, 270],
        [182, 300],
        [218, 300]
      ]
      pts.forEach(([x, y]) => seeds.push(`<ellipse cx="${x}" cy="${y}" rx="4" ry="6" fill="#fde68a" opacity="0.9"/>`))
      return `${softShadow(200, 336, 84, 15)}
  <path d="M200 336 C 118 302 96 214 126 168 C 148 134 252 134 274 168 C 304 214 282 302 200 336 Z" fill="url(#body)"/>
  ${seeds.join('')}
  <path d="M160 148 L200 116 L240 148 L214 156 L200 140 L186 156 Z" fill="#2f9e44"/>
  ${stem(200, 140, 34, 8, '#2f6b28')}
  ${highlight(158, 200, 22, 32, -28, 0.3)}`
    }
  },

  tarvuz: {
    palettes: [
      ['#16a34a', '#bbf7d0', '#14532d'],
      ['#15803d', '#dcfce7', '#052e16'],
      ['#22c55e', '#d9f99d', '#166534']
    ],
    draw(p) {
      const stripes = []
      for (let i = -3; i <= 3; i++) {
        stripes.push(
          `<path d="M200 96 C ${200 + i * 30} 150 ${200 + i * 34} 250 ${200 + i * 22} 316" stroke="${p[2]}" stroke-opacity="0.55" stroke-width="12" fill="none" stroke-linecap="round"/>`
        )
      }
      return `${softShadow(200, 338, 100, 17)}
  <circle cx="200" cy="210" r="110" fill="url(#body)"/>
  ${stripes.join('')}
  <path d="M200 102 C 198 84 204 70 212 60" stroke="#4d7c0f" stroke-width="9" fill="none" stroke-linecap="round"/>
  ${highlight(146, 158, 30, 40, -30, 0.28)}`
    }
  },

  'tarvuz-qirqim': {
    palettes: [
      ['#e11d48', '#fecdd3', '#166534'],
      ['#dc2626', '#fca5a5', '#14532d'],
      ['#be123c', '#fecaca', '#052e16']
    ],
    draw(p) {
      const seeds = []
      const pts = [
        [170, 210],
        [200, 230],
        [230, 210],
        [185, 260],
        [215, 262]
      ]
      pts.forEach(([x, y]) => seeds.push(`<ellipse cx="${x}" cy="${y}" rx="6" ry="9" fill="#1c1917"/>`))
      return `${softShadow(200, 340, 120, 15)}
  <path d="M60 306 L340 306 L200 96 Z" fill="${p[2]}"/>
  <path d="M74 296 L326 296 L200 112 Z" fill="#f8fafc"/>
  <path d="M86 288 L314 288 L200 128 Z" fill="url(#body)"/>
  ${seeds.join('')}`
    }
  },

  qovun: {
    palettes: [
      ['#a3e635', '#ecfccb', '#4d7c0f'],
      ['#d9f99d', '#f7fee7', '#65a30d'],
      ['#bef264', '#f0fdf4', '#3f6212']
    ],
    draw(p) {
      const net = []
      for (let i = -3; i <= 3; i++) {
        net.push(
          `<path d="M${200 + i * 28} 104 C ${200 + i * 40} 170 ${200 + i * 40} 250 ${200 + i * 24} 314" stroke="${p[2]}" stroke-opacity="0.4" stroke-width="5" fill="none"/>`
        )
        net.push(
          `<path d="M96 158 C 160 176 240 176 304 158" stroke="${p[2]}" stroke-opacity="0.35" stroke-width="5" fill="none"/>`
        )
        net.push(
          `<path d="M90 214 C 156 234 244 234 310 214" stroke="${p[2]}" stroke-opacity="0.35" stroke-width="5" fill="none"/>`
        )
        net.push(
          `<path d="M96 268 C 160 288 240 288 304 268" stroke="${p[2]}" stroke-opacity="0.3" stroke-width="5" fill="none"/>`
        )
      }
      return `${softShadow(200, 336, 100, 17)}
  <ellipse cx="200" cy="210" rx="108" ry="100" fill="url(#body)"/>
  ${net.join('')}
  ${leaf(200, 108, -14, 0.55)}
  ${highlight(146, 158, 30, 38, -30, 0.3)}`
    }
  },

  'qovun-qirqim': {
    palettes: [
      ['#f59e0b', '#fde68a', '#166534'],
      ['#fbbf24', '#fef3c7', '#14532d'],
      ['#ea580c', '#fed7aa', '#052e16']
    ],
    draw(p) {
      const seeds = []
      const pts = [
        [172, 214],
        [204, 234],
        [232, 212],
        [190, 262],
        [222, 262]
      ]
      pts.forEach(([x, y]) => seeds.push(`<ellipse cx="${x}" cy="${y}" rx="5" ry="8" fill="#7c2d12"/>`))
      return `${softShadow(200, 340, 120, 15)}
  <path d="M60 306 L340 306 L200 96 Z" fill="${p[2]}"/>
  <path d="M74 296 L326 296 L200 112 Z" fill="#f8fafc"/>
  <path d="M86 288 L314 288 L200 128 Z" fill="url(#body)"/>
  ${seeds.join('')}`
    }
  },

  mango: {
    palettes: [
      ['#f59e0b', '#fde68a', '#b45309'],
      ['#eab308', '#fef9c3', '#a16207'],
      ['#fb923c', '#ffedd5', '#c2410c']
    ],
    draw(p) {
      return `${softShadow(204, 330, 100, 16)}
  <path d="M112 206 C 106 152 158 104 232 108 C 302 112 336 158 320 214 C 306 268 250 322 186 314 C 130 306 116 262 112 206 Z" fill="url(#body)"/>
  <path d="M118 200 C 140 160 190 140 240 142" stroke="${p[2]}" stroke-opacity="0.35" stroke-width="8" fill="none" stroke-linecap="round"/>
  ${stem(230, 110, 32, 8, '#6b4423')}
  ${leaf(236, 84, -14, 0.55)}
  ${highlight(158, 168, 30, 40, -30, 0.32)}`
    }
  },

  kivi: {
    palettes: [
      ['#65a30d', '#d9f99d', '#365314'],
      ['#84cc16', '#ecfccb', '#3f6212'],
      ['#4d7c0f', '#bef264', '#1a2e05']
    ],
    draw(p) {
      const seeds = []
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2
        seeds.push(
          `<ellipse cx="${(200 + Math.cos(a) * 46).toFixed(1)}" cy="${(214 + Math.sin(a) * 46).toFixed(1)}" rx="5" ry="8" transform="rotate(${(a * 180) / Math.PI} ${(200 + Math.cos(a) * 46).toFixed(1)} ${(214 + Math.sin(a) * 46).toFixed(1)})" fill="#1c1917"/>`
        )
      }
      return `${softShadow(200, 340, 100, 16)}
  <circle cx="200" cy="214" r="110" fill="#8a6033"/>
  <circle cx="200" cy="214" r="100" fill="#7a5230"/>
  <circle cx="200" cy="214" r="88" fill="url(#body)"/>
  <circle cx="200" cy="214" r="26" fill="#f7fdf0" opacity="0.9"/>
  ${seeds.join('')}
  ${highlight(154, 166, 24, 32, -30, 0.26)}`
    }
  },

  limon: {
    palettes: [
      ['#facc15', '#fef08a', '#a16207'],
      ['#fde047', '#fefce8', '#854d0e'],
      ['#eab308', '#fef9c3', '#713f12']
    ],
    draw(p) {
      return `${softShadow(200, 322, 108, 15)}
  <path d="M74 214 C 74 168 122 138 200 138 C 278 138 326 168 326 214 C 326 260 278 290 200 290 C 122 290 74 260 74 214 Z" fill="url(#body)"/>
  <path d="M74 214 C 58 210 46 202 42 194 C 44 222 56 240 74 246 Z" fill="${p[2]}"/>
  <path d="M326 214 C 342 210 354 202 358 194 C 356 222 344 240 326 246 Z" fill="${p[2]}"/>
  <ellipse cx="200" cy="214" rx="126" ry="76" fill="none" stroke="${p[2]}" stroke-opacity="0.18" stroke-width="4"/>
  ${highlight(150, 176, 34, 30, -12, 0.36)}`
    }
  },

  kartoshka: {
    palettes: [
      ['#c08a52', '#e7c9a3', '#8a5a2b'],
      ['#b07a45', '#dcc0a0', '#79501f'],
      ['#cd9a5f', '#efd5b0', '#94632f']
    ],
    draw(p) {
      const eyes = [
        [150, 220, 9],
        [232, 186, 7],
        [205, 262, 8],
        [268, 250, 6],
        [128, 268, 6]
      ]
      const speckles = []
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2
        const r = 40 + (i % 4) * 20
        speckles.push(
          `<circle cx="${(196 + Math.cos(a) * r).toFixed(1)}" cy="${(224 + Math.sin(a) * r * 0.85).toFixed(1)}" r="3" fill="${p[2]}" opacity="0.35"/>`
        )
      }
      return `${softShadow(200, 322, 112, 18)}
  <path d="M108 196 C 112 158 160 138 214 146 C 274 154 306 182 296 224 C 286 268 240 296 180 290 C 122 284 104 238 108 196 Z" fill="url(#body)"/>
  ${speckles.join('')}
  ${eyes
    .map(
      ([x, y, r]) =>
        `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${(r * 0.6).toFixed(1)}" fill="${p[2]}" opacity="0.6"/>`
    )
    .join('')}
  ${highlight(150, 190, 30, 26, -20, 0.28)}`
    }
  },

  piyoz: {
    palettes: [
      ['#d9a441', '#f6e3b8', '#8c6414'],
      ['#c07f4a', '#efd6b0', '#7a4a1e'],
      ['#e0b45a', '#f8eccb', '#95701c']
    ],
    draw(p) {
      return `${softShadow(200, 334, 100, 16)}
  <path d="M200 108 C 264 108 300 178 296 236 C 292 296 250 330 200 330 C 150 330 108 296 104 236 C 100 178 136 108 200 108 Z" fill="url(#body)"/>
  <path d="M164 116 C 150 176 148 254 166 324" stroke="${p[2]}" stroke-opacity="0.4" stroke-width="5" fill="none"/>
  <path d="M200 110 C 194 178 194 258 200 330" stroke="${p[2]}" stroke-opacity="0.4" stroke-width="5" fill="none"/>
  <path d="M236 116 C 250 176 252 254 234 324" stroke="${p[2]}" stroke-opacity="0.4" stroke-width="5" fill="none"/>
  <path d="M200 108 C 196 84 200 64 208 50" stroke="#4d7c0f" stroke-width="9" fill="none" stroke-linecap="round"/>
  ${leaf(210, 56, -20, 0.5)}
  ${highlight(154, 186, 26, 44, -10, 0.32)}`
    }
  },

  sabzi: {
    palettes: [
      ['#f97316', '#fed7aa', '#9a3412'],
      ['#ea580c', '#ffedd5', '#7c2d12'],
      ['#fb923c', '#ffedd5', '#c2410c']
    ],
    draw(p) {
      return `${softShadow(200, 342, 82, 14)}
  <path d="M148 126 L252 126 L206 340 C 202 350 192 348 190 338 Z" fill="url(#body)"/>
  <path d="M172 150 L168 320" stroke="${p[2]}" stroke-opacity="0.3" stroke-width="5" fill="none"/>
  <path d="M228 150 L232 320" stroke="${p[2]}" stroke-opacity="0.3" stroke-width="5" fill="none"/>
  <path d="M200 128 C 176 96 156 84 132 74" stroke="#3f7d23" stroke-width="11" fill="none" stroke-linecap="round"/>
  <path d="M200 128 C 200 90 204 68 210 52" stroke="#3f7d23" stroke-width="11" fill="none" stroke-linecap="round"/>
  <path d="M200 128 C 224 96 246 84 268 74" stroke="#3f7d23" stroke-width="11" fill="none" stroke-linecap="round"/>
  ${highlight(178, 170, 14, 40, -6, 0.3)}`
    }
  },

  pomidor: {
    palettes: [
      ['#dc2626', '#fca5a5', '#7f1d1d'],
      ['#ef4444', '#fecaca', '#991b1b'],
      ['#b91c1c', '#f87171', '#450a0a']
    ],
    draw(p) {
      return `${softShadow(200, 330, 100, 16)}
  <ellipse cx="200" cy="212" rx="108" ry="96" fill="url(#body)"/>
  <path d="M200 128 L232 148 L286 132 L262 172 L288 196 L226 192 L200 226 L174 192 L112 196 L138 172 L114 132 L168 148 Z" fill="#2f9e44"/>
  <path d="M200 140 L200 118" stroke="#2f6b28" stroke-width="9" stroke-linecap="round"/>
  ${highlight(154, 170, 30, 40, -30, 0.32)}`
    }
  },

  bodring: {
    palettes: [
      ['#16a34a', '#bbf7d0', '#14532d'],
      ['#15803d', '#dcfce7', '#052e16'],
      ['#22c55e', '#d9f99d', '#166534']
    ],
    draw(p) {
      const bumps = []
      for (let i = 0; i < 22; i++) {
        const t = i / 21
        const x = 108 + t * 184
        const y = 200 + Math.sin(t * 6) * 26 + (i % 2 === 0 ? -8 : 8)
        bumps.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${p[2]}" opacity="0.35"/>`)
      }
      return `${softShadow(200, 306, 118, 15)}
  <rect x="96" y="146" width="208" height="112" rx="56" fill="url(#body)" transform="rotate(-8 200 202)"/>
  <path d="M128 166 L272 138" stroke="#fff" stroke-opacity="0.3" stroke-width="7" stroke-linecap="round" transform="rotate(-8 200 202)"/>
  ${bumps.join('')}
  <path d="M100 172 C 88 162 78 156 68 152" stroke="#2f6b28" stroke-width="8" fill="none" stroke-linecap="round"/>`
    }
  },

  qalampiri: {
    palettes: [
      ['#dc2626', '#fca5a5', '#7f1d1d'],
      ['#eab308', '#fde68a', '#854d0e'],
      ['#16a34a', '#bbf7d0', '#14532d']
    ],
    draw(p) {
      return `${softShadow(200, 336, 100, 16)}
  <path d="M120 140 C 120 122 136 112 154 112 L246 112 C 264 112 280 122 280 140 L282 232 C 282 288 246 324 200 324 C 154 324 118 288 118 232 Z" fill="url(#body)"/>
  <path d="M200 112 L200 320" stroke="${p[2]}" stroke-opacity="0.28" stroke-width="6" fill="none"/>
  <path d="M156 118 C 148 190 150 250 158 300" stroke="${p[2]}" stroke-opacity="0.2" stroke-width="5" fill="none"/>
  <path d="M244 118 C 252 190 250 250 242 300" stroke="${p[2]}" stroke-opacity="0.2" stroke-width="5" fill="none"/>
  <path d="M186 112 C 186 92 192 76 200 66 C 208 76 214 92 214 112 Z" fill="#2f6b28"/>
  <path d="M200 66 C 204 54 210 48 216 44" stroke="#2f6b28" stroke-width="7" fill="none" stroke-linecap="round"/>
  ${highlight(150, 160, 24, 36, -8, 0.3)}`
    }
  },

  karam: {
    palettes: [
      ['#a7d08a', '#e6f4d9', '#4d7c0f'],
      ['#c5e1a5', '#eff7e3', '#3f6212'],
      ['#b7d99a', '#e8f4dc', '#3f6212']
    ],
    draw(p) {
      return `${softShadow(200, 334, 104, 17)}
  <path d="M200 96 C 268 96 306 148 304 216 C 302 288 258 330 200 330 C 142 330 98 288 96 216 C 94 148 132 96 200 96 Z" fill="url(#body)"/>
  <path d="M200 100 C 150 140 138 220 160 320" stroke="${p[2]}" stroke-opacity="0.3" stroke-width="5" fill="none"/>
  <path d="M200 100 C 250 140 262 220 240 320" stroke="${p[2]}" stroke-opacity="0.3" stroke-width="5" fill="none"/>
  <path d="M200 100 C 200 180 200 260 200 326" stroke="${p[2]}" stroke-opacity="0.3" stroke-width="5" fill="none"/>
  <path d="M100 180 C 70 200 62 240 78 272" stroke="#3f7d23" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M300 180 C 330 200 338 240 322 272" stroke="#3f7d23" stroke-width="8" fill="none" stroke-linecap="round"/>
  ${highlight(150, 160, 32, 40, -20, 0.32)}`
    }
  },

  baqlajon: {
    palettes: [
      ['#7c3aed', '#c4b5fd', '#4c1d95'],
      ['#6d28d9', '#ddd6fe', '#3b0764'],
      ['#8b5cf6', '#ede9fe', '#5b21b6']
    ],
    draw(p) {
      return `${softShadow(200, 332, 96, 15)}
  <path d="M200 108 C 258 108 286 160 282 226 C 278 292 246 330 200 330 C 154 330 122 292 118 226 C 114 160 142 108 200 108 Z" fill="url(#body)"/>
  <path d="M200 108 C 172 108 154 122 146 140 L254 140 C 246 122 228 108 200 108 Z" fill="#2f9e44"/>
  <path d="M168 124 L232 124 L246 142 L154 142 Z" fill="#3fbb5a"/>
  ${stem(200, 108, 34, 8, '#2f6b28')}
  ${highlight(166, 190, 24, 54, -6, 0.34)}`
    }
  },

  sarimsoq: {
    palettes: [
      ['#f5f0e1', '#ffffff', '#c9bfa4'],
      ['#efe6cf', '#fdfaf0', '#b9ab88'],
      ['#f2ead6', '#fffdf5', '#c2b596']
    ],
    draw(p) {
      return `${softShadow(200, 326, 100, 16)}
  <path d="M200 96 C 258 96 288 150 286 214 C 284 278 246 316 200 316 C 154 316 116 278 114 214 C 112 150 142 96 200 96 Z" fill="url(#body)"/>
  <path d="M200 100 C 186 150 184 244 200 312" stroke="${p[2]}" stroke-opacity="0.75" stroke-width="4" fill="none"/>
  <path d="M158 106 C 148 160 150 250 168 310" stroke="${p[2]}" stroke-opacity="0.6" stroke-width="4" fill="none"/>
  <path d="M242 106 C 252 160 250 250 232 310" stroke="${p[2]}" stroke-opacity="0.6" stroke-width="4" fill="none"/>
  <path d="M196 100 C 192 76 194 60 198 46" stroke="#b7a98c" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M288 268 C 304 258 322 262 328 274 C 320 292 300 296 288 284 Z" fill="${p[0]}" stroke="${p[2]}" stroke-width="3"/>`
    }
  },

  lavlagi: {
    palettes: [
      ['#e11d48', '#fecdd3', '#881337'],
      ['#dc2626', '#fca5a5', '#7f1d1d'],
      ['#f43f5e', '#ffe4e6', '#9f1239']
    ],
    draw(p) {
      return `${softShadow(200, 332, 88, 15)}
  <circle cx="200" cy="224" r="86" fill="url(#body)"/>
  <path d="M200 306 L200 330" stroke="#f8fafc" stroke-width="16" stroke-linecap="round"/>
  <path d="M200 150 C 176 116 168 96 164 74" stroke="#3f7d23" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M200 150 C 200 112 202 88 206 68" stroke="#3f7d23" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M200 150 C 224 116 232 96 236 74" stroke="#3f7d23" stroke-width="9" fill="none" stroke-linecap="round"/>
  ${highlight(164, 188, 22, 28, -30, 0.32)}`
    }
  },

  kokatlar: {
    palettes: [
      ['#16a34a', '#bbf7d0', '#14532d'],
      ['#22c55e', '#d9f99d', '#166534'],
      ['#15803d', '#dcfce7', '#052e16']
    ],
    draw(p) {
      const leafShape = (rot, s, tx, ty) =>
        `<g transform="translate(${tx} ${ty}) rotate(${rot}) scale(${s})">
      <path d="M0 0 C 30 -30 92 -30 124 0 C 92 30 30 30 0 0 Z" fill="url(#leafG)"/>
      <path d="M6 0 C 46 0 92 0 118 0" stroke="#14532d" stroke-opacity="0.35" stroke-width="3" fill="none"/>
    </g>`
      return `${softShadow(200, 336, 96, 14)}
  ${leafShape(-46, 1, 130, 200)}
  ${leafShape(46, 1, 270, 200)}
  ${leafShape(-16, 1.15, 120, 168)}
  ${leafShape(16, 1.15, 280, 168)}
  ${leafShape(0, 1.25, 200, 150)}
  <path d="M200 150 C 196 220 200 280 200 320" stroke="#2f6b28" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M200 300 C 186 316 174 322 162 324" stroke="#2f6b28" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M200 300 C 214 316 226 322 238 324" stroke="#2f6b28" stroke-width="8" fill="none" stroke-linecap="round"/>`
    }
  },

  'quruq-meva': {
    palettes: [
      ['#b45309', '#fcd9a4', '#7c2d12'],
      ['#c2410c', '#fed7aa', '#7c2d12'],
      ['#92400e', '#fde68a', '#451a03']
    ],
    draw(p) {
      const pieces = [
        [140, 220, 34, 26, -18],
        [196, 200, 30, 24, 12],
        [248, 226, 32, 25, -8],
        [166, 268, 32, 24, 20],
        [224, 272, 30, 23, -14],
        [200, 314, 28, 20, 6]
      ]
      return `${softShadow(200, 344, 108, 14)}
  ${pieces
    .map(
      ([x, y, rx, ry, r]) =>
        `<g transform="rotate(${r} ${x} ${y})"><rect x="${x - rx}" y="${y - ry}" width="${rx * 2}" height="${ry * 2}" rx="${Math.min(rx, ry) * 0.6}" fill="url(#body)"/>
        <circle cx="${x - rx * 0.3}" cy="${y - ry * 0.3}" r="3" fill="${p[2]}" opacity="0.4"/>
        <circle cx="${x + rx * 0.35}" cy="${y + ry * 0.25}" r="3" fill="${p[2]}" opacity="0.35"/></g>`
    )
    .join('')}`
    }
  },

  'yong-oqlar': {
    palettes: [
      ['#b07a45', '#e0bd93', '#6f4520'],
      ['#a8703c', '#d8b489', '#653f1c'],
      ['#bd8a55', '#eccda6', '#7a4d24']
    ],
    draw(p) {
      const nut = (x, y, r, s, kind) => {
        if (kind === 0)
          return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
          <path d="M0 -34 C 30 -34 38 -8 30 18 C 22 40 -22 40 -30 18 C -38 -8 -30 -34 0 -34 Z" fill="url(#body)"/>
          <path d="M0 -20 C 14 -18 16 0 8 16" stroke="${p[2]}" stroke-opacity="0.5" stroke-width="4" fill="none"/>
        </g>`
        if (kind === 1)
          return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
          <path d="M-34 18 C -26 -12 6 -28 30 -16 C 38 -10 34 22 12 32 C -8 40 -30 34 -34 18 Z" fill="url(#body)"/>
          <path d="M-18 14 C -4 2 12 -8 24 -10" stroke="${p[2]}" stroke-opacity="0.45" stroke-width="4" fill="none"/>
        </g>`
        return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">
          <path d="M-30 12 C -30 -14 30 -14 30 12 C 30 30 10 38 0 30 C -10 38 -30 30 -30 12 Z" fill="url(#body)"/>
          <path d="M-16 10 C -6 2 8 2 18 10" stroke="${p[2]}" stroke-opacity="0.45" stroke-width="4" fill="none"/>
        </g>`
      }
      return `${softShadow(200, 340, 116, 14)}
  ${nut(140, 210, -14, 1.1, 0)}
  ${nut(226, 192, 12, 1.05, 1)}
  ${nut(290, 230, -8, 1.0, 2)}
  ${nut(168, 280, 20, 1.05, 1)}
  ${nut(250, 288, -18, 1.0, 0)}
  ${nut(206, 236, 6, 0.85, 2)}`
    }
  },

  yongoq: {
    palettes: [
      ['#b07a45', '#e2c096', '#6f4520'],
      ['#a06a3c', '#d4b088', '#633d1c'],
      ['#bb8550', '#e8cca8', '#7a4d24']
    ],
    draw(p) {
      const half = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})">
        <path d="M0 -56 C 40 -56 56 -26 50 4 C 44 36 20 56 0 56 C -20 56 -44 36 -50 4 C -56 -26 -40 -56 0 -56 Z" fill="url(#body)"/>
        <path d="M0 -40 C 20 -36 28 -12 20 8 C 12 28 -12 28 -20 8 C -28 -12 -20 -36 0 -40 Z" fill="none" stroke="${p[2]}" stroke-opacity="0.5" stroke-width="5"/>
        <path d="M0 -14 C 12 -10 14 6 8 16" fill="none" stroke="${p[2]}" stroke-opacity="0.45" stroke-width="5"/>
      </g>`
      return `${softShadow(200, 336, 116, 14)}
  ${half(160, 210, -12)}
  ${half(250, 236, 14)}`
    }
  },

  'quritilgan-orik': {
    palettes: [
      ['#ea580c', '#fed7aa', '#9a3412'],
      ['#f97316', '#ffedd5', '#c2410c'],
      ['#d97706', '#fef3c7', '#92400e']
    ],
    draw(p) {
      const disc = (x, y, r) => `<g transform="translate(${x} ${y})">
        <circle r="${r}" fill="url(#body)"/>
        <path d="M${-r * 0.5} ${-r * 0.3} C ${-r * 0.1} ${-r * 0.6} ${r * 0.4} ${-r * 0.2} ${r * 0.45} ${r * 0.25}" stroke="${p[2]}" stroke-opacity="0.45" stroke-width="4" fill="none"/>
        <path d="M${-r * 0.55} ${r * 0.35} C ${-r * 0.1} ${r * 0.62} ${r * 0.35} ${r * 0.45} ${r * 0.5} ${r * 0.05}" stroke="${p[2]}" stroke-opacity="0.4" stroke-width="4" fill="none"/>
      </g>`
      return `${softShadow(200, 320, 108, 13)}
  ${disc(150, 214, 62)}
  ${disc(252, 232, 58)}
  ${disc(200, 292, 52)}`
    }
  },

  mayiz: {
    palettes: [
      ['#7c2d12', '#d6a06a', '#431407'],
      ['#92400e', '#e2b078', '#451a03'],
      ['#6b1f0c', '#c08b57', '#380f04']
    ],
    draw(p) {
      const items = []
      const pts = [
        [130, 190],
        [175, 168],
        [222, 186],
        [268, 172],
        [150, 232],
        [200, 222],
        [250, 236],
        [118, 244],
        [290, 236],
        [166, 282],
        [216, 284],
        [200, 316],
        [262, 300],
        [138, 312]
      ]
      pts.forEach(([x, y], i) => {
        const s = 0.85 + (i % 3) * 0.08
        items.push(
          `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-18 0 C -18 -16 18 -16 18 0 C 18 16 -18 16 -18 0 Z" fill="url(#body)"/>
          <ellipse cx="-5" cy="-5" rx="6" ry="4" fill="#fff" opacity="0.18"/></g>`
        )
      })
      return `${softShadow(200, 336, 104, 13)}
  ${items.join('')}`
    }
  },

  xurmo: {
    palettes: [
      ['#b45309', '#f0c08a', '#7c2d12'],
      ['#a8460a', '#e8b478', '#6d230a'],
      ['#c2620f', '#f5cd9b', '#8a3410']
    ],
    draw(p) {
      return `${softShadow(200, 326, 96, 14)}
  <ellipse cx="200" cy="222" rx="96" ry="76" fill="url(#body)"/>
  <path d="M200 152 L214 168 L232 158 L226 180 L242 190 L218 196 L212 216 L196 202 L176 210 L180 188 L160 178 L184 170 Z" fill="#5b2f0d"/>
  ${highlight(156, 182, 28, 24, -22, 0.28)}
  <ellipse cx="200" cy="284" rx="60" ry="18" fill="${p[2]}" opacity="0.18"/>`
    }
  },

  bodom: {
    palettes: [
      ['#c08a52', '#e7c9a3', '#8a5a2b'],
      ['#b57f47', '#dcc0a0', '#79501f'],
      ['#c99a62', '#eed6b4', '#8f6335']
    ],
    draw(p) {
      const almond = (x, y, rot, s) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
        <path d="M0 -62 C 26 -40 34 -4 22 34 C 16 54 8 62 0 62 C -8 62 -16 54 -22 34 C -34 -4 -26 -40 0 -62 Z" fill="url(#body)"/>
        <path d="M0 -50 C 12 -32 16 -4 8 26" stroke="${p[2]}" stroke-opacity="0.45" stroke-width="4" fill="none"/>
      </g>`
      return `${softShadow(200, 338, 110, 13)}
  ${almond(146, 218, -16, 1)}
  ${almond(232, 200, 14, 0.95)}
  ${almond(258, 286, 4, 0.85)}`
    }
  },

  pista: {
    palettes: [
      ['#e7d3a1', '#f7efd8', '#a98f52'],
      ['#dcc48c', '#f5ead0', '#9c8144'],
      ['#eaddb4', '#fbf6e6', '#b09a62']
    ],
    draw(p) {
      return `${softShadow(200, 336, 112, 13)}
  <g transform="translate(200 220)">
    <path d="M-78 -34 C -74 -78 -40 -96 0 -96 C 40 -96 74 -78 78 -34 C 80 -6 62 22 34 42 L0 58 L-34 42 C -62 22 -80 -6 -78 -34 Z" fill="url(#body)"/>
    <path d="M-56 -30 C -52 -64 -28 -78 0 -78 C 28 -78 52 -64 56 -30 C 58 -8 44 12 22 28 L0 40 L-22 28 C -44 12 -58 -8 -56 -30 Z" fill="#8fbf6b"/>
    <path d="M-40 -26 C -36 -52 -18 -62 0 -62 C 18 -62 36 -52 40 -26 C 42 -8 30 8 14 20 L0 28 L-14 20 C -30 8 -42 -8 -40 -26 Z" fill="#a8d18a"/>
    <path d="M0 40 L0 58" stroke="#a98f52" stroke-width="5"/>
  </g>`
    }
  },

  sharbat: {
    palettes: [
      ['#f97316', '#fed7aa', '#9a3412'],
      ['#eab308', '#fef9c3', '#854d0e'],
      ['#dc2626', '#fecaca', '#7f1d1d']
    ],
    draw(p) {
      return `${softShadow(200, 344, 82, 13)}
  <path d="M170 62 L230 62 L230 108 C 252 122 264 148 264 178 L264 316 C 264 332 252 342 236 342 L164 342 C 148 342 136 332 136 316 L136 178 C 136 148 148 122 170 108 Z" fill="#e2e8f0"/>
  <path d="M152 176 L248 176 L248 316 C 248 324 242 330 234 330 L166 330 C 158 330 152 324 152 316 Z" fill="url(#body)"/>
  <rect x="158" y="196" width="84" height="60" rx="8" fill="#ffffff" opacity="0.85"/>
  <path d="M176 220 C 188 208 200 232 212 220" stroke="${p[2]}" stroke-opacity="0.7" stroke-width="6" fill="none" stroke-linecap="round"/>
  <rect x="170" y="44" width="60" height="22" rx="8" fill="#cbd5e1"/>
  <path d="M150 140 C 170 130 230 130 250 140" stroke="#ffffff" stroke-opacity="0.5" stroke-width="6" fill="none"/>`
    }
  },

  salat: {
    palettes: [
      ['#22c55e', '#bbf7d0', '#166534'],
      ['#16a34a', '#dcfce7', '#14532d'],
      ['#4ade80', '#d9f99d', '#15803d']
    ],
    draw(p) {
      const leafShape = (rot, s, tx, ty) =>
        `<g transform="translate(${tx} ${ty}) rotate(${rot}) scale(${s})">
      <path d="M0 0 C 30 -30 92 -30 124 0 C 92 30 30 30 0 0 Z" fill="url(#leafG)"/>
      <path d="M6 0 C 46 0 92 0 118 0" stroke="#14532d" stroke-opacity="0.35" stroke-width="3" fill="none"/>
    </g>`
      return `${softShadow(200, 336, 110, 14)}
  ${leafShape(-40, 0.9, 148, 176)}
  ${leafShape(40, 0.9, 252, 176)}
  ${leafShape(-12, 1, 140, 142)}
  ${leafShape(14, 1, 262, 142)}
  <path d="M84 206 C 84 288 140 320 200 320 C 260 320 316 288 316 206 C 316 198 310 192 302 192 L98 192 C 90 192 84 198 84 206 Z" fill="#f1f5f9"/>
  <path d="M84 206 C 84 232 88 252 96 268 L304 268 C 312 252 316 232 316 206 C 316 198 310 192 302 192 L98 192 C 90 192 84 198 84 206 Z" fill="url(#body)"/>
  <path d="M96 214 L304 214" stroke="#ffffff" stroke-opacity="0.5" stroke-width="5" fill="none"/>`
    }
  },

  'uzum-kurma': {
    palettes: [
      ['#7c2d12', '#d6a06a', '#431407'],
      ['#92400e', '#e2b078', '#451a03']
    ],
    draw(p) {
      return `${softShadow(200, 330, 108, 14)}
  <ellipse cx="200" cy="228" rx="98" ry="70" fill="url(#body)"/>
  <path d="M200 162 C 198 186 202 200 208 210" stroke="#5b2f0d" stroke-width="8" fill="none" stroke-linecap="round"/>
  <path d="M132 200 C 150 176 176 164 200 162" stroke="#fff" stroke-opacity="0.2" stroke-width="10" fill="none" stroke-linecap="round"/>`
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Gradient qatlamini yaratish                                        */
/* ------------------------------------------------------------------ */

function buildDefs(typeKey, palette) {
  const [c1, c2, c3] = palette
  const defs = LEAF_DEFS

  switch (typeKey) {
    case 'banan':
      return (
        defs +
        linear('body', [
          [0, c2],
          [0.45, c1],
          [1, c3]
        ])
      )
    case 'shaftoli':
    case 'orik':
    case 'mango':
      return defs + radial('body', [
        [0, c2],
        [0.45, c1],
        [1, c3]
      ])
    default:
      return (
        defs +
        radial('body', [
          [0, c2],
          [0.4, c1],
          [1, c3]
        ])
      )
  }
}

/* ------------------------------------------------------------------ */
/*  Generator                                                          */
/* ------------------------------------------------------------------ */

let count = 0
const manifest = {}

for (const [key, type] of Object.entries(TYPES)) {
  type.palettes.forEach((palette, index) => {
    const variant = index + 1
    const name = `${key}-${variant}.svg`
    const svg = svgDoc(buildDefs(key, palette), type.draw(palette))
    writeFileSync(join(OUT_DIR, name), svg, 'utf8')
    count++
    manifest[name] = key
  })
}

/*  Zaxira (fallback) tasvir                                             */
const fallbackSvg = svgDoc(
  radial('body', [
    [0, '#e2e8f0'],
    [1, '#94a3b8']
  ]),
  `<ellipse cx="200" cy="336" rx="92" ry="15" fill="#0f172a" opacity="0.08"/>
  <path d="M120 150 L280 150 L306 320 L94 320 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="6" stroke-linejoin="round"/>
  <path d="M108 150 C 140 112 176 100 200 100 C 224 100 260 112 292 150 Z" fill="url(#body)"/>
  <circle cx="200" cy="216" r="34" fill="#ffffff" opacity="0.75"/>
  <path d="M186 216 L196 228 L216 204" stroke="#16a34a" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
)
writeFileSync(join(OUT_DIR, 'fallback.svg'), fallbackSvg, 'utf8')
count++

/*  Brand logotipi                                                       */
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <defs><radialGradient id="lg" cx="0.35" cy="0.28" r="0.9">
    <stop offset="0" stop-color="#f87171"/><stop offset="0.45" stop-color="#dc2626"/><stop offset="1" stop-color="#7f1d1d"/>
  </radialGradient></defs>
  <rect width="64" height="64" rx="16" fill="#14532d"/>
  <path d="M32 16 C 27 12 18 14 16 22 C 14 31 22 46 32 47 C 42 46 50 31 48 22 C 46 14 37 12 32 16 Z" fill="url(#lg)"/>
  <path d="M32 16 C 32 12 33 9 34 7" stroke="#7a4a22" stroke-width="3" stroke-linecap="round"/>
  <path d="M35 9 C 42 3 52 5 56 10 C 48 17 39 15 35 9 Z" fill="#3fbb5a"/>
</svg>
`
writeFileSync(join(OUT_DIR, 'logo.svg'), logoSvg, 'utf8')
count++

console.log(`✓ ${count} ta SVG fayl yaratildi: ${OUT_DIR}`)
console.log('  Turlar:', Object.keys(TYPES).join(', '))
