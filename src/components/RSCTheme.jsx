import React from 'react';
import SpaceBackground from './SpaceBackground';

const RSCTheme = ({ children }) => {
  return (
    <>
      {/* Import fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&display=swap');
        
        /* Apply fonts to elements */
        h1, h2, h3, h4, h5, h6, .font-mono {
          font-family: 'Orbitron', sans-serif;
        }
        
        body, p, div, span {
          font-family: 'Barlow', sans-serif;
        }
        
        code, pre, .terminal, [class*="code"] {
          font-family: 'JetBrains Mono', monospace;
        }
        
        /* Red Star symbol styling */
        .red-star::before {
          content: "✪";
          color: #ef4444;
          margin-right: 0.25rem;
          display: inline-block;
          transform: rotate(0deg);
          transition: transform 3s ease-in-out;
        }
        
        .red-star:hover::before {
          transform: rotate(360deg);
        }
        
        /* Add subtle grid lines to complement the space theme */
        .bg-grid-overlay {
          background-image: 
            linear-gradient(to right, rgba(255, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }
        
        /* Terminal text effect for mono elements */
        .terminal-text {
          position: relative;
          display: inline-block;
          color: #ef4444;
        }
        
        .terminal-text::after {
          content: "";
          position: absolute;
          right: -10px;
          top: 0;
          width: 8px;
          height: 100%;
          background-color: #ef4444;
          animation: cursor-blink 1s step-end infinite;
        }
        
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        /* Red glow effect for important elements */
        .red-glow {
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
          transition: box-shadow 0.3s ease;
        }
        
        .red-glow:hover {
          box-shadow: 0 0 25px rgba(239, 68, 68, 0.5);
        }
      `}</style>
      
      {/* Add the animated space background */}
      <SpaceBackground />
      
      {/* Add the grid overlay */}
      <div className="bg-grid-overlay"></div>
      
      {/* Render children with these styles applied */}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
};

export default RSCTheme;