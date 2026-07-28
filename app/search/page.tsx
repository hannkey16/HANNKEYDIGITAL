import type { Metadata } from 'next'
import { SearchClient } from './search-client'

export const metadata: Metadata = {
  title: 'Cari Produk | HannKey Digital',
  description: 'Cari aplikasi premium dan langganan AI terbaik di HannKey Digital.',
}

export default function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  return <SearchClient />
}
