# 🚀 Complete Setup Guide

## Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup Environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learning-platform
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
```

### Step 3: Start MongoDB
```bash
# Option 1: Local MongoDB
mongod

# Option 2: Use MongoDB Atlas (Cloud)
# Update MONGODB_URI in .env with your Atlas connection string
```

### Step 4: Seed Sample Data (Optional)
```bash
node seedData.js
```

This creates:
- 3 sample users (2 instructors, 1 student)
- 6 sample courses with lessons

**Sample Login Credentials:**
- Instructor: `john@example.com` / `password123`
- Student: `student@example.com` / `password123`

### Step 5: Start the Server
```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

### Step 6: Open the Application
1. Open `public/index.html` in your browser
2. Or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server public -p 8000
```

Then visit: `http://localhost:8000`

---

## Detailed Setup

### MongoDB Setup Options

#### Option 1: Local MongoDB
1. Download from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

#### Option 2: MongoDB Atlas (Cloud - Recommended)
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learning-platform
```

### Testing the API

#### Using cURL
```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get all courses
curl http://localhost:5000/api/courses
```

#### Using Postman
1. Import the API endpoints
2. Set base URL: `http://localhost:5000/api`
3. For protected routes, add header:
   - Key: `Authorization`
   - Value: `Bearer YOUR_JWT_TOKEN`

### Frontend Configuration

Update API URL in JavaScript files if needed:
- `public/js/main.js`
- `public/js/auth.js`
- `public/js/courses.js`
- `public/js/dashboard.js`

Change:
```javascript
const API_URL = 'http://localhost:5000/api';
```

### Production Deployment

#### Backend (Heroku)
```bash
# Install Heroku CLI
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret_key

# Deploy
git push heroku main
```

#### Frontend (Netlify)
1. Drag and drop `public` folder to Netlify
2. Or use Netlify CLI:
```bash
npm install -g netlify-cli
cd public
netlify deploy --prod
```

#### Database (MongoDB Atlas)
Already cloud-based, no deployment needed!

### Troubleshooting

#### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `.env` or kill the process:
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 PID
```

#### CORS Error
**Solution:** Backend already has CORS enabled. If issues persist, check API_URL in frontend files.

#### JWT Token Invalid
**Solution:** 
1. Clear localStorage in browser
2. Login again
3. Check JWT_SECRET matches in `.env`

### Development Tips

#### Auto-reload Frontend
```bash
# Install live-server
npm install -g live-server

# Run in public directory
cd public
live-server
```

#### Debug Mode
```bash
# Enable debug logs
DEBUG=* npm run dev
```

#### Database GUI Tools
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Official GUI
- [Robo 3T](https://robomongo.org/) - Lightweight alternative

### Next Steps

1. ✅ Customize the design
2. ✅ Add more courses
3. ✅ Integrate payment gateway
4. ✅ Add video streaming
5. ✅ Deploy to production

### Support

Need help? 
- 📧 Email: rm2778643@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/rahul700raj/advanced-learning-platform/issues)

---

Happy Coding! 🚀