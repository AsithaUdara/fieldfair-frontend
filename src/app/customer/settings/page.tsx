"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Settings,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Shield,
  Smartphone,
  Mail,
  User,
  Database,
  Download,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Check,
  X,
  AlertTriangle,
  Info,
  Moon,
  Sun,
  Languages,
  MapPin,
  Clock,
  Wifi,
  HelpCircle,
  LogOut,
  RefreshCw,
  FileText,
  Camera,
  Volume2,
  VolumeX,
  Zap,
  Target,
  Heart,
  Package,
  ShoppingCart,
  Star,
  Leaf,
  Users,
  MessageCircle,
  Phone,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  Percent,
  Gift,
  Award,
  Navigation,
  Truck,
  Calendar,
  Timer,
  Sparkles,
  CheckCircle,
  Menu
} from 'lucide-react';

const CustomerSettingsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(false);
  
  // Enhanced responsive detection that matches the sidebar
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  // Settings data
  const [settings, setSettings] = useState({
    // General Settings
    general: {
      language: 'en',
      timezone: 'Asia/Colombo',
      dateFormat: 'DD/MM/YYYY',
      currency: 'LKR',
      theme: 'light',
      autoSave: true,
      defaultViewMode: 'grid'
    },
    
    // Notification Settings
    notifications: {
      email: {
        orderUpdates: true,
        newProducts: true,
        priceDrops: true,
        farmerMessages: true,
        weeklyDeals: false,
        marketingEmails: false,
        newsletter: true
      },
      push: {
        orderUpdates: true,
        deliveryAlerts: true,
        newProducts: false,
        priceDrops: true,
        chatMessages: true,
        specialOffers: false
      },
      sms: {
        orderConfirmations: true,
        deliveryAlerts: true,
        emergencyAlerts: true,
        marketingMessages: false
      },
      sound: true,
      vibration: true,
      quiet_hours: {
        enabled: true,
        start: '22:00',
        end: '07:00'
      }
    },
    
    // Privacy & Security
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
      sessionTimeout: 30,
      allowDataExport: true,
      profileVisibility: 'friends',
      showPurchaseHistory: false,
      allowFarmerContact: true,
      shareLocationData: true,
      analyticsOptOut: false
    },
    
    // Shopping Preferences
    shopping: {
      defaultSort: 'recommended',
      preferredDeliveryTime: 'morning',
      maxDeliveryDistance: 15,
      autoApplyDiscounts: true,
      savePaymentMethods: true,
      wishlistNotifications: true,
      stockAlerts: true,
      priceTrackingAlerts: true,
      organicPreference: true,
      localFarmersOnly: false,
      sustainabilityScoreVisible: true
    },
    
    // Payment Settings
    payment: {
      defaultPaymentMethod: 'card',
      saveNewCards: true,
      requireAuthForPurchases: false,
      autoReorder: false,
      budgetAlerts: false,
      monthlyBudget: 10000,
      receiptEmails: true
    },
    
    // Communication Settings
    communication: {
      allowFarmerMessages: true,
      autoReplyEnabled: false,
      preferredContactMethod: 'app',
      showOnlineStatus: true,
      blockUnverifiedFarmers: false,
      ratingReminders: true,
      reviewIncentives: true
    }
  });

  // Enhanced responsive detection - same as marketplace
  useEffect(() => {
    setMounted(true);
    
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const newScreenSize = {
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      };
      
      // Only update if there's a change
      if (JSON.stringify(newScreenSize) !== JSON.stringify(screenSize)) {
        setScreenSize(newScreenSize);
      }

      // Auto-close mobile menu when switching to desktop/tablet
      if (!newScreenSize.isMobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize, { passive: true });
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [screenSize, isMobileMenuOpen]);

  // Loading state to prevent hydration errors
  if (!mounted) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 bg-emerald-900 animate-pulse"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  // Enhanced margin calculation that matches the sidebar logic
  const getMainContentMargin = () => {
    if (screenSize.isMobile) {
      return 'ml-0'; // No margin on mobile (sidebar overlays)
    } else if (screenSize.isTablet) {
      return 'ml-20'; // Always collapsed margin on tablet
    } else {
      return sidebarCollapsed ? 'ml-20' : 'ml-72'; // User controlled on desktop
    }
  };

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setPendingChanges(true);
  };

  const handleNestedSettingChange = (section, parentKey, childKey, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentKey]: {
          ...prev[section][parentKey],
          [childKey]: value
        }
      }
    }));
    setPendingChanges(true);
  };

  const saveSettings = () => {
    // Save logic here
    setPendingChanges(false);
  };

  const resetToDefaults = () => {
    // Reset to default settings
    setPendingChanges(true);
  };

  const exportData = () => {
    console.log('Exporting user data...');
  };

  const deleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
    }
  };

  const settingSections = [
    { id: 'general', label: 'General', icon: Settings, color: 'emerald' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'blue' },
    { id: 'security', label: 'Privacy & Security', icon: Lock, color: 'red' },
    { id: 'shopping', label: 'Shopping', icon: ShoppingCart, color: 'purple' },
    { id: 'payment', label: 'Payment', icon: CreditCard, color: 'yellow' },
    { id: 'communication', label: 'Communication', icon: MessageCircle, color: 'indigo' }
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Enhanced Responsive Sidebar */}
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={screenSize.isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="customer"
      />

      <div className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 ${getMainContentMargin()}`}>
        {/* Enhanced Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4">
                {/* Mobile menu button - only show on mobile */}
                {screenSize.isMobile && (
                  <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 mr-2 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                )}
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {screenSize.isMobile ? 'Settings' : '⚙️ Settings'}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1 hidden sm:block">
                    {screenSize.isMobile 
                      ? 'Account preferences' 
                      : 'Manage your account preferences and settings'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              {pendingChanges && (
                <div className={`${screenSize.isMobile ? 'hidden' : 'flex'} items-center bg-orange-50 border border-orange-200 rounded-xl px-4 py-2 text-orange-700`}>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Unsaved changes</span>
                </div>
              )}
              
              {!screenSize.isMobile && (
                <button 
                  onClick={resetToDefaults}
                  className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  <span className="text-sm">Reset to Defaults</span>
                </button>
              )}
              
              <button 
                onClick={saveSettings}
                disabled={!pendingChanges}
                className={`px-3 lg:px-4 py-2 rounded-xl text-sm font-semibold flex items-center transition-colors shadow-lg ${
                  pendingChanges 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Save className="w-4 h-4 mr-2" />
                <span>{screenSize.isMobile ? 'Save' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-4 lg:p-6">
            <div className={`grid gap-6 ${
              screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'
            }`}>
              {/* Settings Navigation - Responsive */}
              <div className={screenSize.isMobile ? 'order-2' : 'lg:col-span-1'}>
                <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                  {screenSize.isMobile ? (
                    /* Mobile: Horizontal scrolling tabs */
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {settingSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-left transition-all duration-300 whitespace-nowrap ${
                            activeSection === section.id
                              ? `bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm`
                              : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                          }`}
                        >
                          <section.icon className="w-4 h-4" />
                          <span className="font-medium text-sm">{section.label}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    /* Desktop/Tablet: Vertical navigation */
                    <nav className="space-y-2">
                      {settingSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                            activeSection === section.id
                              ? `bg-${section.color}-100 text-${section.color}-700 border border-${section.color}-200 shadow-sm`
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <section.icon className="w-5 h-5" />
                          <span className="font-medium">{section.label}</span>
                        </button>
                      ))}
                    </nav>
                  )}
                </div>
              </div>

              {/* Settings Content */}
              <div className={`${screenSize.isMobile ? 'order-1' : 'lg:col-span-3'}`}>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                  {/* General Settings */}
                  {activeSection === 'general' && (
                    <div className="p-4 lg:p-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-emerald-100 rounded-xl">
                          <Settings className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">General Settings</h2>
                          <p className="text-sm text-gray-600 hidden sm:block">Configure your basic app preferences</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className={`grid gap-6 ${screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Language</label>
                            <select 
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              value={settings.general.language}
                              onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                            >
                              <option value="en">English</option>
                              <option value="si">සිංහල</option>
                              <option value="ta">தமிழ்</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Timezone</label>
                            <select 
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              value={settings.general.timezone}
                              onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                            >
                              <option value="Asia/Colombo">Asia/Colombo (UTC+5:30)</option>
                              <option value="Asia/Kolkata">Asia/Kolkata (UTC+5:30)</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Date Format</label>
                            <select 
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              value={settings.general.dateFormat}
                              onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                            >
                              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Currency</label>
                            <select 
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              value={settings.general.currency}
                              onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
                            >
                              <option value="LKR">Sri Lankan Rupee (LKR)</option>
                              <option value="USD">US Dollar (USD)</option>
                              <option value="EUR">Euro (EUR)</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                              {settings.general.theme === 'light' ? <Sun className="w-5 h-5 text-orange-500" /> : <Moon className="w-5 h-5 text-blue-500" />}
                              <div>
                                <div className="font-semibold text-gray-900">Appearance</div>
                                <div className="text-sm text-gray-600 hidden sm:block">Choose your preferred theme</div>
                              </div>
                            </div>
                            <select 
                              className="border border-gray-300 rounded-xl px-4 py-2 text-sm"
                              value={settings.general.theme}
                              onChange={(e) => handleSettingChange('general', 'theme', e.target.value)}
                            >
                              <option value="light">Light</option>
                              <option value="dark">Dark</option>
                              <option value="auto">Auto</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <Database className="w-5 h-5 text-emerald-500" />
                              <div>
                                <div className="font-semibold text-gray-900">Auto-save</div>
                                <div className="text-sm text-gray-600 hidden sm:block">Automatically save changes</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={settings.general.autoSave}
                                onChange={(e) => handleSettingChange('general', 'autoSave', e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <Globe className="w-5 h-5 text-blue-500" />
                              <div>
                                <div className="font-semibold text-gray-900">Default View Mode</div>
                                <div className="text-sm text-gray-600 hidden sm:block">How products are displayed by default</div>
                              </div>
                            </div>
                            <select 
                              className="border border-gray-300 rounded-xl px-4 py-2 text-sm"
                              value={settings.general.defaultViewMode}
                              onChange={(e) => handleSettingChange('general', 'defaultViewMode', e.target.value)}
                            >
                              <option value="grid">Grid View</option>
                              <option value="list">List View</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Settings */}
                  {activeSection === 'notifications' && (
                    <div className="p-4 lg:p-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <Bell className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">Notification Settings</h2>
                          <p className="text-sm text-gray-600 hidden sm:block">Control how and when you receive notifications</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {/* Email Notifications */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Mail className="w-5 h-5 mr-2" />
                            Email Notifications
                          </h3>
                          <div className="space-y-3">
                            {Object.entries(settings.notifications.email).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex-1 mr-4">
                                  <div className="font-semibold text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                                  <div className="text-sm text-gray-600 hidden sm:block">
                                    {key === 'orderUpdates' && 'Get notified about order status changes'}
                                    {key === 'newProducts' && 'Alerts when new products are available'}
                                    {key === 'priceDrops' && 'Notifications when prices drop on your favorites'}
                                    {key === 'farmerMessages' && 'When farmers send you messages'}
                                    {key === 'weeklyDeals' && 'Weekly deals and special offers'}
                                    {key === 'marketingEmails' && 'Marketing and promotional emails'}
                                    {key === 'newsletter' && 'Monthly newsletter with tips and updates'}
                                  </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={value}
                                    onChange={(e) => handleNestedSettingChange('notifications', 'email', key, e.target.checked)}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Push Notifications */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Smartphone className="w-5 h-5 mr-2" />
                            Push Notifications
                          </h3>
                          <div className="space-y-3">
                            {Object.entries(settings.notifications.push).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex-1 mr-4">
                                  <div className="font-semibold text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={value}
                                    onChange={(e) => handleNestedSettingChange('notifications', 'push', key, e.target.checked)}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Sound & Quiet Hours */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sound & Timing</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center space-x-3 flex-1 mr-4">
                                {settings.notifications.sound ? <Volume2 className="w-5 h-5 text-blue-500" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
                                <div>
                                  <div className="font-semibold text-gray-900">Notification Sounds</div>
                                  <div className="text-sm text-gray-600 hidden sm:block">Play sound for notifications</div>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer"
                                  checked={settings.notifications.sound}
                                  onChange={(e) => handleSettingChange('notifications', 'sound', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                              </label>
                            </div>
                            
                            <div className="p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3 flex-1 mr-4">
                                  <Clock className="w-5 h-5 text-purple-500" />
                                  <div>
                                    <div className="font-semibold text-gray-900">Quiet Hours</div>
                                    <div className="text-sm text-gray-600 hidden sm:block">Disable notifications during specific hours</div>
                                  </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={settings.notifications.quiet_hours.enabled}
                                    onChange={(e) => handleNestedSettingChange('notifications', 'quiet_hours', 'enabled', e.target.checked)}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                              </div>
                              
                              {settings.notifications.quiet_hours.enabled && (
                                <div className={`grid gap-4 mt-3 ${screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                  <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
                                    <input 
                                      type="time"
                                      className="w-full border border-gray-300 rounded-xl px-3 py-2"
                                      value={settings.notifications.quiet_hours.start}
                                      onChange={(e) => handleNestedSettingChange('notifications', 'quiet_hours', 'start', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">End Time</label>
                                    <input 
                                      type="time"
                                      className="w-full border border-gray-300 rounded-xl px-3 py-2"
                                      value={settings.notifications.quiet_hours.end}
                                      onChange={(e) => handleNestedSettingChange('notifications', 'quiet_hours', 'end', e.target.value)}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Settings */}
                  {activeSection === 'security' && (
                    <div className="p-4 lg:p-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-red-100 rounded-xl">
                          <Lock className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">Privacy & Security</h2>
                          <p className="text-sm text-gray-600 hidden sm:block">Control your privacy and account security</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {/* Account Security */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center space-x-3 flex-1 mr-4">
                                <Shield className="w-5 h-5 text-green-500" />
                                <div>
                                  <div className="font-semibold text-gray-900">Two-Factor Authentication</div>
                                  <div className="text-sm text-gray-600 hidden sm:block">Add an extra layer of security to your account</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`text-sm font-semibold ${settings.security.twoFactorAuth ? 'text-green-600' : 'text-gray-500'}`}>
                                  {settings.security.twoFactorAuth ? 'Enabled' : 'Disabled'}
                                </span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={settings.security.twoFactorAuth}
                                    onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center space-x-3 flex-1 mr-4">
                                <Bell className="w-5 h-5 text-blue-500" />
                                <div>
                                  <div className="font-semibold text-gray-900">Login Alerts</div>
                                  <div className="text-sm text-gray-600 hidden sm:block">Get notified of login attempts</div>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer"
                                  checked={settings.security.loginAlerts}
                                  onChange={(e) => handleSettingChange('security', 'loginAlerts', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                              </label>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3 flex-1 mr-4">
                                  <Timer className="w-5 h-5 text-orange-500" />
                                  <div>
                                    <div className="font-semibold text-gray-900">Session Timeout</div>
                                    <div className="text-sm text-gray-600 hidden sm:block">Auto-logout after inactivity</div>
                                  </div>
                                </div>
                                <select 
                                  className="border border-gray-300 rounded-xl px-3 py-2 text-sm"
                                  value={settings.security.sessionTimeout}
                                  onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                                >
                                  <option value={15}>15 min</option>
                                  <option value={30}>30 min</option>
                                  <option value={60}>1 hour</option>
                                  <option value={120}>2 hours</option>
                                  <option value={0}>Never</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Privacy Settings */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center space-x-3 flex-1 mr-4">
                                <Eye className="w-5 h-5 text-purple-500" />
                                <div>
                                  <div className="font-semibold text-gray-900">Profile Visibility</div>
                                  <div className="text-sm text-gray-600 hidden sm:block">Who can see your profile</div>
                                </div>
                              </div>
                              <select 
                                className="border border-gray-300 rounded-xl px-3 py-2 text-sm"
                                value={settings.security.profileVisibility}
                                onChange={(e) => handleSettingChange('security', 'profileVisibility', e.target.value)}
                              >
                                <option value="public">Public</option>
                                <option value="friends">Friends Only</option>
                                <option value="private">Private</option>
                              </select>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center space-x-3 flex-1 mr-4">
                                <Package className="w-5 h-5 text-green-500" />
                                <div>
                                  <div className="font-semibold text-gray-900">Show Purchase History</div>
                                  <div className="text-sm text-gray-600 hidden sm:block">Let farmers see what you've bought before</div>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer"
                                  checked={settings.security.showPurchaseHistory}
                                  onChange={(e) => handleSettingChange('security', 'showPurchaseHistory', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                              </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center space-x-3 flex-1 mr-4">
                                <MapPin className="w-5 h-5 text-red-500" />
                                <div>
                                  <div className="font-semibold text-gray-900">Share Location Data</div>
                                  <div className="text-sm text-gray-600 hidden sm:block">Help improve delivery estimates</div>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer"
                                  checked={settings.security.shareLocationData}
                                  onChange={(e) => handleSettingChange('security', 'shareLocationData', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Data Management */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
                          <div className="space-y-3">
                            <button 
                              onClick={exportData}
                              className="w-full flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <Download className="w-5 h-5 text-blue-600" />
                                <div className="text-left">
                                  <div className="font-semibold text-blue-900">Export Data</div>
                                  <div className="text-sm text-blue-700 hidden sm:block">Download all your data</div>
                                </div>
                              </div>
                              <Download className="w-4 h-4 text-blue-600" />
                            </button>

                            <button 
                              onClick={deleteAccount}
                              className="w-full flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <Trash2 className="w-5 h-5 text-red-600" />
                                <div className="text-left">
                                  <div className="font-semibold text-red-900">Delete Account</div>
                                  <div className="text-sm text-red-700 hidden sm:block">Permanently delete your account and data</div>
                                </div>
                              </div>
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Shopping Settings */}
                  {activeSection === 'shopping' && (
                    <div className="p-4 lg:p-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-purple-100 rounded-xl">
                          <ShoppingCart className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">Shopping Preferences</h2>
                          <p className="text-sm text-gray-600 hidden sm:block">Customize your shopping experience</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className={`grid gap-6 ${screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Default Sort Order</label>
                            <select 
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={settings.shopping.defaultSort}
                              onChange={(e) => handleSettingChange('shopping', 'defaultSort', e.target.value)}
                            >
                              <option value="recommended">Recommended</option>
                              <option value="price-low">Price: Low to High</option>
                              <option value="price-high">Price: High to Low</option>
                              <option value="rating">Highest Rated</option>
                              <option value="distance">Nearest First</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Preferred Delivery Time</label>
                            <select 
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={settings.shopping.preferredDeliveryTime}
                              onChange={(e) => handleSettingChange('shopping', 'preferredDeliveryTime', e.target.value)}
                            >
                              <option value="morning">Morning (8AM - 12PM)</option>
                              <option value="afternoon">Afternoon (12PM - 5PM)</option>
                              <option value="evening">Evening (5PM - 8PM)</option>
                              <option value="flexible">Flexible</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3 flex-1 mr-4">
                              <Leaf className="w-5 h-5 text-green-500" />
                              <div>
                                <div className="font-semibold text-gray-900">Prefer Organic Products</div>
                                <div className="text-sm text-gray-600 hidden sm:block">Show organic products first</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={settings.shopping.organicPreference}
                                onChange={(e) => handleSettingChange('shopping', 'organicPreference', e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3 flex-1 mr-4">
                              <Heart className="w-5 h-5 text-red-500" />
                              <div>
                                <div className="font-semibold text-gray-900">Wishlist Notifications</div>
                                <div className="text-sm text-gray-600 hidden sm:block">Get notified when wishlist items are available</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={settings.shopping.wishlistNotifications}
                                onChange={(e) => handleSettingChange('shopping', 'wishlistNotifications', e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3 flex-1 mr-4">
                              <Target className="w-5 h-5 text-blue-500" />
                              <div>
                                <div className="font-semibold text-gray-900">Local Farmers Only</div>
                                <div className="text-sm text-gray-600 hidden sm:block">Show only farmers within your preferred distance</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={settings.shopping.localFarmersOnly}
                                onChange={(e) => handleSettingChange('shopping', 'localFarmersOnly', e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3 flex-1 mr-4">
                              <Percent className="w-5 h-5 text-orange-500" />
                              <div>
                                <div className="font-semibold text-gray-900">Auto-apply Discounts</div>
                                <div className="text-sm text-gray-600 hidden sm:block">Automatically apply available discounts at checkout</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={settings.shopping.autoApplyDiscounts}
                                onChange={(e) => handleSettingChange('shopping', 'autoApplyDiscounts', e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Settings */}
                  {activeSection === 'payment' && (
                    <div className="p-4 lg:p-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-yellow-100 rounded-xl">
                          <CreditCard className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">Payment Settings</h2>
                          <p className="text-sm text-gray-600 hidden sm:block">Manage your payment preferences</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className={`grid gap-6 ${screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Default Payment Method</label>
                            <select 
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={settings.payment.defaultPaymentMethod}
                              onChange={(e) => handleSettingChange('payment', 'defaultPaymentMethod', e.target.value)}
                            >
                              <option value="card">Credit/Debit Card</option>
                              <option value="mobile_wallet">Mobile Wallet</option>
                              <option value="bank_transfer">Bank Transfer</option>
                              <option value="cash_on_delivery">Cash on Delivery</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Monthly Budget Limit (Rs.)</label>
                            <input 
                              type="number"
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={settings.payment.monthlyBudget}
                              onChange={(e) => handleSettingChange('payment', 'monthlyBudget', parseInt(e.target.value))}
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3 flex-1 mr-4">
                              <Shield className="w-5 h-5 text-green-500" />
                              <div>
                                <div className="font-semibold text-gray-900">Save New Payment Methods</div>
                                <div className="text-sm text-gray-600 hidden sm:block">Securely save cards for faster checkout</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={settings.payment.saveNewCards}
                                onChange={(e) => handleSettingChange('payment', 'saveNewCards', e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3 flex-1 mr-4">
                              <AlertTriangle className="w-5 h-5 text-orange-500" />
                              <div>
                                <div className="font-semibold text-gray-900">Budget Alerts</div>
                                <div className="text-sm text-gray-600 hidden sm:block">Get notified when approaching budget limit</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={settings.payment.budgetAlerts}
                                onChange={(e) => handleSettingChange('payment', 'budgetAlerts', e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3 flex-1 mr-4">
                              <Mail className="w-5 h-5 text-blue-500" />
                              <div>
                                <div className="font-semibold text-gray-900">Email Receipts</div>
                                <div className="text-sm text-gray-600 hidden sm:block">Receive email receipts for all purchases</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={settings.payment.receiptEmails}
                                onChange={(e) => handleSettingChange('payment', 'receiptEmails', e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Communication Settings */}
                  {activeSection === 'communication' && (
                    <div className="p-4 lg:p-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-3 bg-indigo-100 rounded-xl">
                          <MessageCircle className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">Communication Settings</h2>
                          <p className="text-sm text-gray-600 hidden sm:block">Control how you communicate with farmers</p>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">Preferred Contact Method</label>
                          <select 
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            value={settings.communication.preferredContactMethod}
                            onChange={(e) => handleSettingChange('communication', 'preferredContactMethod', e.target.value)}
                          >
                            <option value="app">In-App Messages</option>
                            <option value="phone">Phone Call</option>
                            <option value="sms">SMS</option>
                            <option value="email">Email</option>
                          </select>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3 flex-1 mr-4">
                              <MessageCircle className="w-5 h-5 text-blue-500" />
                              <div>
                                <div className="font-semibold text-gray-900">Allow Farmer Messages</div>
                                <div className="text-sm text-gray-600 hidden sm:block">Let farmers send you direct messages</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={settings.communication.allowFarmerMessages}
                                onChange={(e) => handleSettingChange('communication', 'allowFarmerMessages', e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3 flex-1 mr-4">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <div>
                                <div className="font-semibold text-gray-900">Show Online Status</div>
                                <div className="text-sm text-gray-600 hidden sm:block">Let farmers see when you're online</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={settings.communication.showOnlineStatus}
                                onChange={(e) => handleSettingChange('communication', 'showOnlineStatus', e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3 flex-1 mr-4">
                              <Star className="w-5 h-5 text-yellow-500" />
                              <div>
                                <div className="font-semibold text-gray-900">Review Reminders</div>
                                <div className="text-sm text-gray-600 hidden sm:block">Get reminded to leave reviews after orders</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={settings.communication.ratingReminders}
                                onChange={(e) => handleSettingChange('communication', 'ratingReminders', e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3 flex-1 mr-4">
                              <Shield className="w-5 h-5 text-purple-500" />
                              <div>
                                <div className="font-semibold text-gray-900">Block Unverified Farmers</div>
                                <div className="text-sm text-gray-600 hidden sm:block">Only receive messages from verified farmers</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={settings.communication.blockUnverifiedFarmers}
                                onChange={(e) => handleSettingChange('communication', 'blockUnverifiedFarmers', e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerSettingsPage;