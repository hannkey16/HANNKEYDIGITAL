import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Kelola Pesanan | Admin HannKey Digital' }
import { AdminOrdersClient } from './admin-orders-client'
export default function AdminOrdersPage() { return <AdminOrdersClient /> }
