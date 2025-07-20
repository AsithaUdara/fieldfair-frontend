"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Heart,
  Search,
  Filter,
  Grid3X3,
  List,
  ShoppingCart,
  Star,
  MapPin,
  Phone,
  Eye,
  Share2,
  Plus,
  Trash2,
  Package,
  Users,
  Leaf,
  Shield,
  Clock,
  TrendingUp,
  SlidersHorizontal,
  CheckCircle,
  X,
  AlertTriangle,
  Truck,
  Calendar,
  Target,
  Timer,
  ThumbsUp,
  ChevronDown,
  Sparkles,
  Award,
  MessageCircle,
  ExternalLink,
  Download,
  RefreshCw,
  DollarSign,
  Info,
  Menu
} from 'lucide-react';

const CustomerFavoritesPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFilters, setSelectedFilters] = useState({
    organic: false,
    available: true,
    highRated: false,
    recentlyAdded: false,
    purchased: false
  });

  // Enhanced responsive detection that matches the sidebar
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  // Enhanced responsive detection - same as marketplace and sidebar
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

  // Enhanced favorites data to match marketplace style
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Premium Organic Tomatoes',
      farmer: {
        name: 'Ravi Mahathaya',
        avatar: 'RM',
        farm: "Ravi's Organic Farm",
        verified: true,
        sustainabilityScore: 95,
        location: 'Kurunegala',
        phone: '+94 77 123 4567',
        rating: 4.8
      },
      price: 300,
      originalPrice: 350,
      unit: 'kg',
      rating: 4.8,
      reviews: 127,
      totalSold: 2500,
      image: '🍅',
      images: ['🍅', '🥗', '🌱'],
      category: 'vegetables',
      isOrganic: true,
      inStock: true,
      stockLevel: 45,
      description: 'Fresh organic tomatoes grown without pesticides using traditional farming methods',
      longDescription: 'These premium organic tomatoes are carefully cultivated using sustainable farming practices in the fertile soils of Kurunegala. Hand-picked at peak ripeness to ensure maximum flavor and nutritional value.',
      tags: ['Organic', 'Fresh', 'Local', 'Pesticide-free'],
      addedToFavorites: '2024-06-20',
      lastPurchased: '2024-06-15',
      totalPurchases: 3,
      isAvailable: true,
      carbonFootprint: 'Low',
      nutritionScore: 'A+',
      harvestDate: '2024-06-25',
      estimatedDelivery: '1-2 days',
      discount: 14,
      badges: ['Best Seller', 'Eco-Friendly'],
      deliveryMethods: ['pickup', 'delivery']
    },
    {
      id: 2,
      name: 'Sweet Rainbow Carrots',
      farmer: {
        name: 'Saman Silva',
        avatar: 'SS',
        farm: "Saman's Fresh Vegetables",
        verified: true,
        sustainabilityScore: 88,
        location: 'Matale',
        phone: '+94 76 987 6543',
        rating: 4.6
      },
      price: 250,
      originalPrice: 280,
      unit: 'kg',
      rating: 4.6,
      reviews: 89,
      totalSold: 1800,
      image: '🥕',
      images: ['🥕', '🥗', '🍲'],
      category: 'vegetables',
      isOrganic: true,
      inStock: true,
      stockLevel: 28,
      description: 'Sweet and crunchy rainbow carrots perfect for cooking and salads',
      longDescription: 'These colorful rainbow carrots offer a sweet, crisp texture and are packed with beta-carotene and essential vitamins. Grown in the highland region of Matale for optimal flavor development.',
      tags: ['Organic', 'Sweet', 'Fresh', 'Colorful'],
      addedToFavorites: '2024-06-18',
      lastPurchased: '2024-06-10',
      totalPurchases: 5,
      isAvailable: true,
      carbonFootprint: 'Low',
      nutritionScore: 'A',
      harvestDate: '2024-06-24',
      estimatedDelivery: '1-2 days',
      discount: 11,
      badges: ['Rainbow Variety', 'Sweet Taste'],
      deliveryMethods: ['pickup', 'delivery']
    },
    {
      id: 3,
      name: 'Premium Green Beans',
      farmer: {
        name: 'Nimal Gunasekara',
        avatar: 'NG',
        farm: "Nimal's Highland Farm",
        verified: true,
        sustainabilityScore: 93,
        location: 'Nuwara Eliya',
        phone: '+94 71 555 0123',
        rating: 4.9
      },
      price: 400,
      originalPrice: 450,
      unit: 'kg',
      rating: 4.9,
      reviews: 78,
      totalSold: 950,
      image: '🫘',
      images: ['🫘', '🥗', '🍽️'],
      category: 'vegetables',
      isOrganic: true,
      inStock: false,
      stockLevel: 0,
      description: 'Tender green beans rich in nutrients, perfect for healthy meals',
      longDescription: 'Premium quality green beans grown in the cool climate of Nuwara Eliya. These tender, crisp beans are rich in vitamins, minerals, and antioxidants.',
      tags: ['Organic', 'Premium', 'Nutritious', 'High-altitude'],
      addedToFavorites: '2024-06-15',
      lastPurchased: '2024-06-05',
      totalPurchases: 2,
      isAvailable: false,
      carbonFootprint: 'Medium',
      nutritionScore: 'A+',
      harvestDate: '2024-06-20',
      estimatedDelivery: '2-3 days',
      discount: 11,
      badges: ['Premium Quality', 'Highland Grown'],
      deliveryMethods: ['pickup']
    },
    {
      id: 4,
      name: 'Fresh King Coconuts',
      farmer: {
        name: 'Priyanka Fernando',
        avatar: 'PF',
        farm: "Fernando's Coconut Estate",
        verified: true,
        sustainabilityScore: 90,
        location: 'Negombo',
        phone: '+94 77 888 9999',
        rating: 4.7
      },
      price: 150,
      originalPrice: 150,
      unit: 'piece',
      rating: 4.7,
      reviews: 156,
      totalSold: 5600,
      image: '🥥',
      images: ['🥥', '🥤', '🌴'],
      category: 'fruits',
      isOrganic: false,
      inStock: true,
      stockLevel: 120,
      description: 'Fresh king coconuts perfect for natural hydration and health',
      longDescription: 'Fresh king coconuts straight from the tree, perfect for natural hydration. Rich in electrolytes and natural minerals.',
      tags: ['Fresh', 'Natural', 'Hydrating', 'Local'],
      addedToFavorites: '2024-06-12',
      lastPurchased: null,
      totalPurchases: 0,
      isAvailable: true,
      carbonFootprint: 'Very Low',
      nutritionScore: 'B+',
      harvestDate: '2024-06-26',
      estimatedDelivery: '1 day',
      discount: 0,
      badges: ['Hydrating', 'Natural'],
      deliveryMethods: ['pickup', 'delivery']
    },
    {
      id: 5,
      name: 'Aromatic Ceylon Cinnamon',
      farmer: {
        name: 'Chandana Rathnayake',
        avatar: 'CR',
        farm: "Rathnayake Spice Garden",
        verified: true,
        sustainabilityScore: 96,
        location: 'Matara',
        phone: '+94 75 333 4444',
        rating: 4.9
      },
      price: 800,
      originalPrice: 900,
      unit: '100g',
      rating: 4.9,
      reviews: 203,
      totalSold: 1200,
      image: '🥢',
      images: ['🥢', '☕', '🍪'],
      category: 'spices',
      isOrganic: true,
      inStock: true,
      stockLevel: 15,
      description: 'Premium Ceylon cinnamon sticks with authentic aroma and flavor',
      longDescription: 'Authentic Ceylon cinnamon (True Cinnamon) from the southern regions of Sri Lanka. Known worldwide for its delicate, sweet flavor and numerous health benefits.',
      tags: ['Organic', 'Ceylon', 'Premium', 'Aromatic'],
      addedToFavorites: '2024-06-08',
      lastPurchased: '2024-05-20',
      totalPurchases: 1,
      isAvailable: true,
      carbonFootprint: 'Low',
      nutritionScore: 'A',
      harvestDate: '2024-06-20',
      estimatedDelivery: '2-3 days',
      discount: 11,
      badges: ['World Famous', 'True Ceylon'],
      deliveryMethods: ['pickup', 'delivery']
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

  const categories = [
    { id: 'all', name: 'All Items', count: favorites.length, icon: '❤️', color: 'red' },
    { id: 'vegetables', name: 'Vegetables', count: favorites.filter(f => f.category === 'vegetables').length, icon: '🥬', color: 'green' },
    { id: 'fruits', name: 'Fruits', count: favorites.filter(f => f.category === 'fruits').length, icon: '🍎', color: 'orange' },
    { id: 'spices', name: 'Spices', count: favorites.filter(f => f.category === 'spices').length, icon: '🌶️', color: 'yellow' }
  ];

  const sortOptions = [
    { id: 'recent', name: 'Recently Added', icon: Clock },
    { id: 'price-low', name: 'Price: Low to High', icon: DollarSign },
    { id: 'price-high', name: 'Price: High to Low', icon: DollarSign },
    { id: 'rating', name: 'Highest Rated', icon: Star },
    { id: 'purchased', name: 'Most Purchased', icon: ThumbsUp },
    { id: 'available', name: 'Available First', icon: CheckCircle }
  ];

  const quickFilters = [
    { id: 'organic', label: 'Organic', icon: Leaf, color: 'emerald' },
    { id: 'available', label: 'Available Now', icon: CheckCircle, color: 'green' },
    { id: 'highRated', label: '4.5+ Rating', icon: Star, color: 'yellow' },
    { id: 'recentlyAdded', label: 'Recently Added', icon: Clock, color: 'blue' },
    { id: 'purchased', label: 'Previously Bought', icon: Package, color: 'purple' }
  ];

  const searchSuggestionsList = [
    'Organic tomatoes', 'Fresh carrots', 'Green beans', 'King coconut',
    'Ceylon cinnamon', 'Fresh vegetables', 'Organic produce', 'Local farmers'
  ];

  const filteredAndSortedFavorites = favorites
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      const matchesFilters = 
        (!selectedFilters.organic || item.isOrganic) &&
        (!selectedFilters.available || item.isAvailable) &&
        (!selectedFilters.highRated || item.rating >= 4.5) &&
        (!selectedFilters.recentlyAdded || new Date(item.addedToFavorites) > new Date('2024-06-15')) &&
        (!selectedFilters.purchased || item.totalPurchases > 0) &&
        (item.price >= priceRange[0] && item.price <= priceRange[1]);
      
      return matchesSearch && matchesCategory && matchesFilters;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.addedToFavorites) - new Date(a.addedToFavorites);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'purchased':
          return b.totalPurchases - a.totalPurchases;
        case 'available':
          return b.isAvailable - a.isAvailable;
        default:
          return 0;
      }
    });

  const removeFavorite = (itemId) => {
    setFavorites(favorites.filter(item => item.id !== itemId));
  };

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { id: item.id, quantity: 1 }];
    });
  };

  const openQuickView = (item) => {
    setSelectedProduct(item);
    setShowQuickView(true);
  };

  const contactFarmer = (farmer) => {
    window.open(`tel:${farmer.phone}`, '_self');
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
                    {screenSize.isMobile ? '❤️ Favorites' : '❤️ My Favorites'}
                  </h1>
                  <p className="text-gray-600 hidden sm:block">
                    {screenSize.isMobile 
                      ? 'Your saved products' 
                      : 'Your saved products from local farmers'
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
                      placeholder={screenSize.isMobile ? "Search..." : "Search favorites..."}
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

                {/* Favorites Stats */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Favorites Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Items:</span>
                      <span className="font-medium">{favorites.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-medium text-green-600">{favorites.filter(f => f.isAvailable).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Organic:</span>
                      <span className="font-medium text-emerald-600">{favorites.filter(f => f.isOrganic).length}</span>
                    </div>
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
                  {filteredAndSortedFavorites.length} favorites found
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
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                      : 'bg-white text-gray-700 border-2 border-gray-100 hover:border-red-200 hover:bg-red-50'
                  }`}
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">{category.icon}</div>
                  <div className="font-semibold text-xs lg:text-sm">{category.name}</div>
                  <div className="text-xs opacity-75 mt-1">({category.count})</div>
                </button>
              ))}
            </div>
          </div>

          {/* Favorites Grid/List - Enhanced Responsive */}
          {viewMode === 'grid' ? (
            <div className={`grid gap-4 lg:gap-6 ${
              screenSize.isMobile ? 'grid-cols-1' : 
              screenSize.isTablet ? 'grid-cols-2' : 
              'grid-cols-3 xl:grid-cols-4'
            }`}>
              {filteredAndSortedFavorites.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                  {/* Product Image Section */}
                  <div className="relative h-40 lg:h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                    <span className="text-5xl lg:text-6xl group-hover:scale-110 transition-transform duration-300">{item.image}</span>
                    
                    {/* Enhanced Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-2">
                      {item.isOrganic && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center shadow-lg">
                          <Leaf className="w-3 h-3 mr-1" />
                          Organic
                        </span>
                      )}
                      {item.discount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          -{item.discount}%
                        </span>
                      )}
                      {!item.isAvailable && (
                        <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          Out of Stock
                        </span>
                      )}
                    </div>
                    
                    {/* Remove from Favorites */}
                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </button>

                    {/* Quick View Button */}
                    <button
                      onClick={() => openQuickView(item)}
                      className="absolute bottom-3 right-3 p-2 bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {/* Stock Status */}
                    {item.isAvailable && (
                      <div className="absolute bottom-3 left-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          item.stockLevel > 20 ? 'bg-green-100 text-green-800' :
                          item.stockLevel > 5 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {item.stockLevel} {item.unit} left
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-4 lg:p-5">
                    {/* Product Name & Price */}
                    <div className="mb-4">
                      <div className="h-12 lg:h-14 mb-3">
                        <h3 className="font-bold text-base lg:text-lg text-gray-900 line-clamp-2 leading-tight">{item.name}</h3>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl lg:text-2xl font-bold text-emerald-600">Rs. {item.price}</span>
                            {item.discount > 0 && (
                              <span className="text-sm text-gray-500 line-through">Rs. {item.originalPrice}</span>
                            )}
                          </div>
                          <div className="text-xs lg:text-sm text-gray-500">per {item.unit}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Farmer Info */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center relative">
                          <span className="text-xs font-bold text-emerald-700">{item.farmer.avatar}</span>
                          {item.farmer.verified && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                              <Shield className="w-2 h-2 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-sm">{item.farmer.name}</div>
                          <div className="flex items-center text-xs text-gray-600">
                            <MapPin className="w-3 h-3 mr-1" />
                            {item.farmer.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Rating & Purchase History */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {[1,2,3,4,5].map(i => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i <= Math.floor(item.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-semibold text-sm text-gray-900">{item.rating}</span>
                          <span className="text-xs text-gray-500">({item.reviews})</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Package className="w-3 h-3" />
                          <span>{item.totalPurchases > 0 ? `Bought ${item.totalPurchases}x` : 'Never bought'}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 mt-2">
                        Added: {new Date(item.addedToFavorites).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="mb-5 p-3 bg-blue-50 rounded-xl">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-600">Delivery:</span>
                        </div>
                        <span className="font-medium text-gray-900">{item.estimatedDelivery}</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openQuickView(item)}
                          className="flex-1 border-2 border-gray-200 text-gray-700 py-2.5 px-3 rounded-xl text-sm font-semibold hover:border-emerald-300 hover:bg-emerald-50 transition-colors flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {screenSize.isMobile ? 'View' : 'View Details'}
                        </button>
                        <button
                          onClick={() => contactFarmer(item.farmer)}
                          className="p-2.5 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors flex items-center justify-center"
                        >
                          <Phone className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => addToCart(item)}
                        disabled={!item.isAvailable}
                        className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
                          item.isAvailable
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>{item.isAvailable ? 'Add to Cart' : 'Out of Stock'}</span>
                        {cartItems.find(cartItem => cartItem.id === item.id) && (
                          <span className="ml-2 bg-white bg-opacity-20 rounded-full px-2 py-1 text-xs font-bold">
                            {cartItems.find(cartItem => cartItem.id === item.id)?.quantity}
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
                {filteredAndSortedFavorites.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center space-x-6">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0 relative">
                        {item.image}
                        {item.discount > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full font-semibold">
                            -{item.discount}%
                          </span>
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <span className="text-xl font-bold text-emerald-600">Rs. {item.price}</span>
                                {item.discount > 0 && (
                                  <span className="text-sm text-gray-500 line-through">Rs. {item.originalPrice}</span>
                                )}
                                <span>per {item.unit}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span>{item.rating} ({item.reviews})</span>
                              </div>
                              <span>{item.farmer.name} • {item.farmer.location}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {item.isOrganic && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                Organic
                              </span>
                            )}
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              item.isAvailable 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {item.isAvailable ? `${item.stockLevel} ${item.unit} left` : 'Out of Stock'}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Added: {new Date(item.addedToFavorites).toLocaleDateString()}</span>
                            {item.totalPurchases > 0 && (
                              <span>Purchased {item.totalPurchases} times</span>
                            )}
                            <div className="flex items-center space-x-1">
                              <Truck className="w-4 h-4" />
                              <span>{item.estimatedDelivery}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => removeFavorite(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Heart className="w-5 h-5 fill-current" />
                            </button>
                            <button
                              onClick={() => openQuickView(item)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => addToCart(item)}
                              disabled={!item.isAvailable}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                                item.isAvailable
                                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              <ShoppingCart className="w-4 h-4" />
                              <span>{item.isAvailable ? 'Add to Cart' : 'Out of Stock'}</span>
                              {cartItems.find(cartItem => cartItem.id === item.id) && (
                                <span className="bg-white bg-opacity-20 rounded-full px-2 py-1 text-xs font-bold">
                                  {cartItems.find(cartItem => cartItem.id === item.id)?.quantity}
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
          {filteredAndSortedFavorites.length === 0 && (
            <div className="text-center py-16">
              <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || selectedCategory !== 'all' || Object.values(selectedFilters).some(v => v) ? 'No favorites found' : 'No favorites yet'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || selectedCategory !== 'all' || Object.values(selectedFilters).some(v => v)
                  ? 'Try adjusting your search or filters.' 
                  : 'Start exploring the marketplace to save your favorite products here.'
                }
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {(searchTerm || selectedCategory !== 'all' || Object.values(selectedFilters).some(v => v)) && (
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSelectedFilters({
                        organic: false,
                        available: true,
                        highRated: false,
                        recentlyAdded: false,
                        purchased: false
                      });
                    }}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
                <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                  Browse Marketplace
                </button>
              </div>
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
                    {selectedProduct.images?.map((img, index) => (
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
                      {selectedProduct.tags?.map((tag, index) => (
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
                          addToCart(selectedProduct);
                          setShowQuickView(false);
                        }}
                        disabled={!selectedProduct.isAvailable}
                        className={`w-full py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${
                          selectedProduct.isAvailable
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>{selectedProduct.isAvailable ? 'Add to Cart' : 'Out of Stock'}</span>
                      </button>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => removeFavorite(selectedProduct.id)}
                          className="flex-1 border border-red-300 text-red-700 py-2 px-4 rounded-xl font-medium hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                          <span>Remove from Favorites</span>
                        </button>
                        
                        <button
                          onClick={() => contactFarmer(selectedProduct.farmer)}
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
            <button className="bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center space-x-3">
              <ShoppingCart className="w-6 h-6" />
              <span className="font-medium">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerFavoritesPage;