import { Link } from "react-router";

export function BuildTogetherSection() {
  return (
    <>
      <section className="build-together-section">
        <div className="build-together-pattern">
          <img src="/svg/right_grey_pattern_two.svg" alt="" />
        </div>

        <div className="build-together-content">
          <h2 className="build-together-title">BUILD TOGETHER</h2>
          <p className="build-together-description">
            Supported at every step, through software and community.
          </p>
        </div>
      </section>

      <section className="build-together-cards">
        <div className="build-card">
          <div className="build-card-image">
            <img src="/svg/img/access_first.png" alt="Your Lab, Powered by Software" />
          </div>
          <div className="build-card-content">
            <h3 className="build-card-title">YOUR LAB,<br />POWERED BY SOFTWARE</h3>
            <Link to="/download" className="build-card-button">
              Learn More About The App
              <img src="/svg/green-arrow.svg" alt="" className="button-arrow" />
            </Link>

            <div className="build-card-features">
              <div className="build-feature">
                <h4>LIVE DATA</h4>
                <p>Visualize circuits in real time and understand how they work</p>
              </div>

              <div className="build-feature">
                <h4>PROGRESSION PATHS</h4>
                <p>Beginner, Intermediate, and Advanced tracks</p>
              </div>

              <div className="build-feature">
                <h4>SEAMLESS INTEGRATION</h4>
                <p>Works directly with your Starter Kit</p>
              </div>
            </div>
          </div>
        </div>

        <div className="build-card">
          <div className="build-card-image">
            <img src="/svg/img/access_second.png" alt="Career-Ready, Project by Project" />
          </div>
          <div className="build-card-content">
            <h3 className="build-card-title">CAREER-READY,<br />PROJECT BY PROJECT</h3>
            <a href="https://discord.gg/PTZGpAkj" target="_blank" rel="noopener noreferrer" className="build-card-button">
              Join our Discord Community
              <img src="/svg/arrow_right.svg" alt="" className="button-arrow" />
            </a>

            <div className="build-card-features">
              <div className="build-feature build-feature-underline">
                <h4>CAREER CHANGERS</h4>
                <p>looking to break into tech with real, hands-on skills.</p>
              </div>

              <div className="build-feature build-feature-underline">
                <h4>FUTURE ENGINEERS</h4>
                <p>building a foundation in electronics and robotics.</p>
              </div>

              <div className="build-feature build-feature-underline">
                <h4>SELF-DIRECTED LEARNERS</h4>
                <p>following their curiosity with no prerequisites.</p>
              </div>

              <div className="build-feature build-feature-underline">
                <h4>BUILDERS & INFLUENCERS</h4>
                <p>who want to create, share, and spark inspiration.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

