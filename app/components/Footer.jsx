import {Form, useActionData, useNavigation} from 'react-router';
import {useEffect} from 'react';
import { trackEmailSignup, trackFormInteraction } from '~/lib/facebook-pixel';

export function Footer() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // Track Facebook Pixel events on successful form submission
  useEffect(() => {
    if (actionData?.success && actionData?.trackFacebookPixel) {
      const { email, source } = actionData.trackFacebookPixel;
      trackEmailSignup(email, source);
    }
  }, [actionData]);

  return (
    <>
      <div className="footer-pattern-top">
        <img src="/svg/footer_black_pattern.svg" alt="" />
      </div>

      <footer className="nlab-footer">
        <div className="footer-pattern-bg">
          <img src="/svg/footer_light.svg" alt="" />
        </div>

        <div className="footer-main">
        <div className="footer-column footer-brand">
          <div className="footer-logo">
            <img src="/svg/nlab_logo.svg?v=2025" alt="nLab" />
          </div>
          <div className="footer-social">
            <a href="https://www.youtube.com/@get-nlab" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src="/svg/youtube.svg" alt="YouTube" />
            </a>
            {/* <a href="https://discord.gg/PTZGpAkj" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src="/svg/discord.svg" alt="Discord" />
            </a> */}
            <a href="https://kickstarter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src="/svg/kickstarter.svg" alt="Kickstarter" />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3 className="footer-column-title">EXPLORE</h3>
          <ul className="footer-links">
            <li><a href="/starter-kit">Starter Kit</a></li>
            <li><a href="/explore-projects">Projects</a></li>
            <li><a href="/download">Download the App</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-column-title">SUPPORT</h3>
          <ul className="footer-links">
            <li><a href="/early-access">Get Early Access</a></li>
            <li><a href="https://www.youtube.com/@get-nlab" target="_blank" rel="noopener noreferrer">Subscribe to YouTube</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-column-title">ABOUT</h3>
          <ul className="footer-links">
            <li><a href="/about">Meet Angie & Nick</a></li>
          </ul>
        </div>
        <div className="footer-column footer-newsletter">
          <h3 className="footer-column-title">STAY IN THE LOOP</h3>
          <p className="footer-newsletter-description">
            Get updates on new projects, behind-the-scenes content, and early access to launches.
          </p>

          <Form method="post" className="footer-newsletter-form">
            {/* Success Message */}
            {actionData?.success && (
              <div className="footer-newsletter-message success">
                <p>✅ {actionData.message}</p>
              </div>
            )}

            {/* Error Message */}
            {actionData?.error && (
              <div className="footer-newsletter-message error">
                <p>❌ {actionData.error}</p>
              </div>
            )}

            <div className="footer-newsletter-input-group">
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                disabled={isSubmitting}
                className="footer-newsletter-input"
                onFocus={() => trackFormInteraction('footer-newsletter', 'start')}
              />
              <button type="submit" className="footer-newsletter-button" disabled={isSubmitting}>
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </Form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">Questions? Contact us anytime at <a href="mailto:founders@getnlab.com" className="footer-email-link">founders@getnlab.com</a> <br /></p>
          <p className="footer-copyright">2025, nLab All Rights Reserved</p>
        </div>
      </div>
    </footer>
    </>
  );
}


