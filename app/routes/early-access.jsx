import {Link, useRouteLoaderData} from 'react-router';
import {Header} from '~/components/Header';
import {Footer} from '~/components/Footer';

export const meta = () => {
  return [{title: 'Get Early Access | nLab'}];
};

export default function EarlyAccess() {
  const data = useRouteLoaderData('root');

  return (
    <>
      <div className="early-access-header-wrapper">
        {data && <Header header={data.header} cart={data.cart} publicStoreDomain={data.publicStoreDomain} />}
      </div>
      <div className="early-access-page">
      <div className="early-access-content">
        <h1>Get Early Access</h1>
        <p>Be the first to experience nLab - the revolutionary electronics learning kit.</p>
        
        <form className="early-access-form">
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
              <option value="">Select an option</option>
              <option value="light">Light Projects</option>
              <option value="sound">Sound Projects</option>
              <option value="sensing">Sensing Projects</option>
              <option value="motion">Motion Projects</option>
              <option value="ai">AI Hardware</option>
              <option value="all">All of the above</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Tell us about yourself (optional)</label>
            <textarea 
              id="message" 
              name="message" 
              rows="4"
              placeholder="Share your background or what you hope to build..."
            ></textarea>
          </div>
          
          <button type="submit" className="submit-button">
            Submit Application
          </button>
        </form>
        
        <div className="early-access-info">
          <h2>What You'll Get</h2>
          <ul>
            <li>🎯 Priority access to the nLab kit</li>
            <li>💰 Exclusive early bird pricing</li>
            <li>📚 Access to premium learning resources</li>
            <li>👥 Join our community of builders</li>
            <li>🚀 Be part of the electronics revolution</li>
          </ul>
        </div>
        
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </div>
    </div>
    {data && <Footer />}
    </>
  );
}

