"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Shield,
  SlidersHorizontal,
  TrendingUp,
  Clock,
  Eye,
  Phone,
  Plus,
  Sparkles,
  Truck,
  ThumbsUp,
  Calendar,
  Share2,
  ChevronDown,
  DollarSign,
  Target,
  CheckCircle,
  X,
  Heart,
  ShoppingCart,
  MapPin,
  Users,
  Leaf,
  Menu
} from 'lucide-react';

const EnhancedMarketplacePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFilters, setSelectedFilters] = useState({
    organic: false,
    fresh: false,
    local: false,
    fastDelivery: false,
    highRated: false,
    trending: false,
    inStock: true
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Enhanced responsive detection that matches the sidebar
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  // Enhanced responsive detection - same as enhanced sidebar
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

  // Enhanced products data
  const [products] = useState([
    {
      id: 1,
      name: 'Premium Organic Tomatoes',
      farmer: {
        name: 'Priyanka Rajapaksa',
        avatar: 'RM',
        verified: true,
        sustainabilityScore: 95,
        phone: '+94 77 123 4567',
        location: 'Kurunegala',
        farm: "Ravi's Organic Farm",
        rating: 4.8,
        totalProducts: 24
      },
      price: 300,
      originalPrice: 350,
      unit: 'kg',
      rating: 4.8,
      reviews: 127,
      totalSold: 2500,
      image: '🍅',
      images: ['🍅', '🥗', '🌱'],
      isOrganic: true,
      inStock: true,
      stockLevel: 45,
      harvestDate: '2024-06-25',
      expiryDate: '2024-07-05',
      description: 'Fresh organic tomatoes grown without pesticides using traditional farming methods. Perfect for salads, cooking, and making fresh sauces.',
      longDescription: 'These premium organic tomatoes are carefully cultivated using sustainable farming practices in the fertile soils of Kurunegala. Hand-picked at peak ripeness to ensure maximum flavor and nutritional value.',
      tags: ['Organic', 'Fresh', 'Local', 'Pesticide-free', 'Hand-picked'],
      isFavorite: false,
      carbonFootprint: 'Low',
      nutritionScore: 'A+',
      category: 'vegetables',
      subcategory: 'vine vegetables',
      deliveryMethods: ['pickup', 'delivery'],
      estimatedDelivery: '1-2 days',
      discount: 14,
      badges: ['Best Seller', 'Eco-Friendly'],
      certifications: ['Organic Certified', 'Pesticide Free']
    },
    {
      id: 2,
      name: 'Sweet Rainbow Carrots',
      farmer: {
        name: 'Saman Silva',
        avatar: 'SS',
        verified: true,
        sustainabilityScore: 88,
        phone: '+94 76 987 6543',
        location: 'Matale',
        farm: "Saman's Fresh Vegetables",
        rating: 4.6,
        totalProducts: 18
      },
      price: 250,
      originalPrice: 280,
      unit: 'kg',
      rating: 4.6,
      reviews: 89,
      totalSold: 1800,
      image: '🥕',
      images: ['🥕', '🥗', '🍲'],
      isOrganic: true,
      inStock: true,
      stockLevel: 28,
      harvestDate: '2024-06-24',
      expiryDate: '2024-07-15',
      description: 'Sweet and crunchy rainbow carrots perfect for cooking and salads',
      longDescription: 'These colorful rainbow carrots offer a sweet, crisp texture and are packed with beta-carotene and essential vitamins. Grown in the highland region of Matale for optimal flavor development.',
      tags: ['Organic', 'Sweet', 'Fresh', 'Colorful', 'High-altitude'],
      isFavorite: true,
      carbonFootprint: 'Low',
      nutritionScore: 'A',
      category: 'vegetables',
      subcategory: 'root vegetables',
      deliveryMethods: ['pickup', 'delivery'],
      estimatedDelivery: '1-2 days',
      discount: 11,
      badges: ['Rainbow Variety', 'Sweet Taste'],
      certifications: ['Organic Certified']
    },
    {
      id: 3,
      name: 'Crispy Green Cabbage',
      farmer: {
        name: 'Kamala Jayawardena',
        avatar: 'KJ',
        verified: true,
        sustainabilityScore: 82,
        phone: '+94 71 555 0123',
        location: 'Kandy',
        farm: "Kamala's Fresh Garden",
        rating: 4.7,
        totalProducts: 15
      },
      price: 180,
      originalPrice: 200,
      unit: 'kg',
      rating: 4.7,
      reviews: 156,
      totalSold: 3200,
      image: '🥬',
      images: ['🥬', '🥗', '🍜'],
      isOrganic: false,
      inStock: true,
      stockLevel: 67,
      harvestDate: '2024-06-23',
      expiryDate: '2024-07-10',
      description: 'Fresh cabbage ideal for salads, stir-fries and traditional dishes',
      longDescription: 'Crispy and fresh green cabbage with tightly packed leaves. Perfect for coleslaw, stir-fries, soups, and traditional Sri Lankan dishes. Grown using sustainable farming methods.',
      tags: ['Fresh', 'Local', 'Crisp', 'Versatile', 'Traditional'],
      isFavorite: false,
      carbonFootprint: 'Very Low',
      nutritionScore: 'A-',
      category: 'vegetables',
      subcategory: 'leafy vegetables',
      deliveryMethods: ['pickup', 'delivery'],
      estimatedDelivery: '1-2 days',
      discount: 10,
      badges: ['Local Favorite'],
      certifications: ['Fresh Guaranteed']
    },
    {
      id: 4,
      name: 'Premium Green Beans',
      farmer: {
        name: 'Nimal Gunasekara',
        avatar: 'NG',
        verified: true,
        sustainabilityScore: 93,
        phone: '+94 71 444 5566',
        location: 'Nuwara Eliya',
        farm: "Nimal's Highland Farm",
        rating: 4.9,
        totalProducts: 12
      },
      price: 400,
      originalPrice: 450,
      unit: 'kg',
      rating: 4.9,
      reviews: 78,
      totalSold: 950,
      image: '🫘',
      images: ['🫘', '🥗', '🍽️'],
      isOrganic: true,
      inStock: true,
      stockLevel: 15,
      harvestDate: '2024-06-25',
      expiryDate: '2024-07-08',
      description: 'Tender green beans rich in nutrients, perfect for healthy meals',
      longDescription: 'Premium quality green beans grown in the cool climate of Nuwara Eliya. These tender, crisp beans are rich in vitamins, minerals, and antioxidants. Perfect for steaming, stir-frying, or eating fresh.',
      tags: ['Organic', 'Premium', 'Nutritious', 'High-altitude', 'Tender'],
      isFavorite: true,
      carbonFootprint: 'Medium',
      nutritionScore: 'A+',
      category: 'vegetables',
      subcategory: 'pod vegetables',
      deliveryMethods: ['pickup'],
      estimatedDelivery: '2-3 days',
      discount: 11,
      badges: ['Premium Quality', 'Highland Grown'],
      certifications: ['Organic Certified', 'Premium Grade']
    },
    {
      id: 5,
      name: 'Fresh King Coconuts',
      farmer: {
        name: 'Priya Fernando',
        avatar: 'PF',
        verified: true,
        sustainabilityScore: 90,
        phone: '+94 77 888 9999',
        location: 'Negombo',
        farm: "Fernando's Coconut Estate",
        rating: 4.5,
        totalProducts: 8
      },
      price: 150,
      originalPrice: 150,
      unit: 'piece',
      rating: 4.5,
      reviews: 234,
      totalSold: 5600,
      image: '🥥',
      images: ['🥥', '🥤', '🌴'],
      isOrganic: false,
      inStock: true,
      stockLevel: 150,
      harvestDate: '2024-06-26',
      expiryDate: '2024-07-03',
      description: 'Fresh king coconuts perfect for natural hydration and health',
      longDescription: 'Fresh king coconuts straight from the tree, perfect for natural hydration. Rich in electrolytes and natural minerals. Each coconut is hand-selected for quality and freshness.',
      tags: ['Fresh', 'Natural', 'Hydrating', 'Local', 'Electrolytes'],
      isFavorite: false,
      carbonFootprint: 'Very Low',
      nutritionScore: 'B+',
      category: 'fruits',
      subcategory: 'tropical fruits',
      deliveryMethods: ['pickup', 'delivery'],
      estimatedDelivery: '1 day',
      discount: 0,
      badges: ['Hydrating', 'Natural'],
      certifications: ['Fresh Daily']
    },
    {
      id: 6,
      name: 'Aromatic Ceylon Cinnamon',
      farmer: {
        name: 'Chandana Rathnayake',
        avatar: 'CR',
        verified: true,
        sustainabilityScore: 96,
        phone: '+94 75 333 4444',
        location: 'Matara',
        farm: "Rathnayake Spice Garden",
        rating: 4.9,
        totalProducts: 25
      },
      price: 800,
      originalPrice: 900,
      unit: '100g',
      rating: 4.9,
      reviews: 203,
      totalSold: 1200,
      image: '🥢',
      images: ['🥢', '☕', '🍪'],
      isOrganic: true,
      inStock: true,
      stockLevel: 25,
      harvestDate: '2024-06-20',
      expiryDate: '2025-06-20',
      description: 'Premium Ceylon cinnamon sticks with authentic aroma and flavor',
      longDescription: 'Authentic Ceylon cinnamon (True Cinnamon) from the southern regions of Sri Lanka. Known worldwide for its delicate, sweet flavor and numerous health benefits. Hand-peeled and sun-dried using traditional methods.',
      tags: ['Organic', 'Ceylon', 'Premium', 'Aromatic', 'Traditional'],
      isFavorite: false,
      carbonFootprint: 'Low',
      nutritionScore: 'A',
      category: 'spices',
      subcategory: 'bark spices',
      deliveryMethods: ['pickup', 'delivery'],
      estimatedDelivery: '2-3 days',
      discount: 11,
      badges: ['World Famous', 'True Ceylon'],
      certifications: ['Organic Certified', 'Export Quality']
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Products', count: products.length, icon: '🛒', color: 'emerald' },
    { id: 'vegetables', name: 'Vegetables', count: 4, icon: '🥬', color: 'green' },
    { id: 'fruits', name: 'Fruits', count: 1, icon: '🍎', color: 'red' },
    { id: 'spices', name: 'Spices', count: 1, icon: '🌶️', color: 'orange' }
  ];

  const quickFilters = [
    { id: 'organic', label: 'Organic', icon: Leaf, color: 'emerald' },
    { id: 'fresh', label: 'Fresh Today', icon: Sparkles, color: 'blue' },
    { id: 'local', label: 'Local (< 10km)', icon: MapPin, color: 'purple' },
    { id: 'highRated', label: '4.5+ Rating', icon: Star, color: 'yellow' },
    { id: 'fastDelivery', label: 'Fast Delivery', icon: Truck, color: 'indigo' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, color: 'pink' }
  ];

  const sortOptions = [
    { id: 'recommended', name: 'Recommended', icon: Target },
    { id: 'price-low', name: 'Price: Low to High', icon: DollarSign },
    { id: 'price-high', name: 'Price: High to Low', icon: DollarSign },
    { id: 'rating', name: 'Highest Rated', icon: Star },
    { id: 'newest', name: 'Newest First', icon: Clock },
    { id: 'popular', name: 'Most Popular', icon: ThumbsUp }
  ];

  // Search suggestions
  const searchSuggestionsList = [
    'Organic tomatoes', 'Fresh carrots', 'Green beans', 'King coconut',
    'Ceylon cinnamon', 'Fresh vegetables', 'Organic produce', 'Local farmers'
  ];

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      matchesCategory = product.category === selectedCategory;
    }

    const matchesFilters = 
      (!selectedFilters.organic || product.isOrganic) &&
      (!selectedFilters.inStock || product.inStock) &&
      (!selectedFilters.highRated || product.rating >= 4.5) &&
      (!selectedFilters.local || ['Kurunegala', 'Kandy', 'Negombo'].includes(product.farmer.location)) &&
      (product.price >= priceRange[0] && product.price <= priceRange[1]);
    
    return matchesSearch && matchesCategory && matchesFilters;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'popular': return b.totalSold - a.totalSold;
      case 'newest': return new Date(b.harvestDate) - new Date(a.harvestDate);
      default: return 0;
    }
  });

  // Interactive functions
  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: productId, quantity }];
    });
  };

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setShowQuickView(true);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const suggestions = searchSuggestionsList.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const toggleFilter = (filterId) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
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

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* SINGLE Sidebar Component - Enhanced Responsive */}
      <FieldFairSidebar 
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={screenSize.isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="customer"
      />

      {/* Main Content - Enhanced Responsive Margin */}
      <div className={`flex-1 transition-all duration-300 ${getMainContentMargin()}`}>
        {/* Enhanced Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {/* Mobile menu button - only show on mobile */}
                {screenSize.isMobile && (
                  <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 rounded-lg hover:bg-gray-100 mr-4 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                )}
                
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    {screenSize.isMobile ? '🏪 Store' : '🌾 FieldFair Marketplace'}
                  </h1>
                  <p className="text-gray-600 hidden sm:block">
                    {screenSize.isMobile 
                      ? 'Fresh products nearby' 
                      : 'Fresh produce directly from local farmers'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Enhanced Search with Suggestions */}
                <div className="relative">
                  <div className={`flex items-center bg-gray-100 rounded-xl px-4 py-3 ${
                    screenSize.isMobile ? 'w-48' : 'w-full max-w-md'
                  }`}>
                    <Search className="w-5 h-5 text-gray-500 mr-3" />
                    <input 
                      type="text" 
                      placeholder={screenSize.isMobile ? "Search..." : "Search for fresh produce..."}
                      className="bg-transparent text-sm outline-none flex-1"
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                    {searchTerm && (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setShowSuggestions(false);
                        }}
                        className="ml-2 p-1 hover:bg-gray-200 rounded-full"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    )}
                  </div>
                  
                  {/* Search Suggestions */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 max-h-60 overflow-y-auto">
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchTerm(suggestion);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-0"
                        >
                          <Search className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-3 rounded-xl transition-colors ${showFilters ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                  </button>
                  
                  {!screenSize.isMobile && (
                    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Filters - Responsive */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-3 overflow-x-auto">
              {quickFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedFilters[filter.id]
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <filter.icon className="w-3 lg:w-4 h-3 lg:h-4" />
                  <span>{screenSize.isMobile ? filter.label.split(' ')[0] : filter.label}</span>
                  {selectedFilters[filter.id] && (
                    <CheckCircle className="w-3 lg:w-4 h-3 lg:h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4 lg:p-6">
          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Rs. {priceRange[0]}</span>
                      <div className="flex-1 relative">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <span className="text-sm text-gray-600">Rs. {priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Sort By</h4>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>

                {/* Additional Filters */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Additional Filters</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedFilters.inStock}
                        onChange={() => toggleFilter('inStock')}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">In Stock Only</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Categories - Responsive Grid */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-bold text-gray-900">Browse Categories</h2>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                  {filteredProducts.length} products found
                </div>
              </div>
            </div>
            
            <div className={`grid gap-4 ${
              screenSize.isMobile ? 'grid-cols-2' : 
              screenSize.isTablet ? 'grid-cols-3' : 
              'grid-cols-4'
            }`}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 lg:p-6 rounded-2xl text-center transition-all transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-white text-gray-700 border-2 border-gray-100 hover:border-emerald-200 hover:bg-emerald-50'
                  }`}
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">{category.icon}</div>
                  <div className="font-semibold text-xs lg:text-sm">{category.name}</div>
                  <div className="text-xs opacity-75 mt-1">({category.count})</div>
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid/List - Enhanced Responsive */}
          {viewMode === 'grid' ? (
            <div className={`grid gap-4 lg:gap-6 ${
              screenSize.isMobile ? 'grid-cols-1' : 
              screenSize.isTablet ? 'grid-cols-2' : 
              'grid-cols-3 xl:grid-cols-4'
            }`}>
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                  {/* Product Image Section */}
                  <div className="relative h-40 lg:h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                    <span className="text-5xl lg:text-6xl group-hover:scale-110 transition-transform duration-300">{product.image}</span>
                    
                    {/* Enhanced Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-2">
                      {product.isOrganic && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center shadow-lg">
                          <Leaf className="w-3 h-3 mr-1" />
                          Organic
                        </span>
                      )}
                      {product.discount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                    
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                    </button>

                    {/* Quick View Button */}
                    <button
                      onClick={() => openQuickView(product)}
                      className="absolute bottom-3 right-3 p-2 bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Stock Status */}
                    <div className="absolute bottom-3 left-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        product.stockLevel > 20 ? 'bg-green-100 text-green-800' :
                        product.stockLevel > 5 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {product.stockLevel} {product.unit} left
                      </span>
                    </div>
                  </div>
                  
                  {/* Enhanced Product Details */}
                  <div className="p-4 lg:p-5">
                    {/* Product Name - Fixed 2 lines height */}
                    <div className="mb-4">
                      <div className="h-12 lg:h-14 mb-3">
                        <h3 className="font-bold text-base lg:text-lg text-gray-900 line-clamp-2 leading-tight">{product.name}</h3>
                      </div>
                      {/* Price */}
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl lg:text-2xl font-bold text-emerald-600">Rs. {product.price}</span>
                            {product.discount > 0 && (
                              <span className="text-sm text-gray-500 line-through">Rs. {product.originalPrice}</span>
                            )}
                          </div>
                          <div className="text-xs lg:text-sm text-gray-500">per {product.unit}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Farmer Info */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center relative">
                          <span className="text-xs font-bold text-emerald-700">{product.farmer.avatar}</span>
                          {product.farmer.verified && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                              <Shield className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-sm">{product.farmer.name}</div>
                          <div className="flex items-center text-xs text-gray-600">
                            <MapPin className="w-3 h-3 mr-1" />
                            {product.farmer.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Rating & Reviews */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {[1,2,3,4,5].map(i => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i <= Math.floor(product.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-semibold text-sm text-gray-900">{product.rating}</span>
                          <span className="text-xs text-gray-500">({product.reviews})</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Users className="w-3 h-3" />
                          <span>{product.totalSold} sold</span>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="mb-5 p-3 bg-blue-50 rounded-xl">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-600">Delivery:</span>
                        </div>
                        <span className="font-medium text-gray-900">{product.estimatedDelivery}</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openQuickView(product)}
                          className="flex-1 border-2 border-gray-200 text-gray-700 py-2.5 px-3 rounded-xl text-sm font-semibold hover:border-emerald-300 hover:bg-emerald-50 transition-colors flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {screenSize.isMobile ? 'View' : 'Quick View'}
                        </button>
                        <button
                          onClick={() => window.open(`tel:${product.farmer.phone}`, '_self')}
                          className="p-2.5 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors flex items-center justify-center"
                        >
                          <Phone className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                        className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
                          product.inStock
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <Plus className="w-5 h-5 font-bold stroke-[3]" />
                        <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                        {cartItems.find(item => item.id === product.id) && (
                          <span className="ml-2 bg-white bg-opacity-20 rounded-full px-2 py-1 text-xs font-bold">
                            {cartItems.find(item => item.id === product.id)?.quantity}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View - Hide on mobile */
            !screenSize.isMobile && (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-6">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0 relative">
                        {product.image}
                        {product.discount > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full font-semibold">
                            -{product.discount}%
                          </span>
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <span className="text-xl font-bold text-emerald-600">Rs. {product.price}</span>
                                {product.discount > 0 && (
                                  <span className="text-sm text-gray-500 line-through">Rs. {product.originalPrice}</span>
                                )}
                                <span>per {product.unit}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span>{product.rating} ({product.reviews})</span>
                              </div>
                              <span>{product.farmer.name} • {product.farmer.location}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {product.isOrganic && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                Organic
                              </span>
                            )}
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              product.inStock 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.inStock ? `${product.stockLevel} ${product.unit} left` : 'Out of Stock'}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Truck className="w-4 h-4" />
                              <span>{product.estimatedDelivery}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>Harvested: {new Date(product.harvestDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => toggleFavorite(product.id)}
                              className="p-2.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors flex items-center justify-center"
                            >
                              <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : ''}`} />
                            </button>
                            <button
                              onClick={() => openQuickView(product)}
                              className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Quick View
                            </button>
                            <button
                              onClick={() => addToCart(product.id)}
                              disabled={!product.inStock}
                              className={`px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                                product.inStock
                                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              <Plus className="w-5 h-5 font-bold stroke-[3]" />
                              <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                              {cartItems.find(item => item.id === product.id) && (
                                <span className="bg-white bg-opacity-20 rounded-full px-2 py-1 text-xs font-bold">
                                  {cartItems.find(item => item.id === product.id)?.quantity}
                                </span>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedFilters({
                    organic: false,
                    fresh: false,
                    local: false,
                    fastDelivery: false,
                    highRated: false,
                    trending: false,
                    inStock: true
                  });
                }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>

        {/* Quick View Modal */}
        {showQuickView && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
                <button 
                  onClick={() => setShowQuickView(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Images */}
                <div>
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center text-8xl mb-4">
                    {selectedProduct.image}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProduct.images.map((img, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {img}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold text-emerald-600">Rs. {selectedProduct.price}</span>
                        {selectedProduct.discount > 0 && (
                          <span className="text-lg text-gray-500 line-through">Rs. {selectedProduct.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-gray-600">per {selectedProduct.unit}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        {[1,2,3,4,5].map(i => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i <= Math.floor(selectedProduct.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-900">{selectedProduct.rating}</span>
                      <span className="text-gray-500">({selectedProduct.reviews} reviews)</span>
                    </div>

                    <p className="text-gray-600 mb-6">{selectedProduct.longDescription}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProduct.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Farmer Info */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center relative">
                          <span className="text-sm font-bold text-emerald-700">{selectedProduct.farmer.avatar}</span>
                          {selectedProduct.farmer.verified && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <Shield className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{selectedProduct.farmer.name}</div>
                          <div className="text-sm text-gray-600">{selectedProduct.farmer.farm}</div>
                          <div className="text-sm text-gray-600">{selectedProduct.farmer.location}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          addToCart(selectedProduct.id);
                          setShowQuickView(false);
                        }}
                        disabled={!selectedProduct.inStock}
                        className={`w-full py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${
                          selectedProduct.inStock
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>{selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                      </button>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => toggleFavorite(selectedProduct.id)}
                          className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                        >
                          <Heart className={`w-5 h-5 ${favorites.includes(selectedProduct.id) ? 'text-red-500 fill-current' : ''}`} />
                          <span>{favorites.includes(selectedProduct.id) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                        </button>
                        
                        <button
                          onClick={() => window.open(`tel:${selectedProduct.farmer.phone}`, '_self')}
                          className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                        >
                          <Phone className="w-5 h-5" />
                          <span>Contact Farmer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Cart Button */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <Link
              href="/marketplace/cart"
              className="bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center space-x-3"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="font-medium">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedMarketplacePage;