import express from "express";
import mongoose from 'mongoose' // Nome correto
import dotenv from "dotenv";
dotenv.config();

import User from './models/User.js'

const app = express();

app.use(express.json());

const users = [];

// Rotas
app.get("/users", async (request, response) => {
    const users = await User.find()

    return response.status(200).json(users)
});

app.post("/users", async (request, response) => {
    const user = request.body
    
    const newUser = await User.create(user)

    return response.status(201).json(newUser)
});

// Conexão com o MongoDB
mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(() => console.log("Banco de dados conectado"))
    .catch((error) => console.log("Erro ao conectar ao banco de dados:", error));

// Inicializando o servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
