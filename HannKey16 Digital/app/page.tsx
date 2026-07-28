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
import { faqs, products } from '@/lib/site-data'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'HannKey Digital',
      description:
        'Marketplace akun & layanan digital premium dengan aktivasi instan dan garansi 30 hari.',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '10000',
        bestRating: '5',
      },
    },
    {
      '@type': 'ItemList',
      name: 'Produk Premium Terpopuler',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: `${product.name} ${product.tier}`,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'IDR',
            availability: 'https://schema.org/InStock',
          },
        },
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
    </>
  )
}
