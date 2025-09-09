const express = require('express');
const db = require('../config/database');
const router = express.Router();

// GET all movies
router.get('/', (req, res) => {
    const query = 'SELECT * FROM movies ORDER BY id DESC';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching movies:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// POST new movie
router.post('/', (req, res) => {
    const { title, director, genre, release_year, rating } = req.body;
    
    if (!title || !director || !genre || !release_year) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = 'INSERT INTO movies (title, director, genre, release_year, rating) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [title, director, genre, release_year, rating || null], (err, results) => {
        if (err) {
            console.error('Error adding movie:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ 
            message: 'Movie added successfully', 
            id: results.insertId 
        });
    });
});

// PUT update movie
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, genre, release_year, rating } = req.body;
    
    const query = 'UPDATE movies SET title = ?, director = ?, genre = ?, release_year = ?, rating = ? WHERE id = ?';
    
    db.query(query, [title, director, genre, release_year, rating, id], (err, results) => {
        if (err) {
            console.error('Error updating movie:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        
        res.json({ message: 'Movie updated successfully' });
    });
});

// DELETE movie
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    const query = 'DELETE FROM movies WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting movie:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        
        res.json({ message: 'Movie deleted successfully' });
    });
});

module.exports = router;