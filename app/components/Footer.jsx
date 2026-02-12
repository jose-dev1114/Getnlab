export function Footer() {
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
            <a href="https://www.instagram.com/getnlab" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src="/svg/instagram.svg" alt="Instagram" />
            </a>
            <a href="https://www.tiktok.com/@getnlab" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src="/svg/tiktok.svg" alt="TikTok" />
            </a>
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


