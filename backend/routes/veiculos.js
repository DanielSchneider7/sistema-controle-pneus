const express = require("express");
const router = express.Router();
const db = require("../db");

// Listar veículos
router.get("/", (req, res) => {
    db.all("SELECT * FROM veiculos", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

// Cadastrar veículo
router.post("/", (req, res) => {
    const { marca, modelo, ano, placa, km } = req.body;

    db.run(
        "INSERT INTO veiculos (marca, modelo, ano, placa, km) VALUES (?, ?, ?, ?, ?)",
        [marca, modelo, ano, placa, km],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });
            res.json({ id: this.lastID, ...req.body });
        }
    );
});

// Deletar veículo
router.delete("/:id", (req, res) => {
    db.run("DELETE FROM veiculos WHERE id = ?", [req.params.id], function (err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ sucesso: true });
    });
});

module.exports = router;
