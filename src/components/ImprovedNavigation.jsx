import React, { useState } from 'react';
import { 
  AlertTriangle, Heart, BookOpen, Users, Shield, MessageSquare, Star, 
  Home, Info, Radio, Lock, ChevronDown, ChevronUp
} from 'lucide-react';

const NavigationComponent = ({ activeSection, setActiveSection, isLoggedIn, setShowLoginModal }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  
  // Define navigation structure with proper organization and access levels
  const navigationCategories = [
    {
      id: 'community',
      name: 'COMMUNITY RESOURCES',
      icon: <Heart size={16} />,
      sections: [
        { id: 'overview', name: 'DASHBOARD', icon: <Home size={16} />, access: 'public' },
        { id: 'mutualaid', name: 'MUTUAL AID', icon: <Heart size={16} />, access: 'public' },
        { id: 'medical', name: 'MEDICAL RESOURCES', icon: <Heart size={16} />, access: 'public' },
      ]
    },
    {
      id: 'education',
      name: 'REVOLUTIONARY EDUCATION',
      icon: <BookOpen size={16} />,
      sections: [
        { id: 'dualpower', name: 'DUAL POWER STRATEGY', icon: <Info size={16} />, access: 'public' },
        { id: 'development', name: 'REVOLUTIONARY DEVELOPMENT', icon: <Star size={16} />, access: 'public' },
        { id: 'victories', name: 'REVOLUTIONARY VICTORIES', icon: <Star size={16} />, access: 'public' },
        { id: 'resources', name: 'RESOURCE LIBRARY', icon: <BookOpen size={16} />, access: 'mass' }
      ]
    },
    {
      id: 'operations',
      name: 'OPERATIONS & SECURITY',
      icon: <Shield size={16} />,
      sections: [
        { id: 'reporting', name: 'INTELLIGENCE NETWORK', icon: <Radio size={16} />, access: 'mass' },
        { id: 'action', name: 'DIRECT ACTION', icon: <Shield size={16} />, access: 'candidate' },
        { id: 'comms', name: 'SECURE COMMUNICATIONS', icon: <MessageSquare size={16} />, access: 'candidate' },
        { id: 'emergency', name: 'EMERGENCY PROTOCOLS', icon: <AlertTriangle size={16} />, access: 'full' },
        { id: 'personnel', name: 'PERSONNEL PROFILES', icon: <Users size={16} />, access: 'full' }
      ]
    }
  ];
  
  // Toggle category expansion in mobile view
  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };
  
  // Check if user can access a section based on login status and access level
  const canAccessSection = (accessLevel) => {
    if (accessLevel === 'public') return true;
    if (!isLoggedIn) return false;
    
    // In a real app, this would check the user's access level against the required level
    // For this example, assume logged in users can access everything
    return true;
  };
  
  return (
    <div className="mb-6">
      {/* Mobile Navigation (Accordion Style) */}
      <div className="md:hidden space-y-1">
        {navigationCategories.map(category => (
          <div key={category.id} className="border border-red-900/50 rounded-lg overflow-hidden bg-black">
            <button 
              className="w-full p-3 flex justify-between items-center text-red-500 font-mono"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center">
                {category.icon}
                <span className="ml-2">{category.name}</span>
              </div>
              {expandedCategory === category.id ? 
                <ChevronUp size={16} /> : 
                <ChevronDown size={16} />
              }
            </button>
            
            {expandedCategory === category.id && (
              <div className="border-t border-red-900/30 pb-2">
                {category.sections.map(section => {
                  const isAccessible = canAccessSection(section.access);
                  
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
                      className={`flex justify-between items-center w-full p-2 mx-2 my-1 rounded-md text-sm 
                        ${activeSection === section.id 
                          ? 'bg-red-900/30 text-white' 
                          : 'text-gray-400 hover:bg-red-900/10'}
                        ${!isAccessible ? 'opacity-70' : ''}
                      `}
                    >
                      <div className="flex items-center">
                        {section.icon}
                        <span className="ml-2">{section.name}</span>
                      </div>
                      
                      {!isAccessible && (
                        <Lock size={12} className="text-yellow-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Desktop Navigation (Tab Style) */}
      <div className="hidden md:block">
        <div className="flex border-b border-red-900 overflow-x-auto">
          {navigationCategories.map(category => (
            <div key={category.id} className="relative group">
              <button className="px-4 py-2 font-mono text-red-500 hover:bg-red-900/10 flex items-center">
                {category.icon}
                <span className="ml-2">{category.name}</span>
                <ChevronDown size={12} className="ml-1" />
              </button>
              
              {/* Dropdown */}
              <div className="absolute left-0 mt-1 w-56 bg-black border border-red-900 rounded-lg overflow-hidden hidden group-hover:block z-20">
                {category.sections.map(section => {
                  const isAccessible = canAccessSection(section.access);
                  
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
                      className={`flex justify-between items-center w-full p-3 text-left text-sm border-b border-red-900/20 last:border-b-0
                        ${activeSection === section.id 
                          ? 'bg-red-900/30 text-white' 
                          : 'text-gray-400 hover:bg-red-900/10'}
                        ${!isAccessible ? 'opacity-70' : ''}
                      `}
                    >
                      <div className="flex items-center">
                        {section.icon}
                        <span className="ml-2">{section.name}</span>
                      </div>
                      
                      {!isAccessible && (
                        <Lock size={12} className="text-yellow-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        {/* Active Section Indicator */}
        <div className="mt-4 mb-2 flex items-center">
          <div className="bg-red-900/20 border border-red-900/50 text-red-500 rounded-lg px-3 py-1 text-sm font-mono flex items-center">
            {navigationCategories.map(category => 
              category.sections.find(section => section.id === activeSection)?.icon
            ).filter(Boolean)[0] || <Home size={16} />}
            <span className="mx-1">/</span>
            {navigationCategories.map(category => 
              category.sections.find(section => section.id === activeSection)?.name
            ).filter(Boolean)[0] || "DASHBOARD"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationComponent;