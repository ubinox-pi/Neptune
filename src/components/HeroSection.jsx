import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { sessionManager } from '../utils/sessionManager.js';

const HeroSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetStarted = async () => {
    setLoading(true);
    setError('');

    // First authenticate with the session
    const loginResult = await sessionManager.login();

    if (loginResult.success) {
      // Show success message with user info
      const userInfo = loginResult.data;
      console.log(`Login successful! Welcome ${userInfo.username} (${userInfo.role})`);

      // Test session immediately after login
      const sessionTest = await sessionManager.testSessionAfterLogin();
      if (sessionTest.success) {
        console.log('Session test passed - session is properly established');
      } else {
        console.warn('Session test failed, but proceeding anyway:', sessionTest.error);
        // Don't block the user - proceed to registration page
        // The OTP functions will handle re-authentication if needed
      }

      // Navigate to register page after successful authentication
      navigate('/register');
    } else {
      setError(loginResult.error || 'Authentication failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
      className="hero-section"
    >
      <div className="hero-bg-shapes">
        <motion.div className="shape shape1" animate={{ y: [0, 30, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="shape shape2" animate={{ y: [0, -40, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="shape shape3" animate={{ x: [0, 40, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      </div>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="main-text"
      >
        Welcome to Neptune Bank
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="hero-subtext"
      >
        Your financial journey starts here with secure, smart, and swift banking services.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="hero-highlight"
      >
        From savings to investments – we've got everything to empower your future.
      </motion.p>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="error-message"
          style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}
        >
          {error}
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: loading ? 1 : 1.1 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="get-started"
        onClick={handleGetStarted}
        disabled={loading}
        style={{ opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'Authenticating...' : 'Get Started'}
      </motion.button>
    </motion.section>
  );
};

export default HeroSection;
