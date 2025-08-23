-- User Management System Database Setup
-- Run this script in your MySQL database

-- Create database
CREATE DATABASE IF NOT EXISTS user_management;

-- Use the database
USE user_management;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    profile_picture VARCHAR(255) DEFAULT NULL,
    is_email_confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);

-- Insert sample data (optional)
INSERT INTO users (name, email, phone, is_email_confirmed) VALUES
('John Doe', 'john.doe@example.com', '1234567890', TRUE),
('Jane Smith', 'jane.smith@example.com', '0987654321', FALSE),
('Mike Johnson', 'mike.johnson@example.com', '5551234567', TRUE);

-- Show table structure
DESCRIBE users;

-- Show sample data
SELECT * FROM users;

-- Create user for application (optional - adjust privileges as needed)
-- CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_password';
-- GRANT SELECT, INSERT, UPDATE, DELETE ON user_management.* TO 'app_user'@'localhost';
-- FLUSH PRIVILEGES;

-- Success message
SELECT 'Database setup completed successfully!' AS message;
