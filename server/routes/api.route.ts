import { Router } from "express";
import authRoutes from "./auth.route";
import healthRoutes from "./health.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/health", healthRoutes);

export default router;
