const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'cyber-tech-renorejimatthew07-f012.b.aivencloud.com',
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD || 'AVNS_jG5_uF62Hkv2gLWddRN',
  database: process.env.DB_NAME || 'defaultdb', // must exist in Aiven
  port: process.env.DB_PORT || 25948,
  ssl: {
    rejectUnauthorized: false // Aiven requires SSL
  }
};

let connection;

const createConnection = async () => {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to Aiven MySQL');
    return connection;
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
    throw error;
  }
};

const initializeDatabase = async () => {
  try {
    // Just connect directly (don’t try CREATE DATABASE on Aiven)
    connection = await createConnection();

    // Ensure users table exists
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        profile_picture VARCHAR(255),
        is_email_confirmed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(createUsersTable);
    console.log('✅ Tables initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

const getConnection = () => {
  if (!connection) {
    throw new Error('Database connection not initialized');
  }
  return connection;
};

module.exports = {
  createConnection,
  initializeDatabase,
  getConnection
};
