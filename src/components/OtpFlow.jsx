import React, { useState } from 'react';
import { sessionManager } from '../utils/sessionManager';

const OtpFlow = () => {
  const [step, setStep] = useState('login'); // login, email-otp, phone-otp, complete
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Step 1: Login and start OTP flow
  const handleLogin = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // First login to establish session
      const loginResult = await sessionManager.login();

      if (loginResult.success) {
        setMessage('Login successful! Starting OTP verification...');

        // Start OTP flow
        const otpResult = await sessionManager.completeOtpFlow(email, phoneNumber);

        if (otpResult.success) {
          setMessage(otpResult.message);
          setStep('email-otp');
        } else {
          setError(otpResult.error);
        }
      } else {
        setError(loginResult.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify email OTP
  const handleEmailOtpVerification = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await sessionManager.verifyEmailOtp(email, emailOtp);

      if (result.success) {
        setMessage('Email verified! Sending phone OTP...');

        // Continue with phone OTP
        const phoneResult = await sessionManager.continueOtpFlowAfterEmail(phoneNumber);

        if (phoneResult.success) {
          setMessage(phoneResult.message);
          setStep('phone-otp');
        } else {
          setError(phoneResult.error);
        }
      } else {
        setError(result.message || 'Failed to verify email OTP');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Verify phone OTP
  const handlePhoneOtpVerification = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await sessionManager.verifyPhoneOtp(phoneNumber, phoneOtp);

      if (result.success) {
        setMessage('Phone verified! Registration complete!');
        setStep('complete');
      } else {
        setError(result.message || 'Failed to verify phone OTP');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Resend email OTP
  const resendEmailOtp = async () => {
    setLoading(true);
    const result = await sessionManager.sendOtpEmail(email);
    setMessage(result.message);
    setLoading(false);
  };

  // Resend phone OTP
  const resendPhoneOtp = async () => {
    setLoading(true);
    const result = await sessionManager.sendOtpPhone(phoneNumber);
    setMessage(result.message);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Account Verification</h2>

      {/* Display messages */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Step 1: Login and initiate OTP */}
      {step === 'login' && (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading || !email || !phoneNumber}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Start Verification'}
          </button>
        </div>
      )}

      {/* Step 2: Email OTP Verification */}
      {step === 'email-otp' && (
        <div>
          <p className="mb-4 text-sm text-gray-600">
            We've sent a verification code to {email}
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Verification Code
            </label>
            <input
              type="text"
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit code"
              maxLength={6}
              required
            />
          </div>

          <button
            onClick={handleEmailOtpVerification}
            disabled={loading || emailOtp.length !== 6}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 mb-2"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

          <button
            onClick={resendEmailOtp}
            disabled={loading}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Resend Code
          </button>
        </div>
      )}

      {/* Step 3: Phone OTP Verification */}
      {step === 'phone-otp' && (
        <div>
          <p className="mb-4 text-sm text-gray-600">
            We've sent a verification code to {phoneNumber}
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Verification Code
            </label>
            <input
              type="text"
              value={phoneOtp}
              onChange={(e) => setPhoneOtp(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit code"
              maxLength={6}
              required
            />
          </div>

          <button
            onClick={handlePhoneOtpVerification}
            disabled={loading || phoneOtp.length !== 6}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 mb-2"
          >
            {loading ? 'Verifying...' : 'Verify Phone'}
          </button>

          <button
            onClick={resendPhoneOtp}
            disabled={loading}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Resend Code
          </button>
        </div>
      )}

      {/* Step 4: Complete */}
      {step === 'complete' && (
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Complete!</h3>
          <p className="text-sm text-gray-600 mb-4">
            Your account has been successfully verified. You can now access all features.
          </p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default OtpFlow;
