import React, { useState, useRef, useEffect } from 'react';
import { 
  AlertTriangle, Calendar, Heart, BookOpen, Users, Shield, MessageSquare, Star, MapPin, 
  Menu, X, Bell, Lock, Radio, Map, Zap, Home, HelpCircle, ChevronDown, ChevronUp,
  BookOpenCheck, Lightbulb, Laptop, Eye, EyeOff
} from 'lucide-react';

// Security level indicator component
const SecurityBadge = ({ level }) => {
  const getBadgeStyles = () => {
    switch(level) {
      case 'public':
        return 'bg-green-900/30 text-green-400 border-green-700';
      case 'mass':
        return 'bg-blue-900/30 text-blue-400 border-blue-700';
      case 'candidate':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-700';
      case 'full':
        return 'bg-red-900/30 text-red-400 border-red-700';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-700';
    }
  };

  const getIcon = () => {
    switch(level) {
      case 'public':
        return <Eye size={10} />;
      case 'mass':
        return <Users size={10} />;
      case 'candidate':
        return <Lock size={10} />;
      case 'full':
        return <EyeOff size={10} />;
      default:
        return <Eye size={10} />;
    }
  };

  return (
    <div className={`px-1 py-0.5 text-xs border rounded-sm flex items-center ${getBadgeStyles()}`}>
      {getIcon()}
      <span className="ml-1">{level.toUpperCase()}</span>
    </div>
  );
};

