import { Link } from 'react-router';

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title" style={{minWidth: '550px'}}>
            BUILD ELECTRONICS,<br />
            CHANGE THE WORLD!
          </h1>

          {/* Left small pattern instead of description */}
          <div className="hero-left-pattern">
            <img src="/svg/left_small_pattern.svg" alt="Left Small Pattern" />
          </div>

          <p className="hero-description">
            <span className="hidden md:inline">
              Prepare for tangible careers that can’t be replaced by AI, and turn your ideas into inventions that make an impact.
              <br /><br />
              Perfect for beginners - no prior experience required.
            </span>
            <span className="md:hidden">
              Prepare for tangible careers that can’t be replaced by AI, and turn your ideas into inventions that make an impact.
              <br /><br />
              Perfect for beginners - no prior experience required.
            </span>
          </p>

          {/* White logo instead of CTA button - left aligned */}
          <Link to="/pre-order" className="hero-cta-button hero-cta-prominent">
            <span>Reserve Your Starter Kit for $1!</span>
          </Link>
        </div>

        {/* Blue light pattern between hero-text and hero-image-container */}
        <div className="hero-blue-light-pattern">
          <img src="/svg/blue_light.svg" alt="Blue Light Pattern" />
        </div>

        <div className="hero-image-container">
          <div className="hero-pattern">
            <img src="/svg/img/header_image_pattern.png" alt="Pattern" className="pattern-svg" />
          </div>
        </div>
      </div>
    </section>
  );
}
