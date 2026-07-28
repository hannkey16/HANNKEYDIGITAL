import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Wishlist | HannKey Digital' }
import { WishlistClient } from '@/app/wishlist/wishlist-client'
export default function DashboardWishlistPage() { return <WishlistClient /> }
