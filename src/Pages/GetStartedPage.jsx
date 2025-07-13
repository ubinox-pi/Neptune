import React from 'react';
import Header from '../components/Header.jsx';
import HeroSection from '../components/HeroSection.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import Footer from '../components/Footer.jsx';
import BankFeatures from '../components/BankFeatures.jsx';

const GetStartedPage = () => {
    return (
        <div>
            <Header />
            <HeroSection />
            <div style={{ height: 40 }} />
            <BankFeatures />
            <WhyChooseUs />
            <Footer />
        </div>
    );
};

export default GetStartedPage;
