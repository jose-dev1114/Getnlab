export const meta = () => {
  return [{ title: 'Download App | nLab' }];
};

export default function Download() {
  return (
    <div className="download-page">
      <section className="download-hero-section">
        <div className="download-hero-pattern-left">
          <img src="/svg/download_left_pattern.svg" alt="" />
        </div>
        <div className="download-hero-pattern-right">
          <img src="/svg/download_right_pattern.svg" alt="" />
        </div>
        <div className="download-about-pattern-right">
          <img src="/svg/about_right_pattern.svg" alt="" />
        </div>
        <div className="download-hero-content">
          <div className="download-hero-text">
            <div className="download-hero-pattern">
              <img src="/svg/right_small_pattern.svg" alt="" />
            </div>

            <h1 className="download-hero-title">
              BRING YOUR KIT TO LIFE<br />
              WITH THE NLAB APP
            </h1>

            <div className="download-hero-image-mobile">
              <img src="/svg/img/download.png" alt="nLab App Screenshot" />
            </div>

            <p className="download-hero-description">
              Connect your physical kit to the nLab App and unlock a smarter, more guided learning experience. The app acts as your bridge between hardware and knowledge — letting you follow step-by-step lessons, visualize live sensor data, and track progress as you build. Whether you're a beginner or advancing into robotics, the nLab App ensures your journey is smoother, clearer, and more interactive.
            </p>

            <a href="https://getnlab.com/products/nlab-starter-kit?download#" target="_blank" rel="noopener noreferrer" className="download-cta-button">
              Download the App <img src="/svg/arrow-down.svg" alt="Download" className="download-arrow" />
            </a>
          </div>

          <div className="download-hero-image">
            <img src="/svg/img/download.png" alt="nLab App Screenshot" />
          </div>
        </div>
      </section>

      <section className="download-features-section">
        <div className="download-features-container">
          {/* Key Benefits Section */}
          <div className="key-benefits-section">
            <h2 className="key-benefits-title">KEY BENEFITS</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <h3 className="benefit-title">Guided Lessons</h3>
                <p className="benefit-description">Walk-through tutorials that explain circuits, code, and logic</p>
              </div>
              <div className="benefit-item">
                <h3 className="benefit-title">Progress Tracking</h3>
                <p className="benefit-description">Know what you've built, what's next, and your skill growth</p>
              </div>
              <div className="benefit-item">
                <h3 className="benefit-title">Live Data Visualization</h3>
                <p className="benefit-description">See what your hardware is doing in real time</p>
              </div>
              <div className="benefit-item">
                <h3 className="benefit-title">Seamless Integration</h3>
                <p className="benefit-description">Designed to work with the Starter Kit out of the box</p>
              </div>
            </div>
          </div>

          {/* Download App Section */}
          <div className="download-app-section">
            <h2 className="download-app-title">DOWNLOAD THE APP</h2>
            <p className="download-app-description">
              The nLab App guides your projects with step-by-step lessons, live data, and
              progress tracking — turning your Starter Kit into a complete learning system.
            </p>

            {/* Tab Navigation */}
            <div className="download-tabs">
              <button
                className="download-tab active"
                data-tab="mac"
                onClick={(e) => switchTab(e, 'mac')}
              >
                Mac
              </button>
              <button
                className="download-tab"
                data-tab="window"
                onClick={(e) => switchTab(e, 'window')}
              >
                Window
              </button>
              <button
                className="download-tab"
                data-tab="nlab-api"
                onClick={(e) => switchTab(e, 'nlab-api')}
              >
                nLab API
              </button>
            </div>

            {/* Tab Content */}
            <div className="download-tab-content">
              <div className="tab-panel active" id="mac-panel">
                <p className="tab-description">
                  Get the nLab App on your Mac to connect your Starter Kit,
                  follow guided lessons, and see your circuits come to life.
                </p>
                <a href="https://getnlab.com/products/nlab-starter-kit?download#" target="_blank" rel="noopener noreferrer" className="download-platform-button">
                  Download for Mac <img src="/svg/apple.svg" alt="Apple" className="platform-icon" />
                </a>
              </div>

              <div className="tab-panel" id="window-panel">
                <p className="tab-description">
                  Get the nLab App on your Windows PC to connect your Starter Kit,
                  follow guided lessons, and see your circuits come to life.
                </p>
                <a href="https://getnlab.com/products/nlab-starter-kit?download#" target="_blank" rel="noopener noreferrer" className="download-platform-button">
                  Download for Windows <img src="/svg/windows.svg" alt="Windows" className="platform-icon" />
                </a>
              </div>

              <div className="tab-panel" id="nlab-api-panel">
                <p className="tab-description">
                  nScopeAPI is available on GitHub. Clone the repository to your system with the command below.
                </p>
                <div className="api-command">
                  <code>git clone https://github.com/nLabs-nScope/nscope-rs.git</code>
                </div>
                <a href="https://github.com/nLabs-nScope/nscope-rs" target="_blank" rel="noopener noreferrer" className="download-platform-button">
                  View on GitHub <img src="/svg/github.svg" alt="GitHub" className="platform-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Tab switching function
function switchTab(event, tabName) {
  // Remove active class from all tabs and panels
  document.querySelectorAll('.download-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));

  // Add active class to clicked tab
  event.target.classList.add('active');

  // Show corresponding panel
  document.getElementById(`${tabName}-panel`).classList.add('active');
}
