import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress]     = useState(0);
  const [visible, setVisible]       = useState(true);
  const [glitch, setGlitch]         = useState(false);
  const [showScan, setShowScan]     = useState(false);
  const [nameReady, setNameReady]   = useState(false);
  const rafRef = useRef(null);

  const FIRST = 'ABHINAV';
  const LAST  = 'PANDEY';

  useEffect(() => {
    // Scanline fires immediately
    const scanTimer = setTimeout(() => setShowScan(true), 200);

    // Names animate in after scan starts
    const nameTimer = setTimeout(() => setNameReady(true), 400);

    // Progress counter
    let start = null;
    const DURATION = 2800;
    const tick = (ts) => {
      if (!start) start = ts;
      const pct = Math.min(((ts - start) / DURATION) * 100, 100);
      setProgress(Math.floor(pct));
      if (pct < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Glitch pulses
    const g1 = setTimeout(() => { setGlitch(true); setTimeout(() => setGlitch(false), 200); }, 1200);
    const g2 = setTimeout(() => { setGlitch(true); setTimeout(() => setGlitch(false), 160); }, 2100);

    // Exit
    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 1100);
    }, 3300);

    return () => {
      cancelAnimationFrame(rafRef.current);
      [scanTimer, nameTimer, g1, g2, exitTimer].forEach(clearTimeout);
    };
  }, [onComplete]);

  const letterVar = (delay, stagger) => ({
    hidden: { opacity: 0, y: 90, rotateX: -90, filter: 'blur(16px)' },
    visible: (i) => ({
      opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
      transition: { delay: delay + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    }),
  });

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Cinematic bars */}
          <motion.div
            className="splash-bar splash-bar--top"
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          />
          <motion.div
            className="splash-bar splash-bar--bottom"
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 } }}
          />

          {/* Main panel */}
          <motion.div
            className="splash-root"
            exit={{
              clipPath: 'inset(0 0 100% 0)',
              transition: { duration: 0.75, delay: 0.15, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            {/* Dot grid */}
            <div className="splash-grid" aria-hidden />

            {/* Scanline sweep */}
            {showScan && <div className="splash-scanline" aria-hidden />}

            {/* Noise */}
            <div className="splash-noise" aria-hidden />

            {/* Ambient orbs */}
            <div className="splash-orb splash-orb--a" aria-hidden />
            <div className="splash-orb splash-orb--b" aria-hidden />
            <div className="splash-orb splash-orb--c" aria-hidden />

            {/* Corner HUD brackets */}
            <motion.div className="hud-corner hud-corner--tl" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.5 }} />
            <motion.div className="hud-corner hud-corner--tr" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2,  duration: 0.5 }} />
            <motion.div className="hud-corner hud-corner--bl" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.5 }} />
            <motion.div className="hud-corner hud-corner--br" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3,  duration: 0.5 }} />

            {/* Top HUD row */}
            <motion.div className="splash-hud-top" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
              <div className="hud-left">
                <span className="hud-dot" />
                <span className="hud-text">SYS / PORTFOLIO_2026</span>
              </div>
              <div className="hud-right">
                <span className="hud-text hud-text--green">◉ ONLINE</span>
              </div>
            </motion.div>

            {/* Center */}
            <div className={`splash-center ${glitch ? 'glitch-active' : ''}`}>

              {/* Eyebrow rule */}
              <motion.div className="splash-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.7 }}>
                <span className="eyebrow-rule" />
                <span className="eyebrow-text">FULL STACK DEVELOPER</span>
                <span className="eyebrow-rule eyebrow-rule--r" />
              </motion.div>

              {/* ABHINAV */}
              {nameReady && (
                <div className="splash-name-row" style={{ perspective: '900px' }}>
                  {FIRST.split('').map((ch, i) => (
                    <motion.span key={`f${i}`} className="splash-letter splash-first" custom={i}
                      variants={letterVar(0, 0.06)} initial="hidden" animate="visible">
                      {ch}
                    </motion.span>
                  ))}
                </div>
              )}

              {/* PANDEY */}
              {nameReady && (
                <div className="splash-name-row" style={{ perspective: '900px' }}>
                  {LAST.split('').map((ch, i) => (
                    <motion.span key={`l${i}`} className="splash-letter splash-last" custom={i}
                      variants={letterVar(0.28, 0.06)} initial="hidden" animate="visible">
                      {ch}
                    </motion.span>
                  ))}
                </div>
              )}

              {/* Glitch ghosts */}
              {glitch && (
                <>
                  <div className="glitch-ghost glitch-ghost--c" aria-hidden>
                    <span>{FIRST}</span><span>{LAST}</span>
                  </div>
                  <div className="glitch-ghost glitch-ghost--p" aria-hidden>
                    <span>{FIRST}</span><span>{LAST}</span>
                  </div>
                </>
              )}

              {/* Subtitle */}
              <motion.p className="splash-subtitle"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}>
                React · Three.js · Node.js · n8n Automation
              </motion.p>
            </div>

            {/* Bottom HUD */}
            <motion.div className="splash-hud-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
              <span className="hud-text hud-text--dim">LOADING PORTFOLIO</span>
              <span className="hud-pct">{String(progress).padStart(3, '0')}%</span>
            </motion.div>

            {/* Progress bar */}
            <div className="splash-progress-track">
              {[25, 50, 75].map(t => (
                <div key={t} className="progress-tick" style={{ left: `${t}%` }} />
              ))}
              <motion.div className="splash-progress-fill" style={{ scaleX: progress / 100, transformOrigin: 'left' }} />
              <div className="splash-progress-glow" style={{ left: `${progress}%` }} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
