import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Pengaturan | HannKey Digital' }
import { SettingsClient } from './settings-client'
export default function SettingsPage() { return <SettingsClient /> }
