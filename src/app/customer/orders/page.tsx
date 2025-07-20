"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Package,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  MapPin,
  Phone,
  Star,
  Eye,
  RefreshCw,
  Calendar,
  ShoppingCart,
  User,
  MessageCircle,
  Download,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Plus,
  Heart,
  Share2,
  Grid3X3,
  List,
  SlidersHorizontal,
  TrendingUp,
  ThumbsUp,
  Timer,
  Shield,
  Leaf,
  Award,
  Receipt,
  CreditCard,
  Navigation,
  Route,
  Zap,
  Target,
  Info,
  ExternalLink,
  Copy,
  Bell,
  FileText,
  ArrowRight,
  Sparkles,
  CheckSquare,
  X,
  Menu
} from 'lucide-react';

const CustomerOrdersPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Enhanced responsive detection - same as marketplace
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  // Enhanced responsive detection
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

  // Enhanced orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-001',
      orderNumber: '#FF001',
      date: '2024-06-25',
      farmer: {
        name: 'Ravi Mahathaya',
        avatar: 'RM',
        farm: "Ravi's Organic Farm",
        location: 'Kurunegala',
        phone: '+94 77 123 4567',
        rating: 4.8,
        verified: true,
        sustainabilityScore: 95
      },
      items: [
        { 
          name: 'Premium Organic Tomatoes', 
          quantity: 3, 
          unit: 'kg', 
          price: 300, 
          image: '🍅',
          isOrganic: true,
          tags: ['Organic', 'Fresh', 'Local']
        },
        { 
          name: 'Sweet Rainbow Carrots', 
          quantity: 2, 
          unit: 'kg', 
          price: 250, 
          image: '🥕',
          isOrganic: true,
          tags: ['Organic', 'Sweet']
        }
      ],
      subtotal: 1400,
      deliveryFee: 150,
      discount: 0,
      total: 1550,
      status: 'delivered',
      priority: 'standard',
      deliveryMethod: 'home_delivery',
      deliveryAddress: {
        street: 'No. 45, Galle Road',
        city: 'Colombo 03',
        district: 'Colombo',
        postalCode: '00300'
      },
      estimatedDelivery: '2024-06-26',
      actualDelivery: '2024-06-26T14:15:00',
      trackingSteps: [
        { 
          status: 'confirmed', 
          label: 'Order Confirmed', 
          time: '2024-06-25T14:30:00', 
          completed: true,
          description: 'Your order has been confirmed and sent to the farmer'
        },
        { 
          status: 'preparing', 
          label: 'Preparing Order', 
          time: '2024-06-25T16:00:00', 
          completed: true,
          description: 'Farmer is preparing your fresh produce'
        },
        { 
          status: 'ready', 
          label: 'Ready for Pickup', 
          time: '2024-06-26T08:00:00', 
          completed: true,
          description: 'Order is ready and packed for delivery'
        },
        { 
          status: 'shipped', 
          label: 'Out for Delivery', 
          time: '2024-06-26T10:30:00', 
          completed: true,
          description: 'Order is on the way to your address'
        },
        { 
          status: 'delivered', 
          label: 'Delivered', 
          time: '2024-06-26T14:15:00', 
          completed: true,
          description: 'Order delivered successfully'
        }
      ],
      paymentMethod: 'card',
      paymentStatus: 'paid',
      transactionId: 'TXN123456789',
      canReview: true,
      canReorder: true,
      hasReviewed: false,
      deliveryRating: null,
      orderRating: 5,
      notes: 'Please deliver to the back entrance',
      estimatedTime: '45 minutes'
    },
    {
      id: 'ORD-2024-002',
      orderNumber: '#FF002',
      date: '2024-06-26',
      farmer: {
        name: 'Saman Silva',
        avatar: 'SS',
        farm: "Saman's Fresh Vegetables",
        location: 'Matale',
        phone: '+94 76 987 6543',
        rating: 4.6,
        verified: true,
        sustainabilityScore: 88
      },
      items: [
        { 
          name: 'Premium Green Beans', 
          quantity: 1, 
          unit: 'kg', 
          price: 400, 
          image: '🫘',
          isOrganic: true,
          tags: ['Organic', 'Premium']
        },
        { 
          name: 'Crispy Green Cabbage', 
          quantity: 2, 
          unit: 'kg', 
          price: 180, 
          image: '🥬',
          isOrganic: false,
          tags: ['Fresh', 'Local']
        }
      ],
      subtotal: 760,
      deliveryFee: 0,
      discount: 50,
      total: 710,
      status: 'processing',
      priority: 'urgent',
      deliveryMethod: 'pickup',
      pickupLocation: {
        name: 'Matale Central Market',
        address: 'Main Street, Matale',
        phone: '+94 76 987 6543',
        hours: '6:00 AM - 6:00 PM'
      },
      estimatedReady: '2024-06-27T09:00:00',
      trackingSteps: [
        { 
          status: 'confirmed', 
          label: 'Order Confirmed', 
          time: '2024-06-26T15:45:00', 
          completed: true,
          description: 'Order confirmed and farmer notified'
        },
        { 
          status: 'preparing', 
          label: 'Preparing Order', 
          time: '2024-06-26T16:30:00', 
          completed: true,
          description: 'Farmer is selecting the best produce for you'
        },
        { 
          status: 'ready', 
          label: 'Ready for Pickup', 
          time: '', 
          completed: false,
          description: 'Order will be ready for pickup tomorrow morning'
        },
      ],
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      transactionId: null,
      canReview: false,
      canReorder: true,
      hasReviewed: false,
      appliedCoupon: 'FIRSTBUY',
      estimatedTime: '2 hours'
    },
    {
      id: 'ORD-2024-003',
      orderNumber: '#FF003',
      date: '2024-06-27',
      farmer: {
        name: 'Kamala Jayawardena',
        avatar: 'KJ',
        farm: "Kamala's Organic Garden",
        location: 'Kandy',
        phone: '+94 71 555 0123',
        rating: 4.7,
        verified: true,
        sustainabilityScore: 82
      },
      items: [
        { 
          name: 'Red Onions', 
          quantity: 2, 
          unit: 'kg', 
          price: 220, 
          image: '🧅',
          isOrganic: false,
          tags: ['Fresh', 'Local']
        },
        { 
          name: 'Green Chili', 
          quantity: 0.5, 
          unit: 'kg', 
          price: 600, 
          image: '🌶️',
          isOrganic: true,
          tags: ['Organic', 'Spicy']
        }
      ],
      subtotal: 740,
      deliveryFee: 150,
      discount: 0,
      total: 890,
      status: 'cancelled',
      priority: 'standard',
      deliveryMethod: 'home_delivery',
      deliveryAddress: {
        street: 'No. 12, Kandy Road',
        city: 'Peradeniya',
        district: 'Kandy',
        postalCode: '20400'
      },
      cancelReason: 'Out of stock - Red Onions not available',
      cancelDate: '2024-06-27T11:30:00',
      refundStatus: 'processed',
      refundAmount: 890,
      trackingSteps: [
        { 
          status: 'confirmed', 
          label: 'Order Confirmed', 
          time: '2024-06-27T09:15:00', 
          completed: true,
          description: 'Order placed successfully'
        },
        { 
          status: 'cancelled', 
          label: 'Order Cancelled', 
          time: '2024-06-27T11:30:00', 
          completed: true,
          description: 'Order cancelled due to stock unavailability'
        }
      ],
      paymentMethod: 'card',
      paymentStatus: 'refunded',
      transactionId: 'TXN987654321',
      canReview: false,
      canReorder: true,
      refundTransactionId: 'REF123456789'
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'processing': return Clock;
      case 'shipped': return Truck;
      case 'cancelled': return XCircle;
      case 'pending': return AlertTriangle;
      default: return Package;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'standard': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filterOptions = [
    { id: 'all', label: 'All Orders', count: orders.length, icon: Package },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length, icon: CheckCircle },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length, icon: Clock },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length, icon: XCircle }
  ];

  const sortOptions = [
    { id: 'recent', name: 'Most Recent', icon: Clock },
    { id: 'oldest', name: 'Oldest First', icon: Calendar },
    { id: 'amount-high', name: 'Amount: High to Low', icon: TrendingUp },
    { id: 'amount-low', name: 'Amount: Low to High', icon: TrendingUp },
    { id: 'status', name: 'By Status', icon: Filter }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesFilter = activeFilter === 'all' || order.status === activeFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent': return new Date(b.date) - new Date(a.date);
      case 'oldest': return new Date(a.date) - new Date(b.date);
      case 'amount-high': return b.total - a.total;
      case 'amount-low': return a.total - b.total;
      default: return 0;
    }
  });

  const toggleOrderExpanded = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleReorder = (order) => {
    console.log('Reorder:', order.id);
  };

  const handleContactFarmer = (farmer) => {
    console.log('Contact farmer:', farmer.name);
  };

  const handleTrackOrder = (order) => {
    console.log('Track order:', order.id);
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return new Date(timeString).toLocaleString();
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* SINGLE Sidebar Component - Enhanced Responsive */}
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
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {/* Mobile menu button - only show on mobile */}
                {screenSize.isMobile && (
                  <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 mr-4 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                )}
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    {screenSize.isMobile ? '🛍️ Orders' : '🛍️ My Orders'}
                  </h1>
                  <p className="text-gray-600 hidden sm:block">
                    {screenSize.isMobile 
                      ? 'Track your orders' 
                      : 'Track and manage your orders from local farmers'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Enhanced Search */}
                <div className={`flex items-center bg-gray-100 rounded-xl px-4 py-3 ${
                  screenSize.isMobile ? 'w-48' : 'w-full max-w-md'
                }`}>
                  <Search className="w-5 h-5 text-gray-500 mr-3" />
                  <input 
                    type="text" 
                    placeholder={screenSize.isMobile ? "Search..." : "Search orders..."}
                    className="bg-transparent text-sm outline-none flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-2 p-1 hover:bg-gray-200 rounded-full"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
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
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                        }`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Filter Tabs - Responsive */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-3 overflow-x-auto">
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
                    activeFilter === filter.id
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <filter.icon className="w-3 lg:w-4 h-3 lg:h-4" />
                  <span>{screenSize.isMobile ? filter.label.split(' ')[0] : filter.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    activeFilter === filter.id 
                      ? 'bg-emerald-200 text-emerald-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="bg-white border-b border-gray-200 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Sort Orders</h4>
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
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Date Range</h4>
                  <input 
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Amount Range</h4>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
                    <option>All amounts</option>
                    <option>Under Rs. 500</option>
                    <option>Rs. 500 - Rs. 1000</option>
                    <option>Over Rs. 1000</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Orders Display - Enhanced Responsive */}
            {(viewMode === 'list' || screenSize.isMobile) ? (
              <div className="space-y-4 lg:space-y-6">
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  const isExpanded = expandedOrder === order.id;
                  
                  return (
                    <div key={order.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                      {/* Order Header */}
                      <div className="p-4 lg:p-6">
                        <div className="flex items-center justify-between mb-4 lg:mb-6">
                          <div className="flex items-center space-x-3 lg:space-x-4">
                            <div className={`w-12 lg:w-14 h-12 lg:h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center shadow-sm`}>
                              <StatusIcon className="w-6 lg:w-7 h-6 lg:h-7 text-emerald-600" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 lg:space-x-3 mb-2">
                                <h3 className="font-bold text-lg lg:text-xl text-gray-900">{order.orderNumber}</h3>
                                <span className={`inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-semibold border ${getStatusColor(order.status)}`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                                {order.priority === 'urgent' && (
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(order.priority)}`}>
                                    🔥 {screenSize.isMobile ? '' : 'Urgent'}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 lg:space-x-4 text-xs lg:text-sm text-gray-600">
                                <span>{screenSize.isMobile ? new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : `Ordered on ${new Date(order.date).toLocaleDateString()}`}</span>
                                <span>•</span>
                                <span className="flex items-center space-x-1">
                                  <Timer className="w-3 lg:w-4 h-3 lg:h-4" />
                                  <span>{order.estimatedTime}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 lg:space-x-3">
                            <div className="text-right">
                              <div className="text-lg lg:text-2xl font-bold text-gray-900">Rs. {order.total.toLocaleString()}</div>
                              <div className="text-xs lg:text-sm text-gray-600">{order.items.length} items</div>
                            </div>
                            {!screenSize.isMobile && (
                              <button
                                onClick={() => toggleOrderExpanded(order.id)}
                                className="p-3 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200"
                              >
                                {isExpanded ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Quick Order Info - Responsive Grid */}
                        <div className={`grid gap-4 lg:gap-6 mb-4 lg:mb-6 ${
                          screenSize.isMobile ? 'grid-cols-1' : 
                          screenSize.isTablet ? 'grid-cols-2' : 
                          'grid-cols-3'
                        }`}>
                          {/* Farmer Info */}
                          <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                            <div className="w-10 lg:w-12 h-10 lg:h-12 bg-emerald-100 rounded-full flex items-center justify-center relative">
                              <span className="text-xs lg:text-sm font-bold text-emerald-700">{order.farmer.avatar}</span>
                              {order.farmer.verified && (
                                <div className="absolute -top-1 -right-1 w-3 lg:w-4 h-3 lg:h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                  <Shield className="w-2 lg:w-2.5 h-2 lg:h-2.5 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-900 truncate text-sm lg:text-base">{order.farmer.name}</div>
                              <div className="text-xs lg:text-sm text-gray-600 truncate">{order.farmer.farm}</div>
                              <div className="flex items-center space-x-1 text-xs lg:text-sm text-gray-500">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span>{order.farmer.rating}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Payment Info */}
                          <div className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                            <CreditCard className="w-6 lg:w-8 h-6 lg:h-8 text-blue-600" />
                            <div>
                              <div className="font-semibold text-gray-900 capitalize text-sm lg:text-base">{order.paymentMethod}</div>
                              <div className="text-xs lg:text-sm text-gray-600 capitalize">{order.paymentStatus}</div>
                              {order.transactionId && !screenSize.isMobile && (
                                <div className="text-xs text-gray-500">ID: {order.transactionId}</div>
                              )}
                            </div>
                          </div>
                          
                          {/* Delivery Info */}
                          <div className={`flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl ${
                            screenSize.isMobile ? 'col-span-1' : 
                            screenSize.isTablet ? 'col-span-2' : 
                            'col-span-1'
                          }`}>
                            {order.deliveryMethod === 'home_delivery' ? (
                              <Truck className="w-6 lg:w-8 h-6 lg:h-8 text-purple-600" />
                            ) : (
                              <MapPin className="w-6 lg:w-8 h-6 lg:h-8 text-purple-600" />
                            )}
                            <div>
                              <div className="font-semibold text-gray-900 text-sm lg:text-base">
                                {order.deliveryMethod === 'home_delivery' ? (screenSize.isMobile ? 'Delivery' : 'Home Delivery') : (screenSize.isMobile ? 'Pickup' : 'Farm Pickup')}
                              </div>
                              <div className="text-xs lg:text-sm text-gray-600">
                                {order.actualDelivery 
                                  ? `Delivered: ${new Date(order.actualDelivery).toLocaleDateString()}`
                                  : order.estimatedDelivery
                                    ? `Expected: ${new Date(order.estimatedDelivery).toLocaleDateString()}`
                                    : 'Pickup ready'
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons - Responsive */}
                        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                          <button 
                            onClick={() => openOrderDetails(order)}
                            className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 hover:bg-emerald-100 transition-colors text-xs lg:text-sm font-medium"
                          >
                            <Eye className="w-3 lg:w-4 h-3 lg:h-4" />
                            <span>{screenSize.isMobile ? 'Details' : 'View Details'}</span>
                          </button>

                          {order.status !== 'cancelled' && (
                            <button 
                              onClick={() => handleTrackOrder(order)}
                              className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 hover:bg-blue-100 transition-colors text-xs lg:text-sm font-medium"
                            >
                              <Navigation className="w-3 lg:w-4 h-3 lg:h-4" />
                              <span>Track</span>
                            </button>
                          )}
                          
                          {order.status === 'delivered' && order.canReview && !order.hasReviewed && (
                            <button className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 hover:bg-yellow-100 transition-colors text-xs lg:text-sm font-medium">
                              <Star className="w-3 lg:w-4 h-3 lg:h-4" />
                              <span>Review</span>
                            </button>
                          )}
                          
                          {order.canReorder && (
                            <button 
                              onClick={() => handleReorder(order)}
                              className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors text-xs lg:text-sm font-medium"
                            >
                              <RefreshCw className="w-3 lg:w-4 h-3 lg:h-4" />
                              <span>Reorder</span>
                            </button>
                          )}
                          
                          <button 
                            onClick={() => handleContactFarmer(order.farmer)}
                            className="flex items-center space-x-2 px-3 lg:px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors text-xs lg:text-sm font-medium"
                          >
                            <MessageCircle className="w-3 lg:w-4 h-3 lg:h-4" />
                            <span>Contact</span>
                          </button>
                        </div>
                      </div>

                      {/* Expanded Order Details - Hidden on mobile */}
                      {isExpanded && !screenSize.isMobile && (
                        <div className="border-t border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
                          <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              {/* Order Items */}
                              <div>
                                <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                                  <Package className="w-5 h-5 mr-2 text-emerald-600" />
                                  Order Items
                                </h4>
                                <div className="space-y-4">
                                  {order.items.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                      <div className="flex items-center space-x-4">
                                        <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                                          {item.image}
                                        </div>
                                        <div>
                                          <div className="font-semibold text-gray-900">{item.name}</div>
                                          <div className="text-sm text-gray-600">{item.quantity} {item.unit} × Rs. {item.price}</div>
                                          <div className="flex flex-wrap gap-1 mt-1">
                                            {item.tags.map((tag, tagIndex) => (
                                              <span key={tagIndex} className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                                tag === 'Organic' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                              }`}>
                                                {tag}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="font-bold text-lg text-gray-900">
                                          Rs. {(item.quantity * item.price).toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Order Summary */}
                                <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
                                  <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Subtotal</span>
                                      <span className="font-medium">Rs. {order.subtotal.toLocaleString()}</span>
                                    </div>
                                    {order.deliveryFee > 0 && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Delivery Fee</span>
                                        <span className="font-medium">Rs. {order.deliveryFee.toLocaleString()}</span>
                                      </div>
                                    )}
                                    {order.discount > 0 && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-green-600">Discount</span>
                                        <span className="font-medium text-green-600">-Rs. {order.discount.toLocaleString()}</span>
                                      </div>
                                    )}
                                    <div className="border-t border-gray-200 pt-3">
                                      <div className="flex justify-between">
                                        <span className="font-bold text-lg">Total</span>
                                        <span className="font-bold text-xl text-emerald-600">Rs. {order.total.toLocaleString()}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Order Tracking */}
                              <div>
                                <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                                  <Route className="w-5 h-5 mr-2 text-emerald-600" />
                                  Order Tracking
                                </h4>
                                <div className="space-y-4">
                                  {order.trackingSteps.map((step, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                        step.completed 
                                          ? 'bg-emerald-500 border-emerald-500' 
                                          : 'bg-gray-200 border-gray-300'
                                      }`}>
                                        {step.completed ? (
                                          <CheckCircle className="w-5 h-5 text-white" />
                                        ) : (
                                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                        )}
                                      </div>
                                      <div className="flex-1 pb-4">
                                        <div className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                                          {step.label}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                          {step.description}
                                        </div>
                                        {step.time && (
                                          <div className="text-xs text-gray-500 mt-1">
                                            {formatTime(step.time)}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Delivery/Pickup Information */}
                                <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
                                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {order.deliveryMethod === 'home_delivery' ? 'Delivery Address' : 'Pickup Location'}
                                  </h5>
                                  {order.deliveryMethod === 'home_delivery' ? (
                                    <div className="text-sm text-gray-600">
                                      <div>{order.deliveryAddress.street}</div>
                                      <div>{order.deliveryAddress.city}, {order.deliveryAddress.district} {order.deliveryAddress.postalCode}</div>
                                    </div>
                                  ) : (
                                    <div className="text-sm text-gray-600">
                                      <div className="font-medium">{order.pickupLocation.name}</div>
                                      <div>{order.pickupLocation.address}</div>
                                      <div className="flex items-center space-x-4 mt-2">
                                        <span>📞 {order.pickupLocation.phone}</span>
                                        <span>🕒 {order.pickupLocation.hours}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Cancellation Info */}
                                {order.status === 'cancelled' && (
                                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <h5 className="font-semibold text-red-900 mb-2 flex items-center">
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Order Cancelled
                                    </h5>
                                    <p className="text-sm text-red-700 mb-2">
                                      <strong>Reason:</strong> {order.cancelReason}
                                    </p>
                                    <p className="text-sm text-red-600 mb-3">
                                      <strong>Cancelled on:</strong> {formatTime(order.cancelDate)}
                                    </p>
                                    {order.refundStatus === 'processed' && (
                                      <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Refund of Rs. {order.refundAmount.toLocaleString()} processed</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Grid View - Desktop only */
              <div className={`grid gap-6 ${
                screenSize.isTablet ? 'grid-cols-2' : 'grid-cols-3'
              }`}>
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  
                  return (
                    <div key={order.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                              <StatusIcon className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">{order.orderNumber}</h3>
                              <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="text-2xl font-bold text-gray-900 mb-1">Rs. {order.total.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">{order.items.length} items from {order.farmer.name}</div>
                        </div>

                        <div className="space-y-3">
                          <button 
                            onClick={() => openOrderDetails(order)}
                            className="w-full bg-emerald-600 text-white py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
                          >
                            View Details
                          </button>
                          
                          <div className="flex space-x-2">
                            {order.canReorder && (
                              <button 
                                onClick={() => handleReorder(order)}
                                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                              >
                                Reorder
                              </button>
                            )}
                            <button 
                              onClick={() => handleContactFarmer(order.farmer)}
                              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                            >
                              Contact
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
            {filteredOrders.length === 0 && (
              <div className="text-center py-16">
                <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Start shopping to see your orders here.'}
                </p>
                <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors">
                  Browse Marketplace
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Order Details Modal */}
        {showOrderDetails && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Order Details - {selectedOrder.orderNumber}</h2>
                <button 
                  onClick={() => setShowOrderDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal content with comprehensive order details */}
              <div className="space-y-6">
                {/* Order Status */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(selectedOrder.status)}`}>
                      {React.createElement(getStatusIcon(selectedOrder.status), { className: "w-6 h-6" })}
                    </div>
                    <div>
                      <div className="font-bold text-lg text-gray-900">{selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}</div>
                      <div className="text-sm text-gray-600">
                        {selectedOrder.status === 'delivered' && selectedOrder.actualDelivery
                          ? `Delivered on ${new Date(selectedOrder.actualDelivery).toLocaleDateString()}`
                          : selectedOrder.estimatedDelivery
                            ? `Expected by ${new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}`
                            : 'Status updated'
                        }
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">Rs. {selectedOrder.total.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{selectedOrder.items.length} items</div>
                  </div>
                </div>

                {/* Comprehensive order details would go here */}
                <div className="text-center py-8 text-gray-600">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p>Detailed order information and tracking would be displayed here.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrdersPage;