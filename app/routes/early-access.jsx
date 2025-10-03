import {Link} from 'react-router';

export const meta = () => {
  return [{title: 'Get Early Access | nLab'}];
};

export default function EarlyAccess() {
  return (
    <div className="early-access-page">
      <div className="early-access-content">
        <h1>Get Early Access <br /> FOR 10% Off at Launch</h1>
        <p>Be among the first to build, learn, and create with nLab <br /> — now before the Kickstarter goes live.</p>
      </div>

      <div className="early-access-image-container">
        <img
          src="/svg/blue_light.svg"
          alt=""
          className="blue-light-overlay"
        />
        <img
          src="/svg/img/access_main.png"
          alt="nLab Electronics Kit"
          className="early-access-main-image"
        />
      </div>

      <div className="early-access-description">
        <p className="description-main">
          nLab isn't a new idea — it's a field-tested system trusted by educators and learners. We've refined it through university classrooms and hundreds of hands-on builds. Now, we're launching it for everyone.
        </p>
        <p className="description-secondary">
          When you join Early Access, you're not just pre-ordering a kit. You're joining a community, shaping the future of STEM learning, and getting in early with perks.
        </p>
      </div>

      <div className="early-access-content">
        <form className="early-access-form">
          <h2>SIGN UP</h2>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="interest">What interests you most?</label>
            <select id="interest" name="interest">
              <option value="">Why are you interested in nLab?</option>
              <option value="light">Light Projects</option>
              <option value="sound">Sound Projects</option>
              <option value="sensing">Sensing Projects</option>
              <option value="motion">Motion Projects</option>
              <option value="ai">AI Hardware</option>
              <option value="all">All of the above</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            <span>Join the list</span>
            <span>→</span>
          </button>

          <p className="form-disclaimer">
            No spam—just cool builds, perks, and learning inspiration. You can unsubscribe anytime.
          </p>
        </form>
      </div>

      <div className="early-access-images-section">
        <div className="access-image-container">
          <img
            src="/svg/img/access_first.png"
            alt="nLab Kit Feature 1"
            className="access-image"
          />
        </div>
        <div className="access-image-container">
          <img
            src="/svg/img/access_second.png"
            alt="nLab Kit Feature 2"
            className="access-image"
          />
        </div>
      </div>

      <div className="early-access-content">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

