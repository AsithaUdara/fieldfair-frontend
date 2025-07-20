"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Heart,
  MapPin,
  Truck,
  CreditCard,
  Clock,
  Shield,
  Leaf,
  Star,
  Phone,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Calculator,
  Gift,
  Tag,
  AlertCircle,
  CheckCircle,
  Info,
  X,
  Edit,
  Copy,
  Percent,
  Package,
  User,
  Calendar,
  Award,
  Sparkles,
  ThumbsUp,
  TrendingUp,
  Eye,
  Share2,
  RefreshCw,
  Timer,
  Navigation,
  Zap,
  Target,
  Menu
} from 'lucide-react';

const CustomerCartPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('delivery');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(null);

  // Enhanced responsive detection - same as marketplace
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  // Enhanced cart data matching marketplace style
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Organic Tomatoes',
      farmer: {
        name: 'Ravi Mahathaya',
        avatar: 'RM',
        farm: "Ravi's Organic Farm",
        location: 'Kurunegala',
        phone: '+94 77 123 4567',
        verified: true,
        rating: 4.8,
        sustainabilityScore: 95
      },
      price: 300,
      originalPrice: 350,
      unit: 'kg',
      quantity: 2,
      image: '🍅',
      isOrganic: true,
      stockLevel: 45,
      deliveryMethods: ['delivery', 'pickup'],
      estimatedDelivery: '1-2 days',
      tags: ['Organic', 'Fresh', 'Local'],
      discount: 14,
      rating: 4.8,
      reviews: 127,
      harvestDate: '2024-06-25',
      description: 'Fresh organic tomatoes grown without pesticides using traditional farming methods',
      carbonFootprint: 'Low',
      nutritionScore: 'A+',
      badges: ['Best Seller', 'Eco-Friendly']
    },
    {
      id: 2,
      name: 'Sweet Rainbow Carrots',
      farmer: {
        name: 'Saman Silva',
        avatar: 'SS',
        farm: "Saman's Fresh Vegetables",
        location: 'Matale',
        phone: '+94 76 987 6543',
        verified: true,
        rating: 4.6,
        sustainabilityScore: 88
      },
      price: 250,
      originalPrice: 280,
      unit: 'kg',
      quantity: 1,
      image: '🥕',
      isOrganic: true,
      stockLevel: 28,
      deliveryMethods: ['delivery', 'pickup'],
      estimatedDelivery: '1-2 days',
      tags: ['Organic', 'Sweet', 'Colorful'],
      discount: 11,
      rating: 4.6,
      reviews: 89,
      harvestDate: '2024-06-24',
      description: 'Sweet and crunchy rainbow carrots perfect for cooking and salads',
      carbonFootprint: 'Low',
      nutritionScore: 'A',
      badges: ['Rainbow Variety', 'Sweet Taste']
    },
    {
      id: 3,
      name: 'Premium Green Beans',
      farmer: {
        name: 'Nimal Gunasekara',
        avatar: 'NG',
        farm: "Nimal's Highland Farm",
        location: 'Nuwara Eliya',
        phone: '+94 71 444 5566',
        verified: true,
        rating: 4.9,
        sustainabilityScore: 93
      },
      price: 400,
      originalPrice: 450,
      unit: 'kg',
      quantity: 1,
      image: '🫘',
      isOrganic: true,
      stockLevel: 15,
      deliveryMethods: ['pickup'],
      estimatedDelivery: '2-3 days',
      tags: ['Organic', 'Premium', 'High-altitude'],
      discount: 11,
      rating: 4.9,
      reviews: 78,
      harvestDate: '2024-06-25',
      description: 'Tender green beans rich in nutrients, perfect for healthy meals',
      carbonFootprint: 'Medium',
      nutritionScore: 'A+',
      badges: ['Premium Quality', 'Highland Grown']
    }
  ]);

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

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setShowRemoveConfirm(itemId);
      return;
    }
    
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: Math.min(newQuantity, item.stockLevel) } : item
    ));
  };

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    setShowRemoveConfirm(null);
  };

  const addToFavorites = (item) => {
    console.log('Add to favorites:', item.name);
  };

  const contactFarmer = (farmer) => {
    console.log('Contact farmer:', farmer.name);
  };

  const applyCoupon = () => {
    if (couponCode === 'FRESH10') {
      setAppliedCoupon({
        code: 'FRESH10',
        discount: 0.1,
        description: '10% off fresh vegetables'
      });
    } else if (couponCode === 'FIRSTBUY') {
      setAppliedCoupon({
        code: 'FIRSTBUY',
        discount: 50,
        description: 'Rs. 50 off first purchase',
        type: 'fixed'
      });
    } else if (couponCode === 'ORGANIC15') {
      setAppliedCoupon({
        code: 'ORGANIC15',
        discount: 0.15,
        description: '15% off organic products'
      });
    } else {
      alert('Invalid coupon code');
    }
    setCouponCode('');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const productSavings = originalTotal - subtotal;
  const deliveryFee = selectedDeliveryMethod === 'delivery' ? 150 : 0;
  const discount = appliedCoupon ? 
    (appliedCoupon.type === 'fixed' ? appliedCoupon.discount : subtotal * appliedCoupon.discount) : 0;
  const total = subtotal + deliveryFee - discount;

  // Group items by farmer
  const itemsByFarmer = cartItems.reduce((groups, item) => {
    const farmerId = item.farmer.name;
    if (!groups[farmerId]) {
      groups[farmerId] = {
        farmer: item.farmer,
        items: []
      };
    }
    groups[farmerId].items.push(item);
    return groups;
  }, {});

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Enhanced margin calculation - same as marketplace
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
      {/* Enhanced Sidebar - Single Component */}
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={screenSize.isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="customer"
      />

      <div className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 ${getMainContentMargin()}`}>
        {/* Enhanced Header - Responsive */}
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
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {screenSize.isMobile ? '🛒 Cart' : '🛒 Shopping Cart'}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    {screenSize.isMobile ? (
                      `${totalItems} items`
                    ) : (
                      <>
                        {totalItems} {totalItems === 1 ? 'item' : 'items'} from {Object.keys(itemsByFarmer).length} {Object.keys(itemsByFarmer).length === 1 ? 'farmer' : 'farmers'}
                        {productSavings > 0 && (
                          <span className="ml-2 text-emerald-600 font-medium">
                            • You're saving Rs. {productSavings.toLocaleString()}!
                          </span>
                        )}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              {!screenSize.isMobile && (
                <button 
                  onClick={() => window.history.back()}
                  className="hidden md:flex items-center bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </button>
              )}
              
              {screenSize.isDesktop && (
                <div className="flex items-center bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5">
                  <Shield className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-700 font-medium">Secure Checkout</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {cartItems.length === 0 ? (
              /* Empty Cart */
              <div className="text-center py-16">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  {screenSize.isMobile 
                    ? "Add fresh products to start shopping"
                    : "Add some fresh products from local farmers to get started on your healthy journey."
                  }
                </p>
                <div className={`flex items-center justify-center ${
                  screenSize.isMobile ? 'flex-col space-y-3' : 'flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4'
                }`}>
                  <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>{screenSize.isMobile ? 'Browse Store' : 'Browse Marketplace'}</span>
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2">
                    <Heart className="w-5 h-5" />
                    <span>View Favorites</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className={`grid gap-8 ${
                screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'
              }`}>
                {/* Cart Items */}
                <div className={screenSize.isMobile ? 'order-2' : 'lg:col-span-2'}>
                  <div className="space-y-6">
                    {/* Summary Stats - Enhanced for Mobile */}
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 lg:p-6 rounded-2xl">
                      <div className={`grid gap-4 ${
                        screenSize.isMobile ? 'grid-cols-2' : 'grid-cols-3'
                      }`}>
                        <div className="text-center">
                          <div className="text-xl lg:text-2xl font-bold">{totalItems}</div>
                          <div className="text-emerald-100 text-xs lg:text-sm">Items</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl lg:text-2xl font-bold">{Object.keys(itemsByFarmer).length}</div>
                          <div className="text-emerald-100 text-xs lg:text-sm">Farmers</div>
                        </div>
                        {!screenSize.isMobile && (
                          <div className="text-center">
                            <div className="text-xl lg:text-2xl font-bold">Rs. {subtotal.toLocaleString()}</div>
                            <div className="text-emerald-100 text-xs lg:text-sm">Subtotal</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {Object.entries(itemsByFarmer).map(([farmerId, group]) => (
                      <div key={farmerId} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                        {/* Enhanced Farmer Header - Mobile Optimized */}
                        <div className="p-4 lg:p-6 bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-emerald-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 lg:space-x-4">
                              <div className="w-10 lg:w-12 h-10 lg:h-12 bg-emerald-100 rounded-full flex items-center justify-center relative">
                                <span className="text-xs lg:text-sm font-bold text-emerald-700">{group.farmer.avatar}</span>
                                {group.farmer.verified && (
                                  <div className="absolute -top-1 -right-1 w-4 lg:w-5 h-4 lg:h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Shield className="w-2 lg:w-3 h-2 lg:h-3 text-white" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2 lg:space-x-3">
                                  <h3 className="font-bold text-sm lg:text-base text-gray-900">{group.farmer.name}</h3>
                                  {!screenSize.isMobile && (
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                      <span className="text-sm font-medium text-gray-700">{group.farmer.rating}</span>
                                    </div>
                                  )}
                                </div>
                                <div className={`flex items-center text-xs lg:text-sm text-gray-600 ${
                                  screenSize.isMobile ? 'flex-col items-start space-y-1' : 'space-x-4'
                                }`}>
                                  <span>{group.farmer.farm}</span>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{group.farmer.location}</span>
                                  </div>
                                  {!screenSize.isMobile && (
                                    <div className="flex items-center space-x-1">
                                      <Leaf className="w-3 h-3 text-green-500" />
                                      <span className="text-green-600">Sustainability: {group.farmer.sustainabilityScore}%</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-1 lg:space-x-2">
                              <button
                                onClick={() => contactFarmer(group.farmer)}
                                className={`flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 bg-white border border-emerald-200 rounded-xl text-emerald-700 hover:bg-emerald-50 transition-colors text-xs lg:text-sm font-medium ${
                                  screenSize.isMobile ? 'px-2' : ''
                                }`}
                              >
                                <Phone className="w-3 lg:w-4 h-3 lg:h-4" />
                                {!screenSize.isMobile && <span>Contact</span>}
                              </button>
                              {!screenSize.isMobile && (
                                <button className="p-2 bg-white border border-emerald-200 rounded-xl text-emerald-700 hover:bg-emerald-50 transition-colors">
                                  <MessageCircle className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Items from this farmer - Mobile Optimized */}
                        <div className="divide-y divide-gray-100">
                          {group.items.map((item) => (
                            <div key={item.id} className="p-4 lg:p-6">
                              <div className={`flex space-x-4 lg:space-x-6 ${
                                screenSize.isMobile ? 'flex-col space-x-0 space-y-4' : 'items-center'
                              }`}>
                                {/* Enhanced Product Image */}
                                <div className="relative w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-2xl lg:text-3xl flex-shrink-0 mx-auto">
                                  {item.image}
                                  {item.discount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                                      -{item.discount}%
                                    </span>
                                  )}
                                </div>
                                
                                {/* Enhanced Product Details - Mobile Layout */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                      <h4 className="font-bold text-base lg:text-lg text-gray-900 mb-2">{item.name}</h4>
                                      <div className={`flex items-center mb-2 ${
                                        screenSize.isMobile ? 'flex-col items-start space-y-2' : 'space-x-4'
                                      }`}>
                                        <div className="flex items-center space-x-2">
                                          <span className="text-lg lg:text-xl font-bold text-emerald-600">Rs. {item.price}</span>
                                          {item.originalPrice > item.price && (
                                            <span className="text-sm text-gray-500 line-through">Rs. {item.originalPrice}</span>
                                          )}
                                          <span className="text-sm text-gray-600">per {item.unit}</span>
                                        </div>
                                        {!screenSize.isMobile && (
                                          <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium">{item.rating}</span>
                                            <span className="text-sm text-gray-500">({item.reviews})</span>
                                          </div>
                                        )}
                                      </div>
                                      
                                      {/* Enhanced Tags - Mobile Optimized */}
                                      <div className="flex flex-wrap gap-2 mb-3">
                                        {item.isOrganic && (
                                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <Leaf className="w-3 h-3 mr-1" />
                                            Organic
                                          </span>
                                        )}
                                        {item.badges.slice(0, screenSize.isMobile ? 1 : 2).map((badge, index) => (
                                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            <Award className="w-3 h-3 mr-1" />
                                            {badge}
                                          </span>
                                        ))}
                                      </div>

                                      {!screenSize.isMobile && (
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                                      )}
                                    </div>
                                    
                                    <div className="flex items-center space-x-2 ml-4">
                                      <button
                                        onClick={() => addToFavorites(item)}
                                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                                      >
                                        <Heart className="w-4 lg:w-5 h-4 lg:h-5" />
                                      </button>
                                      <button
                                        onClick={() => setShowRemoveConfirm(item.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                                      >
                                        <Trash2 className="w-4 lg:w-5 h-4 lg:h-5" />
                                      </button>
                                    </div>
                                  </div>
                                  
                                  {/* Enhanced Quantity & Price - Mobile Layout */}
                                  <div className={`flex items-center justify-between ${
                                    screenSize.isMobile ? 'flex-col space-y-4' : ''
                                  }`}>
                                    <div className={`flex items-center ${
                                      screenSize.isMobile ? 'justify-between w-full' : 'space-x-4'
                                    }`}>
                                      <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white">
                                        <button
                                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                          className="p-2 lg:p-3 hover:bg-gray-100 transition-colors rounded-l-xl"
                                        >
                                          <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="px-4 lg:px-6 py-2 lg:py-3 font-bold text-lg">{item.quantity}</span>
                                        <button
                                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                          disabled={item.quantity >= item.stockLevel}
                                          className="p-2 lg:p-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-r-xl"
                                        >
                                          <Plus className="w-4 h-4" />
                                        </button>
                                      </div>
                                      {!screenSize.isMobile && (
                                        <div className="text-sm text-gray-500">
                                          <div>{item.stockLevel} {item.unit} available</div>
                                          <div className="flex items-center space-x-1">
                                            <Truck className="w-3 h-3" />
                                            <span>{item.estimatedDelivery}</span>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    
                                    <div className={`text-right ${screenSize.isMobile ? 'w-full' : ''}`}>
                                      <div className="text-xl lg:text-2xl font-bold text-gray-900">
                                        Rs. {(item.price * item.quantity).toLocaleString()}
                                      </div>
                                      {item.originalPrice > item.price && (
                                        <div className="text-sm text-gray-500">
                                          Save Rs. {((item.originalPrice - item.price) * item.quantity).toLocaleString()}
                                        </div>
                                      )}
                                      <div className="text-sm text-gray-500">
                                        {item.quantity} {item.unit} × Rs. {item.price}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* Recommended Products - Hide on Mobile */}
                    {!screenSize.isMobile && (
                      <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">You might also like</h3>
                        <div className={`grid gap-4 ${
                          screenSize.isTablet ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'
                        }`}>
                          {[
                            { name: 'Fresh Spinach', price: 120, image: '🥬', farmer: 'Local Farm' },
                            { name: 'Red Onions', price: 200, image: '🧅', farmer: 'Valley Farm' },
                            { name: 'Bell Peppers', price: 350, image: '🫑', farmer: 'Green Valley' },
                            { name: 'Fresh Mint', price: 80, image: '🌿', farmer: 'Herb Garden' }
                          ].map((product, index) => (
                            <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                              <div className="text-3xl text-center mb-2">{product.image}</div>
                              <div className="text-sm font-medium text-gray-900 text-center">{product.name}</div>
                              <div className="text-sm text-gray-600 text-center">{product.farmer}</div>
                              <div className="text-emerald-600 font-bold text-center mt-1">Rs. {product.price}</div>
                              <button className="w-full mt-2 bg-emerald-600 text-white py-1 px-2 rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors">
                                Add
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Order Summary - Mobile First */}
                <div className={screenSize.isMobile ? 'order-1' : 'lg:col-span-1'}>
                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm sticky top-6">
                    {/* Summary Header */}
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 lg:p-6 border-b border-emerald-100">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <Calculator className="w-4 lg:w-5 h-4 lg:h-5" />
                        <span>Order Summary</span>
                      </h3>
                    </div>
                    
                    <div className="p-4 lg:p-6">
                      {/* Delivery Method */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                          <Truck className="w-4 h-4" />
                          <span>Delivery Method</span>
                        </h4>
                        <div className="space-y-3">
                          <label className="flex items-center p-3 lg:p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name="delivery"
                              value="delivery"
                              checked={selectedDeliveryMethod === 'delivery'}
                              onChange={(e) => setSelectedDeliveryMethod(e.target.value)}
                              className="w-4 h-4 text-emerald-600"
                            />
                            <div className="ml-3 flex-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Truck className="w-4 h-4 text-emerald-600" />
                                  <span className="font-medium text-gray-900 text-sm lg:text-base">Home Delivery</span>
                                </div>
                                <span className="text-sm text-gray-600">Rs. 150</span>
                              </div>
                              <div className="text-xs lg:text-sm text-gray-600 mt-1">Delivery within 2-3 days</div>
                            </div>
                          </label>
                          
                          <label className="flex items-center p-3 lg:p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                            <input
                              type="radio"
                              name="delivery"
                              value="pickup"
                              checked={selectedDeliveryMethod === 'pickup'}
                              onChange={(e) => setSelectedDeliveryMethod(e.target.value)}
                              className="w-4 h-4 text-emerald-600"
                            />
                            <div className="ml-3 flex-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4 text-emerald-600" />
                                  <span className="font-medium text-gray-900 text-sm lg:text-base">Farm Pickup</span>
                                </div>
                                <span className="text-sm text-emerald-600 font-medium">Free</span>
                              </div>
                              <div className="text-xs lg:text-sm text-gray-600 mt-1">Pickup from farm locations</div>
                            </div>
                          </label>
                        </div>
                      </div>

                      {/* Enhanced Coupon Code */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                          <Tag className="w-4 h-4" />
                          <span>Promo Code</span>
                        </h4>
                        {appliedCoupon ? (
                          <div className="flex items-center justify-between p-3 lg:p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <Tag className="w-4 lg:w-5 h-4 lg:h-5 text-green-600" />
                              <div>
                                <div className="font-bold text-green-900 text-sm lg:text-base">{appliedCoupon.code}</div>
                                <div className="text-xs lg:text-sm text-green-700">{appliedCoupon.description}</div>
                              </div>
                            </div>
                            <button
                              onClick={removeCoupon}
                              className="text-green-600 hover:text-green-700 p-1"
                            >
                              <X className="w-4 lg:w-5 h-4 lg:h-5" />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                placeholder="Enter coupon code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="flex-1 border-2 border-gray-200 rounded-xl px-3 lg:px-4 py-2 lg:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              />
                              <button
                                onClick={applyCoupon}
                                disabled={!couponCode}
                                className="px-4 lg:px-6 py-2 lg:py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Apply
                              </button>
                            </div>
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                              <div className="text-xs text-blue-700 font-medium mb-1">Available Codes:</div>
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => setCouponCode('FRESH10')}
                                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium hover:bg-blue-200"
                                >
                                  FRESH10
                                </button>
                                <button
                                  onClick={() => setCouponCode('FIRSTBUY')}
                                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium hover:bg-blue-200"
                                >
                                  FIRSTBUY
                                </button>
                                <button
                                  onClick={() => setCouponCode('ORGANIC15')}
                                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium hover:bg-blue-200"
                                >
                                  ORGANIC15
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Enhanced Price Breakdown */}
                      <div className="space-y-4 border-t border-gray-200 pt-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                          <span className="font-medium text-gray-900">Rs. {subtotal.toLocaleString()}</span>
                        </div>
                        
                        {productSavings > 0 && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-green-600">Product Discounts</span>
                            <span className="font-medium text-green-600">-Rs. {productSavings.toLocaleString()}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Delivery Fee</span>
                          <span className="font-medium text-gray-900">
                            {deliveryFee === 0 ? (
                              <span className="text-green-600 font-semibold">Free</span>
                            ) : (
                              `Rs. ${deliveryFee}`
                            )}
                          </span>
                        </div>
                        
                        {appliedCoupon && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-green-600">Coupon Discount ({appliedCoupon.code})</span>
                            <span className="font-medium text-green-600">
                              -Rs. {Math.round(discount).toLocaleString()}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-lg lg:text-xl font-bold text-gray-900 border-t border-gray-200 pt-4">
                          <span>Total</span>
                          <span className="text-emerald-600">Rs. {total.toLocaleString()}</span>
                        </div>

                        {(productSavings + discount) > 0 && (
                          <div className="text-center p-3 bg-green-50 rounded-xl">
                            <div className="text-sm text-green-800">
                              🎉 You're saving <span className="font-bold">Rs. {Math.round(productSavings + discount).toLocaleString()}</span> on this order!
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Enhanced Checkout Button */}
                      <button
                        onClick={() => setShowCheckout(true)}
                        className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 lg:py-4 px-6 rounded-xl font-bold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg shadow-emerald-500/25"
                      >
                        <CreditCard className="w-4 lg:w-5 h-4 lg:h-5" />
                        <span>{screenSize.isMobile ? 'Checkout' : 'Proceed to Checkout'}</span>
                        <ArrowRight className="w-4 lg:w-5 h-4 lg:h-5" />
                      </button>

                      {/* Security & Trust Info */}
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                          <Shield className="w-4 h-4" />
                          <span>{screenSize.isMobile ? 'SSL encrypted' : '256-bit SSL encrypted checkout'}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Fresh guarantee</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RefreshCw className="w-3 h-3 text-blue-500" />
                            <span>Easy returns</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3 text-red-500" />
                            <span>Local farmers</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Remove Confirmation Modal */}
        {showRemoveConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Remove Item?</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to remove this item from your cart?</p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowRemoveConfirm(null)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => removeItem(showRemoveConfirm)}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerCartPage;