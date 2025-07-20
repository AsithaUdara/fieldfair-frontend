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
  Leaf,
  Menu,
  X,
  TrendingUp,
  Users,
  Clock,
  Activity,
  Upload,
  Check
} from 'lucide-react';

const FarmerProductsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Form data for adding new product
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Vegetables',
    price: '',
    stock: '',
    unit: 'kg',
    harvestDate: '',
    description: '',
    isOrganic: false,
    isPesticideFree: false,
    isLocal: false,
    image: '📦'
  });

  // Enhanced responsive detection that matches the marketplace
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

  // Hide success message after 3 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

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
      description: 'Fresh organic tomatoes grown without pesticides using traditional farming methods',
      rating: 4.8,
      orders: 23,
      revenue: 6900,
      isOrganic: true,
      views: 156,
      lastWeekSales: 8
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
      description: 'Sweet and crunchy carrots perfect for cooking and salads',
      rating: 4.6,
      orders: 18,
      revenue: 4500,
      isOrganic: true,
      views: 134,
      lastWeekSales: 5
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
      description: 'Fresh cabbage ideal for salads and traditional cooking',
      rating: 4.7,
      orders: 15,
      revenue: 2700,
      isOrganic: false,
      views: 98,
      lastWeekSales: 4
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
      description: 'Premium quality red onions with strong flavor and long shelf life',
      rating: 4.5,
      orders: 31,
      revenue: 6820,
      isOrganic: false,
      views: 203,
      lastWeekSales: 12
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
      description: 'Tender green beans rich in nutrients, perfect for healthy meals',
      rating: 4.9,
      orders: 12,
      revenue: 4800,
      isOrganic: true,
      views: 87,
      lastWeekSales: 3
    },
    {
      id: 6,
      name: 'Sweet Corn',
      category: 'Grains',
      price: 150,
      stock: 0,
      unit: 'kg',
      status: 'out_of_stock',
      image: '🌽',
      harvestDate: '2024-06-10',
      description: 'Sweet corn perfect for boiling, grilling, and making fresh dishes',
      rating: 4.4,
      orders: 8,
      revenue: 1200,
      isOrganic: false,
      views: 76,
      lastWeekSales: 0
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'low_stock': return AlertTriangle;
      case 'out_of_stock': return X;
      default: return Package;
    }
  };

  // Determine product status based on stock level
  const getProductStatus = (stock) => {
    if (stock === 0) return 'out_of_stock';
    if (stock <= 10) return 'low_stock';
    return 'active';
  };

  // Get product emoji based on category and name
  const getProductEmoji = (name, category) => {
    const nameL = name.toLowerCase();
    if (nameL.includes('tomato')) return '🍅';
    if (nameL.includes('carrot')) return '🥕';
    if (nameL.includes('cabbage')) return '🥬';
    if (nameL.includes('onion')) return '🧄';
    if (nameL.includes('bean')) return '🫘';
    if (nameL.includes('corn')) return '🌽';
    if (nameL.includes('potato')) return '🥔';
    if (nameL.includes('pepper')) return '🌶️';
    if (nameL.includes('lettuce')) return '🥬';
    if (nameL.includes('broccoli')) return '🥦';
    if (nameL.includes('apple')) return '🍎';
    if (nameL.includes('banana')) return '🍌';
    if (nameL.includes('orange')) return '🍊';
    
    // Default emojis by category
    switch (category.toLowerCase()) {
      case 'vegetables': return '🥬';
      case 'fruits': return '🍎';
      case 'grains': return '🌾';
      case 'herbs & spices': return '🌿';
      default: return '📦';
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Reset form
  const resetForm = () => {
    setNewProduct({
      name: '',
      category: 'Vegetables',
      price: '',
      stock: '',
      unit: 'kg',
      harvestDate: '',
      description: '',
      isOrganic: false,
      isPesticideFree: false,
      isLocal: false,
      image: '📦'
    });
  };

  // Handle form submission
  const handleAddProduct = (e) => {
    e.preventDefault();
    
    // Validation
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.harvestDate) {
      alert('Please fill in all required fields');
      return;
    }

    const stock = parseInt(newProduct.stock);
    const price = parseInt(newProduct.price);

    // Create new product object
    const productToAdd = {
      id: Date.now(), // Simple ID generation
      name: newProduct.name,
      category: newProduct.category,
      price: price,
      stock: stock,
      unit: newProduct.unit,
      status: getProductStatus(stock),
      image: getProductEmoji(newProduct.name, newProduct.category),
      harvestDate: newProduct.harvestDate,
      description: newProduct.description || `Fresh ${newProduct.name.toLowerCase()} from our farm`,
      rating: 0, // New product starts with no rating
      orders: 0, // New product starts with no orders
      revenue: 0, // New product starts with no revenue
      isOrganic: newProduct.isOrganic,
      views: 0,
      lastWeekSales: 0
    };

    // Add to products array at the beginning
    setProducts(prev => [productToAdd, ...prev]);
    
    // Reset form and close modal
    resetForm();
    setShowAddModal(false);
    
    // Show success message
    setShowSuccessMessage(true);
  };

  // Preset data for demonstration (Kamal's organic tomatoes)
  const fillDemoData = () => {
    setNewProduct({
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      price: '120',
      stock: '50',
      unit: 'kg',
      harvestDate: '2024-07-20',
      description: 'Premium organic tomatoes grown using traditional farming methods without pesticides. Harvested at peak ripeness for maximum flavor and nutrition. Perfect for cooking, salads, and fresh consumption.',
      isOrganic: true,
      isPesticideFree: true,
      isLocal: true,
      image: '🍅'
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'price': return b.price - a.price;
      case 'stock': return b.stock - a.stock;
      case 'rating': return b.rating - a.rating;
      case 'orders': return b.orders - a.orders;
      case 'revenue': return b.revenue - a.revenue;
      default: return 0;
    }
  });

  const totalRevenue = products.reduce((acc, p) => acc + p.revenue, 0);
  const totalInventoryValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Enhanced Sidebar - Single Instance */}
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={screenSize.isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="farmer"
      />

      <div className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 ${getMainContentMargin()}`}>
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-bounce">
            <Check className="w-5 h-5" />
            <span>Product added successfully!</span>
          </div>
        )}

        {/* Enhanced Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 shadow-sm">
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
                    {screenSize.isMobile ? '📦 Products' : '📦 My Products'}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    {screenSize.isMobile 
                      ? 'Manage inventory' 
                      : 'Manage your farm products and inventory'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Search - responsive width */}
              <div className={`flex items-center bg-gray-100 rounded-lg px-3 py-2 ${
                screenSize.isMobile ? 'w-32' : 'w-48 lg:w-64'
              }`}>
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder={screenSize.isMobile ? "Search..." : "Search products..."}
                  className="bg-transparent text-sm outline-none flex-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className={screenSize.isMobile ? "" : "hidden sm:inline"}>
                  {screenSize.isMobile ? "Add" : "Add Product"}
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
              screenSize.isTablet ? 'grid-cols-3' : 
              'grid-cols-4'
            }`}>
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">Total Products</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{products.length}</p>
                    <p className="text-xs text-green-600 font-medium mt-1">+2 this week</p>
                  </div>
                  <Package className="w-6 lg:w-8 h-6 lg:h-8 text-emerald-500" />
                </div>
              </div>
              
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">Active Products</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{products.filter(p => p.status === 'active').length}</p>
                    <p className="text-xs text-blue-600 font-medium mt-1">Available now</p>
                  </div>
                  <CheckCircle className="w-6 lg:w-8 h-6 lg:h-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">Low Stock</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{products.filter(p => p.status === 'low_stock').length}</p>
                    <p className="text-xs text-yellow-600 font-medium mt-1">Need restocking</p>
                  </div>
                  <AlertTriangle className="w-6 lg:w-8 h-6 lg:h-8 text-yellow-500" />
                </div>
              </div>
              
              <div className={`bg-white p-4 lg:p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow ${
                screenSize.isMobile ? 'col-span-2' : ''
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">
                      {screenSize.isMobile ? 'Revenue' : 'Total Revenue'}
                    </p>
                    <p className="text-lg lg:text-2xl font-bold text-gray-900">Rs. {totalRevenue.toLocaleString()}</p>
                    <p className="text-xs text-emerald-600 font-medium mt-1">+15% this month</p>
                  </div>
                  <DollarSign className="w-6 lg:w-8 h-6 lg:h-8 text-blue-500" />
                </div>
              </div>
            </div>

            {/* Enhanced Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 shadow-sm">
              <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filter:</span>
                  </div>
                  <div className="flex space-x-2">
                    <select 
                      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="grains">Grains</option>
                      <option value="fruits">Fruits</option>
                    </select>
                    
                    <select 
                      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="name">Sort by Name</option>
                      <option value="price">Sort by Price</option>
                      <option value="stock">Sort by Stock</option>
                      <option value="rating">Sort by Rating</option>
                      <option value="orders">Sort by Orders</option>
                      <option value="revenue">Sort by Revenue</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <SortAsc className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Showing {filteredProducts.length} of {products.length} products
                    </span>
                  </div>
                  
                  {!screenSize.isMobile && (
                    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1 ml-4">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        <Package className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Products Grid/List - Responsive */}
            {viewMode === 'grid' || screenSize.isMobile ? (
              <div className={`grid gap-4 lg:gap-6 ${
                screenSize.isMobile ? 'grid-cols-1' : 
                screenSize.isTablet ? 'grid-cols-2' : 
                'grid-cols-3'
              }`}>
                {filteredProducts.map((product) => {
                  const StatusIcon = getStatusIcon(product.status);
                  return (
                    <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                      <div className="p-4 lg:p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-2xl relative">
                              {product.image}
                              {product.isOrganic && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                  <Leaf className="w-2.5 h-2.5 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                              <p className="text-sm text-gray-500">{product.category}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteProduct(product.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Price per {product.unit}</span>
                            <span className="font-semibold text-emerald-600 text-lg">Rs. {product.price}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Stock</span>
                            <span className={`font-semibold ${
                              product.stock > 20 ? 'text-green-600' :
                              product.stock > 5 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {product.stock} {product.unit}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Orders</span>
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3 text-gray-400" />
                                <span className="font-medium text-gray-900">{product.orders}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Rating</span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="font-medium text-gray-900">{product.rating || 'New'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Revenue</span>
                            <span className="font-semibold text-blue-600">Rs. {product.revenue.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {getStatusText(product.status)}
                            </span>
                            <div className="text-xs text-gray-500 flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(product.harvestDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Eye className="w-3 h-3" />
                            <span>{product.views} views</span>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <TrendingUp className="w-3 h-3" />
                            <span>{product.lastWeekSales} sold this week</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View - Enhanced for tablet/desktop */
              <div className="space-y-4">
                {filteredProducts.map((product) => {
                  const StatusIcon = getStatusIcon(product.status);
                  return (
                    <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-6">
                        {/* Product Image & Info */}
                        <div className="flex items-center space-x-4 flex-1 min-w-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 relative">
                            {product.image}
                            {product.isOrganic && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                <Leaf className="w-2.5 h-2.5 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{product.category}</span>
                              <span>•</span>
                              <span>Harvested: {new Date(product.harvestDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-6 text-center">
                          <div>
                            <div className="text-lg font-bold text-emerald-600">Rs. {product.price}</div>
                            <div className="text-xs text-gray-500">per {product.unit}</div>
                          </div>
                          <div>
                            <div className={`text-lg font-bold ${
                              product.stock > 20 ? 'text-green-600' :
                              product.stock > 5 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {product.stock}
                            </div>
                            <div className="text-xs text-gray-500">{product.unit} in stock</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-blue-600">{product.orders}</div>
                            <div className="text-xs text-gray-500">total orders</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-purple-600">Rs. {product.revenue.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">revenue</div>
                          </div>
                        </div>

                        {/* Status & Actions */}
                        <div className="flex items-center space-x-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {getStatusText(product.status)}
                          </span>
                          
                          <div className="flex items-center space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteProduct(product.id)}
                              className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Start by adding your first product.'}
                </p>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors inline-flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Product</span>
                </button>
              </div>
            )}

            {/* Enhanced Add Product Modal */}
            {showAddModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={fillDemoData}
                        className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                      >
                        Demo: Kamal's Tomatoes
                      </button>
                      <button 
                        onClick={() => {
                          setShowAddModal(false);
                          resetForm();
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleAddProduct} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product Name <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text"
                          name="name"
                          value={newProduct.name}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="e.g., Organic Tomatoes"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select 
                          name="category"
                          value={newProduct.category}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option>Vegetables</option>
                          <option>Fruits</option>
                          <option>Grains</option>
                          <option>Herbs & Spices</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price (Rs.) <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="number"
                          name="price"
                          value={newProduct.price}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="120"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stock Quantity <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="number"
                          name="stock"
                          value={newProduct.stock}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="50"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                        <select 
                          name="unit"
                          value={newProduct.unit}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option>kg</option>
                          <option>g</option>
                          <option>pieces</option>
                          <option>bunches</option>
                          <option>liters</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Harvest Date <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="date"
                        name="harvestDate"
                        value={newProduct.harvestDate}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea 
                        rows={3}
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Describe your product - mention if it's organic, pesticide-free, farming methods, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Photos</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload photos or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB each</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-gray-700">Quality Certifications</h4>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="organic" 
                          name="isOrganic"
                          checked={newProduct.isOrganic}
                          onChange={handleInputChange}
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" 
                        />
                        <label htmlFor="organic" className="text-sm text-gray-700">This is an organic product</label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="pesticide-free" 
                          name="isPesticideFree"
                          checked={newProduct.isPesticideFree}
                          onChange={handleInputChange}
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" 
                        />
                        <label htmlFor="pesticide-free" className="text-sm text-gray-700">Pesticide-free</label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="local" 
                          name="isLocal"
                          checked={newProduct.isLocal}
                          onChange={handleInputChange}
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" 
                        />
                        <label htmlFor="local" className="text-sm text-gray-700">Locally grown</label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                      <button 
                        type="button"
                        onClick={() => {
                          setShowAddModal(false);
                          resetForm();
                        }}
                        className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
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