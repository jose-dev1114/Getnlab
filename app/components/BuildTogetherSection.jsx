import { Link } from "react-router";

export function BuildTogetherSection() {
  return (
    <>
      <section className="build-together-section">
        <div className="build-together-lightning">
          <img src="/svg/blue_light.svg" alt="" />
        </div>
        <div className="build-together-pattern">
          <img src="/svg/right_grey_pattern_two.svg" alt="" />
        </div>

        <div className="build-together-content">
          <h2 className="build-together-title">10,000 STUDENTS AND PROFESSORS USE NLAB GLOBALLY.</h2>
          <p className="build-together-universities">
            Northwestern - Carnegie Mellon - University of Colorado - Tufts - Johns Hopkins - Technion Israel - Griffith University Australia - University of Lagos, Nigeria - ... and more!
          </p>
          <p className="build-together-tagline">
            NOW, FOR THE FIRST TIME, WE'RE BRINGING IT DIRECTLY TO YOU.
          </p>
        </div>
      </section>

      <section className="build-together-cards">
        <div className="build-card build-card-row">
          <div className="build-card-image">
            <img src="/svg/img/access_second.png" alt="Career-Ready, Project by Project" />
          </div>
          <div className="build-card-content">
            <h3 className="build-card-title">WHO IT'S FOR</h3>

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

        <Link to="/early-access" className="build-card-button build-section-cta">
          Get Early Access
          <img src="/svg/green-arrow.svg" alt="" className="button-arrow" />
        </Link>
      </section>
    </>
  );
}

