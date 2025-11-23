const express = require('express');
const router = express.Router();
const pool = require('../db');

// LISTAR VEÍCULOS
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM veiculos ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// CADASTRAR VEÍCULO
router.post('/', async (req, res) => {
console.log("Recebido no backend:", req.body);

  try {
    const { placa, modelo, marca, ano, quilometragem } = req.body;

    const [result] = await pool.query(
      'INSERT INTO veiculos (placa, modelo, marca, ano, km) VALUES (?, ?, ?, ?, ?)',
      [placa, modelo, marca, ano, quilometragem || 0]
    );

    const [rows] = await pool.query('SELECT * FROM veiculos WHERE id = ?', [
      result.insertId,
    ]);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// EDITAR VEÍCULO
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const campos = req.body;
    await pool.query('UPDATE veiculos SET ? WHERE id = ?', [campos, id]);

    const [rows] = await pool.query(
      'SELECT * FROM veiculos WHERE id = ?', 
      [id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// EXCLUIR VEÍCULO
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM veiculos WHERE id = ?', [id]);
    res.json({ message: 'Veículo removido' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
