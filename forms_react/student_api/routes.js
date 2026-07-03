import express from 'express';
import Student from './Student.js';

const router = express.Router();

// GET /api/students - Fetch all submitted student applications from MongoDB
router.get('/', async (req, res) => {
  try {
    // Retrieve all records sorted by submission date (most recent first)
    const students = await Student.find().sort({ submittedAt: -1 });
    res.json(students);
  } catch (error) {
    console.error('Error loading student records:', error);
    res.status(500).json({ error: 'Server error: Failed to retrieve records.' });
  }
});

// POST /api/students - Submit a new student application to MongoDB
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, dob, gender, course, address } = req.body;

    // Server-side validations to ensure data integrity
    if (!fullName || !fullName.trim()) return res.status(400).json({ error: 'Full Name is required.' });
    if (!email || !email.trim()) return res.status(400).json({ error: 'Email Address is required.' });
    if (!phone || !phone.trim()) return res.status(400).json({ error: 'Mobile Number is required.' });
    if (!dob) return res.status(400).json({ error: 'Date of Birth is required.' });
    if (!gender) return res.status(400).json({ error: 'Gender selection is required.' });
    if (!course) return res.status(400).json({ error: 'Course selection is required.' });
    if (!address || !address.trim()) return res.status(400).json({ error: 'Address is required.' });

    // Validate email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please submit a valid email address.' });
    }

    // Validate 10-digit phone pattern
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Mobile number must be exactly 10 digits.' });
    }

    // Create a new Student document
    const newStudent = new Student({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dob,
      gender,
      course,
      address: address.trim()
    });

    // Save to MongoDB database
    await newStudent.save();

    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error saving student record:', error);
    res.status(500).json({ error: 'Server error: Failed to save record.' });
  }
});

export default router;
