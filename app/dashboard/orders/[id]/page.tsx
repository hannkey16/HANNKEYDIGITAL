import { notFound } from 'next/navigation'
import { mockOrders } from '@/lib/mock-data'
import { OrderDetailClient } from './order-detail-client'

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = mockOrders.find(o => o.id === id)
  if (!order) notFound()
  return <OrderDetailClient order={order} />
}
