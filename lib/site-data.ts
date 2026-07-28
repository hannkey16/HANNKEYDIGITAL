export type Product = {
  slug: string
  name: string
  /** Second line of the product title, e.g. "Premium" */
  tier: string
  logo: string
  /** Force the logo to solid white (for dark/mono source SVGs) */
  whiteLogo?: boolean
  /** Tile background behind the logo */
  tile: string
  price: number
  strikePrice?: number
  badge?: string
  perks: [string, string, string]
}

export const products: Product[] = [
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
  },
]

export const stats = [
  {
    value: 50000,
    suffix: '+',
    label: 'Pelanggan',
    caption: 'Pengguna aktif & terpercaya',
    icon: 'users' as const,
  },
  {
    value: 100000,
    suffix: '+',
    label: 'Transaksi',
    caption: 'Transaksi berhasil setiap bulan',
    icon: 'cart' as const,
  },
  {
    value: 4.9,
    suffix: '/5',
    decimals: 1,
    label: 'Rating',
    caption: 'Dari 10.000+ ulasan pelanggan',
    icon: 'star' as const,
  },
]

export const benefits = [
  {
    icon: 'shield' as const,
    title: 'Aman & Terpercaya',
    description:
      'Semua transaksi dijamin aman dengan sistem keamanan berlapis dan garansi uang kembali.',
  },
  {
    icon: 'zap' as const,
    title: 'Aktivasi Instan',
    description:
      'Produk dikirim otomatis ke dashboard dan email kamu tepat setelah pembayaran berhasil.',
  },
  {
    icon: 'tag' as const,
    title: 'Harga Terbaik',
    description:
      'Dapatkan harga termurah tanpa mengorbankan kualitas layanan maupun keaslian akun.',
  },
  {
    icon: 'headphones' as const,
    title: 'Support 24/7',
    description:
      'Tim support siap membantu kamu kapan saja, setiap hari, lewat WhatsApp dan Telegram.',
  },
]

export const steps = [
  {
    step: '01',
    title: 'Pilih Produk',
    description:
      'Telusuri katalog layanan digital premium dan pilih paket yang paling sesuai dengan kebutuhanmu.',
    icon: 'grid' as const,
  },
  {
    step: '02',
    title: 'Selesaikan Pembayaran',
    description:
      'Bayar lewat QRIS, e-wallet, atau transfer bank. Konfirmasi otomatis dalam hitungan detik.',
    icon: 'wallet' as const,
  },
  {
    step: '03',
    title: 'Terima Akun Instan',
    description:
      'Detail akun langsung muncul di dashboard beserta panduan aktivasi dan garansi 30 hari.',
    icon: 'sparkles' as const,
  },
]

export const testimonials = [
  {
    name: 'Andi Pratama',
    role: 'Content Creator, Bandung',
    initial: 'A',
    rating: 5,
    comment:
      'Pelayanannya cepat banget dan aman. Akun langsung aktif kurang dari satu menit setelah pembayaran. Recommended!',
    accent: 'from-[#7C4DFF] to-[#5B8CFF]',
  },
  {
    name: 'Dewi Lestari',
    role: 'Mahasiswa, Yogyakarta',
    initial: 'D',
    rating: 5,
    comment:
      'Harga paling murah yang pernah aku temukan, prosesnya instan, dan supportnya responsif. Pasti langganan terus.',
    accent: 'from-[#5B8CFF] to-[#A855F7]',
  },
  {
    name: 'Rizky Maulana',
    role: 'Freelancer, Jakarta',
    initial: 'R',
    rating: 5,
    comment:
      'Sudah belanja lebih dari sepuluh kali di HannKey Digital dan selalu memuaskan. Garansinya benar-benar dipakai.',
    accent: 'from-[#A855F7] to-[#7C4DFF]',
  },
  {
    name: 'Siti Nurhaliza',
    role: 'Digital Marketer, Surabaya',
    initial: 'S',
    rating: 5,
    comment:
      'Tim untuk kebutuhan desain pakai Canva Pro dari sini. Invoice rapi, akun stabil, tidak pernah ada kendala.',
    accent: 'from-[#5B8CFF] to-[#7C4DFF]',
  },
  {
    name: 'Bagus Wicaksono',
    role: 'Software Engineer, Medan',
    initial: 'B',
    rating: 5,
    comment:
      'Dashboard-nya enak dipakai, riwayat transaksi jelas, dan ChatGPT Plus-nya berjalan normal tanpa drama.',
    accent: 'from-[#7C4DFF] to-[#A855F7]',
  },
]

export const faqs = [
  {
    question: 'Apakah akun yang dijual resmi dan legal?',
    answer:
      'Ya. Seluruh akun di HannKey Digital diperoleh melalui jalur resmi dan berlangganan penuh. Kami tidak menjual akun hasil pembajakan, sehingga layanan berjalan normal seperti berlangganan langsung.',
  },
  {
    question: 'Berapa lama proses aktivasi setelah pembayaran?',
    answer:
      'Rata-rata kurang dari satu menit. Setelah pembayaran terkonfirmasi, detail akun otomatis dikirim ke dashboard dan email kamu. Untuk produk tertentu yang butuh verifikasi manual, maksimal 15 menit pada jam kerja.',
  },
  {
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer:
      'Kami menerima QRIS, DANA, GoPay, OVO, transfer bank BCA dan Mandiri, serta kartu kredit Visa dan Mastercard. Semua pembayaran diproses melalui payment gateway tersertifikasi.',
  },
  {
    question: 'Bagaimana ketentuan garansi 30 hari?',
    answer:
      'Jika akun mengalami kendala dalam 30 hari pertama, kami mengganti akun baru tanpa biaya tambahan. Cukup hubungi support dengan menyertakan nomor pesanan dan bukti kendala.',
  },
  {
    question: 'Apakah bisa berlangganan untuk tim atau reseller?',
    answer:
      'Bisa. Kami menyediakan harga khusus untuk pembelian dalam jumlah banyak dan program afiliasi dengan komisi berjenjang. Hubungi tim kami untuk mendapatkan penawaran reseller.',
  },
  {
    question: 'Apa yang terjadi jika saya lupa detail akun?',
    answer:
      'Semua pesanan tersimpan permanen di halaman Riwayat Transaksi pada dashboard kamu. Kamu bisa melihat kembali detail akun kapan saja setelah login.',
  },
]

export const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Produk', href: '#produk' },
  { label: 'Cara Belanja', href: '#cara-belanja' },
  { label: 'Keuntungan', href: '#keuntungan' },
  { label: 'Testimoni', href: '#testimoni' },
  { label: 'FAQ', href: '#faq' },
]

export const paymentMethods = [
  { label: 'QRIS', kind: 'text' as const },
  { label: 'DANA', kind: 'text' as const },
  { label: 'GoPay', kind: 'text' as const },
  { label: 'OVO', kind: 'text' as const },
  { label: 'BCA', kind: 'text' as const },
  { label: 'Mandiri', kind: 'text' as const },
  { label: 'Visa', kind: 'svg' as const, src: '/logos/visa.svg', white: true },
  {
    label: 'Mastercard',
    kind: 'svg' as const,
    src: '/logos/mastercard.svg',
  },
]

export function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString('id-ID')}`
}
