import { Link } from 'react-router';
import { useEffect } from 'react';

export const meta = () => {
  return [{ title: 'Starter Kit | nLab' }];
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

    // Testimonials carousel functionality
    const dots = document.querySelectorAll('.carousel-dot');
    const track = document.querySelector('.testimonials-track');
    let currentSlide = 0;
    const totalSlides = 4;

    // Auto-advance carousel
    const autoAdvance = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    }, 5000);

    // Dot click functionality
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
        // Reset auto-advance timer
        clearInterval(autoAdvance);
        setTimeout(() => {
          const newAutoAdvance = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
          }, 5000);
        }, 5000);
      });
    });

    function updateCarousel() {
      if (track) {
        // Move by 25% of the track width for each slide (since track is 400% and each slide is 25%)
        track.style.transform = `translateX(-${currentSlide * 25}%)`;
      }
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }

    // Cleanup event listeners
    return () => {
      tabs.forEach(tab => {
        tab.removeEventListener('click', () => { });
      });
      clearInterval(autoAdvance);
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
            Build Skills That Last a Lifetime
          </h1>
          <p className="starter-kit-subtitle">
            <span className="hidden md:inline">
              The Starter Kit includes a compact lab, essential parts, hands-on projects, tutorials, and live feedback <br />
              everything you need to learn, experiment, and prepare for real-world tech challenges.
            </span>
            <span className="md:hidden">
              The Starter Kit includes a compact lab, essential parts, hands-on projects, tutorials, and live feedback everything you need to learn, experiment, and prepare for real-world tech challenges.
            </span>
          </p>
        </div>

        <div className="pattern-image-container">
          <img src="/svg/img/pc_main.png" alt="Product" className="pattern-main-image pattern-desktop-image" />
          <img src="/svg/img/mobile_main.png" alt="Product" className="pattern-main-image pattern-mobile-image" />
        </div>
      </section>

      <section className="starter-kit-explore">
        <div className="starter-kit-explore-container">
          <h2 className="explore-section-title">EXPLORE THE STARTER KIT</h2>

          <div className="explore-content">
            <div className="explore-text">
              <span className="explore-badge">The Gadget</span>
              <h3 className="explore-title">The World’s Smallest Electronics Lab</h3>
              <p className="explore-description">
                A groundbreaking, pocket-sized device that replaces an oscilloscope, power supply, and function generator ($1,000+ of professional equipment). Beyond learning, the nLab stays by your side throughout your career, helping you diagnose, debug, and invent.
              </p>
            </div>

            <div className="explore-image">
              <img src="/svg/img/access_first.png" alt="nLab Hardware" />
            </div>
          </div>

          <div className="explore-content explore-content-reverse">
            <div className="explore-text">
              <span className="explore-badge" style={{ color: '#27C840' }}>The Building Blocks</span>
              <h3 className="explore-title">200+ Essential Electrical Components</h3>
              <p className="explore-description">
                Your LEGO set for electronics: resistors, capacitors, and other essentials you can mix and match to create real-world tech. Build, test, and explore how these puzzle pieces work together.
              </p>
            </div>
            <div className="explore-image">
              <img src="/svg/img/starter_second.png" alt="Scalable Projects" />
            </div>
          </div>

          <div className="explore-content">
            <div className="explore-text">
              <span className="explore-badge" style={{ color: '#FF7E28' }}>The Projects</span>
              <h3 className="explore-title">12 Real-World Builds</h3>
              <p className="explore-description">
                Build real devices like heartbeat monitors, game controllers, and climate sensors — and level up with every project. Gamified challenges guide you while teaching the skills and theory behind each circuit.
              </p>
            </div>

            <div className="explore-image">
              <img src="/svg/img/projects.webp" alt="Live Feedback" />
            </div>
          </div>

          <div className="explore-content explore-content-reverse">
            <div className="explore-text">
              <span className="explore-badge" style={{ color: '#B978FF' }}>The Videos</span>
              <h3 className="explore-title">Step-by-step guidance anywhere, anytime</h3>
              <p className="explore-description">
                Free YouTube tutorials taught by Angie, a robotics engineer, and Nick, a robotics professor at Northwestern. Learn at your own pace and see your creations come to life.
              </p>
            </div>
            <div className="explore-image">
              <img src="/svg/img/starter_fourth.png" alt="Proven & Trusted" />
            </div>
          </div>

          <div className="explore-content">
            <div className="explore-text">
              <span className="explore-badge" style={{ color: '#FF6B35' }}>The App</span>
              <h3 className="explore-title">Learn with live feedback</h3>
              <p className="explore-description">
                The nLab app connects the gadget to your circuit and makes the invisible visible. Watch your circuits come to life and see exactly how they work as you build.
              </p>
            </div>
            <div className="explore-image">
              <img src="/svg/img/starter_third.png" alt="The App" />
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

      <section className="starter-kit-testimonials">
        <div className="starter-kit-testimonials-container">
          <h2 className="testimonials-title">What People Are Saying</h2>

          <div className="testimonials-carousel">
            <div className="testimonials-track">
              <div className="testimonial-slide">
                <div className="testimonial-content">
                  <div className="testimonial-stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <p className="testimonial-quote">
                    "I don't know how you pulled it off, but you've somehow made electrical engineering exciting!"
                  </p>
                  <div className="testimonial-author">
                    <p className="author-name">Stephanie H.</p>
                    <p className="author-company">Zebra Robotics</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-slide">
                <div className="testimonial-content">
                  <div className="testimonial-stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <p className="testimonial-quote">
                    "Every season, I see robotics teams tackling the steep learning curve of electronics and circuits—nLab turns that challenge into an opportunity to build these skills safely and confidently."
                  </p>
                  <div className="testimonial-author">
                    <p className="author-name">Al S.</p>
                    <p className="author-company">Chief Robot Inspector, FIRST Robotics</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-slide">
                <div className="testimonial-content">
                  <div className="testimonial-stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <p className="testimonial-quote">
                    "How did anyone ever learn electronics without the nLab?"
                  </p>
                  <div className="testimonial-author">
                    <p className="author-name">Michael H.</p>
                    <p className="author-company">Student at Northwestern University</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-slide">
                <div className="testimonial-content">
                  <div className="testimonial-stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <p className="testimonial-quote">
                    "I've taught electronics for 10 years. nLab is the breakthrough I've been waiting for."
                  </p>
                  <div className="testimonial-author">
                    <p className="author-name">Stephen H.</p>
                    <p className="author-company">Bioengineering Instructor, University of Colorado Denver</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-dots">
              <button className="carousel-dot active" data-slide="0"></button>
              <button className="carousel-dot" data-slide="1"></button>
              <button className="carousel-dot" data-slide="2"></button>
              <button className="carousel-dot" data-slide="3"></button>
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
            <h2 className="banner-title">Trusted in college classrooms, now for everyone</h2>
            <p className="banner-description">
              nLab has already been tested in universities and by thousands of learners. Now we’re bringing that proven system directly to you, so anyone can build, learn, and succeed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

