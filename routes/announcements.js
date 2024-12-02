import express from "express";
import Announcement from "../models/Announcement.js";

const router = express.Router();

// Rota GET para buscar todos os anúncios
router.get("/", async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar anúncios." });
    }
});

// Rota POST para criar um novo anúncio
router.post("/", async (req, res) => {
    try {
        const newAnnouncement = await Announcement.create(req.body);
        res.status(201).json(newAnnouncement);
    } catch (error) {
        res.status(400).json({ message: "Erro ao criar anúncio." });
    }
});

// Rota PUT para atualizar um anúncio existente
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAnnouncement) {
            return res.status(404).json({ message: "Anúncio não encontrado." });
        }
        res.status(200).json(updatedAnnouncement);
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar anúncio." });
    }
});

// Rota DELETE para remover um anúncio
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
        if (!deletedAnnouncement) {
            return res.status(404).json({ message: "Anúncio não encontrado." });
        }
        res.status(204).send(); // 204 No Content
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar anúncio." });
    }
});

export default router;