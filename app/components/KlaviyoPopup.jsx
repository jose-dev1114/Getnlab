import { useState, useEffect } from 'react';

export function KlaviyoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before (use localStorage for persistence across sessions)
    const hasSeenPopup = localStorage.getItem('nlab-popup-shown');
    const lastShown = localStorage.getItem('nlab-popup-last-shown');
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

    // Show popup if never shown, or if it's been more than a week
    if (!hasSeenPopup || (lastShown && (now - parseInt(lastShown)) > oneWeek)) {
      // Show popup after user has been on page for a bit (engagement-based timing)
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Mark popup as shown with timestamp
        localStorage.setItem('nlab-popup-shown', 'true');
        localStorage.setItem('nlab-popup-last-shown', now.toString());
      }, 3000); // 3 second delay for better engagement

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300); // Match the CSS transition duration
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(''); // Clear any previous errors

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const fullName = formData.get('fullName');

    console.log('🚀 Popup form submission started:', { email, fullName });

    try {
      // Use the same logic as early access form - send as form data
      const formDataToSend = new FormData();
      formDataToSend.append('name', fullName);
      formDataToSend.append('email', email);
      formDataToSend.append('interest', 'Kickstarter Popup'); // Track source

      console.log('📤 Sending API request to /early-access...');

      const response = await fetch('/early-access', {
        method: 'POST',
        body: formDataToSend,
      });

      console.log('📥 API response status:', response.status);

      console.log('📥 API response status:', response.status);

      if (response.status === 200) {
        // Status 200 means success - show congratulations immediately
        console.log('🎉 Success! Status 200 received. Showing congratulations message...');

        // Show congratulations message
        setShowSuccess(true);
        // Close popup after showing success message for 2.5 seconds
        setTimeout(() => {
          console.log('👋 Closing popup...');
          handleClose();
        }, 2500);
      } else {
        // Handle non-200 status codes
        try {
          const result = await response.json();
          console.error('❌ API returned error:', result.error);
          setErrorMessage(result.error || 'Something went wrong. Please try again.');
        } catch (parseError) {
          const errorText = await response.text();
          console.error('❌ HTTP error:', response.status, errorText);
          setErrorMessage('Network error. Please check your connection and try again.');
        }
      }
    } catch (error) {
      console.error('❌ Request failed:', error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      console.log('🏁 Form submission completed');
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
          {showSuccess ? (
            <div className="klaviyo-popup-success">
              <h2 className="klaviyo-popup-title">🎉 Congratulations!</h2>
              <p className="klaviyo-popup-subtitle">
                Welcome to the nLab Early Builder Community! You're all set for exclusive updates, launch discounts, and behind-the-scenes content.
              </p>
              <p className="klaviyo-popup-subtitle">
                Check your email for confirmation and next steps!
              </p>
            </div>
          ) : (
            <>
              <h2 className="klaviyo-popup-title">
                We're Launching Soon on Kickstarter!
              </h2>
              <p className="klaviyo-popup-subtitle">
                Join the nLab Early Builder Community for behind-the-scenes updates, exclusive launch discounts, and live sessions with our founders — engineers who've built real products and want to share what they've learned.
              </p>

              {/* Error Message */}
              {errorMessage && (
                <div className="klaviyo-popup-error">
                  <p>❌ {errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="klaviyo-popup-form">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  required
                  disabled={isSubmitting}
                  className="klaviyo-popup-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  disabled={isSubmitting}
                  className="klaviyo-popup-input"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="klaviyo-popup-submit"
                >
                  {isSubmitting ? 'Joining...' : 'Join the Community'}
                </button>
              </form>

              <p className="klaviyo-popup-disclaimer">
                No spam. Just real updates, early access, and hands-on knowledge.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
