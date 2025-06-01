import { useEffect, useRef } from 'react';

const BankFeatures = () => {
  const featuresRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: '💳',
      title: "Digital Wallet",
      description: "Secure contactless payments with our integrated digital wallet solution",
      delay: "0.1s"
    },
    {
      icon: '📈',
      title: "Investment Tools",
      description: "Real-time market data and personalized investment recommendations",
      delay: "0.2s"
    },
    {
      icon: '🔒',
      title: "Advanced Security",
      description: "Biometric authentication and AI-powered fraud detection",
      delay: "0.3s"
    },
    {
      icon: '🌐',
      title: "Global Transfers",
      description: "Send money worldwide with competitive exchange rates",
      delay: "0.4s"
    },
    {
      icon: '🧾',
      title: "Smart Budgeting",
      description: "Automated spending analysis and financial health insights",
      delay: "0.5s"
    },
    {
      icon: '🛡️',
      title: "Insurance Plans",
      description: "Comprehensive coverage tailored to your needs",
      delay: "0.6s"
    }
  ];

  return (
    <section className="features-section" ref={featuresRef}>
      <div className="features-container">
        <h2 className="section-title">Banking Made Smarter</h2>
        <p className="section-subtitle">Innovative solutions for modern financial needs</p>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              className="feature-card" 
              key={index}
              style={{ animationDelay: feature.delay }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BankFeatures;