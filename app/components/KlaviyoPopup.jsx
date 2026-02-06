import { useState, useEffect } from 'react';
import { trackEmailSignup, trackFormInteraction } from '~/lib/facebook-pixel';

// Client-side spam validation functions
function isSpamEmail(email) {
  const spamDomains = [
    '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com',
    'yopmail.com', 'temp-mail.org', 'throwaway.email', 'getnada.com',
    'maildrop.cc', 'sharklasers.com', 'grr.la', 'guerrillamailblock.com',
    'pokemail.net', 'spam4.me', 'bccto.me', 'chacuo.net', 'dispostable.com',
    'fakeinbox.com', 'hide.biz.st', 'mytrashmail.com', 'nobulk.com',
    'sogetthis.com', 'spamherelots.com', 'superrito.com', 'zoemail.org'
  ];

  const domain = email.toLowerCase().split('@')[1];
  return spamDomains.includes(domain);
}

function isSpamName(name) {
  const spamPatterns = [
    /^test\s*$/i,
    /^admin\s*$/i,
    /^user\s*$/i,
    /^sample\s*$/i,
    /^example\s*$/i,
    /^fake\s*$/i,
    /^spam\s*$/i,
    /^bot\s*$/i,
    /^robot\s*$/i,
    /^[a-z]{1,2}$/i, // Single or double letters
    /^\d+$/, // Only numbers
    /^(.)\1{3,}/, // Repeated characters (aaaa, bbbb)
    /^[^a-zA-Z\s]+$/, // No letters at all
    /^[a-z]{8,}$/i, // Long strings of only lowercase letters (like sdbwebwefwef)
    /^[A-Z]{8,}$/i, // Long strings of only uppercase letters
    /^[bcdfghjklmnpqrstvwxyz]{6,}$/i, // Long strings without vowels (gibberish)
    /^[aeiou]{4,}$/i, // Long strings of only vowels
    /^[qwerty]{6,}$/i, // Keyboard mashing patterns
    /^[asdf]{4,}$/i, // More keyboard patterns
    /^[zxcv]{4,}$/i, // Bottom row keyboard patterns
  ];

  return spamPatterns.some(pattern => pattern.test(name.trim()));
}

function isValidHumanName(name) {
  const trimmedName = name.trim();

  // Must be at least 2 characters
  if (trimmedName.length < 2) return false;

  // Must contain at least one letter
  if (!/[a-zA-Z]/.test(trimmedName)) return false;

  // Should not be all uppercase (unless short)
  if (trimmedName.length > 3 && trimmedName === trimmedName.toUpperCase()) return false;

  // Should not have excessive special characters
  const specialCharCount = (trimmedName.match(/[^a-zA-Z\s'-]/g) || []).length;
  if (specialCharCount > 2) return false;

  // Check for reasonable vowel-to-consonant ratio (human names have vowels)
  const vowels = (trimmedName.match(/[aeiouAEIOU]/g) || []).length;
  const consonants = (trimmedName.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length;
  const totalLetters = vowels + consonants;

  if (totalLetters > 4) {
    // Names should have at least some vowels (at least 15% vowels)
    const vowelRatio = vowels / totalLetters;
    if (vowelRatio < 0.15) return false;

    // Names shouldn't be mostly vowels either (max 70% vowels)
    if (vowelRatio > 0.7) return false;
  }

  // Check for excessive consonant clusters (more than 4 consonants in a row is suspicious)
  if (/[bcdfghjklmnpqrstvwxyz]{5,}/i.test(trimmedName)) return false;

  // Check for patterns that look like keyboard mashing
  const keyboardPatterns = [
    /qwerty/i, /asdfgh/i, /zxcvbn/i, /qazwsx/i, /plmokn/i,
    /mnbvcx/i, /lkjhgf/i, /poiuyt/i, /rewqas/i
  ];

  if (keyboardPatterns.some(pattern => pattern.test(trimmedName))) return false;

  return true;
}

export function KlaviyoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // UTM parameters state
  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: ''
  });

  // Read UTM parameters from source_query cookie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get source_query cookie
      const cookies = document.cookie.split(';');
      let sourceQuery = '';
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'source_query') {
          sourceQuery = decodeURIComponent(value || '');
          break;
        }
      }

      // Parse UTM params from cookie value
      if (sourceQuery) {
        const params = new URLSearchParams(sourceQuery);
        setUtmParams({
          utm_source: params.get('utm_source') || '',
          utm_medium: params.get('utm_medium') || '',
          utm_campaign: params.get('utm_campaign') || '',
          utm_term: params.get('utm_term') || ''
        });
      }
    }
  }, []);

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

    // Client-side validation
    if (!fullName || !email) {
      setErrorMessage('Name and email are required.');
      setIsSubmitting(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    // Spam validation
    if (isSpamEmail(email)) {
      setErrorMessage('Please use a valid email address.');
      setIsSubmitting(false);
      return;
    }

    if (isSpamName(fullName)) {
      setErrorMessage('Please enter your real name.');
      setIsSubmitting(false);
      return;
    }

    if (!isValidHumanName(fullName)) {
      setErrorMessage('Please enter a valid name.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Use the same logic as early access form - send as form data
      const formDataToSend = new FormData();
      formDataToSend.append('name', fullName);
      formDataToSend.append('email', email);
      formDataToSend.append('interest', 'Kickstarter Popup'); // Track source

      // Append UTM parameters
      formDataToSend.append('utm_source', utmParams.utm_source);
      formDataToSend.append('utm_medium', utmParams.utm_medium);
      formDataToSend.append('utm_campaign', utmParams.utm_campaign);
      formDataToSend.append('utm_term', utmParams.utm_term);

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

        // Track Facebook Pixel event for popup email signup
        trackEmailSignup(email, 'popup');

        // Push dataLayer event for GTM
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "newsletter_form_submit",
            email: email,
            form_id: "klaviyo_popup_form",
            form_name: "Kickstarter Popup Form"
          });
        }

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
                  onFocus={() => trackFormInteraction('popup', 'start')}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  disabled={isSubmitting}
                  className="klaviyo-popup-input"
                  onFocus={() => trackFormInteraction('popup', 'start')}
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
