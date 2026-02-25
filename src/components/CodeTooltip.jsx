import React, { useState, useEffect } from 'react';
import './CodeTooltip.css';

const CodeTooltip = () => {
  const [tooltipData, setTooltipData] = useState(null);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-code-tooltip]');
      if (target) {
        const snippet = target.getAttribute('data-code-tooltip');
        setTooltipData(snippet);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('[data-code-tooltip]');
      if (target) {
        setTooltipData(null);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (!tooltipData) return null;

  return (
    <div className="code-tooltip glass-panel mono">
      <div className="tooltip-header text-muted">{'// system_action'}</div>
      <pre>
        <code>
          {tooltipData}
        </code>
      </pre>
    </div>
  );
};

export default CodeTooltip;
