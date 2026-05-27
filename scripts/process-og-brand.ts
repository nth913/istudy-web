import sharp from 'sharp'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SRC = '/Users/Apple/Downloads/og-list'
const DST = join(process.cwd(), 'public/og')
const BG = { r: 0xff, g: 0xf8, b: 0xe7, alpha: 1 } // #FFF8E7 cream
const W = 1200
const H = 630
const MAX_BYTES = 300 * 1024

async function main(): Promise<void> {
  const pngs = readdirSync(SRC)
    .filter(f => f.toLowerCase().endsWith('.png'))
    .sort()
    .slice(0, 4)

  if (pngs.length < 4) {
    throw new Error(`Expected 4 PNGs in ${SRC}, found ${pngs.length}`)
  }

  for (let i = 0; i < pngs.length; i++) {
    const src = join(SRC, pngs[i])
    const dst = join(DST, `brand-${i}.webp`)

    let lastSize = 0
    let chosenQ = 0
    for (let q = 82; q >= 60; q -= 4) {
      const buf = await sharp(src)
        .resize(W, H, { fit: 'contain', background: BG })
        .webp({ quality: q })
        .toBuffer()

      lastSize = buf.length
      if (buf.length <= MAX_BYTES) {
        await sharp(buf).toFile(dst)
        chosenQ = q
        break
      }
    }

    if (chosenQ === 0) {
      throw new Error(`brand-${i}: could not compress below 300kb at q=60 (got ${(lastSize / 1024).toFixed(1)}KB)`)
    }

    const stat = statSync(dst)
    console.log(`brand-${i}.webp  q=${chosenQ}  ${(stat.size / 1024).toFixed(1)}KB  (src: ${pngs[i]})`)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
