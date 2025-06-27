"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  Search,
  Filter,
  MapPin,
  Star,
  Leaf,
  Award,
  Phone,
  Navigation,
  Calendar,
  Package,
  Users,
  Clock,
  Map,
  List,
  Eye,
  MessageCircle,
  Heart,
  Truck,
  Shield,
  ChevronDown,
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
  Scan,
  Menu,
  X,
  BarChart3,
  Settings,
  Zap,
  Target,
  TrendingUp
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
    { name: 'My Cart', icon: Package, path: '/marketplace/cart', badge: '2' },
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
      active: true,
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

      // Check for Find Farms page specifically
      if (pathname === '/customer/farms' || pathname.startsWith('/customer/farms')) {
        setActiveMenu('Discover');
        setExpandedMenus(prev => prev.includes('Discover') ? prev : [...prev, 'Discover']);
        return;
      }

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

// Main Find Farms Component
const FindFarmsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    distance: 'all',
    type: 'all',
    certification: 'all',
    rating: 'all'
  });
  const [selectedFarm, setSelectedFarm] = useState<number | null>(null);

  // Mock farms data
  const [farms] = useState([
    {
      id: 1,
      name: "Ravi's Organic Farm",
      owner: 'Ravi Mahathaya',
      location: 'Kurunegala, North Western Province',
      coordinates: { lat: 7.4818, lng: 80.3609 },
      distance: '2.5 km',
      rating: 4.8,
      reviews: 127,
      image: 'RM',
      description: 'Certified organic farm specializing in vegetables and fruits',
      farmSize: '2.5 acres',
      established: '2018',
      certifications: ['Organic Certified', 'Fair Trade'],
      specialties: ['Tomatoes', 'Carrots', 'Lettuce', 'Herbs'],
      farmingMethod: 'Organic',
      phone: '+94 77 296 7477',
      totalProducts: 15,
      activeOrders: 8,
      visitingHours: '6:00 AM - 6:00 PM',
      visitCost: 'Free',
      amenities: ['Farm Tour', 'Educational Visit', 'Product Tasting', 'Organic Shop'],
      languages: ['Sinhala', 'English']
    },
    {
      id: 2,
      name: "Silva Sustainable Farm",
      owner: 'Saman Silva',
      location: 'Matale, Central Province',
      coordinates: { lat: 7.4675, lng: 80.6234 },
      distance: '5.2 km',
      rating: 4.6,
      reviews: 89,
      image: 'SS',
      description: 'Traditional and sustainable farming practices since 1995',
      farmSize: '4.1 acres',
      established: '1995',
      certifications: ['Sustainable Farming'],
      specialties: ['Rice', 'Coconut', 'Spices', 'Vegetables'],
      farmingMethod: 'Sustainable',
      phone: '+94 81 222 3456',
      totalProducts: 22,
      activeOrders: 12,
      visitingHours: '7:00 AM - 5:00 PM',
      visitCost: 'Rs. 500 per person',
      amenities: ['Farm Tour', 'Cooking Class', 'Accommodation', 'Restaurant'],
      languages: ['Sinhala', 'English', 'Tamil']
    },
    {
      id: 3,
      name: "Green Valley Farm",
      owner: 'Nimal Gunasekara',
      location: 'Nuwara Eliya, Central Province',
      coordinates: { lat: 6.9497, lng: 80.7891 },
      distance: '15.7 km',
      rating: 4.9,
      reviews: 78,
      image: 'NG',
      description: 'High-altitude organic farming with premium vegetables',
      farmSize: '3.8 acres',
      established: '2015',
      certifications: ['Organic Certified', 'Export Quality'],
      specialties: ['Green Beans', 'Cabbage', 'Carrots', 'Potatoes'],
      farmingMethod: 'Organic',
      phone: '+94 52 222 7890',
      totalProducts: 18,
      activeOrders: 15,
      visitingHours: '8:00 AM - 4:00 PM',
      visitCost: 'Rs. 750 per person',
      amenities: ['Farm Tour', 'Greenhouse Visit', 'Product Sampling', 'Photography'],
      languages: ['Sinhala', 'English']
    },
    {
      id: 4,
      name: "Heritage Spice Farm",
      owner: 'Kamala Jayawardena',
      location: 'Kandy, Central Province',
      coordinates: { lat: 7.2906, lng: 80.6337 },
      distance: '8.1 km',
      rating: 4.7,
      reviews: 156,
      image: 'KJ',
      description: 'Traditional spice cultivation with heritage varieties',
      farmSize: '5.2 acres',
      established: '1985',
      certifications: ['Traditional Methods', 'Heritage Varieties'],
      specialties: ['Cinnamon', 'Cardamom', 'Pepper', 'Nutmeg'],
      farmingMethod: 'Traditional',
      phone: '+94 81 333 4567',
      totalProducts: 25,
      activeOrders: 6,
      visitingHours: '6:30 AM - 6:30 PM',
      visitCost: 'Rs. 1000 per person',
      amenities: ['Spice Tour', 'Processing Demo', 'Cooking Class', 'Gift Shop'],
      languages: ['Sinhala', 'English']
    },
    {
      id: 5,
      name: "Eco Valley Farm",
      owner: 'Priyantha Fernando',
      location: 'Gampaha, Western Province',
      coordinates: { lat: 7.0873, lng: 80.0142 },
      distance: '12.3 km',
      rating: 4.5,
      reviews: 203,
      image: 'PF',
      description: 'Eco-friendly farming with renewable energy systems',
      farmSize: '6.5 acres',
      established: '2010',
      certifications: ['Eco-Friendly', 'Solar Powered'],
      specialties: ['Leafy Greens', 'Fruits', 'Herbs', 'Microgreens'],
      farmingMethod: 'Hydroponic',
      phone: '+94 33 456 7890',
      totalProducts: 30,
      activeOrders: 20,
      visitingHours: '7:00 AM - 7:00 PM',
      visitCost: 'Rs. 600 per person',
      amenities: ['Tech Tour', 'Hydroponic Demo', 'Solar System', 'Research Lab'],
      languages: ['Sinhala', 'English']
    }
  ]);

  const filterOptions = {
    distance: [
      { value: 'all', label: 'All Distances' },
      { value: '5', label: 'Within 5km' },
      { value: '10', label: 'Within 10km' },
      { value: '25', label: 'Within 25km' }
    ],
    type: [
      { value: 'all', label: 'All Types' },
      { value: 'organic', label: 'Organic' },
      { value: 'sustainable', label: 'Sustainable' },
      { value: 'traditional', label: 'Traditional' },
      { value: 'hydroponic', label: 'Hydroponic' }
    ],
    certification: [
      { value: 'all', label: 'All Certifications' },
      { value: 'organic', label: 'Organic Certified' },
      { value: 'fair_trade', label: 'Fair Trade' },
      { value: 'sustainable', label: 'Sustainable Farming' }
    ],
    rating: [
      { value: 'all', label: 'All Ratings' },
      { value: '4.5', label: '4.5+ Stars' },
      { value: '4.0', label: '4.0+ Stars' },
      { value: '3.5', label: '3.5+ Stars' }
    ]
  };

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
        <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  const filteredFarms = farms.filter(farm => {
    const matchesSearch = farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDistance = selectedFilters.distance === 'all' || 
                           parseFloat(farm.distance) <= parseFloat(selectedFilters.distance);
    
    const matchesType = selectedFilters.type === 'all' || 
                       farm.farmingMethod.toLowerCase() === selectedFilters.type;
    
    const matchesRating = selectedFilters.rating === 'all' || 
                         farm.rating >= parseFloat(selectedFilters.rating);
    
    return matchesSearch && matchesDistance && matchesType && matchesRating;
  });

  const bookVisit = (farmId: number) => {
    console.log('Booking visit to farm:', farmId);
    // In real app, open visit booking modal
  };

  const contactFarmer = (phone: string) => {
    console.log('Contacting farmer:', phone);
    // In real app, open contact modal or dial
  };

  const getDirections = (coordinates: { lat: number; lng: number }) => {
    console.log('Getting directions to:', coordinates);
    // In real app, open maps with directions
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
        {/* Header */}
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
                <h1 className="text-2xl font-bold text-gray-900">🚜 Find Farms</h1>
                <p className="text-sm text-gray-600 mt-1">Discover local farms and plan your visits</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-500 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search farms, farmers, products..."
                  className="bg-transparent text-sm outline-none w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'map' 
                      ? 'bg-emerald-100 text-emerald-600' 
                      : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {viewMode === 'map' ? <List className="w-4 h-4" /> : <Map className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="flex h-full">
            {/* Sidebar Filters */}
            <div className="w-80 bg-white border-r border-gray-200 overflow-auto">
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden mb-6">
                  <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                    <Search className="w-4 h-4 text-gray-500 mr-2" />
                    <input 
                      type="text" 
                      placeholder="Search farms..."
                      className="bg-transparent text-sm outline-none flex-1"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Distance Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Distance</label>
                  <select
                    value={selectedFilters.distance}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, distance: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {filterOptions.distance.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Farm Type Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Farm Type</label>
                  <select
                    value={selectedFilters.type}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {filterOptions.type.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Minimum Rating</label>
                  <select
                    value={selectedFilters.rating}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, rating: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {filterOptions.rating.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Results Count */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="text-emerald-800 font-medium">
                    {filteredFarms.length} farms found
                  </div>
                  <div className="text-emerald-600 text-sm mt-1">
                    Based on your current filters
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {viewMode === 'map' ? (
                /* Map View */
                <div className="h-full relative">
                  {/* Mock Map */}
                  <div className="h-full bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center relative">
                    <div className="text-center">
                      <Map className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">Interactive Farm Map</h3>
                      <p className="text-gray-500">Farm locations would be displayed here</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Integrate with Google Maps API in production
                      </p>
                    </div>
                    
                    {/* Map Markers Preview */}
                    {filteredFarms.slice(0, 3).map((farm, index) => (
                      <div
                        key={farm.id}
                        className={`absolute bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-emerald-700 transition-all duration-300 hover:scale-110 shadow-lg ${
                          index === 0 ? 'top-1/3 left-1/3' :
                          index === 1 ? 'top-1/2 right-1/3' :
                          'bottom-1/3 left-1/2'
                        }`}
                        onClick={() => setSelectedFarm(farm.id)}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>

                  {/* Selected Farm Popup */}
                  {selectedFarm && (
                    <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl border border-gray-200 shadow-2xl p-4 max-w-md backdrop-blur-sm">
                      {(() => {
                        const farm = farms.find(f => f.id === selectedFarm);
                        if (!farm) return null;
                        
                        return (
                          <div>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                  <span className="font-bold text-emerald-700">{farm.image}</span>
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">{farm.name}</h3>
                                  <p className="text-sm text-gray-600">{farm.owner}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => setSelectedFarm(null)}
                                className="text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                            
                            <div className="flex items-center space-x-4 mb-3">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{farm.rating}</span>
                                <span className="text-sm text-gray-500">({farm.reviews})</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">{farm.distance}</span>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button
                                onClick={() => getDirections(farm.coordinates)}
                                className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-1"
                              >
                                <Navigation className="w-4 h-4" />
                                <span>Directions</span>
                              </button>
                              <button
                                onClick={() => bookVisit(farm.id)}
                                className="flex-1 border border-emerald-600 text-emerald-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors"
                              >
                                Visit
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              ) : (
                /* List View */
                <div className="p-4 lg:p-6">
                  <div className="space-y-6">
                    {filteredFarms.map((farm) => (
                      <div key={farm.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className="p-4 lg:p-6">
                          <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 lg:space-x-6">
                            {/* Farm Avatar */}
                            <div className="w-16 lg:w-20 h-16 lg:h-20 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <span className="text-xl lg:text-2xl font-bold text-emerald-700">{farm.image}</span>
                            </div>

                            {/* Farm Info */}
                            <div className="flex-1 w-full">
                              <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">{farm.name}</h3>
                                  <p className="text-gray-600">{farm.owner}</p>
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 space-y-2 sm:space-y-0">
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                      <span className="font-medium text-gray-900">{farm.rating}</span>
                                      <span className="text-gray-500">({farm.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <MapPin className="w-4 h-4 text-gray-500" />
                                      <span className="text-gray-600 text-sm">{farm.location} • {farm.distance}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="text-right mt-4 lg:mt-0">
                                  <div className="text-sm text-gray-600">Visit Cost</div>
                                  <div className="font-bold text-emerald-600">{farm.visitCost}</div>
                                </div>
                              </div>

                              <p className="text-gray-600 mb-4">{farm.description}</p>

                              {/* Farm Details Grid */}
                              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4">
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <Package className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                                  <div className="text-sm font-medium text-gray-900">{farm.totalProducts}</div>
                                  <div className="text-xs text-gray-600">Products</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <Truck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                                  <div className="text-sm font-medium text-gray-900">{farm.activeOrders}</div>
                                  <div className="text-xs text-gray-600">Active Orders</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                                  <div className="text-xs font-medium text-gray-900">{farm.visitingHours}</div>
                                  <div className="text-xs text-gray-600">Visiting Hours</div>
                                </div>
                                <div className="text-center p-3 bg-gray-50 rounded-lg">
                                  <Users className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                                  <div className="text-sm font-medium text-gray-900">{farm.farmSize}</div>
                                  <div className="text-xs text-gray-600">Farm Size</div>
                                </div>
                              </div>

                              {/* Specialties */}
                              <div className="mb-4">
                                <div className="text-sm font-medium text-gray-700 mb-2">Specialties:</div>
                                <div className="flex flex-wrap gap-2">
                                  {farm.specialties.map((specialty, index) => (
                                    <span key={index} className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                                      {specialty}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Certifications */}
                              <div className="mb-4">
                                <div className="text-sm font-medium text-gray-700 mb-2">Certifications:</div>
                                <div className="flex flex-wrap gap-2">
                                  {farm.certifications.map((cert, index) => (
                                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                      <Award className="w-3 h-3 mr-1" />
                                      {cert}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Amenities */}
                              <div className="mb-6">
                                <div className="text-sm font-medium text-gray-700 mb-2">Visit Amenities:</div>
                                <div className="flex flex-wrap gap-2">
                                  {farm.amenities.map((amenity, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                      {amenity}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex flex-wrap items-center gap-3">
                                <button
                                  onClick={() => bookVisit(farm.id)}
                                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center space-x-1"
                                >
                                  <Calendar className="w-4 h-4" />
                                  <span>Book Visit</span>
                                </button>
                                
                                <button
                                  onClick={() => contactFarmer(farm.phone)}
                                  className="border border-emerald-600 text-emerald-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors flex items-center space-x-1"
                                >
                                  <Phone className="w-4 h-4" />
                                  <span>Contact</span>
                                </button>
                                
                                <button
                                  onClick={() => getDirections(farm.coordinates)}
                                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-1"
                                >
                                  <Navigation className="w-4 h-4" />
                                  <span>Directions</span>
                                </button>
                                
                                <button className="border border-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                  <Heart className="w-4 h-4" />
                                </button>
                                
                                <button className="border border-gray-300 text-gray-700 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredFarms.length === 0 && (
                    <div className="text-center py-12">
                      <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No farms found matching your criteria.</p>
                      <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FindFarmsPage;