import { Navbar } from '@/components/sections/navbar'
import { Footer } from '@/components/sections/footer'
import { LiveChat } from '@/components/floating/live-chat'

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
      <LiveChat />
    </>
  )
}
