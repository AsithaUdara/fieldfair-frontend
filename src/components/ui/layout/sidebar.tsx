// File Location: src/components/ui/layout/sidebar.tsx

"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutGrid, BarChart3, Package, ShoppingCart, Users, MapPin, Settings,
  ChevronLeft, ChevronRight, Sprout, Search, Heart, QrCode, User,
  Zap, Store, X, Award, Leaf, LogOut
} from 'lucide-react';
import { useAuth } from '@/providers/auth-provider';

interface MenuItem {
  name: string;
  icon: React.ComponentType<any>;
  path: string;
  badge?: string;
}

interface FieldFairSidebarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const FieldFairSidebar: React.FC<FieldFairSidebarProps> = ({
  isCollapsed = false,
  setIsCollapsed,
  isMobile = false,
  isOpen = false,
  onClose,
}) => {
  // --- CORRECTED LOGIC: Hooks called inside the component ---
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeMenu, setActiveMenu] = useState('');
  const [mounted, setMounted] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });
  
  // Dynamically determine user role from the auth context
  const userType = user?.role || 'customer';

  // Farmer menu items
  const farmerMenuItems: MenuItem[] = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/farmer/dashboard' },
    { name: 'Products', icon: Package, path: '/farmer/products' },
    { name: 'Orders', icon: ShoppingCart, path: '/farmer/orders', badge: '3' },
    { name: 'Analytics', icon: BarChart3, path: '/farmer/analytics' },
    { name: 'Customers', icon: Users, path: '/farmer/customers' },
    { name: 'Farm Location', icon: MapPin, path: '/farmer/location' },
    { name: 'Profile', icon: User, path: '/farmer/profile' },
    { name: 'Settings', icon: Settings, path: '/farmer/settings' }
  ];

  // Customer menu items
  const customerMenuItems: MenuItem[] = [
    { name: 'Marketplace', icon: Store, path: '/marketplace' },
    { name: 'My Cart', icon: ShoppingCart, path: '/marketplace/cart', badge: '2' },
    { name: 'My Orders', icon: Package, path: '/customer/orders' },
    { name: 'Favorites', icon: Heart, path: '/customer/favorites' },
    { name: 'Find Farms', icon: Search, path: '/customer/farms' },
    { name: 'QR Scanner', icon: QrCode, path: '/customer/qr-scanner' },
    { name: 'AI Assistant', icon: Zap, path: '/ai/recommendations' },
    { name: 'Profile', icon: User, path: '/customer/profile' },
    { name: 'Settings', icon: Settings, path: '/customer/settings' }
  ];
  
  // Select the correct menu based on the user's role
  const menuItems = userType === 'farmer' ? farmerMenuItems : customerMenuItems;

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const newScreenSize = {
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      };
      if (JSON.stringify(newScreenSize) !== JSON.stringify(screenSize)) {
        setScreenSize(newScreenSize);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize, { passive: true });
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [screenSize]);

  useEffect(() => {
    if (mounted) {
      let foundItem = menuItems.find(item => pathname === item.path);
      if (!foundItem) {
        foundItem = menuItems.find(item => pathname.startsWith(item.path + '/') && item.path !== '/');
      }
      if (pathname === '/marketplace') {
        foundItem = menuItems.find(item => item.path === '/marketplace');
      }
      if (foundItem) setActiveMenu(foundItem.name);
    }
  }, [pathname, mounted, menuItems]);

  const handleMenuClick = (item: MenuItem) => {
    setActiveMenu(item.name);
    router.push(item.path);
    if ((screenSize.isMobile || screenSize.isTablet) && onClose) {
      setTimeout(() => onClose(), 100);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const userInfo = {
    name: user?.fullName || 'Guest User',
    avatar: user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'GU',
    statusColor: user?.role === 'farmer' ? 'bg-emerald-500' : 'bg-blue-500'
  };

  const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

  const getSidebarWidth = () => {
    if (screenSize.isMobile) return "w-72";
    if (screenSize.isTablet) return "w-20";
    return isCollapsed ? "w-20" : "w-72";
  };

  const shouldShowCollapsed = () => screenSize.isTablet || (screenSize.isDesktop && isCollapsed);
  const shouldShowExpanded = () => screenSize.isMobile || (screenSize.isDesktop && !isCollapsed);
  
  // Guard clause: Do not render anything if not authenticated or not mounted
  if (!mounted || !isAuthenticated) {
    return null;
  }

  const renderMenuItem = (item: MenuItem) => {
    const isActive = activeMenu === item.name;
    const isHovered = hoveredItem === item.name;
    const showCollapsed = shouldShowCollapsed();

    return (
      <div key={item.name} className="relative">
        <div className={showCollapsed ? "flex justify-center" : ""}>
          <Link 
            href={item.path}
            onClick={() => handleMenuClick(item)}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
            className={cn(
              "flex items-center py-3.5 rounded-xl transition-all duration-300 ease-out group relative overflow-hidden",
              "hover:scale-[1.02] active:scale-[0.98]",
              isActive ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]' : 
              isHovered ? 'bg-gradient-to-r from-slate-700/50 to-slate-600/50 text-white shadow-lg shadow-slate-900/20 backdrop-blur-xl' : 'text-slate-300 hover:text-white backdrop-blur-sm',
              showCollapsed ? "w-12 h-12 justify-center mx-auto" : "px-4 w-full mx-2"
            )}
          >
            {isActive && (<><div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-emerald-600/30 rounded-2xl animate-pulse"></div><div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-2xl animate-ping"></div></>)}
            {isHovered && !isActive && <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-slate-500/20 rounded-2xl"></div>}
            {isActive && !showCollapsed && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></span>}
            <item.icon className={cn("relative z-10 transition-all duration-300 ease-out w-5 h-5", isActive ? "text-white scale-110 drop-shadow-lg" : isHovered ? "text-white scale-105 drop-shadow-md" : "text-slate-400 group-hover:text-white group-hover:scale-105")} />
            {!showCollapsed && (<>
                <span className={cn("ml-4 flex-1 text-left font-semibold relative z-10 transition-all duration-300 ease-out", isActive ? "text-white drop-shadow-sm" : "group-hover:text-white")}>{item.name}</span>
                {item.badge && (<span className={cn("relative z-10 text-[10px] px-3 py-1.5 rounded-full font-bold shadow-lg transition-all duration-300 ease-out", isActive ? "bg-white/20 text-white animate-pulse" : "bg-gradient-to-r from-orange-400 to-orange-500 text-white animate-bounce")}>{item.badge}</span>)}
            </>)}
            {showCollapsed && (<div className={cn("absolute left-full ml-4 px-4 py-3 bg-slate-800/95 text-white text-sm rounded-xl transition-all duration-200 ease-out z-50 backdrop-blur-xl border border-slate-700/50 shadow-2xl", "opacity-0 invisible group-hover:opacity-100 group-hover:visible", "transform translate-x-2 group-hover:translate-x-0")}>
                <div className="font-semibold">{item.name}</div>
                {item.badge && <div className="mt-1"><span className="inline-block bg-orange-500 text-xs px-2 py-1 rounded-full font-medium">{item.badge} new</span></div>}
                <div className="absolute right-full top-1/2 -translate-y-1/2"><div className="border-[6px] border-transparent border-r-slate-800/95"></div><div className="absolute top-0 right-0 border-[5px] border-transparent border-r-slate-700 blur-sm"></div></div>
            </div>)}
            {showCollapsed && item.badge && <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg animate-pulse z-10">{item.badge}</div>}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      {screenSize.isMobile && isOpen && <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 transition-opacity duration-300 ease-out" onClick={onClose} />}
      <aside className={cn("fixed h-screen left-0 top-0 z-50 transition-all duration-300 ease-out flex flex-col", "shadow-2xl border-r border-slate-800/30", "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white backdrop-blur-2xl", getSidebarWidth(), screenSize.isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0")}>
        <div className="absolute inset-0 z-0"><div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-transparent to-blue-900/30"></div><div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(16,185,129,0.15),transparent_60%)]"></div><div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.15),transparent_60%)]"></div><div className="absolute bottom-12 right-8 opacity-8"><Leaf className="w-32 h-32 text-emerald-400/20 animate-pulse" style={{animationDuration: '4s'}} /></div><div className="absolute top-1/3 right-6 opacity-8"><Sprout className="w-20 h-20 text-emerald-300/20 animate-bounce" style={{animationDuration: '6s'}} /></div><div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px'}}></div></div>
        {screenSize.isMobile && <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl z-50 bg-slate-800/80 text-slate-300 hover:bg-slate-700 transition-all duration-200 ease-out backdrop-blur-sm border border-slate-700/50 shadow-lg hover:scale-110 active:scale-95"><X className="w-5 h-5" /></button>}
        <div className={cn("border-b border-slate-700/30 relative z-10 backdrop-blur-xl transition-all duration-300 ease-out", shouldShowCollapsed() ? "p-4" : "px-6 py-6")}>
          <div className="flex items-center justify-center transition-all duration-300 ease-out">
            {shouldShowExpanded() && <div className="relative"><img src="/navbar-logo.png" alt="FieldFair" className="w-12 h-12 transition-all duration-300 ease-out hover:scale-110" /></div>}
            {shouldShowCollapsed() && <div className="relative"><div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out hover:scale-110 border border-white/20"><img src="/sidebar-logo.png" alt="FieldFair" className="w-8 h-8" /></div></div>}
          </div>
          {screenSize.isDesktop && setIsCollapsed && <button onClick={() => setIsCollapsed(!isCollapsed)} className={cn("absolute w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ease-out", "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white shadow-lg backdrop-blur-sm border border-slate-600/50", "hover:scale-110 active:scale-95", isCollapsed ? "right-0 -mr-4 top-[26px]" : "right-0 -mr-4 top-[32px]")} aria-label="Toggle sidebar">{isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}</button>}
        </div>
        <div className="flex-1 relative overflow-hidden">
          <div ref={scrollRef} className="h-full py-6 overflow-y-auto transition-all duration-300 ease-out" style={{scrollbarWidth: 'thin', scrollbarColor: '#10b981 transparent'}}><style jsx>{`div::-webkit-scrollbar { width: 6px; } div::-webkit-scrollbar-track { background: transparent; } div::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #10b981, #059669); border-radius: 3px; } div::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #059669, #047857); }`}</style>
            <div className={cn("transition-all duration-300 ease-out", shouldShowCollapsed() ? "px-2" : "px-4")}>
              <div className={cn("text-[10px] text-emerald-300/70 mb-4 uppercase tracking-[0.15em] font-bold px-2 transition-all duration-300 ease-out overflow-hidden", shouldShowExpanded() ? "opacity-100 h-4" : "opacity-0 h-0")}>{userType === 'farmer' ? '🌱 FARM MANAGEMENT' : '🛒 MARKETPLACE'}</div>
              <nav className="space-y-2">{menuItems.map((item) => renderMenuItem(item))}</nav>
            </div>
          </div>
        </div>
        <div className={cn("p-4 border-t border-slate-700/30 relative z-10 backdrop-blur-xl transition-all duration-300 ease-out overflow-hidden", shouldShowExpanded() ? "opacity-100 h-auto" : "opacity-0 h-0 p-0")}>
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-3 backdrop-blur-xl border border-slate-700/30 shadow-xl">
            <div className="flex items-center mb-3">
              <div className="relative"><div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center ring-2 ring-slate-600/50 shadow-lg"><span className="text-sm font-bold text-white">{userInfo.avatar}</span></div>{userType === 'farmer' && <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"><Award className="w-2.5 h-2.5 text-white" /></div>}<div className={cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 shadow-lg", userInfo.statusColor)}></div></div>
              <div className="ml-3 flex-1"><div className="text-sm font-semibold text-white">{userInfo.name}</div></div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-slate-600/70 hover:to-slate-500/70 text-slate-300 hover:text-white rounded-lg transition-all duration-200 ease-out border border-slate-600/30 hover:border-slate-500/50 backdrop-blur-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"><LogOut className="w-4 h-4 mr-2" /><span className="text-sm font-medium">Logout</span></button>
          </div>
        </div>
        <div className={cn("p-4 border-t border-slate-700/30 relative z-10 backdrop-blur-xl transition-all duration-300 ease-out", shouldShowCollapsed() ? "opacity-100 h-auto" : "opacity-0 h-0 p-0 overflow-hidden")}>
          <div className="flex justify-center">
            <div className="relative group"><div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center ring-2 ring-slate-600/50 shadow-lg transition-all duration-200 ease-out hover:scale-110 cursor-pointer"><span className="text-sm font-bold text-white">{userInfo.avatar}</span></div>{userType === 'farmer' && <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"><Award className="w-2.5 h-2.5 text-white" /></div>}<div className={cn("absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 shadow-lg", userInfo.statusColor)}></div><div className="absolute left-full ml-4 px-4 py-3 bg-slate-800/95 text-white text-sm rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50 backdrop-blur-xl border border-slate-700/50 shadow-2xl whitespace-nowrap"><div className="font-semibold">{userInfo.name}</div><div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-slate-800/95"></div></div></div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default FieldFairSidebar;