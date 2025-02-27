import React, { useState } from 'react';
import { AlertTriangle, MapPin, FileText, Camera, Clock, Send, Eye, EyeOff, Shield, Filter } from 'lucide-react';
import { useAlerts } from '../context/AlertContext'; // Make sure this path is correct

const CommunityReporting = () => {
  const [reportType, setReportType] = useState('corporate');
  const [anonymousMode, setAnonymousMode] = useState(true);
  const [showRecentReports, setShowRecentReports] = useState(true);
  const [reportContent, setReportContent] = useState('');
  const [reportLocation, setReportLocation] = useState('');
  
  // Use the alerts context
  const { addAlert } = useAlerts();
  
  const reportTypes = [
    { id: 'corporate', name: 'CORPORATE_ACTIVITY', icon: <AlertTriangle size={16} className="mr-2 text-red-500" />, color: 'red' },
    { id: 'police', name: 'NCPD_MOVEMENTS', icon: <Shield size={16} className="mr-2 text-blue-500" />, color: 'blue' },
    { id: 'gang', name: 'GANG_ACTIVITY', icon: <AlertTriangle size={16} className="mr-2 text-yellow-500" />, color: 'yellow' },
    { id: 'resource', name: 'RESOURCE_OPPORTUNITY', icon: <MapPin size={16} className="mr-2 text-green-500" />, color: 'green' },
    { id: 'infrastructure', name: 'INFRASTRUCTURE_ISSUES', icon: <AlertTriangle size={16} className="mr-2 text-purple-500" />, color: 'purple' }
  ];
  
  // Recent reports data
  const recentReports = [
    {
      id: 1,
      type: 'corporate',
      title: 'Militech security scanning Watson border',
      location: 'NID: 7700 Block, Watson',
      timestamp: '2 hours ago',
      status: 'verified',
      urgency: 'high'
    },
    {
      id: 2,
      type: 'resource',
      title: 'Abandoned medical supplies in University Cargo Bay',
      location: 'Container Block E3, UCB',
      timestamp: '6 hours ago',
      status: 'investigating',
      urgency: 'medium'
    },
    {
      id: 3,
      type: 'gang',
      title: '6th Street conflict with Valentinos moving east',
      location: 'Heywood/Wellsprings border',
      timestamp: '9 hours ago',
      status: 'verified',
      urgency: 'high'
    },
    {
      id: 4,
      type: 'police',
      title: 'NCPD checkpoint established on Grant Street',
      location: 'Grant & Mills intersection',
      timestamp: '1 day ago',
      status: 'verified',
      urgency: 'medium'
    },
    {
      id: 5,
      type: 'infrastructure',
      title: 'Water main break flooding University Park section',
      location: 'University Park northeast quadrant',
      timestamp: '1 day ago',
      status: 'resolved',
      urgency: 'low'
    }
  ];
  
  // Handle report submission with alert creation
  const handleSubmitReport = () => {
    if (!reportLocation || !reportContent) return;
    
    // Map report types to alert types
    const alertTypeMap = {
      'corporate': 'danger',
      'police': 'warning',
      'gang': 'danger',
      'resource': 'info',
      'infrastructure': 'warning'
    };
    
    // Create a new alert from the report
    addAlert({
      type: alertTypeMap[reportType] || 'info',
      area: reportLocation,
      title: `${reportType.toUpperCase()} activity reported`,
      description: reportContent
    });
    
    // Clear the form
    setReportContent('');
    setReportLocation('');
    
    // Show confirmation
    alert('Report submitted and alert created.');
  };
  
  // Get color based on report type
  const getTypeColor = (type) => {
    const reportType = reportTypes.find(t => t.id === type);
    return reportType ? reportType.color : 'gray';
  };
  
  // Get icon based on report type
  const getTypeIcon = (type) => {
    const reportType = reportTypes.find(t => t.id === type);
    return reportType ? reportType.icon : <AlertTriangle size={16} />;
  };
  
  // Get background class based on status
  const getStatusClass = (status) => {
    switch(status) {
      case 'verified':
        return 'bg-green-900/30 text-green-400';
      case 'investigating':
        return 'bg-yellow-900/30 text-yellow-400';
      case 'resolved':
        return 'bg-blue-900/30 text-blue-400';
      default:
        return 'bg-gray-900/30 text-gray-400';
    }
  };
  
  // Get background class based on urgency
  const getUrgencyClass = (urgency) => {
    switch(urgency) {
      case 'high':
        return 'bg-red-900/30 text-red-400';
      case 'medium':
        return 'bg-yellow-900/30 text-yellow-400';
      case 'low':
        return 'bg-gray-900/30 text-gray-400';
      default:
        return 'bg-gray-900/30 text-gray-400';
    }
  };

  return (
    <div className="w-full bg-black border-2 border-red-900 rounded-lg overflow-hidden">
      <div className="p-3 bg-red-900/30 border-b border-red-700 flex justify-between items-center">
        <h3 className="font-mono text-red-500 font-bold flex items-center">
          <AlertTriangle size={16} className="mr-2" />
          INTELLIGENCE_NETWORK
        </h3>
        <div className="text-xs text-red-400 font-mono">
          COMMUNITY_REPORTING_SYSTEM
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-300 mb-6">
          The intelligence network operates through collective observation. Report corporate activity, police movements, 
          resource opportunities, or other situations to help coordinate our community response.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Report submission form */}
          <div className="w-full md:w-1/2">
            <div className="border border-red-900 rounded-lg p-4 bg-black">
              <h4 className="text-red-500 font-bold mb-4 flex items-center">
                <FileText size={16} className="mr-2" />
                SUBMIT_REPORT
              </h4>
              
              {/* Report type selection */}
              <div className="mb-4">
                <label className="block text-xs text-red-500 font-mono mb-2">REPORT_TYPE</label>
                <div className="flex flex-wrap gap-2">
                  {reportTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setReportType(type.id)}
                      className={`px-2 py-1 rounded text-xs font-mono flex items-center ${
                        reportType === type.id 
                          ? `bg-${type.color}-900/30 border border-${type.color}-700 text-${type.color}-400` 
                          : 'bg-black border border-gray-700 text-gray-400 hover:bg-gray-900/30'
                      }`}
                    >
                      {type.icon}
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Location input */}
              <div className="mb-4">
                <label className="block text-xs text-red-500 font-mono mb-2">LOCATION</label>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Enter precise location..."
                    className="flex-grow bg-black border border-red-900 rounded-l p-2 text-sm focus:outline-none focus:border-red-700"
                    value={reportLocation}
                    onChange={(e) => setReportLocation(e.target.value)}
                  />
                  <button className="bg-red-900/30 border border-red-900 border-l-0 rounded-r px-3 text-red-500 flex items-center">
                    <MapPin size={16} />
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-1">Be as specific as possible with street names, landmarks, etc.</div>
              </div>
              
              {/* Description */}
              <div className="mb-4">
                <label className="block text-xs text-red-500 font-mono mb-2">DESCRIPTION</label>
                <textarea 
                  placeholder="Describe what you observed in detail..."
                  className="w-full bg-black border border-red-900 rounded p-2 text-sm focus:outline-none focus:border-red-700 h-24"
                  value={reportContent}
                  onChange={(e) => setReportContent(e.target.value)}
                ></textarea>
              </div>
              
              {/* Additional options */}
              <div className="flex flex-wrap gap-4 mb-4">
                <button className="px-3 py-1 bg-black border border-red-900 rounded text-xs flex items-center text-red-500 hover:bg-red-900/20">
                  <Camera size={14} className="mr-1" />
                  ATTACH_MEDIA
                </button>
                
                <button className="px-3 py-1 bg-black border border-red-900 rounded text-xs flex items-center text-red-500 hover:bg-red-900/20">
                  <Clock size={14} className="mr-1" />
                  TIMESTAMP
                </button>
                
                <button 
                  className="px-3 py-1 bg-black border border-red-900 rounded text-xs flex items-center hover:bg-red-900/20"
                  onClick={() => setAnonymousMode(!anonymousMode)}
                >
                  {anonymousMode ? (
                    <>
                      <EyeOff size={14} className="mr-1 text-green-500" />
                      <span className="text-green-500">ANONYMOUS</span>
                    </>
                  ) : (
                    <>
                      <Eye size={14} className="mr-1 text-yellow-500" />
                      <span className="text-yellow-500">IDENTIFIED</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Submit button */}
              <button 
                className="w-full p-2 bg-red-900 border border-red-700 text-white font-mono rounded hover:bg-red-800 flex items-center justify-center"
                onClick={handleSubmitReport}
              >
                <Send size={14} className="mr-2" />
                SUBMIT_REPORT
              </button>
            </div>
          </div>
          
          {/* Recent reports */}
          <div className="w-full md:w-1/2">
            <div className="border border-red-900 rounded-lg p-4 bg-black">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-red-500 font-bold flex items-center">
                  <AlertTriangle size={16} className="mr-2" />
                  RECENT_REPORTS
                </h4>
                
                <button className="text-xs flex items-center text-gray-400" onClick={() => setShowRecentReports(!showRecentReports)}>
                  <Filter size={12} className="mr-1" />
                  FILTER
                </button>
              </div>
              
              {showRecentReports && (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {recentReports.map(report => (
                    <div key={report.id} className="border border-gray-800 rounded-lg p-3 bg-black hover:bg-gray-900/20">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          {getTypeIcon(report.type)}
                          <span className="font-bold text-sm">{report.title}</span>
                        </div>
                        <div className="text-xs text-gray-500">{report.timestamp}</div>
                      </div>
                      
                      <div className="text-xs text-gray-400 mb-2 flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {report.location}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusClass(report.status)}`}>
                          {report.status.toUpperCase()}
                        </span>
                        
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getUrgencyClass(report.urgency)}`}>
                          {report.urgency.toUpperCase()}_URGENCY
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between">
                <span className="text-xs text-gray-500">67 REPORTS IN LAST 24 HOURS</span>
                <button className="text-xs text-red-500 hover:text-red-400">VIEW_ALL</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityReporting;