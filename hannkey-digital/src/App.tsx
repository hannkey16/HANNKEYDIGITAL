import { Benefits } from '@/components/sections/benefits'
import { Faq } from '@/components/sections/faq'
import { Footer } from '@/components/sections/footer'
import { Hero } from '@/components/sections/hero'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Navbar } from '@/components/sections/navbar'
import { Newsletter } from '@/components/sections/newsletter'
import { Products } from '@/components/sections/products'
import { Stats } from '@/components/sections/stats'
import { Testimonials } from '@/components/sections/testimonials'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Products />
        <Benefits />
        <HowItWorks />
        <Testimonials />
        <Faq />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
