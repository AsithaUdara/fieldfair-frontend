"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Search,
  Filter,
  Phone,
  MapPin,
  Star,
  Calendar,
  DollarSign,
  ShoppingCart,
  MessageCircle,
  Eye,
  UserPlus,
  TrendingUp,
  Heart,
  Package,
  Clock,
  Award,
  Mail,
  Menu,
  X
} from 'lucide-react';

const FarmerCustomersPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  // Enhanced responsive detection - same as marketplace
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  // Enhanced responsive detection that matches the sidebar
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

  const [customers] = useState([
    {
      id: 1,
      name: 'Nimal Perera',
      phone: '077-123-4567',
      email: 'nimal.perera@gmail.com',
      location: 'Colombo 07',
      avatar: 'NP',
      joinDate: '2024-02-15',
      totalOrders: 28,
      totalSpent: 45600,
      averageOrderValue: 1628,
      lastOrderDate: '2024-06-25',
      rating: 4.8,
      loyaltyStatus: 'Gold',
      preferredProducts: ['Organic Tomatoes', 'Fresh Carrots', 'Green Beans'],
      notes: 'Prefers organic products. Regular customer with consistent orders.',
      type: 'individual'
    },
    {
      id: 2,
      name: 'Saman Silva',
      phone: '076-987-6543',
      email: 'saman.silva@yahoo.com',
      location: 'Kurunegala',
      avatar: 'SS',
      joinDate: '2024-03-10',
      totalOrders: 22,
      totalSpent: 32400,
      averageOrderValue: 1472,
      lastOrderDate: '2024-06-24',
      rating: 4.6,
      loyaltyStatus: 'Silver',
      preferredProducts: ['Green Cabbage', 'Red Onions', 'Carrots'],
      notes: 'Family orders. Usually picks up from farm.',
      type: 'individual'
    },
    {
      id: 3,
      name: 'Green Valley Restaurant',
      phone: '011-234-5678',
      email: 'orders@greenvalley.lk',
      location: 'Kandy',
      avatar: 'GV',
      joinDate: '2024-01-20',
      totalOrders: 45,
      totalSpent: 125000,
      averageOrderValue: 2777,
      lastOrderDate: '2024-06-25',
      rating: 4.9,
      loyaltyStatus: 'Platinum',
      preferredProducts: ['Organic Tomatoes', 'Green Beans', 'Cabbage'],
      notes: 'Commercial customer. Requires invoices and bulk orders.',
      type: 'business'
    },
    {
      id: 4,
      name: 'Kamala Jayawardena',
      phone: '071-555-7890',
      email: 'kamala.j@hotmail.com',
      location: 'Gampaha',
      avatar: 'KJ',
      joinDate: '2024-04-05',
      totalOrders: 15,
      totalSpent: 18900,
      averageOrderValue: 1260,
      lastOrderDate: '2024-06-23',
      rating: 4.9,
      loyaltyStatus: 'Bronze',
      preferredProducts: ['Green Beans', 'Organic Tomatoes'],
      notes: 'Health-conscious customer. Only buys organic produce.',
      type: 'individual'
    },
    {
      id: 5,
      name: 'Ruwan Fernando',
      phone: '075-111-2233',
      email: 'ruwan.fernando@gmail.com',
      location: 'Negombo',
      avatar: 'RF',
      joinDate: '2024-01-30',
      totalOrders: 35,
      totalSpent: 67800,
      averageOrderValue: 1937,
      lastOrderDate: '2024-06-22',
      rating: 4.5,
      loyaltyStatus: 'Gold',
      preferredProducts: ['All Vegetables', 'Seasonal Fruits'],
      notes: 'Bulk buyer for local market. Very reliable customer.',
      type: 'business'
    },
    {
      id: 6,
      name: 'Priyantha Gunasekara',
      phone: '078-444-5566',
      email: 'priyantha.g@yahoo.com',
      location: 'Colombo 03',
      avatar: 'PG',
      joinDate: '2024-05-12',
      totalOrders: 8,
      totalSpent: 9600,
      averageOrderValue: 1200,
      lastOrderDate: '2024-06-18',
      rating: 4.3,
      loyaltyStatus: 'Bronze',
      preferredProducts: ['Red Onions', 'Carrots'],
      notes: 'New customer. Still exploring product range.',
      type: 'individual'
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

  const getLoyaltyColor = (status) => {
    switch (status) {
      case 'Platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Bronze': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesFilter = filterType === 'all' || customer.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const customerStats = {
    total: customers.length,
    individual: customers.filter(c => c.type === 'individual').length,
    business: customers.filter(c => c.type === 'business').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    averageOrderValue: customers.reduce((sum, c) => sum + c.averageOrderValue, 0) / customers.length
  };

  const openCustomerDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Enhanced Sidebar */}
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
                    {screenSize.isMobile ? '👥 Customers' : '👥 Customer Management'}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1 hidden sm:block">
                    {screenSize.isMobile 
                      ? 'Manage customer relationships' 
                      : 'Manage relationships with your customers'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Search - responsive width */}
              <div className={`flex items-center bg-gray-100 rounded-lg px-3 py-2 ${
                screenSize.isMobile ? 'w-32' : screenSize.isTablet ? 'w-40' : 'w-48 lg:w-64'
              }`}>
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder={screenSize.isMobile ? "Search..." : "Search customers..."}
                  className="bg-transparent text-sm outline-none flex-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 p-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="w-3 h-3 text-gray-500" />
                  </button>
                )}
              </div>
              
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Stats Cards - Responsive Grid */}
            <div className={`grid gap-4 lg:gap-6 mb-6 ${
              screenSize.isMobile ? 'grid-cols-2' : 
              screenSize.isTablet ? 'grid-cols-3' : 
              'grid-cols-5'
            }`}>
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">Total Customers</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{customerStats.total}</p>
                  </div>
                  <Heart className="w-5 lg:w-8 h-5 lg:h-8 text-red-500" />
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">Individual</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{customerStats.individual}</p>
                  </div>
                  <Package className="w-5 lg:w-8 h-5 lg:h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">Business</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">{customerStats.business}</p>
                  </div>
                  <Award className="w-5 lg:w-8 h-5 lg:h-8 text-purple-500" />
                </div>
              </div>

              <div className={`bg-white p-4 lg:p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow ${
                screenSize.isMobile ? 'col-span-2' : ''
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">Total Revenue</p>
                    <p className="text-lg lg:text-2xl font-bold text-gray-900">Rs. {customerStats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-5 lg:w-8 h-5 lg:h-8 text-green-500" />
                </div>
              </div>

              <div className={`bg-white p-4 lg:p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow ${
                screenSize.isMobile ? 'col-span-2' : screenSize.isTablet ? 'col-span-3' : ''
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-600">Avg Order Value</p>
                    <p className="text-lg lg:text-2xl font-bold text-gray-900">Rs. {Math.round(customerStats.averageOrderValue).toLocaleString()}</p>
                  </div>
                  <TrendingUp className="w-5 lg:w-8 h-5 lg:h-8 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Enhanced Filters */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filter:</span>
                  </div>
                  <select 
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Customers</option>
                    <option value="individual">Individual</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                  Showing {filteredCustomers.length} customers
                </div>
              </div>
            </div>

            {/* Enhanced Customers List - Responsive Grid */}
            <div className={`grid gap-4 lg:gap-6 ${
              screenSize.isMobile ? 'grid-cols-1' : 
              screenSize.isTablet ? 'grid-cols-1' : 
              'grid-cols-2'
            }`}>
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="p-4 lg:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-emerald-700">
                            {customer.avatar}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-base lg:text-lg">{customer.name}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getLoyaltyColor(customer.loyaltyStatus)}`}>
                              {customer.loyaltyStatus}
                            </span>
                            <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-0.5 rounded-full">{customer.type}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{customer.rating}</span>
                      </div>
                    </div>

                    {/* Enhanced Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs lg:text-sm text-gray-600">Total Orders</div>
                        <div className="font-semibold text-gray-900 text-lg">{customer.totalOrders}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs lg:text-sm text-gray-600">Total Spent</div>
                        <div className="font-semibold text-gray-900 text-lg">Rs. {customer.totalSpent.toLocaleString()}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs lg:text-sm text-gray-600">Avg Order</div>
                        <div className="font-semibold text-gray-900 text-lg">Rs. {customer.averageOrderValue.toLocaleString()}</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs lg:text-sm text-gray-600">Last Order</div>
                        <div className="font-semibold text-gray-900 text-sm lg:text-base">
                          {new Date(customer.lastOrderDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mb-4 p-3 bg-blue-50 rounded-xl">
                      <div className="text-sm text-gray-600 mb-2 font-medium">Contact Info</div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{customer.phone}</span>
                        </div>
                        {!screenSize.isMobile && (
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900 truncate">{customer.email}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{customer.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Preferred Products */}
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2 font-medium">Preferred Products</div>
                      <div className="flex flex-wrap gap-1">
                        {customer.preferredProducts.slice(0, screenSize.isMobile ? 1 : 2).map((product, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">
                            {product}
                          </span>
                        ))}
                        {customer.preferredProducts.length > (screenSize.isMobile ? 1 : 2) && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                            +{customer.preferredProducts.length - (screenSize.isMobile ? 1 : 2)} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Notes - Hide on mobile */}
                    {customer.notes && !screenSize.isMobile && (
                      <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-1 font-medium">Notes</div>
                        <div className="text-sm text-gray-900 italic bg-gray-50 p-2 rounded line-clamp-2">{customer.notes}</div>
                      </div>
                    )}

                    {/* Enhanced Action Buttons */}
                    <div className={`flex items-center gap-2 pt-4 border-t border-gray-100 ${
                      screenSize.isMobile ? 'flex-col' : ''
                    }`}>
                      <div className={`flex items-center space-x-2 ${screenSize.isMobile ? 'w-full' : 'flex-1'}`}>
                        <button 
                          onClick={() => window.open(`tel:${customer.phone}`, '_self')}
                          className="flex-1 bg-emerald-600 text-white py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </button>
                        <button 
                          onClick={() => window.open(`sms:${customer.phone}`, '_self')}
                          className="flex-1 border border-gray-300 text-gray-700 py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          SMS
                        </button>
                      </div>
                      <button 
                        onClick={() => openCustomerDetails(customer)}
                        className={`border border-gray-300 text-gray-700 py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center ${
                          screenSize.isMobile ? 'w-full' : ''
                        }`}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {screenSize.isMobile ? 'View Details' : 'Details'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredCustomers.length === 0 && (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No customers found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm 
                    ? "Try adjusting your search to find customers." 
                    : "No customers found for the selected filter."
                  }
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                  }}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Customer Details Modal */}
        {showCustomerDetails && selectedCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
                <button 
                  onClick={() => setShowCustomerDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Customer Header */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-emerald-700">{selectedCustomer.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{selectedCustomer.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getLoyaltyColor(selectedCustomer.loyaltyStatus)}`}>
                        {selectedCustomer.loyaltyStatus}
                      </span>
                      <span className="text-sm text-gray-500 capitalize">{selectedCustomer.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900">{selectedCustomer.rating}</span>
                    </div>
                    <div className="text-sm text-gray-500">Customer Rating</div>
                  </div>
                </div>

                {/* Complete Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{selectedCustomer.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{selectedCustomer.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{selectedCustomer.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">Joined {new Date(selectedCustomer.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Purchase Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Orders:</span>
                        <span className="font-semibold text-gray-900">{selectedCustomer.totalOrders}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Spent:</span>
                        <span className="font-semibold text-gray-900">Rs. {selectedCustomer.totalSpent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Order Value:</span>
                        <span className="font-semibold text-gray-900">Rs. {selectedCustomer.averageOrderValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Order:</span>
                        <span className="font-semibold text-gray-900">{new Date(selectedCustomer.lastOrderDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preferred Products */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Preferred Products</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.preferredProducts.map((product, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedCustomer.notes && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Notes</h4>
                    <div className="text-gray-700 bg-gray-50 p-4 rounded-lg italic">{selectedCustomer.notes}</div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => window.open(`tel:${selectedCustomer.phone}`, '_self')}
                    className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Customer
                  </button>
                  <button 
                    onClick={() => window.open(`sms:${selectedCustomer.phone}`, '_self')}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send Message
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

export default FarmerCustomersPage;