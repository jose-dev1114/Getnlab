import {Link} from 'react-router';

export const meta = () => {
  return [{title: 'Starter Kit | nLab'}];
};

export default function StarterKit() {
  return (
    <div className="starter-kit-page">
      <section className="starter-kit-hero">
        <div className="starter-kit-hero-pattern-right">
          <img src="/svg/right_black_pattern_second.svg" alt="" />
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

