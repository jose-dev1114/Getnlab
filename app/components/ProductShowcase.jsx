import {Link} from 'react-router';

export function ProductShowcase() {
  return (
    <>
      {/* Everything You Need Section */}
      <section className="everything-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">ICON STYLE ILLUSTRATION OF ALL COMPONENTS</div>
            <h2 className="section-title">EVERYTHING YOU NEED IN ONE BOX</h2>
            <p className="section-description">
              The nLab Starter Kit is your blueprint. Inside, you'll find carefully selected 
              components, guided lessons, and projects that grow with you — from your very 
              first LED to complex circuits.
            </p>
            <Link to="/collections/starter-kit" className="section-cta-button">
              Explore the Starter Kit
            </Link>
          </div>
          
          <div className="components-grid">
            <div className="component-item">
              <div className="component-icon">🔌</div>
              <span>Breadboard</span>
            </div>
            <div className="component-item">
              <div className="component-icon">💡</div>
              <span>LEDs</span>
            </div>
            <div className="component-item">
              <div className="component-icon">⚡</div>
              <span>Resistors</span>
            </div>
            <div className="component-item">
              <div className="component-icon">🔋</div>
              <span>Battery Pack</span>
            </div>
            <div className="component-item">
              <div className="component-icon">🎛️</div>
              <span>Sensors</span>
            </div>
            <div className="component-item">
              <div className="component-icon">🔊</div>
              <span>Buzzer</span>
            </div>
          </div>
        </div>
      </section>

      {/* What Can You Do Section */}
      <section className="projects-section">
        <div className="section-container">
          <h2 className="section-title">WHAT CAN YOU DO WITH THE NLAB KIT?</h2>
          <p className="section-subtitle">Discover how everyday technology works — by building it yourself.</p>
          
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image project-light-bg">
                <div className="project-placeholder">
                  <div className="project-icon">💡</div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">LIGHT</h3>
                <h4 className="project-subtitle">Build</h4>
                <p className="project-description">
                  A simple LED circuit — the perfect first project.
                </p>
                <h4 className="project-subtitle">Learn</h4>
                <p className="project-description">
                  How electricity flows, how to think about, and how 
                  circuits generate light.
                </p>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image project-sound-bg">
                <div className="project-placeholder">
                  <div className="project-icon">🔊</div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">SOUND</h3>
                <h4 className="project-subtitle">Build</h4>
                <p className="project-description">
                  A microphone or guitar tuner.
                </p>
                <h4 className="project-subtitle">Learn</h4>
                <p className="project-description">
                  The basics of amplification and how sound becomes a 
                  signal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
