// EnhancedResourceLibrary.jsx
// Adds encryption visualization and reading status tracking to the Resource Library
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Download, Search, Filter, Tag, Eye, EyeOff, Lock, AlertTriangle, 
  Zap, Wifi, ChevronDown, ChevronUp, Star, Check, Clock, Bookmark, CheckCircle,
  Shield
} from 'lucide-react';

// ResourceEncryptionProgress - Component to show download progress with encryption visualization
export const ResourceEncryptionProgress = ({ isActive, progress, onComplete }) => {
  // Automatically complete after reaching 100%
  useEffect(() => {
    let timer;
    if (isActive && progress >= 100) {
      timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [isActive, progress, onComplete]);
  
  if (!isActive) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full p-6 bg-black border-2 border-red-900 rounded-lg">
        <div className="mb-4 text-center">
          <Shield size={32} className="mx-auto mb-2 text-red-500" />
          <h3 className="text-red-500 font-mono text-lg">SECURE ENCRYPTION</h3>
          <p className="text-gray-400 text-sm mt-1">Preparing resource with zero-knowledge encryption</p>
        </div>
        
        {/* Progress visualization */}
        <div className="mb-6">
          <div className="relative h-6 bg-red-900/20 rounded-full overflow-hidden mb-2">
            {/* Main progress bar */}
            <div 
              className="h-full bg-red-600 transition-all duration-300 flex items-center justify-end pr-2"
              style={{ width: `${progress}%` }}
            >
              {progress > 15 && (
                <span className="text-xs text-white font-mono">
                  {Math.round(progress)}%
                </span>
              )}
            </div>
            
            {/* Encryption pattern overlay */}
            <div className="absolute inset-0 encryption-pattern opacity-50"></div>
          </div>
          
          <div className="text-center text-xs text-gray-400 font-mono">
            {progress < 30 ? 'Generating encryption keys...' : 
             progress < 60 ? 'Applying zero-knowledge encryption...' : 
             progress < 90 ? 'Compressing secure payload...' : 
             'Finalizing secure package...'}
          </div>
        </div>
        
        {/* Encryption details panel */}
        <div className="mb-4 p-2 bg-black border border-red-900/50 rounded font-mono text-xs h-20 overflow-y-auto">
          <div className="text-gray-500">ENCRYPTION_LOG:</div>
          <div className="flex items-start gap-2 flex-col">
            <div className="text-green-500">✓ Connection secured via TOR relays</div>
            <div className="text-green-500">✓ AES-256 encryption applied</div>
            <div className="text-green-500">✓ Metadata scrubbing complete</div>
            {progress > 50 && <div className="text-green-500">✓ Integrity verification</div>}
            {progress > 75 && <div className="text-green-500">✓ Offline access configuration</div>}
            {progress > 90 && <div className="text-green-500">✓ Anti-tampering measures active</div>}
          </div>
        </div>
        
        {/* Security notice */}
        <div className="text-center text-xs text-red-500 font-mono mt-2">
          <Lock size={12} className="inline mr-1" />
          SECURE_TRANSMISSION_PROTOCOL_ACTIVE
        </div>
        
        {/* Encryption animation styles */}
        <style jsx>{`
          .encryption-pattern {
            background: repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(185, 28, 28, 0.3) 10px,
              rgba(185, 28, 28, 0.3) 20px
            );
            background-size: 28px 28px;
            animation: move-encryption-pattern 2s linear infinite;
          }
          
          @keyframes move-encryption-pattern {
            0% { background-position: 0 0; }
            100% { background-position: 56px 28px; }
          }
        `}</style>
      </div>
    </div>
  );
};

// ResourceReadingTracker - Component to track reading progress and status
export const ResourceReadingTracker = ({ resources, onUpdateProgress }) => {
  // Reading status display function
  const getReadingStatusDisplay = (progress) => {
    if (progress === 0) return { status: 'Not started', color: 'gray' };
    if (progress < 25) return { status: 'Just started', color: 'blue' };
    if (progress < 75) return { status: 'In progress', color: 'yellow' };
    if (progress < 100) return { status: 'Nearly complete', color: 'orange' };
    return { status: 'Completed', color: 'green' };
  };
  
  return (
    <div className="border border-red-900 rounded-lg overflow-hidden mb-6">
      <div className="p-3 bg-red-900/30 border-b border-red-700 flex items-center">
        <BookOpen size={16} className="mr-2 text-red-500" />
        <h3 className="font-mono text-red-500 font-bold">READING PROGRESS</h3>
      </div>
      
      <div className="divide-y divide-red-900/20">
        {resources.map(resource => {
          const { status, color } = getReadingStatusDisplay(resource.readingProgress || 0);
          
          return (
            <div key={resource.id} className="p-3 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-300 font-medium flex items-center">
                  {getCategoryIcon(resource.category)}
                  <span className="ml-2">{resource.title}</span>
                </div>
                
                <div className="mt-2">
                  <div className="h-2 bg-red-900/20 rounded-full overflow-hidden w-48">
                    <div 
                      className={`h-full bg-${color}-600 transition-all duration-300`}
                      style={{ width: `${resource.readingProgress || 0}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs">
                    <span className={`text-${color}-500`}>{status}</span>
                    <span className="text-gray-500">
                      {resource.readingProgress ? `${Math.floor(resource.readingProgress)}%` : 'Not started'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => onUpdateProgress(resource.id, Math.min(100, (resource.readingProgress || 0) + 20))}
                  className="p-1 bg-red-900/20 border border-red-900/50 rounded hover:bg-red-900/40"
                  title="Update progress"
                >
                  <Clock size={16} className="text-red-500" />
                </button>
                
                <button 
                  onClick={() => onUpdateProgress(resource.id, 100)}
                  className={`p-1 ${resource.readingProgress === 100 ? 'bg-green-900/20 border border-green-900/50' : 'bg-gray-900/20 border border-gray-900/50'} rounded hover:bg-green-900/20`}
                  title="Mark complete"
                >
                  <CheckCircle size={16} className={resource.readingProgress === 100 ? 'text-green-500' : 'text-gray-500'} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Enhanced ResourceLibrary component with progressive encryption visualization and reading tracking
const EnhancedResourceLibrary = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [expandedResource, setExpandedResource] = useState(null);
  
  // New states for encryption progress
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [currentDownload, setCurrentDownload] = useState(null);
  
  // Resource data with reading progress added
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "Radiation Sickness Field Treatment Manual",
      category: "medical",
      description: "Comprehensive guide to identifying and treating radiation sickness with limited resources. Includes dosage calculations for common medications and emergency stabilization protocols.",
      author: "Dr. Minata Tindano",
      dateAdded: "2046-02-15",
      tags: ["Emergency", "Printable", "Offline-Ready"],
      downloadSize: "4.3 MB",
      securityLevel: "Mass Organization Member",
      popularity: 487,
      readingProgress: 100
    },
    {
      id: 2,
      title: "Urban Defense Networks: Neighborhood Response Protocols",
      category: "defense",
      description: "Tactical guide for establishing neighborhood defense systems. Covers surveillance detection, communication networks, and coordinated response to external threats.",
      author: "Sorry",
      dateAdded: "2045-11-22",
      tags: ["Advanced", "Training", "Night City Specific"],
      downloadSize: "12.1 MB",
      securityLevel: "Candidate Member",
      popularity: 356,
      readingProgress: 35
    },
    {
      id: 3,
      title: "Combat Zone First Aid: Trauma Response with Limited Resources",
      category: "medical",
      description: "Emergency medical procedures for gunshot wounds, lacerations, burns, and chemical exposure using commonly available materials in the Combat Zone.",
      author: "Dr. Iō & Dr. Tindano",
      dateAdded: "2045-08-04",
      tags: ["Beginner", "Emergency", "Printable", "Offline-Ready"],
      downloadSize: "8.7 MB",
      securityLevel: "Mass Organization Member",
      popularity: 632,
      readingProgress: 78
    },
    {
      id: 4,
      title: "DIY Infrastructure Repair: Water & Power Systems",
      category: "tech",
      description: "Technical manual for repairing and maintaining damaged infrastructure in South Night City. Includes schematics for water purification and emergency power generation.",
      author: "Leonard Turner",
      dateAdded: "2046-01-08",
      tags: ["Technical", "Offline-Ready", "Daily Use"],
      downloadSize: "15.3 MB",
      securityLevel: "Mass Organization Member",
      popularity: 289,
      readingProgress: 0
    },
    {
      id: 5,
      title: "Mass Work: Building Revolutionary Consciousness Through Daily Struggle",
      category: "organizing",
      description: "Strategic framework for identifying community needs and transforming them into organizational opportunities. Includes case studies from successful RSC campaigns.",
      author: "Le Fou",
      dateAdded: "2045-12-01",
      tags: ["Advanced", "Training", "Night City Specific"],
      downloadSize: "6.2 MB",
      securityLevel: "Candidate Member",
      popularity: 412,
      readingProgress: 64
    }
  ]);
  
  // Resource categories
  const categories = [
    { id: 'all', name: 'ALL RESOURCES', icon: <BookOpen size={16} /> },
    { id: 'medical', name: 'MEDICAL', icon: <Heart size={16} /> },
    { id: 'defense', name: 'COMMUNITY DEFENSE', icon: <Shield size={16} /> },
    { id: 'tech', name: 'TECHNICAL', icon: <Cpu size={16} /> },
    { id: 'organizing', name: 'ORGANIZING', icon: <Star size={16} /> },
    { id: 'survival', name: 'SURVIVAL', icon: <AlertTriangle size={16} /> }
  ];
  
  // Tags for filtering
  const availableTags = [
    'Beginner', 'Advanced', 'Offline-Ready', 'Printable', 'Interactive', 
    'Emergency', 'Daily Use', 'Training', 'Night City Specific'
  ];
  
  // Toggle tag selection
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Filter resources based on active category, search query, and selected tags
  const filteredResources = resources.filter(resource => {
    // Filter by category
    if (activeCategory !== 'all' && resource.category !== activeCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !resource.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0 && !selectedTags.some(tag => resource.tags.includes(tag))) {
      return false;
    }
    
    return true;
  });
  
  // Function to handle resource download with encryption visualization
  const handleDownload = (resourceId) => {
    const resource = resources.find(r => r.id === resourceId);
    if (!resource) return;
    
    setCurrentDownload(resource);
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        // Slow down as it gets closer to 100% for more realistic effect
        const increment = prev < 80 ? 5 : prev < 90 ? 2 : 1;
        const newProgress = prev + increment;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };
  
  // Function to complete download
  const completeDownload = () => {
    setIsDownloading(false);
    
    // Update resource to mark as downloaded
    if (currentDownload) {
      const newResources = resources.map(resource => 
        resource.id === currentDownload.id 
          ? { ...resource, isDownloaded: true } 
          : resource
      );
      setResources(newResources);
    }
    setCurrentDownload(null);
  };
  
  // Function to update reading progress
  const updateReadingProgress = (resourceId, progress) => {
    setResources(prevResources => 
      prevResources.map(resource => 
        resource.id === resourceId 
          ? { ...resource, readingProgress: progress } 
          : resource
      )
    );
  };
  
  // Get icon based on resource category
  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : <BookOpen size={16} />;
  };
  
  // Toggle expanded resource view
  const toggleExpanded = (id) => {
    setExpandedResource(expandedResource === id ? null : id);
  };
  
  return (
    <div className="w-full bg-black border-2 border-red-900 rounded-lg overflow-hidden">
      <div className="p-3 bg-red-900/30 border-b border-red-700 flex justify-between items-center">
        <h3 className="font-mono text-red-500 font-bold flex items-center">
          <BookOpen size={16} className="mr-2" />
          RESOURCE_LIBRARY
        </h3>
        <div className="text-xs text-red-400 font-mono">
          REVOLUTIONARY_KNOWLEDGE_BASE
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-300 mb-6">
          The RSC's resource library provides practical knowledge for survival, organizing, and revolution. 
          These materials are developed through collective experience and continually refined through practice.
        </p>
        
        {/* Reading progress tracker */}
        <ResourceReadingTracker 
          resources={resources}
          onUpdateProgress={updateReadingProgress}
        />
        
        {/* Search and filter controls */}
        <div className="mb-6">
          <div className="flex mb-3">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full bg-black border border-red-900 rounded-l p-2 pl-8 text-sm focus:outline-none focus:border-red-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} className="absolute left-2 top-2.5 text-gray-500" />
            </div>
            
            <button 
              className="px-4 py-2 bg-red-900 border border-red-700 rounded-r flex items-center text-white hover:bg-red-800"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} className="mr-2" />
              FILTER
              {showFilters ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
            </button>
          </div>
          
          {/* Category tabs */}
          <div className="flex overflow-x-auto space-x-2 mb-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1 whitespace-nowrap rounded flex items-center text-xs font-mono ${
                  activeCategory === category.id 
                    ? 'bg-red-900 text-white border border-red-700' 
                    : 'bg-black border border-red-900/50 text-gray-400 hover:bg-red-900/20'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Advanced filters */}
          {showFilters && (
            <div className="p-3 bg-red-900/10 border border-red-900 rounded-lg mb-3">
              <h4 className="text-xs font-mono text-red-500 mb-2 flex items-center">
                <Tag size={14} className="mr-1" />
                FILTER_BY_TAGS
              </h4>
              
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedTags.includes(tag)
                        ? 'bg-red-900/50 text-white border border-red-700'
                        : 'bg-black border border-gray-700 text-gray-400 hover:bg-gray-900/30'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Resources list */}
        <div className="space-y-3">
          {filteredResources.length > 0 ? (
            filteredResources.map(resource => (
              <div 
                key={resource.id} 
                className={`border ${expandedResource === resource.id ? 'border-red-700' : 'border-red-900/50'} rounded-lg bg-black overflow-hidden`}
              >
                {/* Resource header - always visible */}
                <div 
                  className={`p-3 ${expandedResource === resource.id ? 'bg-red-900/30' : 'hover:bg-red-900/10'} flex justify-between items-start cursor-pointer`}
                  onClick={() => toggleExpanded(resource.id)}
                >
                  <div className="flex-grow">
                    <div className="flex items-center mb-1">
                      <div className="mr-2 text-red-500">
                        {getCategoryIcon(resource.category)}
                      </div>
                      <h4 className="font-bold text-gray-200">{resource.title}</h4>
                      
                      {/* Reading progress badge */}
                      {resource.readingProgress > 0 && (
                        <div className="ml-2 flex items-center">
                          {resource.readingProgress >= 100 ? (
                            <span className="bg-green-900/30 text-green-500 text-xs px-1.5 rounded flex items-center">
                              <Check size={10} className="mr-1" />
                              Read
                            </span>
                          ) : (
                            <span className="bg-yellow-900/30 text-yellow-500 text-xs px-1.5 rounded flex items-center">
                              <Bookmark size={10} className="mr-1" />
                              {Math.floor(resource.readingProgress)}%
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-400 line-clamp-1">
                      {resource.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center ml-3">
                    <button
                      className="p-1 bg-red-900/20 border border-red-900/50 rounded mr-2 hover:bg-red-900/40"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(resource.id);
                      }}
                    >
                      {resource.isDownloaded ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <Download size={16} className="text-red-500" />
                      )}
                    </button>
                    
                    {expandedResource === resource.id ? (
                      <ChevronUp size={18} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-400" />
                    )}
                  </div>
                </div>
                
                {/* Expanded resource details */}
                {expandedResource === resource.id && (
                  <div className="p-3 border-t border-red-900/30 bg-black">
                    <p className="text-sm text-gray-300 mb-3">
                      {resource.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="text-xs text-gray-400">
                        <div className="flex items-center mb-1">
                          <User size={12} className="mr-1 text-red-500" />
                          <span className="text-gray-500">AUTHOR:</span> 
                          <span className="ml-1 text-gray-300">{resource.author}</span>
                        </div>
                        <div className="flex items-center mb-1">
                          <Database size={12} className="mr-1 text-red-500" />
                          <span className="text-gray-500">FILE SIZE:</span> 
                          <span className="ml-1 text-gray-300">{resource.downloadSize}</span>
                        </div>
                        <div className="flex items-center">
                          <Lock size={12} className="mr-1 text-red-500" />
                          <span className="text-gray-500">ACCESS LEVEL:</span> 
                          <span className="ml-1 text-gray-300">{resource.securityLevel}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-red-900/10 border border-red-900/30 rounded-full text-xs text-gray-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Reading progress bar in expanded view */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">READING PROGRESS</span>
                        <span className="text-gray-400">{Math.floor(resource.readingProgress || 0)}%</span>
                      </div>
                      <div className="h-2 bg-red-900/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-600 transition-all duration-300"
                          style={{ width: `${resource.readingProgress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        Added: {new Date(resource.dateAdded).toLocaleDateString()}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          className="px-3 py-1 bg-black border border-red-900/50 rounded text-xs text-gray-400 flex items-center hover:bg-red-900/20"
                          onClick={() => updateReadingProgress(resource.id, Math.min(100, (resource.readingProgress || 0) + 20))}
                        >
                          <Clock size={12} className="mr-1" />
                          UPDATE PROGRESS
                        </button>
                        
                        <button 
                          className="px-3 py-1 bg-red-900 border border-red-700 rounded text-xs text-white flex items-center hover:bg-red-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(resource.id);
                          }}
                        >
                          {resource.isDownloaded ? (
                            <>
                              <CheckCircle size={12} className="mr-1" />
                              DOWNLOADED
                            </>
                          ) : (
                            <>
                              <Download size={12} className="mr-1" />
                              SECURE DOWNLOAD
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-6 text-center border border-red-900/50 rounded-lg">
              <BookOpen size={32} className="mx-auto mb-2 text-red-500 opacity-50" />
              <p className="text-gray-500">No resources match your current filters.</p>
              <button 
                className="mt-2 px-3 py-1 bg-red-900/20 border border-red-900/50 rounded text-sm text-red-500"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                  setSelectedTags([]);
                }}
              >
                CLEAR_FILTERS
              </button>
            </div>
          )}
        </div>
        
        {/* Upload section */}
        <div className="mt-6 p-4 border border-red-900 rounded-lg bg-black flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h4 className="text-red-500 font-bold mb-1">CONTRIBUTE_YOUR_KNOWLEDGE</h4>
            <p className="text-sm text-gray-400">
              Share techniques, guides, or analysis to strengthen our collective capabilities.
            </p>
          </div>
          
          <button className="mt-3 sm:mt-0 px-4 py-2 bg-red-900 border border-red-700 rounded text-white font-mono hover:bg-red-800">
            UPLOAD_RESOURCE
          </button>
        </div>
      </div>
      
      {/* Encryption progress modal */}
      <ResourceEncryptionProgress 
        isActive={isDownloading}
        progress={downloadProgress}
        onComplete={completeDownload}
      />
    </div>
  );
};

// Helper components and icons
const Heart = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;

const Shield = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>;

const Cpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>;

const Database = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;

const User = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

export default EnhancedResourceLibrary;