/* ─────────────────────────────────────────────────────────────────────────────
   TIENDA DEL REFUGIO ⛓ — temas, fuentes y VFX del terminal.
   El Verde Fósforo, las tres fuentes base y el CRT son gratis; el resto
   se compra con chapas y se equipa al instante (VFX también en Perfil).
   ───────────────────────────────────────────────────────────────────────────── */

import { useNavigate } from 'react-router-dom'
import { FONTS, THEMES, VFX } from '../lib/shop'
import { sfx } from '../lib/sfx'
import { useProgress } from '../stores/useProgress'
import { Btn, Chip, Panel, Prompt, SectionTitle } from '../components/ui'

export function ShopPage() {
  const navigate = useNavigate()
  const caps = useProgress((s) => s.caps)
  const ownedThemes = useProgress((s) => s.ownedThemes)
  const ownedFonts = useProgress((s) => s.ownedFonts)
  const ownedVfx = useProgress((s) => s.ownedVfx)
  const equippedTheme = useProgress((s) => s.settings.theme)
  const equippedFont = useProgress((s) => s.settings.bodyFont)
  const equippedVfx = useProgress((s) => s.settings.vfx)
  const buyTheme = useProgress((s) => s.buyTheme)
  const equipTheme = useProgress((s) => s.equipTheme)
  const buyFont = useProgress((s) => s.buyFont)
  const equipFont = useProgress((s) => s.equipFont)
  const buyVfx = useProgress((s) => s.buyVfx)
  const equipVfx = useProgress((s) => s.equipVfx)

  return (
    <div className="flex flex-col gap-4 p-4 pb-8">
      <Prompt className="pt-1">▓ TIENDA DEL REFUGIO ▓</Prompt>

      <Panel className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-2xl text-vault-300">CARAVANA EN EL MUELLE</p>
            <p className="text-sm text-vault-500">
              el mercader despliega sus cajas… temas, fuentes y VFX, recién pulidos
            </p>
          </div>
          <Chip className="text-xl text-vault-amber">⛓ {caps}</Chip>
        </div>
      </Panel>

      {/* ── TEMAS ─────────────────────────────────────────────────────────────── */}
      <SectionTitle>TEMAS DEL TERMINAL</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {THEMES.map((t) => {
          const owned = ownedThemes.includes(t.id)
          const isEquipped = equippedTheme === t.id
          const canBuy = caps >= t.price
          return (
            <Panel key={t.id} className={`p-3 ${isEquipped ? 'border-vault-400' : ''}`}>
              <div
                className="rounded border border-vault-700 p-2 text-center"
                style={{ background: t.swatchBg ?? '#000' }}
              >
                <span style={{ color: t.swatch }} className="font-display text-xl">
                  中文字 Aa 3:07
                </span>
              </div>
              <p className="mt-2 font-display text-lg text-vault-300">{t.name}</p>
              <p className="text-xs text-vault-600">{t.desc}</p>
              {isEquipped ? (
                <Btn disabled className="mt-3 w-full">
                  ✔ EQUIPADO
                </Btn>
              ) : owned ? (
                <Btn
                  className="mt-3 w-full"
                  onClick={() => {
                    sfx.tap()
                    equipTheme(t.id)
                  }}
                >
                  EQUIPAR ▸
                </Btn>
              ) : (
                <Btn
                  variant="amber"
                  className="mt-3 w-full"
                  disabled={!canBuy}
                  onClick={() => {
                    sfx.log()
                    buyTheme(t.id)
                  }}
                >
                  ⛓ {t.price}
                </Btn>
              )}
            </Panel>
          )
        })}
      </div>

      {/* ── FUENTES ───────────────────────────────────────────────────────────── */}
      <SectionTitle>LETRAS DEL TERMINAL</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {FONTS.map((f) => {
          const owned = ownedFonts.includes(f.id)
          const isEquipped = equippedFont === f.id
          const canBuy = caps >= f.price
          return (
            <Panel key={f.id} className={`p-3 ${isEquipped ? 'border-vault-400' : ''}`}>
              <div className="rounded border border-vault-700 bg-black p-2 text-center">
                <span style={{ fontFamily: f.previewFamily, fontSize: '1.35rem' }} className="text-vault-300">
                  你好 Aa 123
                </span>
              </div>
              <p className="mt-2 font-display text-lg text-vault-300">{f.name}</p>
              <p className="text-xs text-vault-600">{f.desc}</p>
              {isEquipped ? (
                <Btn disabled className="mt-3 w-full">
                  ✔ EQUIPADA
                </Btn>
              ) : owned ? (
                <Btn
                  className="mt-3 w-full"
                  onClick={() => {
                    sfx.tap()
                    equipFont(f.id)
                  }}
                >
                  EQUIPAR ▸
                </Btn>
              ) : (
                <Btn
                  variant="amber"
                  className="mt-3 w-full"
                  disabled={!canBuy}
                  onClick={() => {
                    sfx.log()
                    buyFont(f.id)
                  }}
                >
                  ⛓ {f.price}
                </Btn>
              )}
            </Panel>
          )
        })}
      </div>

      {/* ── VFX ───────────────────────────────────────────────────────────────── */}
      <SectionTitle>VFX DEL TERMINAL</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {VFX.map((v) => {
          const owned = ownedVfx.includes(v.id)
          const isEquipped = equippedVfx === v.id
          const canBuy = caps >= v.price
          return (
            <Panel key={v.id} className={`p-3 ${isEquipped ? 'border-vault-400' : ''}`}>
              <p className="mt-1 font-display text-lg text-vault-300">{v.name}</p>
              <p className="text-xs text-vault-600">{v.desc}</p>
              {isEquipped ? (
                <Btn disabled className="mt-3 w-full">
                  ✔ ACTIVO
                </Btn>
              ) : owned ? (
                <Btn
                  className="mt-3 w-full"
                  onClick={() => {
                    sfx.tap()
                    equipVfx(v.id)
                  }}
                >
                  ACTIVAR ▸
                </Btn>
              ) : (
                <Btn
                  variant="amber"
                  className="mt-3 w-full"
                  disabled={!canBuy}
                  onClick={() => {
                    sfx.log()
                    buyVfx(v.id)
                  }}
                >
                  ⛓ {v.price}
                </Btn>
              )}
            </Panel>
          )
        })}
      </div>

      <p className="text-center text-xs text-vault-600">
        las chapas salen de las misiones de la caravana (mapa) — el mercader no acepta otra moneda
      </p>

      <Btn variant="amber" className="w-full" onClick={() => navigate('/')}>
        AL MAPA ▸
      </Btn>
    </div>
  )
}
