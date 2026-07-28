import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Kelola Pembayaran | Admin HannKey Digital' }
import { AdminPaymentsClient } from './admin-payments-client'
export default function AdminPaymentsPage() { return <AdminPaymentsClient /> }
