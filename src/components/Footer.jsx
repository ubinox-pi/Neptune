import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="footer modern-footer"
        >
            <div className="footer-content">
                <div className="footer-logo">Neptune Bank</div>
                <div className="footer-links">
                    <li><a href="#privacy">Privacy Policy</a></li>
                    <li><a href="#terms">Terms of Service</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#careers">Careers</a></li>
                </div>
                <div className="footer-social-contact">
                    <div className="footer-contact">
                        <span>support@neptunebank.com</span>
                        <span>+1 (800) 123-4567</span>
                    </div>
                    <div className="footer-social">
                        <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/733/733547.png" alt="Facebook" /></a>
                        <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/733/733558.png" alt="Instagram" /></a>
                        <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/5968/5968830.png" alt="Twitter" /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Neptune Bank. All rights reserved.</p>
            </div>
        </motion.footer>
    );
};

export default Footer;
