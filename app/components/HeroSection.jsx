import {Link} from 'react-router';

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            BUILD ELECTRONICS,<br />
            CHANGE THE WORLD
          </h1>
          <p className="hero-description">
            nLab gives you the world's smallest<br />
            electronics lab — a hands-on kit and powerful<br />
            app that make it easy to start building real<br />
            projects, no matter your experience level.
          </p>
          
          <Link to="/early-access" className="hero-cta-button">
            <span>Get Early Access</span>
            <span className="lightning-icon">⚡</span>
          </Link>
        </div>

        <div className="hero-image-container">
          <div className="hero-pattern">
            <img src="/svg/img/header_image_pattern.webp" alt="Pattern" className="pattern-svg" />
          </div>
        </div>
      </div>
    </section>
  );
}
