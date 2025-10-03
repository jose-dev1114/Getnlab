export function PatternSection() {
  return (
    <section className="pattern-section">
      {/* Left pattern */}
      <div className="pattern-left">
        <img src="/svg/left_blue_pattern.svg" alt="Left Pattern" />
      </div>

      {/* Right pattern */}
      <div className="pattern-right">
        <img src="/svg/right_small_pattern.svg" alt="Right Pattern" />
      </div>

      <div className="pattern-content">
        <h2 style={{fontSize: '2rem', color: '#2B2B2B', textAlign: 'center'}}>
          Content Section
        </h2>
      </div>
    </section>
  );
}

