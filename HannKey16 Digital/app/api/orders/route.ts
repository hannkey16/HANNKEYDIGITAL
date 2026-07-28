import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { Order } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      id, customer_name, customer_email, customer_whatsapp,
      product_slug, product_name, plan_name, plan_duration,
      unit_price, discount, promo_code, total_payment, notes,
    } = body

    if (!id || !customer_name || !customer_email || !product_slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const order = await queryOne<Order>(
      `INSERT INTO orders (
        id, customer_name, customer_email, customer_whatsapp,
        product_slug, product_name, plan_name, plan_duration,
        unit_price, discount, promo_code, total_payment, notes, status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,'pending')
      RETURNING *`,
      [id, customer_name, customer_email, customer_whatsapp,
       product_slug, product_name, plan_name, plan_duration,
       unit_price, discount ?? 0, promo_code ?? null, total_payment, notes ?? null]
    )
    return NextResponse.json({ order })
  } catch (err) {
    console.error('POST /api/orders', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })
  const orders = await query<Order>(
    `SELECT * FROM orders WHERE LOWER(customer_email)=LOWER($1) ORDER BY created_at DESC`,
    [email]
  )
  return NextResponse.json({ orders })
}
