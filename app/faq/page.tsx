import type { Metadata } from 'next'
import { FaqClient } from './faq-client'

export const metadata: Metadata = {
  title: 'FAQ — Pertanyaan Umum | HannKey Digital',
  description: 'Temukan jawaban atas pertanyaan umum tentang produk, pembayaran, garansi, dan aktivasi akun di HannKey Digital.',
}

export default function FaqPage() {
  return <FaqClient />
}
