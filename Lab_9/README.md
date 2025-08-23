# 👥 User Management System

A modern, full-stack web application for comprehensive user management with registration, email confirmation, and complete CRUD operations. Built with React.js, Node.js, Express.js, and MySQL.

![User Management System](https://img.shields.io/badge/Status-Active-brightgreen) ![Version](https://img.shields.io/badge/Version-1.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Key Features

- ✅ **User Registration** with profile picture upload and real-time preview
- ✅ **Automated Email Confirmation** using Nodemailer with Gmail integration
- ✅ **Complete CRUD Operations** (Create, Read, Update, Delete users)
- ✅ **Advanced Profile Picture Management** with Multer file handling
- ✅ **RESTful API** with comprehensive endpoints
- ✅ **Responsive Design** using TailwindCSS framework
- ✅ **Real-time Input Validation** with error handling
- ✅ **Interactive Statistics Dashboard** with user analytics
- ✅ **Modern UI/UX** with toast notifications and loading states
- ✅ **Security Features** including CORS protection and input sanitization

## 🛠️ Tech Stack

### Frontend Technologies
- **React.js 18.2.0** - Modern UI library with hooks and functional components
- **TailwindCSS** - Utility-first CSS framework for responsive design
- **Axios** - Promise-based HTTP client for API calls
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library
- **React Router Dom** - Client-side routing

### Backend Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.2** - Fast, minimal web framework
- **MySQL 2** - Relational database with mysql2 driver
- **Multer** - Middleware for handling file uploads
- **Nodemailer 6.9.8** - Email sending capability
- **Express Validator** - Server-side input validation
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management
- **bcryptjs** - Password hashing (future implementation)
- **jsonwebtoken** - JWT token handling (future implementation)

## 📁 Project Architecture

```
Lab_9/ (User Management System)
├── 📁 backend/                    # Server-side application
│   ├── 📁 config/
│   │   ├── 📄 database.js         # MySQL database configuration & connection
│   │   ├── 📄 email.js            # Nodemailer email service configuration
│   │   └── 📄 multer.js           # File upload middleware setup
│   ├── 📁 controllers/
│   │   └── 📄 userController.js   # User business logic & CRUD operations
│   ├── 📁 middleware/
│   │   └── 📄 validation.js       # Express-validator rules & sanitization
│   ├── 📁 models/
│   │   └── 📄 User.js             # User data model & database queries
│   ├── 📁 routes/
│   │   └── 📄 userRoutes.js       # RESTful API endpoint definitions
│   ├── 📁 uploads/                # User profile pictures storage
│   ├── 📄 .env                    # Environment variables (not in repo)
│   ├── 📄 .env.example            # Environment template
│   ├── 📄 package.json            # Backend dependencies & scripts
│   └── 📄 server.js               # Express server entry point
├── 📁 frontend/                   # Client-side React application
│   ├── 📁 public/
│   │   ├── 📄 index.html          # Main HTML template
│   │   └── 📄 favicon.ico         # App icon
│   ├── 📁 src/
│   │   ├── 📁 components/         # Reusable React components
│   │   ├── 📁 services/           # API service functions
│   │   ├── 📄 App.jsx             # Main application component
│   │   ├── 📄 index.js            # React DOM entry point
│   │   └── 📄 index.css           # Global styles & TailwindCSS
│   ├── 📄 package.json            # Frontend dependencies & scripts
│   ├── 📄 tailwind.config.js      # TailwindCSS configuration
│   └── 📄 postcss.config.js       # PostCSS configuration
├── 📄 package.json                # Root package.json for concurrent execution
├── 📄 database_setup.sql          # MySQL database schema
├── 📄 setup.bat                   # Windows setup script
└── 📄 README.md                   # Project documentation
```

## ⚡ Quick Start Guide

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v14.0 or higher) - [Download here](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download here](https://dev.mysql.com/downloads/mysql/)
- **Git** - [Download here](https://git-scm.com/)

### 🚀 One-Click Setup (Windows)
```bash
# Clone the repository
git clone https://github.com/yourusername/user-management-system.git
cd user-management-system/Lab_9

# Run the automated setup script
setup.bat
```

### 📋 Manual Setup

#### 1. Clone & Navigate
```bash
git clone https://github.com/yourusername/user-management-system.git
cd user-management-system/Lab_9
```

#### 2. Install Root Dependencies
```bash
npm install
```

#### 3. Backend Configuration

**Install Backend Dependencies:**
```bash
cd backend
npm install
```

**Environment Setup:**
Create `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=user_management

# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:3000

# Gmail Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Security
JWT_SECRET=your_super_secure_jwt_secret_key_here
```

**Database Setup:**
```bash
# Create database
mysql -u root -p
CREATE DATABASE user_management;
exit

# Or use the provided SQL file
mysql -u root -p < database_setup.sql
```

#### 4. Frontend Configuration

**Install Frontend Dependencies:**
```bash
cd ../frontend
npm install
```

**Environment Setup (Optional):**
Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### 5. Gmail App Password Setup
1. Enable **2-Factor Authentication** on your Gmail account
2. Visit [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use this 16-character password in `EMAIL_PASS`

### 🏃‍♂️ Running the Application

#### Option 1: Run Both Services Simultaneously (Recommended)
```bash
# From the root Lab_9 directory
npm run dev
```
This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

#### Option 2: Run Services Separately

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

### 🎯 Access the Application
- **Frontend UI:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **API Documentation:** [http://localhost:5000/api](http://localhost:5000/api)

## 📋 API Endpoints

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user with profile picture |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| PUT | `/api/users/:id/confirm-email` | Confirm user email |
| GET | `/api/users/stats` | Get user statistics |

### Request Examples

#### Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "phone=1234567890" \
  -F "profile_picture=@path/to/image.jpg"
```

#### Get All Users
```bash
curl -X GET http://localhost:5000/api/users
```

#### Update User
```bash
curl -X PUT http://localhost:5000/api/users/1 \
  -F "name=John Smith" \
  -F "email=johnsmith@example.com"
```

## 🗃️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  profile_picture VARCHAR(255),
  is_email_confirmed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 📧 Email Configuration

The application supports two email authentication methods:

### Method 1: App Password (Recommended)
```javascript
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // App password
  }
});
```

### Method 2: OAuth2
```javascript
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});
```

## 📱 Features Overview

### User Registration
- Form validation for all fields
- Profile picture upload with preview
- File type and size validation
- Automatic email confirmation

### User Management
- View all registered users
- Search functionality
- Edit user information
- Delete users
- User statistics dashboard

### Profile Picture Handling
- Support for JPEG, PNG, GIF, WebP formats
- 5MB file size limit
- Automatic file cleanup on user deletion
- Preview functionality

## 🔒 Security Features

- Input validation using express-validator
- File type restrictions for uploads
- CORS protection
- Error handling middleware
- SQL injection prevention
- XSS protection

## 🎨 UI Features

- Responsive design for all devices
- Modern UI with TailwindCSS
- Loading states and animations
- Toast notifications
- Image preview functionality
- Statistics dashboard

## 🚀 Deployment

### Backend Deployment
1. Set up a MySQL database on your hosting provider
2. Update environment variables for production
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy to platforms like Netlify, Vercel, or Firebase Hosting

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support, email your-email@example.com or create an issue on GitHub.

## 🔄 Version History

- **v1.0.0** - Initial release with full CRUD functionality
- Features: User registration, email confirmation, profile picture upload
- Technologies: React.js, Node.js, Express.js, MySQL, TailwindCSS

---

**🔥 Made with ❤️ for Full Stack Development Lab 9**  
*Built by [Your Name] | MCA Student*

---

## 📊 Project Stats
- **Total Files:** 25+ source files
- **Lines of Code:** 2000+ lines
- **API Endpoints:** 7 RESTful endpoints
- **Components:** 10+ React components
- **Database Tables:** 1 optimized MySQL table

---

*For questions, improvements, or contributions, feel free to reach out!* 📧
