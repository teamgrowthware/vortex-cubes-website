import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrambleText } from '../utils/textEffects';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const mountRef = useRef(null);
  const rotOverlayRef = useRef(null);
  const glowRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const [systemStatus, setSystemStatus] = useState('OPTIMAL');

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Basic Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (mountRef.current) {
      mountRef.current.innerHTML = ''; // Force clear any strict mode children
      mountRef.current.appendChild(renderer.domElement);
    }

    // Scramble effect
    if (title1Ref.current) scrambleText(title1Ref.current, 'SCALABLE SYSTEMS');
    if (title2Ref.current) scrambleText(title2Ref.current, '& SAAS PLATFORMS');

    // Create the Vortex Cube (Wireframe)
    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5, 6, 6, 6);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const innerGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5, 2, 2, 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3366,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const innerCube = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerCube);

    camera.position.z = 5;

    // Position cubes dynamically based on screen
    const isMobile = window.innerWidth < 768;
    cube.position.x = isMobile ? 0 : 5.0;
    innerCube.position.x = isMobile ? 0 : 5.0;


    // --- Clean Mouse Tracking for Hover Interactivity ---
    // (Parallax disabled upon request)

    // --- Clean Animation Loop Constants ---
    let animationFrameId;
    let isDestroyed = false;

    const animate = () => {
      if (isDestroyed) return;
      animationFrameId = requestAnimationFrame(animate);

      // SIMPLE, BULLETPROOF ROTATION
      // Math is done entirely on continuous flat increments to avoid Time drift bugs on alt-tabs
      cube.rotation.x += 0.006;
      cube.rotation.y += 0.010;
      cube.rotation.z += 0.004;

      innerCube.rotation.x -= 0.010;
      innerCube.rotation.y -= 0.015;
      innerCube.rotation.z -= 0.006;
      // PARALLAX CAMERA MOVEMENT (Disabled)
      camera.position.x = 0;
      camera.position.y = 0;
      camera.lookAt(window.innerWidth < 768 ? 0 : 1.5, 0, 0);

      // METRICS OVERLAY UPDATE
      if (rotOverlayRef.current) {
        const degX = Math.abs(((cube.rotation.x * 180 / Math.PI) % 360)).toFixed(1);
        const degY = Math.abs(((cube.rotation.y * 180 / Math.PI) % 360)).toFixed(1);
        rotOverlayRef.current.innerText = `[ROT_SYNC] X: ${degX}° Y: ${degY}°`;
      }

      // DYNAMIC GLOW (Uses simple Date.now without relying on Three context)
      if (glowRef.current) {
        const time = Date.now() * 0.001;
        const intensity = 0.2 + Math.sin(time * 2.5) * 0.15 + Math.cos(time * 1.8) * 0.15;
        const posX = 50 + Math.sin(time * 3) * 10;
        const posY = 50 + Math.cos(time * 4) * 10;
        glowRef.current.style.background = `radial-gradient(circle at ${posX}% ${posY}%, rgba(0, 240, 255, ${intensity}) 0%, transparent 40%)`;
      }

      renderer.render(scene, camera);
    };

    // Kickstart animation loop
    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      const mobile = window.innerWidth < 768;
      cube.position.x = mobile ? 0 : 5.0;
      innerCube.position.x = mobile ? 0 : 5.0;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isDestroyed = true;
      initialized.current = false;
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      ScrollTrigger.getAll().forEach(t => t.kill());

      if (mountRef.current && renderer.domElement) {
        // Safe removal check
        if (mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }

      geometry.dispose();
      material.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div ref={glowRef} className="hero-glow"></div>
      <div ref={mountRef} className="hero-canvas" style={{ pointerEvents: 'none' }}></div>
      <div className="rot-overlay mono text-muted" ref={rotOverlayRef}></div>

      <div className="hero-content container">
        <div className="hero-text">
          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
            We Build <br />
            <span className="text-accent" ref={title1Ref}>SCALABLE SYSTEMS</span><br />
            <span className="text-accent" ref={title2Ref}>& SAAS PLATFORMS</span>
          </h1>
          <p className="hero-subtitle text-muted">We specialize in creating innovative technology solutions that drive business growth. From custom software development to AI integration, we help companies stay ahead of the curve.</p>

          <div className="hero-ctas">
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setSystemStatus('ANALYZING...')}
              onMouseLeave={() => setSystemStatus('OPTIMAL')}
              data-code-tooltip="const query = db.collection('projects')&#10;  .where('status', '==', 'active')&#10;  .limit(10);"
            >
              VIEW WORK
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setSystemStatus('INITIALIZING...')}
              onMouseLeave={() => setSystemStatus('OPTIMAL')}
              data-code-tooltip="const session = await createSession({&#10;  mode: 'demo',&#10;  secure: true&#10;});"
            >
              REQUEST DEMO
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
