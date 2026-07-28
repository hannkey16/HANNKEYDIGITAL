import { type Product, products, formatRupiah } from './site-data'

export type Category = 'ai-subscription' | 'streaming' | 'design' | 'productivity' | 'video-editing'

export const categoryMeta: Record<Category, { label: string; description: string; color: string }> = {
  'ai-subscription': { label: 'AI Subscription', description: 'Langganan AI terbaik untuk produktivitas', color: 'from-[#0f9d7a] to-[#0a6b56]' },
  'streaming': { label: 'Streaming', description: 'Hiburan tanpa batas dengan harga terjangkau', color: 'from-[#1b0508] to-[#000000]' },
  'design': { label: 'Design', description: 'Tools desain profesional untuk kreatormu', color: 'from-[#1a5cff] to-[#7d2ae7]' },
  'productivity': { label: 'Productivity', description: 'Tingkatkan produktivitas tim dan individu', color: 'from-[#2d8cff] to-[#0b5cd5]' },
  'video-editing': { label: 'Video Editing', description: 'Edit video profesional di mana saja', color: 'from-[#161821] to-[#04050a]' },
}

export type Duration = { label: string; months: number; price: number; strikePrice?: number; badge?: string }

export type ProductDetail = Product & {
  category: Category
  description: string
  longDescription: string
  features: string[]
  durations: Duration[]
  accountTypes: string[]
  warranty: string
  rating: number
  reviewCount: number
  faq: { q: string; a: string }[]
  related: string[]
}

