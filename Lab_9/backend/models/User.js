const { getConnection } = require('../config/database');

class User {
  constructor(data) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.profile_picture = data.profile_picture;
    this.is_email_confirmed = data.is_email_confirmed || false;
  }

  // Create a new user
  async save() {
    try {
      const connection = getConnection();
      const query = `
        INSERT INTO users (name, email, phone, profile_picture, is_email_confirmed)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await connection.execute(query, [
        this.name,
        this.email,
        this.phone,
        this.profile_picture,
        this.is_email_confirmed
      ]);
      
      return { id: result.insertId, ...this };
    } catch (error) {
      throw error;
    }
  }

  // Find all users
  static async findAll() {
    try {
      const connection = getConnection();
      const query = 'SELECT * FROM users ORDER BY created_at DESC';
      const [rows] = await connection.execute(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const connection = getConnection();
      const query = 'SELECT * FROM users WHERE id = ?';
      const [rows] = await connection.execute(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      const connection = getConnection();
      const query = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await connection.execute(query, [email]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Update user by ID
  static async updateById(id, updateData) {
    try {
      const connection = getConnection();
      
      // Build dynamic query based on provided fields
      const fields = [];
      const values = [];
      
      Object.keys(updateData).forEach(key => {
        if (updateData[key] !== undefined) {
          fields.push(`${key} = ?`);
          values.push(updateData[key]);
        }
      });
      
      if (fields.length === 0) {
        throw new Error('No fields to update');
      }
      
      values.push(id);
      const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
      
      const [result] = await connection.execute(query, values);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete user by ID
  static async deleteById(id) {
    try {
      const connection = getConnection();
      const query = 'DELETE FROM users WHERE id = ?';
      const [result] = await connection.execute(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Confirm email
  static async confirmEmail(id) {
    try {
      const connection = getConnection();
      const query = 'UPDATE users SET is_email_confirmed = TRUE WHERE id = ?';
      const [result] = await connection.execute(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Get user statistics
  static async getStats() {
    try {
      const connection = getConnection();
      const totalQuery = 'SELECT COUNT(*) as total FROM users';
      const confirmedQuery = 'SELECT COUNT(*) as confirmed FROM users WHERE is_email_confirmed = TRUE';
      
      const [totalResult] = await connection.execute(totalQuery);
      const [confirmedResult] = await connection.execute(confirmedQuery);
      
      return {
        total: totalResult[0].total,
        confirmed: confirmedResult[0].confirmed,
        unconfirmed: totalResult[0].total - confirmedResult[0].confirmed
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
