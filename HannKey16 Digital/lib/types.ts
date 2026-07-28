export type OrderStatus =
  | 'pending'
  | 'waiting_payment'
  | 'paid'
  | 'processing'
  | 'completed'
  | 'expired'
  | 'cancelled'
  | 'failed'

export interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_whatsapp: string
  product_slug: string
  product_name: string
  plan_name: string
  plan_duration: string
  quantity: number
  unit_price: number
  discount: number
  promo_code: string | null
  payment_fee: number
  total_payment: number
  payment_method: string | null
  payment_method_label: string | null
  payment_number: string | null
  payment_expired_at: string | null
  pakasir_data: Record<string, unknown> | null
  status: OrderStatus
  notes: string | null
  account_email: string | null
  account_password: string | null
  activation_guide: string | null
  warranty_days: number
  expiry_date: string | null
  created_at: string
  updated_at: string
}

export interface CheckoutFormData {
  fullName: string
  email: string
  whatsapp: string
  promoCode: string
  notes: string
}
