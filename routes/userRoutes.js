import express from "express";
import { login, logout, signUp, UserData } from "../controllers/userController.js";
import { isAdminLoggedIn } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", signUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user",isAdminLoggedIn,UserData)

export default router;
