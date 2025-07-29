// Session management utility
export const sessionManager = {
  // Make login request and store session
  login: async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({
          username: import.meta.env.VITE_LOGIN_USERNAME,
          password: import.meta.env.VITE_LOGIN_PASSWORD,
          mode: "session"
        }),
      });

      if (response.ok) {
        const data = await response.json();

        console.log('Server response:', data); // Debug log to see actual response format

        // Handle different possible response formats
        let loginData;

        // Check if it's an array with objects
        if (Array.isArray(data) && data.length > 0) {
          loginData = data[0];
        }
        // Check if it's a direct object
        else if (data && typeof data === 'object') {
          loginData = data;
        }
        // Handle string response that looks like: "[{role=ADMIN, code=200, ...}]"
        else if (typeof data === 'string') {
          try {
            // Try to parse if it's a JSON string
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed) && parsed.length > 0) {
              loginData = parsed[0];
            } else {
              loginData = parsed;
            }
          } catch (e) {
            console.error('Failed to parse string response:', data);
            return { success: false, error: 'Invalid response format from server' };
          }
        }
        else {
          console.error('Unexpected response format:', data);
          return { success: false, error: 'Invalid response format from server' };
        }

        // Check if login was successful
        if (loginData && (loginData.code === 200 || loginData.status === 'success')) {
          // Store user info in sessionStorage for later use
          sessionStorage.setItem('userInfo', JSON.stringify({
            username: loginData.username,
            role: loginData.role,
            message: loginData.message
          }));

          return {
            success: true,
            data: loginData,
            message: loginData.message
          };
        } else {
          return {
            success: false,
            error: loginData?.message || 'Login failed'
          };
        }
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  // Test session immediately after login
  testSessionAfterLogin: async () => {
    try {
      console.log('Testing session immediately after login...');

      // First, let's try to check what cookies we have
      console.log('Current cookies:', document.cookie);

      // Try to make a simple authenticated request - let's use the OTP endpoint since we know that needs session
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/messages/otp/send-otp-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ phoneNumber: '1234567890' }), // Test with dummy number
      });

      console.log('Session test response status:', response.status);
      const data = await response.text();
      console.log('Session test response data:', data);

      return {
        success: response.ok,
        status: response.status,
        data: data
      };
    } catch (error) {
      console.error('Session test error:', error);
      return { success: false, error: 'Session test failed' };
    }
  },

  // OTP Flow Methods

  // Step 1: Send OTP to email
  sendOtpEmail: async (email) => {
    try {
      console.log('Sending OTP to email:', email);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/messages/otp/send-otp-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Use session cookie
        body: JSON.stringify({ email }),
      });

      const data = await response.text();
      console.log('Send OTP Email response:', data);

      return {
        success: response.ok,
        status: response.status,
        data: data,
        message: response.ok ? 'OTP sent to email successfully' : 'Failed to send OTP to email'
      };
    } catch (error) {
      console.error('Send OTP Email error:', error);
      return { success: false, error: 'Network error while sending OTP to email' };
    }
  },

  // Step 2: Verify email OTP
  verifyEmailOtp: async (email, otp) => {
    try {
      console.log('Verifying email OTP for:', email);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/messages/otp/verify-email-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Use session cookie
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.text();
      console.log('Verify Email OTP response:', data);

      return {
        success: response.ok,
        status: response.status,
        data: data,
        message: response.ok ? 'Email OTP verified successfully' : 'Failed to verify email OTP'
      };
    } catch (error) {
      console.error('Verify Email OTP error:', error);
      return { success: false, error: 'Network error while verifying email OTP' };
    }
  },

  // Step 3: Send OTP to phone
  sendOtpPhone: async (phoneNumber) => {
    try {
      console.log('Sending OTP to phone:', phoneNumber);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/messages/otp/send-otp-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Use session cookie
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.text();
      console.log('Send OTP Phone response:', data);

      return {
        success: response.ok,
        status: response.status,
        data: data,
        message: response.ok ? 'OTP sent to phone successfully' : 'Failed to send OTP to phone'
      };
    } catch (error) {
      console.error('Send OTP Phone error:', error);
      return { success: false, error: 'Network error while sending OTP to phone' };
    }
  },

  // Step 4: Verify phone OTP
  verifyPhoneOtp: async (phoneNumber, otp) => {
    try {
      console.log('Verifying phone OTP for:', phoneNumber);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/messages/otp/verify-phone-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Use session cookie
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await response.text();
      console.log('Verify Phone OTP response:', data);

      return {
        success: response.ok,
        status: response.status,
        data: data,
        message: response.ok ? 'Phone OTP verified successfully' : 'Failed to verify phone OTP'
      };
    } catch (error) {
      console.error('Verify Phone OTP error:', error);
      return { success: false, error: 'Network error while verifying phone OTP' };
    }
  },

  // Complete OTP Flow - orchestrates the entire process
  completeOtpFlow: async (email, phoneNumber) => {
    try {
      console.log('Starting complete OTP flow...');
      const results = {};

      // Step 1: Send OTP to email
      console.log('Step 1: Sending OTP to email...');
      results.emailSent = await sessionManager.sendOtpEmail(email);
      if (!results.emailSent.success) {
        return { success: false, error: 'Failed to send email OTP', results };
      }

      // Wait for user input for email OTP (this would be handled by UI)
      console.log('Email OTP sent successfully. Waiting for user verification...');

      return {
        success: true,
        message: 'OTP flow initiated. Please verify email OTP first.',
        nextStep: 'verify-email-otp',
        results
      };
    } catch (error) {
      console.error('Complete OTP Flow error:', error);
      return { success: false, error: 'Failed to complete OTP flow' };
    }
  },

  // Helper method to continue OTP flow after email verification
  continueOtpFlowAfterEmail: async (phoneNumber) => {
    try {
      console.log('Continuing OTP flow with phone verification...');
      const results = {};

      // Step 3: Send OTP to phone
      console.log('Step 3: Sending OTP to phone...');
      results.phoneSent = await sessionManager.sendOtpPhone(phoneNumber);
      if (!results.phoneSent.success) {
        return { success: false, error: 'Failed to send phone OTP', results };
      }

      console.log('Phone OTP sent successfully. Waiting for user verification...');

      return {
        success: true,
        message: 'Phone OTP sent successfully. Please verify phone OTP to complete registration.',
        nextStep: 'verify-phone-otp',
        results
      };
    } catch (error) {
      console.error('Continue OTP Flow error:', error);
      return { success: false, error: 'Failed to continue OTP flow' };
    }
  },

  // Check if user is logged in (has valid session)
  isLoggedIn: () => {
    const userInfo = sessionStorage.getItem('userInfo');
    return userInfo !== null;
  },

  // Get stored user information
  getUserInfo: () => {
    const userInfo = sessionStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  },

  // Logout - clear session data
  logout: () => {
    sessionStorage.removeItem('userInfo');
    // Note: Server-side session will expire naturally or can be cleared via API call
    console.log('User logged out');
  }
};