export const productDetails: ProductDetail[] = [
  {
    slug: 'netflix',
    name: 'Netflix',
    tier: 'Premium',
    logo: '/logos/netflix.svg',
    tile: 'linear-gradient(150deg,#1b0508,#000000)',
    price: 16500,
    strikePrice: 29000,
    badge: 'Terlaris',
    perks: ['Ultra HD 4K', 'Garansi 30 Hari', 'Aktivasi Instan'],
    category: 'streaming',
    description: 'Nikmati ribuan film, serial, dan dokumenter Netflix Premium berkualitas Ultra HD 4K dengan suara Dolby Atmos.',
    longDescription: 'Netflix Premium memberikan akses ke seluruh konten Netflix dalam kualitas Ultra HD 4K dan HDR. Nikmati film Hollywood terbaru, serial original Netflix, anime, dokumenter, dan konten lokal. Akun resmi dengan garansi 30 hari, aktivasi instan setelah pembayaran dikonfirmasi.',
    features: ['Ultra HD 4K & HDR', 'Dolby Atmos', 'Hingga 4 layar serentak', 'Download untuk offline', 'Tanpa iklan', 'Konten original Netflix', 'Tersedia di semua perangkat', 'Akun resmi bergaransi'],
    durations: [
      { label: '1 Bulan', months: 1, price: 16500, strikePrice: 29000 },
      { label: '3 Bulan', months: 3, price: 45000, strikePrice: 87000, badge: 'Hemat 9%' },
      { label: '6 Bulan', months: 6, price: 85000, strikePrice: 174000, badge: 'Hemat 13%' },
      { label: '1 Tahun', months: 12, price: 155000, strikePrice: 348000, badge: 'Terbaik' },
    ],
    accountTypes: ['Private (1 profil)', 'Sharing (berbagi profil)'],
    warranty: 'Garansi penggantian akun dalam 30 hari jika terjadi kendala teknis. Cukup hubungi support dengan nomor pesanan.',
    rating: 4.9,
    reviewCount: 2847,
    faq: [
      { q: 'Apakah akun Netflix ini resmi?', a: 'Ya, semua akun diperoleh melalui jalur resmi berlangganan penuh.' },
      { q: 'Berapa lama aktivasi?', a: 'Rata-rata kurang dari 1 menit setelah pembayaran dikonfirmasi.' },
      { q: 'Bisa dipakai di berapa perangkat?', a: 'Tergantung paket yang dipilih, bisa 1-4 perangkat serentak.' },
      { q: 'Bagaimana jika akun bermasalah?', a: 'Kami akan mengganti akun baru tanpa biaya dalam 30 hari.' },
    ],
    related: ['spotify', 'disney-plus', 'prime-video'],
  },
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    tier: 'Plus',
    logo: '/logos/chatgpt.svg',
    whiteLogo: true,
    tile: 'linear-gradient(150deg,#0f9d7a,#0a6b56)',
    price: 25000,
    strikePrice: 45000,
    badge: 'Populer',
    perks: ['Akun Resmi', 'Garansi 30 Hari', 'Aktivasi Instan'],
    category: 'ai-subscription',
    description: 'Akses GPT-4o, DALL·E 3, analisis data, dan fitur AI terdepan untuk coding, desain, riset, dan kreasi konten.',
    longDescription: 'ChatGPT Plus memberikan akses prioritas ke model GPT-4o terbaru, DALL·E 3 untuk generasi gambar, Code Interpreter untuk analisis data, dan berbagai plugin. Ideal untuk developer, desainer, penulis, peneliti, dan siapapun yang ingin memaksimalkan produktivitas dengan AI.',
    features: ['GPT-4o (model terbaru)', 'DALL·E 3 image generation', 'Advanced Data Analysis', 'Plugin & GPT Store', 'Browsing real-time', 'Akses prioritas saat ramai', 'Context window 128K token', 'Akun resmi bergaransi'],
    durations: [
      { label: '1 Bulan', months: 1, price: 25000, strikePrice: 45000 },
      { label: '3 Bulan', months: 3, price: 68000, strikePrice: 135000, badge: 'Hemat 10%' },
      { label: '6 Bulan', months: 6, price: 125000, strikePrice: 270000, badge: 'Hemat 14%' },
      { label: '1 Tahun', months: 12, price: 230000, strikePrice: 540000, badge: 'Terbaik' },
    ],
    accountTypes: ['Akun Pribadi', 'Akun Tim (Teams)'],
    warranty: 'Garansi penuh 30 hari. Jika akun tidak bisa diakses, kami ganti akun baru tanpa biaya tambahan.',
    rating: 4.8,
    reviewCount: 3214,
    faq: [
      { q: 'Apakah akun ChatGPT ini asli?', a: 'Ya, 100% akun resmi OpenAI berlangganan Plus.' },
      { q: 'Bisa akses GPT-4o?', a: 'Ya, mendapatkan akses penuh ke GPT-4o dan semua fitur Plus.' },
      { q: 'Apakah bisa digunakan untuk bisnis?', a: 'Bisa, cocok untuk keperluan bisnis, riset, dan pengembangan.' },
      { q: 'Bagaimana cara aktivasi?', a: 'Detail akun dikirim otomatis ke dashboard setelah pembayaran.' },
    ],
    related: ['canva', 'zoom', 'capcut'],
  },
  {
    slug: 'canva',
    name: 'Canva',
    tier: 'Pro',
    logo: '/logos/canva.svg',
    tile: 'linear-gradient(150deg,#1a5cff,#7d2ae7)',
    price: 12500,
    strikePrice: 20000,
    perks: ['Akun Resmi', 'Garansi 30 Hari', 'Aktivasi Instan'],
    category: 'design',
    description: 'Desain grafis profesional tanpa batas dengan jutaan template, aset premium, Brand Kit, dan fitur AI Canva.',
    longDescription: 'Canva Pro membuka akses ke 100+ juta foto, video, grafis premium, jutaan template eksklusif, Brand Kit untuk konsistensi merek, Background Remover otomatis, Magic Resize, dan fitur AI terbaru seperti Magic Write dan Magic Design. Cocok untuk tim marketing, desainer, kreator konten, dan UMKM.',
    features: ['100M+ foto & video premium', 'Jutaan template eksklusif', 'Background Remover AI', 'Magic Resize otomatis', 'Brand Kit & Logo Maker', 'Magic Write & Magic Design', 'Schedule & publish konten', 'Akun resmi bergaransi'],
    durations: [
      { label: '1 Bulan', months: 1, price: 12500, strikePrice: 20000 },
      { label: '3 Bulan', months: 3, price: 34000, strikePrice: 60000, badge: 'Hemat 9%' },
      { label: '6 Bulan', months: 6, price: 62000, strikePrice: 120000, badge: 'Hemat 14%' },
      { label: '1 Tahun', months: 12, price: 110000, strikePrice: 240000, badge: 'Terbaik' },
    ],
    accountTypes: ['Personal Pro', 'Tim (hingga 5 orang)'],
    warranty: 'Garansi 30 hari penggantian akun. Support via WhatsApp dan Telegram.',
    rating: 4.9,
    reviewCount: 1893,
    faq: [
      { q: 'Apakah bisa untuk tim?', a: 'Ya, tersedia paket tim hingga 5 orang dengan fitur collaboration.' },
      { q: 'Apakah semua template premium terbuka?', a: 'Ya, semua template dan aset premium tersedia di akun Pro.' },
      { q: 'Bisa export ke berbagai format?', a: 'Ya, termasuk PNG, JPG, PDF, MP4, GIF, dan SVG.' },
      { q: 'Apakah ada fitur AI?', a: 'Ya, termasuk Magic Write, Magic Design, Background Remover, dan lainnya.' },
    ],
    related: ['chatgpt', 'capcut', 'zoom'],
  },
  {
    slug: 'spotify',
    name: 'Spotify',
    tier: 'Premium',
    logo: '/logos/spotify.svg',
    tile: 'linear-gradient(150deg,#0d2a17,#06120c)',
    price: 10500,
    strikePrice: 18000,
    perks: ['Akun Resmi', 'Garansi 30 Hari', 'Aktivasi Instan'],
    category: 'streaming',
    description: 'Dengarkan 100+ juta lagu, podcast, dan audiobook tanpa iklan dengan kualitas audio terbaik di Spotify Premium.',
    longDescription: 'Spotify Premium memberikan streaming musik tanpa iklan, download untuk didengar offline, kualitas audio hingga 320kbps, skip lagu tanpa batas, dan akses ke 100+ juta lagu plus jutaan podcast. Tersedia di smartphone, tablet, PC, smart TV, dan speaker pintar.',
    features: ['100M+ lagu & podcast', 'Tanpa iklan', 'Download offline', 'Kualitas 320kbps', 'Skip tanpa batas', 'Lyrics real-time', 'DJ AI personal', 'Akun resmi bergaransi'],
    durations: [
      { label: '1 Bulan', months: 1, price: 10500, strikePrice: 18000 },
      { label: '3 Bulan', months: 3, price: 28000, strikePrice: 54000, badge: 'Hemat 11%' },
      { label: '6 Bulan', months: 6, price: 52000, strikePrice: 108000, badge: 'Hemat 14%' },
      { label: '1 Tahun', months: 12, price: 95000, strikePrice: 216000, badge: 'Terbaik' },
    ],
    accountTypes: ['Individual', 'Duo (2 orang)', 'Family (6 orang)'],
    warranty: 'Garansi penggantian 30 hari. Akun stabil dan tidak pernah terkena banned.',
    rating: 4.8,
    reviewCount: 2156,
    faq: [
      { q: 'Bisa download lagu?', a: 'Ya, bisa download hingga 10.000 lagu per perangkat untuk didengar offline.' },
      { q: 'Tersedia di perangkat apa?', a: 'Semua perangkat: HP, tablet, PC, Smart TV, dan speaker pintar.' },
      { q: 'Apakah ada fitur Family?', a: 'Tersedia, bisa untuk 2-6 orang dengan akun terpisah.' },
      { q: 'Kualitas audio seperti apa?', a: 'Hingga 320kbps Very High Quality, jauh lebih jernih dari gratis.' },
    ],
    related: ['netflix', 'disney-plus', 'prime-video'],
  },
  {
    slug: 'disney-plus',
    name: 'Disney+',
    tier: 'Hotstar',
    logo: '/logos/disney-plus.svg',
    whiteLogo: true,
    tile: 'linear-gradient(150deg,#0a1a4d,#050b22)',
    price: 15500,
    strikePrice: 26000,
    perks: ['Akun Resmi', 'Garansi 30 Hari', 'Aktivasi Instan'],
    category: 'streaming',
    description: 'Akses semua konten Disney, Marvel, Star Wars, Pixar, National Geographic dalam kualitas 4K Ultra HD.',
    longDescription: 'Disney+ Hotstar menghadirkan konten dari Disney, Marvel Cinematic Universe, Star Wars, Pixar, dan National Geographic dalam satu platform. Nikmati film box office terbaru, serial eksklusif, animasi, olahraga live, dan konten lokal Asia. Streaming hingga 4K Ultra HD dengan HDR.',
    features: ['Disney, Marvel, Star Wars', 'Pixar & National Geographic', '4K Ultra HD & HDR', 'Live sports & events', 'Konten lokal Asia', 'Download offline', '4 layar bersamaan', 'Akun resmi bergaransi'],
    durations: [
      { label: '1 Bulan', months: 1, price: 15500, strikePrice: 26000 },
      { label: '3 Bulan', months: 3, price: 42000, strikePrice: 78000, badge: 'Hemat 10%' },
      { label: '6 Bulan', months: 6, price: 79000, strikePrice: 156000, badge: 'Hemat 15%' },
      { label: '1 Tahun', months: 12, price: 145000, strikePrice: 312000, badge: 'Terbaik' },
    ],
    accountTypes: ['Standard', 'Premium (4K)'],
    warranty: 'Garansi 30 hari penggantian akun tanpa biaya.',
    rating: 4.7,
    reviewCount: 1342,
    faq: [
      { q: 'Ada film Marvel terbaru?', a: 'Ya, semua film dan serial MCU tersedia termasuk yang terbaru.' },
      { q: 'Tersedia di berapa perangkat?', a: 'Bisa digunakan di hingga 4 perangkat secara bersamaan.' },
      { q: 'Apakah ada konten sport?', a: 'Ya, tersedia siaran langsung olahraga di Disney+ Hotstar.' },
      { q: 'Kualitas video maksimal?', a: 'Hingga 4K Ultra HD dengan HDR untuk konten yang mendukung.' },
    ],
    related: ['netflix', 'spotify', 'prime-video'],
  },
  {
    slug: 'capcut',
    name: 'CapCut',
    tier: 'Pro',
    logo: '/logos/capcut.svg',
    whiteLogo: true,
    tile: 'linear-gradient(150deg,#161821,#04050a)',
    price: 13500,
    strikePrice: 22000,
    perks: ['Akun Resmi', 'Garansi 30 Hari', 'Aktivasi Instan'],
    category: 'video-editing',
    description: 'Edit video profesional dengan AI tools, template premium, efek eksklusif, dan ekspor tanpa watermark.',
    longDescription: 'CapCut Pro membuka akses penuh ke semua fitur editing profesional: AI Auto Captions, background remover AI, template premium, efek dan transisi eksklusif, ekspor hingga 4K tanpa watermark, smart cutout, video enhancer AI, dan storage cloud lebih besar.',
    features: ['AI Auto Captions', 'Background Remover AI', 'Template premium eksklusif', 'Ekspor 4K tanpa watermark', 'Video Enhancer AI', 'Smart Cutout', 'Semua efek & transisi', 'Cloud storage 1TB'],
    durations: [
      { label: '1 Bulan', months: 1, price: 13500, strikePrice: 22000 },
      { label: '3 Bulan', months: 3, price: 37000, strikePrice: 66000, badge: 'Hemat 9%' },
      { label: '6 Bulan', months: 6, price: 69000, strikePrice: 132000, badge: 'Hemat 13%' },
      { label: '1 Tahun', months: 12, price: 125000, strikePrice: 264000, badge: 'Terbaik' },
    ],
    accountTypes: ['Personal Pro', 'Creator Pro'],
    warranty: 'Garansi 30 hari. Akun tidak pernah bermasalah atau kami ganti baru.',
    rating: 4.8,
    reviewCount: 987,
    faq: [
      { q: 'Bisa ekspor tanpa watermark?', a: 'Ya, CapCut Pro memungkinkan ekspor ke semua resolusi tanpa watermark.' },
      { q: 'Ada fitur AI?', a: 'Ya, termasuk Auto Captions, Background Remover, dan Video Enhancer AI.' },
      { q: 'Tersedia di platform apa?', a: 'iOS, Android, macOS, Windows, dan browser.' },
      { q: 'Berapa storage cloud yang didapat?', a: 'Storage cloud ditingkatkan untuk penyimpanan proyek yang lebih besar.' },
    ],
    related: ['canva', 'chatgpt', 'zoom'],
  },
  {
    slug: 'zoom',
    name: 'Zoom',
    tier: 'Pro',
    logo: '/logos/zoom.svg',
    tile: 'linear-gradient(150deg,#2d8cff,#0b5cd5)',
    price: 12000,
    strikePrice: 19000,
    perks: ['Akun Resmi', 'Garansi 30 Hari', 'Aktivasi Instan'],
    category: 'productivity',
    description: 'Meeting profesional tanpa batas waktu hingga 100 peserta, cloud recording, dan fitur kolaborasi lengkap.',
    longDescription: 'Zoom Pro menghilangkan batas 40 menit, memungkinkan meeting hingga 30 jam, cloud recording otomatis, hingga 100 peserta, virtual background, polling, breakout rooms, whiteboard, dan integrasi dengan Slack, Google Workspace, dan Microsoft Teams.',
    features: ['Meeting hingga 30 jam', 'Cloud recording', 'Hingga 100 peserta', 'Virtual background', 'Breakout rooms', 'Polling & Q&A', 'Whiteboard kolaboratif', 'Akun resmi bergaransi'],
    durations: [
      { label: '1 Bulan', months: 1, price: 12000, strikePrice: 19000 },
      { label: '3 Bulan', months: 3, price: 33000, strikePrice: 57000, badge: 'Hemat 8%' },
      { label: '6 Bulan', months: 6, price: 62000, strikePrice: 114000, badge: 'Hemat 13%' },
      { label: '1 Tahun', months: 12, price: 115000, strikePrice: 228000, badge: 'Terbaik' },
    ],
    accountTypes: ['Pro (1 host)', 'Business (hosts banyak)'],
    warranty: 'Garansi 30 hari. Support siap membantu 24/7.',
    rating: 4.7,
    reviewCount: 743,
    faq: [
      { q: 'Apakah ada batas waktu meeting?', a: 'Zoom Pro memungkinkan meeting hingga 30 jam tanpa batas.' },
      { q: 'Berapa peserta yang bisa join?', a: 'Hingga 100 peserta dalam satu meeting.' },
      { q: 'Apakah ada cloud recording?', a: 'Ya, semua meeting bisa direkam otomatis ke cloud.' },
      { q: 'Bisa integrasi dengan tools lain?', a: 'Ya, integrasi dengan Slack, Google, Microsoft, dan banyak lagi.' },
    ],
    related: ['chatgpt', 'canva', 'capcut'],
  },
  {
    slug: 'prime-video',
    name: 'Prime Video',
    tier: 'Premium',
    logo: '/logos/prime-video.svg',
    tile: 'linear-gradient(150deg,#0a2233,#050b18)',
    price: 14500,
    strikePrice: 24000,
    perks: ['Ultra HD 4K', 'Garansi 30 Hari', 'Aktivasi Instan'],
    category: 'streaming',
    description: 'Tonton ribuan film dan serial Amazon Original dalam Ultra HD 4K dengan subtitle bahasa Indonesia.',
    longDescription: 'Amazon Prime Video menyediakan ribuan judul film dan serial eksklusif Amazon Original, film box office, anime, dokumenter, dan konten lokal. Kualitas Ultra HD 4K dengan HDR10, Dolby Vision, dan Dolby Atmos. Download untuk ditonton offline, tersedia di semua perangkat.',
    features: ['Amazon Original series', 'Ultra HD 4K & Dolby Vision', 'Dolby Atmos audio', 'Download offline', 'Subtitle Indonesia', '3 layar bersamaan', 'Kids profile', 'Akun resmi bergaransi'],
    durations: [
      { label: '1 Bulan', months: 1, price: 14500, strikePrice: 24000 },
      { label: '3 Bulan', months: 3, price: 39000, strikePrice: 72000, badge: 'Hemat 10%' },
      { label: '6 Bulan', months: 6, price: 74000, strikePrice: 144000, badge: 'Hemat 14%' },
      { label: '1 Tahun', months: 12, price: 135000, strikePrice: 288000, badge: 'Terbaik' },
    ],
    accountTypes: ['Individual', 'Family (berbagi)'],
    warranty: 'Garansi 30 hari penggantian tanpa biaya. Support 24/7.',
    rating: 4.7,
    reviewCount: 892,
    faq: [
      { q: 'Ada serial The Boys, Rings of Power?', a: 'Ya, semua Amazon Original tersedia lengkap.' },
      { q: 'Kualitas video maksimal?', a: 'Hingga 4K Ultra HD dengan Dolby Vision dan HDR10+.' },
      { q: 'Bisa digunakan berapa perangkat?', a: 'Hingga 3 perangkat secara bersamaan.' },
      { q: 'Ada subtitle Bahasa Indonesia?', a: 'Ya, banyak konten sudah tersedia dengan subtitle Bahasa Indonesia.' },
    ],
    related: ['netflix', 'disney-plus', 'spotify'],
  },
]

export function getProductDetail(slug: string): ProductDetail | undefined {
  return productDetails.find(p => p.slug === slug)
}

export function getProductsByCategory(category: Category): ProductDetail[] {
  return productDetails.filter(p => p.category === category)
}

export function searchProducts(query: string, category?: Category): ProductDetail[] {
  const q = query.toLowerCase()
  return productDetails.filter(p => {
    const matchQuery = !q || p.name.toLowerCase().includes(q) || p.tier.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.includes(q)
    const matchCat = !category || p.category === category
    return matchQuery && matchCat
  })
}

export const popularSearches = ['Netflix', 'ChatGPT', 'Canva Pro', 'Spotify', 'Disney+', 'CapCut', 'Zoom', 'AI Tools', 'Streaming', 'Design']

// ─── Reviews ───────────────────────────────────────────────────────────────
export type Review = {
  id: string
  productSlug: string
  user: string
  initial: string
  rating: number
  comment: string
  date: string
  verified: boolean
  accent: string
}

export const reviews: Review[] = [
  { id: 'r1', productSlug: 'netflix', user: 'Andi P.', initial: 'A', rating: 5, comment: 'Lancar banget, kualitas 4K mantap. Aktivasi kurang dari 1 menit!', date: '20 Jul 2026', verified: true, accent: 'from-[#7C4DFF] to-[#5B8CFF]' },
  { id: 'r2', productSlug: 'netflix', user: 'Dewi L.', initial: 'D', rating: 5, comment: 'Harga murah, kualitas premium. Sudah 3 bulan langganan, tidak ada masalah.', date: '15 Jul 2026', verified: true, accent: 'from-[#5B8CFF] to-[#A855F7]' },
  { id: 'r3', productSlug: 'netflix', user: 'Rizky M.', initial: 'R', rating: 4, comment: 'Puas dengan pelayanan. Support responsif ketika ada pertanyaan.', date: '10 Jul 2026', verified: true, accent: 'from-[#A855F7] to-[#7C4DFF]' },
  { id: 'r4', productSlug: 'chatgpt', user: 'Siti N.', initial: 'S', rating: 5, comment: 'GPT-4o berjalan sempurna, semua fitur Plus aktif. Worth it!', date: '22 Jul 2026', verified: true, accent: 'from-[#0f9d7a] to-[#5B8CFF]' },
  { id: 'r5', productSlug: 'chatgpt', user: 'Bagus W.', initial: 'B', rating: 5, comment: 'Sangat membantu untuk coding dan riset. Aktivasi instan, akun stabil.', date: '18 Jul 2026', verified: true, accent: 'from-[#7C4DFF] to-[#A855F7]' },
  { id: 'r6', productSlug: 'chatgpt', user: 'Fajar K.', initial: 'F', rating: 5, comment: 'Rekomendasi untuk developer! GPT-4o jauh lebih pintar dari versi gratis.', date: '12 Jul 2026', verified: true, accent: 'from-[#A855F7] to-[#0f9d7a]' },
  { id: 'r7', productSlug: 'canva', user: 'Mira S.', initial: 'M', rating: 5, comment: 'Template premium sangat banyak. Background remover AI akurat banget!', date: '21 Jul 2026', verified: true, accent: 'from-[#1a5cff] to-[#7d2ae7]' },
  { id: 'r8', productSlug: 'canva', user: 'Dimas R.', initial: 'D', rating: 5, comment: 'Sudah 6 bulan pakai Canva Pro dari HannKey, tidak ada kendala sama sekali.', date: '16 Jul 2026', verified: true, accent: 'from-[#7d2ae7] to-[#5B8CFF]' },
  { id: 'r9', productSlug: 'spotify', user: 'Lina A.', initial: 'L', rating: 5, comment: 'Musik tanpa iklan, kualitas audio sangat bagus. Recommended!', date: '19 Jul 2026', verified: true, accent: 'from-[#1db954] to-[#0d7a35]' },
  { id: 'r10', productSlug: 'capcut', user: 'Hendra Y.', initial: 'H', rating: 5, comment: 'Ekspor tanpa watermark, template banyak. Buat konten jadi lebih mudah!', date: '17 Jul 2026', verified: true, accent: 'from-[#7C4DFF] to-[#5B8CFF]' },
]

export function getProductReviews(slug: string): Review[] {
  return reviews.filter(r => r.productSlug === slug)
}

// ─── Flash Sale ─────────────────────────────────────────────────────────────
export const flashSaleEndTime = new Date(Date.now() + 23 * 60 * 60 * 1000 + 47 * 60 * 1000) // ~24h from now

export const flashSaleProducts = [
  { slug: 'netflix', discountPercent: 43, flashPrice: 16500 },
  { slug: 'chatgpt', discountPercent: 44, flashPrice: 25000 },
  { slug: 'canva', discountPercent: 38, flashPrice: 12500 },
]

// ─── Orders (mock dashboard data) ────────────────────────────────────────────
export type OrderStatus = 'pending' | 'paid' | 'processing' | 'activating' | 'completed' | 'cancelled'

export const orderStatusMeta: Record<OrderStatus, { label: string; color: string; step: number }> = {
  pending:    { label: 'Menunggu Pembayaran', color: 'text-yellow-400', step: 0 },
  paid:       { label: 'Pembayaran Berhasil', color: 'text-blue-400',   step: 1 },
  processing: { label: 'Diproses',           color: 'text-purple-400', step: 2 },
  activating: { label: 'Aktivasi',           color: 'text-brand-2',    step: 3 },
  completed:  { label: 'Selesai',            color: 'text-green-400',  step: 4 },
  cancelled:  { label: 'Dibatalkan',         color: 'text-red-400',    step: -1 },
}

export type Order = {
  id: string
  invoiceNumber: string
  productSlug: string
  productName: string
  productTier: string
  productLogo: string
  productTile: string
  duration: string
  amount: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
  paymentMethod: string
  accountEmail?: string
  accountPassword?: string
  notes?: string
}

export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    invoiceNumber: 'INV-2026-07-001',
    productSlug: 'chatgpt',
    productName: 'ChatGPT',
    productTier: 'Plus',
    productLogo: '/logos/chatgpt.svg',
    productTile: 'linear-gradient(150deg,#0f9d7a,#0a6b56)',
    duration: '1 Bulan',
    amount: 25000,
    status: 'completed',
    createdAt: '2026-07-20 14:32',
    updatedAt: '2026-07-20 14:33',
    paymentMethod: 'QRIS',
    accountEmail: 'user.chatgpt@openai.com',
    accountPassword: '••••••••',
  },
  {
    id: 'ord-002',
    invoiceNumber: 'INV-2026-07-002',
    productSlug: 'netflix',
    productName: 'Netflix',
    productTier: 'Premium',
    productLogo: '/logos/netflix.svg',
    productTile: 'linear-gradient(150deg,#1b0508,#000000)',
    duration: '3 Bulan',
    amount: 45000,
    status: 'completed',
    createdAt: '2026-07-15 09:10',
    updatedAt: '2026-07-15 09:11',
    paymentMethod: 'DANA',
    accountEmail: 'netflix.premium@hk.id',
    accountPassword: '••••••••',
  },
  {
    id: 'ord-003',
    invoiceNumber: 'INV-2026-07-003',
    productSlug: 'canva',
    productName: 'Canva',
    productTier: 'Pro',
    productLogo: '/logos/canva.svg',
    productTile: 'linear-gradient(150deg,#1a5cff,#7d2ae7)',
    duration: '1 Bulan',
    amount: 12500,
    status: 'activating',
    createdAt: '2026-07-28 08:45',
    updatedAt: '2026-07-28 08:46',
    paymentMethod: 'GoPay',
  },
  {
    id: 'ord-004',
    invoiceNumber: 'INV-2026-07-004',
    productSlug: 'spotify',
    productName: 'Spotify',
    productTier: 'Premium',
    productLogo: '/logos/spotify.svg',
    productTile: 'linear-gradient(150deg,#0d2a17,#06120c)',
    duration: '1 Bulan',
    amount: 10500,
    status: 'pending',
    createdAt: '2026-07-28 11:20',
    updatedAt: '2026-07-28 11:20',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 'ord-005',
    invoiceNumber: 'INV-2026-06-001',
    productSlug: 'capcut',
    productName: 'CapCut',
    productTier: 'Pro',
    productLogo: '/logos/capcut.svg',
    productTile: 'linear-gradient(150deg,#161821,#04050a)',
    duration: '1 Bulan',
    amount: 13500,
    status: 'completed',
    createdAt: '2026-06-10 16:05',
    updatedAt: '2026-06-10 16:06',
    paymentMethod: 'QRIS',
    accountEmail: 'capcut.pro@hk.id',
    accountPassword: '••••••••',
  },
]

export const mockUser = {
  name: 'Budi Santoso',
  email: 'budi.santoso@email.com',
  phone: '+62 812-3456-7890',
  joinDate: 'Januari 2026',
  avatar: 'B',
  walletBalance: 50000,
  totalOrders: 5,
  referralCode: 'BUDI2026',
  referralEarning: 25000,
}

// ─── Payment methods ────────────────────────────────────────────────────────
export type PaymentMethod = {
  id: string
  name: string
  type: 'ewallet' | 'qris' | 'bank' | 'card'
  logo?: string
  fee: number
  minAmount: number
  description: string
}

export const paymentOptions: PaymentMethod[] = [
  { id: 'qris', name: 'QRIS', type: 'qris', fee: 0, minAmount: 1000, description: 'Scan QR dari aplikasi apapun' },
  { id: 'dana', name: 'DANA', type: 'ewallet', fee: 0, minAmount: 1000, description: 'Transfer dari dompet DANA' },
  { id: 'gopay', name: 'GoPay', type: 'ewallet', fee: 0, minAmount: 1000, description: 'Transfer dari GoPay' },
  { id: 'ovo', name: 'OVO', type: 'ewallet', fee: 0, minAmount: 1000, description: 'Transfer dari OVO' },
  { id: 'shopeepay', name: 'ShopeePay', type: 'ewallet', fee: 0, minAmount: 1000, description: 'Transfer dari ShopeePay' },
  { id: 'bca', name: 'BCA Virtual Account', type: 'bank', fee: 4000, minAmount: 10000, description: 'Transfer ke VA BCA' },
  { id: 'mandiri', name: 'Mandiri Virtual Account', type: 'bank', fee: 4000, minAmount: 10000, description: 'Transfer ke VA Mandiri' },
  { id: 'bni', name: 'BNI Virtual Account', type: 'bank', fee: 4000, minAmount: 10000, description: 'Transfer ke VA BNI' },
]
