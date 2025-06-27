'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Heart,
  Star,
  ShoppingCart,
  MapPin,
  Shield,
  Leaf,
  Users,
  Eye,
  Phone,
  Grid3X3,
  List,
  Filter,
  Search,
  Trash2,
  Share2,
  Calendar,
  Package,
  SortAsc,
  SortDesc,
  X,
  Plus,
  Check,
  Menu,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sprout,
  History,
  QrCode,
  User,
  Bell,
  Route,
  Target,
  TrendingUp,
  MessageCircle,
  Zap,
  Settings
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
  const [activeMenu, setActiveMenu] = useState('Favorites');
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
    { name: 'Favorites', icon: Heart, path: '/customer/favorites', active: true },
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

// Main Customer Favorites Component
const CustomerFavoritesPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sample favorites data
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Premium Organic Tomatoes',
      farmer: {
        name: 'Ravi Mahathaya',
        avatar: 'RM',
        verified: true,
        location: 'Kurunegala'
      },
      price: 300,
      unit: 'kg',
      rating: 4.8,
      reviews: 127,
      totalSold: 2500,
      image: '🍅',
      isOrganic: true,
      inStock: true,
      stockLevel: 45,
      category: 'vegetables',
      addedToFavorites: '2024-06-20',
      lastPurchased: '2024-06-15',
      priceHistory: [320, 310, 300], // Last 3 prices
      isOnSale: false
    },
    {
      id: 2,
      name: 'Sweet Rainbow Carrots',
      farmer: {
        name: 'Saman Silva',
        avatar: 'SS',
        verified: true,
        location: 'Matale'
      },
      price: 250,
      unit: 'kg',
      rating: 4.6,
      reviews: 89,
      totalSold: 1800,
      image: '🥕',
      isOrganic: true,
      inStock: true,
      stockLevel: 28,
      category: 'vegetables',
      addedToFavorites: '2024-06-18',
      lastPurchased: null,
      priceHistory: [280, 270, 250],
      isOnSale: true
    },
    {
      id: 4,
      name: 'Premium Green Beans',
      farmer: {
        name: 'Nimal Gunasekara',
        avatar: 'NG',
        verified: true,
        location: 'Nuwara Eliya'
      },
      price: 400,
      unit: 'kg',
      rating: 4.9,
      reviews: 78,
      totalSold: 950,
      image: '🫘',
      isOrganic: true,
      inStock: true,
      stockLevel: 15,
      category: 'vegetables',
      addedToFavorites: '2024-06-16',
      lastPurchased: '2024-06-10',
      priceHistory: [420, 410, 400],
      isOnSale: false
    },
    {
      id: 5,
      name: 'Fresh Strawberries',
      farmer: {
        name: 'Priya Bandara',
        avatar: 'PB',
        verified: true,
        location: 'Nuwara Eliya'
      },
      price: 800,
      unit: 'kg',
      rating: 4.7,
      reviews: 156,
      totalSold: 650,
      image: '🍓',
      isOrganic: true,
      inStock: false,
      stockLevel: 0,
      category: 'fruits',
      addedToFavorites: '2024-06-12',
      lastPurchased: '2024-05-28',
      priceHistory: [750, 780, 800],
      isOnSale: false
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Favorites', count: favorites.length },
    { id: 'vegetables', name: 'Vegetables', count: favorites.filter(f => f.category === 'vegetables').length },
    { id: 'fruits', name: 'Fruits', count: favorites.filter(f => f.category === 'fruits').length },
    { id: 'grains', name: 'Grains', count: 0 }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Recently Added' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  // Filter and sort favorites
  const filteredFavorites = favorites
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.farmer.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
        default:
          return new Date(b.addedToFavorites).getTime() - new Date(a.addedToFavorites).getTime();
      }
    });

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
    setSelectedItems(prev => prev.filter(id => id !== productId));
  };

  const addToCart = (productId: number) => {
    console.log('Adding product to cart:', productId);
    // Add to cart logic here
  };

  const contactFarmer = (farmerName: string) => {
    console.log('Contacting farmer:', farmerName);
    // Contact farmer logic here
  };

  const shareProduct = (product: any) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} from ${product.farmer.name}`,
        url: `${window.location.origin}/marketplace/${product.id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/marketplace/${product.id}`);
      alert('Link copied to clipboard!');
    }
  };

  const toggleItemSelection = (productId: number) => {
    setSelectedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredFavorites.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredFavorites.map(item => item.id));
    }
  };

  const bulkRemoveFromFavorites = () => {
    setFavorites(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  const bulkAddToCart = () => {
    selectedItems.forEach(productId => {
      const product = favorites.find(item => item.id === productId);
      if (product && product.inStock) {
        addToCart(productId);
      }
    });
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  useEffect(() => {
    setShowBulkActions(selectedItems.length > 0);
  }, [selectedItems]);

  const getPriceChange = (product: any) => {
    if (product.priceHistory.length < 2) return null;
    const currentPrice = product.price;
    const previousPrice = product.priceHistory[product.priceHistory.length - 2];
    const change = currentPrice - previousPrice;
    return {
      amount: Math.abs(change),
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'same',
      percentage: previousPrice > 0 ? Math.abs((change / previousPrice) * 100) : 0
    };
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
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 mr-4"
                >
                  <Menu className="w-6 h-6" />
                </button>
                
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">❤️ My Favorites</h1>
                  <p className="text-gray-600 hidden sm:block">Your saved products from local farmers</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 w-full max-w-md">
                  <Search className="w-5 h-5 text-gray-500 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Search favorites..."
                    className="bg-transparent text-sm outline-none flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Filters and Stats */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center space-x-4 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                      selectedCategory === category.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <select 
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                  {filteredFavorites.length} items
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {showBulkActions && (
          <div className="bg-emerald-50 border-b border-emerald-200">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleSelectAll}
                    className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-800"
                  >
                    <div className={`w-5 h-5 rounded border-2 border-emerald-500 flex items-center justify-center ${
                      selectedItems.length === filteredFavorites.length ? 'bg-emerald-500' : ''
                    }`}>
                      {selectedItems.length === filteredFavorites.length && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="font-medium">
                      {selectedItems.length === filteredFavorites.length ? 'Deselect All' : 'Select All'}
                    </span>
                  </button>
                  <span className="text-emerald-700">
                    {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={bulkAddToCart}
                    className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={bulkRemoveFromFavorites}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItems([]);
                      setShowBulkActions(false);
                    }}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <main className="max-w-7xl mx-auto p-4 lg:p-6">
          {filteredFavorites.length === 0 ? (
            // Empty State
            <div className="text-center py-16">
              <Heart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
              <p className="text-gray-500 mb-6">Start exploring and save products you love!</p>
              <Link
                href="/marketplace"
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Marketplace
              </Link>
            </div>
          ) : (
            // Favorites Grid/List
            <div className={`grid gap-4 lg:gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredFavorites.map((product) => {
                const priceChange = getPriceChange(product);
                const isSelected = selectedItems.includes(product.id);
                
                return (
                  <div 
                    key={product.id} 
                    className={`bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative ${
                      isSelected ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-gray-100'
                    } ${viewMode === 'list' ? 'flex' : ''}`}
                  >
                    {/* Selection Checkbox */}
                    <button
                      onClick={() => toggleItemSelection(product.id)}
                      className="absolute top-3 left-3 z-10 w-6 h-6 rounded-full border-2 border-white bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
                    >
                      {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>

                    {/* Product Image */}
                    <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden ${
                      viewMode === 'list' ? 'w-32 h-32' : 'h-40 lg:h-48'
                    }`}>
                      <span className={`group-hover:scale-110 transition-transform duration-300 ${
                        viewMode === 'list' ? 'text-4xl' : 'text-5xl lg:text-6xl'
                      }`}>
                        {product.image}
                      </span>
                      
                      {/* Badges */}
                      <div className="absolute top-3 right-3 flex flex-col space-y-2">
                        {product.isOrganic && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center shadow-lg">
                            <Leaf className="w-3 h-3 mr-1" />
                            Organic
                          </span>
                        )}
                        {product.isOnSale && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                            Sale
                          </span>
                        )}
                        {!product.inStock && (
                          <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => shareProduct(product)}
                          className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
                        >
                          <Share2 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => removeFromFavorites(product.id)}
                          className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>

                      {/* Stock Status */}
                      {product.inStock && (
                        <div className="absolute bottom-3 left-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                            product.stockLevel > 20 ? 'bg-green-100 text-green-800' :
                            product.stockLevel > 5 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {product.stockLevel} {product.unit} left
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className={`p-4 lg:p-5 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className={viewMode === 'list' ? 'flex justify-between' : ''}>
                        <div className={viewMode === 'list' ? 'flex-1 pr-6' : ''}>
                          {/* Product Name & Price */}
                          <div className="mb-4">
                            <h3 className="font-bold text-base lg:text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                            <div className="flex items-baseline justify-between">
                              <div>
                                <span className="text-xl lg:text-2xl font-bold text-emerald-600">Rs. {product.price}</span>
                                <div className="text-xs lg:text-sm text-gray-500">per {product.unit}</div>
                                
                                {/* Price Change Indicator */}
                                {priceChange && priceChange.direction !== 'same' && (
                                  <div className={`text-xs flex items-center mt-1 ${
                                    priceChange.direction === 'down' ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    {priceChange.direction === 'down' ? '↓' : '↑'} Rs. {priceChange.amount}
                                    <span className="ml-1">({priceChange.percentage.toFixed(1)}%)</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Farmer Info */}
                          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center relative">
                                <span className="text-xs font-bold text-emerald-700">{product.farmer.avatar}</span>
                                {product.farmer.verified && (
                                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Shield className="w-2 h-2 text-white" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 text-sm">{product.farmer.name}</div>
                                <div className="flex items-center text-xs text-gray-600">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {product.farmer.location}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Rating & Reviews */}
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

                          {/* Favorite Info */}
                          <div className="mb-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-4">
                              <span>Added: {new Date(product.addedToFavorites).toLocaleDateString()}</span>
                              {product.lastPurchased && (
                                <span>Last bought: {new Date(product.lastPurchased).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={`space-y-3 ${viewMode === 'list' ? 'w-48' : ''}`}>
                          <div className="flex items-center space-x-2">
                            <Link
                              href={`/marketplace/${product.id}`}
                              className="flex-1 border-2 border-gray-200 text-gray-700 py-2 px-3 rounded-xl text-sm font-semibold hover:border-emerald-300 hover:bg-emerald-50 transition-colors flex items-center justify-center"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Link>
                            <button
                              onClick={() => contactFarmer(product.farmer.name)}
                              className="p-2 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
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
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomerFavoritesPage;