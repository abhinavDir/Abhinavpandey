import React, { useEffect, useRef, useState } from 'react';
import './CursorFollower.css';

const CursorFollower = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  const mouse = useRef({ x: 0, y: 0 }); // Target
  const ringPos = useRef({ x: 0, y: 0 }); // Current ring position
  const dotPos = useRef({ x: 0, y: 0 }); // Current dot position
  
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  
  // Track hidden state in ref to avoid stale closures in listeners
  const isHiddenRef = useRef(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touchscreens (which have no hardware mouse cursor)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    let animationFrameId = null;
    let isLooping = false;

    const startLoop = () => {
      if (!isLooping) {
        isLooping = true;
        render();
      }
    };

    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
    
    const render = () => {
      // Stop loop immediately if mouse left the window area
      if (isHiddenRef.current) {
        isLooping = false;
        animationFrameId = null;
        return;
      }

      // Dot tracking (high responsiveness)
      dotPos.current.x = lerp(dotPos.current.x, mouse.current.x, 0.3);
      dotPos.current.y = lerp(dotPos.current.y, mouse.current.y, 0.3);
      
      // Ring tracking (slower lag / inertia)
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.12);
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Sleep calculation: check distance between current position and mouse coordinates
      const distDotX = Math.abs(mouse.current.x - dotPos.current.x);
      const distDotY = Math.abs(mouse.current.y - dotPos.current.y);
      const distRingX = Math.abs(mouse.current.x - ringPos.current.x);
      const distRingY = Math.abs(mouse.current.y - ringPos.current.y);

      // If trail components have fully converged (converged under 0.05px), go to sleep
      if (distDotX < 0.05 && distDotY < 0.05 && distRingX < 0.05 && distRingY < 0.05) {
        isLooping = false;
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      if (isHiddenRef.current) {
        isHiddenRef.current = false;
        setIsHidden(false);
        // Sync position immediately to prevent jumping from old positions
        dotPos.current.x = e.clientX;
        dotPos.current.y = e.clientY;
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
      }
      
      startLoop();
    };

    const onMouseLeave = () => {
      isHiddenRef.current = true;
      setIsHidden(true);
    };

    const onMouseDown = () => {
      setIsClicked(true);
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.interactive') ||
        target.closest('.project-card') ||
        target.closest('.skill-card') ||
        target.closest('.magnetic-wrapper');
        
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    // Initial startup
    startLoop();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className={`cursor-dot ${isHidden ? 'hidden' : ''} ${isClicked ? 'active' : ''} ${isHovered ? 'hover' : ''}`} 
      />
      <div 
        ref={ringRef} 
        className={`cursor-ring ${isHidden ? 'hidden' : ''} ${isClicked ? 'active' : ''} ${isHovered ? 'hover' : ''}`} 
      />
    </>
  );
};

export default CursorFollower;
