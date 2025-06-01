<<<<<<< HEAD
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="header">Neptune Bank</header>
      <main className="container">
        <h1>Welcome to Neptune Bank</h1>
        <p>Your trusted partner in banking solutions.</p>
        <button className="explore-button">Explore More</button>
      </main>
      <footer className="footer">&copy; 2025 Neptune Bank. All rights reserved.</footer>
    </div>
  );
}

export default App;
=======
import React from 'react';
import GetStartedPage from './Pages/GetStartedPage';
import './Pages/get-started.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import Services from './Pages/Services.jsx';
import Contact from './Pages/Contact.jsx';
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<GetStartedPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
>>>>>>> 742f2f9 (initial commit by Ashish singh)
