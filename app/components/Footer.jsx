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
            <img src="/svg/nLab_logo.svg" alt="nLab" />
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
            <li><a href="/collections/starter-kit">Starter Kit</a></li>
            <li><a href="/collections/projects">Projects</a></li>
            <li><a href="/pages/download">Download the App</a></li>
            <li><a href="/pages/support">Support</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-column-title">DESIGNED FOR</h3>
          <ul className="footer-links">
            <li><a href="/pages/career-changers">Career Changers</a></li>
            <li><a href="/pages/future-engineers">Future Engineers</a></li>
            <li><a href="/pages/learners">Self-Directed Learners</a></li>
            <li><a href="/pages/builders">Builders & Influencers</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-column-title">SUPPORT</h3>
          <ul className="footer-links">
            <li><a href="/pages/faq">FAQ</a></li>
            <li><a href="/early-access">Get Early Access</a></li>
            <li><a href="https://www.youtube.com/@get-nlab" target="_blank" rel="noopener noreferrer">Subscribe to YouTube</a></li>
            <li><a href="/pages/community">Community</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-column-title">ABOUT</h3>
          <ul className="footer-links">
            <li><a href="/pages/why-nlab">Why nLab?</a></li>
            <li><a href="/pages/team">Meet Angie & Nick</a></li>
            <li><a href="/pages/news">News & Updates</a></li>
            <li><a href="/pages/contact">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">© 2025, nLab All Rights reserved</p>
          <a href="/policies/privacy-policy" className="footer-legal-link">Privacy Policy</a>
          <a href="/policies/terms-of-service" className="footer-legal-link">Terms of Service</a>
          <a href="/policies/refund-policy" className="footer-legal-link">Refund Policy</a>
        </div>
      </div>
    </footer>
    </>
  );
}


