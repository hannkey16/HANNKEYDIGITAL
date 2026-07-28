import type { Metadata } from 'next'
import { CheckoutClient } from './checkout-client'

export const metadata: Metadata = {
  title: 'Checkout | HannKey Digital',
  description: 'Selesaikan pembayaran dan aktifkan langganan digitalmu.',
}

export default function CheckoutPage() {
  return <CheckoutClient />
}
