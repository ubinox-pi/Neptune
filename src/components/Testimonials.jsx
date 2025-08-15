import { useState, useEffect } from 'react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState([
    { value: 0, target: 5, suffix: 'M+', label: 'Happy Customers' },
    { value: 0, target: 98, suffix: '%', label: 'Satisfaction Rate' },
    { value: 0, target: 150, suffix: '+', label: 'Branches Nationwide' },
    { value: 0, target: 24, suffix: '/7', label: 'Customer Support' }
  ]);

  const testimonials = [
    {
      quote: "The mobile app made managing my mortgage effortless. I approved documents with fingerprint ID while traveling abroad!",
      author: "Sarah K., Business Owner",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5
    },
    {
      quote: "Got approved for a car loan in 8 minutes with their instant decision system. Game changer!",
      author: "Michael T., Software Engineer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4
    },
    {
      quote: "Their fraud detection saved me from a $2,500 scam. The security team called me within 30 seconds of suspicious activity.",
      author: "Priya M., College Professor",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5
    }
  ];

  useEffect(() => {
    const duration = 2000;
    const timerIds = [];
    const targets = [5, 98, 150, 24];

    targets.forEach((t, index) => {
      let start = 0;
      const increment = (t / duration) * 16;
      const id = setInterval(() => {
        start += increment;
        const nextVal = Math.min(Math.floor(start), t);
        setStats(prev => {
          const next = [...prev];
          next[index] = { ...next[index], value: nextVal };
          return next;
        });
        if (nextVal >= t) clearInterval(id);
      }, 16);
      timerIds.push(id);
    });

    return () => timerIds.forEach(clearInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="testimonials-section">
      <div className="trust-banner">
        <div className="trust-logos">
          {['fdic', 'bbb', 'norton'].map(logo => (
            <img
              key={logo}
              src={`/trust-${logo}.svg`}
              alt={`${logo.toUpperCase()} certified`}
            />
          ))}
        </div>
      </div>

      <div className="testimonials-container">
        <h2>Trusted By Millions</h2>
        <p className="subtitle">Join our community of satisfied customers</p>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-value">
                {stat.value}
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="testimonial-carousel">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
            >
              <div className="testimonial-content">
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < testimonial.rating ? 'filled' : ''}`}>★</span>
                  ))}
                </div>
                <blockquote>"{testimonial.quote}"</blockquote>
                <div className="author">
                  <img src={testimonial.avatar} alt={testimonial.author} />
                  <span>{testimonial.author}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="testimonial-nav">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
