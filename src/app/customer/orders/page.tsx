"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  Search,
  Filter,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  MapPin,
  Star,
  Phone,
  MessageCircle,
  Download,
  RefreshCw,
  AlertCircle,
  Eye,
  Calendar,
  DollarSign,
  Leaf,
  User,
  BarChart3, 
  ShoppingCart,
  Users,
  TrendingUp,
  Shield,
  Heart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sprout,
  History,
  QrCode,
  Bell,
  Route,
  Database,
  FileText,
  Camera,
  Navigation,
  Scan,
  Menu,
  X,
  ChevronDown,
  Zap,
  Target
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
  const [activeMenu, setActiveMenu] = useState('My Orders');
  const [mounted, setMounted] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['My Orders']);
  
  // Customer menu items
  const customerMenuItems: MenuItem[] = [
    { name: 'Marketplace', icon: Search, path: '/marketplace', active: false },
    { name: 'My Cart', icon: ShoppingCart, path: '/marketplace/cart', badge: '2' },
    { 
      name: 'My Orders', 
      icon: Package, 
      path: '/customer/orders',
      active: true,
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
        { name: 'Track Products', icon: Route, path: '/maps/supply-chain' }
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

  const menuItems = customerMenuItems;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const allItems = [...menuItems, ...generalItems];
      let foundItem = null;

      foundItem = allItems.find(item => pathname === item.path);
      
      if (!foundItem) {
        for (const item of allItems) {
          if (item.submenu) {
            const submenuItem = item.submenu.find(subItem => pathname === subItem.path || pathname.startsWith(subItem.path));
            if (submenuItem) {
              foundItem = item;
              setExpandedMenus(prev => 
                prev.includes(item.name) ? prev : [...prev, item.name]
              );
              break;
            }
          }
        }
      }

      if (!foundItem) {
        foundItem = allItems.find(item => pathname.startsWith(item.path));
      }

      if (foundItem) {
        setActiveMenu(foundItem.name);
      }
    }
  }, [pathname, mounted, menuItems, generalItems]);

  const handleMenuClick = (item: MenuItem) => {
    if (item.hasSubmenu && !isCollapsed) {
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

  if (!mounted) {
    return null;
  }

  const userInfo = {
    name: 'Nimal Perera',
    subtitle: 'Premium Customer • Colombo',
    avatar: 'NP',
    status: 'Active Member',
    statusColor: 'bg-blue-500'
  };

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
            {(isActive || hasActiveSubmenu) && !isCollapsed && !isSubmenu && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 rounded-xl animate-pulse"></div>
            )}
            
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

            {isCollapsed && !isSubmenu && (
              <div className="absolute left-full ml-3 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 whitespace-nowrap shadow-xl border border-slate-700">
                <div className="font-medium">{item.name}</div>
                {item.badge && (
                  <span className="inline-block mt-1 bg-orange-500 text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-800"></div>
              </div>
            )}
          </Link>
        </div>

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
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-blue-900/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          
          <div className="absolute bottom-10 right-6 opacity-5">
            <Leaf className="w-24 h-24 text-emerald-400 animate-pulse" />
          </div>
          <div className="absolute top-1/3 right-4 opacity-5">
            <Sprout className="w-16 h-16 text-emerald-300 animate-bounce" style={{animationDuration: '3s'}} />
          </div>
        </div>

        {isMobile && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl z-50 bg-slate-800/80 text-slate-300 lg:hidden hover:bg-slate-700 transition-all duration-300 backdrop-blur-sm border border-slate-700/50"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        
        <div className={cn(
          "border-b border-slate-700/50 relative z-10 backdrop-blur-sm",
          isCollapsed ? "p-4" : "px-6 py-6"
        )}>
          <div className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : ""
          )}>
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
        
        <div className="flex-1 relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="h-full py-6 overflow-y-auto transition-all duration-500 ease-in-out scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500"
          >
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
        
        {!isCollapsed && (
          <div className="p-4 border-t border-slate-700/50 relative z-10 backdrop-blur-sm">
            <div className="flex items-center bg-slate-800/30 rounded-xl p-3 backdrop-blur-sm border border-slate-700/30">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center relative ring-2 ring-slate-600/50">
                <span className="text-sm font-bold text-white">{userInfo.avatar}</span>
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

const CustomerOrdersPage = () => {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-001',
      orderDate: '2024-06-25T10:30:00',
      status: 'delivered',
      total: 2200,
      deliveryMethod: 'delivery',
      deliveryAddress: 'No. 45, Galle Road, Colombo 07',
      deliveryDate: '2024-06-26T14:30:00',
      items: [
        {
          id: 1,
          name: 'Organic Tomatoes',
          farmer: 'Ravi Mahathaya',
          quantity: 3,
          unit: 'kg',
          price: 300,
          image: '🍅',
          isOrganic: true
        },
        {
          id: 2,
          name: 'Fresh Carrots',
          farmer: 'Saman Silva',
          quantity: 2,
          unit: 'kg',
          price: 250,
          image: '🥕',
          isOrganic: true
        }
      ],
      farmer: {
        name: 'Multiple Farmers',
        phone: '',
        location: 'Various'
      },
      rating: 5,
      review: 'Excellent quality vegetables! Fresh and tasty.',
      trackingNumber: 'FF2024001'
    },
    {
      id: 'ORD-2024-002',
      orderDate: '2024-06-23T15:45:00',
      status: 'pending',
      total: 1600,
      deliveryMethod: 'pickup',
      deliveryAddress: 'Farm pickup - Matale',
      deliveryDate: null,
      items: [
        {
          id: 3,
          name: 'Green Beans',
          farmer: 'Nimal Gunasekara',
          quantity: 4,
          unit: 'kg',
          price: 400,
          image: '🫘',
          isOrganic: true
        }
      ],
      farmer: {
        name: 'Nimal Gunasekara',
        phone: '078-444-5566',
        location: 'Nuwara Eliya'
      },
      rating: null,
      review: null,
      trackingNumber: 'FF2024002'
    },
    {
      id: 'ORD-2024-003',
      orderDate: '2024-06-20T09:15:00',
      status: 'processing',
      total: 950,
      deliveryMethod: 'delivery',
      deliveryAddress: 'No. 123, Kandy Road, Kurunegala',
      deliveryDate: null,
      items: [
        {
          id: 4,
          name: 'Red Onions',
          farmer: 'Priyantha Fernando',
          quantity: 2,
          unit: 'kg',
          price: 220,
          image: '🧄',
          isOrganic: false
        },
        {
          id: 5,
          name: 'Green Cabbage',
          farmer: 'Kamala Jayawardena',
          quantity: 3,
          unit: 'kg',
          price: 180,
          image: '🥬',
          isOrganic: false
        }
      ],
      farmer: {
        name: 'Multiple Farmers',
        phone: '',
        location: 'Various'
      },
      rating: null,
      review: null,
      trackingNumber: 'FF2024003'
    },
    {
      id: 'ORD-2024-004',
      orderDate: '2024-06-18T11:20:00',
      status: 'cancelled',
      total: 1050,
      deliveryMethod: 'delivery',
      deliveryAddress: 'No. 67, Main Street, Gampaha',
      deliveryDate: null,
      items: [
        {
          id: 6,
          name: 'Sweet Corn',
          farmer: 'Ruwan Perera',
          quantity: 7,
          unit: 'kg',
          price: 150,
          image: '🌽',
          isOrganic: false
        }
      ],
      farmer: {
        name: 'Ruwan Perera',
        phone: '075-111-2233',
        location: 'Badulla'
      },
      rating: null,
      review: null,
      trackingNumber: 'FF2024004',
      cancellationReason: 'Product unavailable'
    }
  ]);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ready': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <RefreshCw className="w-4 h-4" />;
      case 'ready': return <Package className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         order.farmer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const orderCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  const handleReorder = (orderId: string) => {
    console.log('Reordering:', orderId);
  };

  const handleContactFarmer = (phone: string) => {
    if (phone) {
      console.log('Calling farmer:', phone);
    }
  };

  const handleRateOrder = (orderId: string) => {
    console.log('Rating order:', orderId);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={false}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="customer"
      />

      {/* Mobile Sidebar */}
      <FieldFairSidebar
        isCollapsed={false}
        isMobile={true}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="customer"
      />

      {/* Main Content - Responsive to sidebar */}
      <div className={`flex-1 transition-all duration-500 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 mr-2"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">📦 My Orders</h1>
                    <p className="text-sm text-gray-600 mt-1 hidden sm:block">Track and manage your orders</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-3 min-w-[300px]">
                  <Search className="w-5 h-5 text-gray-500 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Search orders..."
                    className="bg-transparent text-sm outline-none flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <button
                  onClick={() => router.push('/marketplace')}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  Shop More
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4 lg:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {[
              { key: 'all', label: 'Total Orders', color: 'bg-gray-50 text-gray-900' },
              { key: 'pending', label: 'Pending', color: 'bg-orange-50 text-orange-900' },
              { key: 'processing', label: 'Processing', color: 'bg-blue-50 text-blue-900' },
              { key: 'delivered', label: 'Delivered', color: 'bg-green-50 text-green-900' },
              { key: 'cancelled', label: 'Cancelled', color: 'bg-red-50 text-red-900' }
            ].map((stat) => (
              <button
                key={stat.key}
                onClick={() => setSelectedFilter(stat.key)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedFilter === stat.key 
                    ? 'border-emerald-300 bg-emerald-50' 
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {orderCounts[stat.key as keyof typeof orderCounts]}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{order.id}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Ordered {new Date(order.orderDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>Rs. {order.total.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Truck className="w-4 h-4" />
                            <span className="capitalize">{order.deliveryMethod}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </span>
                      
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Items */}
                    <div className="lg:col-span-2">
                      <h4 className="font-medium text-gray-900 mb-3">Order Items ({order.items.length})</h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center relative">
                              <span className="text-2xl">{item.image}</span>
                              {item.isOrganic && (
                                <Leaf className="w-3 h-3 text-green-500 absolute -top-1 -right-1" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-600">{item.farmer}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-gray-900">{item.quantity} {item.unit}</div>
                              <div className="text-sm text-gray-600">Rs. {(item.quantity * item.price).toLocaleString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Delivery Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                            <div>
                              <div className="font-medium text-gray-900">
                                {order.deliveryMethod === 'delivery' ? 'Delivery Address' : 'Pickup Location'}
                              </div>
                              <div className="text-gray-600">{order.deliveryAddress}</div>
                            </div>
                          </div>
                          {order.deliveryDate && (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-gray-600">
                                Delivered on {new Date(order.deliveryDate).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {order.trackingNumber && (
                            <div className="flex items-center space-x-2">
                              <Package className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-600">Tracking: {order.trackingNumber}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Farmer Contact */}
                      {order.farmer.phone && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Farmer Contact</h4>
                          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <User className="w-4 h-4 text-emerald-600" />
                              <span className="font-medium text-emerald-900">{order.farmer.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-emerald-600" />
                              <span className="text-emerald-800 text-sm">{order.farmer.location}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Order Rating */}
                      {order.status === 'delivered' && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Your Review</h4>
                          {order.rating ? (
                            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                              <div className="flex items-center space-x-1 mb-2">
                                {[1,2,3,4,5].map(i => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i <= order.rating! 
                                        ? 'text-yellow-400 fill-current' 
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              {order.review && (
                                <p className="text-sm text-gray-700 italic">"{order.review}"</p>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => handleRateOrder(order.id)}
                              className="w-full border-2 border-dashed border-gray-300 text-gray-600 py-3 rounded-lg hover:border-emerald-300 hover:text-emerald-600 transition-colors"
                            >
                              Rate this order
                            </button>
                          )}
                        </div>
                      )}

                      {/* Cancellation Reason */}
                      {order.status === 'cancelled' && order.cancellationReason && (
                        <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="font-medium text-red-900">Order Cancelled</span>
                          </div>
                          <p className="text-sm text-red-700">{order.cancellationReason}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-4 mt-6 border-t border-gray-100 gap-4">
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <button
                        onClick={() => handleReorder(order.id)}
                        className="border border-emerald-600 text-emerald-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors flex-1 sm:flex-none"
                      >
                        Reorder
                      </button>
                      
                      {order.farmer.phone && (
                        <button
                          onClick={() => handleContactFarmer(order.farmer.phone)}
                          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-1 flex-1 sm:flex-none"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Contact Farmer</span>
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-600 hover:text-gray-800 p-2 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 p-2 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No orders found.</p>
              <p className="text-gray-400 text-sm mt-2">
                {selectedFilter === 'all' 
                  ? "You haven't placed any orders yet." 
                  : `No ${selectedFilter} orders found.`}
              </p>
              <button
                onClick={() => router.push('/marketplace')}
                className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomerOrdersPage;