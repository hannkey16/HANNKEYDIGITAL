import { NextRequest, NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'
import { Order } from '@/lib/types'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await queryOne<Order>('SELECT * FROM orders WHERE id=$1', [id])
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ order })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const allowed = ['status', 'account_email', 'account_password', 'activation_guide', 'expiry_date']
  const sets: string[] = []
  const vals: unknown[] = []
  let i = 1
  for (const key of allowed) {
    if (key in body) { sets.push(`${key}=$${i++}`); vals.push(body[key]) }
  }
  if (!sets.length) return NextResponse.json({ error: 'No valid fields' }, { status: 400 })
  vals.push(id)
  const order = await queryOne<Order>(
    `UPDATE orders SET ${sets.join(',')} WHERE id=$${i} RETURNING *`, vals
  )
  return NextResponse.json({ order })
}
