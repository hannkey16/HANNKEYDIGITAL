import type { Metadata } from 'next'
import { ProductsClient } from './products-client'

export const metadata: Metadata = {
  title: 'Semua Produk | HannKey Digital',
  description: 'Temukan aplikasi premium dan langganan AI terbaik dengan harga terjangkau.',
}

export default function ProductsPage() {
  return <ProductsClient />
}
