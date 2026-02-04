import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import Navigation from './components/Navigation';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import About from './sections/About';
import Contact from './sections/Contact';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if user has already unlocked (for development convenience)
    const hasUnlocked = sessionStorage.getItem('portfolio-unlocked');
    if (hasUnlocked === 'true') {
      setIsUnlocked(true);
      setShowContent(true);
    }
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem('portfolio-unlocked', 'true');
    setIsUnlocked(true);
    
    // Small delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  // Initialize smooth scroll and animations after unlock
  useEffect(() => {
    if (!showContent) return;

    // Refresh ScrollTrigger after content is visible
    ScrollTrigger.refresh();

    // Entrance animation for main content
    gsap.fromTo('.main-content',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
  }, [showContent]);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero / Signal Tuner - Always rendered but hidden after unlock */}
      {!isUnlocked && <Hero onUnlock={handleUnlock} />}

      {/* Main Content - Shown after unlock */}
      {showContent && (
        <div className="main-content">
          {/* Global Scanline Overlay */}
          <div className="scanlines" />
          
          {/* Navigation */}
          <Navigation />

          {/* Main Sections */}
          <main>
            <Projects />
            <div className="section-divider" />
            <Certifications />
            <div className="section-divider" />
            <About />
            <div className="section-divider" />
            <Contact />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
