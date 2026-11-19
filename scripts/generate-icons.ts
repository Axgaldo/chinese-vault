/**
 * Generador de iconos de la app — CHINESE VAULT
 * ─────────────────────────────────────────────────────────────────────────────
 * Rasteriza public/favicon.svg (rueda dentada del refugio) a PNG con sharp:
 *   • icon-512.png / icon-192.png      → transparentes (icono "any")
 *   • icon-512-maskable.png            → fondo oscuro completo + zona segura
 *   • apple-touch-icon.png (180)       → fondo oscuro (iOS no soporta alpha bien)
 *
 * Uso: npm run icons   (los PNG NO se commitean: los regenera el deploy de CI)
 * ───────────────────────────────────────────────────────────────────────────── */

import { readFile } from 'node:fs/promises'
import sharp from 'sharp'

const SVG = 'public/favicon.svg'

/** Variante MASKABLE: la misma rueda al 78% sobre fondo completo (zona segura) */
function maskableSvg(svg: string): string {
  const inner = svg.trim().replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#030804"/><g transform="translate(7.04 7.04) scale(0.78)">${inner}</g></svg>`
}

async function main() {
  const svg = await readFile(SVG, 'utf8')

  await sharp(Buffer.from(svg)).resize(512, 512).png().toFile('public/icon-512.png')
  await sharp(Buffer.from(svg)).resize(192, 192).png().toFile('public/icon-192.png')
  await sharp(Buffer.from(maskableSvg(svg))).resize(512, 512).png().toFile('public/icon-512-maskable.png')
  await sharp(Buffer.from(maskableSvg(svg))).resize(180, 180).png().toFile('public/apple-touch-icon.png')

  console.log('[icons] icon-512.png · icon-192.png · icon-512-maskable.png · apple-touch-icon.png')
}

void main()
