# 🎓 Advanced Learning Platform

A comprehensive e-learning platform built with modern web technologies, featuring a complete backend API, database integration, and a beautiful responsive frontend.

## ✨ Features

### Frontend
- 🎨 **Modern UI** with Tailwind CSS
- 📱 **Fully Responsive** design for all devices
- 🔐 **User Authentication** (Login/Register)
- 📚 **Course Catalog** with advanced filtering
- 👤 **User Dashboard** with progress tracking
- 🎯 **Course Enrollment** system
- ⭐ **Rating & Reviews** functionality
- 📊 **Progress Tracking** with visual indicators
- 🏆 **Certificate Generation** on course completion

### Backend
- 🚀 **RESTful API** with Express.js
- 🗄️ **MongoDB Database** for data persistence
- 🔒 **JWT Authentication** for secure access
- 👥 **User Management** (Students, Instructors, Admins)
- 📖 **Course Management** (CRUD operations)
- 📝 **Enrollment System** with payment tracking
- 💬 **Review System** with ratings
- 🔍 **Advanced Search** and filtering

## 🛠️ Tech Stack

### Frontend
- HTML5
- Tailwind CSS
- JavaScript (ES6+)
- Font Awesome Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/rahul700raj/advanced-learning-platform.git
cd advanced-learning-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learning-platform
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

5. **Run the application**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

6. **Access the application**
- Frontend: Open `public/index.html` in your browser
- API: `http://localhost:5000/api`

## 📁 Project Structure

```
advanced-learning-platform/
├── models/
│   ├── User.js              # User model with authentication
│   ├── Course.js            # Course model with lessons
│   └── Enrollment.js        # Enrollment tracking model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── courses.js           # Course management routes
│   ├── users.js             # User profile routes
│   └── enrollments.js       # Enrollment routes
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── public/
│   ├── index.html           # Homepage
│   ├── courses.html         # Course catalog
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   ├── dashboard.html       # User dashboard
│   ├── css/
│   │   └── style.css        # Custom styles
│   └── js/
│       ├── main.js          # Main JavaScript
│       ├── auth.js          # Authentication logic
│       ├── courses.js       # Course page logic
│       └── dashboard.js     # Dashboard logic
├── server.js                # Express server setup
├── package.json             # Dependencies
└── README.md               # Documentation
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (instructor only)
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `POST /api/courses/:id/reviews` - Add review

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users` - Get all users (admin only)

### Enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments/my-courses` - Get user enrollments
- `PUT /api/enrollments/:id/progress` - Update progress

## 🎯 Usage

### For Students
1. Register/Login to your account
2. Browse available courses
3. Filter by category, level, or search
4. Enroll in courses
5. Track your progress in the dashboard
6. Complete courses and earn certificates

### For Instructors
1. Register as an instructor
2. Create and manage courses
3. Add lessons and content
4. Track student enrollments
5. View course reviews and ratings

### For Admins
1. Manage all users
2. Oversee all courses
3. Monitor platform activity
4. Handle user permissions

## 🚀 Deployment

### Frontend Deployment
Deploy the `public` folder to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

### Backend Deployment
Deploy to platforms like:
- Heroku
- Railway
- DigitalOcean
- AWS EC2

### Database
Use MongoDB Atlas for cloud database hosting.

## 💡 Features to Add

- [ ] Video streaming integration
- [ ] Live chat support
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Email notifications
- [ ] Social media login
- [ ] Course recommendations
- [ ] Discussion forums
- [ ] Quiz and assignments
- [ ] Mobile app (React Native)
- [ ] Admin panel

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Rahul Mishra**
- Email: rm2778643@gmail.com
- GitHub: [@rahul700raj](https://github.com/rahul700raj)

## 🙏 Acknowledgments

- Tailwind CSS for the amazing utility-first CSS framework
- Font Awesome for beautiful icons
- MongoDB for the flexible database
- Express.js for the robust backend framework

## 📞 Support

For support, email rm2778643@gmail.com or create an issue in the repository.

---

⭐ Star this repo if you find it helpful!

Built with ❤️ by Rahul Mishra