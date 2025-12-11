const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Enroll in a course
router.post('/', auth, async (req, res) => {
  try {
    const { courseId } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      user: req.user.userId,
      course: courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Create enrollment
    const enrollment = new Enrollment({
      user: req.user.userId,
      course: courseId,
      paymentAmount: course.price
    });

    await enrollment.save();

    // Update course and user
    course.enrolledStudents.push(req.user.userId);
    await course.save();

    await User.findByIdAndUpdate(req.user.userId, {
      $push: { enrolledCourses: courseId }
    });

    res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
      enrollment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user enrollments
router.get('/my-courses', auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.userId })
      .populate('course')
      .sort({ enrolledAt: -1 });

    res.json({ success: true, count: enrollments.length, enrollments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update progress
router.put('/:id/progress', auth, async (req, res) => {
  try {
    const { lessonId, progress } = req.body;

    const enrollment = await Enrollment.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (lessonId && !enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }

    if (progress !== undefined) {
      enrollment.progress = progress;
    }

    if (enrollment.progress >= 100 && !enrollment.completedAt) {
      enrollment.completedAt = new Date();
      enrollment.certificateIssued = true;
    }

    await enrollment.save();

    res.json({
      success: true,
      message: 'Progress updated successfully',
      enrollment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;