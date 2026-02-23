import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Code, Clock } from 'lucide-react';
import { scrambleText } from '../utils/textEffects';
import './DemoTerminal.css';

const DemoTerminal = () => {
  const [formData, setFormData] = useState({ name: '', business: '', idea: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) scrambleText(titleRef.current, 'SYSTEM_CONFIG');

    if (isSubmitted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, timeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="demo" className="section container">
      <div className="section-header">
        <h2 className="mono"><span className="text-accent">05.</span> <span ref={titleRef}>SYSTEM_CONFIG</span></h2>
        <div className="header-line"></div>
      </div>

      <div className="demo-container">
        {/* Left Side: Form Shell */}
        <div className="terminal-form glass-panel">
          <div className="terminal-header">
            <Terminal size={16} className="text-muted" />
            <span className="mono text-muted">root@vortex-engine:~# ./configure_project.sh</span>
          </div>

          <form className="terminal-body" onSubmit={handleSubmit}>
            <div className="form-group mono">
              <label>
                <span className="prompt-symbol text-accent">{'>'}</span> SET client_name=
              </label>
              <input
                type="text"
                className="terminal-input"
                placeholder='"Enter Name"'
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group mono">
              <label>
                <span className="prompt-symbol text-accent">{'>'}</span> SET business_type=
              </label>
              <input
                type="text"
                className="terminal-input"
                placeholder='"Enter Category"'
                required
                value={formData.business}
                onChange={e => setFormData({ ...formData, business: e.target.value })}
              />
            </div>

            <div className="form-group mono">
              <label>
                <span className="prompt-symbol text-accent">{'>'}</span> SET project_idea=
              </label>
              <textarea
                className="terminal-input"
                rows="3"
                placeholder='"Describe Requirements"'
                required
                value={formData.idea}
                onChange={e => setFormData({ ...formData, idea: e.target.value })}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary terminal-submit mono" disabled={isSubmitted}>
              <Send size={16} /> <span style={{ marginLeft: '0.5rem' }}>{isSubmitted ? 'SYSTEM_LOCKED' : 'EXECUTE_BUILD'}</span>
            </button>
          </form>
        </div>

        {/* Right Side: Live JSON / Timer */}
        <div className="terminal-output glass-panel mono">
          <div className="terminal-header">
            {isSubmitted ? <Clock size={16} className="text-accent" /> : <Code size={16} className="text-muted" />}
            <span className={isSubmitted ? "text-accent" : "text-muted"}>
              {isSubmitted ? "pipeline_status.log" : "payload_preview.json"}
            </span>
          </div>

          <div className="terminal-body" style={{ padding: '2rem 1.5rem' }}>
            {!isSubmitted ? (
              <pre className="json-display text-muted">
                {JSON.stringify({
                  request_id: "REQ-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
                  timestamp: new Date().toISOString(),
                  payload: {
                    client: formData.name || '...',
                    type: formData.business || '...',
                    requirements: formData.idea || '...'
                  },
                  status: "DRAFT",
                  target_eta: "24H"
                }, null, 2)}
              </pre>
            ) : (
              <div className="countdown-display">
                <div className="text-muted" style={{ marginBottom: '1rem' }}>SYSTEM.INIT: Requirement Data Processed.</div>
                <div className="text-muted" style={{ marginBottom: '2rem' }}>[EXECUTE] Dev Engine Started...</div>
                <div className="timer-value text-accent" style={{ fontSize: '3rem', fontWeight: '600', textShadow: '0 0 20px rgba(0,240,255,0.4)' }}>
                  {formatTime(timeLeft)}
                </div>
                <div className="text-muted" style={{ marginTop: '2rem' }}>Awaiting Delivery of Web + CRM + BRD.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoTerminal;
