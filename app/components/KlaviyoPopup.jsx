import { useState, useEffect } from 'react';

export function KlaviyoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show popup after a delay for smooth entrance every time
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
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
            We Are Launching on Kickstarter!
          </h2>
          <p className="klaviyo-popup-subtitle">
            Sign up to win a FREE Starter Kit + a live lesson to build your first project!
          </p>
          
          <form onSubmit={handleSubmit} className="klaviyo-popup-form">
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              required
              className="klaviyo-popup-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="klaviyo-popup-input"
            />
            <button type="submit" className="klaviyo-popup-submit">
              Subscribe Now
            </button>
          </form>
          
          <p className="klaviyo-popup-disclaimer">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
