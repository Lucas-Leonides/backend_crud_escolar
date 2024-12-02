import express from "express";
import GeneralNotice from "../models/GeneralNotice.js";

const router = express.Router();

// Rota GET para buscar todas as anotações
router.get("/", async (req, res) => {
    try {
        const notices = await GeneralNotice.find();
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar anotações." });
    }
});

// Rota POST para criar uma nova anotação
router.post("/", async (req, res) => {
    try {
        const newNotice = await GeneralNotice.create(req.body);
        res.status(201).json(newNotice);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar anotação." });
    }
});

// Rota PUT para atualizar uma anotação existente
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedNotice = await GeneralNotice.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedNotice) {
            return res.status(404).json({ message: "Anotação não encontrada." });
        }
        res.status(200).json(updatedNotice);
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar anotação." });
    }
});

// Rota DELETE para remover uma anotação
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNotice = await GeneralNotice.findByIdAndDelete(id);
        if (!deletedNotice) {
            return res.status(404).json({ message: "Anotação não encontrada." });
        }
        res.status(204).send(); // 204 No Content
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar anotação." });
    }
});

export default router;