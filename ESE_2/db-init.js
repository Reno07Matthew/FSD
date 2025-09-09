const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
});

const initSQL = `
CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};
USE ${process.env.DB_NAME};

CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    release_year INT NOT NULL,
    rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 10)
);

INSERT INTO movies (title, director, genre, release_year, rating) VALUES
('The Shawshank Redemption', 'Frank Darabont', 'Drama', 1994, 9.3),
('The Godfather', 'Francis Ford Coppala', 'Crime', 1972, 9.2),
('The Dark Knight', 'Christopher Nolan', 'Action', 2008, 9.0),
('Pulp Fiction', 'Quentin Tarantino', 'Crime', 1994, 8.9),
('Forrest Gump', 'Robert Zemeckis', 'Drama', 1994, 8.8);
`;

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    
    console.log('Connected to MySQL server');
    
    connection.query(initSQL, (err) => {
        if (err) {
            console.error('Error initializing database:', err);
        } else {
            console.log('Database initialized successfully');
        }
        connection.end();
    });
});
