'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search,
  Filter,
  MapPin,
  Star,
  Leaf,
  Shield,
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  Grid3X3,
  List,
  TrendingUp,
  Clock,
  Award,
  Eye,
  ChevronDown,
  Zap,
  Target,
  Sparkles,
  Truck,
  Timer,
  ThumbsUp,
  Users,
  Calendar,
  Package,
  Phone,
  MessageCircle,
  LayoutGrid, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Sprout,
  History,
  QrCode,
  User,
  Bell,
  Route,
  Database,
  FileText,
  Camera,
  Navigation,
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
  const [activeMenu, setActiveMenu] = useState('Marketplace');
  const [mounted, setMounted] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  
  // Customer menu items
  const customerMenuItems: MenuItem[] = [
    { name: 'Marketplace', icon: Search, path: '/marketplace', active: true },
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

// Main Marketplace Component
const EnhancedMarketplacePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    organic: false,
    fresh: false,
    local: false,
    fastDelivery: false,
    highRated: false,
    trending: false
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Enhanced products data
  const [products] = useState([
    {
      id: 1,
      name: 'Premium Organic Tomatoes',
      farmer: {
        name: 'Ravi Mahathaya',
        avatar: 'RM',
        verified: true,
        sustainabilityScore: 95
      },
      location: 'Kurunegala',
      price: 300,
      unit: 'kg',
      rating: 4.8,
      reviews: 127,
      totalSold: 2500,
      image: '🍅',
      isOrganic: true,
      inStock: true,
      stockLevel: 45,
      harvestDate: '2024-06-25',
      description: 'Fresh organic tomatoes grown without pesticides using traditional farming methods',
      tags: ['Organic', 'Fresh', 'Local', 'Pesticide-free'],
      isFavorite: false,
      carbonFootprint: 'Low',
      nutritionScore: 'A+',
      category: 'vegetables'
    },
    {
      id: 2,
      name: 'Sweet Rainbow Carrots',
      farmer: {
        name: 'Saman Silva',
        avatar: 'SS',
        verified: true,
        sustainabilityScore: 88
      },
      location: 'Matale',
      price: 250,
      unit: 'kg',
      rating: 4.6,
      reviews: 89,
      totalSold: 1800,
      image: '🥕',
      isOrganic: true,
      inStock: true,
      stockLevel: 28,
      harvestDate: '2024-06-24',
      description: 'Sweet and crunchy rainbow carrots perfect for cooking and salads',
      tags: ['Organic', 'Sweet', 'Fresh', 'Colorful'],
      isFavorite: true,
      carbonFootprint: 'Low',
      nutritionScore: 'A',
      category: 'vegetables'
    },
    {
      id: 3,
      name: 'Crispy Green Cabbage',
      farmer: {
        name: 'Kamala Jayawardena',
        avatar: 'KJ',
        verified: true,
        sustainabilityScore: 82
      },
      location: 'Kandy',
      price: 180,
      unit: 'kg',
      rating: 4.7,
      reviews: 156,
      totalSold: 3200,
      image: '🥬',
      isOrganic: false,
      inStock: true,
      stockLevel: 67,
      harvestDate: '2024-06-23',
      description: 'Fresh cabbage ideal for salads, stir-fries and traditional dishes',
      tags: ['Fresh', 'Local', 'Crisp', 'Versatile'],
      isFavorite: false,
      carbonFootprint: 'Very Low',
      nutritionScore: 'A-',
      category: 'vegetables'
    },
    {
      id: 4,
      name: 'Premium Green Beans',
      farmer: {
        name: 'Nimal Gunasekara',
        avatar: 'NG',
        verified: true,
        sustainabilityScore: 93
      },
      location: 'Nuwara Eliya',
      price: 400,
      unit: 'kg',
      rating: 4.9,
      reviews: 78,
      totalSold: 950,
      image: '🫘',
      isOrganic: true,
      inStock: true,
      stockLevel: 15,
      harvestDate: '2024-06-25',
      description: 'Tender green beans rich in nutrients, perfect for healthy meals',
      tags: ['Organic', 'Premium', 'Nutritious', 'High-altitude'],
      isFavorite: true,
      carbonFootprint: 'Medium',
      nutritionScore: 'A+',
      category: 'vegetables'
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Products', count: products.length, icon: '🛒' },
    { id: 'vegetables', name: 'Vegetables', count: 4, icon: '🥬' },
    { id: 'fruits', name: 'Fruits', count: 0, icon: '🍎' },
    { id: 'grains', name: 'Grains', count: 0, icon: '🌾' },
    { id: 'organic', name: 'Organic Only', count: 3, icon: '🌱' }
  ];

  const quickFilters = [
    { id: 'organic', label: 'Organic', icon: Leaf, color: 'emerald' },
    { id: 'fresh', label: 'Fresh Today', icon: Sparkles, color: 'blue' },
    { id: 'local', label: 'Local (< 10km)', icon: MapPin, color: 'purple' },
    { id: 'highRated', label: '4.5+ Rating', icon: Star, color: 'orange' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = true;
    if (selectedCategory === 'organic') {
      matchesCategory = product.isOrganic;
    } else if (selectedCategory !== 'all') {
      matchesCategory = product.category === selectedCategory;
    }
    
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (productId) => {
    console.log('Toggle favorite for product:', productId);
  };

  const addToCart = (productId) => {
    console.log('Add to cart:', productId);
  };

  const contactFarmer = (farmerId) => {
    console.log('Contact farmer:', farmerId);
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
      <div className={`flex-1 transition-all duration-500 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        {/* Enhanced Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 mr-4"
                >
                  <Menu className="w-6 h-6" />
                </button>
                
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">🌾 FieldFair Marketplace</h1>
                  <p className="text-gray-600 hidden sm:block">Fresh produce directly from local farmers</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 w-full max-w-md">
                  <Search className="w-5 h-5 text-gray-500 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Search for fresh produce..."
                    className="bg-transparent text-sm outline-none flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-3 overflow-x-auto">
              {quickFilters.map((filter) => (
                <button
                  key={filter.id}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 whitespace-nowrap"
                >
                  <filter.icon className="w-4 h-4" />
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4 lg:p-6">
          {/* Categories */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-bold text-gray-900">Browse Categories</h2>
              <div className="flex items-center space-x-4">
                <select 
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="distance">Nearest First</option>
                  <option value="rating">Highest Rated</option>
                </select>
                
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                  {filteredProducts.length} products found
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 lg:p-6 rounded-2xl text-center transition-all transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-white text-gray-700 border-2 border-gray-100 hover:border-emerald-200 hover:bg-emerald-50'
                  }`}
                >
                  <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">{category.icon}</div>
                  <div className="font-semibold text-xs lg:text-sm">{category.name}</div>
                  <div className="text-xs opacity-75 mt-1">({category.count})</div>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                {/* Product Image Section */}
                <div className="relative h-40 lg:h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                  <span className="text-5xl lg:text-6xl group-hover:scale-110 transition-transform duration-300">{product.image}</span>
                  
                  {/* Enhanced Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {product.isOrganic && (
                      <span className="bg-green-500 text-white text-xs px-2 lg:px-3 py-1 lg:py-1.5 rounded-full font-semibold flex items-center shadow-lg">
                        <Leaf className="w-3 h-3 mr-1" />
                        Organic
                      </span>
                    )}
                  </div>
                  
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 p-2 lg:p-2.5 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                  >
                    <Heart className={`w-4 h-4 ${product.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  </button>

                  {/* Stock Status */}
                  <div className="absolute bottom-3 left-3">
                    <span className={`text-xs px-2 lg:px-3 py-1 lg:py-1.5 rounded-full font-semibold ${
                      product.stockLevel > 20 ? 'bg-green-100 text-green-800' :
                      product.stockLevel > 5 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {product.stockLevel} {product.unit} left
                    </span>
                  </div>
                </div>
                
                {/* Enhanced Product Details */}
                <div className="p-4 lg:p-5">
                  {/* Product Name & Price */}
                  <div className="mb-4">
                    <h3 className="font-bold text-base lg:text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xl lg:text-2xl font-bold text-emerald-600">Rs. {product.price}</span>
                        <div className="text-xs lg:text-sm text-gray-500">per {product.unit}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Farmer Info - Enhanced */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 lg:w-10 h-8 lg:h-10 bg-emerald-100 rounded-full flex items-center justify-center relative">
                        <span className="text-xs lg:text-sm font-bold text-emerald-700">{product.farmer.avatar}</span>
                        {product.farmer.verified && (
                          <div className="absolute -top-1 -right-1 w-3 lg:w-4 h-3 lg:h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <Shield className="w-2 lg:w-2.5 h-2 lg:h-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-sm">{product.farmer.name}</div>
                        <div className="flex items-center text-xs text-gray-600">
                          <MapPin className="w-3 h-3 mr-1" />
                          {product.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Rating & Reviews - Enhanced */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[1,2,3,4,5].map(i => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i <= Math.floor(product.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-sm text-gray-900">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        <span>{product.totalSold} sold</span>
                      </div>
                    </div>
                  </div>

                  {/* Harvest Date */}
                  <div className="mb-5 p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Harvested:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(product.harvestDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Buttons - Enhanced */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => window.location.href = `/marketplace/${product.id}`}
                        className="flex-1 border-2 border-gray-200 text-gray-700 py-2 lg:py-2.5 px-3 rounded-xl text-sm font-semibold hover:border-emerald-300 hover:bg-emerald-50 transition-colors flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </button>
                      <button
                        onClick={() => contactFarmer(product.farmer.name)}
                        className="p-2 lg:p-2.5 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
                        product.inStock
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your search or browse different categories.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EnhancedMarketplacePage;