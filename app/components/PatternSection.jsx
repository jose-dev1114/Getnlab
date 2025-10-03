import {Link} from 'react-router';

export function PatternSection() {
  return (
    <section className="pattern-section">
      {/* Left blue pattern - top left */}
      <div className="pattern-left">
        <img src="/svg/left_blue_pattern.svg" alt="Left Pattern" />
      </div>

      {/* Right small pattern - middle right */}
      <div className="pattern-right">
        <img src="/svg/right_small_pattern.svg" alt="Right Pattern" />
      </div>

      <div className="pattern-content">
        {/* Left black pattern - bottom of left padding */}
        <div className="pattern-left-black">
          <img src="/svg/left_black_pattern.svg" alt="Left Black Pattern" />
        </div>

        {/* Right black pattern - top right of padding */}
        <div className="pattern-right-black">
          <img src="/svg/right_black_pattern.svg" alt="Right Black Pattern" />
        </div>

        <div className="pattern-content-wrapper">
          <div className="pattern-image-container">
            <img src="/path-to-your-image.jpg" alt="Product" className="pattern-main-image" />
          </div>

          <div className="pattern-text-section">
            <h2 className="pattern-section-title">EVERYTHING YOU NEED IN ONE BOX</h2>
            <p className="pattern-section-description">
              The nLab Starter Kit is your launchpad. Inside, you'll find carefully selected<br />
              components, guided lessons, and projects that grow with you — from your very<br />
              first LED to advanced robotics and coding.
            </p>
            <Link to="/collections/all" className="pattern-cta-button">
              <span>Explore the Starter Kit</span>
              <img src="/svg/arrow_right.svg" alt="Arrow" className="arrow-icon" />
            </Link>
          </div>
        </div>

        {/* Bottom patterns */}
        <div className="pattern-bottom-left">
          <img src="/svg/left_small_pattern.svg" alt="Left Small Pattern" />
        </div>

        <div className="pattern-bottom-right">
          <img src="/svg/right_grey_pattern.svg" alt="Right Grey Pattern" />
        </div>
      </div>
    </section>
  );
}

