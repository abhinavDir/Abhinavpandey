import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiJavascript, SiThreedotjs } from 'react-icons/si';
import './About.css';

// Counter Helper Component
const Counter = ({ value, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const currentEl = elementRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end) || end <= 0) {
      setCount(value);
      return;
    }

    const totalMilliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMilliseconds / end), 16); // minimum 16ms to avoid blocking frame budget

    const timer = setInterval(() => {
      start += 1;
      setCount(start);

      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => {
      clearInterval(timer);
    };
  }, [hasAnimated, value, duration]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
};

const About = () => {
  const cardRef = useRef(null);

  // 3D Tilt Card Interaction via direct DOM styling to prevent React re-renders
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const { left, top, width, height } =
      card.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const degX = (mouseY / (height / 2)) * -10;
    const degY = (mouseX / (width / 2)) * 10;

    card.style.transform = `perspective(1000px) rotateX(${degX}deg) rotateY(${degY}deg)`;
    card.style.transition = 'none';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    cardRef.current.style.transition = 'transform 0.5s ease';
  };

  const bioVariants = {
    hidden: {
      opacity: 0,
      x: -40,
    },

    visible: {
      opacity: 1,
      x: 0,

      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: 40,
    },

    visible: {
      opacity: 1,
      x: 0,

      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="about" className="about-section">
      <div
        className="neon-glow-circle circle-about"
        style={{
          top: '40%',
          right: '5%',
          width: '400px',
          height: '400px',
          background: 'var(--accent-color)',
          opacity: 0.08,
        }}
      />

      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-subtitle">
            // who i am
          </span>

          <h2 className="section-title">
            About Me
          </h2>
        </div>

        {/* Content Layout */}
        <div className="about-grid">
          {/* Bio Text */}
          <motion.div
            className="about-bio"
            variants={bioVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <h3 className="bio-greeting font-title">
              Building modern full-stack digital
              experiences with creativity and
              performance.
            </h3>

            <p className="bio-paragraph">
              Hello! I'm{' '}
              <span className="highlight-violet">
                Abhinav Pandey
              </span>
              , a passionate MERN Stack Developer
              and Computer Science Engineering
              student. I focus on building
              immersive, scalable, and visually
              modern web applications with smooth
              user experiences and premium frontend
              interactions.
            </p>

            <p className="bio-paragraph">
              I enjoy transforming ideas into
              interactive digital products using
              modern technologies like React.js,
              Node.js, MongoDB, Express.js, and
              advanced animation libraries. From
              social platforms and AI-powered
              applications to futuristic dashboard
              interfaces, I love creating projects
              that combine performance, clean
              architecture, and cinematic UI
              design.
            </p>

            {/* Stats */}
            <div className="about-stats-grid">
              <div className="stat-card glass-panel">
                <h4 className="stat-number font-title">
                  <Counter value="5" suffix="+" />
                </h4>

                <p className="stat-label">
                  Projects Built
                </p>
              </div>

              <div className="stat-card glass-panel">
                <h4 className="stat-number font-title">
                  <Counter value="10" suffix="+" />
                </h4>

                <p className="stat-label">
                  Technologies Explored
                </p>
              </div>

              <div className="stat-card glass-panel">
                <h4 className="stat-number font-title">
                  <Counter value="100" suffix="%" />
                </h4>

                <p className="stat-label">
                  Learning Dedication
                </p>
              </div>
            </div>
          </motion.div>

          {/* 3D Card */}
          <motion.div
            className="about-image-column"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div
              ref={cardRef}
              className="tilt-card-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                transition: 'transform 0.5s ease',
              }}
            >
              <div className="tilt-card glass-panel">
                {/* Orbit Icons */}
                <div
                  className="orbiting-icon icon-react"
                  aria-hidden="true"
                >
                  <FaReact />
                </div>

                <div
                  className="orbiting-icon icon-node"
                  aria-hidden="true"
                >
                  <FaNodeJs />
                </div>

                <div
                  className="orbiting-icon icon-js"
                  aria-hidden="true"
                >
                  <SiJavascript />
                </div>

                <div
                  className="orbiting-icon icon-three"
                  aria-hidden="true"
                >
                  <SiThreedotjs />
                </div>

                {/* Glow */}
                <div className="tilt-card-glow" />

                {/* Avatar */}
                <div className="avatar-wrapper">
                  <div className="avatar-glow-ring" />

                  <svg
                    className="avatar-svg"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id="avatarGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--primary-color)"
                        />

                        <stop
                          offset="100%"
                          stopColor="var(--secondary-color)"
                        />
                      </linearGradient>
                    </defs>

                    <circle
                      cx="100"
                      cy="100"
                      r="85"
                      stroke="url(#avatarGrad)"
                      strokeWidth="1.5"
                      strokeDasharray="5 5"
                    />

                    <motion.circle
                      cx="100"
                      cy="100"
                      r="75"
                      stroke="url(#avatarGrad)"
                      strokeWidth="2.5"
                      animate={{
                        strokeDashoffset: [0, 502],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      style={{
                        originX: '100px',
                        originY: '100px',
                      }}
                    />

                    {/* Abstract Avatar */}
                    <path
                      d="M100 50 C115 50 125 60 125 75 C125 90 115 100 100 100 C85 100 75 90 75 75 C75 60 85 50 100 50 Z"
                      fill="rgba(255,255,255,0.06)"
                      stroke="var(--secondary-color)"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M60 150 C60 120 78 110 100 110 C122 110 140 120 140 150"
                      fill="rgba(255,255,255,0.06)"
                      stroke="var(--primary-color)"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                {/* Caption */}
                <div className="card-caption">
                  <h4 className="caption-title font-title">
                    &lt; MERN STACK
                    DEVELOPER /&gt;
                  </h4>

                  <p className="caption-text">
                    REACT • NODE • MONGODB • N8N
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;