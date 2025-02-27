import React, { useState, useEffect } from 'react';
import { Radio, Eye, EyeOff } from 'lucide-react';

const TerminalStatusBar = ({ isOfflineMode, toggleOfflineMode }) => {
  const [terminalText, setTerminalText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullTerminalText = 'COLLECTIVE://SECURE.CONNECTION.ESTABLISHED...';
  
  // Simulate terminal typing effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTerminalText(fullTerminalText.substring(0, index));
      index++;
      if (index > fullTerminalText.length) {
        clearInterval(timer);
        
        // Start blinking cursor after text is complete
        const cursorTimer = setInterval(() => {
          setShowCursor(prev => !prev);
        }, 500);
        
        return () => clearInterval(cursorTimer);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);
  
  // Generate random packet data for the status display
  const getRandomPacket = () => {
    return Math.floor(Math.random() * 999).toString().padStart(3, '0');
  };

  // Status indicators
  const [packetData, setPacketData] = useState({
    sent: getRandomPacket(),
    received: getRandomPacket(),
    lost: '000'
  });
  
  // Update packet data periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setPacketData({
        sent: (parseInt(packetData.sent) + Math.floor(Math.random() * 10)).toString().padStart(3, '0'),
        received: (parseInt(packetData.received) + Math.floor(Math.random() * 10)).toString().padStart(3, '0'),
        lost: Math.floor(Math.random() * 5).toString().padStart(3, '0')
      });
    }, 2000);
    
    return () => clearInterval(timer);
  }, [packetData]);

  return (
    <div className="bg-black border-b border-red-900 py-1 px-4 font-mono text-xs text-red-500 flex justify-between items-center overflow-hidden relative z-10">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Radio size={14} className="mr-2 animate-pulse" />
          <span>{terminalText}</span>
          {showCursor && <span className="animate-pulse">█</span>}
        </div>
        
        <div className="hidden md:flex items-center border-l border-red-900/30 pl-4 ml-2">
          <span className="text-gray-600 mr-1">PING:</span>
          <span className="text-green-500">32ms</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2 text-xs">
          <span className="text-gray-600">PKT:</span>
          <span className="text-green-500">{packetData.sent}</span>
          <span className="text-gray-600">/</span>
          <span className="text-green-500">{packetData.received}</span>
          <span className="text-gray-600">/</span>
          <span className={packetData.lost === '000' ? 'text-green-500' : 'text-red-500'}>{packetData.lost}</span>
        </div>
        
        <div className="flex items-center border-l border-red-900/30 pl-4">
          <button
            onClick={toggleOfflineMode}
            className="flex items-center group"
          >
            {isOfflineMode ? (
              <>
                <EyeOff size={12} className="text-green-500 mr-1 group-hover:text-green-400" /> 
                <span className="group-hover:text-green-400">OFFLINE_MODE</span>
              </>
            ) : (
              <>
                <Eye size={12} className="text-blue-500 mr-1 group-hover:text-blue-400" /> 
                <span className="group-hover:text-blue-400">ONLINE_MODE</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerminalStatusBar;
