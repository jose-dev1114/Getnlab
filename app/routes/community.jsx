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
        {/* First Section: Image Left, Text Right */}
        <div className="community-section-content">
          <div className="community-kickstarter-preview">
            <div className="kickstarter-image-placeholder">
              <img src="/svg/img/access_main.png" alt="Kickstarter Campaign" className="kickstarter-image" />
            </div>
          </div>

          <div className="community-text-content kickstarter-centered">
            <h2 className="community-section-title">KICKSTARTER LAUNCHING SOON</h2>
            <p className="community-section-description">
              We're about to launch our Kickstarter campaign and we need the Resistors to help us revolutionize how people learn engineering. Join our pre-launch giveaway for exclusive perks and be part of the mission to help others think like an engineer.
            </p>

            <div className="community-features">
              <div className="community-feature">
                <div className="community-feature-icon">⚡</div>
                <div className="community-feature-text">
                  <h3>Early Bird Pricing</h3>
                  <p>Get the nLab Starter Kit at the lowest price ever offered</p>
                </div>
              </div>

              <div className="community-feature">
                <div className="community-feature-icon">🎁</div>
                <div className="community-feature-text">
                  <h3>Exclusive Rewards</h3>
                  <p>Limited edition items and special recognition for founding backers</p>
                </div>
              </div>

              <div className="community-feature">
                <div className="community-feature-icon">🚀</div>
                <div className="community-feature-text">
                  <h3>Shape the Future</h3>
                  <p>Your backing helps us create the next generation of engineering education</p>
                </div>
              </div>
            </div>

            <div className="community-cta-buttons">
              <a
                href="/early-access"
                className="community-kickstarter-btn"
              >
                Join Pre-Launch Giveaway
              </a>
            </div>
          </div>
        </div>
        <div className="community-section-content">
          <div className="community-text-content">
            <h2 className="community-section-title">Connect on Discord</h2>
            <p className="community-section-description">
              Join a vibrant community of creatives, professionals, and hobbyists who share your passion for building and learning. Our Discord is where connections turn into collaborations, ideas become projects, and everyone pushes each other to succeed.
            </p>

            <div className="community-features">
              <div className="community-feature">
                <div className="community-feature-icon">🤝</div>
                <div className="community-feature-text">
                  <h3>Network & Connect</h3>
                  <p>Build meaningful relationships with makers worldwide</p>
                </div>
              </div>

              <div className="community-feature">
                <div className="community-feature-icon">🎨</div>
                <div className="community-feature-text">
                  <h3>Showcase Projects</h3>
                  <p>Share your work and get feedback from experienced engineers</p>
                </div>
              </div>

              <div className="community-feature">
                <div className="community-feature-icon">📈</div>
                <div className="community-feature-text">
                  <h3>Learn & Grow</h3>
                  <p>Daily discussions, tips, and insights to accelerate your learning</p>
                </div>
              </div>
            </div>

            <div className="community-cta-buttons">
              <a
                href="https://discord.gg/PTZGpAkj"
                target="_blank"
                rel="noopener noreferrer"
                className="community-discord-btn"
              >
                <img src="/svg/discord.svg" alt="Discord" className="community-icon" />
                Join Discord Community
              </a>
            </div>
          </div>

          <div className="community-discord-preview">
            <div className="discord-video-placeholder">
              <img src="/svg/img/access_main.png" alt="Community Video" className="video-thumbnail" />
              <div className="video-play-overlay">
                <div className="play-button-large">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)" />
                    <path d="M25 20L40 30L25 40V20Z" fill="#2B2B2B" />
                  </svg>
                </div>
              </div>
              <div className="video-caption">
                <h3>Meet the Resistors Community</h3>
                <p>See how our community connects and collaborates</p>
              </div>
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
        <h2 className="community-section-title">Free Tutorials on YouTube</h2>
        <p className="community-section-description">
          Master electronics with our comprehensive video library. From beginner basics to expert-level projects, our tutorials guide you through every step. Whether you're starting from zero or looking to expand your skills, we've got you covered.
        </p>

        <div className="community-features">
          <div className="community-feature">
            <div className="community-feature-icon">🎓</div>
            <div className="community-feature-text">
              <h3>Beginner to Expert</h3>
              <p>Progressive tutorials that build your skills step by step</p>
            </div>
          </div>

          <div className="community-feature">
            <div className="community-feature-icon">🔧</div>
            <div className="community-feature-text">
              <h3>Awesome Projects</h3>
              <p>Learn by building real projects that showcase your abilities</p>
            </div>
          </div>

          <div className="community-feature">
            <div className="community-feature-icon">�</div>
            <div className="community-feature-text">
              <h3>Skill Growth</h3>
              <p>Advanced content for experts looking to expand their knowledge</p>
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
