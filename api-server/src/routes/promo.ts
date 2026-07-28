import { Router } from "express";

const router = Router();

// Inline promo codes — in production these would live in DB
const PROMO_CODES: Record<string, { discount: number; kind: "percent" | "flat" }> = {
  HANNKEY10: { discount: 10, kind: "percent" },
  HEMAT5K: { discount: 5000, kind: "flat" },
  NEWMEMBER: { discount: 15, kind: "percent" },
};

// POST /promo
router.post("/promo", (req, res) => {
  const { code, amount } = req.body as { code?: string; amount?: number };
  if (!code) {
    res.json({ valid: false, discount: 0, code: null });
    return;
  }

  const promo = PROMO_CODES[code.toUpperCase()];
  if (!promo) {
    res.json({ valid: false, discount: 0, code: null });
    return;
  }

  const discount =
    promo.kind === "percent"
      ? Math.round(((amount ?? 0) * promo.discount) / 100)
      : promo.discount;

  res.json({ valid: true, discount, code: code.toUpperCase() });
});

export default router;
