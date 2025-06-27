"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Minus,
  Edit,
  Package,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  BarChart3,
  Download,
  RefreshCw,
  Eye,
  Clock,
  Truck
} from 'lucide-react';

const InventoryPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showUpdateModal, setShowUpdateModal] = useState(null);

  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Organic Tomatoes',
      sku: 'TOM-001',
      currentStock: 45,
      minStock: 10,
      maxStock: 100,
      unit: 'kg',
      pricePerUnit: 300,
      lastUpdated: '2024-06-25',
      status: 'good',
      movement: '+12',
      harvestDate: '2024-06-20',
      expiryDate: '2024-07-05',
      location: 'Storage A-1',
      supplier: 'Farm Section 1'
    },
    {
      id: 2,
      name: 'Fresh Carrots',
      sku: 'CAR-001',
      currentStock: 8,
      minStock: 15,
      maxStock: 80,
      unit: 'kg',
      pricePerUnit: 250,
      lastUpdated: '2024-06-24',
      status: 'low',
      movement: '-5',
      harvestDate: '2024-06-18',
      expiryDate: '2024-07-10',
      location: 'Storage A-2',
      supplier: 'Farm Section 2'
    },
    {
      id: 3,
      name: 'Green Cabbage',
      sku: 'CAB-001',
      currentStock: 28,
      minStock: 12,
      maxStock: 60,
      unit: 'kg',
      pricePerUnit: 180,
      lastUpdated: '2024-06-25',
      status: 'good',
      movement: '+8',
      harvestDate: '2024-06-19',
      expiryDate: '2024-07-15',
      location: 'Storage B-1',
      supplier: 'Farm Section 1'
    },
    {
      id: 4,
      name: 'Red Onions',
      sku: 'ONI-001',
      currentStock: 3,
      minStock: 10,
      maxStock: 50,
      unit: 'kg',
      pricePerUnit: 220,
      lastUpdated: '2024-06-23',
      status: 'critical',
      movement: '-12',
      harvestDate: '2024-06-15',
      expiryDate: '2024-08-01',
      location: 'Storage A-3',
      supplier: 'Farm Section 3'
    },
    {
      id: 5,
      name: 'Green Beans',
      sku: 'BEA-001',
      currentStock: 0,
      minStock: 8,
      maxStock: 40,
      unit: 'kg',
      pricePerUnit: 400,
      lastUpdated: '2024-06-20',
      status: 'out',
      movement: '-22',
      harvestDate: '2024-06-15',
      expiryDate: '2024-06-30',
      location: 'Storage B-2',
      supplier: 'Farm Section 2'
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
      case 'good': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'out': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (item) => {
    if (item.currentStock === 0) return 'Out of Stock';
    if (item.currentStock <= item.minStock) return 'Low Stock';
    if (item.currentStock <= item.minStock * 1.5) return 'Warning';
    return 'Good';
  };

  const updateStock = (id, amount) => {
    setInventory(prev => prev.map(item => 
      item.id === id 
        ? { 
            ...item, 
            currentStock: Math.max(0, item.currentStock + amount),
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : item
    ));
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const inventoryStats = {
    totalProducts: inventory.length,
    lowStock: inventory.filter(item => item.status === 'low' || item.status === 'critical').length,
    outOfStock: inventory.filter(item => item.status === 'out').length,
    totalValue: inventory.reduce((sum, item) => sum + (item.currentStock * item.pricePerUnit), 0)
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
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <LayoutGrid className="w-6 h-6" />
              </button>
              
              <Link 
                href="/farmer/products"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Back to Products</span>
              </Link>
              
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-sm text-gray-600 mt-1">Monitor and manage your product stock levels</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <button className="border border-gray-300 text-gray-700 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center">
                <RefreshCw className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              
              <button className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{inventoryStats.totalProducts}</p>
                  </div>
                  <Package className="w-6 lg:w-8 h-6 lg:h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Low Stock Items</p>
                    <p className="text-2xl font-bold text-gray-900">{inventoryStats.lowStock}</p>
                  </div>
                  <AlertTriangle className="w-6 lg:w-8 h-6 lg:h-8 text-yellow-500" />
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Out of Stock</p>
                    <p className="text-2xl font-bold text-gray-900">{inventoryStats.outOfStock}</p>
                  </div>
                  <Package className="w-6 lg:w-8 h-6 lg:h-8 text-red-500" />
                </div>
              </div>

              <div className="bg-white p-4 lg:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Inventory Value</p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900">Rs. {inventoryStats.totalValue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-6 lg:w-8 h-6 lg:h-8 text-green-500" />
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                    <Search className="w-4 h-4 text-gray-500 mr-2" />
                    <input 
                      type="text" 
                      placeholder="Search products..."
                      className="bg-transparent text-sm outline-none w-48"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select 
                      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="good">Good Stock</option>
                      <option value="low">Low Stock</option>
                      <option value="critical">Critical</option>
                      <option value="out">Out of Stock</option>
                    </select>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  Showing {filteredInventory.length} items
                </div>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/Unit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                              <Package className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <span className="font-medium">{item.currentStock}</span> / {item.maxStock} {item.unit}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className={`h-2 rounded-full ${
                                item.currentStock <= item.minStock ? 'bg-red-500' :
                                item.currentStock <= item.minStock * 1.5 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusText(item)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Rs. {item.pricePerUnit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Rs. {(item.currentStock * item.pricePerUnit).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item.lastUpdated).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateStock(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateStock(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Low Stock Alerts */}
            {inventoryStats.lowStock > 0 && (
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-2">Stock Alerts</h3>
                    <p className="text-yellow-800 mb-4">
                      You have {inventoryStats.lowStock} items that need restocking.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {inventory.filter(item => item.status === 'low' || item.status === 'critical' || item.status === 'out').map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-lg border border-yellow-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-600">Current: {item.currentStock} {item.unit}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Min: {item.minStock} {item.unit}</div>
                              <button className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mt-1">
                                Restock Needed
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InventoryPage;