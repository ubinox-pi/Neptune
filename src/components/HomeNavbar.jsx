import React from 'react';
import { motion } from 'framer-motion';

const navItems = ['Home', 'About', 'Services', 'Contact'];

const headerAnimation = {
  initial: { height: '100vh' },
  animate: { height: '70px' },
  transition: { duration: 2, ease: 'easeInOut' },
};

const logoAnimation = {
  initial: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    x: '-50%',
    y: '-50%',
    opacity: 1,
  },
  animate: {
    position: 'absolute',
    top: 5,
    left: 0,
    x: 0,
    y: 0,
    opacity: 1,
  },
  transition: { duration: 1, ease: 'easeInOut', delay: 0.2 },
};

const linksAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 1.1, duration: 0.6 },
};

const HomeNavbar = () => {
  return (
    <motion.header className="navbar" {...headerAnimation}>
      <div className="navbar__inner">
        <motion.h1 className="navbar__logo" {...logoAnimation}>
          Neptune Bank
        </motion.h1>

        <motion.ul className="navbar__links" {...linksAnimation}>
          {navItems.map((item, index) => (
            <motion.li key={index} whileHover={{ scale: 1.05, color: '#00bcd4' }}>
              <a href={`#${item.toLowerCase()}`} aria-label={item}>
                {item}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.header>
  );
};

export default HomeNavbar;