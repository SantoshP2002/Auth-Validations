import express from "express";
import registerUser from "../controller/register";
import loginUser from "../controller/login";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
