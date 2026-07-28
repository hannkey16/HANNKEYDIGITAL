import { Router, type IRouter } from "express";
import healthRouter from "./health";
import ordersRouter from "./orders";
import paymentRouter from "./payment";
import promoRouter from "./promo";

const router: IRouter = Router();

router.use(healthRouter);
router.use(ordersRouter);
router.use(paymentRouter);
router.use(promoRouter);

export default router;
