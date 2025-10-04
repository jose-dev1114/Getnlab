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
                BUILT BY EDUCATORS.<br />
                TRUSTED BY MAKERS.
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
    </div>
  );
}

