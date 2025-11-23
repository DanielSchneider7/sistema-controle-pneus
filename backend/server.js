const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Teste da conexão
db.connect((err) => {
    if (err) {
        console.log("Erro ao conectar ao banco:", err);
        return;
    }
    console.log("Conectado ao MySQL!");
});

// Rota de teste
app.get('/', (req, res) => {
    res.send("API do Controle de Pneus funcionando!");
});

// 🔥 ADICIONAR AS ROTAS (AQUI ESTÁ O QUE FALTAVA)
app.use("/api/veiculos", require("./routes/veiculos"));
app.use("/api/pneus", require("./routes/pneus"));

// Inicia servidor
app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});
