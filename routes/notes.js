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
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
});

router.post('/', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'title and content are required' });
    const result = db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)').run(title, content);
    res.json({ id: result.lastInsertRowid });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'title and content are required' });
    const existing = db.prepare('SELECT * FROM notes WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ error: 'Note not found' });
    db.prepare('UPDATE notes set title = ?, content = ? WHERE id = ?').run(title, content, id);
    const updatedNote = db.prepare('SELECT * FROM notes WHERE id = ?').get(id);
    res.json(updatedNote);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const existing = db.prepare('SELECT * FROM notes WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ error: 'Note not found' });
    db.prepare('DELETE FROM notes WHERE id = ?').run(id);
    res.json({ message: 'Note deleted' });
})

module.exports = router;