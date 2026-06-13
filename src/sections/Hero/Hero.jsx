import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import { FaReact, FaNodeJs, FaHtml5, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiMongodb, SiThreedotjs, SiRedux } from 'react-icons/si';
import Magnetic from '../../components/Magnetic/Magnetic';
import './Hero.css';

const professions = [
  'Building with MERN Stack',
  'Creating AI Automations with n8n',
  'Designing Modern Web Experiences',
  'Crafting Interactive Digital Products',
];

const nameString = "ABHINAV PANDEY";

const marqueeItems = [
  'FULL-STACK DEVELOPER', 'n8n AUTOMATION EXPERT', 'CREATIVE ENGINEERING', 'THREE.JS / WEBGL', 'API INTEGRATIONS', 'UI/UX ARCHITECTURE', 'CLEAN CODE'
];

const techCards = [
  { name: 'React.js', icon: FaReact, color: '#61dafb', category: 'Frontend', id: '01' },
  { name: 'Node.js', icon: FaNodeJs, color: '#68a063', category: 'Backend', id: '02' },
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', category: 'Language', id: '03' },
  { name: 'Three.js', icon: SiThreedotjs, color: '#00f2fe', category: '3D/WebGL', id: '04' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47a248', category: 'Database', id: '05' },
  { name: 'Redux', icon: SiRedux, color: '#764abc', category: 'State', id: '06' },
];

const getRandomShuffle = (currentStack) => {
  const currentTop = currentStack[0];
  let newStack = [...currentStack];
  do {
    // Fisher-Yates shuffle
    for (let i = newStack.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newStack[i];
      newStack[i] = newStack[j];
      newStack[j] = temp;
    }
  } while (newStack[0] === currentTop); // Make sure the top card always changes
  return newStack;
};

const cardVariants = {
  active: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    opacity: 1,
    zIndex: 10,
    transition: {
      type: 'spring',
      stiffness: 110, // Slower, smoother floating spring
      damping: 19,
    }
  },
  stack1: {
    x: 0,
    y: 24, // Proportionate stack offset for larger card size
    scale: 0.94,
    rotate: -3,
    opacity: 0.85,
    zIndex: 9,
    transition: {
      type: 'spring',
      stiffness: 110,
      damping: 19,
    }
  },
  stack2: {
    x: 0,
    y: 48,
    scale: 0.88,
    rotate: 3,
    opacity: 0.7,
    zIndex: 8,
    transition: {
      type: 'spring',
      stiffness: 110,
      damping: 19,
    }
  },
  hidden: {
    x: 0,
    y: 72,
    scale: 0.82,
    rotate: 0,
    opacity: 0,
    zIndex: 1,
    transition: {
      type: 'spring',
      stiffness: 110,
      damping: 19,
    }
  },
  exiting: {
    x: [0, 340, 0], // Extended slide distance to clear 400px width card
    y: [0, -20, 72],
    scale: [1, 0.94, 0.82],
    rotate: [0, 14, 0],
    opacity: [1, 0.4, 0],
    zIndex: [12, 12, 1],
    transition: {
      duration: 1.35, // Slowed down from 0.75s for high-end realistic shuffle speed
      times: [0, 0.45, 1],
      ease: [0.25, 1, 0.5, 1],
    }
  },
  entering: {
    x: [-340, 0], // Extended slide distance
    y: [20, 0],
    scale: [0.82, 1],
    rotate: [-14, 0],
    opacity: [0, 1],
    zIndex: 10,
    transition: {
      duration: 1.35, // Slower crossover slide
      times: [0, 1],
      ease: [0.25, 1, 0.5, 1],
    }
  }
};

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [stack, setStack] = useState([0, 1, 2, 3, 4, 5]);
  const [exitingCardId, setExitingCardId] = useState(null);
  const [enteringCardId, setEnteringCardId] = useState(null);
  const heroRef = useRef(null);
  const deckRef = useRef(null);
  const stackRef = useRef(stack);

  // Track mouse coordinates dynamically in a ref to avoid React state triggers
  const mouseOffsetRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    stackRef.current = stack;
  }, [stack]);

  useEffect(() => {
    // 1. Slider timer
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % professions.length);
    }, 3000);

    // 2. Card shuffle interval variable
    let shuffleInterval = null;
    let isIntersecting = true;

    // 3. Animation frame parameters
    let animationFrameId = null;

    // 4. Intersection Observer to sleep animation loop and shuffle interval when Hero section is out of viewport (0% CPU idle)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          cancelAnimationFrame(animationFrameId);
          animate();

          // Initialize shuffle interval only when intersecting
          if (!shuffleInterval) {
            shuffleInterval = setInterval(() => {
              const currentTop = stackRef.current[0];
              const nextStack = getRandomShuffle(stackRef.current);
              const nextTop = nextStack[0];

              // Phase 1: Slide out the current top card
              setExitingCardId(currentTop);

              // Phase 2: After 350ms, update stack order and trigger slide in of new top card
              setTimeout(() => {
                setEnteringCardId(nextTop);
                setStack(nextStack);
              }, 350);

              // Phase 3: After 1750ms (350ms delay + 1350ms duration + 50ms buffer), reset tracking states
              setTimeout(() => {
                setExitingCardId(null);
                setEnteringCardId(null);
              }, 1750);
            }, 4500); // Shuffles every 4.5 seconds for a slower, more readable and realistic pace
          }
        } else {
          cancelAnimationFrame(animationFrameId);
          if (shuffleInterval) {
            clearInterval(shuffleInterval);
            shuffleInterval = null;
          }
        }
      },
      { threshold: 0.05 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    const animate = () => {
      if (!isIntersecting) return;

      // Lerp mouse offsets for smooth trailing follow physics
      const offsets = mouseOffsetRef.current;
      offsets.x += (offsets.targetX - offsets.x) * 0.08;
      offsets.y += (offsets.targetY - offsets.y) * 0.08;

      if (deckRef.current) {
        // Apply smooth 3D tilt to the entire deck container (maximum tilt range 20deg)
        deckRef.current.style.transform = `perspective(1000px) rotateX(${offsets.x}deg) rotateY(${offsets.y}deg)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    return () => {
      clearInterval(timer);
      if (shuffleInterval) clearInterval(shuffleInterval);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  // Sync cursor movements to rotate the 3D tech deck
  const handleMouseMove = (e) => {
    if (!deckRef.current) return;
    const { clientX, clientY } = e;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Set mouse targets (adds up to 20deg range dynamically)
    mouseOffsetRef.current.targetX = (clientY / h - 0.5) * -20;
    mouseOffsetRef.current.targetY = (clientX / w - 0.5) * 20;
  };

  const handleMouseLeave = () => {
    // Smoothly restore offset back to 0 when cursor exits the hero section
    mouseOffsetRef.current.targetX = 0;
    mouseOffsetRef.current.targetY = 0;
  };

  // Split-text animation configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      filter: "blur(12px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 90
      }
    },
  };

  const handleScrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} id="home" className="hero-section" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* SVG Animated Mesh Lines in background */}
      <div className="hero-svg-bg" aria-hidden="true">
        <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M-100,200 C300,50 600,450 1000,100 C1200,-50 1400,150 1600,50"
            stroke="rgba(124, 58, 237, 0.08)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M-55,400 C400,250 500,600 900,300 C1100,150 1300,450 1500,200"
            stroke="rgba(0, 242, 254, 0.08)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </div>

      <div className="container hero-container">
        {/* Left Column: Typography Block */}
        <div className="hero-text-block">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-intro-tag"
          >

          </motion.div>

          {/* Large Name Split Reveal */}
          <motion.h1
            className="hero-name"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {nameString.split("").map((letter, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className={letter === " " ? "space" : `letter ${i < 7 ? 'solid' : 'outline'}`}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Profession Slider */}
          <div className="hero-profession-container">
            <span className="profession-static">I am a </span>
            <div className="profession-slider-wrapper">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 25, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -25, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="profession-dynamic gradient-text-alt"
                >
                  {professions[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Subtext description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            className="hero-subtitle"
          >
            Architecting state-of-the-art full-stack applications with modular cleanliness,
            immersive and fluid performance to craft remarkable web spaces.
          </motion.p>

          {/* CTA Buttons with Magnetic effects */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            className="hero-ctas"
          >
            <Magnetic strength={0.25}>
              <button className="btn-primary" onClick={() => handleScrollToAbout()}>
                Explore Work
              </button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <button className="btn-secondary" onClick={() => handleScrollToAbout()}>
                Let's Connect
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Column: Dynamic 3D Tech Card Shuffling Deck */}
        <div className="hero-cube-block">
          <div className="deck-viewport">
            <div
              ref={deckRef}
              className="deck-box"
              style={{ willChange: 'transform' }}
            >
              {techCards.map((card, idx) => {
                const position = stack.indexOf(idx);
                const isExiting = exitingCardId === idx;
                const isEntering = enteringCardId === idx;

                let variantName = 'hidden';
                if (isExiting) {
                  variantName = 'exiting';
                } else if (isEntering) {
                  variantName = 'entering';
                } else if (position === 0) {
                  variantName = 'active';
                } else if (position === 1) {
                  variantName = 'stack1';
                } else if (position === 2) {
                  variantName = 'stack2';
                }

                const IconComponent = card.icon;

                return (
                  <motion.div
                    key={card.name}
                    variants={cardVariants}
                    animate={variantName}
                    initial="hidden"
                    className="tech-card"
                    style={{
                      '--card-glow': card.color,
                    }}
                  >
                    {/* Matrix grid/dots backdrop */}
                    <div className="card-dots-bg" />

                    {/* Corner terminal crosshairs */}
                    <div className="card-corner corner-tl" />
                    <div className="card-corner corner-tr" />
                    <div className="card-corner corner-bl" />
                    <div className="card-corner corner-br" />

                    {/* Reflective gloss glare overlay */}
                    <div className="card-glare" />

                    <div className="card-hud-header font-title">
                      <span className="hud-category">{card.category}</span>
                      <span className="hud-id">{card.id} / 06</span>
                    </div>
                    <div className="card-content">
                      <IconComponent className="card-icon" style={{ color: card.color }} />
                      <span className="card-title font-title">{card.name}</span>
                    </div>
                    <div className="card-hud-footer font-title">
                      <span className="hud-status">// ACTIVE NODE</span>
                      <span className="hud-sig">SYS.OK_</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          {/* Ambient floor shadow */}
          <div className="deck-shadow" />
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="scroll-down-indicator"
        onClick={handleScrollToAbout}
      >
        <Magnetic strength={0.3}>
          <div className="scroll-btn">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="scroll-icon-wrapper"
            >
              <HiArrowDown size={18} />
            </motion.div>
          </div>
        </Magnetic>
        <span className="scroll-text">SCROLL TO BEGIN</span>
      </motion.div>
      {/* Infinite scrolling divider marquee */}
      <div className="hero-marquee-wrapper">
        <div className="marquee-content">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span key={idx} className="marquee-item font-title">
              {item} <span className="marquee-dot">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
