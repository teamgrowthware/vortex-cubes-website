import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper section container">
      <div className="footer-grid">

        {/* Column 1: Brand */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <div className="vc-circle">VC</div>
            <span className="brand-text">VORTEXCUBES</span>
          </div>
          <p className="footer-desc text-muted">
            Your trusted partner for comprehensive IT solutions and product development. We build custom software that drives business growth.
          </p>
        </div>

        {/* Column 2: Services */}
        <div className="footer-col">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><a href="/#services">Web Development</a></li>
            <li><a href="/#services">App Development</a></li>
            <li><a href="/#services">ERP Solutions</a></li>
            <li><a href="/#services">CRM Solutions</a></li>
            <li><a href="/#services">AI & Automation</a></li>
            <li><a href="/#services">Cloud & Security</a></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div className="footer-col">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><a href="/#about">About Us</a></li>
            <li><a href="/#portfolio">Portfolio</a></li>
            <li><a href="/#contact">Contact</a></li>
            <li><a href="/#services">Services</a></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-contact-info">
            <li>
              <Mail size={16} />
              <a href="mailto:info@vortexcubes.com">info@vortexcubes.com</a>
            </li>
            <li>
              <Phone size={16} />
              <div>
                <a href="tel:+917049820057">+91 7049820057</a>
              </div>
            </li>
            <li className="address-line">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <span>106, Navrang Plaza, Tower Squre<br />Sapna Sangeeta Rd, Indore, M.P - 452010</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="mono text-muted text-sm">© {(new Date()).getFullYear()} VORTEX CUBES // ALL RIGHTS RESERVED</p>
        <div className="footer-legal mono text-muted text-sm">
          <a href="/privacy">PRIVACY_POLICY</a>
          <a href="/terms">TERMS_OF_SERVICE</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
