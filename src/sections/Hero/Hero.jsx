import React, { useState, useEffect } from 'react';
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

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [cubeRotation, setCubeRotation] = useState({ x: -15, y: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % professions.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Sync cursor movements to rotate the 3D tech cube
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Rotate cube within soft boundaries to reveal different faces
    const targetX = (clientY / h - 0.5) * -50 - 15;
    const targetY = (clientX / w - 0.5) * 90 + 30;

    setCubeRotation({ x: targetX, y: targetY });
  };

  const handleMouseLeave = () => {
    setCubeRotation({ x: -15, y: 30 }); // reset to default premium perspective angle
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
    <section id="home" className="hero-section" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
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
            immersive 3D graphics, and fluid performance to craft remarkable web spaces.
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

        {/* Right Column: Dynamic 3D Tech Cube Block */}
        <div className="hero-cube-block">
          <div className="cube-viewport">
            <div
              className="cube-box"
              style={{
                transform: `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`,
              }}
            >
              {/* Face 1: React (Front) */}
              <div className="cube-face face-front">
                <div className="face-content" style={{ '--face-glow': '#61dafb' }}>
                  <FaReact className="face-icon" style={{ color: '#61dafb' }} />
                  <span className="face-title font-title">React.js</span>
                </div>
              </div>

              {/* Face 2: Node.js (Back) */}
              <div className="cube-face face-back">
                <div className="face-content" style={{ '--face-glow': '#68a063' }}>
                  <FaNodeJs className="face-icon" style={{ color: '#68a063' }} />
                  <span className="face-title font-title">Node.js</span>
                </div>
              </div>

              {/* Face 3: JavaScript (Top) */}
              <div className="cube-face face-top">
                <div className="face-content" style={{ '--face-glow': '#f7df1e' }}>
                  <SiJavascript className="face-icon" style={{ color: '#f7df1e' }} />
                  <span className="face-title font-title">JavaScript</span>
                </div>
              </div>

              {/* Face 4: Three.js (Bottom) */}
              <div className="cube-face face-bottom">
                <div className="face-content" style={{ '--face-glow': '#00f2fe' }}>
                  <SiThreedotjs className="face-icon" style={{ color: '#00f2fe' }} />
                  <span className="face-title font-title">Three.js</span>
                </div>
              </div>

              {/* Face 5: MongoDB (Left) */}
              <div className="cube-face face-left">
                <div className="face-content" style={{ '--face-glow': '#47a248' }}>
                  <SiMongodb className="face-icon" style={{ color: '#47a248' }} />
                  <span className="face-title font-title">MongoDB</span>
                </div>
              </div>

              {/* Face 6: Redux/GSAP (Right) */}
              <div className="cube-face face-right">
                <div className="face-content" style={{ '--face-glow': '#764abc' }}>
                  <SiRedux className="face-icon" style={{ color: '#764abc' }} />
                  <span className="face-title font-title">Redux</span>
                </div>
              </div>
            </div>
          </div>
          {/* Ambient floor shadow */}
          <div className="cube-shadow" />
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
