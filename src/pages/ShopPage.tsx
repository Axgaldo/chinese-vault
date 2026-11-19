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

/** Tarjeta de producto de la tienda (tema/fuente/VFX) */
function ShopCard({
  title,
  desc,
  preview,
  price,
  caps,
  owned,
  equipped,
  adminMode,
  equipLabel,
  onEquip,
  onBuy,
}: {
  title: string
  desc: string
  preview: React.ReactNode
  price: number
  caps: number
  owned: boolean
  equipped: boolean
  adminMode: boolean
  equipLabel: string
  onEquip(): void
  onBuy(): void
}) {
  // El MODO SUPERVISOR desbloquea todo para probar (sin coste, sin compra)
  const unlocked = owned || adminMode
  const canBuy = !adminMode && caps >= price
  return (
    <Panel className={`p-3 ${equipped ? 'border-vault-400' : ''}`}>
      {preview}
      <p className="mt-2 font-display text-lg text-vault-300">
        {title} {adminMode && !owned && <span className="text-xs text-vault-teal">👁</span>}
      </p>
      <p className="text-xs text-vault-600">{desc}</p>
      {equipped ? (
        <Btn disabled className="mt-3 w-full">
          ✔ {equipLabel}
        </Btn>
      ) : unlocked ? (
        <Btn className="mt-3 w-full" onClick={onEquip}>
          EQUIPAR ▸
        </Btn>
      ) : (
        <Btn variant="amber" className="mt-3 w-full" disabled={!canBuy} onClick={onBuy}>
          ⛓ {price}
        </Btn>
      )}
    </Panel>
  )
}

export function ShopPage() {
  const navigate = useNavigate()
  const caps = useProgress((s) => s.caps)
  const ownedThemes = useProgress((s) => s.ownedThemes)
  const ownedFonts = useProgress((s) => s.ownedFonts)
  const ownedVfx = useProgress((s) => s.ownedVfx)
  const equippedTheme = useProgress((s) => s.settings.theme)
  const equippedFont = useProgress((s) => s.settings.bodyFont)
  const equippedVfx = useProgress((s) => s.settings.vfx)
  const adminMode = useProgress((s) => s.settings.adminMode)
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
        {adminMode && (
          <p className="mt-2 text-sm text-vault-teal">
            👁 MODO SUPERVISOR: todo el catálogo desbloqueado para probar (👁) — al quitarlo
            vuelves a tus compras reales
          </p>
        )}
      </Panel>

      {/* ── TEMAS ─────────────────────────────────────────────────────────────── */}
      <SectionTitle>TEMAS DEL TERMINAL</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {THEMES.map((t) => (
          <ShopCard
            key={t.id}
            title={t.name}
            desc={t.desc}
            price={t.price}
            owned={ownedThemes.includes(t.id)}
            equipped={equippedTheme === t.id}
            adminMode={adminMode}
            caps={caps}
            equipLabel="EQUIPADO"
            preview={
              <div
                className="rounded border border-vault-700 p-2 text-center"
                style={{ background: t.swatchBg ?? '#000' }}
              >
                <span style={{ color: t.swatch }} className="font-display text-xl">
                  中文字 Aa 3:07
                </span>
              </div>
            }
            onEquip={() => {
              sfx.tap()
              equipTheme(t.id)
            }}
            onBuy={() => {
              sfx.log()
              buyTheme(t.id)
            }}
          />
        ))}
      </div>

      {/* ── FUENTES ───────────────────────────────────────────────────────────── */}
      <SectionTitle>LETRAS DEL TERMINAL</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {FONTS.map((f) => (
          <ShopCard
            key={f.id}
            title={f.name}
            desc={f.desc}
            price={f.price}
            owned={ownedFonts.includes(f.id)}
            equipped={equippedFont === f.id}
            adminMode={adminMode}
            caps={caps}
            equipLabel="EQUIPADA"
            preview={
              <div className="rounded border border-vault-700 bg-black p-2 text-center">
                <span style={{ fontFamily: f.previewFamily, fontSize: '1.35rem' }} className="text-vault-300">
                  你好 Aa 123
                </span>
              </div>
            }
            onEquip={() => {
              sfx.tap()
              equipFont(f.id)
            }}
            onBuy={() => {
              sfx.log()
              buyFont(f.id)
            }}
          />
        ))}
      </div>

      {/* ── VFX ───────────────────────────────────────────────────────────────── */}
      <SectionTitle>VFX DEL TERMINAL</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {VFX.map((v) => (
          <ShopCard
            key={v.id}
            title={v.name}
            desc={v.desc}
            price={v.price}
            owned={ownedVfx.includes(v.id)}
            equipped={equippedVfx === v.id}
            adminMode={adminMode}
            caps={caps}
            equipLabel="ACTIVO"
            preview={null}
            onEquip={() => {
              sfx.tap()
              equipVfx(v.id)
            }}
            onBuy={() => {
              sfx.log()
              buyVfx(v.id)
            }}
          />
        ))}
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
