"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  Search,
  MapPin,
  Truck,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  Thermometer,
  Scale,
  Shield,
  Leaf,
  User,
  Calendar,
  Route,
  Timer,
  Eye,
  Download,
  RefreshCw,
  QrCode,
  Star,
  Phone,
  Navigation,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sprout,
  History,
  Heart,
  ShoppingCart,
  Zap,
  Target,
  TrendingUp,
  MessageCircle,
  Bell,
  Database,
  FileText,
  Camera,
  Scan,
  Menu,
  X
} from 'lucide-react';

// Modern Sidebar Component
interface MenuItem {
  name: string;
  icon: React.ComponentType<any>;
  path: string;
  badge?: string;
  hasSubmenu?: boolean;
  active?: boolean;
  submenu?: MenuItem[];
}

interface FieldFairSidebarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  userType?: 'farmer' | 'customer';
}

const FieldFairSidebar: React.FC<FieldFairSidebarProps> = ({
  isCollapsed = false,
  setIsCollapsed,
  isMobile = false,
  isOpen = false,
  onClose,
  userType = 'customer'
}) => {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeMenu, setActiveMenu] = useState('Discover');
  const [mounted, setMounted] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Discover']);
  
  // Customer menu items
  const customerMenuItems: MenuItem[] = [
    { name: 'Marketplace', icon: Search, path: '/marketplace' },
    { name: 'My Cart', icon: ShoppingCart, path: '/marketplace/cart', badge: '2' },
    { 
      name: 'My Orders', 
      icon: Package, 
      path: '/customer/orders',
      hasSubmenu: true,
      submenu: [
        { name: 'Current Orders', icon: Package, path: '/customer/orders' },
        { name: 'Order History', icon: History, path: '/customer/history' }
      ]
    },
    { name: 'Favorites', icon: Heart, path: '/customer/favorites' },
    { 
      name: 'Discover', 
      icon: MapPin, 
      path: '/customer/farms',
      hasSubmenu: true,
      submenu: [
        { name: 'Find Farms', icon: MapPin, path: '/customer/farms' },
        { name: 'QR Scanner', icon: QrCode, path: '/customer/qr-scanner' },
        { name: 'Track Products', icon: Route, path: '/maps/supply-chain', active: true }
      ]
    },
    {
      name: 'AI Assistant',
      icon: Zap,
      path: '/ai/recommendations',
      hasSubmenu: true,
      submenu: [
        { name: 'Recommendations', icon: Target, path: '/ai/recommendations' },
        { name: 'Price Forecasting', icon: TrendingUp, path: '/ai/forecasting' },
        { name: 'Chat Assistant', icon: MessageCircle, path: '/ai/chatbot' }
      ]
    }
  ];
  
  const generalItems: MenuItem[] = [
    { 
      name: 'Profile', 
      icon: User, 
      path: '/customer/profile',
      hasSubmenu: true,
      submenu: [
        { name: 'My Profile', icon: User, path: '/customer/profile' },
        { name: 'Settings', icon: Settings, path: '/customer/settings' },
        { name: 'Notifications', icon: Bell, path: '/customer/notifications' }
      ]
    }
  ];

  // Choose menu items based on user type
  const menuItems = userType === 'farmer' ? [] : customerMenuItems;

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set active menu based on current path
  useEffect(() => {
    if (mounted) {
      const allItems = [...menuItems, ...generalItems];
      let foundItem = null;

      // Check for exact matches in submenus first
      for (const item of allItems) {
        if (item.submenu) {
          const submenuItem = item.submenu.find(subItem => 
            pathname === subItem.path || pathname.startsWith(subItem.path)
          );
          if (submenuItem) {
            foundItem = item;
            setActiveMenu(item.name);
            // Auto-expand parent menu if submenu item is active
            setExpandedMenus(prev => 
              prev.includes(item.name) ? prev : [...prev, item.name]
            );
            break;
          }
        }
      }

      // If no submenu match, check main items
      if (!foundItem) {
        foundItem = allItems.find(item => pathname === item.path || pathname.startsWith(item.path));
        if (foundItem) {
          setActiveMenu(foundItem.name);
        }
      }
    }
  }, [pathname, mounted, menuItems, generalItems]);

  const handleMenuClick = (item: MenuItem) => {
    if (item.hasSubmenu && !isCollapsed) {
      // Toggle submenu expansion
      setExpandedMenus(prev => 
        prev.includes(item.name) 
          ? prev.filter(name => name !== item.name)
          : [...prev, item.name]
      );
    } else {
      setActiveMenu(item.name);
      if (isMobile && onClose) {
        onClose();
      }
    }
  };

  const handleSubmenuClick = (parentItem: MenuItem, subItem: MenuItem) => {
    setActiveMenu(parentItem.name);
    if (isMobile && onClose) {
      onClose();
    }
  };

  // Don't render until mounted to prevent hydration errors
  if (!mounted) {
    return null;
  }

  // Get user info based on type
  const getUserInfo = () => {
    return {
      name: 'Nimal Perera',
      subtitle: 'Premium Customer • Colombo',
      avatar: 'NP',
      status: 'Active Member',
      statusColor: 'bg-blue-500'
    };
  };

  const userInfo = getUserInfo();

  const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

  const renderMenuItem = (item: MenuItem, isSubmenu = false) => {
    const isActive = activeMenu === item.name || 
                    (item.submenu && item.submenu.some(subItem => pathname === subItem.path || pathname.startsWith(subItem.path)));
    const isExpanded = expandedMenus.includes(item.name);
    const hasActiveSubmenu = item.submenu && item.submenu.some(subItem => pathname === subItem.path || pathname.startsWith(subItem.path));

    return (
      <div key={item.name}>
        <div className={isCollapsed && !isSubmenu ? "flex justify-center" : ""}>
          <Link 
            href={item.hasSubmenu ? '#' : item.path}
            onClick={(e) => {
              if (item.hasSubmenu) {
                e.preventDefault();
                handleMenuClick(item);
              } else {
                handleMenuClick(item);
              }
            }}
            className={cn(
              "flex items-center py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden",
              isActive || hasActiveSubmenu
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25' 
                : 'text-slate-300 hover:bg-white/5 hover:text-white backdrop-blur-sm',
              isCollapsed && !isSubmenu ? "w-12 h-12 justify-center mx-auto" : "px-4 w-full mx-2",
              isSubmenu ? "ml-6 text-sm" : ""
            )}
          >
            {/* Animated background for active state */}
            {(isActive || hasActiveSubmenu) && !isCollapsed && !isSubmenu && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 rounded-xl animate-pulse"></div>
            )}
            
            {/* Modern active indicator */}
            {(isActive || hasActiveSubmenu) && !isCollapsed && !isSubmenu && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></span>
            )}
            
            <item.icon className={cn(
              "w-5 h-5 relative z-10 transition-transform duration-300",
              isActive || hasActiveSubmenu ? "text-white scale-110" : "text-slate-400 group-hover:text-white group-hover:scale-105",
              isSubmenu ? "w-4 h-4" : ""
            )} />
            
            {!isCollapsed && (
              <>
                <span className="ml-4 flex-1 text-left font-medium relative z-10 transition-all duration-300">
                  {item.name}
                </span>
                {item.badge && (
                  <span className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-[10px] px-2.5 py-1 rounded-full font-bold shadow-lg relative z-10 animate-pulse">
                    {item.badge}
                  </span>
                )}
                {item.hasSubmenu && (
                  <ChevronDown className={cn(
                    "w-4 h-4 relative z-10 transition-all duration-300",
                    isExpanded ? "rotate-180 text-white" : "text-slate-400 group-hover:text-white",
                    isActive || hasActiveSubmenu ? "text-white" : ""
                  )} />
                )}
              </>
            )}

            {/* Enhanced tooltip for collapsed state */}
            {isCollapsed && !isSubmenu && (
              <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 whitespace-nowrap shadow-xl border border-slate-700">
                <div className="font-medium">{item.name}</div>
                {item.badge && (
                  <span className="inline-block mt-1 bg-orange-500 text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                {/* Tooltip arrow */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800"></div>
              </div>
            )}
          </Link>
        </div>

        {/* Enhanced submenu with modern styling */}
        {item.hasSubmenu && !isCollapsed && isExpanded && item.submenu && (
          <div className="ml-6 mt-2 space-y-1 animate-in slide-in-from-left-2 duration-300">
            {item.submenu.map((subItem) => (
              <Link
                key={subItem.name}
                href={subItem.path}
                onClick={() => handleSubmenuClick(item, subItem)}
                className={cn(
                  "flex items-center py-3 px-4 rounded-lg transition-all duration-300 text-sm group relative overflow-hidden",
                  pathname === subItem.path || pathname.startsWith(subItem.path)
                    ? 'bg-gradient-to-r from-emerald-400/30 to-emerald-500/30 text-white backdrop-blur-sm'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white hover:pl-6'
                )}
              >
                <subItem.icon className="w-4 h-4 mr-3 transition-transform duration-300 group-hover:scale-110" />
                <span className="transition-all duration-300">{subItem.name}</span>
                
                {/* Submenu active indicator */}
                {(pathname === subItem.path || pathname.startsWith(subItem.path)) && (
                  <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Enhanced backdrop for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out" 
          onClick={onClose}
        />
      )}
      
      <aside 
        className={cn(
          "fixed h-screen left-0 top-0 z-50 transition-all duration-500 flex flex-col shadow-2xl border-r border-slate-800/50",
          "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white backdrop-blur-xl",
          isCollapsed ? "w-20" : "w-72",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        )}
      >
        {/* Modern background pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-blue-900/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          
          {/* Animated floating elements */}
          <div className="absolute bottom-10 right-6 opacity-5">
            <Leaf className="w-24 h-24 text-emerald-400 animate-pulse" />
          </div>
          <div className="absolute top-1/3 right-4 opacity-5">
            <Sprout className="w-16 h-16 text-emerald-300 animate-bounce" style={{animationDuration: '3s'}} />
          </div>
        </div>

        {/* Modern close button for mobile */}
        {isMobile && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl z-50 bg-slate-800/80 text-slate-300 lg:hidden hover:bg-slate-700 transition-all duration-300 backdrop-blur-sm border border-slate-700/50"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        
        {/* Enhanced Logo Section */}
        <div className={cn(
          "border-b border-slate-700/50 relative z-10 backdrop-blur-sm",
          isCollapsed ? "p-4" : "px-6 py-6"
        )}>
          <div className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : ""
          )}>
            {/* Modern FieldFair Logo */}
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/20">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div className="ml-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                  FieldFair
                </span>
                <div className="text-xs text-emerald-300/80 font-medium">Customer Portal</div>
              </div>
            )}
          </div>
          
          {/* Modern toggle button */}
          {!isMobile && setIsCollapsed && (
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "absolute w-8 h-8 hidden lg:flex items-center justify-center rounded-full transition-all duration-300",
                "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white shadow-lg backdrop-blur-sm border border-slate-600/50",
                isCollapsed ? "right-0 -mr-4 top-[26px]" : "right-0 -mr-4 top-[32px]"
              )}
              aria-label="Toggle sidebar"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        
        {/* Enhanced Menu Section */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="h-full py-6 overflow-y-auto transition-all duration-500 ease-in-out scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500"
          >
            {/* Main Section */}
            <div className={cn("mb-8", isCollapsed ? "px-2" : "px-4")}>
              {!isCollapsed && (
                <div className="text-[10px] text-emerald-300/70 mb-4 uppercase tracking-[0.15em] font-bold px-2">
                  🛒 MARKETPLACE
                </div>
              )}
              <nav className="space-y-2">
                {menuItems.map((item) => renderMenuItem(item))}
              </nav>
            </div>
            
            {/* Account Section */}
            <div className={cn("mt-8", isCollapsed ? "px-2" : "px-4")}>
              {!isCollapsed && (
                <div className="text-[10px] text-emerald-300/70 mb-4 uppercase tracking-[0.15em] font-bold px-2">
                  👤 ACCOUNT
                </div>
              )}
              <nav className="space-y-2">
                {generalItems.map((item) => renderMenuItem(item))}
              </nav>
            </div>
          </div>
        </div>
        
        {/* Enhanced User Profile */}
        {!isCollapsed && (
          <div className="p-4 border-t border-slate-700/50 relative z-10 backdrop-blur-sm">
            <div className="flex items-center bg-slate-800/30 rounded-xl p-3 backdrop-blur-sm border border-slate-700/30">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center relative ring-2 ring-slate-600/50">
                <span className="text-sm font-bold text-white">{userInfo.avatar}</span>
                {/* Online status indicator */}
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800",
                  userInfo.statusColor
                )}></div>
              </div>
              <div className="ml-3 flex-1">
                <div className="text-sm font-semibold text-white">{userInfo.name}</div>
                <div className="text-xs text-slate-300">{userInfo.subtitle}</div>
                <div className="text-[10px] text-emerald-400 mt-1 font-medium">{userInfo.status}</div>
              </div>
              <button className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-300">
                <Settings className="w-4 h-4 text-slate-400 hover:text-white transition-colors duration-300" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

// Main Supply Chain Tracking Component
const SupplyChainTrackingPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShipment, setSelectedShipment] = useState<number | null>(1);

  // Mock shipment data
  const [shipments] = useState([
    {
      id: 1,
      trackingId: 'FF2024-001',
      productName: 'Organic Tomatoes',
      productImage: '🍅',
      quantity: '50 kg',
      farmer: {
        name: 'Ravi Mahathaya',
        farm: "Ravi's Organic Farm",
        location: 'Kurunegala',
        phone: '+94 77 296 7477',
        avatar: 'RM'
      },
      customer: {
        name: 'Nimal Perera',
        address: 'No. 45, Galle Road, Colombo 07',
        phone: '+94 77 123 4567'
      },
      status: 'in_transit',
      currentLocation: 'Puttalam Road, Kurunegala',
      estimatedDelivery: '2024-06-26T16:00:00',
      orderDate: '2024-06-25T08:30:00',
      progress: 65,
      vehicle: {
        type: 'Refrigerated Truck',
        plateNumber: 'CAB-1234',
        driver: 'Kasun Silva',
        driverPhone: '+94 71 555 0123'
      },
      conditions: {
        temperature: '4.2°C',
        humidity: '85%',
        quality: 'Excellent'
      },
      timeline: [
        {
          id: 1,
          title: 'Order Confirmed',
          description: 'Order received and confirmed by farmer',
          timestamp: '2024-06-25T08:30:00',
          status: 'completed',
          location: "Ravi's Organic Farm, Kurunegala",
          icon: CheckCircle,
          details: 'Order for 50kg organic tomatoes confirmed'
        },
        {
          id: 2,
          title: 'Harvesting',
          description: 'Products harvested and quality checked',
          timestamp: '2024-06-25T10:15:00',
          status: 'completed',
          location: "Farm Field A-2",
          icon: Leaf,
          details: 'Hand-picked at dawn, Grade A quality'
        },
        {
          id: 3,
          title: 'Processing & Packaging',
          description: 'Products washed, sorted and packaged',
          timestamp: '2024-06-25T14:20:00',
          status: 'completed',
          location: "Processing Center",
          icon: Package,
          details: 'Eco-friendly packaging, QR codes attached'
        },
        {
          id: 4,
          title: 'Quality Inspection',
          description: 'Final quality check and certification',
          timestamp: '2024-06-25T15:45:00',
          status: 'completed',
          location: "Quality Control Lab",
          icon: Shield,
          details: 'Passed all quality tests, certificates issued'
        },
        {
          id: 5,
          title: 'Dispatch',
          description: 'Loaded onto refrigerated vehicle',
          timestamp: '2024-06-26T07:00:00',
          status: 'completed',
          location: "Farm Dispatch Center",
          icon: Truck,
          details: 'Loaded in temperature-controlled compartment'
        },
        {
          id: 6,
          title: 'In Transit',
          description: 'En route to delivery location',
          timestamp: '2024-06-26T09:30:00',
          status: 'current',
          location: "Puttalam Road, Kurunegala",
          icon: Route,
          details: 'GPS tracked, temperature monitored'
        },
        {
          id: 7,
          title: 'Out for Delivery',
          description: 'Vehicle reached local distribution center',
          timestamp: '2024-06-26T14:00:00',
          status: 'pending',
          location: "Colombo Distribution Center",
          icon: Timer,
          details: 'Final mile delivery preparation'
        },
        {
          id: 8,
          title: 'Delivered',
          description: 'Products delivered to customer',
          timestamp: '2024-06-26T16:00:00',
          status: 'pending',
          location: "No. 45, Galle Road, Colombo 07",
          icon: CheckCircle,
          details: 'Customer signature required'
        }
      ],
      certifications: [
        'Organic Certified',
        'Food Safety Approved',
        'Cold Chain Maintained',
        'Traceability Verified'
      ],
      sustainability: {
        carbonFootprint: '0.8 kg CO2e',
        packaging: 'Biodegradable',
        waterUsage: '12 L/kg',
        energyEfficient: true
      }
    },
    {
      id: 2,
      trackingId: 'FF2024-002',
      productName: 'Fresh Carrots',
      productImage: '🥕',
      quantity: '25 kg',
      farmer: {
        name: 'Saman Silva',
        farm: "Silva Sustainable Farm",
        location: 'Matale',
        phone: '+94 81 222 3456',
        avatar: 'SS'
      },
      customer: {
        name: 'Kamala Fernando',
        address: 'No. 78, Kandy Road, Matale',
        phone: '+94 81 567 8901'
      },
      status: 'delivered',
      currentLocation: 'Delivered',
      estimatedDelivery: '2024-06-25T18:00:00',
      orderDate: '2024-06-24T12:00:00',
      progress: 100,
      vehicle: {
        type: 'Standard Truck',
        plateNumber: 'CP-5678',
        driver: 'Sunil Perera',
        driverPhone: '+94 71 444 0456'
      },
      conditions: {
        temperature: '8.1°C',
        humidity: '82%',
        quality: 'Good'
      },
      timeline: [
        // Similar timeline structure but with completed status
      ],
      certifications: [
        'Sustainable Farming',
        'Quality Assured',
        'Fresh Guarantee'
      ],
      sustainability: {
        carbonFootprint: '0.6 kg CO2e',
        packaging: 'Recyclable',
        waterUsage: '10 L/kg',
        energyEfficient: true
      }
    }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="w-72 bg-slate-900"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  const selectedShipmentData = shipments.find(s => s.id === selectedShipment);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'current': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-400 bg-gray-100';
      default: return 'text-gray-400 bg-gray-100';
    }
  };

  const getShipmentStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
      case 'in_transit': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'processing': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredShipments = shipments.filter(shipment => 
    shipment.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.farmer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Desktop Sidebar */}
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={false}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        userType="customer"
      />

      {/* Mobile Sidebar */}
      <FieldFairSidebar
        isCollapsed={false}
        isMobile={true}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        userType="customer"
      />

      {/* Main Content - Responsive to sidebar */}
      <div className={`flex-1 flex flex-col bg-gray-50 transition-all duration-500 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
      }`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">🚛 Supply Chain Tracking</h1>
                <p className="text-sm text-gray-600 mt-1 hidden sm:block">Track your products from farm to table</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search tracking ID, product..."
                  className="bg-transparent text-sm outline-none w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="flex h-full flex-col lg:flex-row">
            {/* Shipments List */}
            <div className="w-full lg:w-80 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 overflow-auto">
              <div className="p-4 lg:p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Shipments</h2>
                
                <div className="space-y-4">
                  {filteredShipments.map((shipment) => (
                    <div
                      key={shipment.id}
                      onClick={() => setSelectedShipment(shipment.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedShipment === shipment.id
                          ? 'border-emerald-300 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">{shipment.productImage}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900">{shipment.productName}</div>
                          <div className="text-sm text-gray-600">{shipment.trackingId}</div>
                          <div className="text-sm text-gray-500">{shipment.quantity}</div>
                          
                          <div className="mt-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getShipmentStatusColor(shipment.status)}`}>
                              {shipment.status === 'in_transit' ? 'In Transit' :
                               shipment.status === 'delivered' ? 'Delivered' :
                               shipment.status === 'processing' ? 'Processing' : 'Unknown'}
                            </span>
                          </div>
                          
                          {shipment.status === 'in_transit' && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${shipment.progress}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{shipment.progress}% complete</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tracking Details */}
            <div className="flex-1 overflow-auto">
              {selectedShipmentData ? (
                <div className="p-4 lg:p-6">
                  {/* Shipment Header */}
                  <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 lg:w-16 h-12 lg:h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                          <span className="text-2xl lg:text-3xl">{selectedShipmentData.productImage}</span>
                        </div>
                        <div>
                          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{selectedShipmentData.productName}</h2>
                          <p className="text-gray-600">Tracking ID: {selectedShipmentData.trackingId}</p>
                          <p className="text-gray-600">Quantity: {selectedShipmentData.quantity}</p>
                        </div>
                      </div>
                      
                      <div className="text-left lg:text-right">
                        <div className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium border ${getShipmentStatusColor(selectedShipmentData.status)}`}>
                          {selectedShipmentData.status === 'in_transit' ? 'In Transit' :
                           selectedShipmentData.status === 'delivered' ? 'Delivered' :
                           selectedShipmentData.status === 'processing' ? 'Processing' : 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          ETA: {new Date(selectedShipmentData.estimatedDelivery).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {selectedShipmentData.status === 'in_transit' && (
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Delivery Progress</span>
                          <span className="text-sm text-gray-500">{selectedShipmentData.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${selectedShipmentData.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Key Info Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Thermometer className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">Temperature</span>
                        </div>
                        <div className="text-lg font-bold text-blue-600">{selectedShipmentData.conditions.temperature}</div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Scale className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-700">Quality</span>
                        </div>
                        <div className="text-lg font-bold text-green-600">{selectedShipmentData.conditions.quality}</div>
                      </div>
                      
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Truck className="w-5 h-5 text-purple-600" />
                          <span className="text-sm font-medium text-gray-700">Vehicle</span>
                        </div>
                        <div className="text-lg font-bold text-purple-600">{selectedShipmentData.vehicle.plateNumber}</div>
                      </div>
                      
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-5 h-5 text-orange-600" />
                          <span className="text-sm font-medium text-gray-700">Location</span>
                        </div>
                        <div className="text-sm font-bold text-orange-600">{selectedShipmentData.currentLocation}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Timeline */}
                    <div className="xl:col-span-2">
                      <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Tracking Timeline</h3>
                        
                        <div className="space-y-6">
                          {selectedShipmentData.timeline.map((event, index) => (
                            <div key={event.id} className="relative">
                              {index < selectedShipmentData.timeline.length - 1 && (
                                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                              )}
                              
                              <div className="flex items-start space-x-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(event.status)}`}>
                                  <event.icon className="w-5 h-5" />
                                </div>
                                
                                <div className="flex-1">
                                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                                    <span className="text-sm text-gray-500">
                                      {new Date(event.timestamp).toLocaleString()}
                                    </span>
                                  </div>
                                  <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                                  <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                                  {event.details && (
                                    <p className="text-xs text-gray-400 mt-2 italic">{event.details}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Side Info */}
                    <div className="space-y-6">
                      {/* Farmer Info */}
                      <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Farmer Details</h3>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                              <span className="font-bold text-emerald-700">{selectedShipmentData.farmer.avatar}</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{selectedShipmentData.farmer.name}</div>
                              <div className="text-sm text-gray-600">{selectedShipmentData.farmer.farm}</div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span>{selectedShipmentData.farmer.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span>{selectedShipmentData.farmer.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Vehicle Info */}
                      <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium">{selectedShipmentData.vehicle.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Plate:</span>
                            <span className="font-medium">{selectedShipmentData.vehicle.plateNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Driver:</span>
                            <span className="font-medium">{selectedShipmentData.vehicle.driver}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Contact:</span>
                            <span className="font-medium">{selectedShipmentData.vehicle.driverPhone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
                        <div className="space-y-2">
                          {selectedShipmentData.certifications.map((cert, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Shield className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-700">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sustainability */}
                      <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sustainability</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Carbon Footprint:</span>
                            <span className="font-medium text-green-600">{selectedShipmentData.sustainability.carbonFootprint}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Packaging:</span>
                            <span className="font-medium">{selectedShipmentData.sustainability.packaging}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Water Usage:</span>
                            <span className="font-medium">{selectedShipmentData.sustainability.waterUsage}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                        <div className="space-y-3">
                          <button className="w-full flex items-center justify-center space-x-2 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                            <QrCode className="w-4 h-4" />
                            <span>View QR Code</span>
                          </button>
                          
                          <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <Download className="w-4 h-4" />
                            <span>Download Report</span>
                          </button>
                          
                          <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                            <Navigation className="w-4 h-4" />
                            <span>Track on Map</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Select a shipment to view tracking details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupplyChainTrackingPage;