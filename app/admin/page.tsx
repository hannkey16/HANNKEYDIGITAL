import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Admin Dashboard | HannKey Digital' }
import { AdminDashboard } from './admin-dashboard'
export default function AdminPage() { return <AdminDashboard /> }
