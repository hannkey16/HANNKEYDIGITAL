import { NextRequest, NextResponse } from 'next/server'
import { applyPromo, PROMO_CODES } from '@/lib/payment'

export async function POST(req: NextRequest) {
  const { code, amount } = await req.json()
  if (!code || !amount) return NextResponse.json({ error: 'code and amount required' }, { status: 400 })
  const promo = PROMO_CODES[String(code).toUpperCase()]
  if (!promo) return NextResponse.json({ valid: false, discount: 0 })
  const discount = applyPromo(code, amount)
  return NextResponse.json({ valid: true, discount, code: code.toUpperCase() })
}
