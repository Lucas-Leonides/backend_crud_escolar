import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const students = await Student.find();
    res.status(200).json(students);
});

router.post("/", async (req, res) => {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
});

router.put("/:id", async (req, res) => {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedStudent);
});

router.delete("/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

export default router;
