/**
 * Pakasir payment gateway integration.
 * Falls back to a mock response when PAKASIR_API_KEY is not configured.
 */

const PAKASIR_API_KEY = process.env.PAKASIR_API_KEY ?? "";
const PAKASIR_PROJECT_SLUG = process.env.PAKASIR_PROJECT_SLUG ?? "";
const PAKASIR_BASE = "https://pakasir.com/api";

export interface CreatePaymentOptions {
  orderId: string;
  method: string;
  amount: number;
  customerName: string;
  customerEmail: string;
}

export interface CreatePaymentResult {
  paymentNumber: string;
  expiredAt: string;
  paymentMethod: string;
  paymentMethodLabel: string;
  totalPayment: number;
  fee: number;
}

function mockExpiry(minutes = 60) {
  return new Date(Date.now() + minutes * 60 * 1000).toISOString();
}

function mockPaymentNumber(method: string) {
  if (method === "qris") return `QRIS-${Date.now()}`;
  return `${String(Math.floor(Math.random() * 9e11) + 1e11)}`;
}

export async function createPayment(
  opts: CreatePaymentOptions,
): Promise<CreatePaymentResult> {
  const fee = opts.method === "qris" ? Math.ceil((opts.amount * 0.7) / 100) : 4000;

  // Use real Pakasir if credentials are present
  if (PAKASIR_API_KEY && PAKASIR_PROJECT_SLUG) {
    const response = await fetch(`${PAKASIR_BASE}/v1/transaction/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PAKASIR_API_KEY}`,
      },
      body: JSON.stringify({
        project_slug: PAKASIR_PROJECT_SLUG,
        order_id: opts.orderId,
        payment_method: opts.method,
        amount: opts.amount + fee,
        customer_name: opts.customerName,
        customer_email: opts.customerEmail,
      }),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Pakasir error ${response.status}: ${text}`);
    }
    const data = (await response.json()) as {
      data?: {
        payment_number?: string;
        expired_at?: string;
        payment_method?: string;
        payment_method_label?: string;
        fee?: number;
      };
    };
    const d = data.data ?? {};
    return {
      paymentNumber: d.payment_number ?? mockPaymentNumber(opts.method),
      expiredAt: d.expired_at ?? mockExpiry(),
      paymentMethod: d.payment_method ?? opts.method,
      paymentMethodLabel: d.payment_method_label ?? opts.method,
      totalPayment: opts.amount + fee,
      fee,
    };
  }

  // Mock response for development
  return {
    paymentNumber: mockPaymentNumber(opts.method),
    expiredAt: mockExpiry(),
    paymentMethod: opts.method,
    paymentMethodLabel: opts.method.replace(/_/g, " ").toUpperCase(),
    totalPayment: opts.amount + fee,
    fee,
  };
}

export async function getPaymentStatus(orderId: string) {
  if (PAKASIR_API_KEY && PAKASIR_PROJECT_SLUG) {
    const response = await fetch(
      `${PAKASIR_BASE}/v1/transaction/status/${orderId}`,
      {
        headers: { Authorization: `Bearer ${PAKASIR_API_KEY}` },
      },
    );
    if (!response.ok) throw new Error(`Pakasir status error ${response.status}`);
    return response.json();
  }
  return null;
}
