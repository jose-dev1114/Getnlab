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
            <a href="https://discord.gg/PTZGpAkj" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src="/svg/discord.svg" alt="Discord" />
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
            <li><a href="/community">Community</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-column-title">ABOUT</h3>
          <ul className="footer-links">
            <li><a href="/about">Meet Angie & Nick</a></li>
            <li><a href="/community">News & Updates</a></li>
            <li><a href="/about">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">© 2025, nLab All Rights reserved</p>
          <div className="footer-legal-links">
            {/* <a href="/policies/privacy-policy" className="footer-legal-link">Privacy Policy</a>
            <a href="/policies/terms-of-service" className="footer-legal-link">Terms of Service</a>
            <a href="/policies/refund-policy" className="footer-legal-link">Refund Policy</a> */}
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}


