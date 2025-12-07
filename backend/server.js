const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Rota teste
app.get("/", (req, res) => {
    res.send("API funcionando com SQLite no Render!");
});

// Rotas
app.use("/api/veiculos", require("./routes/veiculos"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
});
