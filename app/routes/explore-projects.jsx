import React, { useState } from 'react';

export const meta = () => {
  return [{ title: 'Explore Projects | nLab' }];
};

// Helper function to get the correct dot color for each badge type
function getBadgeDotColor(badgeType) {
  const colors = {
    beginner: '#27C840',
    intermediate: '#FFC928',
    advanced: '#FF2828',
    coding: '#00AEEF'
  };
  return colors[badgeType] || '#27C840';
}

// Helper function to render badge with SVG dot
function renderBadge(type, text) {
  const dotColor = getBadgeDotColor(type);
  return (
    <div className={`project-badge ${type}`}>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="badge-dot">
        <circle cx="4" cy="4" r="4" fill={dotColor} />
      </svg>
      {text}
    </div>
  );
}

// Simple circle play SVG component
function CirclePlayIcon() {
  return (
    <svg width="144" height="144" viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg" className="play-icon">
      <g filter="url(#filter0_d_1_2164)">
        <path d="M59.25 35.75C60.5625 34.8125 62.4375 34.8125 63.75 35.75L90.75 52.25C92.0625 53 93 54.5 93 56C93 57.6875 92.0625 59.1875 90.75 59.9375L63.75 76.4375C62.4375 77.1875 60.5625 77.375 59.25 76.4375C57.75 75.6875 57 74.1875 57 72.5V39.5C57 38 57.75 36.5 59.25 35.75ZM120 56C120 82.625 98.4375 104 72 104C45.375 104 24 82.625 24 56C24 29.5625 45.375 8 72 8C98.4375 8 120 29.5625 120 56ZM72 17C50.4375 17 33 34.625 33 56C33 77.5625 50.4375 95 72 95C93.375 95 111 77.5625 111 56C111 34.625 93.375 17 72 17Z" fill="white" />
      </g>
      <defs>
        <filter id="filter0_d_1_2164" x="0" y="0" width="144" height="144" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feMorphology radius="8" operator="erode" in="SourceAlpha" result="effect1_dropShadow_1_2164" />
          <feOffset dy="16" />
          <feGaussianBlur stdDeviation="16" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0470588 0 0 0 0 0.0470588 0 0 0 0 0.0509804 0 0 0 0.4 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2164" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2164" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default function ExploreProjects() {
  // State for video modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState('');

  // Handle ESC key to close modal
  React.useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeVideoModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Function to open video modal
  const openVideoModal = (videoId) => {
    console.log('Opening video modal with ID:', videoId);
    setCurrentVideoId(videoId);
    setIsModalOpen(true);
  };

  // Function to close video modal
  const closeVideoModal = () => {
    setIsModalOpen(false);
    setCurrentVideoId('');
  };
  return (
    <div className="explore-projects-page">
      {/* Background Pattern */}
      <div className="explore-projects-pattern">
        <img src="/svg/grey_light.svg" alt="" className="grey-light-pattern" />
      </div>

      {/* Learn by Doing Section */}
      <section className="learn-by-doing-section">
        <div className="learn-by-doing-content">
          <div className="learn-by-doing-text">
            <h1 className="learn-by-doing-title">
              LEARN BY DOING – ONE PROJECT AT A TIME
            </h1>
            <p className="learn-by-doing-description">
              Each nLab project is designed to teach you something new, whether it's lighting your
              first LED, wiring a motion detector, or coding a robot. With beginner, intermediate, and
              advanced tracks, you'll always know what's next and how to keep progressing.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="project-filter-tabs">
            {/* Desktop Filter Tabs */}
            <div className="filter-tabs-desktop">
              <div className="filter-tabs-left">
                <button className="filter-tab active" data-filter="all" onClick={(e) => switchFilterTab(e, 'all')}>All</button>
                <button className="filter-tab" data-filter="beginner" onClick={(e) => switchFilterTab(e, 'beginner')}>Beginner</button>
                <button className="filter-tab" data-filter="intermediate" onClick={(e) => switchFilterTab(e, 'intermediate')}>Intermediate</button>
                <button className="filter-tab" data-filter="advanced" onClick={(e) => switchFilterTab(e, 'advanced')}>Advanced</button>
                <button className="filter-tab" data-filter="coding" onClick={(e) => switchFilterTab(e, 'coding')}>Coding</button>
                <button className="filter-tab" data-filter="extra-parts" onClick={(e) => switchFilterTab(e, 'extra-parts')}>Requires Extra Parts</button>
              </div>
              <div className="filter-tabs-right">
                <div className="coming-soon-toggle">
                  <span>Coming soon</span>
                  <div className="toggle-switch">
                    <input type="checkbox" id="coming-soon" />
                    <label htmlFor="coming-soon"></label>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filter Select */}
            <div className="filter-tabs-mobile">
              <div className="mobile-filter-container">
                <select className="mobile-filter-select" onChange={(e) => switchMobileFilter(e)}>
                  <option value="all">All</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="coding">Coding</option>
                  <option value="extra-parts">Requires Extra Parts</option>
                </select>
              </div>
              <div className="coming-soon-toggle">
                <span>Coming soon</span>
                <div className="toggle-switch">
                  <input type="checkbox" id="coming-soon-mobile" />
                  <label htmlFor="coming-soon-mobile"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content Panels */}
      <section className="project-tab-content">
        <div className="project-tab-container">

          {/* All Projects Panel */}
          <div className="tab-panel active" id="all-panel">
            {/* Main Featured Project Card */}
            <div className="main-featured-project-card">
              <div className="project-video">
                {renderBadge('beginner', 'BEGINNER')}
                <img
                  src="/svg/img/explore_first.png"
                  alt="Light an LED Project"
                  className="project-thumbnail"
                  onClick={() => openVideoModal('a4OCApcuBT8')}
                />
                <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                  <CirclePlayIcon />
                </div>
              </div>
              <div className="explore-info">
                <h3 className="explore-title">LIGHT AN LED</h3>
                <div className="explore-duration">5:23</div>
                <p className="explore-description mb-3">
                  Turn on your very first circuit by powering an LED. In this
                  beginner project, you'll learn how current flows through a
                  simple loop, how resistors control voltage, and why
                  polarity matters when working with electronic
                  components. By the end, you'll have a working light – and
                  the confidence to build your next circuit.
                </p>
                <div className="explore-learning">
                  <h4>WHAT YOU'LL LEARN</h4>
                  <ul>
                    <li>How to use a breadboard to connect components</li>
                    <li>Why resistors are essential to protect LEDs</li>
                    <li>How to identify polarity and orient components correctly</li>
                    <li>The basics of current and voltage in a circuit</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Grid of 6 Cards */}
            <div className="projects-grid">
              {/* Card 1 */}
              <div className="featured-project-card">
                <div className="project-video">
                  {renderBadge('beginner', 'BEGINNER')}
                  <img
                    src="/svg/img/explore_first.png"
                    alt="Light an LED Project"
                    className="project-thumbnail"
                    onClick={() => openVideoModal('a4OCApcuBT8')}
                  />
                  <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                    <CirclePlayIcon />
                  </div>
                </div>
                <div className="explore-info">
                  <h3 className="explore-title">LIGHT AN LED</h3>
                  <div className="explore-duration">5:23</div>
                  <p className="explore-description mb-3">
                    Design and build the circuit that turns on a light
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="featured-project-card">
                <div className="project-video">
                  {renderBadge('intermediate', 'INTERMEDIATE')}
                  <img
                    src="/svg/img/explore_second.png"
                    alt="Blinking LED Project"
                    className="project-thumbnail"
                    onClick={() => openVideoModal('a4OCApcuBT8')}
                  />
                  <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                    <CirclePlayIcon />
                  </div>
                </div>
                <div className="explore-info">
                  <h3 className="explore-title">SERIES AND PARALLEL CIRCUITS</h3>
                  <div className="explore-duration">7:15</div>
                  <p className="explore-description mb-3">
                    Learn how to build any size resistors
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="featured-project-card">
                <div className="project-video">
                  {renderBadge('beginner', 'BEGINNER')}
                  <img
                    src="/svg/img/explore_third.png"
                    alt="Traffic Light Project"
                    className="project-thumbnail"
                    onClick={() => openVideoModal('a4OCApcuBT8')}
                  />
                  <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                    <CirclePlayIcon />
                  </div>
                </div>
                <div className="explore-info">
                  <h3 className="explore-title">LED BRIGHTNESS CONTROL</h3>
                  <div className="explore-duration">12:30</div>
                  <p className="explore-description mb-3">
                    Use the nLab to control an LED
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="featured-project-card">
                <div className="project-video">
                  {renderBadge('beginner', 'BEGINNER')}
                  <img
                    src="/svg/img/explore_fourth.png"
                    alt="Buzzer Circuit Project"
                    className="project-thumbnail"
                    onClick={() => openVideoModal('a4OCApcuBT8')}
                  />
                  <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                    <CirclePlayIcon />
                  </div>
                </div>
                <div className="explore-info">
                  <h3 className="explore-title">SAVING DATA</h3>
                  <div className="explore-duration">6:45</div>
                  <p className="explore-description mb-3">
                    Grab data from the nLab app and view it with your computer
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="featured-project-card">
                <div className="project-video">
                  {renderBadge('intermediate', 'INTERMEDIATE')}
                  <img
                    src="/svg/img/explore_fifth.png"
                    alt="Light Sensor Project"
                    className="project-thumbnail"
                    onClick={() => openVideoModal('a4OCApcuBT8')}
                  />
                  <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                    <CirclePlayIcon />
                  </div>
                </div>
                <div className="explore-info">
                  <h3 className="explore-title">BUILD A THERMOMENTER</h3>
                  <div className="explore-duration">9:20</div>
                  <p className="explore-description mb-3">
                    Design and build a circuit that turns on more LEDs the warmer the sensor gets
                  </p>
                </div>
              </div>

              {/* Card 6 */}
              <div className="featured-project-card">
                <div className="project-video">
                  {renderBadge('advanced', 'ADVANCED')}
                  <img
                    src="/svg/img/explore_sixth.png"
                    alt="Motor Control Project"
                    className="project-thumbnail"
                    onClick={() => openVideoModal('a4OCApcuBT8')}
                  />
                  <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                    <CirclePlayIcon />
                  </div>
                </div>
                <div className="explore-info">
                  <h3 className="explore-title">AMPLIFICATION</h3>
                  <div className="explore-duration">15:10</div>
                  <p className="explore-description mb-3">
                    Design and build circuits that take tiny signals and makes them visible
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Beginner Projects Panel */}
          <div className="tab-panel" id="beginner-panel">
            <div className="projects-grid">
              {/* Beginner Card 1 */}
              <div className="featured-project-card">
                <div className="project-video">
                  {renderBadge('beginner', 'BEGINNER')}
                  <img
                    src="/svg/img/explore_first.png"
                    alt="Light an LED Project"
                    className="project-thumbnail"
                    onClick={() => openVideoModal('a4OCApcuBT8')}
                  />
                  <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                    <CirclePlayIcon />
                  </div>
                </div>
                <div className="explore-info">
                  <h3 className="explore-title">LIGHT AN LED</h3>
                  <div className="explore-duration">5:23</div>
                  <p className="explore-description mb-3">
                    Design and build the circuit that turns on a light
                  </p>
                </div>
              </div>

              {/* Beginner Card 2 */}
              <div className="featured-project-card">
                <div className="project-video">
                  {renderBadge('beginner', 'BEGINNER')}
                  <img
                    src="/svg/img/explore_third.png"
                    alt="LED Brightness Control Project"
                    className="project-thumbnail"
                    onClick={() => openVideoModal('a4OCApcuBT8')}
                  />
                  <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                    <CirclePlayIcon />
                  </div>
                </div>
                <div className="explore-info">
                  <h3 className="explore-title">LED BRIGHTNESS CONTROL</h3>
                  <div className="explore-duration">12:30</div>
                  <p className="explore-description mb-3">
                    Use the nLab to control an LED
                  </p>
                </div>
              </div>

              {/* Beginner Card 3 */}
              <div className="featured-project-card">
                <div className="project-video">
                  {renderBadge('beginner', 'BEGINNER')}
                  <img
                    src="/svg/img/explore_fourth.png"
                    alt="Saving Data Project"
                    className="project-thumbnail"
                    onClick={() => openVideoModal('a4OCApcuBT8')}
                  />
                  <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                    <CirclePlayIcon />
                  </div>
                </div>
                <div className="explore-info">
                  <h3 className="explore-title">SAVING DATA</h3>
                  <div className="explore-duration">6:45</div>
                  <p className="explore-description mb-3">
                    Grab data from the nLab app and view it with your computer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Intermediate Projects Panel */}
          <div className="tab-panel" id="intermediate-panel">
            <div className="projects-grid">
              {/* Intermediate Card 1 */}
              <div className="featured-project-card">
                <div className="project-video">
                  {renderBadge('intermediate', 'INTERMEDIATE')}
                  <img
                    src="/svg/img/explore_second.png"
                    alt="Series and Parallel Circuits Project"
                    className="project-thumbnail"
                    onClick={() => openVideoModal('a4OCApcuBT8')}
                  />
                  <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                    <CirclePlayIcon />
                  </div>
                </div>
                <div className="explore-info">
                  <h3 className="explore-title">SERIES AND PARALLEL CIRCUITS</h3>
                  <div className="explore-duration">7:15</div>
                  <p className="explore-description mb-3">
                    Learn how to build any size resistors
                  </p>
                </div>
              </div>

              {/* Intermediate Card 2 */}
              <div className="featured-project-card">
                <div className="project-video">
                  {renderBadge('intermediate', 'INTERMEDIATE')}
                  <img
                    src="/svg/img/explore_fifth.png"
                    alt="Build a Thermometer Project"
                    className="project-thumbnail"
                    onClick={() => openVideoModal('a4OCApcuBT8')}
                  />
                  <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                    <CirclePlayIcon />
                  </div>
                </div>
                <div className="explore-info">
                  <h3 className="explore-title">BUILD A THERMOMENTER</h3>
                  <div className="explore-duration">9:20</div>
                  <p className="explore-description mb-3">
                    Design and build a circuit that turns on more LEDs the warmer the sensor gets
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Projects Panel */}
          <div className="tab-panel" id="advanced-panel">
            <div className="projects-grid">
              {/* Advanced Card 1 */}
              <div className="featured-project-card">
                <div className="project-video">
                  {renderBadge('advanced', 'ADVANCED')}
                  <img
                    src="/svg/img/explore_sixth.png"
                    alt="Amplification Project"
                    className="project-thumbnail"
                    onClick={() => openVideoModal('a4OCApcuBT8')}
                  />
                  <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                    <CirclePlayIcon />
                  </div>
                </div>
                <div className="explore-info">
                  <h3 className="explore-title">AMPLIFICATION</h3>
                  <div className="explore-duration">15:10</div>
                  <p className="explore-description mb-3">
                    Design and build circuits that take tiny signals and makes them visible
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coding Projects Panel */}
          <div className="tab-panel" id="coding-panel">
            <div className="projects-grid">
              {/* Coding projects would go here - currently no coding-specific cards in the original data */}
              <div className="featured-project-card">
                <div className="project-video">
                  {renderBadge('coding', 'CODING')}
                  <img
                    src="/svg/img/explore_fourth.png"
                    alt="Coding Project"
                    className="project-thumbnail"
                    onClick={() => openVideoModal('a4OCApcuBT8')}
                  />
                  <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                    <CirclePlayIcon />
                  </div>
                </div>
                <div className="explore-info">
                  <h3 className="explore-title">PROGRAMMING BASICS</h3>
                  <div className="explore-duration">8:30</div>
                  <p className="explore-description mb-3">
                    Learn to code your first program with the nLab
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Parts Projects Panel */}
          <div className="tab-panel" id="extra-parts-panel">
            <div className="projects-grid">
              {/* Extra parts projects would go here */}
              <div className="featured-project-card">
                <div className="project-video">
                  {renderBadge('extra-parts', 'REQUIRES EXTRA PARTS')}
                  <img
                    src="/svg/img/explore_sixth.png"
                    alt="Extra Parts Project"
                    className="project-thumbnail"
                    onClick={() => openVideoModal('a4OCApcuBT8')}
                  />
                  <div className="circle-play" onClick={() => openVideoModal('a4OCApcuBT8')}>
                    <CirclePlayIcon />
                  </div>
                </div>
                <div className="explore-info">
                  <h3 className="explore-title">ADVANCED SENSORS</h3>
                  <div className="explore-duration">12:45</div>
                  <p className="explore-description mb-3">
                    Build complex circuits with additional components
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={closeVideoModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="video-container">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Project Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                onError={() => {
                  console.log('Iframe failed to load, opening YouTube in new tab');
                  window.open(`https://www.youtube.com/watch?v=${currentVideoId}`, '_blank');
                  closeVideoModal();
                }}
              ></iframe>
              <div className="video-fallback">
                <p>Having trouble loading the video?</p>
                <button
                  onClick={() => {
                    window.open(`https://www.youtube.com/watch?v=${currentVideoId}`, '_blank');
                    closeVideoModal();
                  }}
                  className="fallback-button"
                >
                  Watch on YouTube
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Filter tab switching function
function switchFilterTab(event, filterName) {
  // Remove active class from all filter tabs and panels
  document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

  // Add active class to clicked tab
  event.target.classList.add('active');

  // Show corresponding panel
  const targetPanel = document.getElementById(`${filterName}-panel`);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  console.log('Filter selected:', filterName);
}

// Mobile filter switching function
function switchMobileFilter(event) {
  const filterName = event.target.value;

  // Remove active class from all filter tabs and panels
  document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

  // Add active class to corresponding desktop tab (for consistency)
  const correspondingTab = document.querySelector(`[data-filter="${filterName}"]`);
  if (correspondingTab) {
    correspondingTab.classList.add('active');
  }

  // Show corresponding panel
  const targetPanel = document.getElementById(`${filterName}-panel`);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  console.log('Mobile filter selected:', filterName);
}
