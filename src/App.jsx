import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Global Styles
import './styles/global.css';

// Import Layout Overlays
import NoiseOverlay from './components/NoiseOverlay/NoiseOverlay';
import CursorFollower from './components/CursorFollower/CursorFollower';

// Import Layout and Sections statically for instant rendering
import Navbar from './components/Navbar/Navbar';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Skills from './sections/Skills/Skills';
import Projects from './sections/Projects/Projects';
import Contact from './sections/Contact/Contact';

// Register GSAP ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

function App() {

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


      {/* Static CSS-only Glow Backdrop */}
      <div className="three-background-canvas" aria-hidden="true">
        <div className="bg-glow-blob blob-1" />
        <div className="bg-glow-blob blob-2" />
        <div className="bg-glow-blob blob-3" />
      </div>

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
