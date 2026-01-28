import React, { useState, useEffect } from 'react';
import { useLoaderData, useFetcher, data } from 'react-router';

// Loader to fetch project cards from JSONbin
export async function loader({ context }) {
  // Get JSONbin credentials from environment variables
  const binId = context?.env?.JSONBIN_BIN_ID || process.env.JSONBIN_BIN_ID;
  const masterKey = context?.env?.JSONBIN_MASTER_KEY || process.env.JSONBIN_MASTER_KEY;

  if (!binId || !masterKey) {
    console.error('JSONbin credentials not configured');
    return { projectCards: getDefaultProjectCards() };
  }

  const apiUrl = `https://api.jsonbin.io/v3/b/${binId}`;

  try {
    const response = await fetch(`${apiUrl}/latest`, {
      headers: {
        'X-Master-Key': masterKey,
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch from JSONbin:', response.status);
      return { projectCards: getDefaultProjectCards() };
    }

    const responseData = await response.json();
    return { projectCards: responseData.record || getDefaultProjectCards() };
  } catch (error) {
    console.error('Error fetching project cards:', error);
    return { projectCards: getDefaultProjectCards() };
  }
}

// Action to update project cards in JSONbin
export async function action({ request, context }) {
  // Get JSONbin credentials from environment variables
  const binId = context?.env?.JSONBIN_BIN_ID || process.env.JSONBIN_BIN_ID;
  const masterKey = context?.env?.JSONBIN_MASTER_KEY || process.env.JSONBIN_MASTER_KEY;

  if (!binId || !masterKey) {
    return data({ success: false, error: 'JSONbin credentials not configured' }, { status: 500 });
  }

  const apiUrl = `https://api.jsonbin.io/v3/b/${binId}`;
  const formData = await request.formData();
  const cardsJson = formData.get('cards');

  try {
    const cards = JSON.parse(cardsJson);

    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': masterKey,
      },
      body: JSON.stringify(cards),
    });

    if (!response.ok) {
      return data({ success: false, error: `JSONbin API error: ${response.status}` }, { status: 500 });
    }

    return { success: true };
  } catch (error) {
    return data({ success: false, error: error.message }, { status: 500 });
  }
}

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

// Default project cards data
function getDefaultProjectCards() {
  return [
    { badge: { type: 'beginner', text: 'BEGINNER' }, image: '/svg/img/thumbnail1.png', videoId: '_OU6WcBfDhw', title: 'BUILD YOUR FIRST CIRCUIT IN TEN MINUTES', description: 'Turn on your very first circuit by powering an LED. In this beginner project, you\'ll learn how current flows through a simple loop, how resistors control current, and why polarity matters when working with electronic components. By the end, you\'ll have a working light – and the confidence to build your next circuit.', whatYoullLearn: 'How to use a breadboard to connect components. Why resistors are essential to protect LEDs. How to identify polarity and orient components correctly. The basics of current and voltage in a circuit.', duration: '13:45' },
    { badge: { type: 'beginner', text: 'BEGINNER' }, image: '/svg/img/thumbnail2.png', videoId: 'a4OCApcuBT8', title: 'HOW TO USE WIRE TO CUSTOMIZE YOUR CIRCUITS', description: 'Extend your circuit with wire. Learn how the breadboard works, and use wire stripping tools to spread the components of your LED circuit around the breadboard.', whatYoullLearn: 'How a breadboard is wired. How to cut and strip a wire. The importance of color coding your wires.' },
    { badge: { type: 'beginner', text: 'BEGINNER' }, image: '/svg/img/explore_fourth.png', title: 'CIRCUIT BUILDING SKILLS', description: 'A deep dive into the breadboard and wire. Where did the breadboard come from, and how does it work? Learn about the different types of wire and the best way to use it in a breadboard.', whatYoullLearn: 'The origin of the breadboard. How the breadboard connects wires. Solid vs stranded wire. Common wire color coding.' },
    { badge: { type: 'beginner', text: 'BEGINNER' }, image: '/svg/img/explore_main.png', title: 'HOW TO USE THE NLAB AND APP', description: 'A look at the nLab: an oscilloscope, a power supply, and a function generator. Using the nLab app, you can see you signal, power it, and create signals to work with.', whatYoullLearn: 'How to zoom in in time and voltage. How to read voltage from an oscilloscope. How the power supply works. How to set the nLab output signals.' },
    { badge: { type: 'beginner', text: 'BEGINNER' }, image: '/svg/img/soon.webp', title: 'CODING WITH NLAB', description: 'Using Python, you can get access to your nLab to build your own interface. Read voltages and set outputs for your specific project, like a data logger, a game, or a control system.', whatYoullLearn: 'How to get the nLab api. The basic api functions. Make a data logger. Make a game in pygame zero.' },
    { badge: { type: 'beginner', text: 'BEGINNER' }, image: '/svg/img/soon.webp', title: 'THE SCIENCE BEHIND ELECTRONICS', description: 'What is electricity? In this video, explore the concepts of voltage, current, and power, using easy to understand analogies.', whatYoullLearn: 'Voltage is pressure. Current is like flow.' },
    { badge: { type: 'intermediate', text: 'INTERMEDIATE' }, image: '/svg/img/soon.webp', title: 'SERIES AND PARALLEL CIRCUITS', description: 'Circuit components are wired in ways that share voltage and current. The properties of voltage, "across", and current, "through", are used to design circuits with just a few easy rules. In this video, see how resistors, LEDs, and buttons can be placed for different effects.', whatYoullLearn: 'Voltage is a property that is across a component. Current is a property that goes through. Components connect at nodes. Resistors can be combined in series and parallel to make new resistors.' },
    { badge: { type: 'intermediate', text: 'INTERMEDIATE' }, image: '/svg/img/soon.webp', title: 'OHM\'S LAW AND CIRCUIT DESIGN', description: 'Resistors obey Ohm\'s Law, a simple equation relating voltage, current, and resistance. Combined with series and parallel rules, you can find the voltage at every point and the current through every component!', whatYoullLearn: 'Ohm\'s Law, V=IR. Summing voltage around a circuit. Current cannot accumulate at a node.' },
    { badge: { type: 'intermediate', text: 'INTERMEDIATE' }, image: '/svg/img/soon.webp', title: 'BUILD A SENSING CIRCUIT', description: 'Design circuits that detect light, temperature, and sound.', whatYoullLearn: 'Phototransistors for sensing light. Thermistors for sensing temperature. Microphones for sensing sound.' },
    { badge: { type: 'intermediate', text: 'INTERMEDIATE' }, image: '/svg/img/soon.webp', title: 'DESIGN CIRCUITS BY STACKING THEM LIKE BLOCKS', description: 'We\'ve designed a few small circuits. By stacking them, we can build more complicated functions. But sometimes this doesn\'t work, unless we consider how they interact with each other.', whatYoullLearn: 'Impedance rules.' },
    { badge: { type: 'intermediate', text: 'INTERMEDIATE' }, image: '/svg/img/soon.webp', title: 'CAPACITORS IN CIRCUITS', description: 'See how charging capacitors can be used to change how circuits react over time', whatYoullLearn: 'Capacitors are not resistors. How to charge a capacitor. Using capacitors with resistors to change how circuits react.' },
    { badge: { type: 'intermediate', text: 'INTERMEDIATE' }, image: '/svg/img/soon.webp', title: 'OPERATIONAL AMPLIFIER CIRCUITS', description: 'It is time to super charge our circuits with chips! Operational amplifiers are integrated circuits that use power to solve many of the design challenges we\'ve seen in circuit design. Op amps are used to make decisions, fix impedance problems, and perform math. In this video, see how they are used and add to your list of circuit blocks.', whatYoullLearn: 'Happy opamp theory. Op amps as comparators. Different op amp circuits for math.' },
    { badge: { type: 'intermediate', text: 'INTERMEDIATE' }, image: '/svg/img/soon.webp', title: 'TRANSISTOR CIRCUITS', description: 'Learn how transistors created the electronics revolution. In this video, use transistors as switches and amplifiers.', whatYoullLearn: 'The transistor equation. Transistors as amplifiers. Transistors as switches. Transistor power considerations.' },
    { badge: { type: 'coding', text: 'CODING' }, image: '/svg/img/soon.webp', title: 'RECORD AND PLOT NLAB DATA', description: 'Sometimes you want to get your data into a file for use later. In the nLab app, you can save your data as a screenshot and as a .csv file. See how to use the file to plot your data in a spreadsheet and in Python.', whatYoullLearn: 'Saving data. Plotting a .csv file in a spreadsheet. Plotting a .csv file in Python.' },
    { badge: { type: 'coding', text: 'CODING' }, image: '/svg/img/soon.webp', title: 'DESIGN YOUR OWN GAME WITH NLAB', description: 'Circuits are way more fun when you get to interact with them. Now that you can design functional circuits, let\'s get their data into the computer and do something. Let\'s make a game! Pygame Zero is a great platform to use with the nLab api to quickly get going.', whatYoullLearn: 'The engineering design process. Designing, building, testing, and iterating. Making graphics and sound with Python. Modern coding techniques with AI assistance.' },
    { badge: { type: 'advanced', text: 'ADVANCED' }, image: '/svg/img/soon.webp', title: 'BUILDING A MICROPHONE', description: 'Project: how to detect sound with a circuit', whatYoullLearn: 'Amplifiers. Filters.' },
    { badge: { type: 'advanced', text: 'ADVANCED' }, image: '/svg/img/soon.webp', title: 'AN OPTICAL PULSE SENSOR', description: 'Project: use light to detect your pulse, the way a smart watch does', whatYoullLearn: 'Biosensing. Amplifiers. Filters.' },
    { badge: { type: 'extra-parts', text: 'REQUIRES EXTRA PARTS' }, image: '/svg/img/soon.webp', title: 'MAKE AN ECG', description: 'Project: detect your pulse with electrodes', whatYoullLearn: 'Biosensing. Amplifiers. Filters.' },
    { badge: { type: 'advanced', text: 'ADVANCED' }, image: '/svg/img/soon.webp', title: 'BUILD A THERMOMETER', description: 'Project: design a circuit to sense temperature and display the data to a user', whatYoullLearn: 'Amplifiers. Comparators. The design process.' },
    { badge: { type: 'advanced', text: 'ADVANCED' }, image: '/svg/img/soon.webp', title: 'BUILD A MOTION DETECTOR', description: 'Project: use light to detect when people are in a room', whatYoullLearn: 'Amplifiers. Filters. Active sensing.' },
    { badge: { type: 'advanced', text: 'ADVANCED' }, image: '/svg/img/soon.webp', title: 'INVENT A MUSICAL INSTRUMENT', description: 'Project: invent a new way to make music', whatYoullLearn: 'Amplifiers. Filters. The design process. Interactive design.' },
    { badge: { type: 'extra-parts', text: 'REQUIRES EXTRA PARTS' }, image: '/svg/img/soon.webp', title: 'MAKE AN EMG CONTROLLER', description: 'Project: detect your muscle activity level with EMG', whatYoullLearn: 'Biosensing. Amplifiers, Filters. Rectifiers.' }
  ];
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
  // Get data from loader
  const { projectCards: initialCards } = useLoaderData();
  const fetcher = useFetcher();

  // State for video modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState('');
  // State for coming soon toggle (default ON to show all cards)
  const [showComingSoon, setShowComingSoon] = useState(true);
  // State for coming soon popup
  const [showComingSoonPopup, setShowComingSoonPopup] = useState(false);

  // Admin Dashboard State
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const [editingCard, setEditingCard] = useState(null);
  const [newVideoForm, setNewVideoForm] = useState({
    title: '',
    description: '',
    whatYoullLearn: '',
    youtubeUrl: '',
    thumbnailUrl: '',
    level: 'beginner'
  });

  // Edit video modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingVideoIndex, setEditingVideoIndex] = useState(null);
  const [editVideoForm, setEditVideoForm] = useState({
    title: '',
    description: '',
    whatYoullLearn: '',
    youtubeUrl: '',
    thumbnailUrl: '',
    level: 'beginner'
  });

  // Delete confirmation modal state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // All project cards data - initialized from JSONbin via loader
  const [allProjectCards, setAllProjectCards] = useState(initialCards);

  // Sync with loader data when it changes (e.g., after navigation)
  useEffect(() => {
    setAllProjectCards(initialCards);
  }, [initialCards]);

  // Track if we need to save (only after user makes changes)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Mark as having unsaved changes when allProjectCards changes (after initial load)
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    setHasUnsavedChanges(true);
  }, [allProjectCards]);

  // Debounced save - wait 1.5 seconds after last change before saving
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const timeoutId = setTimeout(() => {
      const formData = new FormData();
      formData.append('cards', JSON.stringify(allProjectCards));
      fetcher.submit(formData, { method: 'post' });
      setHasUnsavedChanges(false);
    }, 1500); // Wait 1.5 seconds

    return () => clearTimeout(timeoutId); // Cancel if another change happens
  }, [hasUnsavedChanges, allProjectCards]);

  // Hacking screen state
  const [showHackingScreen, setShowHackingScreen] = useState(false);
  const [hackingProgress, setHackingProgress] = useState(0);
  const [hackingLogs, setHackingLogs] = useState([]);

  // Matrix animation function
  const initMatrixAnimation = () => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillStyle = `hsl(120, 100%, ${Math.random() * 50 + 50}%)`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    return () => clearInterval(interval);
  };

  // Hacking screen simulation
  const startHackingSequence = () => {
    setShowHackingScreen(true);
    setHackingProgress(0);
    setHackingLogs([]);

    const hackingSteps = [
      { delay: 500, text: "INITIALIZING BREACH PROTOCOL...", progress: 5 },
      { delay: 800, text: "SCANNING NETWORK VULNERABILITIES...", progress: 15 },
      { delay: 1200, text: "EXPLOITING SSL HANDSHAKE...", progress: 25 },
      { delay: 600, text: "BYPASSING FIREWALL RULES...", progress: 40 },
      { delay: 900, text: "INJECTING PAYLOAD INTO SYSTEM...", progress: 55 },
      { delay: 700, text: "ESCALATING PRIVILEGES...", progress: 70 },
      { delay: 1000, text: "DECRYPTING ADMIN CREDENTIALS...", progress: 85 },
      { delay: 800, text: "ACCESS GRANTED - ENTERING ADMIN PANEL...", progress: 100 }
    ];

    let currentStep = 0;
    const executeStep = () => {
      if (currentStep < hackingSteps.length) {
        const step = hackingSteps[currentStep];
        setTimeout(() => {
          setHackingLogs(prev => [...prev, step.text]);
          setHackingProgress(step.progress);

          if (step.progress === 100) {
            setTimeout(() => {
              setShowHackingScreen(false);
              setShowAdminDashboard(true);
            }, 1000);
          } else {
            currentStep++;
            executeStep();
          }
        }, step.delay);
      }
    };
    executeStep();
  };

  // Handle ESC key to close modal and Ctrl+N for admin dashboard
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      // ESC key to close modal
      if (event.key === 'Escape' && isModalOpen) {
        closeVideoModal();
      }

      // Cross-platform shortcut to open admin dashboard
      // Detect Mac vs Windows/Linux
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform) ||
                   /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

      let shouldStartHacking = false;

      if (isMac) {
        // Mac: Cmd+N (simpler shortcut for hacking sequence)
        if (event.metaKey && !event.altKey && !event.shiftKey && !event.ctrlKey && event.key.toLowerCase() === 'l') {
          shouldStartHacking = true;
        }
      } else {
        // Windows/Linux: Ctrl+N
        if (event.ctrlKey && event.key.toLowerCase() === 'l') {
          shouldStartHacking = true;
        }
      }

      if (shouldStartHacking) {
        event.preventDefault();
        startHackingSequence();
      }

      // ESC key to close admin dashboard
      if (event.key === 'Escape' && showAdminDashboard) {
        setShowAdminDashboard(false);
        setIsAdminAuthenticated(false);
        setAdminCredentials({ username: '', password: '' });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Initialize Matrix animation when admin dashboard opens
    let matrixCleanup;
    if (showAdminDashboard) {
      setTimeout(() => {
        matrixCleanup = initMatrixAnimation();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      if (matrixCleanup) matrixCleanup();
    };
  }, [isModalOpen, showAdminDashboard]);

 
  const openVideoModal = (videoId) => {
    setCurrentVideoId(videoId);
    setIsModalOpen(true);
  };

  // Function to close video modal
  const closeVideoModal = () => {
    setIsModalOpen(false);
    setCurrentVideoId('');
  };

  // Admin Functions
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminCredentials.username === 'NA' && adminCredentials.password === 'nlabvideos') {
      setIsAdminAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const extractYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  // Get YouTube thumbnail URL from video ID
  const getYouTubeThumbnail = (videoId) => {
    if (!videoId) return '';
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const handleAddVideo = (e) => {
    e.preventDefault();
    const videoId = extractYouTubeVideoId(newVideoForm.youtubeUrl);

    if (!videoId) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    // Use custom thumbnail URL, YouTube auto-thumbnail, or default
    const thumbnailImage = newVideoForm.thumbnailUrl || getYouTubeThumbnail(videoId) || '/svg/img/soon.webp';

    const newCard = {
      badge: {
        type: newVideoForm.level,
        text: newVideoForm.level.toUpperCase().replace('-', ' ')
      },
      image: thumbnailImage,
      videoId: videoId,
      title: newVideoForm.title.toUpperCase(),
      description: newVideoForm.description,
      whatYoullLearn: newVideoForm.whatYoullLearn
    };

    // Add to allProjectCards array using state setter
    setAllProjectCards(prev => [...prev, newCard]);

    // Reset form
    setNewVideoForm({
      title: '',
      description: '',
      whatYoullLearn: '',
      youtubeUrl: '',
      thumbnailUrl: '',
      level: 'beginner'
    });

    alert('Video added successfully!');
  };

  // Handle opening edit modal
  const handleEditVideo = (index) => {
    const video = allProjectCards[index];
    setEditingVideoIndex(index);
    setEditVideoForm({
      title: video.title,
      description: video.description,
      whatYoullLearn: video.whatYoullLearn,
      youtubeUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
      thumbnailUrl: video.image || '',
      level: video.badge.type
    });
    setEditModalOpen(true);
  };

  // Handle updating video
  const handleUpdateVideo = (e) => {
    e.preventDefault();
    const videoId = extractYouTubeVideoId(editVideoForm.youtubeUrl);

    if (!videoId) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    // Use custom thumbnail URL, YouTube auto-thumbnail, or default
    const thumbnailImage = editVideoForm.thumbnailUrl || getYouTubeThumbnail(videoId) || '/svg/img/soon.webp';

    const updatedCard = {
      badge: {
        type: editVideoForm.level,
        text: editVideoForm.level.toUpperCase().replace('-', ' ')
      },
      image: thumbnailImage,
      videoId: videoId,
      title: editVideoForm.title.toUpperCase(),
      description: editVideoForm.description,
      whatYoullLearn: editVideoForm.whatYoullLearn
    };

    // Update the video in the array using state setter
    setAllProjectCards(prev => {
      const newCards = [...prev];
      newCards[editingVideoIndex] = updatedCard;
      return newCards;
    });

    // Close modal and reset form
    setEditModalOpen(false);
    setEditingVideoIndex(null);
    setEditVideoForm({
      title: '',
      description: '',
      whatYoullLearn: '',
      youtubeUrl: '',
      thumbnailUrl: '',
      level: 'beginner'
    });

    alert('Video updated successfully!');
  };

  // Handle delete button click - show confirmation modal
  const handleDeleteVideo = () => {
    setDeleteConfirmOpen(true);
  };

  // Confirm deletion
  const confirmDeleteVideo = () => {
    setAllProjectCards(prev => prev.filter((_, index) => index !== editingVideoIndex));
    setEditModalOpen(false);
    setDeleteConfirmOpen(false);
    setEditingVideoIndex(null);
    alert('✅ Video deleted successfully!');
  };

  // Cancel deletion
  const cancelDeleteVideo = () => {
    setDeleteConfirmOpen(false);
  };

  // Function to determine which cards to show based on coming soon toggle
  const getVisibleCardIndices = () => {
    if (showComingSoon) {
      // Show all cards dynamically
      return Array.from({length: allProjectCards.length}, (_, i) => i);
    } else {
      // Show only first 4 cards (indices 0-3): Light an LED, Make your first circuit better, Circuit building skills, How to use the nLab and app
      return [0, 1, 2, 3];
    }
  };

  // Function to filter cards by badge type
  const getCardsByBadgeType = (badgeType) => {
    const visibleIndices = getVisibleCardIndices();
    return visibleIndices.filter(index => {
      const card = allProjectCards[index];
      return card.badge.type === badgeType;
    });
  };

  // Function to handle card click - either open video or show coming soon popup
  const handleCardClick = (cardData) => {
    if (cardData.videoId) {
      openVideoModal(cardData.videoId);
    } else {
      setShowComingSoonPopup(true);
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
            onClick={() => handleCardClick(cardData)}
            onError={(e) => {
              // Fallback to default image if URL fails to load
              e.target.src = '/svg/img/soon.webp';
            }}
          />
          <div className="circle-play" onClick={() => handleCardClick(cardData)}>
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
                  src="/svg/img/thumbnail1.png"
                  alt="Light an LED Project"
                  className="project-thumbnail"
                  onClick={() => openVideoModal('_OU6WcBfDhw')}
                />
                <div className="circle-play" onClick={() => openVideoModal('_OU6WcBfDhw')}>
                  <CirclePlayIcon />
                </div>
              </div>
              <div className="explore-info">
                <h3 className="explore-title">BUILD YOUR FIRST CIRCUIT IN TEN MINUTES</h3>
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
              {getCardsByBadgeType('beginner').map(index =>
                renderProjectCard(allProjectCards[index], index)
              )}
            </div>
          </div>

          {/* Intermediate Projects Panel */}
          <div className="tab-panel" id="intermediate-panel">
            <div className="projects-grid">
              {getCardsByBadgeType('intermediate').map(index =>
                renderProjectCard(allProjectCards[index], index)
              )}
            </div>
          </div>

          {/* Advanced Projects Panel */}
          <div className="tab-panel" id="advanced-panel">
            <div className="projects-grid">
              {getCardsByBadgeType('advanced').map(index =>
                renderProjectCard(allProjectCards[index], index)
              )}
            </div>
          </div>

          {/* Coding Projects Panel */}
          <div className="tab-panel" id="coding-panel">
            <div className="projects-grid">
              {getCardsByBadgeType('coding').map(index =>
                renderProjectCard(allProjectCards[index], index)
              )}
            </div>
          </div>

          {/* Extra Parts Projects Panel */}
          <div className="tab-panel" id="extra-parts-panel">
            <div className="projects-grid">
              {getCardsByBadgeType('extra-parts').map(index =>
                renderProjectCard(allProjectCards[index], index)
              )}
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

      {/* Coming Soon Popup */}
      {showComingSoonPopup && (
        <div className="coming-soon-popup-overlay" onClick={() => setShowComingSoonPopup(false)}>
          <div className="coming-soon-popup" onClick={(e) => e.stopPropagation()}>
            <button className="coming-soon-close" onClick={() => setShowComingSoonPopup(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="coming-soon-content">
              <div className="coming-soon-icon">🚀</div>
              <h3 className="coming-soon-title">Coming Soon!</h3>
              <p className="coming-soon-text">This project is currently in development. Check back soon for new content!</p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Dashboard */}
      {showAdminDashboard && (
        <div className="admin-dashboard-overlay">
          {/* Matrix Background */}
          <div className="matrix-background">
            <canvas id="matrix-canvas"></canvas>
          </div>

          {/* Futuristic Grid Overlay */}
          <div className="cyber-grid"></div>

          {/* Scanning Lines */}
          <div className="scan-lines"></div>

          <div className="admin-dashboard-content">
            <div className="admin-dashboard-header">
              <div className="header-glow"></div>
              <div className="header-content">
                <div className="admin-title-container">
                  <div className="security-badge">
                    <div className="badge-icon">🔒</div>
                    <span>TOP SECRET</span>
                  </div>
                  <h2 className="admin-title">
                    <span className="glitch-text" data-text="ADMIN DASHBOARD">ADMIN DASHBOARD</span>
                    <span className="subtitle">VIDEO MANAGEMENT SYSTEM</span>
                  </h2>
                </div>
                <button
                  className="admin-close-button"
                  onClick={() => {
                    setShowAdminDashboard(false);
                    setIsAdminAuthenticated(false);
                    setAdminCredentials({ username: '', password: '' });
                  }}
                >
                  <span className="close-icon">✕</span>
                </button>
              </div>
            </div>

            {!isAdminAuthenticated ? (
              <div className="admin-login-form">
                <div className="login-container">
                  <div className="access-denied-animation">
                    <div className="security-scanner"></div>
                  </div>

                  <div className="login-header">
                    <div className="terminal-prompt">
                      <span className="prompt-symbol">$</span>
                      <span className="typing-text">ACCESSING SECURE TERMINAL...</span>
                    </div>
                    <h3 className="login-title">
                      <span className="cyber-text">AUTHORIZATION REQUIRED</span>
                    </h3>
                  </div>

                  <form onSubmit={handleAdminLogin} className="cyber-form">
                    <div className="form-group cyber-input-group">
                      <label className="cyber-label">
                        <span className="label-icon">👤</span>
                        USERNAME
                      </label>
                      <div className="input-container">
                        <input
                          type="text"
                          className="cyber-input"
                          value={adminCredentials.username}
                          onChange={(e) => setAdminCredentials({
                            ...adminCredentials,
                            username: e.target.value
                          })}
                          placeholder="Enter access code..."
                          required
                        />
                        <div className="input-glow"></div>
                      </div>
                    </div>

                    <div className="form-group cyber-input-group">
                      <label className="cyber-label">
                        <span className="label-icon">🔐</span>
                        PASSWORD
                      </label>
                      <div className="input-container">
                        <input
                          type="password"
                          className="cyber-input"
                          value={adminCredentials.password}
                          onChange={(e) => setAdminCredentials({
                            ...adminCredentials,
                            password: e.target.value
                          })}
                          placeholder="Enter security key..."
                          required
                        />
                        <div className="input-glow"></div>
                      </div>
                    </div>

                    <button type="submit" className="cyber-login-button">
                      <span className="button-text">INITIATE ACCESS</span>
                      <div className="button-glow"></div>
                      <div className="button-particles"></div>
                    </button>
                  </form>

                  <div className="security-footer">
                    <div className="security-level">
                      <span className="level-indicator"></span>
                      CLEARANCE LEVEL: OMEGA
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="admin-dashboard-main">
                <div className="admin-dashboard-left">
                  <div className="admin-video-management">
                    <div className="management-header">
                      <div className="system-status">
                        <div className="status-indicator online"></div>
                        <span>SYSTEM ONLINE</span>
                      </div>
                      <h3 className="management-title">
                        <span className="hologram-text">VIDEO UPLOAD PROTOCOL</span>
                      </h3>
                    </div>

                <form onSubmit={handleAddVideo} className="cyber-video-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Video Title:</label>
                      <input
                        type="text"
                        value={newVideoForm.title}
                        onChange={(e) => setNewVideoForm({
                          ...newVideoForm,
                          title: e.target.value
                        })}
                        placeholder="Enter video title..."
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Level:</label>
                      <select
                        value={newVideoForm.level}
                        onChange={(e) => setNewVideoForm({
                          ...newVideoForm,
                          level: e.target.value
                        })}
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="coding">Coding</option>
                        <option value="extra-parts">Requires Extra Parts</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>YouTube URL:</label>
                    <input
                      type="url"
                      value={newVideoForm.youtubeUrl}
                      onChange={(e) => setNewVideoForm({
                        ...newVideoForm,
                        youtubeUrl: e.target.value
                      })}
                      placeholder="https://www.youtube.com/watch?v=..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Thumbnail URL (optional - uses YouTube thumbnail if empty):</label>
                    <input
                      type="url"
                      value={newVideoForm.thumbnailUrl}
                      onChange={(e) => setNewVideoForm({...newVideoForm, thumbnailUrl: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                      className="admin-input"
                    />
                    {newVideoForm.thumbnailUrl && (
                      <div className="thumbnail-preview" style={{marginTop: '10px', padding: '10px', background: '#1a1a1a', borderRadius: '8px'}}>
                        <p style={{color: '#0f0', fontSize: '12px', marginBottom: '8px'}}>Preview:</p>
                        <img
                          src={newVideoForm.thumbnailUrl}
                          alt="Thumbnail preview"
                          style={{maxWidth: '200px', maxHeight: '150px', borderRadius: '8px', border: '1px solid #333', display: 'block'}}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <p style={{color: '#f55', fontSize: '11px', display: 'none'}}>
                          ⚠ Image failed to load - URL may be invalid
                        </p>
                      </div>
                    )}
                    <p style={{color: '#888', fontSize: '11px', marginTop: '5px'}}>
                      Leave empty to use YouTube's auto-generated thumbnail
                    </p>
                  </div>

                  <div className="form-group">
                    <label>Description:</label>
                    <textarea
                      value={newVideoForm.description}
                      onChange={(e) => setNewVideoForm({
                        ...newVideoForm,
                        description: e.target.value
                      })}
                      rows="3"
                      placeholder="Enter video description..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>What You'll Learn:</label>
                    <textarea
                      value={newVideoForm.whatYoullLearn}
                      onChange={(e) => setNewVideoForm({
                        ...newVideoForm,
                        whatYoullLearn: e.target.value
                      })}
                      rows="3"
                      placeholder="What will viewers learn from this video..."
                      required
                    />
                  </div>

                    <button type="submit" className="admin-add-video-button">
                      <span className="button-text">ADD VIDEO</span>
                      <div className="button-glow"></div>
                    </button>
                  </form>
                  </div>
                </div>

                <div className="admin-dashboard-right">
                  <div className="management-header">
                    <div className="system-status">
                      <div className="status-indicator online"></div>
                      <span>DATABASE ACTIVE</span>
                    </div>
                    <h3 className="management-title">
                      <span className="hologram-text">CURRENT VIDEOS ({allProjectCards.length})</span>
                    </h3>
                  </div>
                  <div className="admin-video-list">
                    <div className="video-list-container">
                      {allProjectCards.map((card, index) => (
                        <div
                          key={index}
                          className="admin-video-item clickable"
                          onClick={() => handleEditVideo(index)}
                          title="Click to edit or delete this video"
                        >
                          <img src={card.image} alt={card.title} className="admin-video-thumbnail" />
                          <div className="admin-video-info">
                            <h4>{card.title}</h4>
                            <span className="admin-video-level">{card.badge.text}</span>
                            <p>{card.description.substring(0, 100)}...</p>
                          </div>
                          <div className="admin-video-actions">
                            <span className="edit-hint">✏️ Click to Edit</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Video Modal */}
      {editModalOpen && (
        <div className="modal-overlay" onClick={() => setEditModalOpen(false)}>
          <div className="modal-content edit-video-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="hologram-text">EDIT VIDEO</h2>
              <button
                className="modal-close"
                onClick={() => setEditModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateVideo} className="edit-video-form">
              <div className="form-group">
                <label>Video Title:</label>
                <input
                  type="text"
                  value={editVideoForm.title}
                  onChange={(e) => setEditVideoForm({
                    ...editVideoForm,
                    title: e.target.value
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Level:</label>
                <select
                  value={editVideoForm.level}
                  onChange={(e) => setEditVideoForm({
                    ...editVideoForm,
                    level: e.target.value
                  })}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="form-group">
                <label>YouTube URL:</label>
                <input
                  type="url"
                  value={editVideoForm.youtubeUrl}
                  onChange={(e) => setEditVideoForm({
                    ...editVideoForm,
                    youtubeUrl: e.target.value
                  })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Thumbnail URL (optional - uses YouTube thumbnail if empty):</label>
                <input
                  type="url"
                  value={editVideoForm.thumbnailUrl}
                  onChange={(e) => setEditVideoForm({...editVideoForm, thumbnailUrl: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                  className="admin-input"
                />
                {editVideoForm.thumbnailUrl && (
                  <div className="thumbnail-preview" style={{marginTop: '10px', padding: '10px', background: '#1a1a1a', borderRadius: '8px'}}>
                    <p style={{color: '#0f0', fontSize: '12px', marginBottom: '8px'}}>Current thumbnail:</p>
                    <img
                      src={editVideoForm.thumbnailUrl}
                      alt="Thumbnail preview"
                      style={{maxWidth: '200px', maxHeight: '150px', borderRadius: '8px', border: '1px solid #333', display: 'block'}}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <p style={{color: '#f55', fontSize: '11px', display: 'none'}}>
                      ⚠ Image failed to load - URL may be invalid
                    </p>
                  </div>
                )}
                <p style={{color: '#888', fontSize: '11px', marginTop: '5px'}}>
                  Leave empty to use YouTube's auto-generated thumbnail
                </p>
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={editVideoForm.description}
                  onChange={(e) => setEditVideoForm({
                    ...editVideoForm,
                    description: e.target.value
                  })}
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label>What You'll Learn:</label>
                <textarea
                  value={editVideoForm.whatYoullLearn}
                  onChange={(e) => setEditVideoForm({
                    ...editVideoForm,
                    whatYoullLearn: e.target.value
                  })}
                  rows="3"
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="update-video-btn">
                  Update Video
                </button>
                <button
                  type="button"
                  className="delete-video-btn"
                  onClick={handleDeleteVideo}
                >
                  Delete Video
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="modal-overlay" onClick={cancelDeleteVideo}>
          <div className="modal-content delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-warning-header">
              <div className="warning-icon">⚠️</div>
              <h2>Delete Video</h2>
            </div>

            <div className="delete-warning-content">
              <p className="warning-title">
                Are you sure you want to permanently delete this video?
              </p>

              <div className="video-info-preview">
                <strong>"{allProjectCards[editingVideoIndex]?.title}"</strong>
              </div>

              <div className="warning-details">
                <p>This action cannot be undone and will remove:</p>
                <ul>
                  <li>The video from your project list</li>
                  <li>All associated data and settings</li>
                  <li>Any custom thumbnail uploaded</li>
                </ul>
              </div>
            </div>

            <div className="delete-modal-actions">
              <button
                className="confirm-delete-btn"
                onClick={confirmDeleteVideo}
              >
                Yes, Delete Video
              </button>
              <button
                className="cancel-delete-btn"
                onClick={cancelDeleteVideo}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hacking Screen */}
      {showHackingScreen && (
        <div className="hacking-screen-overlay">
          <div className="hacking-screen">
            <div className="screen-glitch"></div>
            <div className="hacking-terminal">
              <div className="terminal-header">
                <div className="terminal-title">
                  <span className="terminal-icon">⚠️</span>
                  UNAUTHORIZED ACCESS DETECTED
                </div>
                <div className="terminal-status">
                  <span className="status-dot blinking"></span>
                  BREACH IN PROGRESS
                </div>
              </div>

              <div className="terminal-content">
                <div className="hacking-logs">
                  {hackingLogs.map((log, index) => (
                    <div key={index} className="log-line">
                      <span className="log-timestamp">[{new Date().toLocaleTimeString()}]</span>
                      <span className="log-text">{log}</span>
                    </div>
                  ))}
                  <div className="cursor-line">
                    <span className="blinking-cursor">█</span>
                  </div>
                </div>

                <div className="progress-section">
                  <div className="progress-label">SYSTEM BREACH PROGRESS</div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${hackingProgress}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">{hackingProgress}% COMPLETE</div>
                </div>
              </div>

              <div className="warning-footer">
                <div className="warning-text">
                  ⚠️ SECURITY BREACH DETECTED - ADMIN PRIVILEGES COMPROMISED ⚠️
                </div>
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
}
