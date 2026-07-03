import mongoose from 'mongoose';

// Define the Schema for Student Admissions
const StudentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: String, // String format (e.g. YYYY-MM-DD) matching the date inputs
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Student Model
const Student = mongoose.model('Student', StudentSchema);
export default Student;
