# Render + Aiven Deployment Guide

## 🚀 Complete Deployment Steps

### Phase 1: Database Setup (Aiven)

#### 1. Create Aiven Account
1. Go to [aiven.io](https://aiven.io)
2. Sign up for free account
3. Verify your email

#### 2. Create MySQL Database
1. Click "Create Service"
2. Select "MySQL"
3. Choose "Startup-1" plan (Free for 1 month)
4. Select region closest to you
5. Name your service: `user-management-db`
6. Click "Create Service"

#### 3. Get Database Credentials
After deployment (5-10 minutes):
1. Go to your MySQL service
2. Click "Connection Information"
3. Copy these values:
   - Host
   - Port  
   - User
   - Password
   - Database name

#### 4. Setup Database Schema
1. Use Aiven Console or MySQL Workbench
2. Connect using the credentials
3. Run your database_setup.sql file

### Phase 2: Backend Deployment (Render)

#### 1. Push Code to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

#### 2. Deploy Backend on Render
1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Name**: `user-management-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest
   - **Branch**: `main`
   - **Root Directory**: `Lab_9/backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### 3. Add Environment Variables
In Render dashboard, add these environment variables:

```
DB_HOST=your-aiven-mysql-host
DB_USER=your-aiven-username  
DB_PASSWORD=your-aiven-password
DB_NAME=your-aiven-database-name
DB_PORT=your-aiven-port
PORT=10000
EMAIL_USER=rinoreji07@gmail.com
EMAIL_PASS=frhlqwodpswmxrqm
JWT_SECRET=my_super_secure_jwt_secret_key_2025_user_management_system
FRONTEND_URL=https://your-frontend-name.onrender.com
```

#### 4. Deploy Backend
Click "Create Web Service" - Render will build and deploy automatically.

### Phase 3: Frontend Deployment (Render)

#### 1. Prepare Frontend
Update frontend environment for production:

Create `Lab_9/frontend/.env.production`:
```
REACT_APP_API_URL=https://your-backend-name.onrender.com/api
```

#### 2. Deploy Frontend on Render
1. In Render dashboard: "New +" → "Static Site"
2. Connect same GitHub repo
3. Configure:
   - **Name**: `user-management-frontend`
   - **Branch**: `main`
   - **Root Directory**: `Lab_9/frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

#### 3. Deploy Frontend
Click "Create Static Site"

### Phase 4: Final Configuration

#### 1. Update Backend CORS
Update your backend's FRONTEND_URL environment variable with your actual frontend URL:
```
FRONTEND_URL=https://your-frontend-name.onrender.com
```

#### 2. Test Application
1. Visit your frontend URL
2. Test user registration
3. Check email functionality
4. Verify CRUD operations

## 🔧 Alternative: Single Render Deployment

### Option: Deploy as Monorepo
1. Create build script in root package.json
2. Deploy entire project to Render
3. Serve frontend from backend (Express static)

### Root package.json additions:
```json
{
  "scripts": {
    "build": "cd frontend && npm install && npm run build",
    "start": "cd backend && npm install && npm start",
    "heroku-postbuild": "npm run build"
  }
}
```

## 🌐 Expected URLs
- **Frontend**: `https://user-management-frontend.onrender.com`
- **Backend**: `https://user-management-backend.onrender.com`
- **Database**: Aiven MySQL instance

## 🚨 Important Notes
1. **Free Tier Limitations**: 
   - Render: Services sleep after 15 min of inactivity
   - Aiven: 1 month free trial
2. **Cold Start**: First request may take 30+ seconds
3. **Environment Variables**: Double-check all values
4. **CORS**: Ensure frontend URL is in backend CORS settings

## 🔍 Troubleshooting
- Check Render logs for deployment errors
- Verify database connectivity in Aiven console
- Test API endpoints directly before frontend
- Ensure file upload folder permissions

---
**Deployment usually takes 10-20 minutes total** ⏱️
