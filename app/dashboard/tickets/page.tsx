import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Bantuan | HannKey Digital' }
import { TicketsClient } from './tickets-client'
export default function TicketsPage() { return <TicketsClient /> }
