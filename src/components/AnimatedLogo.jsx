import React from 'react';

const AnimatedRSCLogo = ({ size = 'medium' }) => {
  // Size classes based on the size prop
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl'
  };
  
  const sizes = {
    small: {
      width: '100px',
      height: '70px'
    },
    medium: {
      width: '200px',
      height: '140px'
    },
    large: {
      width: '300px',
      height: '210px'
    }
  };

  return (
    <div className="relative inline-block">
      {/* ASCII Logo */}
      <pre className={`font-mono text-red-500 leading-none ${sizeClasses[size]} relative z-10`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
{`██████╗ ███████╗ ██████╗    ███████╗████████╗ █████╗ ██████╗ 
██╔══██╗██╔════╝██╔═══██╗   ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗
██████╔╝█████╗  ██║   ██║   ███████╗   ██║   ███████║██████╔╝
██╔══██╗██╔══╝  ██║   ██║   ╚════██║   ██║   ██╔══██║██╔══██╗
██║  ██║███████╗╚██████╔╝██╗███████║   ██║   ██║  ██║██║  ██║
╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝`}
      </pre>
      
      {/* Animated glow effect */}
      <div 
        className="absolute top-0 left-0 w-full h-full rounded-lg filter blur-md"
        style={{
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, rgba(0, 0, 0, 0) 70%)',
          animation: 'pulse 3s ease-in-out infinite',
          zIndex: 1
        }}
      ></div>
      
      {/* Red star with animation */}
      <div 
        className="absolute -top-5 -right-5 transform rotate-12"
        style={{
          animation: 'starPulse 4s ease-in-out infinite',
          zIndex: 20
        }}
      >
        <div className="text-3xl text-red-500 font-bold" style={{ textShadow: '0 0 10px rgba(239, 68, 68, 0.7)' }}>✪</div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        
        @keyframes starPulse {
          0%, 100% {
            transform: rotate(12deg) scale(1);
            filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.7));
          }
          50% {
            transform: rotate(20deg) scale(1.2);
            filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.9));
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedRSCLogo;