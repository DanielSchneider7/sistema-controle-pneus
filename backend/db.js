const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Cria o arquivo do banco (ou abre se já existir)
const dbPath = path.resolve(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao conectar no SQLite:", err.message);
    } else {
        console.log("Banco SQLite conectado com sucesso.");
    }
});

// Cria tabela se não existir
db.run(`
    CREATE TABLE IF NOT EXISTS veiculos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        marca TEXT,
        modelo TEXT,
        ano INTEGER,
        placa TEXT,
        km INTEGER
    )
`);

module.exports = db;