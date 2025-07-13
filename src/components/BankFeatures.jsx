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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: '💰',
      title: 'Quick Balance',
      description: 'Check your account balance instantly and securely.'
    },
    {
      icon: '💸',
      title: 'Fund Transfer',
      description: 'Transfer money to anyone, anywhere, anytime with ease.'
    },
    {
      icon: '🧾',
      title: 'Bill Payments',
      description: 'Pay your utility bills, recharge, and more in one place.'
    },
    {
      icon: '💳',
      title: 'Card Management',
      description: 'Manage your debit and credit cards, set limits, and block cards instantly.'
    },
    {
      icon: '📞',
      title: '24x7 Support',
      description: 'Get help anytime with our dedicated customer support team.'
    },
    {
      icon: '📊',
      title: 'Account Overview',
      description: 'See all your accounts, balances, and recent activity at a glance.'
    },
    {
      icon: '📱',
      title: 'UPI & QR Payments',
      description: 'Scan & pay or send money instantly using UPI and QR codes.'
    },
    {
      icon: '🏦',
      title: 'Loan Services',
      description: 'Apply for personal, home, or car loans with quick approval.'
    },
    {
      icon: '📈',
      title: 'Investments',
      description: 'Explore mutual funds, FDs, and other investment options.'
    },
    {
      icon: '🔔',
      title: 'Notifications',
      description: 'Get instant alerts for transactions, offers, and reminders.'
    },
    {
      icon: '💳',
      title: 'Digital Wallet',
      description: 'Secure contactless payments with our integrated digital wallet solution.'
    },
    {
      icon: '🔒',
      title: 'Advanced Security',
      description: 'Biometric authentication and AI-powered fraud detection.'
    },
    {
      icon: '🌐',
      title: 'Global Transfers',
      description: 'Send money worldwide with competitive exchange rates.'
    },
    {
      icon: '🧾',
      title: 'Smart Budgeting',
      description: 'Automated spending analysis and financial health insights.'
    },
    {
      icon: '🛡️',
      title: 'Insurance Plans',
      description: 'Comprehensive coverage tailored to your needs.'
    },
    {
      icon: '🤝',
      title: '24/7 Customer Support',
      description: 'Get assistance anytime with our dedicated support team.'
    },
    {
      icon: '⚡',
      title: 'Instant Account Opening',
      description: 'Open your account online in just a few minutes.'
    },
    {
      icon: '🔔',
      title: 'Custom Alerts',
      description: 'Set up personalized notifications for your transactions and account activity.'
    },
    {
      icon: '🗂️',
      title: 'Document Vault',
      description: 'Securely store and access your important financial documents anytime.'
    },
    {
      icon: '➕',
      title: 'Many More',
      description: 'And many more features to make your banking experience smarter and easier!'
    }
  ];

  return (
    <section className="features-section" ref={featuresRef} style={{
      background: 'linear-gradient(90deg, #f4f8fc 60%, #e3f2fd 100%)',
      borderRadius: '24px',
      boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.10)',
      margin: '40px auto',
      maxWidth: '1100px',
      padding: '40px 0 30px 0',
      position: 'relative',
    }}>
      <div className="features-container">
        <h2 className="section-title" style={{
          fontSize: '2.2rem',
          color: '#1976d2',
          fontWeight: 800,
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          background: 'linear-gradient(90deg, #00bcd4, #1976d2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
          textAlign: 'center',
        }}>Banking App Features</h2>
        <p className="section-subtitle" style={{
          textAlign: 'center',
          color: '#1976d2',
          fontWeight: 500,
          fontSize: '1.1rem',
          marginBottom: '32px',
        }}>Everything you need in one modern banking app</p>
        <div className="features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '28px',
          padding: '0 24px',
        }}>
          {features.map((feature, index) => (
            <div className="feature-card" key={index} style={{
              background: '#fff',
              borderRadius: '18px',
              boxShadow: '0 4px 15px rgba(0, 188, 212, 0.10)',
              padding: '28px 18px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.3s, box-shadow 0.3s',
              minHeight: '210px',
            }}>
              <span className="feature-icon" role="img" aria-label={feature.title} style={{
                fontSize: '2.2rem',
                marginBottom: '12px',
                color: '#1976d2',
                filter: 'drop-shadow(0 2px 8px #00bcd4aa)'
              }}>{feature.icon}</span>
              <h3 className="feature-title" style={{
                fontSize: '1.18rem',
                fontWeight: 700,
                color: '#1976d2',
                marginBottom: '8px',
                textAlign: 'center',
              }}>{feature.title}</h3>
              <p className="feature-description" style={{
                color: '#555',
                fontSize: '1rem',
                textAlign: 'center',
                lineHeight: 1.5,
              }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BankFeatures;
