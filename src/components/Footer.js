import React from "react";

export default function Footer({ mode }) {
  return (
    <footer className={`pt-5 pb-4 ${mode === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h5 className={`mb-3 ${mode === 'dark' ? 'text-light' : 'text-dark'}`}>About Us</h5>
            <p>
              Simple Text Editor is a modern web application offering powerful text manipulation tools for efficient editing and analysis.
            </p>
          </div>

          {/* Contact Section */}
          <div className="col-md-6">
            <h5 className={`mb-3 ${mode === 'dark' ? 'text-light' : 'text-dark'}`}>Contact</h5>
            <p className={`mb-3 ${mode === 'dark' ? 'text-light' : 'text-dark'}`}>
              <i className="bi bi-envelope me-2"></i> kkishankumar9983@gmail.com
            </p>
            <div>
              <a
                href="http://www.linkedin.com/in/kishan-kumar-2b5067345"
                target="_blank"
                rel="noreferrer"
                className={`btn btn-lg mb-2 me-3 ${mode === 'dark' ? 'btn-linkedin-dark' : 'btn-linkedin-light'}`}
                aria-label="Visit LinkedIn Profile"
              >
                <i className="bi bi-linkedin me-2"></i>LinkedIn
              </a>
              <a
                href="https://github.com/KishanKumarSolanki"
                target="_blank"
                rel="noreferrer"
                className={`btn btn-lg mb-2 ${mode === 'dark' ? 'btn-github-dark' : 'btn-github-light'}`}
                aria-label="Visit GitHub Profile"
              >
                <i className="bi bi-github me-2"></i>GitHub
              </a>
            </div>
          </div>
        </div>
        <hr className={mode === 'dark' ? 'bg-light' : 'bg-dark'} />
        <div className="text-center">
          <p className="mb-0">© 2025 Simple Text Editor. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}