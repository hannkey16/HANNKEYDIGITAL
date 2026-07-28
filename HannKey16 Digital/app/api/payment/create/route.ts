import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { createPakasirTransaction, PaymentMethodCode, calcFee, PAYMENT_METHODS } from '@/lib/payment'
import { Order } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const { orderId, method } = await req.json() as { orderId: string; method: PaymentMethodCode }

    const order = await queryOne<Order>('SELECT * FROM orders WHERE id=$1', [orderId])
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

    const pm = PAYMENT_METHODS.find(m => m.code === method)
    if (!pm) return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 })

    const fee = calcFee(pm, order.total_payment)
    const chargeAmount = order.total_payment + fee

    const pakasirRes = await createPakasirTransaction(method, orderId, chargeAmount)
    const p = pakasirRes.payment

    await query(
      `UPDATE orders SET
        status='waiting_payment',
        payment_method=$1,
        payment_method_label=$2,
        payment_number=$3,
        payment_expired_at=$4,
        payment_fee=$5,
        pakasir_data=$6
       WHERE id=$7`,
      [method, pm.label, p.payment_number, p.expired_at, fee, JSON.stringify(pakasirRes), orderId]
    )

    return NextResponse.json({
      paymentNumber: p.payment_number,
      expiredAt: p.expired_at,
      paymentMethod: method,
      totalPayment: p.total_payment,
      fee,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('POST /api/payment/create', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
