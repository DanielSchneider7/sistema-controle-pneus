const express = require('express');
const router = express.Router();
const pool = require('../db');

// Login simples (senhas em texto no banco — ok para protótipo/simplificado)
router.post('/login', async (req, res) => {
  try {
    const { usuario, senha } = req.body;
    const [rows] = await pool.query('SELECT id, nome, usuario, perfil FROM usuarios WHERE usuario = ? AND senha = ?', [usuario, senha]);
    if (rows.length === 0) return res.status(401).json({ message: 'Credenciais inválidas' });
    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Registro (opcional)
router.post('/register', async (req, res) => {
  try {
    const { nome, usuario, senha, perfil } = req.body;
    const [exists] = await pool.query('SELECT id FROM usuarios WHERE usuario = ?', [usuario]);
    if (exists.length > 0) return res.status(400).json({ message: 'Usuário já existe' });
    await pool.query('INSERT INTO usuarios (nome, usuario, senha, perfil) VALUES (?, ?, ?, ?)', [nome, usuario, senha, perfil || 'borracheiro']);
    return res.status(201).json({ message: 'Usuário criado' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;
