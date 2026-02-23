import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MonitorSmartphone, Server, ExternalLink } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const CaseStudy = () => {
  const { id } = useParams();

  // Scroll to top when loading page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simple placeholder data format matching the slug
  const projectTitle = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <PageTransition>
      <main className="section container" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <Link to="/" className="btn btn-secondary mono" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <ArrowLeft size={16} /> RETURN_TO_SYSTEM
          </Link>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <span className="text-accent">PROJECT //</span> {projectTitle}
          </h1>
          <div className="header-line"></div>
        </div>

        <div className="glass-panel" style={{ padding: '3rem', borderRadius: '12px', border: '1px solid var(--bg-border)' }}>
          <div className="mono text-muted" style={{ marginBottom: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <span className="text-accent">CLIENT:</span> {projectTitle}
            </div>
            <div>
              <span className="text-accent">STATUS:</span> DEPLOYED
            </div>
            <div>
              <span className="text-accent">YEAR:</span> 2025
            </div>
          </div>

          <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '3rem' }}>
            This is a placeholder case study page for {projectTitle}. The comprehensive data file detailing the specific
            challenges, solutions, architectures, and development timelines has not yet been loaded into the system core.
            Future updates will parse the detailed markdown case studies into this view.
          </p>

          <h3 className="mono" style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>SYSTEM_ARCHITECTURE</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
              <MonitorSmartphone className="text-accent" style={{ marginBottom: '1rem' }} />
              <h4 className="mono" style={{ marginBottom: '0.5rem' }}>FRONTEND_LAYER</h4>
              <ul className="text-muted text-sm space-y-2">
                <li>{'>'} React Framework</li>
                <li>{'>'} State Management</li>
                <li>{'>'} WebGL Graphics</li>
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
              <Server className="text-accent" style={{ marginBottom: '1rem' }} />
              <h4 className="mono" style={{ marginBottom: '0.5rem' }}>BACKEND_NODE</h4>
              <ul className="text-muted text-sm space-y-2">
                <li>{'>'} REST API</li>
                <li>{'>'} Authentication</li>
                <li>{'>'} Database Engine</li>
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <button className="btn btn-primary mono" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              VIEW_LIVE_DEPLOYMENT <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default CaseStudy;
