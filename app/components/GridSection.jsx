import {Link} from 'react-router';

export function GridSection() {
  return (
    <section className="grid-section">
      <div className="grid-header">
        <h2 className="grid-section-title">WHAT CAN YOU DO WITH THE NLAB KIT?</h2>
        <p className="grid-section-description">
          Discover how everyday technology works — by building it yourself.
        </p>
      </div>

      <div className="grid-content">
        <div className="grid-items">
          <div className="grid-item">
            <div className="grid-item-text">
              <h3 className="grid-item-title">LIGHT</h3>

              <div className="grid-item-section">
                <h4 className="grid-item-subtitle">Build</h4>
                <p className="grid-item-description">
                  A simple LED circuit — the perfect first project.
                </p>
              </div>

              <div className="grid-item-section">
                <h4 className="grid-item-subtitle">Learn</h4>
                <p className="grid-item-description">
                  How electricity flows, how to blink lights, and how function generators work.
                </p>
              </div>
            </div>

            <div className="grid-item-image">
              <img src="/svg/img/light.png" alt="Light Project" />
            </div>
          </div>

          <div className="grid-item">
            <div className="grid-item-image">
              <img src="/svg/img/sound.png" alt="Sound Project" />
            </div>

            <div className="grid-item-text">
              <h3 className="grid-item-title">SOUND</h3>

              <div className="grid-item-section">
                <h4 className="grid-item-subtitle">Build</h4>
                <p className="grid-item-description">
                  A working speaker from scratch — hear your creation.
                </p>
              </div>

              <div className="grid-item-section">
                <h4 className="grid-item-subtitle">Learn</h4>
                <p className="grid-item-description">
                  How sound waves work, amplification, and audio signal processing.
                </p>
              </div>
            </div>
          </div>

          <div className="grid-item">
            <div className="grid-item-text">
              <h3 className="grid-item-title">SENSING</h3>

              <div className="grid-item-section">
                <h4 className="grid-item-subtitle">Build</h4>
                <p className="grid-item-description">
                  A climate monitor or motion detector.
                </p>
              </div>

              <div className="grid-item-section">
                <h4 className="grid-item-subtitle">Learn</h4>
                <p className="grid-item-description">
                  How sensors like phototransistors and thermistors translate the physical world into data.
                </p>
              </div>
            </div>

            <div className="grid-item-image">
              <img src="/svg/img/sing.png" alt="Sing Project" />
            </div>
          </div>

          <div className="grid-item">
            <div className="grid-item-image">
              <img src="/svg/img/motion.png" alt="Motion Project" />
            </div>

            <div className="grid-item-text">
              <h3 className="grid-item-title">MOTION</h3>

              <div className="grid-item-section">
                <h4 className="grid-item-subtitle">Build</h4>
                <p className="grid-item-description">
                  A servo motor system.
                </p>
              </div>

              <div className="grid-item-section">
                <h4 className="grid-item-subtitle">Learn</h4>
                <p className="grid-item-description">
                  How motors move, respond, and bring projects to life.
                </p>
              </div>
            </div>
          </div>

          <div className="grid-item">
            <div className="grid-item-text">
              <h3 className="grid-item-title">AI HARDWARE</h3>

              <div className="grid-item-section">
                <h4 className="grid-item-subtitle">Build</h4>
                <p className="grid-item-description">
                  A counter circuit.
                </p>
              </div>

              <div className="grid-item-section">
                <h4 className="grid-item-subtitle">Learn</h4>
                <p className="grid-item-description">
                  The building blocks of computers and digital logic.
                </p>
              </div>
            </div>

            <div className="grid-item-image">
              <img src="/svg/img/hardware.png" alt="AI Hardware Project" />
            </div>
          </div>

          <div className="grid-item">
            <div className="grid-item-image">
              <img src="/svg/img/inventions.png" alt="Your Own Inventions" />
            </div>

            <div className="grid-item-text">
              <h3 className="grid-item-title">YOUR OWN INVENTIONS</h3>

              <div className="grid-item-section">
                <h4 className="grid-item-subtitle">Build</h4>
                <p className="grid-item-description">
                  Whatever you can imagine.
                </p>
              </div>

              <div className="grid-item-section">
                <h4 className="grid-item-subtitle">Learn</h4>
                <p className="grid-item-description">
                  The skills and confidence to turn your ideas into real projects, anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-cta-section">
          <h2 className="grid-cta-title">ALL THESE PROJECTS ARE IN YOUR KIT</h2>
          <Link to="/explore-projects" className="grid-cta-button">
            View All Projects
            <img src="/svg/arrow_right.png" alt="Arrow" className="arrow-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}

