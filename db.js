const Database = require('better-sqlite3');


const db = new Database('notes.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS notes
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT, 
    content TEXT)`);



module.exports = db;