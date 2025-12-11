const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
require('dotenv').config();

// Sample data
const sampleUsers = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'instructor',
        bio: 'Full Stack Developer with 10+ years of experience'
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'instructor',
        bio: 'Data Science Expert and ML Engineer'
    },
    {
        name: 'Student User',
        email: 'student@example.com',
        password: 'password123',
        role: 'student'
    }
];

const sampleCourses = [
    {
        title: 'Complete Web Development Bootcamp',
        description: 'Master HTML, CSS, JavaScript, React, Node.js and build 20+ real-world projects. This comprehensive course covers everything from basics to advanced topics.',
        category: 'Web Development',
        level: 'Beginner',
        price: 2999,
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
        duration: 50,
        language: 'English',
        requirements: ['Basic computer knowledge', 'Internet connection', 'Willingness to learn'],
        whatYouWillLearn: [
            'HTML5 and CSS3 fundamentals',
            'JavaScript ES6+ features',
            'React.js for frontend',
            'Node.js and Express for backend',
            'MongoDB database',
            'Build and deploy full-stack applications'
        ],
        isPublished: true,
        lessons: [
            {
                title: 'Introduction to Web Development',
                content: 'Learn the basics of web development and set up your development environment.',
                duration: 30,
                order: 1
            },
            {
                title: 'HTML Fundamentals',
                content: 'Master HTML tags, elements, and semantic markup.',
                duration: 45,
                order: 2
            },
            {
                title: 'CSS Styling',
                content: 'Learn CSS selectors, properties, and responsive design.',
                duration: 60,
                order: 3
            }
        ]
    },
    {
        title: 'Python for Data Science & Machine Learning',
        description: 'Learn Python programming, data analysis with Pandas, visualization with Matplotlib, and build machine learning models with Scikit-learn.',
        category: 'Data Science',
        level: 'Intermediate',
        price: 3499,
        thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
        duration: 45,
        language: 'English',
        requirements: ['Basic programming knowledge', 'Mathematics fundamentals'],
        whatYouWillLearn: [
            'Python programming basics',
            'NumPy for numerical computing',
            'Pandas for data analysis',
            'Data visualization with Matplotlib and Seaborn',
            'Machine learning algorithms',
            'Build predictive models'
        ],
        isPublished: true,
        lessons: [
            {
                title: 'Python Basics',
                content: 'Introduction to Python syntax and data types.',
                duration: 40,
                order: 1
            },
            {
                title: 'NumPy Arrays',
                content: 'Working with NumPy arrays and operations.',
                duration: 50,
                order: 2
            }
        ]
    },
    {
        title: 'React Native - Mobile App Development',
        description: 'Build beautiful native mobile applications for iOS and Android using React Native, Redux for state management, and Firebase for backend.',
        category: 'Mobile Development',
        level: 'Intermediate',
        price: 2499,
        thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
        duration: 35,
        language: 'English',
        requirements: ['JavaScript knowledge', 'React basics', 'Node.js installed'],
        whatYouWillLearn: [
            'React Native fundamentals',
            'Component-based architecture',
            'Navigation in mobile apps',
            'State management with Redux',
            'Firebase integration',
            'Publish apps to App Store and Play Store'
        ],
        isPublished: true,
        lessons: [
            {
                title: 'React Native Setup',
                content: 'Setting up React Native development environment.',
                duration: 35,
                order: 1
            }
        ]
    },
    {
        title: 'Advanced JavaScript & TypeScript',
        description: 'Deep dive into modern JavaScript ES6+, TypeScript, design patterns, and advanced programming concepts.',
        category: 'Web Development',
        level: 'Advanced',
        price: 1999,
        thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
        duration: 30,
        language: 'English',
        isPublished: true
    },
    {
        title: 'DevOps with Docker & Kubernetes',
        description: 'Master containerization with Docker, orchestration with Kubernetes, CI/CD pipelines, and cloud deployment strategies.',
        category: 'DevOps',
        level: 'Advanced',
        price: 3999,
        thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400',
        duration: 40,
        language: 'English',
        isPublished: true
    },
    {
        title: 'Cybersecurity Fundamentals',
        description: 'Learn ethical hacking, network security, cryptography, penetration testing, and security best practices.',
        category: 'Cybersecurity',
        level: 'Beginner',
        price: 2799,
        thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
        duration: 38,
        language: 'English',
        isPublished: true
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/learning-platform', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Course.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create users
        const users = await User.create(sampleUsers);
        console.log(`✅ Created ${users.length} users`);

        // Assign instructors to courses
        const instructors = users.filter(u => u.role === 'instructor');
        const coursesWithInstructors = sampleCourses.map((course, index) => ({
            ...course,
            instructor: instructors[index % instructors.length]._id
        }));

        // Create courses
        const courses = await Course.create(coursesWithInstructors);
        console.log(`✅ Created ${courses.length} courses`);

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📝 Sample Login Credentials:');
        console.log('Instructor: john@example.com / password123');
        console.log('Instructor: jane@example.com / password123');
        console.log('Student: student@example.com / password123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run seeder
seedDatabase();