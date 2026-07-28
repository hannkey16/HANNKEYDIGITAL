import { MetadataRoute } from 'next'

const BASE_URL = 'https://hannkey.digital'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/checkout/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
