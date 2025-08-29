import React from 'react';
import Header from '../components/Header.jsx';
import HeroSection from '../components/HeroSection.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import Footer from '../components/Footer.jsx';
import BankFeatures from '../components/BankFeatures.jsx';
    import '../styles/get-started.css';

const GetStartedPage = () => {
    return (
        <div className="get-started-page">
            <Header />
            <div className="main-content">
                <HeroSection />
                <div style={{ height: 40 }} />
                <BankFeatures />
                <WhyChooseUs />
                <Footer />
            </div>
        </div>
    );
};

export default GetStartedPage;
