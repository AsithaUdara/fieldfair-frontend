"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  MapPin,
  Navigation,
  Map,
  Plus,
  Edit,
  Trash2,
  Save,
  Camera,
  Upload,
  CheckCircle,
  Clock,
  AlertTriangle,
  Route,
  Truck,
  Home,
  Building,
  Phone,
  Globe,
  Users,
  Star,
  Eye,
  Menu,
  X
} from 'lucide-react';

const FarmerLocationPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showAddLocationModal, setShowAddLocationModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Enhanced responsive detection that matches the sidebar
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  // Enhanced responsive detection - same as enhanced sidebar and marketplace
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

  // Mock farm locations data
  const [locations, setLocations] = useState([
    {
      id: 1,
      name: 'Main Farm - Kurunegala',
      type: 'Primary Farm',
      address: 'Pannala Road, Kurunegala, North Western Province',
      coordinates: { lat: 7.4863, lng: 80.3647 },
      area: '2.5 acres',
      crops: ['Tomatoes', 'Carrots', 'Cabbage'],
      status: 'active',
      established: '2018',
      facilities: ['Greenhouse', 'Irrigation System', 'Storage'],
      isMain: true,
      visitors: 127,
      rating: 4.8,
      images: ['🏡', '🌾', '🚜'],
      contactPerson: 'Ravi Mahathaya',
      phone: '+94 77 123 4567',
      description: 'Our main organic farm specializing in fresh vegetables with modern farming techniques.'
    },
    {
      id: 2,
      name: 'Secondary Plot - Matale',
      type: 'Secondary Farm',
      address: 'Dambulla Road, Matale, Central Province',
      coordinates: { lat: 7.4675, lng: 80.6234 },
      area: '1.2 acres',
      crops: ['Green Beans', 'Onions'],
      status: 'active',
      established: '2020',
      facilities: ['Well Water', 'Tool Shed'],
      isMain: false,
      visitors: 45,
      rating: 4.6,
      images: ['🌱', '🏞️'],
      contactPerson: 'Saman Silva',
      phone: '+94 76 987 6543',
      description: 'Secondary farm location focusing on specialty crops and experimental farming.'
    },
    {
      id: 3,
      name: 'Delivery Hub - Colombo',
      type: 'Distribution Center',
      address: 'Manning Road, Colombo 07, Western Province',
      coordinates: { lat: 6.9271, lng: 79.8612 },
      area: '0.1 acres',
      crops: [],
      status: 'active',
      established: '2022',
      facilities: ['Cold Storage', 'Loading Bay', 'Office'],
      isMain: false,
      visitors: 234,
      rating: 4.5,
      images: ['🏬', '📦'],
      contactPerson: 'Nimal Perera',
      phone: '+94 71 555 0123',
      description: 'Urban distribution center for efficient delivery to Colombo customers.'
    }
  ]);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Primary Farm': return Home;
      case 'Secondary Farm': return Building;
      case 'Distribution Center': return Truck;
      default: return MapPin;
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={screenSize.isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="farmer"
      />

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
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 mr-2 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                )}
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {screenSize.isMobile ? '📍 Locations' : '🏡 Farm Locations'}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    {screenSize.isMobile 
                      ? 'Manage your locations' 
                      : 'Manage your farm locations and distribution centers'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              {!screenSize.isMobile && (
                <button className="hidden md:flex items-center bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-blue-700 hover:bg-blue-100 transition-colors">
                  <Navigation className="w-4 h-4 mr-2" />
                  View on Map
                </button>
              )}
              
              <button 
                onClick={() => setShowAddLocationModal(true)}
                className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className={screenSize.isMobile ? "text-xs" : ""}>
                  {screenSize.isMobile ? "Add" : "Add Location"}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Stats Cards - Responsive Grid */}
            <div className={`grid gap-4 lg:gap-6 mb-6 ${
              screenSize.isMobile ? 'grid-cols-2' : 
              screenSize.isTablet ? 'grid-cols-2' : 
              'grid-cols-4'
            }`}>
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">Total Locations</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{locations.length}</p>
                  </div>
                  <MapPin className="w-5 lg:w-8 h-5 lg:h-8 text-emerald-500" />
                </div>
              </div>
              
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">Total Farm Area</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">3.7 acres</p>
                  </div>
                  <Building className="w-5 lg:w-8 h-5 lg:h-8 text-blue-500" />
                </div>
              </div>
              
              {!screenSize.isMobile && (
                <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600">Active Locations</p>
                      <p className="text-xl lg:text-2xl font-bold text-gray-900">{locations.filter(l => l.status === 'active').length}</p>
                    </div>
                    <CheckCircle className="w-5 lg:w-8 h-5 lg:h-8 text-green-500" />
                  </div>
                </div>
              )}
              
              {!screenSize.isMobile && (
                <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600">Total Visitors</p>
                      <p className="text-xl lg:text-2xl font-bold text-gray-900">{locations.reduce((acc, l) => acc + l.visitors, 0)}</p>
                    </div>
                    <Users className="w-5 lg:w-8 h-5 lg:h-8 text-purple-500" />
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Locations Grid - Responsive */}
            <div className={`grid gap-4 lg:gap-6 ${
              screenSize.isMobile ? 'grid-cols-1' : 
              screenSize.isTablet ? 'grid-cols-1' : 
              'grid-cols-2 xl:grid-cols-3'
            }`}>
              {locations.map((location) => {
                const TypeIcon = getTypeIcon(location.type);
                return (
                  <div key={location.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Location Header */}
                    <div className="relative h-32 bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
                      <div className="flex space-x-2 text-4xl">
                        {location.images.map((emoji, index) => (
                          <span key={index}>{emoji}</span>
                        ))}
                      </div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(location.status)}`}>
                          {location.isMain && <Star className="w-3 h-3 mr-1 fill-current" />}
                          {location.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-700 border">
                          <TypeIcon className="w-3 h-3 mr-1" />
                          {screenSize.isMobile ? location.type.split(' ')[0] : location.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 lg:p-5">
                      {/* Location Name & Rating */}
                      <div className="mb-4">
                        <h3 className="font-bold text-base lg:text-lg text-gray-900 mb-2 line-clamp-2">{location.name}</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            {[1,2,3,4,5].map(i => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i <= Math.floor(location.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm font-medium text-gray-900 ml-1">{location.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">{location.visitors} visitors</span>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700 line-clamp-2">{location.address}</span>
                        </div>
                      </div>

                      {/* Details - Responsive Layout */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Area:</span>
                          <span className="font-medium text-gray-900">{location.area}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Established:</span>
                          <span className="font-medium text-gray-900">{location.established}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Contact:</span>
                          <span className="font-medium text-gray-900 truncate ml-2">{location.contactPerson}</span>
                        </div>
                      </div>

                      {/* Crops */}
                      {location.crops.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Current Crops:</p>
                          <div className="flex flex-wrap gap-1">
                            {location.crops.slice(0, screenSize.isMobile ? 2 : 3).map((crop, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {crop}
                              </span>
                            ))}
                            {location.crops.length > (screenSize.isMobile ? 2 : 3) && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                +{location.crops.length - (screenSize.isMobile ? 2 : 3)} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Facilities */}
                      <div className="mb-5">
                        <p className="text-sm text-gray-600 mb-2">Facilities:</p>
                        <div className="flex flex-wrap gap-1">
                          {location.facilities.slice(0, screenSize.isMobile ? 2 : 3).map((facility, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {facility}
                            </span>
                          ))}
                          {location.facilities.length > (screenSize.isMobile ? 2 : 3) && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                              +{location.facilities.length - (screenSize.isMobile ? 2 : 3)} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Buttons - Enhanced Responsive */}
                      <div className="flex items-center space-x-2">
                        <button className="flex-1 border-2 border-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:border-emerald-300 hover:bg-emerald-50 transition-colors flex items-center justify-center">
                          <Eye className="w-4 h-4 mr-2" />
                          {screenSize.isMobile ? 'View' : 'View Details'}
                        </button>
                        <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                          <Edit className="w-4 h-4 text-gray-700" />
                        </button>
                        {!screenSize.isMobile && (
                          <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors">
                            <Trash2 className="w-4 h-4 text-gray-700" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Add Location Modal - Responsive */}
            {showAddLocationModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className={`bg-white rounded-xl p-4 lg:p-6 w-full max-h-[90vh] overflow-y-auto ${
                  screenSize.isMobile ? 'max-w-sm' : 'max-w-2xl'
                }`}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg lg:text-xl font-bold text-gray-900">
                      {screenSize.isMobile ? 'Add Location' : 'Add New Location'}
                    </h2>
                    <button 
                      onClick={() => setShowAddLocationModal(false)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form className="space-y-6">
                    <div className={`grid gap-6 ${screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g., Main Farm - Kurunegala"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location Type</label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                          <option>Primary Farm</option>
                          <option>Secondary Farm</option>
                          <option>Distribution Center</option>
                          <option>Storage Facility</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                      <textarea 
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter complete address with postal code"
                      />
                    </div>

                    <div className={`grid gap-6 ${screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Area</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g., 2.5 acres"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Manager name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="+94 77 123 4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea 
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Describe the location, its purpose, and key features"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location Photos</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {screenSize.isMobile ? 'Tap to upload photos' : 'Click to upload photos or drag and drop'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB each</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="mainLocation" className="rounded" />
                      <label htmlFor="mainLocation" className="text-sm text-gray-700">This is a main/primary location</label>
                    </div>

                    <div className={`flex pt-6 border-t border-gray-200 ${
                      screenSize.isMobile ? 'flex-col space-y-3' : 'justify-end space-x-4'
                    }`}>
                      <button 
                        type="button"
                        onClick={() => setShowAddLocationModal(false)}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Add Location
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerLocationPage;