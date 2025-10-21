import { Link } from 'react-router';

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
            <span className="hidden md:inline">
              Prepare for tangible careers that can’t be replaced by AI,
              and turn your ideas into inventions that make an impact.
              Perfect for beginners - no prior experience required. <br />
            </span>
            <span className="md:hidden">
              Prepare for tangible careers that can't be replaced by AI, and turn your ideas into inventions that make an impact. Perfect for beginners - no prior experience required.
            </span>
          </p>

          <Link to="/pre-order" className="hero-cta-button hero-cta-prominent">
            <span>Reserve Your Starter Kit for $1!</span>
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
