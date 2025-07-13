import React from 'react';
import GetStartedPage from './Pages/GetStartedPage';
import './Pages/get-started.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import Services from './Pages/Services.jsx';
import Contact from './Pages/Contact.jsx';
import Register from './Pages/Register.jsx';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<GetStartedPage />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
