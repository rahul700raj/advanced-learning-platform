const API_URL = 'http://localhost:5000/api';

// Check authentication
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || '{}');

if (!token) {
    window.location.href = 'login.html';
}

// Display user name
document.getElementById('user-name').textContent = user.name || 'User';

// Logout handler
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});

// Load user enrollments
async function loadEnrollments() {
    try {
        const response = await fetch(`${API_URL}/enrollments/my-courses`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (data.success && data.enrollments) {
            displayEnrollments(data.enrollments);
            updateStats(data.enrollments);
        } else {
            showNoCourses();
        }
    } catch (error) {
        console.error('Error loading enrollments:', error);
        showNoCourses();
    }
}

// Display enrollments
function displayEnrollments(enrollments) {
    const container = document.getElementById('my-courses');
    const noCourses = document.getElementById('no-courses');

    if (enrollments.length === 0) {
        noCourses.classList.remove('hidden');
        return;
    }

    container.innerHTML = enrollments.map(enrollment => `
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <img src="${enrollment.course.thumbnail || 'https://via.placeholder.com/400x200'}" 
                 alt="${enrollment.course.title}" class="w-full h-40 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-bold text-gray-800 mb-2">${enrollment.course.title}</h3>
                <div class="mb-3">
                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>${enrollment.progress}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-indigo-600 h-2 rounded-full" style="width: ${enrollment.progress}%"></div>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500">
                        ${enrollment.completedLessons?.length || 0} / ${enrollment.course.lessons?.length || 0} lessons
                    </span>
                    ${enrollment.certificateIssued ? 
                        '<span class="text-green-600 text-sm"><i class="fas fa-certificate mr-1"></i>Certified</span>' :
                        '<button class="text-indigo-600 text-sm font-medium hover:text-indigo-700">Continue Learning</button>'
                    }
                </div>
            </div>
        </div>
    `).join('');
}

// Update stats
function updateStats(enrollments) {
    const enrolled = enrollments.length;
    const completed = enrollments.filter(e => e.progress >= 100).length;
    const inProgress = enrollments.filter(e => e.progress > 0 && e.progress < 100).length;
    const certificates = enrollments.filter(e => e.certificateIssued).length;

    document.getElementById('enrolled-count').textContent = enrolled;
    document.getElementById('completed-count').textContent = completed;
    document.getElementById('progress-count').textContent = inProgress;
    document.getElementById('certificates-count').textContent = certificates;

    // Update recent activity
    const activityContainer = document.getElementById('recent-activity');
    activityContainer.innerHTML = enrollments.slice(0, 5).map(enrollment => `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center">
                <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-book text-indigo-600"></i>
                </div>
                <div>
                    <p class="font-medium text-gray-800">${enrollment.course.title}</p>
                    <p class="text-sm text-gray-500">
                        ${enrollment.progress >= 100 ? 'Completed' : `${enrollment.progress}% complete`}
                    </p>
                </div>
            </div>
            <span class="text-sm text-gray-500">
                ${new Date(enrollment.enrolledAt).toLocaleDateString()}
            </span>
        </div>
    `).join('');
}

// Show no courses message
function showNoCourses() {
    document.getElementById('no-courses').classList.remove('hidden');
    document.getElementById('enrolled-count').textContent = '0';
    document.getElementById('completed-count').textContent = '0';
    document.getElementById('progress-count').textContent = '0';
    document.getElementById('certificates-count').textContent = '0';
}

// Initialize
loadEnrollments();