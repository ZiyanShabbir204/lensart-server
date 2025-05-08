import express from "express";
import {
  getUserModels,
  saveModelinDB,
} from "../controllers/modelController.js";
import { isAdminLoggedIn } from "../middleware/auth.js";
const router = express.Router();

router.post("/saveModal", isAdminLoggedIn, saveModelinDB);
router.get("/models/all", isAdminLoggedIn, getUserModels);

export default router;
