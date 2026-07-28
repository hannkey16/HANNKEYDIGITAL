import type { Metadata } from 'next'
import { OrdersClient } from './orders-client'
export const metadata: Metadata = { title: 'Pesanan Saya | HannKey Digital' }
export default function OrdersPage() { return <OrdersClient /> }
