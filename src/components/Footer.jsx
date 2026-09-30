import React from 'react';

/**
 * Footer Component
 * Shows academic project credits, tech stack highlights, and copyright.
 */
export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-credits">
        <span>TaskFlow &copy; 2026. Academic Full-Stack React Project.</span>
      </div>
      <div className="footer-badges">
        <span>Built with <strong>React 19</strong> + <strong>Vite</strong> + <strong>Vanilla CSS3</strong></span>
      </div>
    </footer>
  );
}
