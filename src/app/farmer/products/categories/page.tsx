"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Search,
  Plus,
  Edit,
  Trash2,
  Package,
  Tag,
  TrendingUp,
  BarChart3,
  Leaf,
  Apple,
  Wheat,
  Coffee,
  ChevronRight,
  Filter,
  SortAsc
} from 'lucide-react';

const FarmerProductCategoriesPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock categories data
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Vegetables',
      icon: '🥬',
      description: 'Fresh leafy greens and root vegetables',
      productCount: 15,
      totalRevenue: 45600,
      averagePrice: 280,
      topProduct: 'Organic Tomatoes',
      color: 'bg-green-500',
      trending: 'up'
    },
    {
      id: 2,
      name: 'Fruits',
      icon: '🍎',
      description: 'Seasonal fresh fruits and berries',
      productCount: 8,
      totalRevenue: 32400,
      averagePrice: 420,
      topProduct: 'Mangoes',
      color: 'bg-red-500',
      trending: 'up'
    },
    {
      id: 3,
      name: 'Grains',
      icon: '🌾',
      description: 'Rice, wheat and other cereal crops',
      productCount: 5,
      totalRevenue: 18900,
      averagePrice: 150,
      topProduct: 'Organic Rice',
      color: 'bg-yellow-500',
      trending: 'down'
    },
    {
      id: 4,
      name: 'Herbs & Spices',
      icon: '🌿',
      description: 'Aromatic herbs and natural spices',
      productCount: 12,
      totalRevenue: 15600,
      averagePrice: 850,
      topProduct: 'Fresh Basil',
      color: 'bg-emerald-500',
      trending: 'up'
    },
    {
      id: 5,
      name: 'Legumes',
      icon: '🫘',
      description: 'Beans, lentils and other legumes',
      productCount: 6,
      totalRevenue: 12300,
      averagePrice: 320,
      topProduct: 'Green Beans',
      color: 'bg-purple-500',
      trending: 'stable'
    }
  ]);

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

  const getTrendingIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Product Categories</h1>
                  <p className="text-sm text-gray-600 mt-1">Manage your product categories and analyze performance</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search categories..."
                  className="bg-transparent text-sm outline-none w-36 lg:w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Add Category</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Categories</p>
                    <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                  </div>
                  <Tag className="w-6 lg:w-8 h-6 lg:h-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{categories.reduce((acc, cat) => acc + cat.productCount, 0)}</p>
                  </div>
                  <Package className="w-6 lg:w-8 h-6 lg:h-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">Rs. {categories.reduce((acc, cat) => acc + cat.totalRevenue, 0).toLocaleString()}</p>
                  </div>
                  <BarChart3 className="w-6 lg:w-8 h-6 lg:h-8 text-purple-500" />
                </div>
              </div>
              
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Price/kg</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">Rs. {Math.round(categories.reduce((acc, cat) => acc + cat.averagePrice, 0) / categories.length)}</p>
                  </div>
                  <TrendingUp className="w-6 lg:w-8 h-6 lg:h-8 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 lg:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Categories Overview</h2>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm">
                      <option>All Categories</option>
                      <option>High Revenue</option>
                      <option>Most Products</option>
                      <option>Trending Up</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                {filteredCategories.map((category) => (
                  <div key={category.id} className="p-4 lg:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                          {category.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-500">{category.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getTrendingIcon(category.trending)}
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Products</span>
                        <span className="font-semibold text-gray-900">{category.productCount}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Revenue</span>
                        <span className="font-semibold text-gray-900">Rs. {category.totalRevenue.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Avg Price</span>
                        <span className="font-semibold text-gray-900">Rs. {category.averagePrice}/kg</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Top Product</span>
                        <span className="font-semibold text-gray-900 text-sm">{category.topProduct}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors">
                        <span>View Products</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 lg:p-6 rounded-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-lg lg:text-xl font-bold mb-2">Category Management Tips</h3>
                  <p className="opacity-90 text-sm lg:text-base">Organize your products efficiently to boost sales and customer satisfaction</p>
                </div>
                <div className="grid grid-cols-2 gap-3 lg:flex lg:space-x-4">
                  <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Add Seasonal
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Bulk Import
                  </button>
                  <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors col-span-2 lg:col-span-1">
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerProductCategoriesPage;