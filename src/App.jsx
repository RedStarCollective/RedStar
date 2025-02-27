import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Bell, X, Lock, Terminal, Menu, 
  Radio, Map, MessageSquare, Shield, Heart, Star
} from 'lucide-react';

// Import all component files
import PersonnelProfiles from './components/PersonnelProfiles';
import RevolutionaryDevelopment from './components/RevolutionaryDevelopment';
import DualPowerStrategy from './components/DualPowerStrategy';
import MedicalResources from './components/MedicalResources';
import CommunityReporting from './components/CommunityReporting';
import DirectActionCoordination from './components/DirectActionCoordination';
import ResourceLibrary from './components/ResourceLibrary';
import SuccessStories from './components/SuccessStories';
import ContentHeader from './components/ContentHeader';
import MutualAid from './components/MutualAid';
import EncryptedComms from './components/EncryptedComms';
import EmergencyProtocols from './components/EmergencyProtocols';

const RSCWebsite = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [showQuickActionsPanel, setShowQuickActionsPanel] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  
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
    
    return () => {
      clearInterval(timer);
      clearInterval(glitchTimer);
    };
  }, []);
  
  // Main navigation categories with tabs
  const navigationCategories = [
    {
      id: 'community',
      name: 'COMMUNITY_RESOURCES',
      icon: <Heart size={16} />,
      tabs: [
        { id: 'alerts', name: 'COMMUNITY_ALERTS', icon: <AlertTriangle size={16} />, security: 'public' },
        { id: 'medical', name: 'MEDICAL_RESOURCES', icon: <Heart size={16} />, security: 'public' },
        { id: 'mutual', name: 'MUTUAL_AID', icon: <Heart size={16} />, security: 'public' },
        { id: 'center', name: 'PEOPLES_CENTER', icon: <Map size={16} />, security: 'public' },
      ]
    },
    {
      id: 'education',
      name: 'REVOLUTIONARY_EDUCATION',
      icon: <Star size={16} />,
      tabs: [
        { id: 'dualpower', name: 'DUAL_POWER_STRATEGY', icon: <Shield size={16} />, security: 'public' },
        { id: 'victories', name: 'REVOLUTIONARY_VICTORIES', icon: <Star size={16} />, security: 'public' },
        { id: 'resources', name: 'RESOURCE_LIBRARY', icon: <Terminal size={16} />, security: 'mass' },
        { id: 'development', name: 'REVOLUTIONARY_DEVELOPMENT', icon: <Star size={16} />, security: 'mass' },
      ]
    },
    {
      id: 'organizing',
      name: 'ORGANIZING_&_ACTION',
      icon: <Shield size={16} />,
      tabs: [
        { id: 'cadre', name: 'CORE_CADRE', icon: <Star size={16} />, security: 'mass' },
        { id: 'reporting', name: 'INTELLIGENCE_NETWORK', icon: <Radio size={16} />, security: 'candidate' },
        { id: 'action', name: 'DIRECT_ACTION', icon: <Shield size={16} />, security: 'candidate' },
        { id: 'comms', name: 'ENCRYPTED_COMMS', icon: <MessageSquare size={16} />, security: 'candidate' },
        { id: 'emergency', name: 'EMERGENCY_PROTOCOLS', icon: <AlertTriangle size={16} />, security: 'full' },
      ]
    }
  ];

  // Critical action buttons for quick actions panel
  const quickActions = [
    { id: 'alerts', name: 'URGENT ALERTS', icon: <AlertTriangle size={20} />, color: 'red', description: 'View critical community alerts' },
    { id: 'medical', name: 'MEDICAL HELP', icon: <Heart size={20} />, color: 'red', description: 'Access the People\'s Clinic resources' },
    { id: 'mutual', name: 'MUTUAL AID', icon: <Heart size={20} />, color: 'yellow', description: 'Request or offer community resources' },
    { id: 'comms', name: 'SECURE COMMS', icon: <Radio size={20} />, color: 'blue', description: 'Emergency communications' },
    { id: 'emergency', name: 'EMERGENCY PROTOCOLS', icon: <AlertTriangle size={20} />, color: 'red', description: 'Activate emergency response' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  // Function to render the currently active tab content
  const renderActiveTabContent = () => {
    switch(activeTab) {
      case 'home':
        return <HomeDashboard setActiveTab={setActiveTab} />;
      case 'alerts':
        return <AlertsDashboard />;
      case 'center':
        return <div><ContentHeader title="THE PEOPLE'S CENTER" securityLevel="public" icon={<Map size={20} />} /><PeoplesCenterMap /></div>;
      case 'dualpower':
        return <div><ContentHeader title="DUAL POWER STRATEGY" securityLevel="public" icon={<Shield size={20} />} /><DualPowerStrategy /></div>;
      case 'development':
        return <div><ContentHeader title="REVOLUTIONARY DEVELOPMENT" securityLevel="mass" icon={<Star size={20} />} /><RevolutionaryDevelopment /></div>;
      case 'cadre':
        return <div><ContentHeader title="CORE CADRE PROFILES" securityLevel="mass" icon={<Star size={20} />} /><PersonnelProfiles /></div>;
      case 'medical':
        return <div><ContentHeader title="MEDICAL RESOURCES" securityLevel="public" icon={<Heart size={20} />} /><MedicalResources /></div>;
      case 'reporting':
        return <div><ContentHeader title="INTELLIGENCE NETWORK" securityLevel="candidate" icon={<Radio size={20} />} /><CommunityReporting /></div>;
      case 'action':
        return <div><ContentHeader title="DIRECT ACTION COORDINATION" securityLevel="candidate" icon={<Shield size={20} />} /><DirectActionCoordination /></div>;
      case 'resources':
        return <div><ContentHeader title="RESOURCE LIBRARY" securityLevel="mass" icon={<Terminal size={20} />} /><ResourceLibrary /></div>;
      case 'victories':
        return <div><ContentHeader title="REVOLUTIONARY VICTORIES" securityLevel="public" icon={<Star size={20} />} /><SuccessStories /></div>;
      case 'mutual':
        return <div><ContentHeader title="MUTUAL AID NETWORK" securityLevel="public" icon={<Heart size={20} />} /><MutualAid /></div>;
      case 'comms':
        return <div><ContentHeader title="ENCRYPTED COMMUNICATIONS" securityLevel="candidate" icon={<MessageSquare size={20} />} /><EncryptedComms /></div>;
      case 'emergency':
        return <div><ContentHeader title="EMERGENCY PROTOCOLS" securityLevel="full" icon={<AlertTriangle size={20} />} /><EmergencyProtocols /></div>;
      default:
        return <HomeDashboard setActiveTab={setActiveTab} />;
    }
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
            <div className="hidden md:block cursor-pointer" onClick={() => setActiveTab('home')}>
              <pre className="text-xs font-mono text-red-500 leading-none">
                {asciiLogo}
              </pre>
            </div>
            <span className="md:hidden text-xl font-mono text-red-500 font-bold tracking-wide cursor-pointer" onClick={() => setActiveTab('home')}>
              ✪ RED_STAR.COL ✪
            </span>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <button 
              onClick={() => setActiveTab('alerts')}
              className="flex items-center space-x-1 px-3 py-1 bg-red-700 border border-red-500 rounded font-mono hover:bg-red-600 text-white"
            >
              <Bell size={16} />
              <span>ALERTS</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('medical')}
              className="font-mono text-red-400 hover:text-red-300"
            >
              MEDICAL
            </button>
            
            <button 
              onClick={() => setActiveTab('mutual')}
              className="font-mono text-red-400 hover:text-red-300"
            >
              MUTUAL_AID
            </button>
            
            <button 
              onClick={() => setShowQuickActionsPanel(!showQuickActionsPanel)}
              className="font-mono text-red-400 hover:text-red-300"
            >
              QUICK_ACCESS
            </button>
            
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
            <button onClick={() => {setActiveTab('home'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">HOME</button>
            <button onClick={() => {setActiveTab('alerts'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">ALERTS</button>
            <button onClick={() => {setActiveTab('medical'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">MEDICAL</button>
            <button onClick={() => {setActiveTab('mutual'); setShowMobileMenu(false);}} className="text-red-400 hover:text-red-300">MUTUAL_AID</button>
            
            {/* Simplified category navigation for mobile */}
            {navigationCategories.map(category => (
              <div key={category.id} className="pt-2">
                <div className="text-red-500 font-bold text-sm">{category.name}</div>
                <div className="pl-3 flex flex-col space-y-2 mt-1">
                  {category.tabs.map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => {setActiveTab(tab.id); setShowMobileMenu(false);}}
                      className="text-gray-400 hover:text-red-300 text-left flex items-center"
                    >
                      {tab.icon}
                      <span className="ml-2">{tab.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
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

      {/* Quick Actions Panel (replaces the emergency and comms buttons) */}
      {showQuickActionsPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-black border-2 border-red-900 rounded-lg max-w-3xl w-full p-6 relative">
            <button 
              onClick={() => setShowQuickActionsPanel(false)} 
              className="absolute top-3 right-3 text-red-500 hover:text-red-400"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-mono text-red-500 font-bold mb-6 text-center">[ QUICK_ACCESS_PANEL ]</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map(action => (
                <button 
                  key={action.id}
                  onClick={() => {
                    setActiveTab(action.id);
                    setShowQuickActionsPanel(false);
                  }}
                  className={`bg-black border-2 border-${action.color}-900 rounded-lg p-4 text-left hover:bg-${action.color}-900/20 transition-colors`}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-10 h-10 rounded-full bg-${action.color}-900/30 flex items-center justify-center mr-3`}>
                      {action.icon}
                    </div>
                    <h3 className="font-bold text-white">{action.name}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{action.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Render current tab content */}
        {renderActiveTabContent()}
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

// Home Dashboard Component (new addition)
const HomeDashboard = ({ setActiveTab }) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-mono text-red-500 font-bold">[ RED_STAR_COLLECTIVE ]</h2>
        <p className="text-sm text-gray-300 mt-2">
          Building revolutionary dual power in South Night City through mutual aid, community defense, 
          and political education.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Access Cards */}
        <div onClick={() => setActiveTab('alerts')} className="bg-black border border-red-900 hover:border-red-700 rounded-lg p-4 cursor-pointer">
          <div className="flex items-center mb-2">
            <AlertTriangle size={20} className="text-red-500 mr-2" />
            <h3 className="font-bold text-red-500">COMMUNITY ALERTS</h3>
          </div>
          <p className="text-sm text-gray-400">Critical information about corporate activity, security threats, and community emergencies.</p>
        </div>
        
        <div onClick={() => setActiveTab('medical')} className="bg-black border border-red-900 hover:border-red-700 rounded-lg p-4 cursor-pointer">
          <div className="flex items-center mb-2">
            <Heart size={20} className="text-red-500 mr-2" />
            <h3 className="font-bold text-red-500">MEDICAL RESOURCES</h3>
          </div>
          <p className="text-sm text-gray-400">Access the People's Clinic services, medical guides, and emergency care information.</p>
        </div>
        
        <div onClick={() => setActiveTab('mutual')} className="bg-black border border-red-900 hover:border-red-700 rounded-lg p-4 cursor-pointer">
          <div className="flex items-center mb-2">
            <Heart size={20} className="text-red-500 mr-2" />
            <h3 className="font-bold text-red-500">MUTUAL AID NETWORK</h3>
          </div>
          <p className="text-sm text-gray-400">Request or offer resources through our community distribution network.</p>
        </div>
        
        <div onClick={() => setActiveTab('reporting')} className="bg-black border border-red-900 hover:border-red-700 rounded-lg p-4 cursor-pointer">
          <div className="flex items-center mb-2">
            <Radio size={20} className="text-red-500 mr-2" />
            <h3 className="font-bold text-red-500">INTELLIGENCE NETWORK</h3>
          </div>
          <p className="text-sm text-gray-400">Report corporate activity, police movements, and community developments.</p>
        </div>
        
        <div onClick={() => setActiveTab('action')} className="bg-black border border-red-900 hover:border-red-700 rounded-lg p-4 cursor-pointer">
          <div className="flex items-center mb-2">
            <Shield size={20} className="text-red-500 mr-2" />
            <h3 className="font-bold text-red-500">DIRECT ACTION</h3>
          </div>
          <p className="text-sm text-gray-400">Coordinate community defense, mutual aid operations, and collective actions.</p>
        </div>
        
        <div onClick={() => setActiveTab('dualpower')} className="bg-black border border-red-900 hover:border-red-700 rounded-lg p-4 cursor-pointer">
          <div className="flex items-center mb-2">
            <Star size={20} className="text-red-500 mr-2" />
            <h3 className="font-bold text-red-500">DUAL POWER STRATEGY</h3>
          </div>
          <p className="text-sm text-gray-400">Learn about our approach to building revolutionary alternatives alongside resistance.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latest Alert */}
        <div className="md:col-span-2 bg-black border border-red-900 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-red-500 flex items-center">
              <AlertTriangle size={16} className="mr-2" />
              LATEST ALERT
            </h3>
            <span className="text-xs text-gray-500">15 min ago</span>
          </div>
          <div className="p-3 border border-red-700 bg-red-900/10 rounded-lg mb-3">
            <h4 className="font-bold text-white mb-1">Militech security sweep in South Night City</h4>
            <p className="text-sm text-gray-300">Heavy corporate presence reported on blocks 15-22. Avoid area if possible. Defense Committee monitoring situation.</p>
          </div>
          <button onClick={() => setActiveTab('alerts')} className="text-red-500 text-sm hover:underline flex items-center">
            VIEW ALL ALERTS
          </button>
        </div>
        
        {/* Quick Contact */}
        <div className="bg-black border border-red-900 rounded-lg p-4">
          <h3 className="font-bold text-red-500 flex items-center mb-3">
            <MessageSquare size={16} className="mr-2" />
            EMERGENCY CONTACT
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center">
              <Heart size={14} className="text-red-500 mr-2" />
              <div>
                <div className="font-bold">MEDICAL EMERGENCY</div>
                <div className="text-gray-400">FREQ-774</div>
              </div>
            </div>
            <div className="flex items-center">
              <Shield size={14} className="text-red-500 mr-2" />
              <div>
                <div className="font-bold">SECURITY THREAT</div>
                <div className="text-gray-400">FREQ-991</div>
              </div>
            </div>
            <div className="flex items-center">
              <Star size={14} className="text-red-500 mr-2" />
              <div>
                <div className="font-bold">PEOPLE'S CENTER</div>
                <div className="text-gray-400">FREQ-001</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Alerts Dashboard Component (new addition)
const AlertsDashboard = () => {
  // Fictional alert data
  const alerts = [
    { id: 1, type: 'danger', area: 'South Night City', title: 'Militech security sweep', description: 'Heavy corporate presence reported on blocks 15-22. Avoid area if possible.', time: '15 min ago' },
    { id: 2, type: 'warning', area: 'Heywood', title: 'Medical supplies needed', description: 'The People\'s Clinic is low on antibiotics and bandages.', time: '1 hour ago' },
    { id: 3, type: 'info', area: 'Watson', title: 'Night Market location', description: 'Tonight\'s mutual aid distribution at the old factory on 7th.', time: '3 hours ago' },
    { id: 4, type: 'danger', area: 'University District', title: 'Corporate enforcers evicting residents', description: 'Container Block C7 residents facing immediate eviction. Solidarity response organizing.', time: '4 hours ago' },
    { id: 5, type: 'warning', area: 'Eastern Watson', title: 'Radiation levels elevated', description: 'Industrial leak at Biotechnica facility. Avoid sector 5 if possible.', time: '5 hours ago' },
  ];
  
  // Get badge color based on alert type
  const getAlertBadge = (type) => {
    switch(type) {
      case 'danger':
        return <span className="bg-red-900/30 text-red-500 text-xs px-2 py-0.5 rounded">DANGER</span>;
      case 'warning':
        return <span className="bg-yellow-900/30 text-yellow-500 text-xs px-2 py-0.5 rounded">WARNING</span>;
      case 'info':
        return <span className="bg-blue-900/30 text-blue-500 text-xs px-2 py-0.5 rounded">INFO</span>;
      default:
        return <span className="bg-gray-900/30 text-gray-500 text-xs px-2 py-0.5 rounded">UNKNOWN</span>;
    }
  };

  return (
    <div>
      <ContentHeader title="COMMUNITY ALERTS" securityLevel="public" icon={<AlertTriangle size={20} />} />
      
      <p className="text-sm text-gray-300 mb-6">
        The RSC maintains real-time monitoring of corporate activity, police movements, and other 
        threats to the community. Alerts are verified by multiple sources before being published.
      </p>
      
      <div className="space-y-4">
        {alerts.map(alert => (
          <div 
            key={alert.id} 
            className={`p-4 rounded-lg border relative overflow-hidden ${
              alert.type === 'danger' ? 'border-red-700 bg-black' : 
              alert.type === 'warning' ? 'border-yellow-700 bg-black' : 
              'border-blue-700 bg-black'
            }`}
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
              <Map size={12} className="inline mr-1" />
              {alert.area}
            </div>
            <p className="text-sm relative">{alert.description}</p>
            
            <div className="mt-3 flex justify-between">
              <div>
                {getAlertBadge(alert.type)}
              </div>
              
              <div className="flex space-x-2">
                <button className="px-2 py-1 bg-black border border-red-700 hover:bg-red-900/20 rounded text-xs text-red-500 font-mono">
                  DETAILS
                </button>
                <button className="px-2 py-1 bg-red-900 border border-red-700 hover:bg-red-800 rounded text-xs text-white font-mono">
                  RESPOND
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// People's Center Map Component (placeholder)
const PeoplesCenterMap = () => {
  return (
    <div className="border-2 border-red-900 rounded-lg p-4 bg-black">
      <div className="mb-6">
        <p className="text-sm text-gray-300">
          The People's Center operates from a converted NCPD precinct in South Night City's university district. 
          This three-story facility serves as both our operational headquarters and a community resource hub.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border border-red-900 rounded-lg p-3 bg-black">
          <h3 className="font-bold text-red-500 mb-2 flex items-center">
            <Heart size={16} className="mr-2" />
            FLOOR 1: COMMUNITY SERVICES
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Community Kitchen & Dining Hall</li>
            <li>• Distribution Center</li>
            <li>• Reception & Security</li>
            <li>• Meeting Spaces</li>
          </ul>
        </div>
        
        <div className="border border-red-900 rounded-lg p-3 bg-black">
          <h3 className="font-bold text-red-500 mb-2 flex items-center">
            <Heart size={16} className="mr-2" />
            FLOOR 2: MEDICAL & EDUCATION
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• The People's Clinic</li>
            <li>• Library & Study Rooms</li>
            <li>• Workshop Spaces</li>
            <li>• Media Production</li>
          </ul>
        </div>
        
        <div className="border border-red-900 rounded-lg p-3 bg-black">
          <h3 className="font-bold text-red-500 mb-2 flex items-center">
            <Shield size={16} className="mr-2" />
            FLOOR 3: OPERATIONS
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Committee Rooms</li>
            <li>• Communications Hub</li>
            <li>• Defense Training Area (Wuguan)</li>
            <li>• Rooftop Garden</li>
          </ul>
        </div>
      </div>
      
      <div className="border border-red-900 rounded-lg p-4 bg-black">
        <h3 className="font-bold text-red-500 mb-3">CURRENT STATUS: OPERATIONAL</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
          <div>
            <div className="flex justify-between pb-1 mb-1 border-b border-gray-800">
              <span>Clinic Hours:</span>
              <span className="text-white">08:00-20:00 (Emergency 24/7)</span>
            </div>
            <div className="flex justify-between pb-1 mb-1 border-b border-gray-800">
              <span>Kitchen Service:</span>
              <span className="text-white">12:00-13:30 & 18:00-19:30</span>
            </div>
            <div className="flex justify-between pb-1 mb-1 border-b border-gray-800">
              <span>Library Hours:</span>
              <span className="text-white">10:00-22:00</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between pb-1 mb-1 border-b border-gray-800">
              <span>Security Level:</span>
              <span className="text-green-500">Standard</span>
            </div>
            <div className="flex justify-between pb-1 mb-1 border-b border-gray-800">
              <span>Today's Events:</span>
              <span className="text-white">Study Group (19:00), Defense Training (20:00)</span>
            </div>
            <div className="flex justify-between pb-1 mb-1 border-b border-gray-800">
              <span>Committee Meetings:</span>
              <span className="text-white">Health (16:00), Defense (21:00)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};