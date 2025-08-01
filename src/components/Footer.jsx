import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer style={{ backgroundColor: '#000', color: '#fff', padding: '3rem 1rem' }}>
        <div className="footer-container">
          {/* About Section */}
          <div className="footer-details">
            <h3>Nex<span style={{color:"#2196F3"}}>Hire</span></h3>
            <h6>
              Discover jobs, post opportunities, and connect with top talent—all in one place.
            </h6>
            <div>
              <button><i className="fa-brands fa-facebook-f"></i></button>
              <button><i className="fa-brands fa-google"></i></button>
              <button><i className="fa-brands fa-twitter"></i></button>
              <button><i className="fa-brands fa-linkedin-in"></i></button>
            </div>
          </div>

          {/* Job Categories */}
          <div className="footer-details">
            <h5>Job Categories</h5>
            <p><i className="fa-solid fa-arrow-right"></i> Work from Home</p>
            <p><i className="fa-solid fa-arrow-right"></i> Internship Job</p>
            <p><i className="fa-solid fa-arrow-right"></i> Freelancer Job</p>
            <p><i className="fa-solid fa-arrow-right"></i> Part Time Job</p>
            <p><i className="fa-solid fa-arrow-right"></i> Full Time Job</p>
          </div>

          {/* Job Type */}
          <div className="footer-details">
            <h5>Job Type</h5>
            <p><i className="fa-solid fa-arrow-right"></i> Create Account</p>
            <p><i className="fa-solid fa-arrow-right"></i> Career Counseling</p>
            <p><i className="fa-solid fa-arrow-right"></i> My Oficiona</p>
            <p><i className="fa-solid fa-arrow-right"></i> FAQ</p>
            <p><i className="fa-solid fa-arrow-right"></i> Report a Problem</p>
          </div>

          {/* Resources */}
          <div className="footer-details">
            <h5>Resources</h5>
            <p><i className="fa-solid fa-arrow-right"></i> My Account</p>
            <p><i className="fa-solid fa-arrow-right"></i> Support</p>
            <p><i className="fa-solid fa-arrow-right"></i> How It Works</p>
            <p><i className="fa-solid fa-arrow-right"></i> Underwriting</p>
            <p><i className="fa-solid fa-arrow-right"></i> Employers</p>
          </div>

          {/* Quick Links */}
          <div className="footer-details">
            <h5>Quick Links</h5>
            <p><i className="fa-solid fa-arrow-right"></i> Jobs Listing</p>
            <p><i className="fa-solid fa-arrow-right"></i> About Us</p>
            <p><i className="fa-solid fa-arrow-right"></i> Contact Us</p>
            <p><i className="fa-solid fa-arrow-right"></i> Privacy Policy</p>
            <p><i className="fa-solid fa-arrow-right"></i> Terms & Conditions</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="copright-div mt-4">
          <p className="small text-secondary">© {new Date().getFullYear()} Jobify. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
