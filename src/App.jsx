import React, { useEffect, useRef } from 'react';

const App = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    // Add event listeners to anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Parallax effect for hero
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      sections.forEach((section) => {
        observer.unobserve(section);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <style jsx>{`
        :root {
          --primary-color: #6366f1;
          --primary-dark: #4f46e5;
          --secondary-color: #ec4899;
          --accent-color: #06b6d4;
          --text-primary: #1f2937;
          --text-secondary: #6b7280;
          --text-light: #9ca3af;
          --bg-primary: #ffffff;
          --bg-secondary: #f8fafc;
          --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--bg-secondary);
          overflow-x: hidden;
        }

        .hero {
          min-height: 100vh;
          background: var(--bg-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 2rem 1rem;
        }

        .hero::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="%23ffffff08" points="0,0 1000,300 1000,1000 0,700"/></svg>');
          pointer-events: none;
        }

        .hero-content {
          text-align: center;
          z-index: 2;
          position: relative;
          max-width: 800px;
          animation: fadeInUp 1s ease-out;
        }

        .profile-img {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid rgba(255, 255, 255, 0.3);
          box-shadow: var(--shadow-xl);
          margin-bottom: 2rem;
          animation: float 3s ease-in-out infinite;
          transition: transform 0.3s ease;
        }

        .profile-img:hover {
          transform: scale(1.05);
        }

        .hero h1 {
          font-size: 3rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .hero .subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          font-weight: 300;
        }

        .contact-info {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.95rem;
          transition: transform 0.3s ease;
        }

        .contact-item:hover {
          transform: translateY(-2px);
        }

        .contact-item i {
          font-size: 1.1rem;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
          font-size: 0.95rem;
        }

        .btn-primary {
          background: var(--bg-primary);
          color: var(--primary-color);
          box-shadow: var(--shadow-md);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .btn-outline {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.7);
          animation: bounce 2s infinite;
          cursor: pointer;
        }

        .main-content {
          background: var(--bg-primary);
          position: relative;
          z-index: 3;
          border-radius: 2rem 2rem 0 0;
          margin-top: -2rem;
          box-shadow: var(--shadow-xl);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 1rem;
        }

        .section {
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .section:nth-child(2) {
          animation-delay: 0.1s;
        }
        .section:nth-child(3) {
          animation-delay: 0.2s;
        }
        .section:nth-child(4) {
          animation-delay: 0.3s;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
        }

        .section-title::after {
          content: "";
          position: absolute;
          bottom: -0.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: 4rem;
          height: 0.25rem;
          background: linear-gradient(
            90deg,
            var(--primary-color),
            var(--secondary-color)
          );
          border-radius: 2px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
        }

        .about-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .stat-item {
          text-align: center;
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-radius: 1rem;
          transition: transform 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-5px);
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .education-timeline {
          position: relative;
          padding-left: 2rem;
        }

        .education-timeline::before {
          content: "";
          position: absolute;
          left: 0.5rem;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(
            180deg,
            var(--primary-color),
            var(--secondary-color)
          );
        }

        .education-item {
          position: relative;
          margin-bottom: 2rem;
          padding: 1.5rem 2rem;
          background: var(--bg-primary);
          border-radius: 1rem;
          box-shadow: var(--shadow-md);
          transition: all 0.3s ease;
        }

        .education-item:hover {
          transform: translateX(10px);
          box-shadow: var(--shadow-lg);
        }

        .education-item::before {
          content: "";
          position: absolute;
          left: -2.25rem;
          top: 1.5rem;
          width: 1rem;
          height: 1rem;
          background: var(--primary-color);
          border-radius: 50%;
          border: 3px solid var(--bg-primary);
        }

        .education-year {
          color: var(--secondary-color);
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .education-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .education-institution {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .skill-category {
          background: var(--bg-primary);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: var(--shadow-md);
          transition: transform 0.3s ease;
        }

        .skill-category:hover {
          transform: translateY(-5px);
        }

        .skill-category h3 {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          color: var(--primary-color);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .skill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          background: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.85rem;
          transition: all 0.3s ease;
        }

        .skill-tag:hover {
          background: var(--primary-color);
          color: white;
          transform: scale(1.05);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .contact-card {
          background: var(--bg-primary);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: var(--shadow-md);
          text-align: center;
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .contact-icon {
          width: 4rem;
          height: 4rem;
          background: var(--bg-gradient);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          color: white;
          font-size: 1.5rem;
        }

        .contact-card h3 {
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .contact-card p {
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .contact-card a {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 600;
        }

        .footer {
          
          text-align: center;
          padding: 2rem 1rem;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .social-link {
          width: 3rem;
          height: 3rem;
          background: var(--primary-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: var(--secondary-color);
          transform: translateY(-3px);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }

          .hero .subtitle {
            font-size: 1.1rem;
          }

          .contact-info {
            gap: 1rem;
          }

          .contact-item {
            font-size: 0.85rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 250px;
            justify-content: center;
          }

          .section-title {
            font-size: 2rem;
          }

          .education-timeline {
            padding-left: 1.5rem;
          }

          .education-item {
            padding: 1.25rem 1.5rem;
          }

          .education-item::before {
            left: -2rem;
          }
        }

        @media (max-width: 480px) {
          .hero {
            padding: 1rem;
          }

          .profile-img {
            width: 140px;
            height: 140px;
          }

          .hero h1 {
            font-size: 2rem;
          }

          .contact-info {
            flex-direction: column;
            gap: 0.5rem;
          }

          .container {
            padding: 2rem 1rem;
          }

          .section {
            margin-bottom: 3rem;
          }
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --text-primary: #f9fafb;
            --text-secondary: #d1d5db;
            --text-light: #9ca3af;
            --bg-primary: #1f2937;
            --bg-secondary: #111827;
          }
        }
      `}</style>

      {/* FontAwesome CSS */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        rel="stylesheet"
      />

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-content">
          <img
            src="https://res.cloudinary.com/dl5pmk3v3/image/upload/v1753199319/jasil_vriw8k.jpg"
            alt="Muhammad Jasil"
            className="profile-img"
          />

          <h1>MUHAMMAD JASIL MP</h1>
          <p className="subtitle">Human Resources Manager</p>

          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+91 9539278534</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>muhmmedjasil2001@gmail.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Kozhikkode, Kerala</span>
            </div>
          </div>

          <div className="cta-buttons">
            <a href="#contact" className="btn btn-primary">
              <i className="fas fa-paper-plane"></i>
              Get In Touch
            </a>
            <a href="#about" className="btn btn-outline">
              <i className="fas fa-user"></i>
              Learn More
            </a>
          </div>
        </div>

        <div className="scroll-indicator" onClick={scrollToAbout}>
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* About Section */}
          <section id="about" className="section">
            <h2 className="section-title">About Me</h2>
            <div className="about-grid">
              <div className="about-text">
                <p>
                  I'm an HR trainee with a Master's in Social Work and a
                  Bachelor's in Sociology, passionate about people management and
                  organizational development. I'm eager to apply my social science
                  background to support and grow within dynamic HR environments.
                </p>
              </div>

              <div className="stats">
                <div className="stat-item">
                  <div className="stat-number">6+</div>
                  <div className="stat-label">Years of Study</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">2024</div>
                  <div className="stat-label">Graduation Year</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Dedication</div>
                </div>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section id="education" className="section">
            <h2 className="section-title">Education</h2>
            <div className="education-timeline">
              <div className="education-item">
                <div className="education-year">2024 - 2025</div>
                <div className="education-title">Human Resources Trainee</div>
                <div className="education-institution">Edwin Academy</div>
              </div>
              <div className="education-item">
                <div className="education-year">2022 - 2024</div>
                <div className="education-title">Masters In Social Work (MSW)</div>
                <div className="education-institution">Calicut University</div>
              </div>
              <div className="education-item">
                <div className="education-year">2019 - 2022</div>
                <div className="education-title">Bachelors In Sociology</div>
                <div className="education-institution">Calicut University</div>
              </div>
              <div className="education-item">
                <div className="education-year">2017 - 2019</div>
                <div className="education-title">Higher Secondary Education</div>
                <div className="education-institution">NHSS Nochat,Kozhikkode</div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="section">
            <h2 className="section-title">Skills & Interests</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3><i className="fas fa-user-tie"></i> HR Skills</h3>
                <div className="skill-list">
                  <span className="skill-tag">Recruitment</span>
                  <span className="skill-tag">Employee Engagement</span>
                  <span className="skill-tag">HR Documentation</span>
                  <span className="skill-tag">Conflict Resolution</span>
                </div>
              </div>
              <div className="skill-category">
                <h3><i className="fas fa-laptop"></i> Office Tools</h3>
                <div className="skill-list">
                  <span className="skill-tag">MS Word</span>
                  <span className="skill-tag">MS Excel</span>
                  <span className="skill-tag">MS PowerPoint</span>
                  <span className="skill-tag">Google Workspace</span>
                </div>
              </div>
              <div className="skill-category">
                <h3><i className="fas fa-cogs"></i> Soft Skills</h3>
                <div className="skill-list">
                  <span className="skill-tag">Communication</span>
                  <span className="skill-tag">Time Management</span>
                  <span className="skill-tag">Problem Solving</span>
                  <span className="skill-tag">Teamwork</span>
                </div>
              </div>
              <div className="skill-category">
                <h3><i className="fas fa-heart"></i> Interests</h3>
                <div className="skill-list">
                  <span className="skill-tag">People Management</span>
                  <span className="skill-tag">Workplace Well-being</span>
                  <span className="skill-tag">Training & Development</span>
                  <span className="skill-tag">Community Service</span>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="section">
            <h2 className="section-title">Get In Touch</h2>
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <h3>Phone</h3>
                <p>Feel free to give me a call</p>
                <a href="tel:+919539278534">+91 9539278534</a>
              </div>
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <h3>Email</h3>
                <p>Send me an email</p>
                <a href="mailto:muhmmedjasil2001@gmail.com">muhmmedjasil2001@gmail.com</a>
              </div>
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h3>Location</h3>
                <p>Based in Kerala, India</p>
                <a href="#">Kozhikkode, Kerala</a>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="social-links">
          <a href="https://www.linkedin.com/in/muhammed-jasil-535097326/" className="social-link">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/jasilchalikkara/" className="social-link">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://wa.me/919539278534" className="social-link" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-whatsapp"></i>
</a>

        </div>
        <p>&copy; 2025 Muhammed Jasil. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;