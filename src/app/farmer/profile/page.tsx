"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  User,
  Edit,
  Save,
  Camera,
  Upload,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  Star,
  CheckCircle,
  Shield,
  Leaf,
  Users,
  TrendingUp,
  Package,
  Clock,
  Eye,
  Share2,
  Download,
  Settings,
  Bell,
  Lock,
  CreditCard,
  Globe,
  FileText,
  Image as ImageIcon,
  Menu,
  Plus,
  Trash2
} from 'lucide-react';

const FarmerProfilePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Enhanced responsive detection that matches the sidebar
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  // Enhanced responsive detection - same as marketplace
  useEffect(() => {
    setMounted(true);
    
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const newScreenSize = {
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      };
      
      // Only update if there's a change
      if (JSON.stringify(newScreenSize) !== JSON.stringify(screenSize)) {
        setScreenSize(newScreenSize);
      }

      // Auto-close mobile menu when switching to desktop/tablet
      if (!newScreenSize.isMobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize, { passive: true });
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [screenSize, isMobileMenuOpen]);

  // Farmer profile data
  const [profileData, setProfileData] = useState({
    // Basic Info
    name: 'Ravi Mahathaya',
    email: 'ravi.mahathaya@fieldfair.lk',
    phone: '+94 77 123 4567',
    address: 'Pannala Road, Kurunegala, North Western Province',
    joinDate: '2018-03-15',
    
    // Farm Info
    farmName: "Ravi's Organic Farm",
    farmSize: '2.5 acres',
    farmType: 'Organic Vegetables',
    experience: '6 years',
    specialties: ['Tomatoes', 'Carrots', 'Cabbage', 'Green Beans'],
    farmingMethods: ['Organic', 'Sustainable', 'Traditional'],
    
    // Certifications
    certifications: [
      { name: 'Organic Certification', issuer: 'IFOAM', date: '2019-06-01', status: 'Active' },
      { name: 'Good Agricultural Practices', issuer: 'GAP Sri Lanka', date: '2020-01-15', status: 'Active' },
      { name: 'Fair Trade Certified', issuer: 'Fair Trade Lanka', date: '2021-03-10', status: 'Active' }
    ],
    
    // Stats
    stats: {
      totalProducts: 24,
      totalOrders: 1247,
      customerRating: 4.8,
      totalCustomers: 156,
      totalRevenue: 127500,
      completionRate: 98
    },
    
    // Profile Settings
    visibility: 'public',
    allowMessages: true,
    allowVisits: true,
    showContact: true,
    
    // Bio
    bio: 'Passionate organic farmer with over 6 years of experience. Specializing in fresh vegetables grown using sustainable farming practices. Committed to providing healthy, chemical-free produce to the community.',
    
    // Social
    website: 'www.raviorganicfarm.lk',
    facebook: 'RaviOrganicFarm',
    
    // Images
    profileImage: '👨‍🌾',
    coverImage: '🌾',
    galleryImages: ['🍅', '🥕', '🥬', '🫘', '🌱', '🚜']
  });

  // Loading state to prevent hydration errors
  if (!mounted) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 bg-emerald-900 animate-pulse"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  // Enhanced margin calculation that matches the sidebar logic
  const getMainContentMargin = () => {
    if (screenSize.isMobile) {
      return 'ml-0'; // No margin on mobile (sidebar overlays)
    } else if (screenSize.isTablet) {
      return 'ml-20'; // Always collapsed margin on tablet
    } else {
      return sidebarCollapsed ? 'ml-20' : 'ml-72'; // User controlled on desktop
    }
  };

  const handleSave = () => {
    setEditMode(false);
    // Save logic here
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* SINGLE Sidebar Component - Enhanced Responsive */}
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={screenSize.isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="farmer"
      />

      {/* Main Content - Enhanced Responsive Margin */}
      <div className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 ${getMainContentMargin()}`}>
        {/* Enhanced Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4">
                {/* Mobile menu button - only show on mobile */}
                {screenSize.isMobile && (
                  <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                )}
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {screenSize.isMobile ? 'Profile' : 'Farmer Profile'}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1 hidden sm:block">
                    {screenSize.isMobile 
                      ? 'Manage your profile' 
                      : 'Manage your profile and farm information'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              {!screenSize.isMobile && (
                <>
                  <button className="hidden md:flex items-center bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-blue-700 hover:bg-blue-100 transition-colors">
                    <Eye className="w-4 h-4 mr-2" />
                    Public View
                  </button>
                  
                  <button className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Profile
                  </button>
                </>
              )}
              
              {editMode ? (
                <button 
                  onClick={handleSave}
                  className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
              ) : (
                <button 
                  onClick={() => setEditMode(true)}
                  className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Profile Header - Enhanced Responsive */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
              {/* Cover Image */}
              <div className="relative h-32 lg:h-48 bg-gradient-to-r from-emerald-400 to-green-600 flex items-center justify-center">
                <span className={`${screenSize.isMobile ? 'text-4xl' : 'text-6xl lg:text-8xl'}`}>
                  {profileData.coverImage}
                </span>
                {editMode && (
                  <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm hover:bg-opacity-30 transition-colors">
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
              
              {/* Profile Info - Enhanced Responsive Layout */}
              <div className="p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Profile Picture */}
                  <div className="relative self-start">
                    <div className={`${
                      screenSize.isMobile ? 'w-16 h-16 text-2xl -mt-8' : 'w-20 lg:w-32 h-20 lg:h-32 text-4xl lg:text-6xl -mt-10 lg:-mt-16'
                    } bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg`}>
                      {profileData.profileImage}
                    </div>
                    {editMode && (
                      <button className="absolute bottom-0 right-0 p-1.5 lg:p-2 bg-emerald-600 rounded-full text-white hover:bg-emerald-700 transition-colors">
                        <Camera className="w-3 lg:w-4 h-3 lg:h-4" />
                      </button>
                    )}
                  </div>
                  
                  {/* Basic Info - Enhanced Mobile Layout */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
                      <h2 className={`${screenSize.isMobile ? 'text-lg' : 'text-xl lg:text-2xl'} font-bold text-gray-900`}>
                        {profileData.name}
                      </h2>
                      <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                        <div className="flex items-center space-x-1">
                          <Shield className="w-4 h-4 text-blue-500" />
                          <span className="text-xs sm:text-sm text-blue-600 font-medium">Verified</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Leaf className="w-4 h-4 text-green-500" />
                          <span className="text-xs sm:text-sm text-green-600 font-medium">Organic</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className={`${screenSize.isMobile ? 'text-base' : 'text-lg'} font-semibold text-emerald-600 mb-3`}>
                      {profileData.farmName}
                    </h3>
                    
                    <div className={`grid ${screenSize.isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 lg:grid-cols-4 gap-4'}`}>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">Kurunegala</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{profileData.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" />
                        <span>{profileData.stats.customerRating} rating</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span>{profileData.stats.totalCustomers} customers</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats - Enhanced Mobile Layout */}
                  <div className={`${screenSize.isMobile ? 'flex justify-around border-t pt-4 mt-4' : 'grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-2'}`}>
                    <div className={`${screenSize.isMobile ? 'text-center' : 'text-center lg:text-right'}`}>
                      <div className={`${screenSize.isMobile ? 'text-lg' : 'text-xl lg:text-2xl'} font-bold text-gray-900`}>
                        {profileData.stats.totalProducts}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-500">Products</div>
                    </div>
                    <div className={`${screenSize.isMobile ? 'text-center' : 'text-center lg:text-right'}`}>
                      <div className={`${screenSize.isMobile ? 'text-lg' : 'text-xl lg:text-2xl'} font-bold text-gray-900`}>
                        {profileData.stats.totalOrders}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-500">Orders</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs - Enhanced Mobile Responsive */}
            <div className="bg-white rounded-xl border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className={`flex ${screenSize.isMobile ? 'space-x-4 px-4 overflow-x-auto' : 'space-x-8 px-6'}`}>
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className={screenSize.isMobile ? 'text-xs' : ''}>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
              
              <div className="p-4 lg:p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Bio */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                      {editMode ? (
                        <textarea
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          rows={screenSize.isMobile ? 3 : 4}
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        />
                      ) : (
                        <p className="text-gray-600 text-sm lg:text-base">{profileData.bio}</p>
                      )}
                    </div>

                    {/* Contact Information - Enhanced Mobile Layout */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                      <div className={`grid ${screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <Phone className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-gray-500">Phone</div>
                            {editMode ? (
                              <input
                                type="tel"
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                              />
                            ) : (
                              <div className="font-medium text-gray-900 truncate">{profileData.phone}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-gray-500">Email</div>
                            {editMode ? (
                              <input
                                type="email"
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                                value={profileData.email}
                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                              />
                            ) : (
                              <div className="font-medium text-gray-900 truncate">{profileData.email}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className={`${screenSize.isMobile ? 'col-span-1' : 'col-span-2 md:col-span-1'} flex items-center space-x-3 p-3 bg-gray-50 rounded-lg`}>
                          <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-gray-500">Address</div>
                            {editMode ? (
                              <input
                                type="text"
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                                value={profileData.address}
                                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                              />
                            ) : (
                              <div className="font-medium text-gray-900 truncate">{profileData.address}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <Globe className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-gray-500">Website</div>
                            {editMode ? (
                              <input
                                type="url"
                                className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                                value={profileData.website}
                                onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                              />
                            ) : (
                              <div className="font-medium text-gray-900 truncate">{profileData.website}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Farm Information - Enhanced Mobile Grid */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Farm Information</h3>
                      <div className={`grid gap-4 ${
                        screenSize.isMobile ? 'grid-cols-2' : 
                        screenSize.isTablet ? 'grid-cols-2' : 
                        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                      }`}>
                        <div className="p-4 bg-emerald-50 rounded-lg">
                          <div className="text-sm text-emerald-600">Farm Size</div>
                          <div className={`${screenSize.isMobile ? 'text-lg' : 'text-xl'} font-bold text-emerald-900`}>
                            {profileData.farmSize}
                          </div>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="text-sm text-blue-600">Farm Type</div>
                          <div className={`${screenSize.isMobile ? 'text-lg' : 'text-xl'} font-bold text-blue-900`}>
                            {profileData.farmType}
                          </div>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <div className="text-sm text-purple-600">Experience</div>
                          <div className={`${screenSize.isMobile ? 'text-lg' : 'text-xl'} font-bold text-purple-900`}>
                            {profileData.experience}
                          </div>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg">
                          <div className="text-sm text-orange-600">Completion Rate</div>
                          <div className={`${screenSize.isMobile ? 'text-lg' : 'text-xl'} font-bold text-orange-900`}>
                            {profileData.stats.completionRate}%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.specialties.map((specialty, index) => (
                          <span key={index} className={`inline-flex items-center px-3 py-1 rounded-full ${
                            screenSize.isMobile ? 'text-xs' : 'text-sm'
                          } font-medium bg-emerald-100 text-emerald-800`}>
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Farming Methods */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Farming Methods</h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.farmingMethods.map((method, index) => (
                          <span key={index} className={`inline-flex items-center px-3 py-1 rounded-full ${
                            screenSize.isMobile ? 'text-xs' : 'text-sm'
                          } font-medium bg-green-100 text-green-800`}>
                            <Leaf className="w-3 h-3 mr-1" />
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Certifications Tab */}
                {activeTab === 'certifications' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Certifications & Awards</h3>
                      {editMode && (
                        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors">
                          <Plus className="w-4 h-4 mr-2" />
                          <span className="hidden sm:inline">Add Certification</span>
                          <span className="sm:hidden">Add</span>
                        </button>
                      )}
                    </div>
                    
                    <div className={`grid gap-4 ${screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                      {profileData.certifications.map((cert, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3 flex-1 min-w-0">
                              <Award className="w-8 h-8 text-yellow-500 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <h4 className="font-semibold text-gray-900 truncate">{cert.name}</h4>
                                <p className="text-sm text-gray-600 truncate">Issued by {cert.issuer}</p>
                                <p className="text-xs text-gray-500">Date: {new Date(cert.date).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                              cert.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {cert.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery Tab */}
                {activeTab === 'gallery' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Farm Gallery</h3>
                      {editMode && (
                        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors">
                          <Upload className="w-4 h-4 mr-2" />
                          <span className="hidden sm:inline">Upload Photos</span>
                          <span className="sm:hidden">Upload</span>
                        </button>
                      )}
                    </div>
                    
                    <div className={`grid gap-4 ${
                      screenSize.isMobile ? 'grid-cols-2' : 
                      screenSize.isTablet ? 'grid-cols-3' : 
                      'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                    }`}>
                      {profileData.galleryImages.map((image, index) => (
                        <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                          <div className="w-full h-full flex items-center justify-center text-4xl">
                            {image}
                          </div>
                          {editMode && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                      {editMode && (
                        <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors">
                          <Upload className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
                    
                    <div className="space-y-4">
                      <div className={`flex ${screenSize.isMobile ? 'flex-col space-y-3' : 'items-center justify-between'} p-4 bg-gray-50 rounded-lg`}>
                        <div>
                          <div className="font-medium text-gray-900">Profile Visibility</div>
                          <div className="text-sm text-gray-600">Control who can see your profile</div>
                        </div>
                        <select 
                          className="border border-gray-300 rounded-lg px-3 py-2"
                          value={profileData.visibility}
                          onChange={(e) => setProfileData({...profileData, visibility: e.target.value})}
                        >
                          <option value="public">Public</option>
                          <option value="customers">Customers Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      
                      <div className={`flex ${screenSize.isMobile ? 'flex-col space-y-3' : 'items-center justify-between'} p-4 bg-gray-50 rounded-lg`}>
                        <div>
                          <div className="font-medium text-gray-900">Allow Messages</div>
                          <div className="text-sm text-gray-600">Let customers send you messages</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={profileData.allowMessages}
                            onChange={(e) => setProfileData({...profileData, allowMessages: e.target.checked})}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                      
                      <div className={`flex ${screenSize.isMobile ? 'flex-col space-y-3' : 'items-center justify-between'} p-4 bg-gray-50 rounded-lg`}>
                        <div>
                          <div className="font-medium text-gray-900">Allow Farm Visits</div>
                          <div className="text-sm text-gray-600">Enable customers to book farm visits</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={profileData.allowVisits}
                            onChange={(e) => setProfileData({...profileData, allowVisits: e.target.checked})}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                      
                      <div className={`flex ${screenSize.isMobile ? 'flex-col space-y-3' : 'items-center justify-between'} p-4 bg-gray-50 rounded-lg`}>
                        <div>
                          <div className="font-medium text-gray-900">Show Contact Information</div>
                          <div className="text-sm text-gray-600">Display phone and email publicly</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={profileData.showContact}
                            onChange={(e) => setProfileData({...profileData, showContact: e.target.checked})}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerProfilePage;