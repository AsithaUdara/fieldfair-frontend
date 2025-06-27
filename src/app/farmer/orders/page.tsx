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
  Bell
} from 'lucide-react';

const FarmerOrdersPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
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
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Orders Management</h1>
                  <p className="text-sm text-gray-600 mt-1">Track and manage incoming orders from customers</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search orders or customers..."
                  className="bg-transparent text-sm outline-none w-48 lg:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {orderCounts.pending}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4 mb-6">
              {[
                { key: 'all', label: 'Total Orders', color: 'bg-gray-50 text-gray-900' },
                { key: 'pending', label: 'Pending', color: 'bg-orange-50 text-orange-900' },
                { key: 'processing', label: 'Processing', color: 'bg-blue-50 text-blue-900' },
                { key: 'ready', label: 'Ready', color: 'bg-purple-50 text-purple-900' },
                { key: 'delivered', label: 'Delivered', color: 'bg-green-50 text-green-900' },
                { key: 'cancelled', label: 'Cancelled', color: 'bg-red-50 text-red-900' }
              ].map((stat) => (
                <button
                  key={stat.key}
                  onClick={() => setSelectedFilter(stat.key)}
                  className={`p-3 lg:p-4 rounded-xl border-2 transition-all ${
                    selectedFilter === stat.key 
                      ? 'border-emerald-300 bg-emerald-50' 
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className={`text-xl lg:text-2xl font-bold ${stat.color}`}>
                    {orderCounts[stat.key]}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-600">{stat.label}</div>
                </button>
              ))}
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-xl border border-gray-200">
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
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-emerald-700">
                              {order.customer.avatar}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center space-x-3">
                              <h3 className="font-semibold text-gray-900">{order.customer.name}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                              <span className={`text-xs font-medium ${getPriorityColor(order.priority)}`}>
                                {order.priority.toUpperCase()} PRIORITY
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center space-x-4 mt-1 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {new Date(order.orderDate).toLocaleString()}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {order.customer.location}
                              </span>
                              <span className="flex items-center">
                                <Star className="w-4 h-4 mr-1 text-yellow-400" />
                                {order.customer.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Order Items */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Order Items:</h4>
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
                                <span>Rs. {order.total.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>

                          {/* Delivery Info */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Delivery Information:</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-start space-x-2">
                                <Truck className="w-4 h-4 text-gray-500 mt-0.5" />
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

                      {/* Action Buttons */}
                      <div className="ml-4 lg:ml-6 flex flex-col space-y-2">
                        {order.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'processing')}
                              className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accept
                            </button>
                            <button 
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                              className="bg-red-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Decline
                            </button>
                          </>
                        )}
                        
                        {order.status === 'processing' && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="bg-purple-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center"
                          >
                            <Package className="w-4 h-4 mr-2" />
                            Mark Ready
                          </button>
                        )}
                        
                        {order.status === 'ready' && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="bg-green-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center"
                          >
                            <Truck className="w-4 h-4 mr-2" />
                            Mark Delivered
                          </button>
                        )}

                        <button className="border border-gray-300 text-gray-700 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </button>
                        
                        <button className="border border-gray-300 text-gray-700 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center">
                          <Eye className="w-4 h-4 mr-2" />
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No orders found for the selected filter.</p>
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