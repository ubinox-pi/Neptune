import { useState, useEffect, useRef } from 'react';

const BankSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const sliderRef = useRef(null);

  // Premium banking images
  const slides = [
    {
      id: 1,
      title: "Digital Banking Revolution",
      description: "Seamless transactions with our next-gen mobile platform",
      image: "https://images.unsplash.com/photo-1601597111151-8b15e4e0a1e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      title: "Wealth Management",
      description: "Expert financial guidance for your future",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1511&q=80"
    },
    {
      id: 3,
      title: "Global Banking Network",
      description: "International services with local expertise",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80"
    }
  ];

  useEffect(() => {
    // Initial load animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    // Auto slide every 6 seconds
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [slides.length]);

  return (
    <div 
      className={`slider-container ${loaded ? 'loaded' : ''}`}
      ref={sliderRef}
    >
      <div 
        className="slider-track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id}
            className="slide"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content">
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-description">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pagination">
        {slides.map((_, index) => (
          <div 
            key={index}
            className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BankSlider;