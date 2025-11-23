const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT m.*, v.placa AS veiculo_placa FROM manutencoes m LEFT JOIN veiculos v ON m.veiculo_id = v.id ORDER BY m.data DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { pneu_id, tipo, data, custo, descricao, veiculo_id } = req.body;
    const [result] = await pool.query('INSERT INTO manutencoes (tipo, data, custo, descricao, veiculo_id) VALUES (?, ?, ?, ?, ?)', [tipo, data, custo || 0, descricao || null, veiculo_id || null]);
    // associação pneu -> manutenção se precisar (simplificado: não criamos tabela extra aqui)
    const [rows] = await pool.query('SELECT * FROM manutencoes WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
