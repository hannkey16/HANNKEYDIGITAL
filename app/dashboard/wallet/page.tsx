import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Dompet | HannKey Digital' }
import { WalletClient } from './wallet-client'
export default function WalletPage() { return <WalletClient /> }
