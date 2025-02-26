import React from 'react';
import { Info, AlertTriangle, Lock } from 'lucide-react';

/**
 * Reusable component for section headers that displays the content title
 * and appropriate security level indicators
 */
const ContentHeader = ({ 
  title, 
  securityLevel = 'public',
  description = null,
  icon = null,
  actionButton = null 
}) => {
  // Get security level styling
  const getSecurityStyles = () => {
    switch(securityLevel) {
      case 'public':
        return 'bg-green-900/10 border-green-900/50 text-green-500';
      case 'mass':
        return 'bg-blue-900/10 border-blue-900/50 text-blue-500';
      case 'candidate':
        return 'bg-yellow-900/10 border-yellow-900/50 text-yellow-500';
      case 'full':
        return 'bg-red-900/10 border-red-900/50 text-red-500';
      default:
        return 'bg-gray-900/10 border-gray-900/50 text-gray-500';
    }
  };

  // Get security level text and icon
  const getSecurityInfo = () => {
    switch(securityLevel) {
      case 'public':
        return { text: 'PUBLIC_ACCESS', icon: <Info size={14} /> };
      case 'mass':
        return { text: 'MASS_ORG_ACCESS', icon: <Lock size={14} /> };
      case 'candidate':
        return { text: 'CANDIDATE_ACCESS', icon: <Lock size={14} /> };
      case 'full':
        return { text: 'FULL_MEMBER_ACCESS', icon: <Lock size={14} /> };
      default:
        return { text: 'UNKNOWN_ACCESS', icon: <AlertTriangle size={14} /> };
    }
  };

  const securityInfo = getSecurityInfo();

  return (
    <div className="mb-6">
      {/* Title and security banner */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-mono text-red-500 font-bold flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          [ {title} ]
        </h2>
        
        {actionButton && (
          <div>{actionButton}</div>
        )}
      </div>
      
      {/* Security level indicator */}
      <div className={`py-2 px-3 mb-4 border rounded-md flex justify-between items-center ${getSecurityStyles()}`}>
        <div className="flex items-center text-xs font-mono">
          {securityInfo.icon}
          <span className="ml-1">{securityInfo.text}</span>
        </div>
        
        {securityLevel !== 'public' && (
          <div className="text-xs">
            Secure information - exercise appropriate security culture
          </div>
        )}
      </div>
      
      {/* Optional description */}
      {description && (
        <p className="text-sm text-gray-300 mb-4">
          {description}
        </p>
      )}
    </div>
  );
};

export default ContentHeader;