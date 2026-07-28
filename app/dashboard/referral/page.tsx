import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Referral | HannKey Digital' }
import { ReferralClient } from './referral-client'
export default function ReferralPage() { return <ReferralClient /> }
