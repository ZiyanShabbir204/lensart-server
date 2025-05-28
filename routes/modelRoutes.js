import express from "express";
import {
  addFavourite,
  deleteModel,
  getAllFavourite,
  getModelById,
  getUserModels,
  removeFavourite,
  saveModelinDB,
} from "../controllers/modelController.js";
import { isAdminLoggedIn } from "../middleware/auth.js";
const router = express.Router();

router.post("/save", saveModelinDB);
router.get("/all", getUserModels);
router.get("/:id", getModelById);
router.post("/favourite",addFavourite)
router.get("/favourite/all",getAllFavourite)
router.delete("/favourite",removeFavourite)
router.delete("/",deleteModel)

export default router;
