import {Link} from 'react-router';

export const meta = () => {
  return [{title: 'About Us | nLab'}];
};

export default function About() {
  return (
    <div className="about-page">
      <section className="about-story">
        <div className="about-story-pattern-left">
          <img src="/svg/about_left_pattern.svg" alt="" />
        </div>
        <div className="about-story-pattern-right">
          <img src="/svg/about_right_pattern.svg" alt="" />
        </div>

        <div className="about-story-container">
          <div className="about-story-content">
            <div className="about-story-text">
              <h2 className="about-story-title">
                <span className="hidden md:inline">
                  BUILT BY EDUCATORS.<br />
                  TRUSTED BY MAKERS.
                </span>
                <span className="md:hidden">
                  BUILT BY EDUCATORS. TRUSTED BY MAKERS.
                </span>
              </h2>
              <p className="about-story-description">
                nLab started in university classrooms, where our founders set out to solve a challenge: how to make real electronics and robotics skills accessible to everyone, not just engineers.
              </p>
              <p className="about-story-description">
                After years of testing with students, educators, and hobbyists, we created a system that combines real hardware, guided software, and hands-on projects. Thousands have already used nLab to spark curiosity and build confidence. Now, we're bringing that proven experience directly to you.
              </p>
              <div className="about-story-pattern">
                <img src="/svg/left_small_pattern.svg" alt="" />
              </div>
            </div>
            <div className="about-story-image">
              <img src="/svg/img/about.png" alt="Educators and makers working together" />
            </div>
          </div>
        </div>
      </section>

      <section className="about-makers">
        <div className="about-makers-container">
          <div className="about-makers-intro">
            <h2 className="about-makers-title">THE MAKERS BEHIND NLAB</h2>
            <p className="about-makers-description">
              We're engineers and educators who started nLab in university classrooms to make electronics and robotics accessible to everyone. After years of testing with students and makers, we're bringing our proven system directly to you.
            </p>
          </div>

          <div className="about-makers-profile">
            <div className="about-makers-profile-text">
              <h3 className="about-makers-profile-name">HI! I'M NICK</h3>
              <p className="about-makers-profile-role about-makers-profile-role-nick">Co-Founder & Chief Product Officer</p>
              <p className="about-makers-profile-bio">
                As a professor of mechatronics, Nick noticed his students were taking turns crowded around one machine instead of building circuits – and confidence – independently.
              </p>
              <p className="about-makers-profile-bio">
                He created an early version of nLab to make the teaching and learning process easier for himself and his students. The word spread about this little powerhouse, and the rest is history!
              </p>
            </div>
            <div className="about-makers-profile-image">
              <img src="/svg/img/about_first.png" alt="Nick - Co-Founder & Chief Product Officer" />
            </div>
          </div>

          <div className="about-makers-profile about-makers-profile-reverse">
            <div className="about-makers-profile-image">
              <img src="/svg/img/about_second.png" alt="Angie - Co-Founder & CEO" />
            </div>
            <div className="about-makers-profile-text">
              <h3 className="about-makers-profile-name">HELLO! I'M ANGIE</h3>
              <p className="about-makers-profile-role about-makers-profile-role-angie">Co-Founder & CEO</p>
              <p className="about-makers-profile-bio">
                As an engineer, Angie witnessed firsthand the frustrations of learning electronics with big, clunky, outdated machines of the electronics lab. When she first encountered nLab, her world changed, and she went on to a successful career in the robotics industry, with the nLab as her constant companion.
              </p>
              <p className="about-makers-profile-bio">
                After many people asked her how to get one, and realizing this could help a lot of people, she traded her desk job for an entrepreneurial role in order to bring this invention to more people around the world.
              </p>
            </div>
          </div>

          <div className="about-makers-footer">
            <p>Also, we're married 😊 💕</p>
          </div>
        </div>
      </section>
    </div>
  );
}

