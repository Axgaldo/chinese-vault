/* ─────────────────────────────────────────────────────────────────────────────
   Catálogo de la TIENDA DEL REFUGIO ⛓ — temas de color del terminal.
   El verde fósforo es gratis; el resto se compran con chapas y se equipan.
   Los colores exactos viven en index.css (html[data-theme='...']).
   ───────────────────────────────────────────────────────────────────────────── */

import type { ThemeId } from '../types/progress'

export interface ThemeProduct {
  id: ThemeId
  name: string
  desc: string
  price: number
  /** color de muestra para la preview de la tarjeta */
  swatch: string
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
]
