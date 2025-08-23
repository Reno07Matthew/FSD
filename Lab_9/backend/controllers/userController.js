const { validationResult } = require('express-validator');
const User = require('../models/User');
const { sendRegistrationEmail } = require('../config/email');
const { deleteFile } = require('../config/multer');
const path = require('path');

class UserController {
  // Register a new user
  static async register(req, res) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Delete uploaded file if validation fails
        if (req.file) {
          deleteFile(req.file.filename);
        }
        return res.status(400).json({
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const { name, email, phone } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        // Delete uploaded file if user exists
        if (req.file) {
          deleteFile(req.file.filename);
        }
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Get profile picture path if uploaded
      const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

      // Create new user
      const userData = {
        name,
        email,
        phone,
        profile_picture: profilePicture,
        is_email_confirmed: false
      };

      const user = new User(userData);
      const savedUser = await user.save();

      // Send registration email
      const emailResult = await sendRegistrationEmail(email, name);
      
      if (emailResult.success) {
        // Update email confirmation status (simulate immediate confirmation for demo)
        await User.confirmEmail(savedUser.id);
      }

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
          phone: savedUser.phone,
          profile_picture: savedUser.profile_picture,
          is_email_confirmed: emailResult.success
        },
        emailSent: emailResult.success
      });

    } catch (error) {
      // Delete uploaded file if error occurs
      if (req.file) {
        deleteFile(req.file.filename);
      }
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal server error during registration' });
    }
  }

  // Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json({
        message: 'Users retrieved successfully',
        count: users.length,
        users
      });
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get user by ID
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        message: 'User retrieved successfully',
        user
      });
    } catch (error) {
      console.error('Get user by ID error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update user
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        // Delete uploaded file if validation fails
        if (req.file) {
          deleteFile(req.file.filename);
        }
        return res.status(400).json({
          error: 'Validation failed',
          details: errors.array()
        });
      }

      // Check if user exists
      const existingUser = await User.findById(id);
      if (!existingUser) {
        // Delete uploaded file if user doesn't exist
        if (req.file) {
          deleteFile(req.file.filename);
        }
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if email is being changed and if it's already taken
      if (req.body.email && req.body.email !== existingUser.email) {
        const emailTaken = await User.findByEmail(req.body.email);
        if (emailTaken) {
          if (req.file) {
            deleteFile(req.file.filename);
          }
          return res.status(400).json({ error: 'Email already taken by another user' });
        }
      }

      // Prepare update data
      const updateData = {};
      if (req.body.name) updateData.name = req.body.name;
      if (req.body.email) updateData.email = req.body.email;
      if (req.body.phone) updateData.phone = req.body.phone;
      
      // Handle profile picture update
      if (req.file) {
        // Delete old profile picture if exists
        if (existingUser.profile_picture) {
          deleteFile(existingUser.profile_picture);
        }
        updateData.profile_picture = `/uploads/${req.file.filename}`;
      }

      // Update user
      const updated = await User.updateById(id, updateData);
      
      if (!updated) {
        return res.status(404).json({ error: 'User not found or no changes made' });
      }

      // Get updated user data
      const updatedUser = await User.findById(id);
      
      res.json({
        message: 'User updated successfully',
        user: updatedUser
      });

    } catch (error) {
      // Delete uploaded file if error occurs
      if (req.file) {
        deleteFile(req.file.filename);
      }
      console.error('Update user error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Delete user
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      
      // Get user to delete profile picture
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Delete user from database
      const deleted = await User.deleteById(id);
      
      if (deleted) {
        // Delete profile picture file if exists
        if (user.profile_picture) {
          deleteFile(user.profile_picture);
        }
        
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get user statistics
  static async getUserStats(req, res) {
    try {
      const stats = await User.getStats();
      res.json({
        message: 'User statistics retrieved successfully',
        stats
      });
    } catch (error) {
      console.error('Get user stats error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Confirm user email
  static async confirmEmail(req, res) {
    try {
      const { id } = req.params;
      
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.is_email_confirmed) {
        return res.json({ message: 'Email already confirmed' });
      }

      const confirmed = await User.confirmEmail(id);
      
      if (confirmed) {
        res.json({ message: 'Email confirmed successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Confirm email error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = UserController;
