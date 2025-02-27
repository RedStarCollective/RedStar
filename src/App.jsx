import React, { useState, useEffect } from 'react';
import { AlertTriangle, Calendar, FileText, Users, Shield, MessageSquare, Star, MapPin, Heart, BookOpen, Menu, X, Bell, Lock, Terminal, Eye, Database, Radio, Filter, Wifi, WifiOff, Map, Send, AlertCircle, Download, Zap, Activity } from 'lucide-react';
import PersonnelProfiles from './components/PersonnelProfiles';
import RevolutionaryDevelopment from './components/RevolutionaryDevelopment';
import DualPowerStrategy from './components/DualPowerStrategy';
import MedicalResources from './components/MedicalResources';
import CommunityReporting from './components/CommunityReporting';
import DirectActionCoordination from './components/DirectActionCoordination';
import ResourceLibrary from './components/ResourceLibrary';
import SuccessStories from './components/SuccessStories';
import ImprovedNavigation from './components/ImprovedNavigation';
import ContentHeader from './components/ContentHeader';
import MutualAid from './components/MutualAid';
import EncryptedComms from './components/EncryptedComms';
import EmergencyProtocols from './components/EmergencyProtocols';

const RSCWebsite = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState('alerts');
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [showMessagePanel, setShowMessagePanel] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [showEmergencyProtocols, setShowEmergencyProtocols] = useState(false);
  
  // ASCII art for header
  const asciiLogo = `
██████╗ ███████╗ ██████╗    ███████╗████████╗ █████╗ ██████╗ 
██╔══██╗██╔════╝██╔═══██╗   ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗
██████╔╝█████╗  ██║   ██║   ███████╗   ██║   ███████║██████╔╝
██╔══██╗██╔══╝  ██║   ██║   ╚════██║   ██║   ██╔══██║██╔══██╗
██║  ██║███████╗╚██████╔╝██╗███████║   ██║   ██║  ██║██║  ██║
╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
  `;
  
  // Simulate terminal typing effect
  const [terminalText, setTerminalText] = useState('');
  const fullTerminalText = 'COLLECTIVE://SECURE.CONNECTION.ESTABLISHED...';
  
  // Messages for secure messaging component
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Iō', content: 'Defense Committee meeting moved to 21:00 tonight. Same location.', time: '15:42', isEncrypted: true },
    { id: 2, sender: 'Minata', content: 'Need medical supplies at the clinic. Continental Brands security active on Routes B and C. Take Route A.', time: '16:03', isEncrypted: true },
    { id: 3, sender: 'Le Fou', content: 'Night Market confirmed for 22:00 at location DELTA. Spread the word.', time: '16:30', isEncrypted: true }
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  // Emergency protocols data
  const emergencyProtocols = [
    { id: 1, name: 'CORPORATE_RAID', description: 'Immediate dispersal and comms blackout. Activate safe houses.', status: 'ready' },
    { id: 2, name: 'MEDICAL_EMERGENCY', description: 'Route all medical personnel to crisis location. Secure supply corridors.', status: 'ready' },
    { id: 3, name: 'EVACUATION_ALPHA', description: 'Full evacuation of The People\'s Center. Meet at secondary locations.', status: 'ready' },
    { id: 4, name: 'SUPPLY_CHAIN_BREAK', description: 'Activate emergency rations and alternative distribution network.', status: 'ready' }
  ];
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTerminalText(fullTerminalText.substring(0, index));
      index++;
      if (index > fullTerminalText.length) {
        clearInterval(timer);
      }
    }, 50);
    
    // Random global glitch effect
    const glitchTimer = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 150);
    }, 5000);
    
    // Check for offline capabilities
    if ('serviceWorker' in navigator) {
      // This would actually register a service worker for offline functionality
      // but we're just simulating it for the fictional app
      console.log('Service workers supported');
    }
    
    return () => {
      clearInterval(timer);
      clearInterval(glitchTimer);
    };
  }, []);
  
  // Fictional alert data
  const alerts = [
    { id: 1, type: 'danger', area: 'South Night City', title: 'Militech security sweep', description: 'Heavy corporate presence reported on blocks 15-22. Avoid area if possible.', time: '15 min ago' },
    { id: 2, type: 'warning', area: 'Heywood', title: 'Medical supplies needed', description: 'The People\'s Clinic is low on antibiotics and bandages.', time: '1 hour ago' },
    { id: 3, type: 'info', area: 'Watson', title: 'Night Market location', description: 'Tonight\'s mutual aid distribution at the old factory on 7th.', time: '3 hours ago' },
  ];
  
  // Fictional events data
  const events = [
    { id: 1, title: 'Community Defense Training', location: 'The Wuguan', date: 'Feb 26th - 18:00', organizer: 'Sorry', attendees: 12 },
    { id: 2, title: 'Political Education Session', location: 'People\'s Center Library', date: 'Feb 27th - 19:00', organizer: 'Dai-Yu Wu', attendees: 8 },
    { id: 3, title: 'Mutual Aid Distribution', location: 'East Side Community Hub', date: 'Feb 28th - 16:00', organizer: 'Chan-Woo Park', attendees: 20 },
  ];
  
  const committees = [
    { id: 1, name: 'Defense Committee', leader: 'Sorry', members: 8, meetings: 'Mondays, 20:00' },
    { id: 2, name: 'Health Committee', leader: 'Minata Tindano', members: 12, meetings: 'Tuesdays, 18:00' },
    { id: 3, name: 'Education Committee', leader: 'Dai-Yu Wu', members: 10, meetings: 'Wednesdays, 19:00' },
    { id: 4, name: 'Logistics Committee', leader: 'Nomar Otero', members: 7, meetings: 'Thursdays, 18:00' },
    { id: 5, name: 'Cultural Committee', leader: 'Sandy', members: 9, meetings: 'Fridays, 20:00' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  return (
    <div className={`min-h-screen bg-black text-white ${glitchEffect ? 'opacity-95' : ''}`}>
      {/* Cyberpunk background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-red-900 opacity-5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-red-600 opacity-5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Circuit-like paths */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,100 L200,100 L200,200 L400,200 L400,300 L600,300 L600,400" stroke="red" strokeWidth="2" fill="none" />
            <path d="M800,0 L800,200 L600,200 L600,400 L400,400 L400,600" stroke="red" strokeWidth="2" fill="none" />
            <path d="M0,400 L200,400 L200,500 L400,500 L400,600 L600,600" stroke="gold" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-red-900">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <pre className="text-xs font-mono text-red-500 leading-none">
                {asciiLogo}
              </pre>
            </div>
            <span className="md:hidden text-xl font-mono text-red-500 font-bold tracking-wide">
              ✪ RED_STAR.COL ✪
            </span>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <button className="flex items-center space-x-1 px-3 py-1 bg-red-700 border border-red-500 rounded font-mono hover:bg-red-600 text-white">
              <Bell size={16} />
              <span>ALERTS</span>
            </button>
            <a href="#" className="font-mono text-red-400 hover:text-red-300">ABOUT</a>
            <a href="#" className="font-mono text-red-400 hover:text-red-300">RESOURCES</a>
            <a href="#" className="font-mono text-red-400 hover:text-red-300">EVENTS</a>
            {isLoggedIn ? (
              <button className="px-3 py-1 bg-red-900 border border-red-700 rounded font-mono hover:bg-red-800">
                MEMBER_ACCESS
              </button>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="px-3 py-1 bg-red-900 border border-red-700 rounded font-mono hover:bg-red-800"
              >
                SECURE_LOGIN
              </button>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-red-500" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile navigation */}
        {showMobileMenu && (
          <div className="md:hidden px-4 py-3 bg-black border-t border-red-900 flex flex-col space-y-3 font-mono">
            <a href="#" className="text-red-400 hover:text-red-300">ALERTS</a>
            <a href="#" className="text-red-400 hover:text-red-300">ABOUT</a>
            <a href="#" className="text-red-400 hover:text-red-300">RESOURCES</a>
            <a href="#" className="text-red-400 hover:text-red-300">EVENTS</a>
            <a href="#" onClick={() => {setActiveTab('mutual'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">MUTUAL_AID</a>
<a href="#" onClick={() => {setActiveTab('comms'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">ENCRYPTED_COMMS</a>
<a href="#" onClick={() => {setActiveTab('emergency'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">EMERGENCY_PROTOCOLS</a>
            <a href="#" onClick={() => {setActiveTab('center'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">PEOPLES_CENTER</a>
<a href="#" onClick={() => {setActiveTab('dualpower'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">DUAL_POWER</a>
<a href="#" onClick={() => {setActiveTab('development'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">REVOLUTIONARY_DEVELOPMENT</a>
<a href="#" onClick={() => {setActiveTab('cadre'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">CORE_CADRE</a>
<a href="#" onClick={() => {setActiveTab('medical'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">MEDICAL_RESOURCES</a>
<a href="#" onClick={() => {setActiveTab('reporting'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">INTELLIGENCE_NETWORK</a>
<a href="#" onClick={() => {setActiveTab('action'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">DIRECT_ACTION</a>
<a href="#" onClick={() => {setActiveTab('resources'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">RESOURCE_LIBRARY</a>
<a href="#" onClick={() => {setActiveTab('victories'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">REVOLUTIONARY_VICTORIES</a>
            {isLoggedIn ? (
              <button className="px-3 py-1 bg-red-900 border border-red-700 rounded hover:bg-red-800">
                MEMBER_ACCESS
              </button>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="px-3 py-1 bg-red-900 border border-red-700 rounded hover:bg-red-800"
              >
                SECURE_LOGIN
              </button>
            )}
          </div>
        )}
      </header>

      {/* Terminal-like status bar */}
      <div className="bg-black border-b border-red-900 py-1 px-4 font-mono text-xs text-red-500 flex justify-between items-center overflow-hidden relative z-10">
        <div className="flex items-center">
          <Terminal size={14} className="mr-2" />
          <span>{terminalText}</span>
          <span className="animate-pulse">█</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>ENCRYPT_STATUS: ACTIVE</span>
          <span>LATENCY: 11ms</span>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Security Banner and Mode Toggles */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="p-3 bg-black border border-yellow-600 rounded-lg flex-grow flex items-center text-sm font-mono">
            <Lock className="mr-2 text-yellow-500" size={16} />
            <span>
              <span className="text-yellow-500 font-semibold">[SECURE CONNECTION ACTIVE]</span> • Communications encrypted through REROUTED_PROXY_CHAIN
            </span>
          </div>
          
          <div className="flex gap-2">
            {/* Offline Mode Toggle */}
            <button 
              onClick={() => setIsOfflineMode(!isOfflineMode)} 
              className={`p-2 rounded-lg border font-mono text-xs flex items-center ${isOfflineMode ? 'bg-yellow-900/30 border-yellow-600 text-yellow-400' : 'bg-black border-gray-700 text-gray-400'}`}
            >
              {isOfflineMode ? <WifiOff size={16} className="mr-1" /> : <Wifi size={16} className="mr-1" />}
              {isOfflineMode ? 'OFFLINE_MODE' : 'GO_OFFLINE'}
            </button>
            
            {/* Emergency Protocols Button */}
            <button 
              onClick={() => setShowEmergencyProtocols(!showEmergencyProtocols)}
              className="p-2 rounded-lg bg-black border border-red-700 text-red-500 font-mono text-xs flex items-center hover:bg-red-900/20"
            >
              <AlertCircle size={16} className="mr-1" />
              EMERGENCY
            </button>
            
            {/* Messages Button */}
            <button 
              onClick={() => setShowMessagePanel(!showMessagePanel)}
              className="p-2 rounded-lg bg-black border border-red-700 text-red-500 font-mono text-xs flex items-center hover:bg-red-900/20 relative"
            >
              <MessageSquare size={16} className="mr-1" />
              COMMS
              <span className="absolute -top-1 -right-1 bg-red-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {messages.length}
              </span>
            </button>
          </div>
        </div>
        
        {/* Emergency Protocols Panel */}
        {showEmergencyProtocols && (
          <div className="mb-6 p-4 bg-black border-2 border-red-700 rounded-lg animate-pulse">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono text-red-500 font-bold flex items-center">
                <AlertCircle size={16} className="mr-2" />
                EMERGENCY_PROTOCOLS
              </h3>
              <button 
                onClick={() => setShowEmergencyProtocols(false)}
                className="text-red-500"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {emergencyProtocols.map(protocol => (
                <div key={protocol.id} className="border border-red-800 rounded p-3 bg-black">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-mono text-red-500 font-bold">{protocol.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded ${protocol.status === 'ready' ? 'bg-green-900/30 text-green-500' : 'bg-yellow-900/30 text-yellow-500'}`}>
                      {protocol.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm mb-3">{protocol.description}</p>
                  <button className="w-full p-2 bg-red-900 border border-red-700 text-white font-mono text-sm rounded hover:bg-red-800 flex items-center justify-center">
                    <Zap size={14} className="mr-1" />
                    ACTIVATE
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Secure Messaging Panel */}
        {showMessagePanel && (
          <div className="mb-6 p-4 bg-black border-2 border-red-700 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-mono text-red-500 font-bold flex items-center">
                <MessageSquare size={16} className="mr-2" />
                SECURE_COMMUNICATIONS
              </h3>
              <div className="flex items-center">
                <span className="text-xs text-green-500 mr-2">E2E ENCRYPTED</span>
                <button 
                  onClick={() => setShowMessagePanel(false)}
                  className="text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            <div className="border border-red-900 bg-black rounded h-64 mb-3 p-2 overflow-y-auto font-mono">
              {messages.map(msg => (
                <div key={msg.id} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-red-500 font-bold">{msg.sender}</span>
                    <div className="flex items-center">
                      <span className="text-gray-500">{msg.time}</span>
                      {msg.isEncrypted && <Lock size={10} className="ml-1 text-green-500" />}
                    </div>
                  </div>
                  <div className="p-2 bg-gray-900 rounded text-sm">
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex">
              <input 
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type secure message..."
                className="flex-grow bg-black border border-red-900 rounded-l p-2 text-sm focus:outline-none focus:border-red-700"
              />
              <button className="bg-red-900 border border-red-700 border-l-0 rounded-r px-3 text-white flex items-center">
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      
{/* Improved Navigation Component */}
<ImprovedNavigation 
  activeTab={activeTab} 
  setActiveTab={setActiveTab} 
  isLoggedIn={isLoggedIn} 
  setShowLoginModal={setShowLoginModal}
/>

        {/* Tab Content */}
        {activeTab === 'map' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-mono text-red-500 font-bold">[ NIGHT_CITY_THREAT_MAP ]</h2>
              <div className="flex items-center">
                <span className="text-xs text-red-500 mr-2 animate-pulse">LIVE_UPDATE</span>
                <button className="px-3 py-1 bg-black border border-red-700 rounded hover:bg-red-900/30 text-sm flex items-center font-mono">
                  <Download size={14} className="mr-1" />
                  OFFLINE_COPY
                </button>
              </div>
            </div>
            
            <div className="border-2 border-red-900 rounded-lg p-4 bg-black text-center h-96 flex items-center justify-center">
              <div className="text-red-500 font-mono">
                <Map size={48} className="mx-auto mb-4 opacity-50" />
                <p>MAP_INTERFACE_PLACEHOLDER</p>
                <p className="text-xs mt-2">Waiting for reference image to implement interactive threat map</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-mono text-red-500 font-bold">[ COMMUNITY_ALERTS ]</h2>
              <button className="px-3 py-1 bg-red-900 border border-red-700 rounded hover:bg-red-800 text-sm flex items-center font-mono">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                NEW_ALERT
              </button>
            </div>
            
            <div className="space-y-4">
              {alerts.map(alert => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border relative overflow-hidden ${
                    alert.type === 'danger' ? 'border-red-700 bg-black' : 
                    alert.type === 'warning' ? 'border-yellow-700 bg-black' : 
                    'border-blue-700 bg-black'
                  }`}
                  // Added glitch effect on hover
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.classList.add('glitch-effect');
                    setTimeout(() => el.classList.remove('glitch-effect'), 300);
                  }}
                >
                  {/* Diagonal stripes background for visual effect */}
                  <div className={`absolute inset-0 opacity-5 stripe-bg ${
                    alert.type === 'danger' ? 'bg-red-500' : 
                    alert.type === 'warning' ? 'bg-yellow-500' : 
                    'bg-blue-500'
                  }`}></div>
                  
                  <div className="flex justify-between relative">
                    <h3 className={`font-mono font-bold ${
                      alert.type === 'danger' ? 'text-red-500' : 
                      alert.type === 'warning' ? 'text-yellow-500' : 
                      'text-blue-500'
                    }`}>{alert.title}</h3>
                    <span className="text-xs opacity-70 font-mono">{alert.time}</span>
                  </div>
                  <div className="text-sm opacity-80 mb-2 font-mono relative">
                    <MapPin size={12} className="inline mr-1" />
                    {alert.area}
                  </div>
                  <p className="text-sm relative">{alert.description}</p>
                  
                  <div className="mt-3 flex justify-between">
                    <div className={`text-xs px-2 py-1 rounded font-mono ${
                      alert.type === 'danger' ? 'bg-red-900/30 text-red-400' : 
                      alert.type === 'warning' ? 'bg-yellow-900/30 text-yellow-400' : 
                      'bg-blue-900/30 text-blue-400'
                    }`}>
                      {alert.type.toUpperCase()}_LEVEL_THREAT
                    </div>
                    
                    {/* Quick Response Button */}
                    <button className="px-2 py-1 bg-red-900 border border-red-700 hover:bg-red-800 rounded text-xs font-mono flex items-center">
                      <Activity size={12} className="mr-1" />
                      RESPOND
                    </button>
                  </div>
                  
                  {/* Offline availability indicator */}
                  {isOfflineMode && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-green-900/30 text-green-500 text-xs px-1 py-0.5 rounded font-mono flex items-center">
                        <Download size={10} className="mr-1" />
                        SAVED
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-mono text-red-500 font-bold">[ UPCOMING_EVENTS ]</h2>
              <button className="px-3 py-1 bg-red-900 border border-red-700 rounded hover:bg-red-800 text-sm flex items-center font-mono">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                NEW_EVENT
              </button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {events.map(event => (
                <div key={event.id} className="p-4 rounded-lg bg-black border border-red-900">
                  <h3 className="font-bold text-red-500 font-mono">{event.title}</h3>
                  <div className="text-sm opacity-70 mt-2 space-y-1 font-mono">
                    <div className="flex items-start">
                      <Calendar size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-start">
                      <Users size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span>ORGANIZER: {event.organizer} • ATTENDEES: {event.attendees}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="px-2 py-1 bg-red-900 border border-red-700 hover:bg-red-800 rounded text-xs font-mono">
                      ATTEND
                    </button>
                    <button className="px-2 py-1 bg-black border border-red-700 hover:bg-red-900/30 rounded text-xs font-mono">
                      DETAILS
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'committees' && (
          <div>
            <h2 className="text-xl font-mono text-red-500 font-bold mb-4">[ WORKING_COMMITTEES ]</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-black border border-red-900 rounded-lg">
                <thead className="border-b border-red-700">
                  <tr className="font-mono text-red-500">
                    <th className="px-4 py-2 text-left">COMMITTEE_NAME</th>
                    <th className="px-4 py-2 text-left">LEADER</th>
                    <th className="px-4 py-2 text-left">MEMBERS</th>
                    <th className="px-4 py-2 text-left">MEETING_TIME</th>
                    <th className="px-4 py-2 text-left">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-900/30 font-mono">
                  {committees.map(committee => (
                    <tr key={committee.id}>
                      <td className="px-4 py-3">{committee.name}</td>
                      <td className="px-4 py-3">{committee.leader}</td>
                      <td className="px-4 py-3">{committee.members}</td>
                      <td className="px-4 py-3">{committee.meetings}</td>
                      <td className="px-4 py-3">
                        <button className="px-2 py-1 bg-red-900 border border-red-700 hover:bg-red-800 rounded text-xs">
                          JOIN
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {activeTab === 'education' && (
          <div>
            <h2 className="text-xl font-mono text-red-500 font-bold mb-4">[ POLITICAL_EDUCATION ]</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-black border border-red-900 rounded-lg p-4">
                <h3 className="font-bold text-red-500 mb-2 font-mono">THEORY_RESOURCES</h3>
                <p className="text-sm mb-3">Join our weekly discussion groups focused on revolutionary theory and practice.</p>
                <div className="text-xs text-red-500 mb-3 font-mono">NEXT_SESSION: Feb 27th - "State and Revolution"</div>
                <button className="px-3 py-1 bg-red-900 border border-red-700 rounded hover:bg-red-800 text-sm font-mono">
                  ACCESS_FILES
                </button>
              </div>
              
              <div className="bg-black border border-red-900 rounded-lg p-4">
                <h3 className="font-bold text-red-500 mb-2 font-mono">DEFENSE_TRAINING</h3>
                <p className="text-sm mb-3">Encrypted guides on community self-defense tactics and strategies.</p>
                <div className="text-xs text-red-500 mb-3 font-mono">UPDATED: Feb 22nd - "Urban Defense Networks"</div>
                <button className="px-3 py-1 bg-red-900 border border-red-700 rounded hover:bg-red-800 text-sm font-mono">
                  ACCESS_ARCHIVE
                </button>
              </div>
              
              <div className="bg-black border border-red-900 rounded-lg p-4">
                <h3 className="font-bold text-red-500 mb-2 font-mono">ORGANIZE_TACTICS</h3>
                <p className="text-sm mb-3">Learn effective methods for building power through mass work.</p>
                <div className="text-xs text-red-500 mb-3 font-mono">FEATURED: "Dual Power Structures in Night City"</div>
                <button className="px-3 py-1 bg-red-900 border border-red-700 rounded hover:bg-red-800 text-sm font-mono">
                  VIEW_RESOURCES
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'center' && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-mono text-red-500 font-bold">[ THE_PEOPLE'S_CENTER ]</h2>
    </div>
    
    <p className="text-sm text-gray-300 mb-4">
      The People's Center operates from a converted NCPD precinct in South Night City's university district. 
      This three-story facility serves as both our operational headquarters and a community resource hub.
    </p>
    
    <PeoplesCenterMap />
  </div>
)}

{activeTab === 'dualpower' && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-mono text-red-500 font-bold">[ DUAL_POWER_STRATEGY ]</h2>
    </div>
    
    <p className="text-sm text-gray-300 mb-4">
      The Red Star Collective builds revolutionary infrastructure while developing community power 
      to challenge existing institutions. Each program addresses immediate needs while creating 
      alternatives to corporate control.
    </p>
    
    <DualPowerStrategy />
  </div>
)}

{activeTab === 'development' && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-mono text-red-500 font-bold">[ REVOLUTIONARY_DEVELOPMENT ]</h2>
    </div>
    
    <p className="text-sm text-gray-300 mb-4">
      The Red Star Collective's development pathway transforms individual consciousness through 
      practical work and political education. Our three-tier system builds both security and 
      capacity while ensuring proper revolutionary development.
    </p>
    
    <RevolutionaryDevelopment />
  </div>
)}

{activeTab === 'cadre' && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-mono text-red-500 font-bold">[ CORE_CADRE_PROFILES ]</h2>
    </div>
    
    <p className="text-sm text-gray-300 mb-4">
      The Red Star Collective is led by a dedicated team of revolutionaries with diverse skills 
      and backgrounds. Our core cadre coordinates the organization's strategic direction and 
      day-to-day operations.
    </p>
    
    <PersonnelProfiles />
  </div>
)}
{activeTab === 'medical' && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-mono text-red-500 font-bold">[ MEDICAL_RESOURCES ]</h2>
    </div>
    
    <p className="text-sm text-gray-300 mb-4">
      The People's Clinic provides comprehensive healthcare based on need rather than ability to pay.
      Our medical programs address the unique health challenges faced by Combat Zone residents.
    </p>
    
    <MedicalResources />
  </div>
)}

{activeTab === 'reporting' && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-mono text-red-500 font-bold">[ INTELLIGENCE_NETWORK ]</h2>
    </div>
    
    <p className="text-sm text-gray-300 mb-4">
      Our community reporting system allows RSC members to share information about corporate activity,
      police movements, and other developments affecting South Night City.
    </p>
    
    <CommunityReporting />
  </div>
)}

{activeTab === 'action' && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-mono text-red-500 font-bold">[ DIRECT_ACTION_COORDINATION ]</h2>
    </div>
    
    <p className="text-sm text-gray-300 mb-4">
      The RSC coordinates direct action to address immediate community needs while building revolutionary consciousness.
      This system allows members to participate based on their security level and capacity.
    </p>
    
    <DirectActionCoordination />
  </div>
)}

{activeTab === 'resources' && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-mono text-red-500 font-bold">[ RESOURCE_LIBRARY ]</h2>
    </div>
    
    <p className="text-sm text-gray-300 mb-4">
      The RSC's resource library contains guides, manuals, and educational materials 
      developed through collective experience and revolutionary practice.
    </p>
    
    <ResourceLibrary />
  </div>
)}

{activeTab === 'victories' && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-mono text-red-500 font-bold">[ REVOLUTIONARY_VICTORIES ]</h2>
    </div>
    
    <p className="text-sm text-gray-300 mb-4">
      These case studies document successful RSC actions that have improved material conditions
      for South Night City residents while building revolutionary consciousness.
    </p>
    
    <SuccessStories />
  </div>
)}
{activeTab === 'mutual' && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-mono text-red-500 font-bold">[ MUTUAL_AID_NETWORK ]</h2>
    </div>
    
    <p className="text-sm text-gray-300 mb-4">
      The mutual aid network coordinates resource sharing and support among community members.
      Resources are distributed based on need rather than ability to pay.
    </p>
    
    <MutualAid />
  </div>
)}

{activeTab === 'comms' && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-mono text-red-500 font-bold">[ ENCRYPTED_COMMUNICATIONS ]</h2>
    </div>
    
    <p className="text-sm text-gray-300 mb-4">
      The RSC maintains secure communication channels for coordinating revolutionary activity.
      All messages are end-to-end encrypted and automatically deleted after 72 hours.
    </p>
    
    <EncryptedComms />
  </div>
)}

{activeTab === 'emergency' && (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-mono text-red-500 font-bold">[ EMERGENCY_PROTOCOLS ]</h2>
    </div>
    
    <p className="text-sm text-gray-300 mb-4">
      These protocols provide structured responses to various emergency scenarios.
      Only authorized personnel can activate these protocols in genuine emergency situations.
    </p>
    
    <EmergencyProtocols />
  </div>
)}
      </main>
      
      {/* Footer */}
      <footer className="bg-black border-t border-red-900 py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-xl font-bold mb-2 font-mono text-red-500">✪ RED_STAR.COLLECTIVE ✪</div>
              <div className="text-sm text-gray-400 font-mono">
                TERRITORY: A FEW BLOCKS IN SOUTH NIGHT CITY<br />
                HQ: THE PEOPLE'S CENTER
              </div>
            </div>
            <div className="text-sm text-gray-400 font-mono text-right">
              <div className="text-yellow-500">[SECURITY_STATUS: ACTIVE]</div>
              <div>E2E_ENCRYPTION: ENABLED</div>
              <div>NO_LOGS_KEPT | NO_DATA_STORED</div>
              <div className="text-red-500 mt-2">★ SOLIDARITY_FOREVER ★</div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-black border-2 border-red-900 rounded-lg max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowLoginModal(false)} 
              className="absolute top-3 right-3 text-red-500 hover:text-red-400"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-mono text-red-500 font-bold mb-6 text-center">[ SECURE_ACCESS ]</h2>
            
            <div className="mb-4 font-mono text-xs text-gray-500 border border-gray-800 bg-black p-2 rounded">
              <div>ESTABLISHING SECURE CHANNEL...</div>
              <div>ROUTING THROUGH: 89.157.xx.xx → 23.98.xx.xx → 107.23.xx.xx</div>
              <div>ENCRYPTION: AES-256 ENABLED</div>
              <div className="text-green-500">CONNECTION SECURE</div>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 font-mono text-red-500">USERNAME:</label>
                <input type="text" className="w-full bg-black border-2 border-red-800 rounded px-3 py-2 focus:outline-none focus:border-red-500 font-mono" />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1 font-mono text-red-500">PASSPHRASE:</label>
                <input type="password" className="w-full bg-black border-2 border-red-800 rounded px-3 py-2 focus:outline-none focus:border-red-500 font-mono" />
              </div>
              
              <div className="flex items-center justify-between text-sm mb-6 font-mono">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label htmlFor="remember" className="text-gray-400">TRUST_DEVICE</label>
                </div>
                <a href="#" className="text-red-500 hover:text-red-400">REQUEST_ACCESS</a>
              </div>
              
              <div className="flex flex-col space-y-3">
                <button 
                  type="submit"
                  className="w-full bg-red-900 border border-red-700 hover:bg-red-800 text-white py-2 rounded font-medium font-mono"
                >
                  LOGIN
                </button>
                
                <div className="text-center text-xs text-red-500 font-mono">
                  ALL_CONNECTIONS_ENCRYPTED_AND_ANONYMIZED
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSS for grid pattern and other effects */}
      <style jsx>{`
        .bg-grid-pattern {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(255, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 0, 0, 0.1) 1px, transparent 1px);
        }
        
        .glitch-effect {
          animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        .stripe-bg {
          background-image: repeating-linear-gradient(
            45deg,
            currentColor,
            currentColor 1px,
            transparent 1px,
            transparent 10px
          );
        }
      `}</style>
    </div>
  );
};

export default RSCWebsite;
