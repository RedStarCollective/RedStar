// RevolutionaryBackgroundElements.jsx
// These SVG elements can be added to the background for enhanced revolutionary symbolism
import React from 'react';

export const RevolutionaryBackgroundElements = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Hammer and Sickle motif - positioned at bottom right with low opacity */}
      <svg 
        className="absolute bottom-0 right-0 w-64 h-64 text-red-900 opacity-5 transform translate-x-1/4 translate-y-1/4"
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M35,10 L35,35 L25,45 C15,55 15,65 25,75 C35,85 45,85 55,75 L65,65 L90,90 L95,85 L70,60 L80,50 C90,40 90,30 80,20 C70,10 60,10 50,20 L40,30 L10,30 L10,35 L35,35" 
          fill="currentColor"
        />
      </svg>
      
      {/* Raised Fist - positioned at top left */}
      <svg 
        className="absolute top-0 left-0 w-48 h-48 text-red-900 opacity-5 transform -translate-x-1/4 -translate-y-1/4"
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M45,100 L45,65 L30,65 L30,45 C30,40 35,35 40,35 L40,25 C40,20 45,15 50,15 L50,10 C50,5 55,0 60,0 C65,0 70,5 70,10 L70,20 C75,20 80,25 80,30 L80,40 C85,40 90,45 90,50 L90,80 C90,90 80,100 70,100 L45,100" 
          fill="currentColor"
        />
      </svg>
      
      {/* Red Star - centered in background with pulse animation */}
      <svg 
        className="absolute top-1/2 left-1/2 w-96 h-96 text-red-900 opacity-3 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M50,0 L61.8,38.2 L100,38.2 L69.1,61.8 L80.9,100 L50,76.4 L19.1,100 L30.9,61.8 L0,38.2 L38.2,38.2 Z" 
          fill="currentColor"
        />
      </svg>
      
      {/* Grid pattern overlay with red lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
};

// SecurityAnimations.jsx
// Visual cues for security status and encryption animations
export const EncryptionAnimation = ({ isActive = true }) => {
  if (!isActive) return null;
  
  return (
    <div className="encryption-animation relative overflow-hidden w-full h-8 bg-black border border-red-900/50 rounded-lg mb-4">
      <div className="absolute inset-0 encryption-lines"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-mono text-red-500 z-10 px-2 bg-black">ENCRYPTION ACTIVE</span>
      </div>
      
      {/* Encryption animation CSS */}
      <style jsx>{`
        .encryption-lines {
          background: linear-gradient(0deg, transparent 24%, rgba(187, 21, 21, 0.3) 25%, rgba(187, 21, 21, 0.3) 26%, transparent 27%, transparent 74%, rgba(187, 21, 21, 0.3) 75%, rgba(187, 21, 21, 0.3) 76%, transparent 77%, transparent);
          background-size: 60px 60px;
          height: 140%;
          width: 200%;
          left: -50%;
          animation: encryption-scroll 3s linear infinite;
        }
        
        @keyframes encryption-scroll {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-30px) translateX(30px); }
        }
      `}</style>
    </div>
  );
};

// Security status indicator component
export const SecurityStatus = ({ level = 'secure' }) => {
  // Define colors and text based on security level
  const config = {
    secure: { color: 'green', text: 'SECURE CONNECTION' },
    warning: { color: 'yellow', text: 'POTENTIAL MONITORING' },
    danger: { color: 'red', text: 'CONNECTION COMPROMISED' },
    offline: { color: 'blue', text: 'OFFLINE MODE' }
  };
  
  const { color, text } = config[level] || config.secure;
  
  return (
    <div className={`flex items-center px-2 py-1 bg-${color}-900/20 border border-${color}-900/50 rounded-lg text-${color}-500 text-xs font-mono`}>
      <div className={`w-2 h-2 bg-${color}-500 rounded-full mr-2 animate-pulse`}></div>
      {text}
    </div>
  );
};

// AgitpropHeader.jsx
// Propaganda-inspired section headers with constructivist styling
export const AgitpropHeader = ({ title, icon, color = 'red' }) => {
  return (
    <div className={`relative bg-${color}-900/30 border-2 border-${color}-900 rounded-lg overflow-hidden mb-6`}>
      {/* Diagonal stripes in background */}
      <div className="absolute inset-0 bg-stripes opacity-20"></div>
      
      <div className="relative p-4 flex items-center">
        {/* Left side design element */}
        <div className={`absolute left-0 top-0 w-16 h-full bg-${color}-900/50 skew-x-12 -ml-6`}></div>
        
        {/* Title with icon */}
        <div className="flex items-center ml-4">
          <div className={`w-10 h-10 bg-black border-2 border-${color}-500 rounded-full flex items-center justify-center transform -rotate-12`}>
            {icon}
          </div>
          <h2 className="ml-4 font-mono text-xl font-bold text-white">
            {title}
          </h2>
        </div>
        
        {/* Decorative elements */}
        <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-1 bg-${color}-500`}></div>
        <div className={`absolute right-8 top-1/2 transform -translate-y-1/2 -rotate-45 w-8 h-1 bg-${color}-500`}></div>
      </div>
      
      {/* CSS for diagonal stripes */}
      <style jsx>{`
        .bg-stripes {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.1) 20px
          );
        }
      `}</style>
    </div>
  );
};

// Add to tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//       },
//       opacity: {
//         '3': '0.03',
//       },
//     },
//   },
// };