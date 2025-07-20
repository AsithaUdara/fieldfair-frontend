"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FieldFairSidebar from '@/components/ui/layout/sidebar'; // Import the external sidebar
import { 
  Search,
  Filter,
  MapPin,
  Star,
  Leaf,
  Award,
  Phone,
  Navigation,
  Calendar,
  Package,
  Users,
  Clock,
  Map,
  List,
  Eye,
  MessageCircle,
  Heart,
  Truck,
  Shield,
  Menu,
  X
} from 'lucide-react';

const FindFarmsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    distance: 'all',
    type: 'all',
    certification: 'all',
    rating: 'all'
  });
  const [selectedFarm, setSelectedFarm] = useState<number | null>(null);

  // Enhanced responsive detection that matches the sidebar and marketplace
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

  // Mock farms data
  const [farms] = useState([
    {
      id: 1,
      name: "Ravi's Organic Farm",
      owner: 'Ravi Mahathaya',
      location: 'Kurunegala, North Western Province',
      coordinates: { lat: 7.4818, lng: 80.3609 },
      distance: '2.5 km',
      rating: 4.8,
      reviews: 127,
      image: 'RM',
      description: 'Certified organic farm specializing in vegetables and fruits',
      farmSize: '2.5 acres',
      established: '2018',
      certifications: ['Organic Certified', 'Fair Trade'],
      specialties: ['Tomatoes', 'Carrots', 'Lettuce', 'Herbs'],
      farmingMethod: 'Organic',
      phone: '+94 77 296 7477',
      totalProducts: 15,
      activeOrders: 8,
      visitingHours: '6:00 AM - 6:00 PM',
      visitCost: 'Free',
      amenities: ['Farm Tour', 'Educational Visit', 'Product Tasting', 'Organic Shop'],
      languages: ['Sinhala', 'English']
    },
    {
      id: 2,
      name: "Silva Sustainable Farm",
      owner: 'Saman Silva',
      location: 'Matale, Central Province',
      coordinates: { lat: 7.4675, lng: 80.6234 },
      distance: '5.2 km',
      rating: 4.6,
      reviews: 89,
      image: 'SS',
      description: 'Traditional and sustainable farming practices since 1995',
      farmSize: '4.1 acres',
      established: '1995',
      certifications: ['Sustainable Farming'],
      specialties: ['Rice', 'Coconut', 'Spices', 'Vegetables'],
      farmingMethod: 'Sustainable',
      phone: '+94 81 222 3456',
      totalProducts: 22,
      activeOrders: 12,
      visitingHours: '7:00 AM - 5:00 PM',
      visitCost: 'Rs. 500 per person',
      amenities: ['Farm Tour', 'Cooking Class', 'Accommodation', 'Restaurant'],
      languages: ['Sinhala', 'English', 'Tamil']
    },
    {
      id: 3,
      name: "Green Valley Farm",
      owner: 'Nimal Gunasekara',
      location: 'Nuwara Eliya, Central Province',
      coordinates: { lat: 6.9497, lng: 80.7891 },
      distance: '15.7 km',
      rating: 4.9,
      reviews: 78,
      image: 'NG',
      description: 'High-altitude organic farming with premium vegetables',
      farmSize: '3.8 acres',
      established: '2015',
      certifications: ['Organic Certified', 'Export Quality'],
      specialties: ['Green Beans', 'Cabbage', 'Carrots', 'Potatoes'],
      farmingMethod: 'Organic',
      phone: '+94 52 222 7890',
      totalProducts: 18,
      activeOrders: 15,
      visitingHours: '8:00 AM - 4:00 PM',
      visitCost: 'Rs. 750 per person',
      amenities: ['Farm Tour', 'Greenhouse Visit', 'Product Sampling', 'Photography'],
      languages: ['Sinhala', 'English']
    },
    {
      id: 4,
      name: "Heritage Spice Farm",
      owner: 'Kamala Jayawardena',
      location: 'Kandy, Central Province',
      coordinates: { lat: 7.2906, lng: 80.6337 },
      distance: '8.1 km',
      rating: 4.7,
      reviews: 156,
      image: 'KJ',
      description: 'Traditional spice cultivation with heritage varieties',
      farmSize: '5.2 acres',
      established: '1985',
      certifications: ['Traditional Methods', 'Heritage Varieties'],
      specialties: ['Cinnamon', 'Cardamom', 'Pepper', 'Nutmeg'],
      farmingMethod: 'Traditional',
      phone: '+94 81 333 4567',
      totalProducts: 25,
      activeOrders: 6,
      visitingHours: '6:30 AM - 6:30 PM',
      visitCost: 'Rs. 1000 per person',
      amenities: ['Spice Tour', 'Processing Demo', 'Cooking Class', 'Gift Shop'],
      languages: ['Sinhala', 'English']
    },
    {
      id: 5,
      name: "Eco Valley Farm",
      owner: 'Priyantha Fernando',
      location: 'Gampaha, Western Province',
      coordinates: { lat: 7.0873, lng: 80.0142 },
      distance: '12.3 km',
      rating: 4.5,
      reviews: 203,
      image: 'PF',
      description: 'Eco-friendly farming with renewable energy systems',
      farmSize: '6.5 acres',
      established: '2010',
      certifications: ['Eco-Friendly', 'Solar Powered'],
      specialties: ['Leafy Greens', 'Fruits', 'Herbs', 'Microgreens'],
      farmingMethod: 'Hydroponic',
      phone: '+94 33 456 7890',
      totalProducts: 30,
      activeOrders: 20,
      visitingHours: '7:00 AM - 7:00 PM',
      visitCost: 'Rs. 600 per person',
      amenities: ['Tech Tour', 'Hydroponic Demo', 'Solar System', 'Research Lab'],
      languages: ['Sinhala', 'English']
    }
  ]);

  const filterOptions = {
    distance: [
      { value: 'all', label: 'All Distances' },
      { value: '5', label: 'Within 5km' },
      { value: '10', label: 'Within 10km' },
      { value: '25', label: 'Within 25km' }
    ],
    type: [
      { value: 'all', label: 'All Types' },
      { value: 'organic', label: 'Organic' },
      { value: 'sustainable', label: 'Sustainable' },
      { value: 'traditional', label: 'Traditional' },
      { value: 'hydroponic', label: 'Hydroponic' }
    ],
    certification: [
      { value: 'all', label: 'All Certifications' },
      { value: 'organic', label: 'Organic Certified' },
      { value: 'fair_trade', label: 'Fair Trade' },
      { value: 'sustainable', label: 'Sustainable Farming' }
    ],
    rating: [
      { value: 'all', label: 'All Ratings' },
      { value: '4.5', label: '4.5+ Stars' },
      { value: '4.0', label: '4.0+ Stars' },
      { value: '3.5', label: '3.5+ Stars' }
    ]
  };

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

  const filteredFarms = farms.filter(farm => {
    const matchesSearch = farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDistance = selectedFilters.distance === 'all' || 
                           parseFloat(farm.distance) <= parseFloat(selectedFilters.distance);
    
    const matchesType = selectedFilters.type === 'all' || 
                       farm.farmingMethod.toLowerCase() === selectedFilters.type;
    
    const matchesRating = selectedFilters.rating === 'all' || 
                         farm.rating >= parseFloat(selectedFilters.rating);
    
    return matchesSearch && matchesDistance && matchesType && matchesRating;
  });

  const bookVisit = (farmId: number) => {
    console.log('Booking visit to farm:', farmId);
    // In real app, open visit booking modal
  };

  const contactFarmer = (phone: string) => {
    console.log('Contacting farmer:', phone);
    // In real app, open contact modal or dial
  };

  const getDirections = (coordinates: { lat: number; lng: number }) => {
    console.log('Getting directions to:', coordinates);
    // In real app, open maps with directions
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* SINGLE Enhanced Sidebar Component */}
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={screenSize.isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="customer"
      />

      {/* Main Content - Enhanced Responsive Margin */}
      <div className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 ${getMainContentMargin()}`}>
        {/* Enhanced Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile menu button - only show on mobile */}
              {screenSize.isMobile && (
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}
              
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {screenSize.isMobile ? '🚜 Farms' : '🚜 Find Farms'}
                </h1>
                <p className="text-sm text-gray-600 mt-1 hidden sm:block">
                  {screenSize.isMobile 
                    ? 'Discover local farms' 
                    : 'Discover local farms and plan your visits'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!screenSize.isMobile && (
                <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                  <Search className="w-4 h-4 text-gray-500 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search farms, farmers, products..."
                    className="bg-transparent text-sm outline-none w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
                  className={`p-2 lg:p-3 rounded-lg transition-colors ${
                    viewMode === 'map' 
                      ? 'bg-emerald-100 text-emerald-600' 
                      : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {viewMode === 'map' ? <List className="w-4 h-4" /> : <Map className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="flex h-full">
            {/* Enhanced Sidebar Filters - Responsive */}
            <div className={`bg-white border-r border-gray-200 overflow-auto ${
              screenSize.isMobile ? 'w-full' : 
              screenSize.isTablet ? 'w-72' : 
              'w-80'
            }`}>
              <div className="p-4 lg:p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                </div>

                {/* Mobile Search */}
                {screenSize.isMobile && (
                  <div className="mb-6">
                    <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                      <Search className="w-4 h-4 text-gray-500 mr-2" />
                      <input 
                        type="text" 
                        placeholder="Search farms..."
                        className="bg-transparent text-sm outline-none flex-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Distance Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Distance</label>
                  <select
                    value={selectedFilters.distance}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, distance: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {filterOptions.distance.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Farm Type Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Farm Type</label>
                  <select
                    value={selectedFilters.type}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {filterOptions.type.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Minimum Rating</label>
                  <select
                    value={selectedFilters.rating}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, rating: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {filterOptions.rating.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Results Count */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="text-emerald-800 font-medium">
                    {filteredFarms.length} farms found
                  </div>
                  <div className="text-emerald-600 text-sm mt-1">
                    Based on your current filters
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {viewMode === 'map' ? (
                /* Enhanced Map View */
                <div className="h-full relative">
                  {/* Mock Map */}
                  <div className="h-full bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center relative">
                    <div className="text-center">
                      <Map className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                      <h3 className={`font-semibold text-gray-600 mb-2 ${
                        screenSize.isMobile ? 'text-lg' : 'text-xl'
                      }`}>Interactive Farm Map</h3>
                      <p className="text-gray-500 text-sm lg:text-base">Farm locations would be displayed here</p>
                      <p className="text-xs lg:text-sm text-gray-400 mt-2">
                        Integrate with Google Maps API in production
                      </p>
                    </div>
                    
                    {/* Map Markers Preview */}
                    {filteredFarms.slice(0, 3).map((farm, index) => (
                      <div
                        key={farm.id}
                        className={`absolute bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-emerald-700 transition-all duration-300 hover:scale-110 shadow-lg ${
                          screenSize.isMobile ? 'w-8 h-8 text-xs' : 'w-10 h-10'
                        } ${
                          index === 0 ? 'top-1/3 left-1/3' :
                          index === 1 ? 'top-1/2 right-1/3' :
                          'bottom-1/3 left-1/2'
                        }`}
                        onClick={() => setSelectedFarm(farm.id)}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>

                  {/* Enhanced Selected Farm Popup */}
                  {selectedFarm && (
                    <div className={`absolute bg-white rounded-xl border border-gray-200 shadow-2xl p-4 backdrop-blur-sm ${
                      screenSize.isMobile 
                        ? 'bottom-4 left-4 right-4' 
                        : 'bottom-6 left-6 right-6 max-w-md'
                    }`}>
                      {(() => {
                        const farm = farms.find(f => f.id === selectedFarm);
                        if (!farm) return null;
                        
                        return (
                          <div>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className={`bg-emerald-100 rounded-full flex items-center justify-center ${
                                  screenSize.isMobile ? 'w-10 h-10' : 'w-12 h-12'
                                }`}>
                                  <span className={`font-bold text-emerald-700 ${
                                    screenSize.isMobile ? 'text-sm' : ''
                                  }`}>{farm.image}</span>
                                </div>
                                <div>
                                  <h3 className={`font-semibold text-gray-900 ${
                                    screenSize.isMobile ? 'text-sm' : ''
                                  }`}>{farm.name}</h3>
                                  <p className={`text-gray-600 ${
                                    screenSize.isMobile ? 'text-xs' : 'text-sm'
                                  }`}>{farm.owner}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => setSelectedFarm(null)}
                                className="text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="flex items-center space-x-4 mb-3">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{farm.rating}</span>
                                <span className="text-sm text-gray-500">({farm.reviews})</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">{farm.distance}</span>
                              </div>
                            </div>
                            
                            <div className={`flex ${screenSize.isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
                              <button
                                onClick={() => getDirections(farm.coordinates)}
                                className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
                              >
                                <Navigation className="w-4 h-4" />
                                <span>Directions</span>
                              </button>
                              <button
                                onClick={() => bookVisit(farm.id)}
                                className="flex-1 border border-emerald-600 text-emerald-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors"
                              >
                                Visit
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              ) : (
                /* Enhanced List View */
                <div className="p-4 lg:p-6">
                  <div className="space-y-4 lg:space-y-6">
                    {filteredFarms.map((farm) => (
                      <div key={farm.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="p-4 lg:p-6">
                          <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 lg:space-x-6">
                            {/* Farm Avatar */}
                            <div className={`bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              screenSize.isMobile ? 'w-14 h-14' : 'w-16 lg:w-20 h-16 lg:h-20'
                            }`}>
                              <span className={`font-bold text-emerald-700 ${
                                screenSize.isMobile ? 'text-lg' : 'text-xl lg:text-2xl'
                              }`}>{farm.image}</span>
                            </div>

                            {/* Farm Info */}
                            <div className="flex-1 w-full">
                              <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h3 className={`font-bold text-gray-900 ${
                                    screenSize.isMobile ? 'text-lg' : 'text-lg lg:text-xl'
                                  }`}>{farm.name}</h3>
                                  <p className="text-gray-600">{farm.owner}</p>
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 space-y-2 sm:space-y-0">
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                      <span className="font-medium text-gray-900">{farm.rating}</span>
                                      <span className="text-gray-500">({farm.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <MapPin className="w-4 h-4 text-gray-500" />
                                      <span className="text-gray-600 text-sm">{farm.location} • {farm.distance}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="text-right mt-4 lg:mt-0">
                                  <div className="text-sm text-gray-600">Visit Cost</div>
                                  <div className="font-bold text-emerald-600">{farm.visitCost}</div>
                                </div>
                              </div>

                              <p className="text-gray-600 mb-4 text-sm lg:text-base">{farm.description}</p>

                              {/* Farm Details Grid - Responsive */}
                              <div className={`grid gap-3 mb-4 ${
                                screenSize.isMobile ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'
                              }`}>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <Package className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                                  <div className="text-sm font-medium text-gray-900">{farm.totalProducts}</div>
                                  <div className="text-xs text-gray-600">Products</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <Truck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                                  <div className="text-sm font-medium text-gray-900">{farm.activeOrders}</div>
                                  <div className="text-xs text-gray-600">Active Orders</div>
                                </div>
                                {!screenSize.isMobile && (
                                  <>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                      <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                                      <div className="text-xs font-medium text-gray-900">{farm.visitingHours}</div>
                                      <div className="text-xs text-gray-600">Visiting Hours</div>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                                      <Users className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                                      <div className="text-sm font-medium text-gray-900">{farm.farmSize}</div>
                                      <div className="text-xs text-gray-600">Farm Size</div>
                                    </div>
                                  </>
                                )}
                              </div>

                              {/* Specialties */}
                              <div className="mb-4">
                                <div className="text-sm font-medium text-gray-700 mb-2">Specialties:</div>
                                <div className="flex flex-wrap gap-2">
                                  {farm.specialties.slice(0, screenSize.isMobile ? 3 : 4).map((specialty, index) => (
                                    <span key={index} className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                                      {specialty}
                                    </span>
                                  ))}
                                  {farm.specialties.length > (screenSize.isMobile ? 3 : 4) && (
                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                      +{farm.specialties.length - (screenSize.isMobile ? 3 : 4)}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Certifications */}
                              <div className="mb-4">
                                <div className="text-sm font-medium text-gray-700 mb-2">Certifications:</div>
                                <div className="flex flex-wrap gap-2">
                                  {farm.certifications.map((cert, index) => (
                                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                      <Award className="w-3 h-3 mr-1" />
                                      {cert}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Amenities - Show fewer on mobile */}
                              {!screenSize.isMobile && (
                                <div className="mb-6">
                                  <div className="text-sm font-medium text-gray-700 mb-2">Visit Amenities:</div>
                                  <div className="flex flex-wrap gap-2">
                                    {farm.amenities.map((amenity, index) => (
                                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                        {amenity}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Enhanced Actions - Responsive */}
                              <div className={`flex items-center gap-2 lg:gap-3 ${
                                screenSize.isMobile ? 'flex-col' : 'flex-wrap'
                              }`}>
                                <button
                                  onClick={() => bookVisit(farm.id)}
                                  className={`bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center space-x-1 ${
                                    screenSize.isMobile ? 'w-full justify-center' : ''
                                  }`}
                                >
                                  <Calendar className="w-4 h-4" />
                                  <span>Book Visit</span>
                                </button>
                                
                                <div className={`flex gap-2 ${screenSize.isMobile ? 'w-full' : ''}`}>
                                  <button
                                    onClick={() => contactFarmer(farm.phone)}
                                    className={`border border-emerald-600 text-emerald-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors flex items-center space-x-1 ${
                                      screenSize.isMobile ? 'flex-1 justify-center' : ''
                                    }`}
                                  >
                                    <Phone className="w-4 h-4" />
                                    <span>Contact</span>
                                  </button>
                                  
                                  <button
                                    onClick={() => getDirections(farm.coordinates)}
                                    className={`border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-1 ${
                                      screenSize.isMobile ? 'flex-1 justify-center' : ''
                                    }`}
                                  >
                                    <Navigation className="w-4 h-4" />
                                    <span>Directions</span>
                                  </button>
                                </div>
                                
                                {!screenSize.isMobile && (
                                  <>
                                    <button className="border border-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                      <Heart className="w-4 h-4" />
                                    </button>
                                    
                                    <button className="border border-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                      <Eye className="w-4 h-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredFarms.length === 0 && (
                    <div className="text-center py-12">
                      <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No farms found matching your criteria.</p>
                      <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FindFarmsPage;