import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

router.post("/", async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
});

// Exporta as rotas
export default router;
