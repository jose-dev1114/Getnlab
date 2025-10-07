import {Link} from 'react-router';
import {useEffect} from 'react';

export const meta = () => {
  return [{title: 'Starter Kit | nLab'}];
};

export default function StarterKit() {
  useEffect(() => {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.specs-tab');
    const panels = document.querySelectorAll('.specs-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and panels
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Show corresponding panel
        const targetPanel = document.getElementById(tab.dataset.tab);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });

    // Cleanup event listeners
    return () => {
      tabs.forEach(tab => {
        tab.removeEventListener('click', () => {});
      });
    };
  }, []);
  return (
    <div className="starter-kit-page">
      <section className="starter-kit-hero">
        <div className="starter-kit-hero-pattern-right">
          <img src="/svg/right_black_pattern_second.svg" alt="" />
        </div>

        <div className="starter-kit-about-pattern-right">
          <img src="/svg/about_right_pattern.svg" alt="" />
        </div>

        <div className="starter-kit-hero-pattern-left">
          <img src="/svg/blue_light.svg" alt="" />
        </div>

        <div className="starter-kit-hero-content">
          <h1 className="starter-kit-title">
            YOUR ALL-IN-ONE ELECTRONICS LAB
          </h1>
          <p className="starter-kit-subtitle">
            The nLab Starter Kit gives you everything you need to start building right away. Real<br />
            components, step-by-step projects, and guided lessons through the nLab app.
          </p>
        </div>

        <div className="starter-kit-hero-image">
          <img src="/svg/img/access_main.png" alt="nLab Starter Kit" />
        </div>
      </section>

      <section className="starter-kit-explore">
        <div className="starter-kit-explore-container">
          <h2 className="explore-section-title">EXPLORE THE STARTER KIT</h2>

          <div className="explore-content">
            <div className="explore-text">
              <span className="explore-badge">Real Hardware</span>
              <h3 className="explore-title">EVERYTHING YOU NEED IN ONE BOX</h3>
              <p className="explore-description">
                The nLab Starter Kit is your launchpad. Inside, you'll find
                carefully selected components, guided lessons, and projects
                that grow with you — from your very first LED to advanced
                robotics and coding.
              </p>
            </div>

            <div className="explore-image">
              <img src="/svg/img/access_first.png" alt="nLab Hardware" />
            </div>
          </div>

          <div className="explore-content explore-content-reverse">
            <div className="explore-text">
              <span className="explore-badge" style={{color: '#27C840'}}>Scalable Projects</span>
              <h3 className="explore-title">FROM FIRST LED TO FULL ROBOTICS</h3>
              <p className="explore-description">
                Start small and grow big. Every project is designed to
                build on the last — guiding you from your very first circuit
                to advanced robotics and coding challenges.
              </p>
            </div>
            <div className="explore-image">
              <img src="/svg/img/starter_second.png" alt="Scalable Projects" />
            </div>
          </div>

          <div className="explore-content">
            <div className="explore-text">
              <span className="explore-badge" style={{color: '#FF7E28'}}>Guided by the App</span>
              <h3 className="explore-title">LEARN WITH LIVE FEEDBACK</h3>
              <p className="explore-description">
                The nLab app connects your kit to guided lessons, step-by-step
                walkthroughs, and real-time data visualization. Watch your
                circuits come to life and see exactly how they work as you build.
              </p>
            </div>

            <div className="explore-image">
              <img src="/svg/img/starter_third.png" alt="Live Feedback" />
            </div>
          </div>

          <div className="explore-content explore-content-reverse">
            <div className="explore-text">
              <span className="explore-badge" style={{color: '#B978FF'}}>Proven & Trusted</span>
              <h3 className="explore-title">TRUSTED IN CLASSROOMS, NOW FOR EVERYONE</h3>
              <p className="explore-description">
                nLab has already been tested in universities and by thousands
                of learners. Now we're bringing that proven system directly to
                you, so anyone can build, learn, and succeed.
              </p>
            </div>
            <div className="explore-image">
              <img src="/svg/img/starter_fourth.png" alt="Proven & Trusted" />
            </div>
          </div>
        </div>
      </section>

      <section className="starter-kit-specs">
        <div className="starter-kit-specs-container">
          <div className="specs-tabs">
            <button className="specs-tab active" data-tab="whats-in-box">What's in the Box</button>
            <button className="specs-tab" data-tab="specs">Specs</button>
          </div>

          <div className="specs-content">
            <div className="specs-panel active" id="whats-in-box">
              <div className="specs-table">
                <div className="specs-header">
                  <div className="specs-col">Component</div>
                  <div className="specs-col">Quantity/Details</div>
                  <div className="specs-col">Outcome/Purpose</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">nLab</div>
                  <div className="specs-col">Oscilloscope, power supply, function generator, plus USB C cable</div>
                  <div className="specs-col">Measurement, power, and signal tools</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Breadboard</div>
                  <div className="specs-col">Solderless prototyping board</div>
                  <div className="specs-col">Easy, mess-free, flexible circuit assembly</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Wire Strippers</div>
                  <div className="specs-col">7 colors of solid core wire, 2 alligator clips (9 total)</div>
                  <div className="specs-col">Color-coded wiring for clarity</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Resistors</div>
                  <div className="specs-col">10 each of 9 values (~90 total)</div>
                  <div className="specs-col">Control current and voltage</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Capacitors</div>
                  <div className="specs-col">5 each of 6 values (~30 total)</div>
                  <div className="specs-col">Store and filter electrical energy</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">LEDs and Light Sensors</div>
                  <div className="specs-col">5 each of red, green, yellow, and blue LEDs, plus IR, and more (~30 total)</div>
                  <div className="specs-col">Visual signals and light detection</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Common Parts</div>
                  <div className="specs-col">Buttons, transistors, diodes, potentiometers, mic, etc. (~30 total)</div>
                  <div className="specs-col">Switching, amplification, sensing</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Integrated Circuits</div>
                  <div className="specs-col">Operational amplifiers and timers (7 total)</div>
                  <div className="specs-col">Signal amplification and timing</div>
                </div>
              </div>
            </div>

            <div className="specs-panel" id="specs">
              <div className="specs-table">
                <div className="specs-header">
                  <div className="specs-col">Category</div>
                  <div className="specs-col">Specification</div>
                  <div className="specs-col">Details</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Dimensions</div>
                  <div className="specs-col">Kit size</div>
                  <div className="specs-col">9.5" x 5" x 2"</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Weight</div>
                  <div className="specs-col">Total weight</div>
                  <div className="specs-col">2 lbs</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Kit Contents</div>
                  <div className="specs-col">Main components</div>
                  <div className="specs-col">nLab, breadboard, USB-C cable</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Kit Contents</div>
                  <div className="specs-col">Wiring tools</div>
                  <div className="specs-col">Wire stripper, wire bundle, alligator clips</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Kit Contents</div>
                  <div className="specs-col">Basic components</div>
                  <div className="specs-col">Resistors, capacitors, diodes</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Kit Contents</div>
                  <div className="specs-col">Light components</div>
                  <div className="specs-col">LEDs, photosensors</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Kit Contents</div>
                  <div className="specs-col">Interactive components</div>
                  <div className="specs-col">Push buttons, transistors, speaker</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Kit Contents</div>
                  <div className="specs-col">Sensors & controls</div>
                  <div className="specs-col">Potentiometers, microphone, thermistor</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Kit Contents</div>
                  <div className="specs-col">Advanced ICs</div>
                  <div className="specs-col">Operational amplifiers, 555 timer</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Power</div>
                  <div className="specs-col">Output voltage</div>
                  <div className="specs-col">+5V and -5V, 200mA</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Power</div>
                  <div className="specs-col">Safety</div>
                  <div className="specs-col">Over-current protection</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Input</div>
                  <div className="specs-col">Channels</div>
                  <div className="specs-col">4 channel</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Input</div>
                  <div className="specs-col">Sample rate</div>
                  <div className="specs-col">4 MSPS</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Input</div>
                  <div className="specs-col">Bandwidth</div>
                  <div className="specs-col">100 kHz bandwidth</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Output</div>
                  <div className="specs-col">PWM channels</div>
                  <div className="specs-col">2 channel 0-5V PWM</div>
                </div>

                <div className="specs-row">
                  <div className="specs-col">Output</div>
                  <div className="specs-col">Waveform generation</div>
                  <div className="specs-col">2 channel sine and triangle</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="starter-kit-banner">
        <div className="starter-kit-banner-container">
          <div className="banner-pattern">
            <img src="/svg/starter_image_pattern.svg" alt="" />
          </div>
          <div className="banner-text">
            <h2 className="banner-title">POWER UP YOUR KIT WITH THE NLAB APP</h2>
            <p className="banner-description">
              The nLab App is where your Starter Kit comes alive —
              guiding you through projects, visualizing real-time
              data, and tracking your progress as you grow.
            </p>
            <button className="banner-button">
              Learn More
              <img src="/svg/arrow_right.svg" alt="" className="banner-arrow" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

