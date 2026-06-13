import { useEffect, useState, lazy, Suspense, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Global Styles
import './styles/global.css';
import './components/ThreeCanvas/ThreeCanvas.css';

// Import Layout Overlays (keep lightweight overlays static)
import NoiseOverlay from './components/NoiseOverlay/NoiseOverlay';
import CursorFollower from './components/CursorFollower/CursorFollower';
import SplashScreen from './components/SplashScreen/SplashScreen';

// Import Sections (keep Hero and Navbar static for instant First Contentful Paint)
import Navbar from './components/Navbar/Navbar';
import Hero from './sections/Hero/Hero';

// Lazy load heavy canvas and below-the-fold sections to defer their JS chunks
const ThreeCanvas = lazy(() => import('./components/ThreeCanvas/ThreeCanvas'));
const About = lazy(() => import('./sections/About/About'));
const Skills = lazy(() => import('./sections/Skills/Skills'));
const Projects = lazy(() => import('./sections/Projects/Projects'));
const Contact = lazy(() => import('./sections/Contact/Contact'));

// Register GSAP ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

// Synchronous Network Check to determine slow connections (saves 510KB+ JS on slow networks)
const IS_SLOW_CONNECTION = (() => {
  if (typeof window === 'undefined') return false;
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    if (conn.saveData) return true;
    const type = conn.effectiveType;
    return type === 'slow-2g' || type === '2g' || type === '3g';
  }
  return false;
})();

// Dynamic scroll-driven component loader to prevent loading below-the-fold chunks prematurely
const LazySection = ({ children, height = '100vh' }) => {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' } // Load 300px before the user scrolls to it
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: isMounted ? 'auto' : height }}>
      {isMounted ? children : null}
    </div>
  );
};

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

    // 4. Preload heavy chunks dynamically in the background during the splash screen's idle time (on fast connections)
    let preloadTimeout;
    if (!IS_SLOW_CONNECTION) {
      preloadTimeout = setTimeout(() => {
        import('./components/ThreeCanvas/ThreeCanvas');
        import('./sections/About/About');
        import('./sections/Skills/Skills');
        import('./sections/Projects/Projects');
        import('./sections/Contact/Contact');
      }, 1500);
    }

    // Cleanups on component unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      if (preloadTimeout) clearTimeout(preloadTimeout);
    };
  }, []);

  return (
    <div className="portfolio-app-root">
      {/* Animated Splash Screen — shown on every page load */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      {/* Background & Overlays (ThreeCanvas runs deferred background loading, skipped on slow connection) */}
      {IS_SLOW_CONNECTION ? (
        <div className="three-background-canvas" aria-hidden="true">
          <div className="bg-glow-blob blob-1" />
          <div className="bg-glow-blob blob-2" />
          <div className="bg-glow-blob blob-3" />
        </div>
      ) : (
        <Suspense fallback={
          <div className="three-background-canvas" aria-hidden="true">
            <div className="bg-glow-blob blob-1" />
            <div className="bg-glow-blob blob-2" />
            <div className="bg-glow-blob blob-3" />
          </div>
        }>
          <ThreeCanvas />
        </Suspense>
      )}
      <NoiseOverlay />
      <CursorFollower />

      {/* Main Structural Layout */}
      <Navbar />
      <main>
        <Hero />
        
        <LazySection height="100vh">
          <Suspense fallback={<div className="section-loader" style={{ minHeight: '100vh' }} />}>
            <About />
          </Suspense>
        </LazySection>
        
        <LazySection height="100vh">
          <Suspense fallback={<div className="section-loader" style={{ minHeight: '100vh' }} />}>
            <Skills />
          </Suspense>
        </LazySection>
        
        <LazySection height="100vh">
          <Suspense fallback={<div className="section-loader" style={{ minHeight: '100vh' }} />}>
            <Projects />
          </Suspense>
        </LazySection>
        
        <LazySection height="100vh">
          <Suspense fallback={<div className="section-loader" style={{ minHeight: '100vh' }} />}>
            <Contact />
          </Suspense>
        </LazySection>
      </main>
    </div>
  );
}

export default App;
