const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const moviesRoutes = require('./routes/movies');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration - MOVED TO TOP
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [https://fsd-oqt6.vercel.app/'] 
    : ['http://localhost:3000', 'http://localhost:3001'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Other Middleware
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
