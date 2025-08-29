import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import logo from "../assets/Neptune Bank.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login attempt:", { ...formData });
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="login-form-wrapper"
        >
          <div className="login-logo">
            <img src={logo} alt="Neptune Bank Logo" />
          </div>

          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your Neptune Bank account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={errors.email ? "error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={errors.password ? "error" : ""}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-options">
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <Motion.button
              type="submit"
              className="login-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </Motion.button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="register-link">
            <p>
              Don't have an account{" "}
              <Link to="/register" className="register-button">
                Create New Account
              </Link>
            </p>
          </div>
        </Motion.div>
      </div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .login-page {
          min-height: 100vh;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          font-family: "Roboto", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
        }

        .login-container {
          width: 100%;
          max-width: 400px;
        }

        .login-form-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          padding: 1.8rem;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .login-logo {
          text-align: center;
          margin-bottom: 1.2rem;
        }

        .login-logo img {
          height: 50px;
          width: auto;
        }

        .login-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .login-header h2 {
          font-size: 1.7rem;
          font-weight: 700;
          color: #003366;
          margin: 0 0 0.3rem 0;
        }

        .login-header p {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
        }

        .login-type-toggle {
          display: flex;
          background: #f0f3f7;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 1.5rem;
          gap: 4px;
        }

        .toggle-button {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          background: transparent;
          color: #666;
        }

        .toggle-button.active {
          background: white;
          color: #004080;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .toggle-button:hover:not(.active) {
          background: rgba(255, 255, 255, 0.5);
        }

        .login-form {
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.2rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.4rem;
          font-weight: 600;
          color: #004080;
          font-size: 0.9rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e1e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background-color: #fafbfc;
          box-sizing: border-box;
        }

        .form-group input:focus {
          border-color: #667eea;
          outline: none;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .remember-me {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 0.85rem;
          color: #666;
          position: relative;
        }

        .remember-me input[type="checkbox"] {
          width: auto;
          margin-right: 0.4rem;
          transform: scale(1.1);
        }

        .forgot-password {
          color: #667eea;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .forgot-password:hover {
          text-decoration: underline;
        }

        .login-button {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .login-button:hover {
          background: linear-gradient(135deg, #764ba2, #667eea);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          transform: translateY(-2px);
        }

        .divider {
          text-align: center;
          margin: 1.5rem 0 1.2rem 0;
          position: relative;
        }

        .divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #e1e8f0;
        }

        .divider span {
          background: white;
          color: #999;
          padding: 0 1rem;
          font-size: 0.9rem;
        }

        .social-login {
          margin-bottom: 1.2rem;
        }

        .social-button {
          width: 100%;
          padding: 0.75rem;
          background: white;
          color: #333;
          border: 2px solid #e1e8f0;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .social-button:hover {
          border-color: #667eea;
          background: #f8f9ff;
        }

        .social-icon {
          font-size: 1.2rem;
        }

        .register-link {
          text-align: center;
        }

        .register-link p {
          color: #666;
          margin: 0;
        }

        .register-button {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          margin-left: 0.25rem;
        }

        .register-button:hover {
          text-decoration: underline;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .login-page {
            padding: 1rem;
            min-height: 100vh;
          }

          .login-form-wrapper {
            max-width: 100%;
            padding: 2rem 1.5rem;
            margin: 1rem 0;
          }

          .login-header h2 {
            font-size: 1.75rem;
          }

          .login-header p {
            font-size: 0.9rem;
          }

          .toggle-button {
            font-size: 0.85rem;
            padding: 0.625rem 0.75rem;
          }

          .form-group input {
            font-size: 16px; /* Prevents zoom on iOS */
          }

          .form-options {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .login-button,
          .social-button {
            font-size: 16px; /* Better touch target */
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .login-page {
            padding: 0.5rem;
          }

          .login-form-wrapper {
            padding: 1.5rem 1rem;
            border-radius: 8px;
          }

          .login-logo img {
            height: 50px;
          }

          .login-header h2 {
            font-size: 1.5rem;
          }

          .toggle-button {
            font-size: 0.8rem;
            padding: 0.5rem 0.5rem;
          }

          .form-group label {
            font-size: 0.9rem;
          }

          .password-toggle {
            padding: 0.5rem;
          }

          .remember-me span {
            font-size: 0.85rem;
          }

          .forgot-password {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 360px) {
          .login-form-wrapper {
            padding: 1rem 0.75rem;
          }

          .login-header h2 {
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

export default Login;
