import { useEffect } from 'react';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{ title: `nLab | Community` }];
};

export default function Community() {
  useEffect(() => {
    // YouTube Continuous Sliding Carousel functionality
    const initCarousel = () => {
      const carousel = document.querySelector('#video-carousel');

      if (!carousel) return;

      const slides = carousel.querySelectorAll('.video-slide');
      if (slides.length === 0) return;

      // Clone slides for infinite loop
      const cloneSlides = () => {
        slides.forEach(slide => {
          const clone = slide.cloneNode(true);
          carousel.appendChild(clone);
        });
      };

      // Clone slides twice for smooth infinite scrolling
      cloneSlides();
      cloneSlides();

      const slideWidth = slides[0].offsetWidth + 24; // slide width + gap
      const totalSlides = slides.length;
      const totalWidth = slideWidth * totalSlides;

      let currentPosition = 0;
      let animationId;
      let isPaused = false;

      const animate = () => {
        if (!isPaused) {
          currentPosition -= 0.3; // Move 0.3px to the left each frame (much slower)

          // Reset position when we've scrolled through one set of original slides
          if (Math.abs(currentPosition) >= totalWidth) {
            currentPosition = 0;
          }

          carousel.style.transform = `translateX(${currentPosition}px)`;
        }

        animationId = requestAnimationFrame(animate);
      };

      // Start the animation
      animate();

      // Pause on hover
      const pauseAnimation = () => {
        isPaused = true;
      };

      const resumeAnimation = () => {
        isPaused = false;
      };

      carousel.addEventListener('mouseenter', pauseAnimation);
      carousel.addEventListener('mouseleave', resumeAnimation);

      // Handle window resize
      const handleResize = () => {
        const newSlideWidth = slides[0]?.offsetWidth + 24;
        if (newSlideWidth !== slideWidth) {
          // Reinitialize if slide width changes significantly
          location.reload();
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        carousel.removeEventListener('mouseenter', pauseAnimation);
        carousel.removeEventListener('mouseleave', resumeAnimation);
        window.removeEventListener('resize', handleResize);
      };
    };

    // Initialize carousel after component mounts
    const timer = setTimeout(initCarousel, 100);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="community-page">
      {/* Community Story Section */}
      <section className="community-story">
        <div className="community-story-pattern-right">
          <img src="/svg/right_black_pattern_second.svg" alt="" />
        </div>

        <div className="community-story-container">
          <div className="community-story-content">
            <h2 className="community-story-title">
              JOIN THE RESISTORS.<br />
              BUILD YOUR FUTURE.
            </h2>
            <p className="community-story-description">
              The Resistors aren't just a community—we're your career accelerator. Connect with industry professionals who've walked the path you're on, and professors who know exactly what employers are looking for.
            </p>
            <p className="community-story-description">
              Get real-world insights from engineers at top tech companies. Learn how to navigate the job market, build a standout portfolio, and master the interview questions that matter. Work on projects that showcase your abilities and build connections that last.
            </p>
          </div>
        </div>
      </section>

      <section className="community-discord-section">
        {/* Clean Kickstarter Hero Section */}
        <div className="kickstarter-hero-section">
          <div className="kickstarter-hero-content">
            <div className="kickstarter-hero-header">
              <h1 className="kickstarter-hero-title">
                Back us on
                <img src="/svg/kickstarter-logo.svg" alt="Kickstarter" className="kickstarter-hero-logo" />
              </h1>
              <p className="kickstarter-hero-subtitle">
                Join the revolution in electronics education. Get exclusive early access and help us make learning engineering accessible to everyone.
              </p>
            </div>

            <div className="kickstarter-hero-image">
              <img src="/svg/img/access_main.png" alt="nLab Electronics Kit" className="hero-product-image" />
              <div className="hero-image-badge">
                <span className="badge-text">Coming Soon</span>
              </div>
            </div>

            <div className="kickstarter-value-props">
              <div className="value-prop">
                <div className="value-icon">⚡</div>
                <div className="value-content">
                  <h3>Early Bird Pricing</h3>
                  <p>Lowest price ever offered</p>
                </div>
              </div>

              <div className="value-prop">
                <div className="value-icon">🎁</div>
                <div className="value-content">
                  <h3>Exclusive Rewards</h3>
                  <p>Limited founder perks</p>
                </div>
              </div>

              <div className="value-prop">
                <div className="value-icon">🚀</div>
                <div className="value-content">
                  <h3>Shape the Future</h3>
                  <p>Revolutionary education</p>
                </div>
              </div>
            </div>

            <div className="kickstarter-hero-cta">
              <a href="/early-access" className="hero-cta-button">
                <span className="cta-text">Join Pre-Launch Giveaway</span>
                <span className="cta-subtext">Get notified when we launch + exclusive perks</span>
              </a>
            </div>
          </div>
        </div>
        {/* Modern Discord Community Section */}
        <div className="discord-hero-section">
          <div className="discord-hero-content">
            <div className="discord-hero-header">
              <h1 className="discord-hero-title">
                Connect on
                <span className="discord-brand">Discord</span>
              </h1>
              <p className="discord-hero-subtitle">
                Join thousands of makers, engineers, and creators building the future together. Where ideas spark, projects come to life, and lifelong connections are made.
              </p>
            </div>

            <div className="discord-hero-visual">
              <div className="discord-video-container">
                <img src="/svg/img/access_main.png" alt="Community Video" className="video-thumbnail" />
                <div className="video-play-overlay">
                  <div className="play-button">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div className="video-info">
                    <h3>Meet the Resistors Community</h3>
                    <p>See how our community connects and collaborates</p>
                  </div>
                </div>
              </div>

              <div className="community-stats">
                <div className="stat-item">
                  <div className="stat-number">2.5K+</div>
                  <div className="stat-label">Active Members</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Projects Shared</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Support & Help</div>
                </div>
              </div>
            </div>

            <div className="discord-features-grid">
              <div className="discord-feature">
                <div className="feature-icon">🤝</div>
                <div className="feature-content">
                  <h3>Network & Connect</h3>
                  <p>Build meaningful relationships with makers worldwide</p>
                </div>
              </div>

              <div className="discord-feature">
                <div className="feature-icon">🎨</div>
                <div className="feature-content">
                  <h3>Showcase Projects</h3>
                  <p>Share your work and get feedback from experienced engineers</p>
                </div>
              </div>

              <div className="discord-feature">
                <div className="feature-icon">�</div>
                <div className="feature-content">
                  <h3>Learn & Grow</h3>
                  <p>Daily discussions, tips, and insights to accelerate your learning</p>
                </div>
              </div>
            </div>

            <div className="discord-hero-cta">
              <a
                href="https://discord.gg/PTZGpAkj"
                target="_blank"
                rel="noopener noreferrer"
                className="discord-cta-button"
              >
                <svg className="discord-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="cta-content">
                  <span className="cta-main">Join Discord Community</span>
                  <span className="cta-sub">Free • 2.5K+ members • Always active</span>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="youtube-section-header">
          <h2 className="community-section-title">Free Tutorials on YouTube</h2>
          <p className="community-section-description">
            Master electronics with our comprehensive video library. From beginner basics to expert-level projects, our tutorials guide you through every step. Whether you're starting from zero or looking to expand your skills, we've got you covered.
          </p>
        </div>
        <div className="community-section-content youtube-carousel-layout">
          <div className="youtube-sliding-carousel">
            <div className="carousel-track-container">
              <div className="carousel-track" id="video-carousel">
                <div className="video-slide">
                  <div className="video-embed">
                    <iframe
                      src="https://www.youtube.com/embed/RrnRigHCeYk?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0"
                      title="nLab YouTube Short 1"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="video-badge">SHORTS</div>
                  </div>
                </div>

                <div className="video-slide">
                  <div className="video-embed">
                    <iframe
                      src="https://www.youtube.com/embed/06awbDAP-iA?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0"
                      title="nLab YouTube Short 2"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="video-badge">SHORTS</div>
                  </div>
                </div>

                <div className="video-slide">
                  <div className="video-embed">
                    <iframe
                      src="https://www.youtube.com/embed/N9EaVBDSBwg?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0"
                      title="nLab YouTube Short 3"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="video-badge">SHORTS</div>
                  </div>
                </div>

                <div className="video-slide">
                  <div className="video-embed">
                    <iframe
                      src="https://www.youtube.com/embed/X9HcTfvf8hc?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0"
                      title="nLab YouTube Short 4"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="video-badge">SHORTS</div>
                  </div>
                </div>

                <div className="video-slide">
                  <div className="video-embed">
                    <iframe
                      src="https://www.youtube.com/embed/yn7C9FMsUuk?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0"
                      title="nLab YouTube Short 5"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="video-badge">SHORTS</div>
                  </div>
                </div>

                <div className="video-slide">
                  <div className="video-embed">
                    <iframe
                      src="https://www.youtube.com/embed/DnVZ-G-2fgA?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0"
                      title="nLab YouTube Short 6"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="video-badge">SHORTS</div>
                  </div>
                </div>

                <div className="video-slide">
                  <div className="video-embed">
                    <iframe
                      src="https://www.youtube.com/embed/YsKdZQbqlf8?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0"
                      title="nLab YouTube Short 7"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="video-badge">SHORTS</div>
                  </div>
                </div>

                <div className="video-slide">
                  <div className="video-embed">
                    <iframe
                      src="https://www.youtube.com/embed/9bTPsE-jXDU?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0"
                      title="nLab YouTube Short 8"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="video-badge">SHORTS</div>
                  </div>
                </div>

                <div className="video-slide">
                  <div className="video-embed">
                    <iframe
                      src="https://www.youtube.com/embed/dPNF-S2GWuo?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0"
                      title="nLab YouTube Short 9"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="video-badge">SHORTS</div>
                  </div>
                </div>

                <div className="video-slide">
                  <div className="video-embed">
                    <iframe
                      src="https://www.youtube.com/embed/_VHsN3I3eA0?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0"
                      title="nLab YouTube Short 10"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="video-badge">SHORTS</div>
                  </div>
                </div>

                <div className="video-slide">
                  <div className="video-embed">
                    <iframe
                      src="https://www.youtube.com/embed/0uqcnvhZcfQ?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0"
                      title="nLab YouTube Short 11"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="video-badge">SHORTS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="community-cta-buttons">
          <a
            href="https://www.youtube.com/@get-nlab"
            target="_blank"
            rel="noopener noreferrer"
            className="community-youtube-btn"
          >
            <img src="/svg/youtube.svg" alt="YouTube" className="community-icon" />
            Subscribe to YouTube
          </a>
        </div> 
      </section>
    </div>
  );
}