const ImprovedNavigation = ({ activeTab, setActiveTab, isLoggedIn, setShowLoginModal }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [showQuickAccess, setShowQuickAccess] = useState(true);
  
  // Close mobile menu when a tab is selected
  useEffect(() => {
    setShowMobileMenu(false);
  }, [activeTab]);

  // Navigation categories with their tabs
  const navigationCategories = [
    {
      id: 'community',
      name: 'COMMUNITY_RESOURCES',
      icon: <Heart size={16} />,
      tabs: [
        { id: 'alerts', name: 'COMMUNITY_ALERTS', icon: <AlertTriangle size={16} />, security: 'public' },
        { id: 'center', name: 'PEOPLES_CENTER', icon: <MapPin size={16} />, security: 'public' },
        { id: 'medical', name: 'MEDICAL_RESOURCES', icon: <Heart size={16} />, security: 'public' },
        { id: 'mutual', name: 'MUTUAL_AID', icon: <Heart size={16} />, security: 'public' },
        { id: 'events', name: 'EVENTS_&_ACTIONS', icon: <Calendar size={16} />, security: 'public' },
      ]
    },
    {
      id: 'education',
      name: 'REVOLUTIONARY_EDUCATION',
      icon: <BookOpenCheck size={16} />,
      tabs: [
        { id: 'dualpower', name: 'DUAL_POWER_STRATEGY', icon: <Shield size={16} />, security: 'public' },
        { id: 'victories', name: 'REVOLUTIONARY_VICTORIES', icon: <Star size={16} />, security: 'public' },
        { id: 'resources', name: 'RESOURCE_LIBRARY', icon: <BookOpen size={16} />, security: 'mass' },
        { id: 'education', name: 'POLITICAL_EDUCATION', icon: <Lightbulb size={16} />, security: 'mass' },
        { id: 'development', name: 'REVOLUTIONARY_DEVELOPMENT', icon: <Star size={16} />, security: 'mass' },
      ]
    },
    {
      id: 'organizing',
      name: 'ORGANIZING_&_ACTION',
      icon: <Users size={16} />,
      tabs: [
        { id: 'committees', name: 'COMMITTEES', icon: <Users size={16} />, security: 'mass' },
        { id: 'cadre', name: 'CORE_CADRE', icon: <Users size={16} />, security: 'mass' },
        { id: 'reporting', name: 'INTELLIGENCE_NETWORK', icon: <Radio size={16} />, security: 'candidate' },
        { id: 'action', name: 'DIRECT_ACTION', icon: <Zap size={16} />, security: 'candidate' },
        { id: 'map', name: 'THREAT_MAP', icon: <Map size={16} />, security: 'full' },
      ]
    }
  ];

  // Quick access buttons for critical resources
  const quickAccessButtons = [
    { id: 'medical', name: 'CLINIC', icon: <Heart size={14} />, color: 'red' },
    { id: 'mutual', name: 'AID', icon: <Heart size={14} />, color: 'yellow' },
    { id: 'alerts', name: 'ALERTS', icon: <AlertTriangle size={14} />, color: 'orange' },
    { id: 'reporting', name: 'REPORT', icon: <Radio size={14} />, color: 'blue' },
  ];

  // Toggle category expansion in mobile menu
  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  // Render desktop navigation
  const renderDesktopNav = () => (
    <div className="hidden md:block">
      {/* Quick access buttons */}
      {showQuickAccess && (
        <div className="flex mb-3 bg-black border border-red-900/50 p-1 rounded-lg">
          {quickAccessButtons.map(button => (
            <button
              key={button.id}
              onClick={() => setActiveTab(button.id)}
              className={`px-3 py-1 mx-1 rounded flex items-center text-xs font-mono bg-${button.color}-900/20 border border-${button.color}-900/50 text-${button.color}-500 hover:bg-${button.color}-900/40`}
            >
              {button.icon}
              <span className="ml-1">{button.name}</span>
            </button>
          ))}
          <button 
            onClick={() => setShowQuickAccess(false)}
            className="ml-auto px-1 text-gray-500 hover:text-gray-300"
          >
            <X size={14} />
          </button>
        </div>
      )}
      
      {/* Main navigation tabs with category grouping */}
      <div className="grid grid-cols-3 gap-1 bg-black border border-red-900 p-1 rounded-lg">
        {navigationCategories.map(category => (
          <div key={category.id} className="flex flex-col">
            <div className="px-3 py-1 font-mono text-xs text-red-500 border-b border-red-900/30 mb-1 flex items-center">
              {category.icon}
              <span className="ml-1">{category.name}</span>
            </div>
            <div className="flex flex-col space-y-1">
              {category.tabs.map(tab => {
                // If tab requires login and user isn't logged in, show with lock
                const isLocked = tab.security !== 'public' && !isLoggedIn;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => isLocked ? setShowLoginModal(true) : setActiveTab(tab.id)}
                    className={`px-3 py-2 rounded-md flex items-center justify-between text-xs font-mono
                      ${activeTab === tab.id 
                        ? 'bg-red-900 text-white border border-red-500' 
                        : 'text-gray-400 hover:bg-red-900/20 border border-transparent'}
                      ${isLocked ? 'opacity-70' : 'opacity-100'}
                    `}
                  >
                    <div className="flex items-center">
                      {tab.icon}
                      <span className="ml-2">{tab.name}</span>
                    </div>
                    <div className="flex items-center">
                      {isLocked ? (
                        <Lock size={12} className="text-yellow-500" />
                      ) : (
                        <SecurityBadge level={tab.security} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render mobile navigation
  const renderMobileNav = () => (
    <div className="md:hidden">
      {/* Mobile menu button */}
      <div className="flex justify-between items-center mb-2">
        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)} 
          className="px-3 py-1 bg-red-900 border border-red-700 rounded-lg flex items-center"
        >
          {showMobileMenu ? <X size={16} className="mr-1" /> : <Menu size={16} className="mr-1" />}
          <span className="font-mono text-xs">MENU</span>
        </button>
        
        {/* Quick access row for mobile */}
        <div className="flex">
          {quickAccessButtons.slice(0, 3).map(button => (
            <button
              key={button.id}
              onClick={() => setActiveTab(button.id)}
              className={`w-12 p-1 ml-1 rounded flex flex-col items-center justify-center text-xs font-mono bg-${button.color}-900/20 border border-${button.color}-900/50 text-${button.color}-500`}
            >
              {button.icon}
              <span className="text-[10px] mt-1">{button.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Expanded mobile menu */}
      {showMobileMenu && (
        <div className="bg-black border border-red-900 rounded-lg overflow-hidden mb-4">
          {/* Mobile navigation accordion */}
          {navigationCategories.map(category => (
            <div key={category.id} className="border-b border-red-900/30 last:border-b-0">
              {/* Category header */}
              <button 
                className="w-full px-4 py-3 flex justify-between items-center text-sm font-mono hover:bg-red-900/10"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center text-red-500">
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </div>
                {openCategory === category.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {/* Category items */}
              {openCategory === category.id && (
                <div className="px-2 pb-2">
                  {category.tabs.map(tab => {
                    const isLocked = tab.security !== 'public' && !isLoggedIn;
                    
                    return (
                      <button
                        key={tab.id}
                        onClick={() => isLocked ? setShowLoginModal(true) : setActiveTab(tab.id)}
                        className={`w-full px-3 py-2 my-1 rounded-md flex items-center justify-between text-sm font-mono
                          ${activeTab === tab.id 
                            ? 'bg-red-900/30 text-white border border-red-700/50' 
                            : 'text-gray-400 hover:bg-red-900/10 border border-transparent'}
                          ${isLocked ? 'opacity-70' : 'opacity-100'}
                        `}
                      >
                        <div className="flex items-center">
                          {tab.icon}
                          <span className="ml-2">{tab.name}</span>
                        </div>
                        {isLocked ? (
                          <Lock size={12} className="text-yellow-500" />
                        ) : (
                          <SecurityBadge level={tab.security} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          
          {/* Login button for mobile */}
          {!isLoggedIn && (
            <div className="p-3 border-t border-red-900/30">
              <button 
                onClick={() => setShowLoginModal(true)}
                className="w-full px-3 py-2 bg-red-900 border border-red-700 rounded font-mono hover:bg-red-800 flex items-center justify-center"
              >
                <Lock size={16} className="mr-2" />
                SECURE_LOGIN
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <nav className="mb-6">
      {renderMobileNav()}
      {renderDesktopNav()}
    </nav>
  );
};

export default ImprovedNavigation;