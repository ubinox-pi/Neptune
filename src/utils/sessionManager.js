const resolveApiBase = () => {
  const envBase = import.meta.env.VITE_API_BASE_URL;
  if (import.meta.env.DEV) {
    
    if (envBase && envBase.startsWith('/')) return envBase;
    return '/api';
  }
  return envBase || '/api';
};

const API_BASE = resolveApiBase();

export const sessionManager = {
  login: async () => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: import.meta.env.VITE_LOGIN_USERNAME,
          password: import.meta.env.VITE_LOGIN_PASSWORD,
          mode: "session"
        }),
      });

      if (response.ok) {
        const data = await response.json();

        console.log('Server response:', data);

        let loginData;

        if (Array.isArray(data) && data.length > 0) {
          loginData = data[0];
        }
        else if (data && typeof data === 'object') {
          loginData = data;
        }
        else if (typeof data === 'string') {
          try {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed) && parsed.length > 0) {
              loginData = parsed[0];
            } else {
              loginData = parsed;
            }
          } catch {
            console.error('Failed to parse string response:', data);
            return { success: false, error: 'Invalid response format from server' };
          }
        }
        else {
          console.error('Unexpected response format:', data);
          return { success: false, error: 'Invalid response format from server' };
        }

        if (loginData && (loginData.code === 200 || loginData.status === 'success')) {
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
        const errorData = await response.json().catch(() => ({}));
        return { success: false, error: errorData.message || 'Login failed' };
      }
    } catch {
      return { success: false, error: 'Network error. Please try again.' };
    }
  },

  debugLogSessionCookie: () => {
    const cookies = document.cookie || '';
    if (cookies.includes('JSESSIONID=')) {
      const js = cookies.split(';').find(c => c.trim().startsWith('JSESSIONID='));
      console.log('JSESSIONID (not HttpOnly):', js);
    } else {
      console.log('JSESSIONID is HttpOnly or not visible to JS. Requests will still send it automatically.');
    }
  },

  sendOtpEmail: async (email) => {
    try {
      console.log('Sending OTP to email:', email);

      const response = await fetch(`${API_BASE}/messages/otp/send-otp-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
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

  
  verifyEmailOtp: async (email, otp) => {
    try {
      console.log('Verifying email OTP for:', email);

      const response = await fetch(`${API_BASE}/messages/otp/verify-email-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', 
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

  
  sendOtpPhone: async (phoneNumber) => {
    try {
      console.log('Sending OTP to phone:', phoneNumber);

      const response = await fetch(`${API_BASE}/messages/otp/send-otp-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', 
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

  
  verifyPhoneOtp: async (phoneNumber, otp) => {
    try {
      console.log('Verifying phone OTP for:', phoneNumber);

      const response = await fetch(`${API_BASE}/messages/otp/verify-phone-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', 
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

  
  completeOtpFlow: async (email) => {
    try {
      console.log('Starting complete OTP flow...');
      const results = {};

      
      console.log('Step 1: Sending OTP to email...');
      results.emailSent = await sessionManager.sendOtpEmail(email);
      if (!results.emailSent.success) {
        return { success: false, error: 'Failed to send email OTP', results };
      }

      
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

  
  continueOtpFlowAfterEmail: async (phoneNumber) => {
    try {
      console.log('Continuing OTP flow with phone verification...');
      const results = {};

      
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

  
  ensureAuthenticated: async () => {
    return true;
  },

  
  makeAuthenticatedRequest: async (path, options = {}) => {
    const BASE_URL = API_BASE;

    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    const headers = { ...defaultHeaders, ...(options.headers || {}) };

    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    return response;
  },

  
  makeMultipartRequest: async (path, formData, headers = {}) => {
    const BASE_URL = API_BASE;
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      body: formData,
      headers: { ...headers }, 
      credentials: 'include',
    });
    return response;
  },

  
  isLoggedIn: () => {
    const userInfo = sessionStorage.getItem('userInfo');
    return userInfo !== null;
  },

  
  getUserInfo: () => {
    const userInfo = sessionStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  },

  
  logout: () => {
    sessionStorage.removeItem('userInfo');
    
    console.log('User logged out');
  },

  
  validateSession: async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/validate`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) return { success: false, status: res.status };
      const data = await res.json().catch(() => ({}));
      return { success: true, data };
    } catch {
      return { success: false, error: 'Network error' };
    }
  },
};
