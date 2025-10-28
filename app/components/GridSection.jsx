import { Link } from 'react-router';
import { useState, useEffect } from 'react';

export function GridSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const gridItems = [
    {
      title: "LIGHT & ILLUMINATION",
      image: "/svg/img/light.png",
      alt: "Light Project",
      description: "Make LEDs shine, sense brightness, and explore how circuits turn electricity into light and motion."
    },
    {
      title: "SOUND & AUDIO",
      image: "/svg/img/sound.png",
      alt: "Sound Project",
      description: "Build working speakers from scratch and learn how sound waves work, amplification, and audio signal processing."
    },
    {
      title: "SENSING & DETECTION",
      image: "/svg/img/sensing.png",
      alt: "Sensing Project",
      description: "Create climate monitors and motion detectors using sensors like phototransistors and thermistors."
    },
    {
      title: "MOTION & CONTROL",
      image: "/svg/img/motion.png",
      alt: "Motion Project",
      description: "Build servo motor systems and discover how motors move, respond, and bring projects to life."
    },
    {
      title: "AI HARDWARE",
      image: "/svg/img/hardware.png",
      alt: "AI Hardware Project",
      description: "Construct counter circuits and learn the building blocks of computers and digital logic systems."
    },
    {
      title: "YOUR OWN INVENTIONS",
      image: "/svg/img/inventions.png",
      alt: "Your Own Inventions",
      description: "Build whatever you can imagine and gain the skills and confidence to turn ideas into real projects."
    }
  ];

  // For PC: 6 items showing 2.5 at once = 5 possible positions (0,1,2,3,4)
  // For Mobile: 6 items showing 1 at once = 6 possible positions (0,1,2,3,4,5)
  const maxSlide = isMobile ? gridItems.length - 1 : gridItems.length - 2; // Mobile: 5, Desktop: 4
  const totalSlides = isMobile ? gridItems.length : 5; // Mobile: 6 bars, Desktop: 5 bars

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (maxSlide + 1)); // Cyclical for both mobile and desktop
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + (maxSlide + 1)) % (maxSlide + 1)); // Cyclical for both mobile and desktop
  };

  const goToSlide = (index) => {
    setCurrentSlide(index); // Direct navigation for both mobile and desktop
  };

  return (
    <section className="grid-section">
      <div className="grid-header">
        <h2 className="grid-section-title">WHAT CAN YOU DO WITH THE NLAB KIT?</h2>
        <p className="grid-section-description">
          Discover how everyday technology works — by building it yourself.
        </p>
        <Link to="/explore-projects" className="grid-cta-button">
          View All Projects
          <img src="/svg/arrow_right.svg" alt="Arrow" className="arrow-icon" />
        </Link>
      </div>

      <div className="grid-content">

        <div className="grid-carousel-container">
          {/* Navigation Controls Above Carousel */}
          <div className="carousel-controls">
            {/* Progress Indicator */}
            <div className="carousel-progress">
              {Array.from({ length: totalSlides }, (_, index) => (
                <div
                  key={index}
                  className={`progress-bar ${index === currentSlide ? 'active' : ''}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="carousel-nav-buttons">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <img src="/svg/left_move.svg" alt="Previous" />
              </button>
              <button
                className="ml-3"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <img src="/svg/right_move.svg" alt="Next" />
              </button>
            </div>
          </div>

          <div className="grid-carousel-wrapper">
            <div
              className="grid-carousel-track"
              style={{
                transform: `translateX(-${currentSlide * (isMobile ? 100 : 40)}%)`,
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              {gridItems.map((item, index) => (
                <div key={index} className="grid-carousel-slide">
                  <div className="grid-item">
                    <div className="grid-item-image">
                      <img src={item.image} alt={item.alt} />
                    </div>
                    <div className="grid-item-text">
                      <h3 className="grid-item-title">{item.title}</h3>
                      <p className="grid-item-description">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {/* <div className="carousel-dots">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}
        </div>
        <div className="grid-header" style={{textAlign: "center", paddingTop: "4rem"}}>
          <h2 className="grid-section-title">Where do these skills take you?</h2>
          <p className="grid-section-description">
            Discover how everyday technology works — by building it yourself.
          </p>
        </div>
        <div className="grid-items">
          <div className="grid-itemss">
            <div className="grid-item-texts">
              <h3 className="grid-item-titles">LIGHT</h3>

              <div className="grid-item-sections">
                <h4 className="grid-item-subtitles">Build</h4>
                <p className="grid-item-descriptions">
                  A simple LED circuit — the perfect first project.
                </p>
              </div>

              <div className="grid-item-sections">
                <h4 className="grid-item-subtitles">Learn</h4>
                <p className="grid-item-descriptions">
                  How electricity flows, how to bslink lights, and how function generators work.
                </p>
              </div>
            </div>

            <div className="grid-item-images">
              <img src="/svg/img/light.png" alt="Light Project" />
            </div>
          </div>

          <div className="grid-itemss">
            <div className="grid-item-images">
              <img src="/svg/img/sound.png" alt="Sound Project" />
            </div>

            <div className="grid-item-texts">
              <h3 className="grid-item-titles">SOUND</h3>

              <div className="grid-item-sections">
                <h4 className="grid-item-subtitles">Build</h4>
                <p className="grid-item-descriptions">
                  A working speaker from scratch — hear your creation.
                </p>
              </div>

              <div className="grid-item-sections">
                <h4 className="grid-item-subtitles">Learn</h4>
                <p className="grid-item-descriptions">
                  How sound waves work, amplification, and audio signal processing.
                </p>
              </div>
            </div>
          </div>

          <div className="grid-itemss">
            <div className="grid-item-texts">
              <h3 className="grid-item-titles">SENSING</h3>

              <div className="grid-item-sections">
                <h4 className="grid-item-subtitles">Build</h4>
                <p className="grid-item-descriptions">
                  A climate monitor or motion detector.
                </p>
              </div>

              <div className="grid-item-sections">
                <h4 className="grid-item-subtitles">Learn</h4>
                <p className="grid-item-descriptions">
                  How sensors like phototransistors and thermistors translate the physical world into data.
                </p>
              </div>
            </div>

            <div className="grid-item-images">
              <img src="/svg/img/sensing.png" alt="Sing Project" />
            </div>
          </div>

          <div className="grid-itemss">
            <div className="grid-item-images">
              <img src="/svg/img/motion.png" alt="Motion Project" />
            </div>

            <div className="grid-item-texts">
              <h3 className="grid-item-titles">MOTION</h3>

              <div className="grid-item-sections">
                <h4 className="grid-item-subtitles">Build</h4>
                <p className="grid-item-descriptions">
                  A servo motor system.
                </p>
              </div>

              <div className="grid-item-sections">
                <h4 className="grid-item-subtitles">Learn</h4>
                <p className="grid-item-descriptions">
                  How motors move, respond, and bring projects to life.
                </p>
              </div>
            </div>
          </div>

          <div className="grid-itemss">
            <div className="grid-item-texts">
              <h3 className="grid-item-titles">AI HARDWARE</h3>

              <div className="grid-item-sections">
                <h4 className="grid-item-subtitles">Build</h4>
                <p className="grid-item-descriptions">
                  A counter circuit.
                </p>
              </div>

              <div className="grid-item-sections">
                <h4 className="grid-item-subtitles">Learn</h4>
                <p className="grid-item-descriptions">
                  The building blocks of computers and digital logic.
                </p>
              </div>
            </div>

            <div className="grid-item-images">
              <img src="/svg/img/hardware.png" alt="AI Hardware Project" />
            </div>
          </div>

          <div className="grid-itemss">
            <div className="grid-item-images">
              <img src="/svg/img/inventions.png" alt="Your Own Inventions" />
            </div>

            <div className="grid-item-texts">
              <h3 className="grid-item-titles">YOUR OWN INVENTIONS</h3>

              <div className="grid-item-sections">
                <h4 className="grid-item-subtitles">Build</h4>
                <p className="grid-item-descriptions">
                  Whatever you can imagine.
                </p>
              </div>

              <div className="grid-item-sections">
                <h4 className="grid-item-subtitles">Learn</h4>
                <p className="grid-item-descriptions">
                  The skills and confidence to turn your ideas into real projects, anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid-cta-section">
          <div className="trusted-by-content">
            <h2 className="trusted-by-title">NLAB IS IN USE AND TRUSTED BY</h2>
            <div className="trusted-by-logos">
              <img src="/svg/company_logo/nyu.png" alt="NYU" className="company-logo" />
              <img src="/svg/company_logo/northwestern.png" alt="Northwestern" className="company-logo" />
              <img src="/svg/company_logo/cal_poly.png" alt="Cal Poly" className="company-logo" />
              <img src="/svg/company_logo/carnegie.png" alt="Carnegie Mellon University" className="company-logo" />
              <img src="/svg/company_logo/massachusetts.png" alt="Massachusetts Institute of Technology" className="company-logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

