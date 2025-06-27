"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  QrCode,
  Camera,
  Upload,
  Scan,
  MapPin,
  Calendar,
  User,
  Package,
  Truck,
  Shield,
  Award,
  Leaf,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Share2,
  Eye,
  Star,
  Phone,
  Search,
  Filter,
  Heart,
  ShoppingCart,
  SlidersHorizontal,
  Grid3X3,
  List,
  TrendingUp,
  Zap,
  Target,
  Sparkles,
  Timer,
  ThumbsUp,
  Users,
  MessageCircle,
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Sprout,
  History,
  Bell,
  Route,
  Database,
  FileText,
  Navigation,
  Menu,
  X
} from 'lucide-react';

// Modern Sidebar Component (same as marketplace)
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
  const [activeMenu, setActiveMenu] = useState('QR Scanner');
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
        { name: 'QR Scanner', icon: QrCode, path: '/customer/qr-scanner', active: true },
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

      // Check for QR Scanner specifically
      if (pathname.includes('qr-scanner')) {
        setActiveMenu('QR Scanner');
        // Auto-expand Discover menu
        setExpandedMenus(prev => 
          prev.includes('Discover') ? prev : [...prev, 'Discover']
        );
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
              setExpandedMenus(prev => 
                prev.includes(item.name) ? prev : [...prev, item.name]
              );
              break;
            }
          }
        }
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
    setActiveMenu(subItem.name);
    if (isMobile && onClose) {
      onClose();
    }
  };

  // Don't render until mounted to prevent hydration errors
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
                    (item.submenu && item.submenu.some(subItem => activeMenu === subItem.name || pathname === subItem.path || pathname.startsWith(subItem.path)));
    const isExpanded = expandedMenus.includes(item.name);
    const hasActiveSubmenu = item.submenu && item.submenu.some(subItem => activeMenu === subItem.name || pathname === subItem.path || pathname.startsWith(subItem.path));

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
                  <ChevronLeft className={cn(
                    "w-4 h-4 relative z-10 transition-all duration-300",
                    isExpanded ? "rotate-90 text-white" : "text-slate-400 group-hover:text-white",
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
                  activeMenu === subItem.name || pathname === subItem.path || pathname.startsWith(subItem.path)
                    ? 'bg-gradient-to-r from-emerald-400/30 to-emerald-500/30 text-white backdrop-blur-sm'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white hover:pl-6'
                )}
              >
                <subItem.icon className="w-4 h-4 mr-3 transition-transform duration-300 group-hover:scale-110" />
                <span className="transition-all duration-300">{subItem.name}</span>
                
                {(activeMenu === subItem.name || pathname === subItem.path || pathname.startsWith(subItem.path)) && (
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

const QRScannerPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scanMode, setScanMode] = useState<'camera' | 'upload'>('camera');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [scanHistory, setScanHistory] = useState([
    {
      id: 1,
      productName: 'Organic Tomatoes',
      scannedDate: '2024-06-25T14:30:00',
      farmerName: 'Ravi Mahathaya',
      image: '🍅'
    },
    {
      id: 2,
      productName: 'Fresh Carrots',
      scannedDate: '2024-06-20T09:15:00',
      farmerName: 'Saman Silva',
      image: '🥕'
    }
  ]);

  // Mock QR scan result data
  const mockScanResult = {
    product: {
      id: 'PRD-2024-001',
      name: 'Organic Tomatoes',
      image: '🍅',
      description: 'Fresh organic tomatoes grown without pesticides using traditional farming methods.',
      variety: 'Cherry Tomatoes',
      category: 'Vegetables',
      weight: '5 kg',
      price: 300,
      unit: 'kg'
    },
    farmer: {
      name: 'Ravi Mahathaya',
      avatar: 'RM',
      phone: '077-296-7477',
      location: 'Kurunegala, North Western Province',
      farmName: "Ravi's Organic Farm",
      farmSize: '2.5 acres',
      established: '2018',
      certifications: ['Organic Certified', 'Fair Trade'],
      rating: 4.8,
      totalOrders: 156
    },
    harvest: {
      date: '2024-06-25',
      location: 'Field A - Section 2',
      method: 'Hand-picked at dawn',
      quality: 'Grade A',
      batchNumber: 'BATCH-2024-0625-A2'
    },
    processing: {
      date: '2024-06-25',
      location: 'On-farm processing center',
      steps: [
        'Quality inspection',
        'Washing with clean water',
        'Sorting and grading',
        'Packaging'
      ],
      temperature: '4°C - 8°C',
      packaging: 'Eco-friendly biodegradable bags'
    },
    transport: {
      startDate: '2024-06-25T16:00:00',
      route: 'Kurunegala → Colombo',
      vehicle: 'Refrigerated truck - REF-001',
      distance: '95 km',
      duration: '2.5 hours',
      temperature: '4°C - 6°C',
      arrivalDate: '2024-06-25T18:30:00'
    },
    quality: {
      inspectionDate: '2024-06-25',
      inspector: 'Quality Control Team',
      certificates: ['Organic Certificate', 'Food Safety Certificate'],
      testResults: {
        pesticide: 'Not detected',
        heavyMetals: 'Within safe limits',
        microbial: 'Passed',
        freshness: 'Excellent'
      },
      shelfLife: '7-10 days refrigerated',
      storageInstructions: 'Store in refrigerator at 4°C - 8°C'
    },
    sustainability: {
      carbonFootprint: '0.2 kg CO2e per kg',
      waterUsage: '15 liters per kg',
      packagingType: 'Biodegradable',
      organicCertified: true,
      fairTrade: true
    }
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
        <div className="w-72 bg-slate-900"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  const startScanning = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScannedData(mockScanResult);
      // Add to scan history
      setScanHistory(prev => [{
        id: Date.now(),
        productName: mockScanResult.product.name,
        scannedDate: new Date().toISOString(),
        farmerName: mockScanResult.farmer.name,
        image: mockScanResult.product.image
      }, ...prev]);
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Processing uploaded file:', file.name);
      // Simulate file processing
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        setScannedData(mockScanResult);
      }, 2000);
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    setIsScanning(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Passed':
      case 'Excellent':
      case 'Grade A':
        return 'text-green-600 bg-green-50';
      case 'Good':
        return 'text-blue-600 bg-blue-50';
      case 'Fair':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Modern Sidebar */}
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
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 mr-4"
                >
                  <Menu className="w-6 h-6" />
                </button>
                
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">📱 QR Code Scanner</h1>
                  <p className="text-sm text-gray-600 mt-1 hidden sm:block">Trace your product's journey from farm to table</p>
                </div>
              </div>
              
              {scannedData && (
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => console.log('Sharing scan result')}
                    className="border border-gray-300 text-gray-700 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-1"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                  <button 
                    onClick={() => console.log('Downloading report')}
                    className="border border-gray-300 text-gray-700 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                  <button 
                    onClick={resetScanner}
                    className="bg-emerald-600 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Scan Another
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            {!scannedData ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Scanner */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 shadow-lg">
                    <div className="text-center mb-6">
                      <div className="w-16 lg:w-20 h-16 lg:h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <QrCode className="w-8 lg:w-10 h-8 lg:h-10 text-emerald-600" />
                      </div>
                      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Scan Product QR Code</h2>
                      <p className="text-gray-600 text-sm lg:text-base">Point your camera at the QR code or upload an image to trace your product</p>
                    </div>

                    {/* Scan Mode Toggle */}
                    <div className="flex justify-center mb-6">
                      <div className="bg-gray-100 p-1 rounded-lg">
                        <button
                          onClick={() => setScanMode('camera')}
                          className={`px-3 lg:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            scanMode === 'camera'
                              ? 'bg-white text-gray-900 shadow-sm'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <Camera className="w-4 h-4 mr-2 inline" />
                          Camera
                        </button>
                        <button
                          onClick={() => setScanMode('upload')}
                          className={`px-3 lg:px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            scanMode === 'upload'
                              ? 'bg-white text-gray-900 shadow-sm'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <Upload className="w-4 h-4 mr-2 inline" />
                          Upload
                        </button>
                      </div>
                    </div>

                    {/* Scanner Interface */}
                    <div className="relative">
                      {scanMode === 'camera' ? (
                        <div className="bg-gray-900 rounded-lg p-6 lg:p-8 text-center relative overflow-hidden">
                          <div className="absolute inset-4 border-2 border-emerald-500 rounded-lg"></div>
                          <div className="absolute inset-6 border border-emerald-300 rounded-lg opacity-50"></div>
                          
                          {isScanning ? (
                            <div className="space-y-4">
                              <div className="animate-pulse">
                                <Scan className="w-12 lg:w-16 h-12 lg:h-16 text-emerald-500 mx-auto" />
                              </div>
                              <p className="text-white">Scanning QR code...</p>
                              <div className="w-6 lg:w-8 h-6 lg:h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <Camera className="w-12 lg:w-16 h-12 lg:h-16 text-gray-400 mx-auto" />
                              <p className="text-gray-400">Position QR code within the frame</p>
                              <button
                                onClick={startScanning}
                                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                              >
                                Start Scanning
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 lg:p-12 text-center hover:border-emerald-300 transition-colors">
                          <Upload className="w-12 lg:w-16 h-12 lg:h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-4">Upload an image with QR code</p>
                          <label className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors cursor-pointer inline-block">
                            Choose File
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>
                          <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Scan History */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Scans</h3>
                    <div className="space-y-3">
                      {scanHistory.map((scan) => (
                        <div key={scan.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-xl">{scan.image}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 text-sm">{scan.productName}</div>
                            <div className="text-sm text-gray-600">{scan.farmerName}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(scan.scannedDate).toLocaleDateString()}
                            </div>
                          </div>
                          <button className="text-emerald-600 hover:text-emerald-700 p-1">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-emerald-900 mb-3">How it works</h3>
                    <div className="space-y-3 text-sm text-emerald-800">
                      <div className="flex items-start space-x-2">
                        <QrCode className="w-4 h-4 mt-0.5 text-emerald-600" />
                        <span>Scan the QR code on your product package</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-emerald-600" />
                        <span>View the complete journey from farm to your table</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 mt-0.5 text-emerald-600" />
                        <span>Verify quality, safety, and authenticity</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Scan Results */
              <div className="space-y-6">
                {/* Product Overview */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                  <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-6">
                    <div className="w-full lg:w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center">
                      <span className="text-4xl lg:text-6xl">{scannedData.product.image}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                        <div className="mb-4 lg:mb-0">
                          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{scannedData.product.name}</h2>
                          <p className="text-gray-600 mb-4">{scannedData.product.description}</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                              {scannedData.product.variety}
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {scannedData.product.weight}
                            </span>
                          </div>
                        </div>
                        <div className="text-left lg:text-right">
                          <div className="text-2xl font-bold text-emerald-600">Rs. {scannedData.product.price}</div>
                          <div className="text-gray-500">per {scannedData.product.unit}</div>
                          <div className="text-sm text-gray-600 mt-1">Product ID: {scannedData.product.id}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Farmer Information */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-emerald-600" />
                    Farmer Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-emerald-700">{scannedData.farmer.avatar}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{scannedData.farmer.name}</h4>
                          <p className="text-gray-600">{scannedData.farmer.farmName}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{scannedData.farmer.rating}</span>
                            <span className="text-gray-500">({scannedData.farmer.totalOrders} orders)</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{scannedData.farmer.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{scannedData.farmer.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">Farm Details</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Farm Size:</span>
                          <span className="font-medium">{scannedData.farmer.farmSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Established:</span>
                          <span className="font-medium">{scannedData.farmer.established}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <h5 className="font-medium text-gray-900 mb-2">Certifications</h5>
                        <div className="flex flex-wrap gap-1">
                          {scannedData.farmer.certifications.map((cert: string, index: number) => (
                            <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                              <Award className="w-3 h-3 mr-1" />
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Journey Timeline */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-emerald-600" />
                    Product Journey
                  </h3>
                  <div className="space-y-6">
                    {/* Harvest */}
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Harvest</h4>
                        <p className="text-gray-600 text-sm mb-2">Hand-picked fresh from the farm</p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Date:</span>
                            <span className="ml-2 font-medium">{new Date(scannedData.harvest.date).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Location:</span>
                            <span className="ml-2 font-medium">{scannedData.harvest.location}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Quality:</span>
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scannedData.harvest.quality)}`}>
                              {scannedData.harvest.quality}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Batch:</span>
                            <span className="ml-2 font-medium">{scannedData.harvest.batchNumber}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Processing */}
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Processing & Packaging</h4>
                        <p className="text-gray-600 text-sm mb-2">Cleaned, sorted, and packaged with care</p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Date:</span>
                            <span className="ml-2 font-medium">{new Date(scannedData.processing.date).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Temperature:</span>
                            <span className="ml-2 font-medium">{scannedData.processing.temperature}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-gray-500 text-sm">Processing steps:</span>
                          <ul className="ml-4 mt-1 text-sm">
                            {scannedData.processing.steps.map((step: string, index: number) => (
                              <li key={index} className="flex items-center space-x-2">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Transport */}
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Truck className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Transportation</h4>
                        <p className="text-gray-600 text-sm mb-2">Safe delivery maintaining cold chain</p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Route:</span>
                            <span className="ml-2 font-medium">{scannedData.transport.route}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Distance:</span>
                            <span className="ml-2 font-medium">{scannedData.transport.distance}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <span className="ml-2 font-medium">{scannedData.transport.duration}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Temperature:</span>
                            <span className="ml-2 font-medium">{scannedData.transport.temperature}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quality & Sustainability */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Quality Assurance */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-emerald-600" />
                      Quality Assurance
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Test Results</h4>
                        <div className="space-y-2">
                          {Object.entries(scannedData.quality.testResults).map(([test, result]) => (
                            <div key={test} className="flex justify-between items-center">
                              <span className="text-gray-600 capitalize">{test.replace(/([A-Z])/g, ' $1')}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result as string)}`}>
                                {result}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Storage Instructions</h4>
                        <p className="text-sm text-gray-600">{scannedData.quality.storageInstructions}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Shelf Life</h4>
                        <p className="text-sm text-gray-600">{scannedData.quality.shelfLife}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sustainability */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Leaf className="w-5 h-5 mr-2 text-emerald-600" />
                      Sustainability
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Carbon Footprint</div>
                          <div className="font-bold text-green-600">{scannedData.sustainability.carbonFootprint}</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">Water Usage</div>
                          <div className="font-bold text-blue-600">{scannedData.sustainability.waterUsage}</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Organic Certified</span>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Fair Trade</span>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Biodegradable Packaging</span>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
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

export default QRScannerPage;