import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="choice"
        >
            <h3 className="choice-text">Why Choose Us?</h3>
            <div className="trust">
                <div className="card">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/4744/4744315.png"
                        alt="Security Icon"
                        className="icon"
                    />
                    <h4>Secure Transactions</h4>
                    <p>Your data and money are protected with top-grade encryption.</p>
                </div>
                <div className="card">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/3728/3728607.png"
                        alt="Support Icon"
                        className="icon"
                    />
                    <h4>24/7 Support</h4>
                    <p>Talk to real humans anytime you need us—day or night.</p>
                </div>
                <div className="card">
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/7118/7118029.png"
                        alt="Access Icon"
                        className="icon"
                    />
                    <h4>Easy Access</h4>
                    <p>Bank from anywhere, anytime using our seamless platform.</p>
                </div>
            </div>
        </motion.section>
    );
};

export default WhyChooseUs;
