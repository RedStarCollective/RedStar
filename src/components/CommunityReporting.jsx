import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, FileText, Camera, Clock, Send, Eye, EyeOff, Shield, Filter } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';

const CommunityReporting = () => {
  const [reportType, setReportType] = useState('corporate');
  const [anonymousMode, setAnonymousMode] = useState(true);
  const [showRecentReports, setShowRecentReports] = useState(true);
  const [recentReports, setRecentReports] = useState([]);
  
  // New form state
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    urgency: 'medium'
  });
  
  // Fetch recent reports on component mount
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const q = query(collection(db, "reports"), orderBy("timestamp", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        const reports = [];
        querySnapshot.forEach((doc) => {
          reports.push({ id: doc.id, ...doc.data() });
        });
        setRecentReports(reports);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };
    
    fetchReports();
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Submit report to Firebase
  const handleSubmitReport = async (e) => {
    e.preventDefault();
    
    // Current timestamp
    const timestamp = new Date();
    
    // Create report object
    const reportData = {
      type: reportType,
      title: formData.title,
      location: formData.location,
      description: formData.description,
      urgency: formData.urgency,
      timestamp: timestamp,
      status: 'active',
      anonymous: anonymousMode,
      // In a real app, you would get the user's ID from authentication
      reportedBy: anonymousMode ? 'anonymous' : 'user123'
    };
    
    try {
      // Add document to Firestore
      const docRef = await addDoc(collection(db, "reports"), reportData);
      
      // Add the new report to the state with its ID
      setRecentReports(prevReports => [
        { id: docRef.id, ...reportData, posted: 'Just now' },
        ...prevReports.slice(0, 9) // Keep only the 10 most recent
      ]);
      
      // Reset form
      setFormData({
        title: '',
        location: '',
        description: '',
        urgency: 'medium'
      });
      
      alert("Report submitted successfully!");
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Error submitting report. Please try again.");
    }
  };

  const reportTypes = [
    { id: 'corporate', name: 'CORPORATE_ACTIVITY', icon: <AlertTriangle size={16} className="mr-2 text-red-500" />, color: 'red' },
    { id: 'police', name: 'NCPD_MOVEMENTS', icon: <Shield size={16} className="mr-2 text-blue-500" />, color: 'blue' },
    { id: 'gang', name: 'GANG_ACTIVITY', icon: <AlertTriangle size={16} className="mr-2 text-yellow-500" />, color: 'yellow' },
    { id: 'resource', name: 'RESOURCE_OPPORTUNITY', icon: <MapPin size={16} className="mr-2 text-green-500" />, color: 'green' },
    { id: 'infrastructure', name: 'INFRASTRUCTURE_ISSUES', icon: <AlertTriangle size={16} className="mr-2 text-purple-500" />, color: 'purple' }
  ];
  
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

  // Format relative time
  const formatRelativeTime = (timestamp) => {
    if (!timestamp) return 'Unknown time';
    
    const now = new Date();
    const then = timestamp instanceof Date ? timestamp : timestamp.toDate();
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
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
              
              <form onSubmit={handleSubmitReport}>
                {/* Report type selection */}
                <div className="mb-4">
                  <label className="block text-xs text-red-500 font-mono mb-2">REPORT_TYPE</label>
                  <div className="flex flex-wrap gap-2">
                    {reportTypes.map(type => (
                      <button
                        key={type.id}
                        type="button"
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
                
                {/* Title input */}
                <div className="mb-4">
                  <label className="block text-xs text-red-500 font-mono mb-2">TITLE</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Brief description of what you observed..."
                    className="w-full bg-black border border-red-900 rounded p-2 text-sm focus:outline-none focus:border-red-700"
                    required
                  />
                </div>
                
                {/* Location input */}
                <div className="mb-4">
                  <label className="block text-xs text-red-500 font-mono mb-2">LOCATION</label>
                  <div className="flex">
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter precise location..."
                      className="flex-grow bg-black border border-red-900 rounded-l p-2 text-sm focus:outline-none focus:border-red-700"
                      required
                    />
                    <button type="button" className="bg-red-900/30 border border-red-900 border-l-0 rounded-r px-3 text-red-500 flex items-center">
                      <MapPin size={16} />
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Be as specific as possible with street names, landmarks, etc.</div>
                </div>
                
                {/* Urgency selection */}
                <div className="mb-4">
                  <label className="block text-xs text-red-500 font-mono mb-2">URGENCY</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-red-900 rounded p-2 text-sm focus:outline-none focus:border-red-700"
                  >
                    <option value="low">LOW - For awareness only</option>
                    <option value="medium">MEDIUM - Should be addressed soon</option>
                    <option value="high">HIGH - Immediate attention required</option>
                  </select>
                </div>
                
                {/* Description */}
                <div className="mb-4">
                  <label className="block text-xs text-red-500 font-mono mb-2">DESCRIPTION</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what you observed in detail..."
                    className="w-full bg-black border border-red-900 rounded p-2 text-sm focus:outline-none focus:border-red-700 h-24"
                    required
                  ></textarea>
                </div>
                
                {/* Additional options */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <button type="button" className="px-3 py-1 bg-black border border-red-900 rounded text-xs flex items-center text-red-500 hover:bg-red-900/20">
                    <Camera size={14} className="mr-1" />
                    ATTACH_MEDIA
                  </button>
                  
                  <button type="button" className="px-3 py-1 bg-black border border-red-900 rounded text-xs flex items-center text-red-500 hover:bg-red-900/20">
                    <Clock size={14} className="mr-1" />
                    TIMESTAMP
                  </button>
                  
                  <button 
                    type="button"
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
                  type="submit" 
                  className="w-full p-2 bg-red-900 border border-red-700 text-white font-mono rounded hover:bg-red-800 flex items-center justify-center"
                >
                  <Send size={14} className="mr-2" />
                  SUBMIT_REPORT
                </button>
              </form>
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
                  {recentReports.length > 0 ? (
                    recentReports.map(report => (
                      <div key={report.id} className="border border-gray-800 rounded-lg p-3 bg-black hover:bg-gray-900/20">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            {getTypeIcon(report.type)}
                            <span className="font-bold text-sm">{report.title}</span>
                          </div>
                          <div className="text-xs text-gray-500">{formatRelativeTime(report.timestamp)}</div>
                        </div>
                        
                        <div className="text-xs text-gray-400 mb-2 flex items-center">
                          <MapPin size={12} className="mr-1" />
                          {report.location}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusClass(report.status)}`}>
                            {(report.status || 'active').toUpperCase()}
                          </span>
                          
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getUrgencyClass(report.urgency)}`}>
                            {(report.urgency || 'medium').toUpperCase()}_URGENCY
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <AlertTriangle size={32} className="mx-auto mb-2 opacity-50" />
                      <p>No reports submitted yet.</p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between">
                <span className="text-xs text-gray-500">{recentReports.length} REPORTS IN LAST 24 HOURS</span>
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