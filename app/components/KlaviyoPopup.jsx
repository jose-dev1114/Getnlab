import { useState, useEffect } from 'react';

export function KlaviyoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before in this session
    const hasSeenPopup = sessionStorage.getItem('nlab-popup-shown');

    if (!hasSeenPopup) {
      // Show popup after a delay for smooth entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Mark popup as shown for this session
        sessionStorage.setItem('nlab-popup-shown', 'true');
      }, 2000); // 2 second delay

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300); // Match the CSS transition duration
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const fullName = formData.get('fullName');

    try {
      // Replace 'YOUR_KLAVIYO_LIST_ID' with your actual Klaviyo list ID
      const response = await fetch('/api/klaviyo-subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, fullName }),
      });

      if (response.ok) {
        // Success - close popup
        handleClose();
        // You can add a success message here if needed
      } else {
        console.error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`klaviyo-popup-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`klaviyo-popup ${isClosing ? 'closing' : ''}`}>
        <button 
          className="klaviyo-popup-close" 
          onClick={handleClose}
          aria-label="Close popup"
        >
          ×
        </button>
        
        <div className="klaviyo-popup-content">
          <h2 className="klaviyo-popup-title">
            We're Launching Soon on Kickstarter!
          </h2>
          <p className="klaviyo-popup-subtitle">
            Join the nLab Early Builder Community for behind-the-scenes updates, exclusive launch discounts, and live sessions with our founders — engineers who've built real products and want to share what they've learned.
          </p>

          <form onSubmit={handleSubmit} className="klaviyo-popup-form">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              className="klaviyo-popup-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="klaviyo-popup-input"
            />
            <button type="submit" className="klaviyo-popup-submit">
              Join the Community
            </button>
          </form>

          <p className="klaviyo-popup-disclaimer">
            No spam. Just real updates, early access, and hands-on knowledge.
          </p>
        </div>
      </div>
    </div>
  );
}
