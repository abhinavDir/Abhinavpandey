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

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setIsHidden(false);
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    const onMouseDown = () => {
      setIsClicked(true);
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    // Auto-detect hovers on interactive components
    const onMouseOver = (e) => {
      const target = e.target;
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

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    // Lerp loop
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
    
    let animationFrameId;
    
    const render = () => {
      if (!isHidden) {
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
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHidden]);

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
