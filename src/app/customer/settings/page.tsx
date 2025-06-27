"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  Shield,
  Bell,
  Eye,
  Moon,
  Globe,
  Download,
  Trash2,
  Key,
  Smartphone,
  Mail,
  AlertTriangle,
  Check,
  Settings,
  Lock,
  Database,
  FileText,
  HelpCircle,
  LogOut,
  Save,
  Search,
  MapPin,
  Star,
  Leaf,
  Heart,
  ShoppingCart,
  Package,
  Phone,
  MessageCircle,
  BarChart3, 
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sprout,
  History,
  QrCode,
  User,
  Route,
  Camera,
  Navigation,
  Scan,
  Menu,
  X,
  Zap,
  Target,
  TrendingUp
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
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Profile']); // Auto-expand Profile
  
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
      hasSubmenu: true,
      active: true,
      submenu: [
        { name: 'My Profile', icon: User, path: '/customer/profile' },
        { name: 'Settings', icon: Settings, path: '/customer/settings' },
        { name: 'Notifications', icon: Bell, path: '/customer/notifications' }
      ]
    }
  ];

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set active menu based on current path
  useEffect(() => {
    if (mounted) {
      const allItems = [...customerMenuItems, ...generalItems];
      let foundItem = null;

      // Check if we're in settings
      if (pathname?.includes('/customer/settings')) {
        setActiveMenu('Profile');
        if (!expandedMenus.includes('Profile')) {
          setExpandedMenus(prev => [...prev, 'Profile']);
        }
        return;
      }

      // First, check for exact matches
      foundItem = allItems.find(item => pathname === item.path);
      
      // If no exact match, check submenus
      if (!foundItem) {
        for (const item of allItems) {
          if (item.submenu) {
            const submenuItem = item.submenu.find(subItem => pathname === subItem.path || pathname?.startsWith(subItem.path));
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
        foundItem = allItems.find(item => pathname?.startsWith(item.path));
      }

      if (foundItem) {
        setActiveMenu(foundItem.name);
      }
    }
  }, [pathname, mounted]);

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
                    (item.submenu && item.submenu.some(subItem => pathname === subItem.path || pathname?.startsWith(subItem.path)));
    const isExpanded = expandedMenus.includes(item.name);
    const hasActiveSubmenu = item.submenu && item.submenu.some(subItem => pathname === subItem.path || pathname?.startsWith(subItem.path));

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
                  pathname === subItem.path || pathname?.startsWith(subItem.path)
                    ? 'bg-gradient-to-r from-emerald-400/30 to-emerald-500/30 text-white backdrop-blur-sm'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white hover:pl-6'
                )}
              >
                <subItem.icon className="w-4 h-4 mr-3 transition-transform duration-300 group-hover:scale-110" />
                <span className="transition-all duration-300">{subItem.name}</span>
                
                {/* Submenu active indicator */}
                {(pathname === subItem.path || pathname?.startsWith(subItem.path)) && (
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
                {customerMenuItems.map((item) => renderMenuItem(item))}
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

// Main Settings Component
const CustomerSettingsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('security');
  const [hasChanges, setHasChanges] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    security: {
      twoFactorEnabled: false,
      loginNotifications: true,
      sessionTimeout: 30,
      deviceTrust: true
    },
    privacy: {
      profileVisibility: 'private',
      activitySharing: false,
      dataCollection: true,
      thirdPartySharing: false,
      locationTracking: true
    },
    notifications: {
      email: {
        orderUpdates: true,
        promotions: false,
        newProducts: true,
        priceAlerts: true,
        newsletter: false
      },
      push: {
        orderUpdates: true,
        promotions: false,
        newProducts: false,
        priceAlerts: true,
        marketing: false
      },
      sms: {
        orderUpdates: true,
        promotions: false,
        security: true
      }
    },
    app: {
      theme: 'light',
      language: 'en',
      currency: 'LKR',
      autoSync: true,
      offlineMode: true,
      compression: true
    }
  });

  const tabs = [
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'app', label: 'App Settings', icon: Settings },
    { id: 'data', label: 'Data & Storage', icon: Database }
  ];

  useEffect(() => {
    setMounted(true);
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

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const updateNestedSetting = (category: string, subcategory: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [subcategory]: {
          ...(prev[category as keyof typeof prev] as any)[subcategory],
          [key]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // In real app, save to backend
  };

  const resetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default settings
      setHasChanges(false);
    }
  };

  const exportData = () => {
    console.log('Exporting user data...');
    // In real app, generate and download user data export
  };

  const deleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
      // In real app, initiate account deletion process
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
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
      <div className={`flex-1 flex flex-col transition-all duration-500 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">⚙️ Settings</h1>
                <p className="text-sm text-gray-600 mt-1 hidden sm:block">Manage your account preferences and security</p>
              </div>
            </div>
            
            {hasChanges && (
              <button
                onClick={saveSettings}
                className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">Save Changes</span>
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-2 lg:space-x-8 px-4 lg:px-6 overflow-x-auto">
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
                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">🔒 Account Security</h3>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                            <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {settings.security.twoFactorEnabled && (
                              <span className="text-green-600 text-sm font-medium">Enabled</span>
                            )}
                            <input
                              type="checkbox"
                              checked={settings.security.twoFactorEnabled}
                              onChange={(e) => updateSetting('security', 'twoFactorEnabled', e.target.checked)}
                              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">Login Notifications</div>
                            <div className="text-sm text-gray-600">Get notified when someone logs into your account</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.security.loginNotifications}
                            onChange={(e) => updateSetting('security', 'loginNotifications', e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                            <div>
                              <div className="font-medium text-gray-900">Session Timeout</div>
                              <div className="text-sm text-gray-600">Automatically log out after period of inactivity</div>
                            </div>
                            <select
                              value={settings.security.sessionTimeout}
                              onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full lg:w-auto"
                            >
                              <option value={15}>15 minutes</option>
                              <option value={30}>30 minutes</option>
                              <option value={60}>1 hour</option>
                              <option value={120}>2 hours</option>
                              <option value={0}>Never</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                          <button className="border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                            <Key className="w-4 h-4" />
                            <span>Change Password</span>
                          </button>
                          
                          <button className="border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                            <Smartphone className="w-4 h-4" />
                            <span>Manage Devices</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">⚠️ Danger Zone</h3>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                          <div className="flex-1">
                            <div className="font-medium text-red-900">Delete Account</div>
                            <div className="text-sm text-red-700 mt-1">
                              Once you delete your account, there is no going back. Please be certain.
                            </div>
                            <button
                              onClick={deleteAccount}
                              className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                            >
                              Delete Account
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">🔐 Privacy Controls</h3>
                      <div className="space-y-4">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-gray-200 rounded-lg gap-3">
                          <div>
                            <div className="font-medium text-gray-900">Profile Visibility</div>
                            <div className="text-sm text-gray-600">Control who can see your profile information</div>
                          </div>
                          <select
                            value={settings.privacy.profileVisibility}
                            onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full lg:w-auto"
                          >
                            <option value="public">Public</option>
                            <option value="farmers">Farmers Only</option>
                            <option value="private">Private</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">Activity Sharing</div>
                            <div className="text-sm text-gray-600">Share your purchase activity with other users</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.privacy.activitySharing}
                            onChange={(e) => updateSetting('privacy', 'activitySharing', e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">Data Collection</div>
                            <div className="text-sm text-gray-600">Allow us to collect usage data to improve the app</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.privacy.dataCollection}
                            onChange={(e) => updateSetting('privacy', 'dataCollection', e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">Third-party Sharing</div>
                            <div className="text-sm text-gray-600">Share data with trusted partners for better recommendations</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.privacy.thirdPartySharing}
                            onChange={(e) => updateSetting('privacy', 'thirdPartySharing', e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">Location Tracking</div>
                            <div className="text-sm text-gray-600">Use your location to find nearby farms and products</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.privacy.locationTracking}
                            onChange={(e) => updateSetting('privacy', 'locationTracking', e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-8">
                    {/* Email Notifications */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">📧 Email Notifications</h3>
                      <div className="space-y-3">
                        {Object.entries(settings.notifications.email).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => updateNestedSetting('notifications', 'email', key, e.target.checked)}
                              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">🔔 Push Notifications</h3>
                      <div className="space-y-3">
                        {Object.entries(settings.notifications.push).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => updateNestedSetting('notifications', 'push', key, e.target.checked)}
                              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SMS Notifications */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">📱 SMS Notifications</h3>
                      <div className="space-y-3">
                        {Object.entries(settings.notifications.sms).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => updateNestedSetting('notifications', 'sms', key, e.target.checked)}
                              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* App Settings Tab */}
                {activeTab === 'app' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">🎨 Appearance & Language</h3>
                      <div className="space-y-4">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-gray-200 rounded-lg gap-3">
                          <div>
                            <div className="font-medium text-gray-900">Theme</div>
                            <div className="text-sm text-gray-600">Choose your preferred app appearance</div>
                          </div>
                          <select
                            value={settings.app.theme}
                            onChange={(e) => updateSetting('app', 'theme', e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full lg:w-auto"
                          >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="system">System</option>
                          </select>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-gray-200 rounded-lg gap-3">
                          <div>
                            <div className="font-medium text-gray-900">Language</div>
                            <div className="text-sm text-gray-600">Select your preferred language</div>
                          </div>
                          <select
                            value={settings.app.language}
                            onChange={(e) => updateSetting('app', 'language', e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full lg:w-auto"
                          >
                            <option value="en">English</option>
                            <option value="si">සිංහල</option>
                            <option value="ta">தமிழ்</option>
                          </select>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-gray-200 rounded-lg gap-3">
                          <div>
                            <div className="font-medium text-gray-900">Currency</div>
                            <div className="text-sm text-gray-600">Display prices in your preferred currency</div>
                          </div>
                          <select
                            value={settings.app.currency}
                            onChange={(e) => updateSetting('app', 'currency', e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full lg:w-auto"
                          >
                            <option value="LKR">Sri Lankan Rupee (LKR)</option>
                            <option value="USD">US Dollar (USD)</option>
                            <option value="EUR">Euro (EUR)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">⚡ Performance</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">Auto Sync</div>
                            <div className="text-sm text-gray-600">Automatically sync data when connected</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.app.autoSync}
                            onChange={(e) => updateSetting('app', 'autoSync', e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">Offline Mode</div>
                            <div className="text-sm text-gray-600">Cache content for offline viewing</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.app.offlineMode}
                            onChange={(e) => updateSetting('app', 'offlineMode', e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">Image Compression</div>
                            <div className="text-sm text-gray-600">Reduce data usage with compressed images</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={settings.app.compression}
                            onChange={(e) => updateSetting('app', 'compression', e.target.checked)}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data & Storage Tab */}
                {activeTab === 'data' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">💾 Data Management</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <button
                          onClick={exportData}
                          className="border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export My Data</span>
                        </button>

                        <button className="border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                          <Trash2 className="w-4 h-4" />
                          <span>Clear Cache</span>
                        </button>

                        <button className="border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span>Privacy Policy</span>
                        </button>

                        <button className="border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                          <HelpCircle className="w-4 h-4" />
                          <span>Help & Support</span>
                        </button>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">🔄 Account Actions</h3>
                      <div className="space-y-3">
                        <button
                          onClick={resetSettings}
                          className="w-full border border-orange-300 text-orange-700 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                        >
                          Reset All Settings
                        </button>

                        <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
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

export default CustomerSettingsPage;