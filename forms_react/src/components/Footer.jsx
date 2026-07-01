import React from 'react';

/**
 * Footer Component
 * Displays college information, contact details, and social placeholders for SBJITMR.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-grid">
          {/* Info Area */}
          <div className="footer-info">
            <h3 className="footer-college-name">S. B. Jain Institute of Technology, Management and Research (SBJITMR)</h3>
            <p className="footer-college-subtitle"> Nagpur's Leading Engineering Institution</p>
            <p className="footer-desc">
              Committed to imparting quality education and nurturing professional standards in youngsters 
              to make them globally competent engineers and managers.
            </p>
          </div>

          {/* Contact Details */}
          <div className="footer-contact">
            <h4>Contact Details</h4>
            <p><strong>Address:</strong> Near Fetri, Katol Road, Nagpur, Maharashtra 441501</p>
            <p><strong>Phone:</strong> +91 99999 99999 (Admissions)</p>
            <p><strong>Email:</strong> admissions@sbjit.edu.in</p>
          </div>

          {/* Social Links Placeholders */}
          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#facebook" onClick={(e) => e.preventDefault()} className="social-icon">Facebook</a>
              <a href="#twitter" onClick={(e) => e.preventDefault()} className="social-icon">Twitter</a>
              <a href="#linkedin" onClick={(e) => e.preventDefault()} className="social-icon">LinkedIn</a>
              <a href="#instagram" onClick={(e) => e.preventDefault()} className="social-icon">Instagram</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SBJITMR, Nagpur. All Rights Reserved. Prepared for Practical Examination.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
