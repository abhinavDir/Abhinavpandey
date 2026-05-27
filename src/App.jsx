import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Global Styles
import './styles/global.css';

// Import Layout Overlays
import NoiseOverlay from './components/NoiseOverlay/NoiseOverlay';
import CursorFollower from './components/CursorFollower/CursorFollower';
import ThreeCanvas from './components/ThreeCanvas/ThreeCanvas';
import SplashScreen from './components/SplashScreen/SplashScreen';

// Import Sections
import Navbar from './components/Navbar/Navbar';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Skills from './sections/Skills/Skills';
import Projects from './sections/Projects/Projects';
import Contact from './sections/Contact/Contact';


// Register GSAP ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function for cinematic feeling
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // 2. Synchronize Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Connect GSAP ticker animation loops directly with Lenis updates
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Cleanups on component unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return (
    <div className="portfolio-app-root">
      {/* Animated Splash Screen — shown on every page load */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      {/* Background & Overlays */}
      <ThreeCanvas />
      <NoiseOverlay />
      <CursorFollower />

      {/* Main Structural Layout */}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
