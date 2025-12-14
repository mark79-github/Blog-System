import {Router} from "express";
import * as healthController from "../controllers/healthController.js";

const router = Router();

router.get("/", healthController.liveness);
router.get("/ready", healthController.readiness);

export default router;
