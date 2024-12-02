import app from "./app.js";

const PORT = process.env.PORT || 3000;
const IP = process.env.IP

app.listen(PORT, IP, () => { // Adicione '0.0.0.0' aqui
    console.log(`Servidor rodando na porta ${PORT}`);
});