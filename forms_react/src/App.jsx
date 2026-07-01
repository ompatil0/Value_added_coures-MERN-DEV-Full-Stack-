import React, { useState } from 'react';
// Import layout styles
import './App.css';

// Import Reusable Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Button from './components/Button';
import InputField from './components/InputField';
import StudentCard from './components/StudentCard';

function App() {
  // 1. Navigation View State ('home' or 'admission')
  const [view, setView] = useState('home');

  // 2. Form Initial State
  const initialFormState = {
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    course: '',
    address: ''
  };

  // 3. React Hooks (useState) for Form and Applications
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState([]); // List of submitted applications

  // 4. Custom Modal State Hooks
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingStudent, setPendingStudent] = useState(null); // Holds validated student info before saving

  // 5. Dropdown Course Options
  const courseOptions = [
    { value: 'Computer Science & Engineering', label: 'Computer Science & Engineering' },
    { value: 'AI & ML', label: 'Artificial Intelligence & Machine Learning' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Electronics & Telecommunication', label: 'Electronics & Telecommunication' },
    { value: 'Electrical Engineering', label: 'Electrical Engineering' },
    { value: 'Mechanical Engineering', label: 'Mechanical Engineering' }
  ];

  // 6. Gender Options
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  // 7. Handle Form Inputs Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error message if validation has started
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // 8. Validate Admission Form Inputs
  const validateForm = () => {
    const newErrors = {};

    // Validate Required Fields
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required.';
    if (!formData.gender) newErrors.gender = 'Gender selection is required.';
    if (!formData.course) newErrors.course = 'Please select a course.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';

    // Email Address Validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address (e.g., test@example.com).';
      }
    }

    // Mobile Number Validation (exactly 10 digits)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile Number is required.';
    } else {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Mobile number must contain exactly 10 digits.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 9. Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Temporarily store the validated student details
      const studentToSave = {
        id: Date.now(),
        ...formData
      };
      setPendingStudent(studentToSave);

      // Open the custom success modal (replaces native alert())
      setShowSuccessModal(true);
    }
  };

  // 10. Modal OK button click handler
  const handleModalOk = () => {
    if (pendingStudent) {
      // Save student details
      setStudents((prev) => [...prev, pendingStudent]);
    }

    // Reset form and errors
    setFormData(initialFormState);
    setErrors({});
    setPendingStudent(null);

    // Close Modal
    setShowSuccessModal(false);
  };

  // 11. Reset Handler
  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
  };

  // Handler to coordinate views navigating
  const navigateTo = (targetView) => {
    setView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Navbar Header */}
      <Navbar currentView={view} onNavigate={navigateTo} />

      <main className="main-content">
        {view === 'home' ? (
          /* ==================== LANDING HOME VIEW ==================== */
          <div id="home">
            {/* Hero Section */}
            <section className="hero-section">
              <div className="hero-container container">
                <div className="hero-content">
                  <span className="hero-tag">S. B. Jain Institute of Technology</span>
                  <h1 className="hero-title">Welcome to SBJITMR</h1>
                  <p className="hero-subtitle">Empowering Future Engineers Through Quality Education.</p>
                  <p className="hero-description">
                    S. B. Jain Institute of Technology, Management and Research (SBJITMR) is a premier engineering college in Nagpur, Maharashtra. 
                    We provide a student-centric learning environment, fostering technical expertise, innovation, and leadership skills. 
                    Join our vibrant campus to shape your engineering career.
                  </p>
                  <Button type="button" variant="primary" onClick={() => navigateTo('admission')}>
                    Apply for Admission
                  </Button>
                </div>
                <div className="hero-illustration">
                  {/* Clean SVG College Building Graphic illustration */}
                  <svg className="college-graphic" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="300" fill="#f8fafc" />
                    <rect x="50" y="220" width="300" height="10" fill="#cbd5e1" />
                    {/* Main Building Frame */}
                    <rect x="80" y="100" width="240" height="120" fill="#0d47a1" rx="4" />
                    <rect x="100" y="120" width="200" height="100" fill="#ffffff" />
                    {/* Pillars */}
                    <rect x="120" y="120" width="15" height="100" fill="#1976d2" />
                    <rect x="170" y="120" width="15" height="100" fill="#1976d2" />
                    <rect x="215" y="120" width="15" height="100" fill="#1976d2" />
                    <rect x="265" y="120" width="15" height="100" fill="#1976d2" />
                    {/* College Roof Triangle */}
                    <polygon points="80,100 200,50 320,100" fill="#1565c0" />
                    {/* Tiny Windows and Entrance */}
                    <rect x="145" y="170" width="15" height="20" fill="#e2e8f0" />
                    <rect x="240" y="170" width="15" height="20" fill="#e2e8f0" />
                    <path d="M 185,220 A 15,15 0 0 1 215,220 Z" fill="#0d47a1" />
                  </svg>
                </div>
              </div>
            </section>

            {/* Information / Features Section */}
            <section id="about" className="info-section">
              <div className="container">
                <div className="section-header">
                  <h2 className="section-main-title">Why Choose SBJITMR?</h2>
                  <div className="section-subtitle-line"></div>
                </div>
                <div className="info-grid">
                  <div className="info-card">
                    <span className="info-card-icon">🎓</span>
                    <h3 className="info-card-title">Experienced Faculty</h3>
                    <p className="info-card-desc">Dedicated professors with academic credentials and industry experience.</p>
                  </div>
                  <div className="info-card">
                    <span className="info-card-icon">🔬</span>
                    <h3 className="info-card-title">Modern Laboratories</h3>
                    <p className="info-card-desc">Well-equipped state-of-the-art labs for practical experiments and research.</p>
                  </div>
                  <div className="info-card">
                    <span className="info-card-icon">💼</span>
                    <h3 className="info-card-title">Excellent Placements</h3>
                    <p className="info-card-desc">Strong placement cell providing job opportunities in top MNCs and tech startups.</p>
                  </div>
                  <div className="info-card">
                    <span className="info-card-icon">💻</span>
                    <h3 className="info-card-title">Industry-Oriented Learning</h3>
                    <p className="info-card-desc">Curriculum aligned with industry trends, workshops, and internship assistance.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Courses / Departments Section */}
            <section id="departments" className="courses-section">
              <div className="container">
                <div className="section-header">
                  <h2 className="section-main-title">Academic Courses Offered</h2>
                  <div className="section-subtitle-line"></div>
                </div>
                <div className="courses-grid">
                  <div className="course-card">
                    <span className="course-card-icon">💻</span>
                    <h3 className="course-card-title">Computer Science & Engineering</h3>
                    <p className="course-card-desc">Focuses on computer systems, software engineering, algorithms, and computational theory.</p>
                    <span className="course-card-duration">Duration: 4 Years</span>
                  </div>
                  <div className="course-card">
                    <span className="course-card-icon">🤖</span>
                    <h3 className="course-card-title">AI & ML</h3>
                    <p className="course-card-desc">Specialized study in artificial intelligence, neural networks, machine learning, and deep learning algorithms.</p>
                    <span className="course-card-duration">Duration: 4 Years</span>
                  </div>
                  <div className="course-card">
                    <span className="course-card-icon">📊</span>
                    <h3 className="course-card-title">Data Science</h3>
                    <p className="course-card-desc">Covers big data analysis, statistical modeling, data visualization, and predictive analytics.</p>
                    <span className="course-card-duration">Duration: 4 Years</span>
                  </div>
                  <div className="course-card">
                    <span className="course-card-icon">🌐</span>
                    <h3 className="course-card-title">Information Technology</h3>
                    <p className="course-card-desc">Focuses on software development, network security, database management, and cloud systems.</p>
                    <span className="course-card-duration">Duration: 4 Years</span>
                  </div>
                  <div className="course-card">
                    <span className="course-card-icon">📡</span>
                    <h3 className="course-card-title">Electronics & Telecommunication</h3>
                    <p className="course-card-desc">Covers communication systems, embedded systems, microcontrollers, and signal processing.</p>
                    <span className="course-card-duration">Duration: 4 Years</span>
                  </div>
                  <div className="course-card">
                    <span className="course-card-icon">⚡</span>
                    <h3 className="course-card-title">Electrical Engineering</h3>
                    <p className="course-card-desc">Deals with power systems, electrical machines, control systems, and renewable energy.</p>
                    <span className="course-card-duration">Duration: 4 Years</span>
                  </div>
                  <div className="course-card">
                    <span className="course-card-icon">⚙️</span>
                    <h3 className="course-card-title">Mechanical Engineering</h3>
                    <p className="course-card-desc">Covers thermodynamics, fluid mechanics, CAD design, robotics, and manufacturing processes.</p>
                    <span className="course-card-duration">Duration: 4 Years</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* ==================== ADMISSION FORM VIEW ==================== */
          <div className="admission-view-section container">
            {/* Back Button to Home View */}
            <div className="back-btn-wrapper">
              <button className="btn-back" onClick={() => navigateTo('home')}>
                &larr; Back to Home
              </button>
            </div>

            {/* Registration Form container */}
            <div className="form-wrapper">
              <div className="section-header">
                <h2 className="section-main-title">Admission Application Form</h2>
                <div className="section-subtitle-line"></div>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* Full Name field */}
                <InputField
                  label="Full Name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  error={errors.fullName}
                />

                {/* Email Address field */}
                <InputField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  error={errors.email}
                />

                {/* Mobile Number field */}
                <InputField
                  label="Mobile Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  error={errors.phone}
                />

                {/* Date of Birth field */}
                <InputField
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  error={errors.dob}
                />

                {/* Gender radio group */}
                <InputField
                  label="Gender"
                  type="radio"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={genderOptions}
                  error={errors.gender}
                />

                {/* Course Applying For selection */}
                <InputField
                  label="Course Applying For"
                  type="select"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  options={courseOptions}
                  error={errors.course}
                />

                {/* Home Address textarea */}
                <InputField
                  label="Permanent Address"
                  type="textarea"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your residential address"
                  error={errors.address}
                />

                {/* Form Action Controls */}
                <div className="form-actions">
                  <Button type="submit" variant="primary">
                    Submit Application
                  </Button>
                  <Button type="button" variant="secondary" onClick={handleReset}>
                    Reset Fields
                  </Button>
                </div>
              </form>
            </div>

            {/* Submitted Applications Listing below Form */}
            <section className="applications-listing">
              <div className="section-header">
                <h2 className="section-main-title">Submitted Applications</h2>
                <div className="section-subtitle-line"></div>
              </div>

              {students.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '20px' }}>
                  No applications submitted yet.
                </p>
              ) : (
                <div className="applications-grid">
                  {students.map((student) => (
                    <StudentCard key={student.id} student={student} />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* Custom Styled Success Modal Overlay */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title-success">Admission Successful!!</h2>
            <p className="modal-subtitle-success">Nhi lena tha................!! 😂</p>
            <div className="modal-btn-wrapper">
              <button className="btn btn-primary modal-btn-ok" onClick={handleModalOk}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* College Footer */}
      <Footer />
    </div>
  );
}

export default App;
