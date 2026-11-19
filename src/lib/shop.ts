/* ─────────────────────────────────────────────────────────────────────────────
   Catálogo de la TIENDA DEL REFUGIO ⛓ — temas, fuentes y VFX.
   Los colores exactos viven en index.css (html[data-theme/-font/-vfx]).
   ───────────────────────────────────────────────────────────────────────────── */

import type { BodyFont, ThemeId, VfxId } from '../types/progress'

export interface ThemeProduct {
  id: ThemeId
  name: string
  desc: string
  price: number
  /** color de muestra para la preview de la tarjeta */
  swatch: string
  /** fondo de muestra para la preview (temas claros) */
  swatchBg?: string
}

export const THEMES: ThemeProduct[] = [
  {
    id: 'green',
    name: 'Verde Fósforo',
    desc: 'el clásico del refugio 101',
    price: 0,
    swatch: '#3dff70',
  },
  {
    id: 'amber',
    name: 'Ámbar Fallout',
    desc: 'cálido, como las luces de emergencia',
    price: 25,
    swatch: '#ffb000',
  },
  {
    id: 'teal',
    name: 'Turquesa Rad',
    desc: 'radiactivo, pero de buen gusto',
    price: 25,
    swatch: '#3ce8d5',
  },
  {
    id: 'red',
    name: 'Rojo Alerta',
    desc: 'modo de emergencia del refugio',
    price: 40,
    swatch: '#ff5c5c',
  },
  {
    id: 'mono',
    name: 'Pip-Boy 2000',
    desc: 'blanco y negro: el modelo antiguo',
    price: 60,
    swatch: '#f5f5f5',
  },
  {
    id: 'notebook',
    name: 'Cuaderno',
    desc: 'papel rayado y tinta oscura: apuntes a mano',
    price: 50,
    swatch: '#17110a',
    swatchBg: '#f5efdc',
  },
  {
    id: 'atompunk',
    name: 'Atompunk Frío',
    desc: 'synthwave: azul eléctrico y magenta',
    price: 50,
    swatch: '#57c7ff',
  },
  {
    id: 'calido',
    name: 'Cálido',
    desc: 'atardecer: naranjas, corales y ámbar',
    price: 50,
    swatch: '#ffab7a',
  },
]

export interface FontProduct {
  id: BodyFont
  name: string
  desc: string
  price: number
  /** familia CSS para la preview de la tarjeta */
  previewFamily: string
}

export const FONTS: FontProduct[] = [
  { id: 'mono', name: 'Mono', desc: 'Share Tech Mono: la del terminal', price: 0, previewFamily: '"Share Tech Mono", monospace' },
  { id: 'pixel', name: 'Pixel', desc: 'VT323: bite de píxel retro', price: 0, previewFamily: 'VT323, monospace' },
  { id: 'sans', name: 'Sans', desc: 'la limpia del sistema', price: 0, previewFamily: 'system-ui, sans-serif' },
  { id: 'hand', name: 'Manuscrita', desc: 'Caveat: como apuntes a mano (encaja con el Cuaderno)', price: 15, previewFamily: 'Caveat, cursive' },
  { id: 'round', name: 'Redonda', desc: 'Nunito: suave y amable', price: 15, previewFamily: 'Nunito, sans-serif' },
]

export interface VfxProduct {
  id: VfxId
  name: string
  desc: string
  price: number
}

export const VFX: VfxProduct[] = [
  { id: 'none', name: 'Ninguno', desc: 'terminal plano, sin adornos', price: 0 },
  { id: 'crt', name: 'CRT', desc: 'scanlines, viñeta, barrido y parpadeo', price: 0 },
  { id: 'glitch', name: 'Glitch', desc: 'interferencias y saltos de señal', price: 20 },
  { id: 'neon', name: 'Neón', desc: 'fósforo a tope: brillos por todas partes', price: 20 },
]
