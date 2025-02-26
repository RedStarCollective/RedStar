import React, { useState } from 'react';
import { BookOpen, Download, Search, Filter, Tag, Cpu, Heart, Shield, Database, Wrench, Lock, AlertTriangle, Zap, Wifi, ChevronDown, ChevronUp, Star, Terminal } from 'lucide-react';

const ResourceLibrary = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [expandedResource, setExpandedResource] = useState(null);
  
  // Resource categories
  const categories = [
    { id: 'all', name: 'ALL RESOURCES', icon: <Database size={16} /> },
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
  
  // Resource data
  const resources = [
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
      popularity: 487
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
      popularity: 356
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
      popularity: 632
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
      popularity: 289
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
      popularity: 412
    },
    {
      id: 6,
      title: "Combat Zone Food Security: Urban Foraging & Preservation",
      category: "survival",
      description: "Guide to finding, identifying, and preserving food sources in Night City's hostile environment. Includes detoxification procedures for contaminated foods.",
      author: "Chan-Woo Park",
      dateAdded: "2045-09-17",
      tags: ["Beginner", "Printable", "Daily Use", "Offline-Ready"],
      downloadSize: "7.5 MB",
      securityLevel: "Mass Organization Member",
      popularity: 521
    },
    {
      id: 7,
      title: "Digital Security Fundamentals: Protecting Community Communications",
      category: "tech",
      description: "Basic protocols for secure communication in hostile environments. Covers encryption basics, anonymous browsing, and counter-surveillance techniques.",
      author: "RSC Tech Committee",
      dateAdded: "2045-10-12",
      tags: ["Beginner", "Interactive", "Training"],
      downloadSize: "5.8 MB",
      securityLevel: "Mass Organization Member",
      popularity: 378
    },
    {
      id: 8,
      title: "Tenant Organizing Toolkit: Fighting Corporate Landlords",
      category: "organizing",
      description: "Practical strategies for organizing tenants against evictions, rent increases, and unsafe conditions. Includes legal templates and direct action protocols.",
      author: "Leonard Turner & Le Fou",
      dateAdded: "2046-01-25",
      tags: ["Beginner", "Printable", "Night City Specific"],
      downloadSize: "9.2 MB",
      securityLevel: "Mass Organization Member",
      popularity: 344
    },
    {
      id: 9,
      title: "Storm Ardent Response Analysis: Lessons in Disaster Relief",
      category: "survival",
      description: "Comprehensive review of RSC's response to Storm Ardent, with analytical framework for future disaster preparation and community coordination.",
      author: "Revolutionary Committee",
      dateAdded: "2045-07-30",
      tags: ["Advanced", "Training", "Night City Specific"],
      downloadSize: "18.3 MB",
      securityLevel: "Candidate Member",
      popularity: 265
    },
    {
      id: 10,
      title: "Mental Health First Aid: Combat Zone Edition",
      category: "medical",
      description: "Guide to identifying and supporting those experiencing trauma, anxiety, and other mental health challenges in high-stress environments.",
      author: "Dr. Iō",
      dateAdded: "2046-02-28",
      tags: ["Beginner", "Daily Use", "Printable"],
      downloadSize: "6.9 MB",
      securityLevel: "Mass Organization Member",
      popularity: 402
    }
  ];
  
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
  
  // Get icon based on resource category
  const getCategoryIcon = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : <Database size={16} />;
  };
  
  // Function to toggle expanded resource
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
                    </div>
                    
                    <p className="text-sm text-gray-400 line-clamp-1">
                      {resource.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center ml-3">
                    <button className="p-1 bg-red-900/20 border border-red-900/50 rounded mr-2 hover:bg-red-900/40">
                      <Download size={16} className="text-red-500" />
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
                          <Terminal size={12} className="mr-1 text-red-500" />
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
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        Added: {new Date(resource.dateAdded).toLocaleDateString()}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-black border border-red-900/50 rounded text-xs text-gray-400 flex items-center hover:bg-red-900/20">
                          <Wifi size={12} className="mr-1" />
                          STREAM
                        </button>
                        <button className="px-3 py-1 bg-red-900 border border-red-700 rounded text-xs text-white flex items-center hover:bg-red-800">
                          <Download size={12} className="mr-1" />
                          DOWNLOAD
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
    </div>
  );
};

export default ResourceLibrary;