import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Kelola Review | Admin HannKey Digital' }
import { AdminReviewsClient } from './admin-reviews-client'
export default function AdminReviewsPage() { return <AdminReviewsClient /> }
