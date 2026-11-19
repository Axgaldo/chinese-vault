/* ─────────────────────────────────────────────────────────────────────────────
   TIENDA DEL REFUGIO ⛓ — gasta tus chapas en temas de color del terminal.
   El Verde Fósforo es gratis; el resto se compra y se equipa al instante.
   ───────────────────────────────────────────────────────────────────────────── */

import { useNavigate } from 'react-router-dom'
import { THEMES } from '../lib/shop'
import { sfx } from '../lib/sfx'
import { useProgress } from '../stores/useProgress'
import { Btn, Chip, Meter, Panel, Prompt, SectionTitle } from '../components/ui'

export function ShopPage() {
  const navigate = useNavigate()
  const caps = useProgress((s) => s.caps)
  const ownedThemes = useProgress((s) => s.ownedThemes)
  const equipped = useProgress((s) => s.settings.theme)
  const buyTheme = useProgress((s) => s.buyTheme)
  const equipTheme = useProgress((s) => s.equipTheme)

  return (
    <div className="flex flex-col gap-4 p-4 pb-8">
      <Prompt className="pt-1">▓ TIENDA DEL REFUGIO ▓</Prompt>

      <Panel className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-2xl text-vault-300">CARAVANA EN EL MUELLE</p>
            <p className="text-sm text-vault-500">
              el mercader despliega sus cajas… temas de terminal, recién pulidos
            </p>
          </div>
          <Chip className="text-xl text-vault-amber">⛓ {caps}</Chip>
        </div>
        <Meter value={Math.min(1, caps / 60)} className="mt-3" />
        <p className="mt-1 text-xs text-vault-600">
          {caps >= 60 ? 'chapas de sobra para el Pip-Boy 2000' : `${Math.max(0, 60 - caps)} chapas para el más caro`}
        </p>
      </Panel>

      <SectionTitle>TEMAS DEL TERMINAL</SectionTitle>
      <div className="grid grid-cols-2 gap-2">
        {THEMES.map((t) => {
          const owned = ownedThemes.includes(t.id)
          const isEquipped = equipped === t.id
          const canBuy = caps >= t.price
          return (
            <Panel key={t.id} className={`p-3 ${isEquipped ? 'border-vault-400' : ''}`}>
              {/* muestra del tema */}
              <div
                className="rounded border border-vault-700 p-2 text-center"
                style={{ background: '#000' }}
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

      <p className="text-center text-xs text-vault-600">
        las chapas salen de las misiones de la caravana (mapa) — el mercader no acepta otra moneda
      </p>

      <Btn variant="amber" className="w-full" onClick={() => navigate('/')}>
        AL MAPA ▸
      </Btn>
    </div>
  )
}
