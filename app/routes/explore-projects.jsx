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
    coding: '#00AEEF',
    'extra-parts': '#9B59B6'
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
  // State for coming soon toggle (default ON to show all cards)
  const [showComingSoon, setShowComingSoon] = useState(true);

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

  // All project cards data
  const allProjectCards = [
    // Card 1 - Light an LED
    {
      badge: { type: 'beginner', text: 'BEGINNER' },
      image: '/svg/img/explore_led.png',
      videoId: '_OU6WcBfDhw',
      title: 'LIGHT AN LED',
      description: 'Turn on your very first circuit by powering an LED. In this beginner project, you\'ll learn how current flows through a simple loop, how resistors control current, and why polarity matters when working with electronic components.',
      whatYoullLearn: 'How to use a breadboard to connect components. Why resistors are essential to protect LEDs. How to identify polarity and orient components correctly. The basics of current and voltage in a circuit.'
    },
    // Card 2 - Make your first circuit better
    {
      badge: { type: 'beginner', text: 'BEGINNER' },
      image: '/svg/img/explore_first.png',
      videoId: 'a4OCApcuBT8',
      title: 'MAKE YOUR FIRST CIRCUIT BETTER',
      description: 'Extend your circuit with wire. Learn how the breadboard works, and use wire stripping tools to spread the components of your LED circuit around the breadboard.',
      whatYoullLearn: 'How a breadboard is wired. How to cut and strip a wire. The importance of color coding your wires.'
    },
    // Card 3 - Circuit building skills
    {
      badge: { type: 'beginner', text: 'BEGINNER' },
      image: '/svg/img/explore_fourth.png',
      videoId: 'a4OCApcuBT8',
      title: 'CIRCUIT BUILDING SKILLS',
      description: 'A deep dive into the breadboard and wire. Where did the breadboard come from, and how does it work? Learn about the different types of wire and the best way to use it in a breadboard.',
      whatYoullLearn: 'The origin of the breadboard. How the breadboard connects wires. Solid vs stranded wire. Common wire color coding.'
    },
    // Card 4 - How to use the nLab and app
    {
      badge: { type: 'beginner', text: 'BEGINNER' },
      image: '/svg/img/explore_main.png',
      videoId: 'a4OCApcuBT8',
      title: 'HOW TO USE THE NLAB AND APP',
      description: 'A look at the nLab: an oscilloscope, a power supply, and a function generator. Using the nLab app, you can see you signal, power it, and create signals to work with.',
      whatYoullLearn: 'How to zoom in in time and voltage. How to read voltage from an oscilloscope. How the power supply works. How to set the nLab output signals.'
    },
    // Card 5 - Coding with nLab
    {
      badge: { type: 'beginner', text: 'BEGINNER' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'CODING WITH NLAB',
      description: 'Using Python, you can get access to your nLab to build your own interface. Read voltages and set outputs for your specific project, like a data logger, a game, or a control system.',
      whatYoullLearn: 'How to get the nLab api. The basic api functions. Make a data logger. Make a game in pygame zero.'
    },
    // Card 6 - The science behind electronics
    {
      badge: { type: 'beginner', text: 'BEGINNER' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'THE SCIENCE BEHIND ELECTRONICS',
      description: 'What is electricity? In this video, explore the concepts of voltage, current, and power, using easy to understand analogies.',
      whatYoullLearn: 'Voltage is pressure. Current is like flow.'
    },
    // Card 7 - Series and Parallel Circuits
    {
      badge: { type: 'intermediate', text: 'INTERMEDIATE' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'SERIES AND PARALLEL CIRCUITS',
      description: 'Circuit components are wired in ways that share voltage and current. The properties of voltage, "across", and current, "through", are used to design circuits with just a few easy rules.',
      whatYoullLearn: 'Voltage is a property that is across a component. Current is a property that goes through. Components connect at nodes. Resistors can be combined in series and parallel to make new resistors.'
    },
    // Card 8 - Ohm's Law and Circuit Design
    {
      badge: { type: 'intermediate', text: 'INTERMEDIATE' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'OHM\'S LAW AND CIRCUIT DESIGN',
      description: 'Resistors obey Ohm\'s Law, a simple equation relating voltage, current, and resistance. Combined with series and parallel rules, you can find the voltage at every point and the current through every component!',
      whatYoullLearn: 'Ohm\'s Law, V=IR. Summing voltage around a circuit. Current cannot accumulate at a node.'
    },
    // Card 9 - Build a sensing circuit
    {
      badge: { type: 'intermediate', text: 'INTERMEDIATE' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'BUILD A SENSING CIRCUIT',
      description: 'Design circuits that detect light, temperature, and sound.',
      whatYoullLearn: 'Phototransistors for sensing light. Thermistors for sensing temperature. Microphones for sensing sound.'
    },
    // Card 10 - Design circuits by stacking them like blocks
    {
      badge: { type: 'intermediate', text: 'INTERMEDIATE' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'DESIGN CIRCUITS BY STACKING THEM LIKE BLOCKS',
      description: 'We\'ve designed a few small circuits. By stacking them, we can build more complicated functions. But sometimes this doesn\'t work, unless we consider how they interact with each other.',
      whatYoullLearn: 'Impedance rules.'
    },
    // Card 11 - Capacitors in circuits
    {
      badge: { type: 'intermediate', text: 'INTERMEDIATE' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'CAPACITORS IN CIRCUITS',
      description: 'See how charging capacitors can be used to change how circuits react over time',
      whatYoullLearn: 'Capacitors are not resistors. How to charge a capacitor. Using capacitors with resistors to change how circuits react.'
    },
    // Card 12 - Operational Amplifier Circuits
    {
      badge: { type: 'intermediate', text: 'INTERMEDIATE' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'OPERATIONAL AMPLIFIER CIRCUITS',
      description: 'It is time to super charge our circuits with chips! Operational amplifiers are integrated circuits that use power to solve many of the design challenges we\'ve seen in circuit design. Op amps are used to make decisions, fix impedance problems, and perform math.',
      whatYoullLearn: 'Happy opamp theory. Op amps as comparators. Different op amp circuits for math.'
    },
    // Card 13 - Transistor Circuits
    {
      badge: { type: 'intermediate', text: 'INTERMEDIATE' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'TRANSISTOR CIRCUITS',
      description: 'Learn how transistors created the electronics revolution. In this video, use transistors as switches and amplifiers.',
      whatYoullLearn: 'The transistor equation. Transistors as amplifiers. Transistors as switches. Transistor power considerations.'
    },
    // Card 14 - Record and plot nLab data
    {
      badge: { type: 'coding', text: 'CODING' },
      image: '/svg/img/explore_fourth.png',
      videoId: 'a4OCApcuBT8',
      title: 'RECORD AND PLOT NLAB DATA',
      description: 'Sometimes you want to get your data into a file for use later. In the nLab app, you can save your data as a screenshot and as a .csv file. See how to use the file to plot your data in a spreadsheet and in Python.',
      whatYoullLearn: 'Saving data. Plotting a .csv file in a spreadsheet. Plotting a .csv file in Python.'
    },
    // Card 15 - Design your own game with nLab
    {
      badge: { type: 'coding', text: 'CODING' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'DESIGN YOUR OWN GAME WITH NLAB',
      description: 'Circuits are way more fun when you get to interact with them. Now that you can design functional circuits, let\'s get their data into the computer and do something. Let\'s make a game! Pygame Zero is a great platform to use with the nLab api to quickly get going.',
      whatYoullLearn: 'The engineering design process. Designing, building, testing, and iterating. Making graphics and sound with Python. Modern coding techniques with AI assistance.'
    },
    // Card 16 - Building a microphone
    {
      badge: { type: 'advanced', text: 'ADVANCED' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'BUILDING A MICROPHONE',
      description: 'Project: how to detect sound with a circuit',
      whatYoullLearn: 'Amplifiers. Filters.'
    },
    // Card 17 - An optical pulse sensor
    {
      badge: { type: 'advanced', text: 'ADVANCED' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'AN OPTICAL PULSE SENSOR',
      description: 'Project: use light to detect your pulse, the way a smart watch does',
      whatYoullLearn: 'Biosensing. Amplifiers. Filters.'
    },
    // Card 18 - Make an ECG
    {
      badge: { type: 'extra-parts', text: 'REQUIRES EXTRA PARTS' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'MAKE AN ECG',
      description: 'Project: detect your pulse with electrodes',
      whatYoullLearn: 'Biosensing. Amplifiers. Filters.'
    },
    // Card 19 - Build a thermometer
    {
      badge: { type: 'advanced', text: 'ADVANCED' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'BUILD A THERMOMETER',
      description: 'Project: design a circuit to sense temperature and display the data to a user',
      whatYoullLearn: 'Amplifiers. Comparators. The design process.'
    },
    // Card 20 - Build a motion detector
    {
      badge: { type: 'advanced', text: 'ADVANCED' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'BUILD A MOTION DETECTOR',
      description: 'Project: use light to detect when people are in a room',
      whatYoullLearn: 'Amplifiers. Filters. Active sensing.'
    },
    // Card 21 - Invent a musical instrument
    {
      badge: { type: 'advanced', text: 'ADVANCED' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'INVENT A MUSICAL INSTRUMENT',
      description: 'Project: invent a new way to make music',
      whatYoullLearn: 'Amplifiers. Filters. The design process. Interactive design.'
    },
    // Card 22 - Make an EMG controller
    {
      badge: { type: 'extra-parts', text: 'REQUIRES EXTRA PARTS' },
      image: '/svg/img/soon.webp',
      videoId: 'a4OCApcuBT8',
      title: 'MAKE AN EMG CONTROLLER',
      description: 'Project: detect your muscle activity level with EMG',
      whatYoullLearn: 'Biosensing. Amplifiers, Filters. Rectifiers.'
    }
  ];

  // Function to determine which cards to show based on coming soon toggle
  const getVisibleCardIndices = () => {
    if (showComingSoon) {
      // Show all 22 cards (indices 0-21)
      return Array.from({length: 22}, (_, i) => i);
    } else {
      // Show only first 4 cards (indices 0-3): Light an LED, Make your first circuit better, Circuit building skills, How to use the nLab and app
      return [0, 1, 2, 3];
    }
  };

  // Function to render a project card
  const renderProjectCard = (cardData, index) => {
    return (
      <div key={index} className="featured-project-card">
        <div className="project-video">
          {renderBadge(cardData.badge.type, cardData.badge.text)}
          <img
            src={cardData.image}
            alt={cardData.title}
            className="project-thumbnail"
            onClick={() => openVideoModal(cardData.videoId)}
          />
          <div className="circle-play" onClick={() => openVideoModal(cardData.videoId)}>
            <CirclePlayIcon />
          </div>
        </div>
        <div className="explore-info">
          <h3 className="explore-title">{cardData.title}</h3>
          <p className="explore-description mb-3">
            {cardData.description}
          </p>
          <div className="what-youll-learn">
            <strong>What you'll learn:</strong> {cardData.whatYoullLearn}
          </div>
        </div>
      </div>
    );
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
                    <input
                      type="checkbox"
                      id="coming-soon"
                      checked={showComingSoon}
                      onChange={(e) => setShowComingSoon(e.target.checked)}
                    />
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
                  <input
                    type="checkbox"
                    id="coming-soon-mobile"
                    checked={showComingSoon}
                    onChange={(e) => setShowComingSoon(e.target.checked)}
                  />
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
                  src="/svg/img/explore_led.png"
                  alt="Light an LED Project"
                  className="project-thumbnail"
                  onClick={() => openVideoModal('_OU6WcBfDhw')}
                />
                <div className="circle-play" onClick={() => openVideoModal('_OU6WcBfDhw')}>
                  <CirclePlayIcon />
                </div>
              </div>
              <div className="explore-info">
                <h3 className="explore-title">LIGHT AN LED</h3>
                <div className="explore-duration">13:45</div>
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

            {/* Dynamic Grid of Cards */}
            <div className="projects-grid">
              {getVisibleCardIndices().map(index =>
                renderProjectCard(allProjectCards[index], index)
              )}
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
                  <div className="explore-duration">13:45</div>
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
                    src="/svg/img/soon.webp"
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
                    src="/svg/img/soon.webp"
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
                    src="/svg/img/soon.webp"
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
                    src="/svg/img/soon.webp"
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
                    src="/svg/img/soon.webp"
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
