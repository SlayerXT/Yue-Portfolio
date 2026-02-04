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
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    // 检查 URL 参数，如果 ?skip=true 则直接显示内容
    const urlParams = new URLSearchParams(window.location.search);
    const shouldSkip = urlParams.get('skip') === 'true';
    
    // 检查本地存储
    const hasUnlocked = sessionStorage.getItem('portfolio-unlocked');
    
    if (shouldSkip || hasUnlocked === 'true') {
      setSkipAnimation(true);
      setIsUnlocked(true);
      setShowContent(true);
      // 清除 URL 参数
      if (shouldSkip) {
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem('portfolio-unlocked', 'true');
    setIsUnlocked(true);
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  // 跳过动画直接进入
  const handleSkip = () => {
    setSkipAnimation(true);
    setIsUnlocked(true);
    setShowContent(true);
    sessionStorage.setItem('portfolio-unlocked', 'true');
  };

  useEffect(() => {
    if (!showContent) return;
    ScrollTrigger.refresh();
    gsap.fromTo('.main-content',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
  }, [showContent]);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {!isUnlocked && <Hero onUnlock={handleUnlock} onSkip={handleSkip} />}

      {showContent && (
        <div className="main-content">
          <div className="scanlines" />
          <Navigation />
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
