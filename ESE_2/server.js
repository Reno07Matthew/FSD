const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const moviesRoutes = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/movies', moviesRoutes);

// Serve HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});