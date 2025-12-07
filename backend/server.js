const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Importa o banco SQLite
const db = require("./db");

// Mensagem inicial
app.get("/", (req, res) => {
    res.send("API do Controle de Pneus funcionando via SQLite!");
});


// ============================
// ROTAS DE VEÍCULOS
// ============================

// Listar veículos
app.get("/api/veiculos", (req, res) => {
    db.all("SELECT * FROM veiculos", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

// Criar veículo
app.post("/api/veiculos", (req, res) => {
    const { marca, modelo, ano, placa, km } = req.body;

    db.run(
        "INSERT INTO veiculos (marca, modelo, ano, placa, km) VALUES (?, ?, ?, ?, ?)",
        [marca, modelo, ano, placa, km],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Excluir veículo
app.delete("/api/veiculos/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM veiculos WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ sucesso: true });
    });
});


// ============================
// INICIAR SERVIDOR
// ============================

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
});