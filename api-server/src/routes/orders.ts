import { Router } from "express";
import { db } from "@workspace/db";
import { ordersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { CreateOrderBody } from "@workspace/api-zod";

const router = Router();

// POST /orders — create order
router.post("/orders", async (req, res) => {
  const parse = CreateOrderBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: parse.error.flatten() });
    return;
  }
  const data = parse.data;
  try {
    const [order] = await db
      .insert(ordersTable)
      .values({
        id: data.id,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_whatsapp: data.customer_whatsapp,
        product_slug: data.product_slug,
        product_name: data.product_name,
        plan_name: data.plan_name ?? "",
        plan_duration: data.plan_duration ?? "",
        unit_price: String(data.unit_price ?? 0),
        discount: String(data.discount ?? 0),
        promo_code: data.promo_code ?? null,
        total_payment: String(data.total_payment),
        notes: data.notes ?? null,
      })
      .returning();
    res.status(201).json({ order: serializeOrder(order) });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// GET /orders?email=...
router.get("/orders", async (req, res) => {
  const email = req.query.email as string | undefined;
  if (!email) {
    res.status(400).json({ error: "email query param required" });
    return;
  }
  try {
    const orders = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.customer_email, email))
      .orderBy(ordersTable.created_at);
    res.json({ orders: orders.map(serializeOrder) });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to list orders" });
  }
});

// GET /orders/:id
router.get("/orders/:id", async (req, res) => {
  try {
    const [order] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, req.params.id))
      .limit(1);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.json({ order: serializeOrder(order) });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to get order" });
  }
});

// PATCH /orders/:id
router.patch("/orders/:id", async (req, res) => {
  const {
    status,
    account_email,
    account_password,
    activation_guide,
    expiry_date,
  } = req.body as {
    status?: string;
    account_email?: string | null;
    account_password?: string | null;
    activation_guide?: string | null;
    expiry_date?: string | null;
  };

  try {
    const [order] = await db
      .update(ordersTable)
      .set({
        ...(status !== undefined ? { status } : {}),
        ...(account_email !== undefined ? { account_email } : {}),
        ...(account_password !== undefined ? { account_password } : {}),
        ...(activation_guide !== undefined ? { activation_guide } : {}),
        ...(expiry_date !== undefined ? { expiry_date } : {}),
        updated_at: new Date(),
      })
      .where(eq(ordersTable.id, req.params.id))
      .returning();

    if (!order) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.json({ order: serializeOrder(order) });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to update order" });
  }
});

function serializeOrder(row: typeof ordersTable.$inferSelect) {
  return {
    ...row,
    unit_price: Number(row.unit_price),
    discount: Number(row.discount),
    payment_fee: Number(row.payment_fee),
    total_payment: Number(row.total_payment),
    created_at: row.created_at.toISOString(),
    updated_at: row.updated_at.toISOString(),
    pakasir_data: undefined,
  };
}

export default router;
