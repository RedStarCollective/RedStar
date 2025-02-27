import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Shield, Heart, BookOpen, Users, MessageSquare, Star, 
  Menu, X, Bell, Lock, Radio, Map, Info, Zap, Home, Download, Eye, EyeOff
} from 'lucide-react';

// Component imports
import PersonnelProfiles from './components/PersonnelProfiles';
import RevolutionaryDevelopment from './components/RevolutionaryDevelopment';
import DualPowerStrategy from './components/DualPowerStrategy';
import MedicalResources from './components/MedicalResources';
import CommunityReporting from './components/CommunityReporting';
import DirectActionCoordination from './components/DirectActionCoordination';
import ResourceLibrary from './components/ResourceLibrary';
import SuccessStories from './components/SuccessStories';
import MutualAid from './components/MutualAid';
import EncryptedComms from './components/EncryptedComms';
import EmergencyProtocols from './components/EmergencyProtocols';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [showEmergencyProtocols, setShowEmergencyProtocols] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const fullTerminalText = 'COLLECTIVE://SECURE.CONNECTION.ESTABLISHED...';
  const [passwordInput, setPasswordInput] = useState('');
  const correctPassword = 'redstar';

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
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setTerminalText(fullTerminalText.substring(0, index));
      index++;
      if (index > fullTerminalText.length) {
        clearInterval(timer);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  // Define main navigation sections
  const navigationSections = [
    {
      id: 'overview',
      name: 'OVERVIEW',
      icon: <Info size={16} />,
      requiredAccess: 'public',
      component: () => <OverviewSection />
    },
    {
      id: 'community',
      name: 'COMMUNITY PROGRAMS',
      icon: <Heart size={16} />,
      requiredAccess: 'public',
      component: () => (
        <div className="space-y-6">
          <MutualAid />
          <MedicalResources />
        </div>
      )
    },
    {
      id: 'education',
      name: 'REVOLUTIONARY EDUCATION',
      icon: <BookOpen size={16} />,
      requiredAccess: 'public',
      component: () => (
        <div className="space-y-6">
          <DualPowerStrategy />
          <RevolutionaryDevelopment />
          <SuccessStories />
        </div>
      )
    },
    {
      id: 'resources',
      name: 'RESOURCE LIBRARY',
      icon: <BookOpen size={16} />,
      requiredAccess: 'mass',
      component: () => <ResourceLibrary />
    },
    {
      id: 'reporting',
      name: 'INTELLIGENCE NETWORK',
      icon: <Radio size={16} />,
      requiredAccess: 'mass',
      component: () => <CommunityReporting />
    },
    {
      id: 'action',
      name: 'DIRECT ACTION',
      icon: <Shield size={16} />,
      requiredAccess: 'candidate',
      component: () => <DirectActionCoordination />
    },
    {
      id: 'comms',
      name: 'SECURE COMMUNICATIONS',
      icon: <MessageSquare size={16} />,
      requiredAccess: 'candidate',
      component: () => <EncryptedComms />
    },
    {
      id: 'emergency',
      name: 'EMERGENCY PROTOCOLS',
      icon: <AlertTriangle size={16} />,
      requiredAccess: 'full',
      component: () => <EmergencyProtocols />
    },
    {
      id: 'personnel',
      name: 'CORE CADRE',
      icon: <Users size={16} />,
      requiredAccess: 'full',
      component: () => <PersonnelProfiles />
    }
  ];

  // Quick access buttons for critical functions
  const quickAccessButtons = [
    { id: 'community', name: 'MUTUAL AID', icon: <Heart size={16} />, color: 'red' },
    { id: 'reporting', name: 'REPORT', icon: <Radio size={16} />, color: 'blue' },
    { id: 'emergency', name: 'EMERGENCY', icon: <AlertTriangle size={16} />, color: 'yellow' },
    { id: 'comms', name: 'COMMS', icon: <MessageSquare size={16} />, color: 'green' }
  ];

  // Handle login process
 const handleLogin = (e) => {
  e.preventDefault();
  if (passwordInput === correctPassword) {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    // Optional: Show success message
    alert('Access granted. Welcome, comrade!');
  } else {
    // Optional: Show error message
    alert('Incorrect password. Access denied.');
    setPasswordInput('');
  }
};

  // Check if section is accessible based on login status and required access level
  const canAccessSection = (requiredAccess) => {
    if (requiredAccess === 'public') return true;
    if (!isLoggedIn) return false;
    
    // In a real app, would check user's permission level against required access
    // For demo, logged in users can access everything
    return true;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Cyberpunk background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-red-900 opacity-5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-red-600 opacity-5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
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
          <nav className="hidden md:flex space-x-4 items-center">
            {isLoggedIn ? (
              <div className="flex items-center text-xs text-green-500 font-mono">
                <Lock size={12} className="mr-1" />
                MEMBER_ACCESS_GRANTED
              </div>
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
          <div className="md:hidden px-4 py-3 bg-black border-t border-red-900 flex flex-col space-y-2 font-mono">
            {navigationSections.map(section => {
              const isAccessible = canAccessSection(section.requiredAccess);
              
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    if (isAccessible) {
                      setActiveSection(section.id);
                      setShowMobileMenu(false);
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                  className={`text-left px-3 py-2 rounded flex items-center justify-between ${
                    activeSection === section.id 
                      ? 'bg-red-900/30 text-white' 
                      : 'text-gray-400 hover:bg-red-900/10'
                  }`}
                >
                  <div className="flex items-center">
                    {section.icon}
                    <span className="ml-2">{section.name}</span>
                  </div>
                  
                  {!isAccessible && <Lock size={12} className="text-yellow-500" />}
                </button>
              );
            })}
            
            {!isLoggedIn && (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="mt-2 px-3 py-2 bg-red-900 border border-red-700 rounded font-mono hover:bg-red-800 flex items-center justify-center"
              >
                <Lock size={16} className="mr-2" />
                SECURE_LOGIN
              </button>
            )}
          </div>
        )}
      </header>

      {/* Terminal-like status bar */}
      <div className="bg-black border-b border-red-900 py-1 px-4 font-mono text-xs text-red-500 flex justify-between items-center overflow-hidden relative z-10">
        <div className="flex items-center">
          <Radio size={14} className="mr-2" />
          <span>{terminalText}</span>
          <span className="animate-pulse">█</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className="flex items-center"
          >
            {isOfflineMode ? (
              <><EyeOff size={12} className="text-green-500 mr-1" /> OFFLINE_MODE</>
            ) : (
              <><Eye size={12} className="text-blue-500 mr-1" /> ONLINE_MODE</>
            )}
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        {/* Security Banner */}
        <div className="mb-6 p-3 bg-black border border-yellow-600 rounded-lg flex items-center text-sm font-mono">
          <Lock className="mr-2 text-yellow-500" size={16} />
          <span>
            <span className="text-yellow-500 font-semibold">[SECURE CONNECTION ACTIVE]</span> • Communications encrypted through REROUTED_PROXY_CHAIN
          </span>
        </div>
        
        {/* Quick Access Bar */}
        <div className="mb-6 grid grid-cols-4 gap-2">
          {quickAccessButtons.map(button => {
            const isAccessible = canAccessSection(
              navigationSections.find(s => s.id === button.id)?.requiredAccess || 'public'
            );
            
            return (
              <button
                key={button.id}
                onClick={() => {
                  if (isAccessible) {
                    setActiveSection(button.id);
                  } else {
                    setShowLoginModal(true);
                  }
                }}
                className={`p-2 rounded-lg flex flex-col items-center justify-center bg-${button.color}-900/20 border border-${button.color}-900/50 text-${button.color}-500 ${!isAccessible ? 'opacity-70' : 'hover:bg-${button.color}-900/40'}`}
              >
                {button.icon}
                <span className="text-xs mt-1">{button.name}</span>
                {!isAccessible && <Lock size={10} className="mt-1" />}
              </button>
            );
          })}
        </div>
        
        {/* Navigation Tabs */}
        <div className="mb-6 hidden md:flex flex-wrap gap-2 border-b border-red-900 pb-2">
          {navigationSections.map(section => {
            const isAccessible = canAccessSection(section.requiredAccess);
            
            return (
              <button
                key={section.id}
                onClick={() => {
                  if (isAccessible) {
                    setActiveSection(section.id);
                  } else {
                    setShowLoginModal(true);
                  }
                }}
                className={`px-3 py-2 rounded-t flex items-center ${
                  activeSection === section.id 
                    ? 'bg-red-900 text-white' 
                    : 'text-gray-400 hover:bg-red-900/30'
                }`}
              >
                {section.icon}
                <span className="ml-2">{section.name}</span>
                {!isAccessible && <Lock size={12} className="ml-2 text-yellow-500" />}
              </button>
            );
          })}
        </div>
        
        {/* Active Content Section */}
        {navigationSections.find(section => section.id === activeSection)?.component()}
      </main>
      
      {/* Footer */}
      <footer className="bg-black border-t border-red-900 py-4 relative z-10">
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
        <div>ENCRYPTION: AES-256 ENABLED</div>
        <div className="text-green-500">CONNECTION SECURE</div>
      </div>
      
      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 font-mono text-red-500">ENTER ACCESS CODE:</label>
          <input 
            type="password" 
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full bg-black border-2 border-red-800 rounded px-3 py-2 focus:outline-none focus:border-red-500 font-mono" 
          />
        </div>
        
        <div className="flex flex-col space-y-3">
          <button 
            type="submit"
            className="w-full bg-red-900 border border-red-700 hover:bg-red-800 text-white py-2 rounded font-medium font-mono"
          >
            AUTHENTICATE
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
      `}</style>
    </div>
  );
};

// Overview Section Component
const OverviewSection = () => {
  const alerts = [
    { id: 1, type: 'danger', area: 'South Night City', title: 'Militech security sweep', description: 'Heavy corporate presence reported on blocks 15-22. Avoid area if possible.', time: '15 min ago' },
    { id: 2, type: 'warning', area: 'Heywood', title: 'Medical supplies needed', description: 'The People\'s Clinic is low on antibiotics and bandages.', time: '1 hour ago' },
    { id: 3, type: 'info', area: 'Watson', title: 'Night Market location', description: 'Tonight\'s mutual aid distribution at the old factory on 7th.', time: '3 hours ago' },
  ];

  const events = [
    { id: 1, title: 'Community Defense Training', location: 'The Wuguan', date: 'Feb 26th - 18:00', organizer: 'Sorry', attendees: 12 },
    { id: 2, title: 'Political Education Session', location: 'People\'s Center Library', date: 'Feb 27th - 19:00', organizer: 'Dai-Yu Wu', attendees: 8 },
    { id: 3, title: 'Mutual Aid Distribution', location: 'East Side Community Hub', date: 'Feb 28th - 16:00', organizer: 'Chan-Woo Park', attendees: 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="p-6 bg-black border-2 border-red-900 rounded-lg">
        <h2 className="text-xl font-mono text-red-500 font-bold mb-4">[ RED_STAR_COLLECTIVE ]</h2>
        <p className="text-gray-300 mb-4">
          The Red Star Collective builds dual power systems in South Night City, creating revolutionary alternatives 
          while undermining capitalist institutions. Each program addresses immediate needs while developing 
          structures that prefigure post-revolutionary society.
        </p>
        <p className="text-gray-300">
          Based at The People's Center, we provide healthcare, food distribution, community defense, education, 
          and other mutual aid services to the residents of South Night City.
        </p>
      </div>

      {/* Community Alerts */}
      <div>
        <h2 className="text-xl font-mono text-red-500 font-bold mb-3">[ COMMUNITY_ALERTS ]</h2>
        <div className="space-y-3">
          {alerts.map(alert => (
            <div 
              key={alert.id} 
              className={`p-4 rounded-lg border ${
                alert.type === 'danger' ? 'border-red-700 bg-red-900/10' : 
                alert.type === 'warning' ? 'border-yellow-700 bg-yellow-900/10' : 
                'border-blue-700 bg-blue-900/10'
              }`}
            >
              <div className="flex justify-between">
                <h3 className={`font-mono font-bold ${
                  alert.type === 'danger' ? 'text-red-500' : 
                  alert.type === 'warning' ? 'text-yellow-500' : 
                  'text-blue-500'
                }`}>{alert.title}</h3>
                <span className="text-xs opacity-70 font-mono">{alert.time}</span>
              </div>
              <div className="text-sm opacity-80 mb-2 font-mono">
                <Map size={12} className="inline mr-1" />
                {alert.area}
              </div>
              <p className="text-sm">{alert.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h2 className="text-xl font-mono text-red-500 font-bold mb-3">[ UPCOMING_EVENTS ]</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {events.map(event => (
            <div key={event.id} className="p-4 rounded-lg bg-black border border-red-900">
              <h3 className="font-bold text-red-500 font-mono">{event.title}</h3>
              <div className="text-sm opacity-70 mt-2 space-y-1 font-mono">
                <div>DATE: {event.date}</div>
                <div>LOCATION: {event.location}</div>
                <div>ORGANIZER: {event.organizer}</div>
              </div>
              <button className="mt-3 px-3 py-1 bg-red-900 border border-red-700 hover:bg-red-800 rounded text-xs font-mono">
                DETAILS
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="p-4 bg-black border border-red-900 rounded-lg">
        <h3 className="font-bold text-red-500 mb-4 font-mono">AVAILABLE_RESOURCES</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-center hover:bg-red-900/30">
            <Heart size={24} className="mx-auto mb-2 text-red-500" />
            <span className="text-sm">MUTUAL AID</span>
          </button>
          <button className="p-3 bg-blue-900/20 border border-blue-900/50 rounded-lg text-center hover:bg-blue-900/30">
            <BookOpen size={24} className="mx-auto mb-2 text-blue-500" />
            <span className="text-sm">EDUCATION</span>
          </button>
          <button className="p-3 bg-green-900/20 border border-green-900/50 rounded-lg text-center hover:bg-green-900/30">
            <Shield size={24} className="mx-auto mb-2 text-green-500" />
            <span className="text-sm">DEFENSE</span>
          </button>
          <button className="p-3 bg-yellow-900/20 border border-yellow-900/50 rounded-lg text-center hover:bg-yellow-900/30">
            <MessageSquare size={24} className="mx-auto mb-2 text-yellow-500" />
            <span className="text-sm">COMMUNICATIONS</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;