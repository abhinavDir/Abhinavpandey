import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeCanvas.css';

const ThreeCanvas = () => {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
    containerRef.current.appendChild(renderer.domElement);

    // Create custom circle particle texture
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      // Draw glowing radial gradient circle
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(0, 242, 254, 0.8)'); // Cyan core
      gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.4)'); // Violet glow
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();

    // Particle Cloud Geometry
    const particleCount = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scaleFactors = new Float32Array(particleCount);
    
    // Spread particles in a wide cloud
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Box spread, then shaped spherically
      positions[i] = (Math.random() - 0.5) * 80;
      positions[i + 1] = (Math.random() - 0.5) * 80;
      positions[i + 2] = (Math.random() - 0.5) * 60;
      
      scaleFactors[i / 3] = Math.random() * 0.8 + 0.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scaleFactor', new THREE.BufferAttribute(scaleFactors, 1));

    // Custom Shader or elegant PointsMaterial
    const material = new THREE.PointsMaterial({
      size: 1.5,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Floating 3D Geometric Wireframe Abstract Meshes (Luxury 3D depth)
    const torusKnotGeom = new THREE.TorusKnotGeometry(8, 2.4, 80, 12);
    const torusKnotMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x7c3aed), // Violet
      wireframe: true,
      transparent: true,
      opacity: 0.07,
    });
    const torusKnot = new THREE.Mesh(torusKnotGeom, torusKnotMat);
    torusKnot.position.set(-18, 10, -20);
    scene.add(torusKnot);

    const icoGeom = new THREE.IcosahedronGeometry(10, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00f2fe), // Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.05,
    });
    const ico = new THREE.Mesh(icoGeom, icoMat);
    ico.position.set(18, -10, -22);
    scene.add(ico);

    // Initial theme check
    const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (initialTheme === 'light') {
      material.blending = THREE.NormalBlending;
      material.opacity = 0.55;
      torusKnotMat.color.setHex(0x6d28d9); // Dark Violet
      torusKnotMat.opacity = 0.05;
      icoMat.color.setHex(0x0f766e); // Dark Teal
      icoMat.opacity = 0.04;
    } else {
      material.blending = THREE.AdditiveBlending;
      material.opacity = 1.0;
      torusKnotMat.color.setHex(0x7c3aed);
      torusKnotMat.opacity = 0.07;
      icoMat.color.setHex(0x00f2fe);
      icoMat.opacity = 0.05;
    }

    // Dynamic mutation observer to react to theme toggles on the fly
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const isLight = document.documentElement.getAttribute('data-theme') === 'light';
          material.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
          material.opacity = isLight ? 0.55 : 1.0;
          
          torusKnotMat.color.setHex(isLight ? 0x6d28d9 : 0x7c3aed);
          torusKnotMat.opacity = isLight ? 0.05 : 0.07;
          
          icoMat.color.setHex(isLight ? 0x0f766e : 0x00f2fe);
          icoMat.opacity = isLight ? 0.04 : 0.05;
          
          material.needsUpdate = true;
          torusKnotMat.needsUpdate = true;
          icoMat.needsUpdate = true;
        }
      });
    });

    themeObserver.observe(document.documentElement, { attributes: true });

    // Track mouse
    const onMouseMove = (e) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 15;
      mouse.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 15;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Track resize
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse tracking
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Gentle auto-rotation
      particleSystem.rotation.y = elapsedTime * 0.02;
      particleSystem.rotation.x = elapsedTime * 0.01;
      
      // Wireframe abstract rotations
      torusKnot.rotation.x = elapsedTime * 0.05;
      torusKnot.rotation.y = elapsedTime * 0.08;
      ico.rotation.x = -elapsedTime * 0.04;
      ico.rotation.y = elapsedTime * 0.06;

      // Mouse interactive parallax for all items at different multiplier depth
      particleSystem.position.x = mouse.current.x * 0.6;
      particleSystem.position.y = mouse.current.y * 0.6;
      
      torusKnot.position.x = -18 + mouse.current.x * 0.3;
      torusKnot.position.y = 10 + mouse.current.y * 0.3;
      
      ico.position.x = 18 + mouse.current.x * 0.45;
      ico.position.y = -10 + mouse.current.y * 0.45;

      // Subtle particle waving movement in shader or javascript positions
      const positionsArray = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Wavy offset based on sin/cos
        positionsArray[i3 + 1] += Math.sin(elapsedTime + positionsArray[i3]) * 0.005;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      themeObserver.disconnect();
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      torusKnotGeom.dispose();
      torusKnotMat.dispose();
      icoGeom.dispose();
      icoMat.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="three-background-canvas" ref={containerRef} aria-hidden="true">
      <div className="bg-glow-blob blob-1" />
      <div className="bg-glow-blob blob-2" />
      <div className="bg-glow-blob blob-3" />
    </div>
  );
};

export default ThreeCanvas;
