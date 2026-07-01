import React from 'react';

/**
 * Navbar Component
 * Renders the navigation header for SBJITMR Admission Portal.
 * 
 * Props:
 * - currentView: The current active view ('home' or 'admission').
 * - onNavigate: Function to change the active view.
 */
function Navbar({ currentView, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        {/* SBJITMR Logo Placeholder */}
        <div className="navbar-logo" onClick={() => onNavigate('home')}>
          <span className="logo-bold">SBJITMR</span>
          <span className="logo-light"> Nagpur</span>
        </div>

        {/* Navigation Menu Links */}
        <ul className="navbar-menu">
          <li>
            <a 
              href="#home" 
              className={currentView === 'home' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about"
              onClick={(e) => {
                // If on admission view, go back to home first, otherwise let page scroll
                if (currentView !== 'home') {
                  onNavigate('home');
                }
              }}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#departments"
              onClick={(e) => {
                if (currentView !== 'home') {
                  onNavigate('home');
                }
              }}
            >
              Departments
            </a>
          </li>
          <li>
            <a 
              href="#placements"
              onClick={(e) => {
                if (currentView !== 'home') {
                  onNavigate('home');
                }
              }}
            >
              Placements
            </a>
          </li>
          <li>
            <a 
              href="#contact"
              onClick={(e) => {
                if (currentView !== 'home') {
                  onNavigate('home');
                }
              }}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Admission CTA Button */}
        <div className="navbar-cta">
          <button 
            className={`btn-navbar-admission ${currentView === 'admission' ? 'active-btn' : ''}`}
            onClick={() => onNavigate('admission')}
          >
            Admission 2026
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
