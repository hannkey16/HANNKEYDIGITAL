import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Kelola Produk | Admin HannKey Digital' }
import { AdminProductsClient } from './admin-products-client'
export default function AdminProductsPage() { return <AdminProductsClient /> }
