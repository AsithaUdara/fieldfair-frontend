"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  User,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Camera,
  Edit,
  Save,
  Plus,
  Trash2,
  Check,
  Star,
  Package,
  Heart,
  Phone,
  Mail,
  Home,
  Calendar,
  Search,
  History,
  QrCode,
  Route,
  Zap,
  Target,
  TrendingUp,
  MessageCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sprout,
  ChevronDown,
  Leaf,
  ShoppingCart,
  Menu,
  X
} from 'lucide-react';

// Modern Sidebar Component (embedded)
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
  const [activeMenu, setActiveMenu] = useState('Profile');
  const [mounted, setMounted] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  
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
      active: true,
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

      // First, check for exact matches
      foundItem = allItems.find(item => pathname === item.path);
      
      // If no exact match, check submenus
      if (!foundItem) {
        for (const item of allItems) {
          if (item.submenu) {
            const submenuItem = item.submenu.find(subItem => pathname === subItem.path || pathname.startsWith(subItem.path));
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
        foundItem = allItems.find(item => pathname.startsWith(item.path));
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

// Main Customer Profile Component
const CustomerProfilePage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    personal: {
      firstName: 'Nimal',
      lastName: 'Perera',
      email: 'nimal.perera@email.com',
      phone: '+94 77 123 4567',
      dateOfBirth: '1985-06-15',
      gender: 'male',
      joinedDate: '2023-01-15',
      avatar: 'NP'
    },
    addresses: [
      {
        id: 1,
        type: 'home',
        label: 'Home',
        address: 'No. 45, Galle Road',
        city: 'Colombo',
        district: 'Colombo',
        postalCode: '00700',
        isDefault: true
      },
      {
        id: 2,
        type: 'work',
        label: 'Office',
        address: 'No. 123, Union Place',
        city: 'Colombo',
        district: 'Colombo',
        postalCode: '00200',
        isDefault: false
      }
    ],
    paymentMethods: [
      {
        id: 1,
        type: 'card',
        label: 'Visa ****4532',
        expiryDate: '12/26',
        isDefault: true
      },
      {
        id: 2,
        type: 'mobile',
        label: 'Dialog Pay',
        phone: '+94 77 123 4567',
        isDefault: false
      }
    ],
    preferences: {
      organic: true,
      local: true,
      maxDistance: 15,
      priceRange: 'medium',
      notifications: {
        orderUpdates: true,
        promotions: true,
        newFarmers: false,
        priceAlerts: true
      }
    },
    stats: {
      totalOrders: 24,
      totalSpent: 18500,
      favoriteProducts: 12,
      reviews: 8
    }
  });

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Bell }
  ];

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

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving profile data:', userData);
  };

  const addAddress = () => {
    const newAddress = {
      id: Date.now(),
      type: 'other',
      label: 'New Address',
      address: '',
      city: '',
      district: '',
      postalCode: '',
      isDefault: false
    };
    setUserData(prev => ({
      ...prev,
      addresses: [...prev.addresses, newAddress]
    }));
  };

  const removeAddress = (addressId: number) => {
    setUserData(prev => ({
      ...prev,
      addresses: prev.addresses.filter(addr => addr.id !== addressId)
    }));
  };

  const setDefaultAddress = (addressId: number) => {
    setUserData(prev => ({
      ...prev,
      addresses: prev.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Modern Sidebar */}
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="customer"
      />

      {/* Main Content - Responsive to sidebar */}
      <div className={`flex-1 flex flex-col bg-gray-50 transition-all duration-500 ${
        isMobile ? 'ml-0' : (sidebarCollapsed ? 'ml-20' : 'ml-72')
      }`}>
        {/* Enhanced Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-sm text-gray-600 mt-1 hidden sm:block">Manage your account information and preferences</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">Save Changes</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Profile Header */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 mb-6 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-0 lg:space-x-6">
                <div className="relative flex justify-center lg:justify-start">
                  <div className="w-20 lg:w-24 h-20 lg:h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-xl lg:text-2xl font-bold text-emerald-700">{userData.personal.avatar}</span>
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {userData.personal.firstName} {userData.personal.lastName}
                  </h2>
                  <p className="text-gray-600">{userData.personal.email}</p>
                  <div className="flex items-center justify-center lg:justify-start space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Joined {new Date(userData.personal.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <div className="text-center p-3 bg-emerald-50 rounded-lg">
                    <div className="text-xl lg:text-2xl font-bold text-emerald-600">{userData.stats.totalOrders}</div>
                    <div className="text-xs lg:text-sm text-gray-600">Orders</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl lg:text-2xl font-bold text-blue-600">{userData.stats.reviews}</div>
                    <div className="text-xs lg:text-sm text-gray-600">Reviews</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-xl lg:text-2xl font-bold text-yellow-600">{userData.stats.favoriteProducts}</div>
                    <div className="text-xs lg:text-sm text-gray-600">Favorites</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg lg:text-xl font-bold text-purple-600">Rs. {userData.stats.totalSpent.toLocaleString()}</div>
                    <div className="text-xs lg:text-sm text-gray-600">Total Spent</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="border-b border-gray-200 overflow-x-auto">
                <nav className="flex space-x-4 lg:space-x-8 px-4 lg:px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-4 lg:p-6">
                {/* Personal Info Tab */}
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          value={userData.personal.firstName}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, firstName: e.target.value }
                          }))}
                          disabled={!isEditing}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={userData.personal.lastName}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, lastName: e.target.value }
                          }))}
                          disabled={!isEditing}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={userData.personal.email}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, email: e.target.value }
                          }))}
                          disabled={!isEditing}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={userData.personal.phone}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, phone: e.target.value }
                          }))}
                          disabled={!isEditing}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        <input
                          type="date"
                          value={userData.personal.dateOfBirth}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, dateOfBirth: e.target.value }
                          }))}
                          disabled={!isEditing}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <select
                          value={userData.personal.gender}
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, gender: e.target.value }
                          }))}
                          disabled={!isEditing}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer_not_to_say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Addresses Tab */}
                {activeTab === 'addresses' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Delivery Addresses</h3>
                      <button
                        onClick={addAddress}
                        className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add Address</span>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {userData.addresses.map((address) => (
                        <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Home className="w-4 h-4 text-gray-500" />
                              <span className="font-medium text-gray-900">{address.label}</span>
                              {address.isDefault && (
                                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full font-medium">
                                  Default
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => removeAddress(address.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-600">
                            <div>{address.address}</div>
                            <div>{address.city}, {address.district}</div>
                            <div>Postal Code: {address.postalCode}</div>
                          </div>
                          
                          {!address.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(address.id)}
                              className="mt-3 text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
                            >
                              Set as Default
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Methods Tab */}
                {activeTab === 'payment' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
                      <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add Payment Method</span>
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {userData.paymentMethods.map((method) => (
                        <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <CreditCard className="w-6 h-6 text-gray-500" />
                              <div>
                                <div className="font-medium text-gray-900">{method.label}</div>
                                {method.expiryDate && (
                                  <div className="text-sm text-gray-600">Expires {method.expiryDate}</div>
                                )}
                                {method.phone && (
                                  <div className="text-sm text-gray-600">{method.phone}</div>
                                )}
                              </div>
                              {method.isDefault && (
                                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full font-medium">
                                  Default
                                </span>
                              )}
                            </div>
                            <button className="text-red-500 hover:text-red-700 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === 'preferences' && (
                  <div className="space-y-8">
                    {/* Shopping Preferences */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Shopping Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Prefer Organic Products</div>
                            <div className="text-sm text-gray-600">Show organic products first in search results</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={userData.preferences.organic}
                            onChange={(e) => setUserData(prev => ({
                              ...prev,
                              preferences: { ...prev.preferences, organic: e.target.checked }
                            }))}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">Local Products Priority</div>
                            <div className="text-sm text-gray-600">Prioritize products from nearby farms</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={userData.preferences.local}
                            onChange={(e) => setUserData(prev => ({
                              ...prev,
                              preferences: { ...prev.preferences, local: e.target.checked }
                            }))}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                        </div>
                        
                        <div>
                          <div className="font-medium text-gray-900 mb-2">Maximum Distance</div>
                          <select
                            value={userData.preferences.maxDistance}
                            onChange={(e) => setUserData(prev => ({
                              ...prev,
                              preferences: { ...prev.preferences, maxDistance: parseInt(e.target.value) }
                            }))}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          >
                            <option value={5}>5 km</option>
                            <option value={10}>10 km</option>
                            <option value={15}>15 km</option>
                            <option value={25}>25 km</option>
                            <option value={50}>50 km</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Notifications */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
                      <div className="space-y-4">
                        {Object.entries(userData.preferences.notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => setUserData(prev => ({
                                ...prev,
                                preferences: {
                                  ...prev.preferences,
                                  notifications: {
                                    ...prev.preferences.notifications,
                                    [key]: e.target.checked
                                  }
                                }
                              }))}
                              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerProfilePage;