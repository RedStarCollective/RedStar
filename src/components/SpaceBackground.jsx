import React, { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const stars = [];
    let animationFrameId;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars(); // Recreate stars when canvas is resized
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create stars
    function initStars() {
      stars.length = 0; // Clear existing stars
      const starCount = Math.floor((canvas.width * canvas.height) / 10000); // Adjust density
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          color: `rgba(255, 255, 255, ${0.3 + Math.random() * 0.7})`,
          blinkSpeed: 0.002 + Math.random() * 0.01,
          blinkOffset: Math.random() * Math.PI * 2, // Random starting point
          isRed: Math.random() < 0.15 // 15% chance of being a red star
        });
      }
      
      // Add a few larger, redder stars to hint at the Red Star theme
      for (let i = 0; i < starCount / 20; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 1 + Math.random() * 2,
          color: `rgba(255, ${50 + Math.random() * 100}, ${50 + Math.random() * 80}, ${0.5 + Math.random() * 0.5})`,
          blinkSpeed: 0.003 + Math.random() * 0.005,
          blinkOffset: Math.random() * Math.PI * 2,
          isRed: true
        });
      }
    }
    
    // Animate stars
    function animate(timestamp) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        const blinkFactor = Math.sin((timestamp * star.blinkSpeed) + star.blinkOffset) * 0.2 + 0.8;
        
        ctx.beginPath();
        
        if (star.isRed) {
          // Draw red stars with a slight glow
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0, 
            star.x, star.y, star.size * 4
          );
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
          
          ctx.fillStyle = gradient;
          ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Draw the core of the star
        ctx.beginPath();
        ctx.fillStyle = star.isRed ? 
          `rgba(255, ${70 + Math.random() * 80}, ${50 + Math.random() * 50}, ${blinkFactor})` : 
          `rgba(255, 255, 255, ${blinkFactor})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 w-full h-full pointer-events-none"
      style={{ backgroundColor: 'transparent' }}
    />
  );
};

export default SpaceBackground;