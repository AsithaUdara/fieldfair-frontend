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
  Heart,
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
  Plus,
  X,
  Copy,
  ExternalLink,
  MessageCircle,
  Truck,
  Gift,
  Percent,
  Target,
  DollarSign,
  ShoppingCart,
  Leaf,
  ThumbsUp,
  Sparkles,
  Navigation,
  Info,
  AlertCircle,
  RefreshCw,
  Menu
} from 'lucide-react';

const CustomerProfilePage = () => {
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

  // Customer profile data
  const [profileData, setProfileData] = useState({
    // Basic Info
    name: 'Nimal Perera',
    email: 'nimal.perera@fieldfair.lk',
    phone: '+94 77 987 6543',
    address: 'No. 45, Galle Road, Colombo 03, Western Province',
    joinDate: '2023-01-15',
    
    // Preferences
    preferredDeliveryTime: 'Morning (8AM - 12PM)',
    maxDeliveryDistance: '15 km',
    preferredPaymentMethod: 'Card',
    dietaryPreferences: ['Organic', 'Fresh', 'Local'],
    allergyInfo: 'None',
    
    // Stats
    stats: {
      totalOrders: 47,
      totalSpent: 25600,
      favoriteProducts: 23,
      reviewsGiven: 31,
      averageOrderValue: 544,
      loyaltyPoints: 2560,
      membershipLevel: 'Premium',
      carbonFootprintSaved: 12.5
    },
    
    // Profile Settings
    profileVisibility: 'friends',
    allowNotifications: true,
    shareOrderHistory: false,
    showReviews: true,
    
    // Bio
    bio: 'Health-conscious food enthusiast who loves supporting local farmers and sustainable agriculture. Always looking for the freshest, organic produce for my family.',
    
    // Social & Interests
    interests: ['Organic Food', 'Healthy Living', 'Sustainable Farming', 'Cooking', 'Nutrition'],
    
    // Images
    profileImage: '👨‍💼',
    badges: ['Early Adopter', 'Organic Supporter', 'Local Champion', 'Review Master'],
    
    // Recent Activity
    recentOrders: [
      { id: 'ORD-2024-001', date: '2024-06-25', total: 1400, status: 'delivered', farmer: 'Ravi Mahathaya' },
      { id: 'ORD-2024-002', date: '2024-06-20', total: 850, status: 'delivered', farmer: 'Saman Silva' },
      { id: 'ORD-2024-003', date: '2024-06-15', total: 1200, status: 'delivered', farmer: 'Kamala Perera' }
    ],
    
    // Favorite Farmers
    favoriteFarmers: [
      { name: 'Ravi Mahathaya', farm: "Ravi's Organic Farm", location: 'Kurunegala', rating: 4.8, orders: 15 },
      { name: 'Saman Silva', farm: "Saman's Fresh Vegetables", location: 'Matale', rating: 4.6, orders: 12 },
      { name: 'Priya Fernando', farm: "Fernando's Coconut Estate", location: 'Negombo', rating: 4.5, orders: 8 }
    ],
    
    // Achievements
    achievements: [
      { name: 'First Order', description: 'Completed your first order', date: '2023-01-20', icon: '🎉' },
      { name: 'Loyal Customer', description: 'Made 25+ orders', date: '2023-08-15', icon: '⭐' },
      { name: 'Review Master', description: 'Left 25+ helpful reviews', date: '2024-03-10', icon: '📝' },
      { name: 'Organic Champion', description: 'Ordered 100+ organic products', date: '2024-05-20', icon: '🌱' }
    ]
  });

  // Enhanced responsive detection - same as marketplace page
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

  const handleSave = () => {
    setEditMode(false);
    // Save logic here
  };

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

  // Responsive tabs - hide some on mobile
  const tabs = [
    { id: 'overview', label: screenSize.isMobile ? 'Info' : 'Overview', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'farmers', label: screenSize.isMobile ? 'Farms' : 'Favorite Farmers', icon: Users },
    { id: 'achievements', label: screenSize.isMobile ? 'Awards' : 'Achievements', icon: Award },
    { id: 'settings', label: 'Privacy', icon: Shield }
  ];

  const getMembershipColor = (level) => {
    switch (level) {
      case 'Premium': return 'from-purple-500 to-purple-600';
      case 'Gold': return 'from-yellow-500 to-yellow-600';
      case 'Silver': return 'from-gray-400 to-gray-500';
      default: return 'from-emerald-500 to-emerald-600';
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Enhanced Sidebar Component */}
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={screenSize.isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="customer"
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
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                )}
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {screenSize.isMobile ? 'Profile' : 'My Profile'}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1 hidden sm:block">
                    Manage your account and preferences
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              {!screenSize.isMobile && (
                <>
                  <button className="hidden md:flex items-center bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 text-blue-700 hover:bg-blue-100 transition-colors text-sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Public View
                  </button>
                  
                  <button className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Profile
                  </button>
                </>
              )}
              
              {editMode ? (
                <button 
                  onClick={handleSave}
                  className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-xl text-sm font-semibold flex items-center hover:bg-emerald-700 transition-colors shadow-lg"
                >
                  <Save className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Save</span>
                </button>
              ) : (
                <button 
                  onClick={() => setEditMode(true)}
                  className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-xl text-sm font-semibold flex items-center hover:bg-emerald-700 transition-colors shadow-lg"
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
            {/* Profile Header - Responsive */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6 shadow-sm">
              {/* Cover Section - Responsive Height */}
              <div className={`relative bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 flex items-center justify-center ${
                screenSize.isMobile ? 'h-24' : 'h-32 lg:h-48'
              }`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative text-center">
                  <span className={screenSize.isMobile ? 'text-4xl' : 'text-6xl lg:text-8xl'}>🌱</span>
                  {editMode && !screenSize.isMobile && (
                    <button className="absolute top-4 right-4 p-2 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-colors">
                      <Camera className="w-5 h-5 text-white" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Profile Info - Enhanced Responsive */}
              <div className="p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Profile Picture - Responsive Size */}
                  <div className="relative">
                    <div className={`bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg ${
                      screenSize.isMobile 
                        ? 'w-16 h-16 text-2xl -mt-8' 
                        : 'w-20 lg:w-32 h-20 lg:h-32 text-4xl lg:text-6xl -mt-10 lg:-mt-16'
                    }`}>
                      {profileData.profileImage}
                    </div>
                    {editMode && (
                      <button className="absolute bottom-0 right-0 p-2 bg-emerald-600 rounded-xl text-white hover:bg-emerald-700 transition-colors shadow-lg">
                        <Camera className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {/* Basic Info - Responsive Layout */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{profileData.name}</h2>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Shield className="w-4 h-4 text-blue-500" />
                              <span className="text-xs sm:text-sm text-blue-600 font-semibold">Verified</span>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getMembershipColor(profileData.stats.membershipLevel)}`}>
                              {profileData.stats.membershipLevel}
                            </div>
                          </div>
                        </div>
                        
                        <div className={`grid gap-2 mb-4 ${
                          screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'
                        }`}>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>Colombo</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Joined {new Date(profileData.joinDate).getFullYear()}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Package className="w-4 h-4" />
                            <span>{profileData.stats.totalOrders} orders</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{profileData.stats.reviewsGiven} reviews</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Stats - Responsive Grid */}
                      <div className={`grid gap-4 ${
                        screenSize.isMobile ? 'grid-cols-2' : 'lg:grid-cols-1 grid-cols-2 lg:gap-2'
                      }`}>
                        <div className="text-center lg:text-right">
                          <div className={`font-bold text-emerald-600 ${
                            screenSize.isMobile ? 'text-lg' : 'text-xl lg:text-2xl'
                          }`}>
                            Rs. {profileData.stats.totalSpent.toLocaleString()}
                          </div>
                          <div className="text-xs lg:text-sm text-gray-500">Total Spent</div>
                        </div>
                        <div className="text-center lg:text-right">
                          <div className={`font-bold text-purple-600 ${
                            screenSize.isMobile ? 'text-lg' : 'text-xl lg:text-2xl'
                          }`}>
                            {profileData.stats.loyaltyPoints}
                          </div>
                          <div className="text-xs lg:text-sm text-gray-500">Loyalty Points</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Badges - Responsive Layout */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {profileData.badges.map((badge, index) => (
                    <span key={index} className="inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 border border-purple-200">
                      <Award className="w-3 h-3 mr-1" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Cards - Enhanced Responsive Grid */}
            <div className={`grid gap-4 lg:gap-6 mb-6 ${
              screenSize.isMobile ? 'grid-cols-2' : 
              screenSize.isTablet ? 'grid-cols-3' : 
              'grid-cols-4'
            }`}>
              <div className="bg-white p-4 lg:p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <Package className="w-6 h-6 text-emerald-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{profileData.stats.totalOrders}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              
              <div className="bg-white p-4 lg:p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <div className={`font-bold text-gray-900 mb-1 ${
                  screenSize.isMobile ? 'text-lg' : 'text-lg lg:text-2xl'
                }`}>
                  Rs. {profileData.stats.averageOrderValue}
                </div>
                <div className="text-sm text-gray-600">Avg. Order Value</div>
              </div>
              
              <div className="bg-white p-4 lg:p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <Star className="w-5 h-5 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{profileData.stats.favoriteProducts}</div>
                <div className="text-sm text-gray-600">Favorites</div>
              </div>
              
              <div className={`bg-white p-4 lg:p-6 rounded-2xl border border-gray-200 shadow-sm ${
                screenSize.isMobile ? 'col-span-2' : ''
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{profileData.stats.carbonFootprintSaved}kg</div>
                <div className="text-sm text-gray-600">CO₂ Saved</div>
              </div>
            </div>

            {/* Tabs - Enhanced Responsive */}
            <div className="bg-white rounded-2xl border border-gray-200 mb-6 shadow-sm">
              <div className="border-b border-gray-200">
                <nav className={`flex px-4 lg:px-6 ${
                  screenSize.isMobile ? 'space-x-4 overflow-x-auto' : 'space-x-8'
                }`}>
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-semibold text-sm transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
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
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About Me</h3>
                      {editMode ? (
                        <textarea
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          rows={4}
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        />
                      ) : (
                        <p className="text-gray-600 leading-relaxed">{profileData.bio}</p>
                      )}
                    </div>

                    {/* Contact Information - Enhanced Responsive */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                      <div className={`grid gap-4 ${
                        screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
                      }`}>
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                          <Phone className="w-5 h-5 text-gray-500" />
                          <div className="flex-1">
                            <div className="text-sm text-gray-500">Phone</div>
                            {editMode ? (
                              <input
                                type="tel"
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full mt-1"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                              />
                            ) : (
                              <div className="font-semibold text-gray-900">{profileData.phone}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                          <Mail className="w-5 h-5 text-gray-500" />
                          <div className="flex-1">
                            <div className="text-sm text-gray-500">Email</div>
                            {editMode ? (
                              <input
                                type="email"
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full mt-1"
                                value={profileData.email}
                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                              />
                            ) : (
                              <div className="font-semibold text-gray-900">{profileData.email}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className={`flex items-start space-x-3 p-4 bg-gray-50 rounded-xl ${
                          screenSize.isMobile ? 'col-span-1' : 'md:col-span-2'
                        }`}>
                          <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                          <div className="flex-1">
                            <div className="text-sm text-gray-500">Address</div>
                            {editMode ? (
                              <textarea
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full mt-1"
                                rows={2}
                                value={profileData.address}
                                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                              />
                            ) : (
                              <div className="font-semibold text-gray-900">{profileData.address}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Preferences - Enhanced Responsive */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                      <div className={`grid gap-6 ${
                        screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
                      }`}>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Delivery Time</label>
                          {editMode ? (
                            <select 
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={profileData.preferredDeliveryTime}
                              onChange={(e) => setProfileData({...profileData, preferredDeliveryTime: e.target.value})}
                            >
                              <option>Morning (8AM - 12PM)</option>
                              <option>Afternoon (12PM - 5PM)</option>
                              <option>Evening (5PM - 8PM)</option>
                              <option>Flexible</option>
                            </select>
                          ) : (
                            <p className="text-gray-900 font-medium">{profileData.preferredDeliveryTime}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Max Delivery Distance</label>
                          {editMode ? (
                            <select 
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={profileData.maxDeliveryDistance}
                              onChange={(e) => setProfileData({...profileData, maxDeliveryDistance: e.target.value})}
                            >
                              <option>5 km</option>
                              <option>10 km</option>
                              <option>15 km</option>
                              <option>25 km</option>
                              <option>50 km</option>
                            </select>
                          ) : (
                            <p className="text-gray-900 font-medium">{profileData.maxDeliveryDistance}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Interests */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.interests.map((interest, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <Sparkles className="w-3 h-3 mr-1" />
                            {interest}
                          </span>
                        ))}
                        {editMode && (
                          <button className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-600 border-2 border-dashed border-gray-300 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                            <Plus className="w-3 h-3 mr-1" />
                            Add Interest
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Orders Tab - Enhanced Responsive */}
                {activeTab === 'orders' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                        View All Orders
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {profileData.recentOrders.map((order) => (
                        <div key={order.id} className={`flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow ${
                          screenSize.isMobile ? 'flex-col space-y-3' : ''
                        }`}>
                          <div className={`flex items-center space-x-4 ${
                            screenSize.isMobile ? 'w-full' : ''
                          }`}>
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                              <Package className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{order.id}</div>
                              <div className="text-sm text-gray-600">
                                {new Date(order.date).toLocaleDateString()} • {order.farmer}
                              </div>
                            </div>
                          </div>
                          <div className={`text-right ${
                            screenSize.isMobile ? 'w-full flex justify-between items-center' : ''
                          }`}>
                            <div className="font-bold text-gray-900">Rs. {order.total.toLocaleString()}</div>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Farmers Tab - Enhanced Responsive */}
                {activeTab === 'farmers' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Favorite Farmers</h3>
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                        Discover More
                      </button>
                    </div>
                    
                    <div className={`grid gap-4 ${
                      screenSize.isMobile ? 'grid-cols-1' : 
                      screenSize.isTablet ? 'grid-cols-2' : 
                      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    }`}>
                      {profileData.favoriteFarmers.map((farmer, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                              <span className="text-sm font-bold text-emerald-700">{farmer.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{farmer.name}</div>
                              <div className="text-sm text-gray-600">{farmer.farm}</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Location:</span>
                              <span className="font-medium text-gray-900">{farmer.location}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Rating:</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="font-medium text-gray-900">{farmer.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Orders:</span>
                              <span className="font-medium text-gray-900">{farmer.orders}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements Tab - Enhanced Responsive */}
                {activeTab === 'achievements' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Your Achievements</h3>
                    
                    <div className={`grid gap-4 ${
                      screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
                    }`}>
                      {profileData.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div>
                            <div className="font-semibold text-gray-900">{achievement.name}</div>
                            <div className="text-sm text-gray-600">{achievement.description}</div>
                            <div className="text-xs text-emerald-600 font-medium">
                              Achieved on {new Date(achievement.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Settings Tab - Enhanced Responsive */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>
                    
                    <div className="space-y-4">
                      <div className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl ${
                        screenSize.isMobile ? 'flex-col space-y-3' : ''
                      }`}>
                        <div className={screenSize.isMobile ? 'w-full' : ''}>
                          <div className="font-medium text-gray-900">Profile Visibility</div>
                          <div className="text-sm text-gray-600">Control who can see your profile</div>
                        </div>
                        <select 
                          className={`border border-gray-300 rounded-lg px-3 py-2 ${
                            screenSize.isMobile ? 'w-full' : ''
                          }`}
                          value={profileData.profileVisibility}
                          onChange={(e) => setProfileData({...profileData, profileVisibility: e.target.value})}
                        >
                          <option value="public">Public</option>
                          <option value="friends">Friends Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      
                      <div className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl ${
                        screenSize.isMobile ? 'flex-col space-y-3' : ''
                      }`}>
                        <div className={screenSize.isMobile ? 'w-full' : ''}>
                          <div className="font-medium text-gray-900">Allow Notifications</div>
                          <div className="text-sm text-gray-600">Receive notifications about orders and updates</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={profileData.allowNotifications}
                            onChange={(e) => setProfileData({...profileData, allowNotifications: e.target.checked})}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                      
                      <div className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl ${
                        screenSize.isMobile ? 'flex-col space-y-3' : ''
                      }`}>
                        <div className={screenSize.isMobile ? 'w-full' : ''}>
                          <div className="font-medium text-gray-900">Share Order History</div>
                          <div className="text-sm text-gray-600">Allow farmers to see your purchase history</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={profileData.shareOrderHistory}
                            onChange={(e) => setProfileData({...profileData, shareOrderHistory: e.target.checked})}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                      
                      <div className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl ${
                        screenSize.isMobile ? 'flex-col space-y-3' : ''
                      }`}>
                        <div className={screenSize.isMobile ? 'w-full' : ''}>
                          <div className="font-medium text-gray-900">Show Public Reviews</div>
                          <div className="text-sm text-gray-600">Display your reviews on your public profile</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={profileData.showReviews}
                            onChange={(e) => setProfileData({...profileData, showReviews: e.target.checked})}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
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

export default CustomerProfilePage;