export type PaymentMethodCode =
  | 'qris'
  | 'bni_va'
  | 'bri_va'
  | 'permata_va'
  | 'cimb_niaga_va'
  | 'maybank_va'
  | 'sampoerna_va'
  | 'bnc_va'
  | 'atm_bersama_va'
  | 'artha_graha_va'

export type PaymentCategory = 'QRIS' | 'Virtual Account'

export interface PaymentMethod {
  code: PaymentMethodCode
  label: string
  category: PaymentCategory
  fee: number | null    // fixed fee in IDR; null means percentage
  feePct?: number       // percentage fee (0–100)
  estTime: string
  icon: string          // emoji fallback
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    code: 'qris',
    label: 'QRIS',
    category: 'QRIS',
    fee: null,
    feePct: 0.7,
    estTime: 'Instan',
    icon: '🔲',
  },
  {
    code: 'bni_va',
    label: 'BNI Virtual Account',
    category: 'Virtual Account',
    fee: 4000,
    estTime: '< 5 menit',
    icon: '🏦',
  },
  {
    code: 'bri_va',
    label: 'BRI Virtual Account',
    category: 'Virtual Account',
    fee: 4000,
    estTime: '< 5 menit',
    icon: '🏦',
  },
  {
    code: 'permata_va',
    label: 'Permata Virtual Account',
    category: 'Virtual Account',
    fee: 4000,
    estTime: '< 5 menit',
    icon: '🏦',
  },
  {
    code: 'cimb_niaga_va',
    label: 'CIMB Niaga Virtual Account',
    category: 'Virtual Account',
    fee: 4000,
    estTime: '< 5 menit',
    icon: '🏦',
  },
  {
    code: 'maybank_va',
    label: 'Maybank Virtual Account',
    category: 'Virtual Account',
    fee: 4000,
    estTime: '< 5 menit',
    icon: '🏦',
  },
  {
    code: 'sampoerna_va',
    label: 'Bank Sampoerna VA',
    category: 'Virtual Account',
    fee: 4000,
    estTime: '< 5 menit',
    icon: '🏦',
  },
  {
    code: 'bnc_va',
    label: 'BNC Virtual Account',
    category: 'Virtual Account',
    fee: 4000,
    estTime: '< 10 menit',
    icon: '🏦',
  },
  {
    code: 'atm_bersama_va',
    label: 'ATM Bersama VA',
    category: 'Virtual Account',
    fee: 4000,
    estTime: '< 10 menit',
    icon: '🏧',
  },
  {
    code: 'artha_graha_va',
    label: 'Bank Artha Graha VA',
    category: 'Virtual Account',
    fee: 4000,
    estTime: '< 10 menit',
    icon: '🏦',
  },
]

/** Calculate the payment fee for a given method and base amount */
export function calcFee(method: PaymentMethod, amount: number): number {
  if (method.fee !== null) return method.fee
  if (method.feePct !== undefined) return Math.ceil(amount * method.feePct / 100)
  return 0
}

export interface PakasirTransactionRequest {
  project: string
  order_id: string
  amount: number
  api_key: string
}

export interface PakasirPaymentResponse {
  payment: {
    project: string
    order_id: string
    amount: number
    fee: number
    total_payment: number
    payment_method: string
    payment_number: string
    expired_at: string
  }
}

/** Create a transaction via the Pakasir API */
export async function createPakasirTransaction(
  method: PaymentMethodCode,
  orderId: string,
  amount: number
): Promise<PakasirPaymentResponse> {
  const apiKey = process.env.PAKASIR_API_KEY
  const project = process.env.PAKASIR_PROJECT_SLUG

  if (!apiKey || !project) {
    throw new Error('Pakasir credentials not configured. Set PAKASIR_API_KEY and PAKASIR_PROJECT_SLUG.')
  }

  const res = await fetch(
    `https://app.pakasir.com/api/transactioncreate/${method}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project, order_id: orderId, amount, api_key: apiKey } satisfies PakasirTransactionRequest),
    }
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Pakasir API error ${res.status}: ${text}`)
  }

  return res.json() as Promise<PakasirPaymentResponse>
}

/** Promo codes — extend as needed */
export const PROMO_CODES: Record<string, { discount: number; type: 'flat' | 'pct' }> = {
  HANNKEY10: { discount: 10, type: 'pct' },
  HANNKEY20: { discount: 20, type: 'pct' },
  HEMAT15K:  { discount: 15000, type: 'flat' },
}

export function applyPromo(code: string, amount: number): number {
  const promo = PROMO_CODES[code.toUpperCase()]
  if (!promo) return 0
  if (promo.type === 'pct') return Math.floor(amount * promo.discount / 100)
  return Math.min(promo.discount, amount)
}
