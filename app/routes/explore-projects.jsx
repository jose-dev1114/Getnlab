import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Explore Projects | nLab'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  return defer({});
}

export default function ExploreProjects() {
  return (
    <div className="explore-projects-page">
      <section className="explore-projects-hero-section">
        <div className="explore-projects-hero-content">
          <div className="explore-projects-hero-text">
            <div className="explore-projects-hero-pattern">
              <img src="/svg/left_small_pattern.svg" alt="" />
            </div>
            
            <h1 className="explore-projects-hero-title">
              EXPLORE PROJECTS<br />
              BUILD YOUR SKILLS
            </h1>
            <p className="explore-projects-hero-description">
              Discover hands-on electronics projects designed to take you from beginner to advanced. 
              Each project builds on the last, teaching you circuits, coding, and engineering fundamentals 
              through real-world applications.
            </p>
            
            <button className="explore-projects-cta-button">
              Start Building <img src="/svg/arrow-right.svg" alt="Start" className="explore-arrow" />
            </button>
          </div>

          <div className="explore-projects-hero-image">
            <img src="/svg/img/explore-projects.png" alt="nLab Projects" />
          </div>
        </div>
      </section>

      <section className="projects-grid-section">
        <div className="projects-grid-container">
          <h2 className="projects-grid-title">PROJECT CATEGORIES</h2>
          
          <div className="projects-grid">
            <div className="project-category-card">
              <div className="project-category-icon">
                <img src="/svg/light-icon.svg" alt="Light Projects" />
              </div>
              <h3 className="project-category-title">LIGHT</h3>
              <p className="project-category-description">
                Learn the basics of LEDs, circuits, and visual feedback systems.
              </p>
              <div className="project-category-count">8 Projects</div>
            </div>

            <div className="project-category-card">
              <div className="project-category-icon">
                <img src="/svg/sound-icon.svg" alt="Sound Projects" />
              </div>
              <h3 className="project-category-title">SOUND</h3>
              <p className="project-category-description">
                Build speakers, synthesizers, and audio processing circuits.
              </p>
              <div className="project-category-count">6 Projects</div>
            </div>

            <div className="project-category-card">
              <div className="project-category-icon">
                <img src="/svg/sensing-icon.svg" alt="Sensing Projects" />
              </div>
              <h3 className="project-category-title">SENSING</h3>
              <p className="project-category-description">
                Create sensors for temperature, motion, and environmental data.
              </p>
              <div className="project-category-count">10 Projects</div>
            </div>

            <div className="project-category-card">
              <div className="project-category-icon">
                <img src="/svg/motion-icon.svg" alt="Motion Projects" />
              </div>
              <h3 className="project-category-title">MOTION</h3>
              <p className="project-category-description">
                Build motors, servos, and mechanical movement systems.
              </p>
              <div className="project-category-count">7 Projects</div>
            </div>

            <div className="project-category-card">
              <div className="project-category-icon">
                <img src="/svg/ai-icon.svg" alt="AI Hardware Projects" />
              </div>
              <h3 className="project-category-title">AI HARDWARE</h3>
              <p className="project-category-description">
                Integrate machine learning with physical computing systems.
              </p>
              <div className="project-category-count">5 Projects</div>
            </div>

            <div className="project-category-card">
              <div className="project-category-icon">
                <img src="/svg/custom-icon.svg" alt="Custom Projects" />
              </div>
              <h3 className="project-category-title">YOUR OWN INVENTIONS</h3>
              <p className="project-category-description">
                Combine everything you've learned to create original projects.
              </p>
              <div className="project-category-count">∞ Projects</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
