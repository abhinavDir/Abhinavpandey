import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Magnetic = ({ children, range = 0.35, strength = 0.35 }) => {
  const ref = useRef(null);
  const boundsRef = useRef(null);

  // Set up motion values to update transforms directly in DOM with zero React re-renders
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Bind custom spring physics configurations
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseEnter = () => {
    if (ref.current) {
      // Cache element bounding box on hover start to avoid coordinates shift feedback loops
      boundsRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e) => {
    if (!boundsRef.current) {
      if (ref.current) boundsRef.current = ref.current.getBoundingClientRect();
      else return;
    }
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = boundsRef.current;
    
    // Center point of the element
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Distance from center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Apply pull physics directly into motion values
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    boundsRef.current = null;
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="magnetic-wrapper"
      style={{ display: 'inline-block', x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
