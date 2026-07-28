import { Router } from "express";
import { db } from "@workspace/db";
import { ordersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { createPayment } from "../lib/payment";

const router = Router();

// POST /payment/create
router.post("/payment/create", async (req, res) => {
  const { orderId, method } = req.body as { orderId?: string; method?: string };
  if (!orderId || !method) {
    res.status(400).json({ error: "orderId and method are required" });
    return;
  }

  try {
    const [order] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, orderId))
      .limit(1);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    const result = await createPayment({
      orderId,
      method,
      amount: Number(order.total_payment),
      customerName: order.customer_name,
      customerEmail: order.customer_email,
    });

    // Persist payment details
    await db
      .update(ordersTable)
      .set({
        payment_method: method,
        payment_method_label: result.paymentMethodLabel ?? method,
        payment_number: result.paymentNumber,
        payment_expired_at: result.expiredAt,
        payment_fee: String(result.fee),
        total_payment: String(Number(order.total_payment) + result.fee),
        status: "waiting_payment",
        updated_at: new Date(),
      })
      .where(eq(ordersTable.id, orderId));

    res.json(result);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create payment" });
  }
});

// GET /payment/status/:orderId
router.get("/payment/status/:orderId", async (req, res) => {
  try {
    const [order] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, req.params.orderId))
      .limit(1);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.json({ order });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to get payment status" });
  }
});

// POST /payment/webhook
router.post("/payment/webhook", async (req, res) => {
  const { order_id, status } = req.body as {
    order_id?: string;
    status?: string;
  };

  if (!order_id || !status) {
    res.json({ ok: false, orderId: null, status: null });
    return;
  }

  const mapped =
    status === "SUCCESS" || status === "PAID"
      ? "paid"
      : status === "EXPIRED" || status === "FAILED"
      ? "failed"
      : "waiting_payment";

  try {
    await db
      .update(ordersTable)
      .set({ status: mapped, updated_at: new Date() })
      .where(eq(ordersTable.id, order_id));
    res.json({ ok: true, orderId: order_id, status: mapped });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ ok: false, orderId: null, status: null });
  }
});

export default router;
