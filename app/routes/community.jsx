/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: `nLab | Community`}];
};

export default function Community() {
  return (
    <div className="community-page">
      {/* Community Story Section */}
      <section className="community-story">
        <div className="community-story-pattern-right">
          <img src="/svg/right_black_pattern_second.svg" alt="" />
        </div>

        <div className="community-story-container">
          <div className="community-story-content">
            <h2 className="community-story-title">
              JOIN OUR COMMUNITY.<br />
              BUILD TOGETHER.
            </h2>
            <p className="community-story-description">
              Connect with thousands of makers, educators, and electronics enthusiasts from around the world. Our community is where ideas spark, projects come to life, and learning never stops.
            </p>
            <p className="community-story-description">
              Whether you're just starting your electronics journey or you're an experienced builder, you'll find support, inspiration, and collaboration opportunities. Share your projects, get help with challenges, and discover what's possible when makers come together.
            </p>

            <div className="community-cta-buttons">
              <a
                href="https://discord.gg/PTZGpAkj"
                target="_blank"
                rel="noopener noreferrer"
                className="community-discord-btn"
              >
                <img src="/svg/discord.svg" alt="Discord" className="community-icon" />
                Join Discord Community
              </a>

              <a
                href="https://www.youtube.com/@get-nlab"
                target="_blank"
                rel="noopener noreferrer"
                className="community-youtube-btn"
              >
                <img src="/svg/youtube.svg" alt="YouTube" className="community-icon" />
                Subscribe to YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

        {/* Discord Section */}
        <section className="community-discord-section">
          <div className="community-section-content">
            <div className="community-text-content">
              <h2 className="community-section-title">Discord Community</h2>
              <p className="community-section-description">
                Join thousands of makers in our Discord server. Get real-time help, share your projects, 
                participate in challenges, and connect with the nLab team directly.
              </p>
              
              <div className="community-features">
                <div className="community-feature">
                  <div className="community-feature-icon">💬</div>
                  <div className="community-feature-text">
                    <h3>Real-time Chat</h3>
                    <p>Get instant help and feedback from the community</p>
                  </div>
                </div>
                
                <div className="community-feature">
                  <div className="community-feature-icon">🚀</div>
                  <div className="community-feature-text">
                    <h3>Project Showcase</h3>
                    <p>Share your builds and get inspired by others</p>
                  </div>
                </div>
                
                <div className="community-feature">
                  <div className="community-feature-icon">🎯</div>
                  <div className="community-feature-text">
                    <h3>Weekly Challenges</h3>
                    <p>Participate in fun building challenges</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="community-discord-preview">
              <div className="discord-embed-placeholder">
                <img src="/svg/discord.svg" alt="Discord" className="discord-preview-icon" />
                <h3>Discord Server Preview</h3>
                <p>Join our active community of makers</p>

                {/* Discord Screenshots Placeholder */}
                <div className="discord-screenshots">
                  <div className="screenshot-item">
                    <div className="screenshot-placeholder">
                      <span>💬</span>
                      <p>Live Chat Discussions</p>
                    </div>
                  </div>
                  <div className="screenshot-item">
                    <div className="screenshot-placeholder">
                      <span>🔧</span>
                      <p>Project Help Channel</p>
                    </div>
                  </div>
                  <div className="screenshot-item">
                    <div className="screenshot-placeholder">
                      <span>🎯</span>
                      <p>Weekly Challenges</p>
                    </div>
                  </div>
                </div>

                <div className="discord-stats">
                  <div className="discord-stat">
                    <span className="stat-number">2.5K+</span>
                    <span className="stat-label">Members</span>
                  </div>
                  <div className="discord-stat">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* YouTube Section */}
        <section className="community-youtube-section">
          <div className="community-section-content">
            <div className="community-youtube-preview">
              <div className="youtube-embed-placeholder">
                <img src="/svg/youtube.svg" alt="YouTube" className="youtube-preview-icon" />
                <h3>Latest YouTube Content</h3>
                <p>Tutorials, project walkthroughs, and community highlights</p>

                {/* YouTube Shorts Preview */}
                <div className="youtube-shorts-grid">
                  <div className="youtube-short">
                    <div className="short-thumbnail">
                      <div className="play-button">▶</div>
                      <span className="short-duration">0:45</span>
                    </div>
                    <p className="short-title">Quick LED Tutorial</p>
                  </div>
                  <div className="youtube-short">
                    <div className="short-thumbnail">
                      <div className="play-button">▶</div>
                      <span className="short-duration">1:20</span>
                    </div>
                    <p className="short-title">Circuit Debugging Tips</p>
                  </div>
                  <div className="youtube-short">
                    <div className="short-thumbnail">
                      <div className="play-button">▶</div>
                      <span className="short-duration">0:58</span>
                    </div>
                    <p className="short-title">Component Spotlight</p>
                  </div>
                </div>

                <div className="youtube-stats">
                  <div className="youtube-stat">
                    <span className="stat-number">50K+</span>
                    <span className="stat-label">Subscribers</span>
                  </div>
                  <div className="youtube-stat">
                    <span className="stat-number">100+</span>
                    <span className="stat-label">Videos</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="community-text-content">
              <h2 className="community-section-title">YouTube Channel</h2>
              <p className="community-section-description">
                Subscribe to our YouTube channel for in-depth tutorials, project showcases, 
                community highlights, and behind-the-scenes content from the nLab team.
              </p>
              
              <div className="community-features">
                <div className="community-feature">
                  <div className="community-feature-icon">📚</div>
                  <div className="community-feature-text">
                    <h3>Tutorials</h3>
                    <p>Step-by-step guides for every skill level</p>
                  </div>
                </div>
                
                <div className="community-feature">
                  <div className="community-feature-icon">🎬</div>
                  <div className="community-feature-text">
                    <h3>Project Showcases</h3>
                    <p>See amazing community builds in action</p>
                  </div>
                </div>
                
                <div className="community-feature">
                  <div className="community-feature-icon">🔔</div>
                  <div className="community-feature-text">
                    <h3>Weekly Updates</h3>
                    <p>Stay updated with new features and content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
