const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    const notes = db.prepare('SELECT * FROM notes').all()
    res.json(notes);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const note = db.prepare('SELECT * FROM notes where id = ?').get(id);
    res.json(note);
});

router.post('/', (req, res) => {
    const { title, content } = req.body;
    const result = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)').run(title, content);
    res.json({ id: result.lastInsertRowid })
    // const newNote = db.prepare('SELECT * FROM notes WHERE id = ?').get(result.lastInsertRowid)
    // res.json(newNote)
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const result = db.prepare('UPDATE notes set title = ?, content = ? WHERE id = ? ').run(title, content, id);
    const updatedNote = db.prepare('SELECT * FROM notes WHERE id = ?').get(id)
    res.json(updatedNote)
}); 

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const result = db.prepare('DELETE FROM notes  WHERE id = ? ').run(id);
    res.json({ message: 'Note deleted' });
})

module.exports = router;