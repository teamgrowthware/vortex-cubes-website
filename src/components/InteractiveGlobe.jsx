import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import { Database, Activity, CheckCircle } from 'lucide-react';
import { scrambleText } from '../utils/textEffects';
import './InteractiveGlobe.css';

const INDORE = { lat: 22.7196, lng: 75.8577, city: 'Indore', client: 'Vortex Cubes (HQ)', project: 'Command Center', tech: 'Origin Node', code: 'IN', isOrigin: true };

const destinations = [
  { lat: 52.3676, lng: 4.9041, city: 'Amsterdam', client: 'Client NL', project: 'Data Pipeline', tech: 'Node.js, AWS', code: 'NL' },
  { lat: 52.5200, lng: 13.4050, city: 'Berlin', client: 'Client DE', project: 'Automation', tech: 'Python, Docker', code: 'DE' },
  { lat: 38.9072, lng: -77.0369, city: 'Washington DC', client: 'Client US Gov', project: 'Security', tech: 'Rust, AWS', code: 'US' },
  { lat: 40.7128, lng: -74.0060, city: 'New York', client: 'Orbosis Global', project: 'IT Services', tech: 'Vue.js, AWS', code: 'US' },
  { lat: 37.7749, lng: -122.4194, city: 'San Francisco', client: 'Agro Tech', project: 'SaaS Platform', tech: 'Next.js, Node.js', code: 'US' },
  { lat: 3.1390, lng: 101.6869, city: 'Kuala Lumpur', client: 'Client MY', project: 'FinTech App', tech: 'React Native', code: 'MY' },
  { lat: 23.8103, lng: 90.4125, city: 'Dhaka', client: 'Client BD', project: 'E-commerce', tech: 'React, Shopify', code: 'BD' },
  { lat: 51.5074, lng: -0.1278, city: 'London', client: 'Kohlico', project: 'Logistics', tech: 'Angular, Spring', code: 'GB' }
];

const cities = [INDORE, ...destinations];

const InteractiveGlobe = () => {
  const globeEl = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [activeCity, setActiveCity] = useState(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (titleRef.current) scrambleText(titleRef.current, 'GLOBAL_NET');

    if (!containerRef.current) return;

    // Slight delay to ensure parent dimensions are ready
    setTimeout(() => {
      if (!containerRef.current) return;

      const arcsData = destinations.map((city, index) => ({
        startLat: INDORE.lat,
        startLng: INDORE.lng,
        endLat: city.lat,
        endLng: city.lng,
        color: ['rgba(0, 240, 255, 0.1)', 'rgba(0, 240, 255, 1)'],
        delay: index * 500 // Staggered start
      }));

      const ringsData = [
        // Indore Origin Glow Pulse
        { lat: INDORE.lat, lng: INDORE.lng, maxR: 12, propagationSpeed: 2, repeatPeriod: 1500, color: '#00f0ff' },
        // Destination pulses
        ...destinations.map(c => ({ lat: c.lat, lng: c.lng, maxR: 4, propagationSpeed: 1, repeatPeriod: 2500, color: '#00f0ff' }))
      ];

      const globe = Globe()(containerRef.current)
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
        .backgroundColor('rgba(0,0,0,0)')
        .width(Math.min(window.innerWidth - 40, 700))
        .height(600)
        .pointOfView({ lat: 20, lng: 40, altitude: 2.2 })
        .pointsData(cities)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor(() => '#00f0ff')
        .pointAltitude(0.05)
        .pointRadius(0.5)
        .pointsMerge(true)
        .ringsData(ringsData)
        .ringColor('color')
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod')
        .arcsData(arcsData)
        .arcColor('color')
        .arcDashLength(0.6)
        .arcDashGap(0.1)
        .arcDashInitialGap(d => d.delay / 2000)
        .arcDashAnimateTime(2500)
        .arcStroke(0.7)
        .htmlElementsData(cities)
        .htmlElement(d => {
          const el = document.createElement('div');
          el.className = 'interactive-node mono';
          el.style.pointerEvents = 'auto';
          el.style.cursor = 'none';
          el.style.transform = 'translate(-50%, -50%)';

          // Style for the initial letter
          el.style.color = '#00f0ff';
          el.style.fontSize = '12px';
          el.style.fontWeight = 'bold';
          el.style.textShadow = '0 0 5px rgba(0, 240, 255, 0.8)';
          el.style.padding = '2px 4px';
          el.style.border = '1px solid rgba(0, 240, 255, 0.3)';
          el.style.borderRadius = '2px';
          el.style.backgroundColor = 'rgba(8, 8, 12, 0.6)';
          el.style.backdropFilter = 'blur(4px)';

          const initial = d.city ? d.city.charAt(0).toUpperCase() : '';
          el.innerHTML = initial;

          // Show details on click
          el.onclick = () => setActiveCity(d);
          return el;
        })
        .htmlAltitude(0.08)
        .onPointClick((point) => {
          setActiveCity(point);
          // Optional: sound code could go here, e.g., new Audio('/pulse.mp3').play()
        });

      // Inject custom Additive Blending to materials in the globe scene
      // Globe.gl uses THREE under the hood. We traverse its scene.
      const scene = globe.scene();
      scene.traverse((obj) => {
        if (obj.type === 'Line2' || obj.type === 'Mesh') {
          if (obj.material) {
            // Apply glow and additive blending if it's cyan-ish
            if (obj.material.color && obj.material.color.getHex() === 0x00f0ff) {
              obj.material.blending = THREE.AdditiveBlending;
              obj.material.transparent = true;
            }
          }
        }
      });

      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.5;
      globe.controls().enableZoom = false;

      globeEl.current = globe;
    }, 100);

    const handleResize = () => {
      if (globeEl.current && containerRef.current) {
        globeEl.current.width(Math.min(window.innerWidth - 40, 700));
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <section id="globe" className="section container">
      <div className="section-header">
        <h2 className="mono"><span className="text-accent">06.</span> <span ref={titleRef}>GLOBAL_NET</span></h2>
        <div className="header-line"></div>
      </div>

      <div className="globe-container">
        <div className="globe-wrapper" ref={containerRef}></div>

        <div className={`project-data-sheet glass-panel ${activeCity ? 'active' : ''}`}>
          {activeCity ? (
            <>
              <div className="sheet-header">
                <h3 className="mono text-accent">{activeCity.city} Node</h3>
                <span className="mono status-badge"><CheckCircle size={12} /> ONLINE</span>
              </div>
              <div className="sheet-body mono">
                <div className="data-row status-flicker">
                  <span className="text-muted">LINK:</span>
                  <span className="text-accent">ESTABLISHED</span>
                </div>
                <div className="data-row">
                  <span className="text-muted">CLIENT:</span>
                  <span>{activeCity.client}</span>
                </div>
                <div className="data-row">
                  <span className="text-muted">SYSTEM:</span>
                  <span>{activeCity.project}</span>
                </div>
                <div className="data-row">
                  <span className="text-muted">STACK:</span>
                  <span>{activeCity.tech}</span>
                </div>
              </div>
              <div className="sheet-footer">
                <div className="metric">
                  <Database size={14} className="text-muted" />
                  <span className="mono text-accent">99.9% </span>
                </div>
                <div className="metric">
                  <Activity size={14} className="text-muted" />
                  <span className="mono text-accent">12ms</span>
                </div>
              </div>
              <button className="btn btn-secondary close-btn" onClick={() => setActiveCity(null)}>DISCONNECT</button>
            </>
          ) : (
            <div className="sheet-empty mono text-muted">AWAITING CONNECTION...<br />CLICK A NODE</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveGlobe;
