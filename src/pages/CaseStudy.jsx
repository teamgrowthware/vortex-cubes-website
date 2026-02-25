import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MonitorSmartphone, Server, ExternalLink } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { projectsData } from '../data/projects';

const CaseStudy = () => {
  const { id } = useParams();

  // Scroll to top when loading page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find the specific project data based on URL parameter
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return (
      <PageTransition>
        <main className="section container" style={{ paddingTop: '8rem', minHeight: '100vh', textAlign: 'center' }}>
          <h1 className="hero-title text-accent">404 // DATA_NOT_FOUND</h1>
          <p className="text-muted" style={{ marginTop: '2rem' }}>The requested project record does not exist in the mainframe.</p>
          <Link to="/#portfolio" className="btn btn-primary" style={{ marginTop: '3rem', display: 'inline-block' }}>RETURN_TO_PORTFOLIO</Link>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main className="section container" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <Link to="/#portfolio" className="btn btn-secondary mono" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <ArrowLeft size={16} /> RETURN_TO_SYSTEM
          </Link>
          <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <span className="text-accent">PROJECT //</span> {project.name}
          </h1>
          <div className="header-line"></div>
        </div>

        <div className="glass-panel" style={{ padding: '3rem', borderRadius: '12px', border: '1px solid var(--bg-border)' }}>
          <div className="mono text-muted" style={{ marginBottom: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <span className="text-accent">CLIENT:</span> {project.client}
            </div>
            <div>
              <span className="text-accent">STATUS:</span> DEPLOYED
            </div>
            <div>
              <span className="text-accent">YEAR:</span> {project.year}
            </div>
            <div>
              <span className="text-accent">TYPE:</span> {project.type}
            </div>
          </div>

          <p className="text-muted" style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '3rem' }}>
            {project.caseStudyText}
          </p>

          <h3 className="mono" style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>SYSTEM_ARCHITECTURE</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
              <MonitorSmartphone className="text-accent" style={{ marginBottom: '1rem' }} />
              <h4 className="mono" style={{ marginBottom: '0.5rem' }}>FRONTEND_LAYER</h4>
              <ul className="text-muted text-sm space-y-2">
                <li>{'>'} {project.techStack[0] || 'Modern UI Framework'}</li>
                <li>{'>'} State Management</li>
                <li>{'>'} Responsive Design</li>
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
              <Server className="text-accent" style={{ marginBottom: '1rem' }} />
              <h4 className="mono" style={{ marginBottom: '0.5rem' }}>BACKEND_NODE</h4>
              <ul className="text-muted text-sm space-y-2">
                <li>{'>'} {project.techStack[1] || 'REST API'}</li>
                <li>{'>'} {project.techStack[2] || 'Database Engine'}</li>
                <li>{'>'} Authentication</li>
              </ul>
            </div>
          </div>

          {/* The ACCESS_SECURE_PORTAL button has been removed by user request */}
        </div>
      </main>
    </PageTransition>
  );
};

export default CaseStudy;
