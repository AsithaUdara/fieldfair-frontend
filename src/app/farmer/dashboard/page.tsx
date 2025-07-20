"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Search,
  Plus,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronDown,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Leaf,
  Sun,
  Cloud,
  Droplets,
  Wind,
  MapPin,
  Clock,
  Star,
  Eye,
  Edit,
  Trash2,
  Menu,
  Bell,
  Settings,
  BarChart3
} from 'lucide-react';

const FarmerDashboardPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
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

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Enhanced FieldFair Farmer Sidebar */}
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
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-20 shadow-sm">
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
                    {screenSize.isMobile ? '🌱 Dashboard' : '🌱 Farm Dashboard'}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1 hidden sm:block">
                    {screenSize.isMobile ? 'Monitor your farm' : 'Welcome back, Ravi! Monitor your farm operations and sales.'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Weather Widget - Enhanced Responsive */}
              {!screenSize.isMobile && (
                <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg px-3 lg:px-4 py-2">
                  <Sun className="w-4 lg:w-5 h-4 lg:h-5 text-orange-500 mr-2" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">28°C</div>
                    <div className="text-blue-600 text-xs">Sunny</div>
                  </div>
                </div>
              )}
              
              {/* Notifications - Show on tablet and desktop */}
              {!screenSize.isMobile && (
                <button className="p-2 lg:p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              )}
              
              {/* Add Product Button - Responsive */}
              <button className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors">
                <Plus className="w-4 h-4 mr-1 lg:mr-2" />
                <span className={screenSize.isMobile ? "hidden" : "inline"}>Add Product</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Quick Stats - Enhanced Responsive Grid */}
            <div className={`grid gap-4 lg:gap-6 mb-6 ${
              screenSize.isMobile ? 'grid-cols-2' : 
              screenSize.isTablet ? 'grid-cols-2' : 
              'grid-cols-4'
            }`}>
              {/* Total Revenue */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <h3 className="text-xs lg:text-sm font-medium text-gray-600">
                    {screenSize.isMobile ? 'Revenue' : 'Total Revenue'}
                  </h3>
                  <DollarSign className="w-4 lg:w-5 h-4 lg:h-5 text-green-500" />
                </div>
                <div className="text-xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {screenSize.isMobile ? 'Rs. 127K' : 'Rs. 127,500'}
                </div>
                <div className="flex items-center text-xs lg:text-sm">
                  <TrendingUp className="w-3 lg:w-4 h-3 lg:h-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">+12%</span>
                  <span className="text-gray-500 ml-1 hidden sm:inline">from last month</span>
                </div>
              </div>

              {/* Active Products */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <h3 className="text-xs lg:text-sm font-medium text-gray-600">
                    {screenSize.isMobile ? 'Products' : 'Active Products'}
                  </h3>
                  <Package className="w-4 lg:w-5 h-4 lg:h-5 text-blue-500" />
                </div>
                <div className="text-xl lg:text-3xl font-bold text-gray-900 mb-2">24</div>
                <div className="flex items-center text-xs lg:text-sm">
                  <Plus className="w-3 lg:w-4 h-3 lg:h-4 text-blue-500 mr-1" />
                  <span className="text-blue-600 font-medium">3 added</span>
                  <span className="text-gray-500 ml-1 hidden sm:inline">this week</span>
                </div>
              </div>

              {/* Pending Orders */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <h3 className="text-xs lg:text-sm font-medium text-gray-600">
                    {screenSize.isMobile ? 'Orders' : 'Pending Orders'}
                  </h3>
                  <ShoppingCart className="w-4 lg:w-5 h-4 lg:h-5 text-orange-500" />
                </div>
                <div className="text-xl lg:text-3xl font-bold text-gray-900 mb-2">8</div>
                <div className="flex items-center text-xs lg:text-sm">
                  <Clock className="w-3 lg:w-4 h-3 lg:h-4 text-orange-500 mr-1" />
                  <span className="text-orange-600 font-medium">2 urgent</span>
                  <span className="text-gray-500 ml-1 hidden sm:inline">delivery today</span>
                </div>
              </div>

              {/* Total Customers */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <h3 className="text-xs lg:text-sm font-medium text-gray-600">
                    {screenSize.isMobile ? 'Customers' : 'Total Customers'}
                  </h3>
                  <Users className="w-4 lg:w-5 h-4 lg:h-5 text-purple-500" />
                </div>
                <div className="text-xl lg:text-3xl font-bold text-gray-900 mb-2">156</div>
                <div className="flex items-center text-xs lg:text-sm">
                  <TrendingUp className="w-3 lg:w-4 h-3 lg:h-4 text-purple-500 mr-1" />
                  <span className="text-purple-600 font-medium">+8</span>
                  <span className="text-gray-500 ml-1 hidden sm:inline">new this week</span>
                </div>
              </div>
            </div>

            {/* Main Content Grid - Enhanced Responsive */}
            <div className={`grid gap-6 ${
              screenSize.isMobile ? 'grid-cols-1' : 
              screenSize.isTablet ? 'grid-cols-1' : 
              'grid-cols-3'
            }`}>
              {/* Recent Orders - Enhanced Responsive */}
              <div className={`bg-white p-4 lg:p-6 rounded-xl border border-gray-200 shadow-sm ${
                !screenSize.isMobile && !screenSize.isTablet ? 'col-span-2' : ''
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { 
                      product: 'Organic Tomatoes - 5kg', 
                      customer: 'Nimal Perera', 
                      time: '15 mins ago', 
                      price: 'Rs. 1,500', 
                      status: 'Pending',
                      icon: '🍅',
                      color: 'orange'
                    },
                    { 
                      product: 'Fresh Carrots - 3kg', 
                      customer: 'Saman Silva', 
                      time: '1 hour ago', 
                      price: 'Rs. 750', 
                      status: 'Delivered',
                      icon: '🥕',
                      color: 'green'
                    },
                    { 
                      product: 'Green Beans - 2kg', 
                      customer: 'Kamala Jayawardena', 
                      time: '2 hours ago', 
                      price: 'Rs. 800', 
                      status: 'Processing',
                      icon: '🫘',
                      color: 'blue'
                    }
                  ].map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-3 lg:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3 lg:space-x-4 flex-1 min-w-0">
                        <div className="w-10 lg:w-12 h-10 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-lg lg:text-xl">{order.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-sm lg:text-base truncate">
                            {screenSize.isMobile ? order.product.split(' - ')[0] : order.product}
                          </div>
                          <div className="text-xs lg:text-sm text-gray-500 truncate">
                            {screenSize.isMobile ? order.customer.split(' ')[0] : `Ordered by ${order.customer}`}
                          </div>
                          <div className="text-xs text-gray-400">{order.time}</div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-semibold text-gray-900 text-sm lg:text-base">{order.price}</div>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Pending' ? 'bg-orange-100 text-orange-800' :
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Inventory - Enhanced Responsive */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {screenSize.isMobile ? 'Inventory' : 'Product Inventory'}
                  </h3>
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: 'Tomatoes', stock: '45kg', price: 'Rs. 300/kg', status: 'In Stock', icon: '🍅', color: 'green' },
                    { name: 'Carrots', stock: '12kg', price: 'Rs. 250/kg', status: 'Low Stock', icon: '🥕', color: 'orange' },
                    { name: 'Cabbage', stock: '28kg', price: 'Rs. 180/kg', status: 'In Stock', icon: '🥬', color: 'green' },
                    { name: 'Onions', stock: '8kg', price: 'Rs. 220/kg', status: 'Very Low', icon: '🧄', color: 'red' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 lg:w-10 h-8 lg:h-10 bg-${item.color === 'green' ? 'green' : item.color === 'orange' ? 'orange' : 'red'}-100 rounded-lg flex items-center justify-center`}>
                          <span className="text-sm lg:text-lg">{item.icon}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm lg:text-base">{item.name}</div>
                          <div className="text-xs lg:text-sm text-gray-500">{item.stock} available</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs lg:text-sm font-medium text-gray-900">{item.price}</div>
                        <div className={`text-xs ${
                          item.status === 'In Stock' ? 'text-green-600' :
                          item.status === 'Low Stock' ? 'text-orange-600' :
                          'text-red-600'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                    </div>
                  ))}

                  <button className="w-full mt-4 bg-emerald-50 border border-emerald-200 text-emerald-700 py-2 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors">
                    Manage Inventory
                  </button>
                </div>
              </div>
            </div>

            {/* Sales Analytics - Enhanced Responsive */}
            <div className="mt-6 bg-white p-4 lg:p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Sales Analytics</h3>
                  <p className="text-sm text-gray-500 hidden sm:block">Track your farm's performance over time</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">
                    This Month
                  </button>
                  <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">
                    {screenSize.isMobile ? '3M' : 'Last 3 Months'}
                  </button>
                </div>
              </div>

              {/* Simple Bar Chart - Enhanced Responsive */}
              <div className={`flex items-end space-x-1 lg:space-x-4 ${
                screenSize.isMobile ? 'h-32' : 'h-48'
              }`}>
                {[
                  { day: 'Mon', sales: 85 },
                  { day: 'Tue', sales: 65 },
                  { day: 'Wed', sales: 90 },
                  { day: 'Thu', sales: 45 },
                  { day: 'Fri', sales: 78 },
                  { day: 'Sat', sales: 95 },
                  { day: 'Sun', sales: 55 }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-emerald-500 rounded-t hover:bg-emerald-600 transition-colors cursor-pointer"
                      style={{ 
                        height: `${(item.sales / 100) * 100}%`,
                        width: screenSize.isMobile ? '16px' : '32px'
                      }}
                      title={`${item.day}: Rs. ${item.sales * 100}`}
                    />
                    <div className="text-xs text-gray-500 mt-2">
                      {screenSize.isMobile ? item.day.charAt(0) : item.day}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Farm Stats - Enhanced Responsive */}
              <div className={`grid gap-4 mt-6 pt-6 border-t border-gray-100 ${
                screenSize.isMobile ? 'grid-cols-3' : 'grid-cols-3'
              }`}>
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-gray-900">2.5 acres</div>
                  <div className="text-xs lg:text-sm text-gray-500">Farm Size</div>
                </div>
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-xs lg:text-sm text-gray-500">
                    {screenSize.isMobile ? 'Organic' : 'Organic Rating'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-gray-900">4.8★</div>
                  <div className="text-xs lg:text-sm text-gray-500">
                    {screenSize.isMobile ? 'Rating' : 'Customer Rating'}
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Information Banner - Enhanced Responsive */}
            <div className="mt-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 lg:p-6 rounded-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-bold mb-2">🌱 Ravi's Organic Farm</h3>
                  <p className="mb-2 opacity-90">Kurunegala, North Western Province</p>
                  <p className="text-sm opacity-80 hidden sm:block">
                    Growing fresh, organic vegetables since 2018. Specialized in tomatoes, carrots, and leafy greens.
                  </p>
                  <div className={`flex flex-wrap items-center mt-3 gap-2 lg:gap-4 text-sm ${
                    screenSize.isMobile ? 'text-xs' : 'text-sm'
                  }`}>
                    <div className="flex items-center">
                      <MapPin className="w-3 lg:w-4 h-3 lg:h-4 mr-1" />
                      {screenSize.isMobile ? '15km away' : '15km from Kurunegala town'}
                    </div>
                    <div className="flex items-center">
                      <Leaf className="w-3 lg:w-4 h-3 lg:h-4 mr-1" />
                      {screenSize.isMobile ? 'Organic' : '100% Organic Certified'}
                    </div>
                  </div>
                </div>
                <div className="text-center lg:text-right">
                  <div className="text-2xl lg:text-3xl font-bold">156</div>
                  <div className="text-sm opacity-80">Happy Customers</div>
                </div>
              </div>
            </div>

            {/* Quick Actions - Mobile Only */}
            {screenSize.isMobile && (
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="bg-white border border-gray-200 p-4 rounded-xl text-center hover:bg-gray-50 transition-colors">
                  <Package className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">Add Product</div>
                </button>
                <button className="bg-white border border-gray-200 p-4 rounded-xl text-center hover:bg-gray-50 transition-colors">
                  <BarChart3 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-900">View Analytics</div>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboardPage;