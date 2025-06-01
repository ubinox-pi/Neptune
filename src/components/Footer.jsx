import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="footer"
        >
            <div className="footer-content">
                <h3 className="footer-logo">Neptune Bank</h3>
                <ul className="footer-links">
                    <li><a href="#privacy">Privacy Policy</a></li>
                    <li><a href="#terms">Terms of Service</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
                <div className="social-icons">
                    <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/733/733547.png" alt="Facebook" /></a>
                    <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/733/733558.png" alt="Instagram" /></a>
                    <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/5968/5968830.png" alt="X (Twitter)" /></a>
                </div>
            </div>
            <p className="copyright">
                &copy; {new Date().getFullYear()} Neptune Bank. All rights reserved.
            </p>
        </motion.footer>
    );
};

export default Footer;