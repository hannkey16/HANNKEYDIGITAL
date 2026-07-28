import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductDetail, productDetails } from '@/lib/mock-data'
import { ProductDetailClient } from './product-detail-client'

export async function generateStaticParams() {
  return productDetails.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProductDetail(slug)
  if (!product) return {}
  return {
    title: `${product.name} ${product.tier} | HannKey Digital`,
    description: product.description,
    openGraph: {
      title: `${product.name} ${product.tier} — Mulai ${(product.price / 1000).toFixed(0)}rb/bulan`,
      description: product.description,
      type: 'website',
    },
    other: {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${product.name} ${product.tier}`,
        description: product.description,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'IDR',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        },
      }),
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductDetail(slug)
  if (!product) notFound()
  return <ProductDetailClient product={product} />
}
