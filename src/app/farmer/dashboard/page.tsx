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
  Trash2
} from 'lucide-react';

const FarmerDashboardPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle client-side only logic to prevent hydration errors
  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(false); // Always expanded on mobile when open
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render until mounted to prevent hydration errors
  if (!mounted) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 bg-emerald-900"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* FieldFair Farmer Sidebar */}
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="farmer"
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 ${
        isMobile ? 'ml-0' : (sidebarCollapsed ? 'ml-20' : 'ml-72')
      }`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 mr-2"
                >
                  <LayoutGrid className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Farm Dashboard</h1>
                  <p className="text-sm text-gray-600 mt-1">Welcome back, Ravi! Monitor your farm operations and sales.</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Weather Widget */}
              <div className="hidden md:flex items-center bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
                <Sun className="w-5 h-5 text-orange-500 mr-2" />
                <div className="text-sm">
                  <div className="font-medium text-gray-900">28°C</div>
                  <div className="text-blue-600 text-xs">Sunny</div>
                </div>
              </div>
              
              {/* Add Product Button */}
              <button className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Add Product</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
              {/* Total Revenue */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Rs. 127,500</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">+12%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>

              {/* Active Products */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Active Products</h3>
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">24</div>
                <div className="flex items-center text-sm">
                  <Plus className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-blue-600 font-medium">3 added</span>
                  <span className="text-gray-500 ml-1">this week</span>
                </div>
              </div>

              {/* Pending Orders */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Pending Orders</h3>
                  <ShoppingCart className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">8</div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 text-orange-500 mr-1" />
                  <span className="text-orange-600 font-medium">2 urgent</span>
                  <span className="text-gray-500 ml-1">delivery today</span>
                </div>
              </div>

              {/* Total Customers */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-600">Total Customers</h3>
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">156</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-purple-500 mr-1" />
                  <span className="text-purple-600 font-medium">+8</span>
                  <span className="text-gray-500 ml-1">new this week</span>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Orders */}
              <div className="lg:col-span-2 bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Organic Tomatoes - 5kg</div>
                        <div className="text-sm text-gray-500">Ordered by Nimal Perera</div>
                        <div className="text-xs text-gray-400">15 mins ago</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">Rs. 1,500</div>
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        Pending
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Fresh Carrots - 3kg</div>
                        <div className="text-sm text-gray-500">Ordered by Saman Silva</div>
                        <div className="text-xs text-gray-400">1 hour ago</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">Rs. 750</div>
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Delivered
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Green Beans - 2kg</div>
                        <div className="text-sm text-gray-500">Ordered by Kamala Jayawardena</div>
                        <div className="text-xs text-gray-400">2 hours ago</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">Rs. 800</div>
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Processing
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Inventory */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Product Inventory</h3>
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🍅</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Tomatoes</div>
                        <div className="text-sm text-gray-500">45kg available</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">Rs. 300/kg</div>
                      <div className="text-xs text-green-600">In Stock</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🥕</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Carrots</div>
                        <div className="text-sm text-gray-500">12kg available</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">Rs. 250/kg</div>
                      <div className="text-xs text-orange-600">Low Stock</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🥬</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Cabbage</div>
                        <div className="text-sm text-gray-500">28kg available</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">Rs. 180/kg</div>
                      <div className="text-xs text-green-600">In Stock</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🧄</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Onions</div>
                        <div className="text-sm text-gray-500">8kg available</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">Rs. 220/kg</div>
                      <div className="text-xs text-red-600">Very Low</div>
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-emerald-50 border border-emerald-200 text-emerald-700 py-2 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors">
                    Manage Inventory
                  </button>
                </div>
              </div>
            </div>

            {/* Sales Analytics */}
            <div className="mt-6 bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Sales Analytics</h3>
                  <p className="text-sm text-gray-500">Track your farm's performance over time</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">
                    This Month
                  </button>
                  <button className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">
                    Last 3 Months
                  </button>
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="flex items-end space-x-2 lg:space-x-4 h-48">
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
                      className="bg-emerald-500 w-6 lg:w-8 rounded-t hover:bg-emerald-600 transition-colors cursor-pointer"
                      style={{ height: `${(item.sales / 100) * 100}%` }}
                      title={`${item.day}: Rs. ${item.sales * 100}`}
                    />
                    <div className="text-xs text-gray-500 mt-2">{item.day}</div>
                  </div>
                ))}
              </div>

              {/* Quick Farm Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-gray-900">2.5 acres</div>
                  <div className="text-sm text-gray-500">Farm Size</div>
                </div>
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-500">Organic Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-xl lg:text-2xl font-bold text-gray-900">4.8★</div>
                  <div className="text-sm text-gray-500">Customer Rating</div>
                </div>
              </div>
            </div>

            {/* Farm Information Banner */}
            <div className="mt-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 lg:p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-bold mb-2">🌱 Ravi's Organic Farm</h3>
                  <p className="mb-2 opacity-90">Kurunegala, North Western Province</p>
                  <p className="text-sm opacity-80">Growing fresh, organic vegetables since 2018. Specialized in tomatoes, carrots, and leafy greens.</p>
                  <div className="flex flex-wrap items-center mt-3 space-x-4 text-sm">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      15km from Kurunegala town
                    </div>
                    <div className="flex items-center">
                      <Leaf className="w-4 h-4 mr-1" />
                      100% Organic Certified
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="text-right">
                    <div className="text-2xl lg:text-3xl font-bold">156</div>
                    <div className="text-sm opacity-80">Happy Customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboardPage;