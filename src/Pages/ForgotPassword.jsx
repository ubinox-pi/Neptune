import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import logo from '../assets/Neptune Bank.png';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Enter details, 2: Verify OTP, 3: Reset password
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    emailOtp: '',
    phoneOtp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState({ email: false, phone: false });
  const [timer, setTimer] = useState({ email: 0, phone: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState({ email: false, phone: false });

  // Timer countdown for resend OTP
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => ({
        email: prev.email > 0 ? prev.email - 1 : 0,
        phone: prev.phone > 0 ? prev.phone - 1 : 0
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.emailOtp) {
      newErrors.emailOtp = 'Email OTP is required';
    } else if (formData.emailOtp.length !== 6) {
      newErrors.emailOtp = 'OTP must be 6 digits';
    }
    
    if (!formData.phoneOtp) {
      newErrors.phoneOtp = 'Phone OTP is required';
    } else if (formData.phoneOtp.length !== 6) {
      newErrors.phoneOtp = 'OTP must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOTP = async (type) => {
    // Simulate OTP sending
    console.log(`Sending OTP to ${type}:`, formData[type]);
    setOtpSent(prev => ({ ...prev, [type]: true }));
    setTimer(prev => ({ ...prev, [type]: 30 }));
  };

  const verifyOTP = async (type) => {
    // Simulate OTP verification
    const otpValue = type === 'email' ? formData.emailOtp : formData.phoneOtp;
    console.log(`Verifying ${type} OTP:`, otpValue);
    
    // For demo purposes, accept any 6-digit OTP
    if (otpValue.length === 6) {
      setVerificationStatus(prev => ({ ...prev, [type]: true }));
      return true;
    }
    return false;
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      sendOTP('email');
      sendOTP('phone');
      setStep(2);
    }
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      const emailValid = verifyOTP('email');
      const phoneValid = verifyOTP('phone');
      
      if (emailValid && phoneValid) {
        setStep(3);
      } else {
        setErrors({ general: 'Invalid OTP. Please try again.' });
      }
    }
  };

  const handleStep3Submit = (e) => {
    e.preventDefault();
    if (validateStep3()) {
      console.log('Password reset successful');
      // Here you would typically reset the password and redirect
      alert('Password reset successful! You can now login with your new password.');
    }
  };

  const renderStep1 = () => (
    <form onSubmit={handleStep1Submit} className="forgot-form">
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your registered email"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter your registered phone number"
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <motion.button
        type="submit"
        className="submit-button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Send OTP
      </motion.button>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleStep2Submit} className="forgot-form">
      <div className="verification-info">
        <p>We've sent verification codes to:</p>
        <div className="contact-info">
          <div className="contact-item">
            <span className="icon">📧</span>
            <span>{formData.email}</span>
            {verificationStatus.email && <span className="verified">✅</span>}
          </div>
          <div className="contact-item">
            <span className="icon">📱</span>
            <span>{formData.phone}</span>
            {verificationStatus.phone && <span className="verified">✅</span>}
          </div>
        </div>
      </div>

      <div className="otp-section">
        <div className="form-group">
          <label htmlFor="emailOtp">Email OTP</label>
          <div className="otp-input-wrapper">
            <input
              type="text"
              id="emailOtp"
              name="emailOtp"
              value={formData.emailOtp}
              onChange={handleInputChange}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              className={errors.emailOtp ? 'error' : ''}
            />
            <button
              type="button"
              className="resend-button"
              disabled={timer.email > 0}
              onClick={() => sendOTP('email')}
            >
              {timer.email > 0 ? `Resend in ${timer.email}s` : 'Resend'}
            </button>
          </div>
          {errors.emailOtp && <span className="error-message">{errors.emailOtp}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneOtp">Phone OTP</label>
          <div className="otp-input-wrapper">
            <input
              type="text"
              id="phoneOtp"
              name="phoneOtp"
              value={formData.phoneOtp}
              onChange={handleInputChange}
              placeholder="Enter 6-digit OTP"
              maxLength="6"
              className={errors.phoneOtp ? 'error' : ''}
            />
            <button
              type="button"
              className="resend-button"
              disabled={timer.phone > 0}
              onClick={() => sendOTP('phone')}
            >
              {timer.phone > 0 ? `Resend in ${timer.phone}s` : 'Resend'}
            </button>
          </div>
          {errors.phoneOtp && <span className="error-message">{errors.phoneOtp}</span>}
        </div>
      </div>

      {errors.general && <div className="error-message general-error">{errors.general}</div>}

      <motion.button
        type="submit"
        className="submit-button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Verify OTP
      </motion.button>
    </form>
  );

  const renderStep3 = () => (
    <form onSubmit={handleStep3Submit} className="forgot-form">
      <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            placeholder="Enter your new password"
            className={errors.newPassword ? 'error' : ''}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm your new password"
          className={errors.confirmPassword ? 'error' : ''}
        />
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
      </div>

      <motion.button
        type="submit"
        className="submit-button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Reset Password
      </motion.button>
    </form>
  );

  return (
    <div className="forgot-password-page">
      <div className="forgot-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="forgot-form-wrapper"
        >
          {/* Logo */}
          <div className="forgot-logo">
            <img src={logo} alt="Neptune Bank Logo" />
          </div>

          {/* Header */}
          <div className="forgot-header">
            <h2>
              {step === 1 && 'Forgot Password'}
              {step === 2 && 'Verify Your Identity'}
              {step === 3 && 'Reset Password'}
            </h2>
            <p>
              {step === 1 && 'Enter your registered email and phone number to receive verification codes'}
              {step === 2 && 'Enter the verification codes sent to your email and phone'}
              {step === 3 && 'Create a new password for your account'}
            </p>
          </div>

          {/* Progress indicator */}
          <div className="progress-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={`line ${step >= 3 ? 'active' : ''}`}></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
          </div>

          {/* Render current step */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          {/* Back to Login */}
          <div className="back-to-login">
            <Link to="/login" className="back-link">
              ← Back to Login
            </Link>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .forgot-password-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #d4f1f9 0%, #f9fcff 50%, #e6f3ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .forgot-container {
          width: 100%;
          max-width: 500px;
        }

        .forgot-form-wrapper {
          background: #ffffff;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 123, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .forgot-logo {
          text-align: center;
          margin-bottom: 2rem;
        }

        .forgot-logo img {
          height: 60px;
          width: auto;
        }

        .forgot-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .forgot-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #003366;
          margin: 0 0 0.5rem 0;
        }

        .forgot-header p {
          color: #666;
          font-size: 0.95rem;
          margin: 0;
          line-height: 1.4;
        }

        .progress-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          gap: 0.5rem;
        }

        .step {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #e1e8f0;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .step.active {
          background: #3399ff;
          color: white;
        }

        .line {
          width: 40px;
          height: 2px;
          background: #e1e8f0;
          transition: all 0.3s ease;
        }

        .line.active {
          background: #3399ff;
        }

        .forgot-form {
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #004080;
          font-size: 0.95rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid #e1e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background-color: #fafbfc;
          box-sizing: border-box;
        }

        .form-group input:focus {
          border-color: #3399ff;
          outline: none;
          box-shadow: 0 0 0 3px rgba(51, 153, 255, 0.1);
          background-color: #ffffff;
        }

        .form-group input.error {
          border-color: #ff4757;
        }

        .password-input-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          color: #666;
          padding: 4px;
        }

        .error-message {
          color: #ff4757;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          display: block;
        }

        .general-error {
          text-align: center;
          margin: 1rem 0;
          font-weight: 500;
        }

        .verification-info {
          margin-bottom: 2rem;
          padding: 1rem;
          background: #f8fbff;
          border-radius: 12px;
          border: 1px solid #e6f3ff;
        }

        .verification-info p {
          margin: 0 0 1rem 0;
          color: #666;
          font-weight: 500;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #333;
        }

        .icon {
          font-size: 1.1rem;
        }

        .verified {
          margin-left: auto;
          font-size: 1.2rem;
        }

        .otp-section {
          margin-bottom: 1.5rem;
        }

        .otp-input-wrapper {
          display: flex;
          gap: 0.5rem;
          align-items: flex-end;
        }

        .otp-input-wrapper input {
          flex: 1;
        }

        .resend-button {
          padding: 0.875rem 1rem;
          background: #f8fbff;
          color: #3399ff;
          border: 2px solid #e6f3ff;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .resend-button:hover:not(:disabled) {
          background: #e6f3ff;
          border-color: #3399ff;
        }

        .resend-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-button {
          width: 100%;
          padding: 0.875rem;
          background: linear-gradient(135deg, #3399ff, #0066cc);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(51, 153, 255, 0.3);
        }

        .submit-button:hover {
          background: linear-gradient(135deg, #0066cc, #004499);
          box-shadow: 0 6px 20px rgba(51, 153, 255, 0.4);
        }

        .back-to-login {
          text-align: center;
        }

        .back-link {
          color: #3399ff;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .back-link:hover {
          text-decoration: underline;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .forgot-password-page {
            padding: 1rem;
          }

          .forgot-form-wrapper {
            max-width: 100%;
            padding: 2rem 1.5rem;
            margin: 1rem 0;
          }

          .forgot-header h2 {
            font-size: 1.75rem;
          }

          .forgot-header p {
            font-size: 0.9rem;
          }

          .form-group input {
            font-size: 16px; /* Prevents zoom on iOS */
          }

          .otp-input-wrapper {
            flex-direction: column;
            gap: 1rem;
          }

          .resend-button {
            width: 100%;
            margin-top: 0.5rem;
          }

          .submit-button {
            font-size: 16px;
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .forgot-password-page {
            padding: 0.5rem;
          }

          .forgot-form-wrapper {
            padding: 1.5rem 1rem;
            border-radius: 8px;
          }

          .forgot-header h2 {
            font-size: 1.5rem;
          }

          .form-group label {
            font-size: 0.9rem;
          }

          .otp-input-wrapper {
            gap: 0.75rem;
          }

          .step-indicator {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 360px) {
          .forgot-form-wrapper {
            padding: 1rem 0.75rem;
          }

          .forgot-header h2 {
            font-size: 1.3rem;
          }

          .form-group {
            margin-bottom: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
