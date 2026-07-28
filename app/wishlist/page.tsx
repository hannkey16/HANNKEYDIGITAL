import type { Metadata } from 'next'
import { WishlistClient } from './wishlist-client'

export const metadata: Metadata = {
  title: 'Wishlist | HannKey Digital',
  description: 'Produk favorit yang telah kamu simpan di HannKey Digital.',
}

export default function WishlistPage() {
  return <WishlistClient />
}
