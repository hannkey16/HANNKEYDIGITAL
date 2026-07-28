import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Kelola Kategori | Admin HannKey Digital' }
import { AdminCategoriesClient } from './admin-categories-client'
export default function AdminCategoriesPage() { return <AdminCategoriesClient /> }
