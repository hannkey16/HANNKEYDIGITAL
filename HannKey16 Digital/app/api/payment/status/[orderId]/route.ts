import { NextRequest, NextResponse } from 'next/server'
import { queryOne } from '@/lib/db'
import { Order } from '@/lib/types'

export async function GET(_: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params
  const order = await queryOne<Order>(
    'SELECT id, status, payment_number, payment_expired_at, payment_method, payment_method_label, payment_fee, total_payment, account_email, account_password, activation_guide, expiry_date FROM orders WHERE id=$1',
    [orderId]
  )
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ order })
}
