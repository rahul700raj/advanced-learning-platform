// API Base URL
const API_URL = 'http://localhost:5000/api';

// Mobile Menu Toggle
document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Load Popular Courses on Homepage
async function loadPopularCourses() {
    try {
        const response = await fetch(`${API_URL}/courses?limit=6`);
        const data = await response.json();
        
        const container = document.getElementById('courses-container');
        if (!container) return;

        if (data.courses && data.courses.length > 0) {
            container.innerHTML = data.courses.map(course => createCourseCard(course)).join('');
        } else {
            // Show sample courses if API is not running
            container.innerHTML = getSampleCourses();
        }
    } catch (error) {
        console.error('Error loading courses:', error);
        // Show sample courses on error
        const container = document.getElementById('courses-container');
        if (container) container.innerHTML = getSampleCourses();
    }
}

// Create Course Card HTML
function createCourseCard(course) {
    return `
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src="${course.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400'}" 
                 alt="${course.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                        ${course.category || 'Programming'}
                    </span>
                    <span class="text-yellow-500">
                        <i class="fas fa-star"></i> ${course.rating || '4.8'}
                    </span>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">${course.title}</h3>
                <p class="text-gray-600 mb-4 line-clamp-2">${course.description}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center text-gray-500">
                        <i class="fas fa-user-circle mr-2"></i>
                        <span class="text-sm">${course.instructor?.name || 'Expert Instructor'}</span>
                    </div>
                    <div class="text-2xl font-bold text-indigo-600">
                        ${course.price === 0 ? 'Free' : `₹${course.price}`}
                    </div>
                </div>
                <a href="course-detail.html?id=${course._id}" 
                   class="mt-4 block w-full bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition">
                    View Course
                </a>
            </div>
        </div>
    `;
}

// Sample Courses (fallback when API is not available)
function getSampleCourses() {
    const sampleCourses = [
        {
            title: 'Complete Web Development Bootcamp',
            description: 'Master HTML, CSS, JavaScript, React, Node.js and build real-world projects',
            category: 'Web Development',
            rating: 4.9,
            price: 2999,
            thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400'
        },
        {
            title: 'Python for Data Science & Machine Learning',
            description: 'Learn Python, NumPy, Pandas, Matplotlib, Scikit-learn and build ML models',
            category: 'Data Science',
            rating: 4.8,
            price: 3499,
            thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400'
        },
        {
            title: 'React Native - Mobile App Development',
            description: 'Build iOS and Android apps with React Native and JavaScript',
            category: 'Mobile Development',
            rating: 4.7,
            price: 2499,
            thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400'
        },
        {
            title: 'Advanced JavaScript & TypeScript',
            description: 'Deep dive into modern JavaScript, ES6+, TypeScript and design patterns',
            category: 'Web Development',
            rating: 4.9,
            price: 1999,
            thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400'
        },
        {
            title: 'DevOps with Docker & Kubernetes',
            description: 'Master containerization, orchestration, CI/CD pipelines and cloud deployment',
            category: 'DevOps',
            rating: 4.8,
            price: 3999,
            thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400'
        },
        {
            title: 'Cybersecurity Fundamentals',
            description: 'Learn ethical hacking, network security, cryptography and penetration testing',
            category: 'Cybersecurity',
            rating: 4.7,
            price: 2799,
            thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400'
        }
    ];

    return sampleCourses.map((course, index) => `
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
            <img src="${course.thumbnail}" alt="${course.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                        ${course.category}
                    </span>
                    <span class="text-yellow-500">
                        <i class="fas fa-star"></i> ${course.rating}
                    </span>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">${course.title}</h3>
                <p class="text-gray-600 mb-4">${course.description}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center text-gray-500">
                        <i class="fas fa-user-circle mr-2"></i>
                        <span class="text-sm">Expert Instructor</span>
                    </div>
                    <div class="text-2xl font-bold text-indigo-600">₹${course.price}</div>
                </div>
                <button class="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                    Enroll Now
                </button>
            </div>
        </div>
    `).join('');
}

// Initialize on page load
if (document.getElementById('courses-container')) {
    loadPopularCourses();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});