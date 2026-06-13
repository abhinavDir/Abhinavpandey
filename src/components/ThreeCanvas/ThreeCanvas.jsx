import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeCanvas.css';

const ThreeCanvas = () => {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Viewport Detection
    const isMobile = window.innerWidth < 768;

    // Dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 2)); // Cap at 1 for mobile, 2 for desktop
    containerRef.current.appendChild(renderer.domElement);

    // Create custom circle particle texture
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      // Draw glowing radial gradient circle (Warm tones)
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 160, 0, 0.85)'); // Warm Amber core
      gradient.addColorStop(0.5, 'rgba(255, 87, 34, 0.45)'); // Coral glow
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();

    // Particle Cloud Geometry
    const particleCount = isMobile ? 350 : 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scaleFactors = new Float32Array(particleCount);
    
    // Spread particles in a wide cloud
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 80;
      positions[i + 1] = (Math.random() - 0.5) * 80;
      positions[i + 2] = (Math.random() - 0.5) * 60;
      
      scaleFactors[i / 3] = Math.random() * 0.8 + 0.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scaleFactor', new THREE.BufferAttribute(scaleFactors, 1));

    // Custom shader uniforms to control time on the GPU
    const customUniforms = {
      uTime: { value: 0 }
    };

    // Custom PointsMaterial
    const material = new THREE.PointsMaterial({
      size: 1.5,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Inject displacement logic directly into Three.js vertex shader
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = customUniforms.uTime;
      shader.vertexShader = `
        uniform float uTime;
      ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        // Smooth wavy animation calculated entirely on the GPU
        transformed.y += sin(uTime * 0.4 + position.x * 0.05) * 1.2;
        transformed.x += cos(uTime * 0.3 + position.z * 0.05) * 0.8;
        `
      );
    };

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Floating 3D Geometric Wireframe Abstract Meshes (Luxury 3D depth, throttled for mobile)
    const torusKnotGeom = isMobile
      ? new THREE.TorusKnotGeometry(8, 2.4, 40, 8)
      : new THREE.TorusKnotGeometry(8, 2.4, 80, 12);
    const torusKnotMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xff5722), // Warm Coral
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.04 : 0.07,
    });
    const torusKnot = new THREE.Mesh(torusKnotGeom, torusKnotMat);
    torusKnot.position.set(-18, 10, -20);
    scene.add(torusKnot);

    const icoGeom = new THREE.IcosahedronGeometry(10, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xffa000), // Warm Amber
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.03 : 0.05,
    });
    const ico = new THREE.Mesh(icoGeom, icoMat);
    ico.position.set(18, -10, -22);
    scene.add(ico);

    // Initial theme check
    const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (initialTheme === 'light') {
      material.blending = THREE.NormalBlending;
      material.opacity = 0.55;
      torusKnotMat.color.setHex(0xbf360c); // Burnt Terracotta
      torusKnotMat.opacity = 0.05;
      icoMat.color.setHex(0xe65100); // Deep Amber
      icoMat.opacity = 0.04;
    } else {
      material.blending = THREE.AdditiveBlending;
      material.opacity = 1.0;
      torusKnotMat.color.setHex(0xff5722);
      torusKnotMat.opacity = 0.07;
      icoMat.color.setHex(0xffa000);
      icoMat.opacity = 0.05;
    }

    // Dynamic mutation observer to react to theme toggles on the fly
    const themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const isLight = document.documentElement.getAttribute('data-theme') === 'light';
          material.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
          material.opacity = isLight ? 0.55 : 1.0;
          
          torusKnotMat.color.setHex(isLight ? 0xbf360c : 0xff5722);
          torusKnotMat.opacity = isLight ? 0.05 : 0.07;
          
          icoMat.color.setHex(isLight ? 0xe65100 : 0xffa000);
          icoMat.opacity = isLight ? 0.04 : 0.05;
          
          material.needsUpdate = true;
          torusKnotMat.needsUpdate = true;
          icoMat.needsUpdate = true;
        }
      });
    });

    themeObserver.observe(document.documentElement, { attributes: true });

    // Track mouse (only on desktop pointer devices)
    const onMouseMove = (e) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 15;
      mouse.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 15;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove);
    }

    // Track resize (throttled)
    let resizeTimeout;
    const onResize = () => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
          resizeTimeout = null;
        }, 150);
      }
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

      // Update shader uniform to run particle wave on the GPU
      customUniforms.uTime.value = elapsedTime;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (!isMobile) {
        window.removeEventListener('mousemove', onMouseMove);
      }
      window.removeEventListener('resize', onResize);
      themeObserver.disconnect();
      if (resizeTimeout) clearTimeout(resizeTimeout);
      
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
