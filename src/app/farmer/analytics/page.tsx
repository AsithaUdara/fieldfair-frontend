"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Star,
  Leaf,
  ShoppingCart,
  Clock,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const FarmerAnalyticsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const monthlyData = [
    { month: 'Jan', revenue: 85000, orders: 45, customers: 23 },
    { month: 'Feb', revenue: 92000, orders: 52, customers: 28 },
    { month: 'Mar', revenue: 78000, orders: 41, customers: 25 },
    { month: 'Apr', revenue: 105000, orders: 68, customers: 35 },
    { month: 'May', revenue: 127500, orders: 78, customers: 42 },
    { month: 'Jun', revenue: 134000, orders: 82, customers: 46 }
  ];

  const topProducts = [
    { name: 'Organic Tomatoes', revenue: 45600, orders: 152, percentage: 34 },
    { name: 'Fresh Carrots', revenue: 28900, orders: 116, percentage: 22 },
    { name: 'Green Cabbage', revenue: 22400, orders: 124, percentage: 17 },
    { name: 'Red Onions', revenue: 19800, orders: 90, percentage: 15 },
    { name: 'Green Beans', revenue: 17300, orders: 43, percentage: 12 }
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="farmer"
      />

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
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Farm Analytics</h1>
                  <p className="text-sm text-gray-600 mt-1">Track your farm's performance and growth</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <select 
                className="border border-gray-300 rounded-lg px-2 lg:px-3 py-2 text-sm bg-white"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              
              <button className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Export Report</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">Rs. 6,21,800</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-600 text-sm font-medium">+18.2%</span>
                      <span className="text-gray-500 text-sm ml-1 hidden sm:inline">vs last period</span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">421</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-600 text-sm font-medium">+24.1%</span>
                      <span className="text-gray-500 text-sm ml-1 hidden sm:inline">vs last period</span>
                    </div>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Order Value</p>
                    <p className="text-2xl font-bold text-gray-900">Rs. 1,478</p>
                    <div className="flex items-center mt-2">
                      <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-red-600 text-sm font-medium">-5.3%</span>
                      <span className="text-gray-500 text-sm ml-1 hidden sm:inline">vs last period</span>
                    </div>
                  </div>
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Customer Satisfaction</p>
                    <p className="text-2xl font-bold text-gray-900">4.8★</p>
                    <div className="flex items-center mt-2">
                      <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-600 text-sm font-medium">+0.2</span>
                      <span className="text-gray-500 text-sm ml-1 hidden sm:inline">vs last period</span>
                    </div>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="flex items-end space-x-2 lg:space-x-3 h-48 lg:h-64">
                  {monthlyData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="bg-emerald-500 w-full rounded-t hover:bg-emerald-600 transition-colors cursor-pointer"
                        style={{ height: `${(item.revenue / 140000) * 100}%` }}
                        title={`${item.month}: Rs. ${item.revenue.toLocaleString()}`}
                      />
                      <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
                  <Package className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-semibold text-emerald-700">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{product.name}</span>
                          <span className="text-sm font-semibold text-gray-900">Rs. {product.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{product.orders} orders</span>
                          <span className="text-sm text-emerald-600">{product.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full" 
                            style={{ width: `${product.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Analytics */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Customer Analytics */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Customer Insights</h3>
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Customers</span>
                    <span className="font-semibold text-gray-900">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">New This Month</span>
                    <span className="font-semibold text-emerald-600">+23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Repeat Customers</span>
                    <span className="font-semibold text-gray-900">89%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Customer Retention</span>
                    <span className="font-semibold text-gray-900">92%</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-3">Top Locations</h4>
                  <div className="space-y-2">
                    {[
                      { location: 'Colombo', percentage: 35 },
                      { location: 'Kurunegala', percentage: 28 },
                      { location: 'Kandy', percentage: 22 },
                      { location: 'Gampaha', percentage: 15 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{item.location}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-12 lg:w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-emerald-500 h-2 rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Seasonal Trends */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Seasonal Trends</h3>
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="space-y-4">
                  {[
                    { product: 'Tomatoes', season: 'Peak Season', trend: 'up', change: '+45%' },
                    { product: 'Carrots', season: 'Good Season', trend: 'up', change: '+28%' },
                    { product: 'Cabbage', season: 'Off Season', trend: 'down', change: '-15%' },
                    { product: 'Onions', season: 'Peak Season', trend: 'up', change: '+38%' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{item.product}</div>
                        <div className="text-sm text-gray-500">{item.season}</div>
                      </div>
                      <div className={`flex items-center space-x-1 ${
                        item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.trend === 'up' ? 
                          <TrendingUp className="w-4 h-4" /> : 
                          <TrendingDown className="w-4 h-4" />
                        }
                        <span className="text-sm font-medium">{item.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Farm Performance */}
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Farm Performance</h3>
                  <Leaf className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">2.5</div>
                    <div className="text-sm text-gray-500">Acres Cultivated</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">98%</div>
                      <div className="text-xs text-gray-500">Organic Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">1,250</div>
                      <div className="text-xs text-gray-500">kg/month</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 mb-3">Production Efficiency</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Harvest Success Rate</span>
                        <span className="text-sm font-medium text-gray-900">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Quality Score</span>
                        <span className="text-sm font-medium text-gray-900">4.8/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Waste Reduction</span>
                        <span className="text-sm font-medium text-emerald-600">-23%</span>
                      </div>
                    </div>
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

export default FarmerAnalyticsPage;