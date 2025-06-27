"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  BarChart3, 
  Package, 
  ShoppingCart,
  Users,
  TrendingUp,
  MapPin,
  Leaf,
  Settings,
  Shield,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Search,
  Heart,
  History,
  QrCode,
  Star,
  User,
  Bell,
  Eye,
  Route,
  Calendar,
  Phone,
  MessageCircle,
  Award,
  Truck,
  Globe,
  Zap,
  Target,
  Database,
  FileText,
  Camera,
  Navigation,
  Scan,
  Menu,
  X,
  Plus,
  CreditCard,
  Map,
  UserCheck,
  Building,
  Wallet,
  PieChart,
  Activity,
  Boxes,
  ShoppingBag,
  Store,
  Clipboard,
  Clock,
  CheckCircle,
  RotateCcw,
  Edit,
  Trash2
} from 'lucide-react';

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
  const [activeMenu, setActiveMenu] = useState('');
  const [mounted, setMounted] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  
  // Farmer menu items
  const farmerMenuItems: MenuItem[] = [
    { 
      name: 'Dashboard', 
      icon: LayoutGrid, 
      path: '/farmer/dashboard' 
    },
    { 
      name: 'My Products', 
      icon: Package, 
      path: '/farmer/products',
      hasSubmenu: true,
      submenu: [
        { name: 'All Products', icon: Package, path: '/farmer/products' },
        { name: 'Add Product', icon: Plus, path: '/farmer/products/add' },
        { name: 'Inventory', icon: Database, path: '/farmer/products/inventory' },
        { name: 'Categories', icon: Boxes, path: '/farmer/products/categories' }
      ]
    },
    { 
      name: 'Orders', 
      icon: ShoppingCart, 
      path: '/farmer/orders',
      badge: '3',
      hasSubmenu: true,
      submenu: [
        { name: 'Pending Orders', icon: Clock, path: '/farmer/orders/pending' },
        { name: 'Processing', icon: Package, path: '/farmer/orders/processing' },
        { name: 'Completed', icon: CheckCircle, path: '/farmer/orders/completed' },
        { name: 'Cancelled', icon: X, path: '/farmer/orders/cancelled' }
      ]
    },
    { 
      name: 'Analytics', 
      icon: BarChart3, 
      path: '/farmer/analytics',
      hasSubmenu: true,
      submenu: [
        { name: 'Sales Overview', icon: TrendingUp, path: '/farmer/analytics/sales' },
        { name: 'Revenue Reports', icon: Wallet, path: '/farmer/analytics/revenue' },
        { name: 'Customer Insights', icon: Users, path: '/farmer/analytics/customers' },
        { name: 'Product Performance', icon: PieChart, path: '/farmer/analytics/products' }
      ]
    },
    { 
      name: 'Customers', 
      icon: Users, 
      path: '/farmer/customers',
      hasSubmenu: true,
      submenu: [
        { name: 'All Customers', icon: Users, path: '/farmer/customers' },
        { name: 'Regular Buyers', icon: UserCheck, path: '/farmer/customers/regular' },
        { name: 'Customer Reviews', icon: Star, path: '/farmer/customers/reviews' }
      ]
    },
    { 
      name: 'Farm Management', 
      icon: Building, 
      path: '/farmer/location',
      hasSubmenu: true,
      submenu: [
        { name: 'Farm Location', icon: MapPin, path: '/farmer/location' },
        { name: 'QR Generator', icon: QrCode, path: '/maps/qr' },
        { name: 'Supply Chain', icon: Truck, path: '/maps/supply-chain' },
        { name: 'Farm Details', icon: Building, path: '/farmer/farm-details' }
      ]
    }
  ];

  // Customer menu items
  const customerMenuItems: MenuItem[] = [
    { 
      name: 'Marketplace', 
      icon: Store, 
      path: '/marketplace'
    },
    { 
      name: 'My Cart', 
      icon: ShoppingCart, 
      path: '/marketplace/cart', 
      badge: '2' 
    },
    { 
      name: 'My Orders', 
      icon: Package, 
      path: '/customer/orders',
      hasSubmenu: true,
      submenu: [
        { name: 'Current Orders', icon: Package, path: '/customer/orders' },
        { name: 'Order History', icon: History, path: '/customer/history' },
        { name: 'Track Orders', icon: Route, path: '/customer/orders/tracking' },
        { name: 'Returns', icon: RotateCcw, path: '/customer/orders/returns' }
      ]
    },
    { 
      name: 'Favorites', 
      icon: Heart, 
      path: '/customer/favorites' 
    },
    { 
      name: 'Discover', 
      icon: Search, 
      path: '/maps/farms',
      hasSubmenu: true,
      submenu: [
        { name: 'Find Farms', icon: MapPin, path: '/maps/farms' },
        { name: 'QR Scanner', icon: QrCode, path: '/customer/qr-scanner' },
        { name: 'Track Products', icon: Route, path: '/maps/supply-chain' },
        { name: 'Farm Visits', icon: Calendar, path: '/customer/farm-visits' }
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
        { name: 'Chat Assistant', icon: MessageCircle, path: '/ai/chatbot' },
        { name: 'Smart Shopping', icon: ShoppingBag, path: '/ai/smart-shopping' }
      ]
    }
  ];
  
  // General/Account items (same for both)
  const getGeneralItems = (): MenuItem[] => [
    { 
      name: 'Profile', 
      icon: User, 
      path: `/${userType}/profile`,
      hasSubmenu: true,
      submenu: [
        { name: 'My Profile', icon: User, path: `/${userType}/profile` },
        { name: 'Settings', icon: Settings, path: `/${userType}/settings` },
        { name: 'Notifications', icon: Bell, path: `/${userType}/notifications` },
        { name: 'Privacy', icon: Shield, path: `/${userType}/privacy` }
      ]
    }
  ];

  // Choose menu items based on user type
  const menuItems = userType === 'farmer' ? farmerMenuItems : customerMenuItems;
  const generalItems = getGeneralItems();

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set active menu based on current path
  useEffect(() => {
    if (mounted) {
      const allItems = [...menuItems, ...generalItems];
      let foundItem = null;

      // First, check for exact matches
      foundItem = allItems.find(item => pathname === item.path);
      
      // If no exact match, check submenus
      if (!foundItem) {
        for (const item of allItems) {
          if (item.submenu) {
            const submenuItem = item.submenu.find(subItem => 
              pathname === subItem.path || pathname.startsWith(subItem.path + '/')
            );
            if (submenuItem) {
              foundItem = item;
              // Auto-expand parent menu if submenu item is active
              setExpandedMenus(prev => 
                prev.includes(item.name) ? prev : [...prev, item.name]
              );
              break;
            }
          }
        }
      }

      // If still no match, check for path prefixes
      if (!foundItem) {
        foundItem = allItems.find(item => 
          pathname.startsWith(item.path + '/') || pathname.startsWith(item.path)
        );
      }

      if (foundItem) {
        setActiveMenu(foundItem.name);
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
    if (userType === 'farmer') {
      return {
        name: 'Ravi Mahathaya',
        subtitle: 'Organic Farmer • Kurunegala',
        avatar: 'RM',
        status: 'Verified Organic',
        statusColor: 'bg-emerald-500'
      };
    } else {
      return {
        name: 'Nimal Perera',
        subtitle: 'Premium Customer • Colombo',
        avatar: 'NP',
        status: 'Active Member',
        statusColor: 'bg-blue-500'
      };
    }
  };

  const userInfo = getUserInfo();

  const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

  const renderMenuItem = (item: MenuItem, isSubmenu = false) => {
    const isActive = activeMenu === item.name || 
                    (item.submenu && item.submenu.some(subItem => 
                      pathname === subItem.path || pathname.startsWith(subItem.path + '/')
                    ));
    const isExpanded = expandedMenus.includes(item.name);
    const hasActiveSubmenu = item.submenu && item.submenu.some(subItem => 
      pathname === subItem.path || pathname.startsWith(subItem.path + '/')
    );

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
                  pathname === subItem.path || pathname.startsWith(subItem.path + '/')
                    ? 'bg-gradient-to-r from-emerald-400/30 to-emerald-500/30 text-white backdrop-blur-sm'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white hover:pl-6'
                )}
              >
                <subItem.icon className="w-4 h-4 mr-3 transition-transform duration-300 group-hover:scale-110" />
                <span className="transition-all duration-300">{subItem.name}</span>
                
                {/* Submenu active indicator */}
                {(pathname === subItem.path || pathname.startsWith(subItem.path + '/')) && (
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
                <div className="text-xs text-emerald-300/80 font-medium">
                  {userType === 'farmer' ? 'Farmer Dashboard' : 'Customer Portal'}
                </div>
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
                  {userType === 'farmer' ? '🌱 FARM MANAGEMENT' : '🛒 MARKETPLACE'}
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
                {userType === 'farmer' && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Award className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
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

export default FieldFairSidebar;