"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Package,
  DollarSign,
  Calendar,
  Weight,
  Star,
  AlertTriangle,
  CheckCircle,
  Filter,
  SortAsc,
  Camera,
  MapPin,
  Leaf
} from 'lucide-react';

const FarmerProductsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock products data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      price: 300,
      stock: 45,
      unit: 'kg',
      status: 'active',
      image: '🍅',
      harvestDate: '2024-06-20',
      description: 'Fresh organic tomatoes grown without pesticides',
      rating: 4.8,
      orders: 23
    },
    {
      id: 2,
      name: 'Fresh Carrots',
      category: 'Vegetables', 
      price: 250,
      stock: 12,
      unit: 'kg',
      status: 'low_stock',
      image: '🥕',
      harvestDate: '2024-06-18',
      description: 'Sweet and crunchy carrots perfect for cooking',
      rating: 4.6,
      orders: 18
    },
    {
      id: 3,
      name: 'Green Cabbage',
      category: 'Vegetables',
      price: 180,
      stock: 28,
      unit: 'kg',
      status: 'active',
      image: '🥬',
      harvestDate: '2024-06-19',
      description: 'Fresh cabbage ideal for salads and cooking',
      rating: 4.7,
      orders: 15
    },
    {
      id: 4,
      name: 'Red Onions',
      category: 'Vegetables',
      price: 220,
      stock: 8,
      unit: 'kg',
      status: 'low_stock',
      image: '🧄',
      harvestDate: '2024-06-15',
      description: 'Premium quality red onions with strong flavor',
      rating: 4.5,
      orders: 31
    },
    {
      id: 5,
      name: 'Green Beans',
      category: 'Vegetables',
      price: 400,
      stock: 22,
      unit: 'kg',
      status: 'active',
      image: '🫘',
      harvestDate: '2024-06-21',
      description: 'Tender green beans rich in nutrients',
      rating: 4.9,
      orders: 12
    },
    {
      id: 6,
      name: 'Corn',
      category: 'Grains',
      price: 150,
      stock: 0,
      unit: 'kg',
      status: 'out_of_stock',
      image: '🌽',
      harvestDate: '2024-06-10',
      description: 'Sweet corn perfect for boiling and grilling',
      rating: 4.4,
      orders: 8
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'In Stock';
      case 'low_stock': return 'Low Stock';
      case 'out_of_stock': return 'Out of Stock';
      default: return 'Unknown';
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

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
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">My Products</h1>
                  <p className="text-sm text-gray-600 mt-1">Manage your farm products and inventory</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search products..."
                  className="bg-transparent text-sm outline-none w-36 lg:w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Add Product</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                  </div>
                  <Package className="w-6 lg:w-8 h-6 lg:h-8 text-emerald-500" />
                </div>
              </div>
              
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Products</p>
                    <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.status === 'active').length}</p>
                  </div>
                  <CheckCircle className="w-6 lg:w-8 h-6 lg:h-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Low Stock</p>
                    <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.status === 'low_stock').length}</p>
                  </div>
                  <AlertTriangle className="w-6 lg:w-8 h-6 lg:h-8 text-yellow-500" />
                </div>
              </div>
              
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">Rs. {products.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-6 lg:w-8 h-6 lg:h-8 text-blue-500" />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filter:</span>
                  </div>
                  <select 
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="grains">Grains</option>
                    <option value="fruits">Fruits</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <SortAsc className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Showing {filteredProducts.length} products</span>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4 lg:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                          {product.image}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
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
                        <span className="text-sm text-gray-600">Price per {product.unit}</span>
                        <span className="font-semibold text-gray-900">Rs. {product.price}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Stock</span>
                        <span className="font-semibold text-gray-900">{product.stock} {product.unit}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Total Orders</span>
                        <span className="font-semibold text-gray-900">{product.orders}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-semibold text-gray-900">{product.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                          {getStatusText(product.status)}
                        </span>
                        <div className="text-xs text-gray-500">
                          Harvested: {new Date(product.harvestDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                    <button 
                      onClick={() => setShowAddModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g., Organic Tomatoes"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                          <option>Vegetables</option>
                          <option>Fruits</option>
                          <option>Grains</option>
                          <option>Herbs</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rs.)</label>
                        <input 
                          type="number" 
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="300"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                        <input 
                          type="number" 
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                          <option>kg</option>
                          <option>g</option>
                          <option>pieces</option>
                          <option>bunches</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Date</label>
                      <input 
                        type="date" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea 
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Describe your product (organic, pesticide-free, etc.)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Photos</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload photos or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="organic" className="rounded" />
                      <label htmlFor="organic" className="text-sm text-gray-700">This is an organic product</label>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                      <button 
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                      >
                        Add Product
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

export default FarmerProductsPage;