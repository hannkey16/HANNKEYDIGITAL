import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { Order } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { order_id, status } = body

    if (!order_id) return NextResponse.json({ ok: false }, { status: 400 })

    const order = await queryOne<Order>('SELECT id, status FROM orders WHERE id=$1', [order_id])
    if (!order) return NextResponse.json({ ok: false })

    // Map Pakasir status to our status
    let newStatus = order.status
    if (status === 'paid' || status === 'success' || status === 'settlement') {
      newStatus = 'paid'
      // Auto-advance to processing
      await query(
        `UPDATE orders SET status='processing' WHERE id=$1 AND status='waiting_payment'`,
        [order_id]
      )
      // Simulate auto-complete after processing (in production you'd do this manually)
    } else if (status === 'expire' || status === 'expired') {
      newStatus = 'expired'
      await query(`UPDATE orders SET status='expired' WHERE id=$1`, [order_id])
    } else if (status === 'cancel' || status === 'cancelled') {
      newStatus = 'cancelled'
      await query(`UPDATE orders SET status='cancelled' WHERE id=$1`, [order_id])
    } else if (status === 'failed' || status === 'failure') {
      newStatus = 'failed'
      await query(`UPDATE orders SET status='failed' WHERE id=$1`, [order_id])
    }

    return NextResponse.json({ ok: true, orderId: order_id, status: newStatus })
  } catch (err) {
    console.error('webhook error', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
