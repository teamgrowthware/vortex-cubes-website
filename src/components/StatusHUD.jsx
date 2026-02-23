import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import Sparkline from './Sparkline';
import './StatusHUD.css';

const StatusHUD = () => {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const updateStats = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;

        // Mock memory or use performance.memory if available
        if (performance.memory) {
          setMemory(Math.round(performance.memory.usedJSHeapSize / 1048576));
        } else {
          setMemory(Math.floor(Math.random() * 20) + 40);
        }
      }

      requestAnimationFrame(updateStats);
    };

    const animId = requestAnimationFrame(updateStats);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="status-hud glass-panel mono">
      <div className="hud-header">
        <Activity size={14} className="text-accent" />
        <span>SYS.MONITOR</span>
      </div>
      <div className="hud-stats">
        <div className="stat-row">
          <span className="text-muted">FPS:</span>
          <span className={fps < 30 ? 'text-accent' : ''}>{fps}</span>
        </div>
        <div className="stat-row">
          <span className="text-muted">MEM:</span>
          <span>{memory}MB</span>
        </div>
        <div className="stat-row" style={{ marginTop: '4px', marginBottom: '8px' }}>
          <Sparkline />
        </div>
        <div className="stat-row">
          <span className="text-muted">NET:</span>
          <span
            className="text-accent cursor-pointer"
            onClick={() => setIsModalOpen(!isModalOpen)}
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            OK
          </span>
        </div>
      </div>

      {isModalOpen && (
        <div className="status-modal glass-panel mono">
          <div style={{ borderBottom: '1px solid var(--bg-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>ACTIVE_NODES</div>
          <div className="modal-node"><span>{'>'} Scalyx.sys</span><span className="text-accent">12ms</span></div>
          <div className="modal-node"><span>{'>'} Orbosis.net</span><span className="text-accent">24ms</span></div>
          <div className="modal-node"><span>{'>'} Kohlico.io</span><span className="text-accent">19ms</span></div>
        </div>
      )}
    </div>
  );
};

export default StatusHUD;
