"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Search,
  Filter,
  MoreHorizontal,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Package,
  User,
  Calendar,
  DollarSign,
  Eye,
  MessageCircle,
  AlertCircle,
  Star,
  Navigation,
  Bell,
  Menu,
  X,
  TrendingUp,
  Users,
  ShoppingCart,
  Zap
} from 'lucide-react';

const FarmerOrdersPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
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

  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: {
        name: 'Nimal Perera',
        phone: '077-123-4567',
        location: 'Colombo 07',
        rating: 4.8,
        avatar: 'NP'
      },
      items: [
        { name: 'Organic Tomatoes', quantity: 5, unit: 'kg', price: 300 },
        { name: 'Fresh Carrots', quantity: 2, unit: 'kg', price: 250 }
      ],
      total: 2000,
      status: 'pending',
      orderDate: '2024-06-25T10:30:00',
      deliveryMethod: 'delivery',
      deliveryAddress: 'No. 45, Galle Road, Colombo 07',
      notes: 'Please pack vegetables separately. Prefer morning delivery.',
      priority: 'high'
    },
    {
      id: 'ORD-002',
      customer: {
        name: 'Saman Silva',
        phone: '076-987-6543',
        location: 'Kurunegala',
        rating: 4.6,
        avatar: 'SS'
      },
      items: [
        { name: 'Green Cabbage', quantity: 3, unit: 'kg', price: 180 },
        { name: 'Red Onions', quantity: 1, unit: 'kg', price: 220 }
      ],
      total: 760,
      status: 'processing',
      orderDate: '2024-06-25T09:15:00',
      deliveryMethod: 'pickup',
      deliveryAddress: 'Farm pickup - Customer will collect',
      notes: 'Will arrive around 2 PM today.',
      priority: 'medium'
    },
    {
      id: 'ORD-003',
      customer: {
        name: 'Kamala Jayawardena',
        phone: '071-555-7890',
        location: 'Kandy',
        rating: 4.9,
        avatar: 'KJ'
      },
      items: [
        { name: 'Green Beans', quantity: 2, unit: 'kg', price: 400 }
      ],
      total: 800,
      status: 'ready',
      orderDate: '2024-06-25T08:45:00',
      deliveryMethod: 'delivery',
      deliveryAddress: 'Temple Road, Kandy',
      notes: 'Regular customer. Prefers organic products only.',
      priority: 'medium'
    },
    {
      id: 'ORD-004',
      customer: {
        name: 'Ruwan Fernando',
        phone: '075-111-2233',
        location: 'Gampaha',
        rating: 4.5,
        avatar: 'RF'
      },
      items: [
        { name: 'Organic Tomatoes', quantity: 10, unit: 'kg', price: 300 },
        { name: 'Green Cabbage', quantity: 5, unit: 'kg', price: 180 },
        { name: 'Fresh Carrots', quantity: 3, unit: 'kg', price: 250 }
      ],
      total: 4650,
      status: 'delivered',
      orderDate: '2024-06-24T14:20:00',
      deliveryMethod: 'delivery',
      deliveryAddress: 'Gampaha Town, Near Bus Stand',
      notes: 'Bulk order for restaurant. Invoice required.',
      priority: 'high'
    },
    {
      id: 'ORD-005',
      customer: {
        name: 'Priyantha Gunasekara',
        phone: '078-444-5566',
        location: 'Negombo',
        rating: 4.3,
        avatar: 'PG'
      },
      items: [
        { name: 'Red Onions', quantity: 4, unit: 'kg', price: 220 }
      ],
      total: 880,
      status: 'cancelled',
      orderDate: '2024-06-24T16:10:00',
      deliveryMethod: 'pickup',
      deliveryAddress: 'Farm pickup',
      notes: 'Customer cancelled due to emergency.',
      priority: 'low'
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ready': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const orderCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Zap className="w-4 h-4" />;
      case 'ready': return <Package className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* SINGLE Enhanced Responsive Sidebar */}
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={screenSize.isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="farmer"
      />

      <div className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 ${getMainContentMargin()}`}>
        {/* Enhanced Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4">
                {/* Mobile menu button - only show on mobile */}
                {screenSize.isMobile && (
                  <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                )}
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {screenSize.isMobile ? '📋 Orders' : '📋 Orders Management'}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1 hidden sm:block">
                    {screenSize.isMobile 
                      ? 'Track customer orders' 
                      : 'Track and manage incoming orders from customers'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Enhanced Search - Responsive */}
              <div className={`flex items-center bg-gray-100 rounded-lg px-3 py-2 ${
                screenSize.isMobile ? 'w-32' : 'w-48 lg:w-64'
              }`}>
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder={screenSize.isMobile ? "Search..." : "Search orders or customers..."}
                  className="bg-transparent text-sm outline-none flex-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-1 p-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                )}
              </div>
              
              {/* Notification Badge */}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-400" />
                  {orderCounts.pending > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[18px] text-center">
                      {orderCounts.pending}
                    </span>
                  )}
                </div>
                
                {/* Filter toggle for mobile */}
                {screenSize.isMobile && (
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Stats Cards - Responsive Grid */}
            <div className={`grid gap-3 lg:gap-4 mb-6 ${
              screenSize.isMobile ? 'grid-cols-2' : 
              screenSize.isTablet ? 'grid-cols-3' : 
              'grid-cols-6'
            } ${screenSize.isMobile && showFilters ? 'grid-cols-1' : ''}`}>
              {[
                { key: 'all', label: 'Total Orders', color: 'bg-gray-50 text-gray-900', icon: ShoppingCart },
                { key: 'pending', label: 'Pending', color: 'bg-orange-50 text-orange-900', icon: Clock },
                { key: 'processing', label: 'Processing', color: 'bg-blue-50 text-blue-900', icon: Zap },
                { key: 'ready', label: 'Ready', color: 'bg-purple-50 text-purple-900', icon: Package },
                { key: 'delivered', label: 'Delivered', color: 'bg-green-50 text-green-900', icon: CheckCircle },
                { key: 'cancelled', label: 'Cancelled', color: 'bg-red-50 text-red-900', icon: XCircle }
              ].map((stat) => (
                <button
                  key={stat.key}
                  onClick={() => setSelectedFilter(stat.key)}
                  className={`p-3 lg:p-4 rounded-xl border-2 transition-all ${
                    selectedFilter === stat.key 
                      ? 'border-emerald-300 bg-emerald-50 shadow-md' 
                      : 'border-gray-200 bg-white hover:bg-gray-50 hover:shadow-sm'
                  }`}
                >
                  {!screenSize.isMobile && (
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                  <div className={`text-xl lg:text-2xl font-bold ${stat.color} mb-1`}>
                    {orderCounts[stat.key]}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-600">
                    {screenSize.isMobile ? stat.label.split(' ')[0] : stat.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Summary Stats - Show on tablet/desktop */}
            {!screenSize.isMobile && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        Rs. {orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                      </div>
                      <div className="text-emerald-100 text-sm">Total Revenue</div>
                    </div>
                    <DollarSign className="w-8 h-8 text-emerald-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        {new Set(orders.map(o => o.customer.name)).size}
                      </div>
                      <div className="text-blue-100 text-sm">Unique Customers</div>
                    </div>
                    <Users className="w-8 h-8 text-blue-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        {orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}
                      </div>
                      <div className="text-purple-100 text-sm">Items Sold</div>
                    </div>
                    <Package className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        {(orders.reduce((sum, order) => sum + order.customer.rating, 0) / orders.length).toFixed(1)}
                      </div>
                      <div className="text-yellow-100 text-sm">Avg Rating</div>
                    </div>
                    <Star className="w-8 h-8 text-yellow-200" />
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Orders List */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 lg:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Orders ({filteredOrders.length})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Filter: {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-4 lg:p-6 hover:bg-gray-50 transition-colors">
                    <div className={`${screenSize.isMobile ? 'space-y-4' : 'flex items-start justify-between'}`}>
                      <div className="flex-1">
                        {/* Customer Header */}
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center relative">
                            <span className="text-sm font-semibold text-emerald-700">
                              {order.customer.avatar}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                              <h3 className="font-semibold text-gray-900">{order.customer.name}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                <span className="ml-1">
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </span>
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(order.priority)}`}>
                                {order.priority.toUpperCase()}
                              </span>
                            </div>
                            <div className={`flex flex-wrap items-center gap-2 lg:gap-4 mt-1 text-sm text-gray-500 ${
                              screenSize.isMobile ? 'text-xs' : ''
                            }`}>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {screenSize.isMobile 
                                  ? new Date(order.orderDate).toLocaleDateString()
                                  : new Date(order.orderDate).toLocaleString()
                                }
                              </span>
                              <span className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {order.customer.location}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-3 h-3 mr-1 text-yellow-400" />
                                {order.customer.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={`grid gap-6 ${screenSize.isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'}`}>
                          {/* Order Items */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                              <Package className="w-4 h-4 mr-2" />
                              Order Items:
                            </h4>
                            <div className="space-y-2">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span className="text-gray-600">
                                    {item.name} - {item.quantity} {item.unit}
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    Rs. {(item.quantity * item.price).toLocaleString()}
                                  </span>
                                </div>
                              ))}
                              <div className="border-t pt-2 flex justify-between font-semibold">
                                <span>Total:</span>
                                <span className="text-emerald-600">Rs. {order.total.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>

                          {/* Delivery Info */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                              <Truck className="w-4 h-4 mr-2" />
                              Delivery Information:
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-start space-x-2">
                                <Navigation className="w-4 h-4 text-gray-500 mt-0.5" />
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {order.deliveryMethod === 'delivery' ? 'Home Delivery' : 'Farm Pickup'}
                                  </div>
                                  <div className="text-gray-600">{order.deliveryAddress}</div>
                                </div>
                              </div>
                              {order.notes && (
                                <div className="flex items-start space-x-2">
                                  <MessageCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                                  <div className="text-gray-600 italic">{order.notes}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Action Buttons - Responsive */}
                      <div className={`${screenSize.isMobile ? 'flex flex-wrap gap-2' : 'ml-4 lg:ml-6 flex flex-col space-y-2 min-w-[140px]'}`}>
                        {order.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'processing')}
                              className={`bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center ${
                                screenSize.isMobile ? 'px-3 py-2 flex-1' : 'px-4 py-2'
                              }`}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accept
                            </button>
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                              className={`bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center ${
                                screenSize.isMobile ? 'px-3 py-2 flex-1' : 'px-4 py-2'
                              }`}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Decline
                            </button>
                          </>
                        )}
                        
                        {order.status === 'processing' && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className={`bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center ${
                              screenSize.isMobile ? 'px-3 py-2 w-full' : 'px-4 py-2'
                            }`}
                          >
                            <Package className="w-4 h-4 mr-2" />
                            Mark Ready
                          </button>
                        )}
                        
                        {order.status === 'ready' && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className={`bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center ${
                              screenSize.isMobile ? 'px-3 py-2 w-full' : 'px-4 py-2'
                            }`}
                          >
                            <Truck className="w-4 h-4 mr-2" />
                            Mark Delivered
                          </button>
                        )}

                        <div className={`${screenSize.isMobile ? 'flex gap-2 w-full' : 'space-y-2'}`}>
                          <button 
                            onClick={() => window.open(`tel:${order.customer.phone}`, '_self')}
                            className={`border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center ${
                              screenSize.isMobile ? 'px-3 py-2 flex-1' : 'px-4 py-2'
                            }`}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            {screenSize.isMobile ? 'Call' : 'Call'}
                          </button>
                          
                          <button className={`border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center ${
                            screenSize.isMobile ? 'px-3 py-2 flex-1' : 'px-4 py-2'
                          }`}>
                            <Eye className="w-4 h-4 mr-2" />
                            {screenSize.isMobile ? 'View' : 'Details'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Empty State */}
              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                  <p className="text-gray-500 mb-4">
                    {selectedFilter === 'all' 
                      ? 'No orders match your search criteria.'
                      : `No ${selectedFilter} orders found.`
                    }
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerOrdersPage;