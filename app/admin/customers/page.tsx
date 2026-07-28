import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Kelola Pelanggan | Admin HannKey Digital' }
import { AdminCustomersClient } from './admin-customers-client'
export default function AdminCustomersPage() { return <AdminCustomersClient /> }
