const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pneus ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { codigo, marca, modelo, medida, data_aquisicao, valor, vida_util } = req.body;
    const [result] = await pool.query('INSERT INTO pneus (codigo, marca, modelo, medida, data_aquisicao, valor, vida_util) VALUES (?, ?, ?, ?, ?, ?, ?)', [codigo, marca, modelo, medida, data_aquisicao || null, valor || 0, vida_util || null]);
    const [rows] = await pool.query('SELECT * FROM pneus WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE pneus SET ? WHERE id = ?', [req.body, id]);
    const [rows] = await pool.query('SELECT * FROM pneus WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM pneus WHERE id = ?', [id]);
    res.json({ message: 'Pneu removido' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
