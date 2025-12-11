const API_URL = 'http://localhost:5000/api';

let allCourses = [];

// Load all courses
async function loadCourses() {
    try {
        const response = await fetch(`${API_URL}/courses`);
        const data = await response.json();
        
        if (data.success && data.courses) {
            allCourses = data.courses;
            displayCourses(allCourses);
        } else {
            loadSampleCourses();
        }
    } catch (error) {
        console.error('Error loading courses:', error);
        loadSampleCourses();
    } finally {
        document.getElementById('loading').classList.add('hidden');
    }
}

// Display courses
function displayCourses(courses) {
    const grid = document.getElementById('courses-grid');
    const noResults = document.getElementById('no-results');
    
    if (courses.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    grid.innerHTML = courses.map(course => createCourseCard(course)).join('');
}

// Create course card
function createCourseCard(course) {
    return `
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
            <img src="${course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'}" 
                 alt="${course.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                    <span class="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                        ${course.category || 'Programming'}
                    </span>
                    <span class="bg-${getLevelColor(course.level)}-100 text-${getLevelColor(course.level)}-600 px-3 py-1 rounded-full text-sm font-medium">
                        ${course.level || 'Beginner'}
                    </span>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">${course.title}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3">${course.description}</p>
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center text-gray-500">
                        <i class="fas fa-user-circle mr-2"></i>
                        <span class="text-sm">${course.instructor?.name || 'Expert'}</span>
                    </div>
                    <div class="flex items-center text-yellow-500">
                        <i class="fas fa-star mr-1"></i>
                        <span class="font-medium">${course.rating || '4.8'}</span>
                    </div>
                </div>
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center text-gray-500 text-sm">
                        <i class="fas fa-clock mr-2"></i>
                        <span>${course.duration || '40'} hours</span>
                    </div>
                    <div class="flex items-center text-gray-500 text-sm">
                        <i class="fas fa-users mr-2"></i>
                        <span>${course.enrolledStudents?.length || '1.2k'} students</span>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-2xl font-bold text-indigo-600">
                        ${course.price === 0 ? 'Free' : `₹${course.price}`}
                    </div>
                    <button onclick="enrollCourse('${course._id}')" 
                            class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Get level color
function getLevelColor(level) {
    const colors = {
        'Beginner': 'green',
        'Intermediate': 'yellow',
        'Advanced': 'red'
    };
    return colors[level] || 'blue';
}

// Filter courses
function filterCourses() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const level = document.getElementById('level-filter').value;
    
    let filtered = allCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(search) || 
                            course.description.toLowerCase().includes(search);
        const matchesCategory = !category || course.category === category;
        const matchesLevel = !level || course.level === level;
        
        return matchesSearch && matchesCategory && matchesLevel;
    });
    
    displayCourses(filtered);
}

// Enroll in course
async function enrollCourse(courseId) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert('Please login to enroll in courses');
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/enrollments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ courseId })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Successfully enrolled in the course!');
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message || 'Enrollment failed');
        }
    } catch (error) {
        console.error('Enrollment error:', error);
        alert('Network error. Please try again.');
    }
}

// Load sample courses (fallback)
function loadSampleCourses() {
    allCourses = [
        {
            _id: '1',
            title: 'Complete Web Development Bootcamp',
            description: 'Master HTML, CSS, JavaScript, React, Node.js and build 20+ real-world projects',
            category: 'Web Development',
            level: 'Beginner',
            rating: 4.9,
            price: 2999,
            duration: 50,
            thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400'
        },
        {
            _id: '2',
            title: 'Python for Data Science & Machine Learning',
            description: 'Learn Python, NumPy, Pandas, Matplotlib, Scikit-learn and build ML models',
            category: 'Data Science',
            level: 'Intermediate',
            rating: 4.8,
            price: 3499,
            duration: 45,
            thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400'
        },
        {
            _id: '3',
            title: 'React Native - Mobile App Development',
            description: 'Build iOS and Android apps with React Native, Redux and Firebase',
            category: 'Mobile Development',
            level: 'Intermediate',
            rating: 4.7,
            price: 2499,
            duration: 35,
            thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400'
        },
        {
            _id: '4',
            title: 'Advanced JavaScript & TypeScript',
            description: 'Deep dive into modern JavaScript, ES6+, TypeScript and design patterns',
            category: 'Web Development',
            level: 'Advanced',
            rating: 4.9,
            price: 1999,
            duration: 30,
            thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400'
        },
        {
            _id: '5',
            title: 'DevOps with Docker & Kubernetes',
            description: 'Master containerization, orchestration, CI/CD pipelines and cloud deployment',
            category: 'DevOps',
            level: 'Advanced',
            rating: 4.8,
            price: 3999,
            duration: 40,
            thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400'
        },
        {
            _id: '6',
            title: 'Cybersecurity Fundamentals',
            description: 'Learn ethical hacking, network security, cryptography and penetration testing',
            category: 'Cybersecurity',
            level: 'Beginner',
            rating: 4.7,
            price: 2799,
            duration: 38,
            thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400'
        },
        {
            _id: '7',
            title: 'Full Stack MERN Development',
            description: 'Build complete web applications with MongoDB, Express, React and Node.js',
            category: 'Web Development',
            level: 'Intermediate',
            rating: 4.9,
            price: 3299,
            duration: 55,
            thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400'
        },
        {
            _id: '8',
            title: 'AI & Deep Learning with TensorFlow',
            description: 'Master neural networks, CNNs, RNNs and build AI applications',
            category: 'AI/ML',
            level: 'Advanced',
            rating: 4.8,
            price: 4499,
            duration: 60,
            thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400'
        },
        {
            _id: '9',
            title: 'Flutter - Cross Platform Development',
            description: 'Build beautiful native apps for iOS and Android with Flutter and Dart',
            category: 'Mobile Development',
            level: 'Beginner',
            rating: 4.7,
            price: 2299,
            duration: 32,
            thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400'
        }
    ];
    
    displayCourses(allCourses);
}

// Event listeners
document.getElementById('filter-btn')?.addEventListener('click', filterCourses);
document.getElementById('search-input')?.addEventListener('input', filterCourses);

// Initialize
loadCourses();