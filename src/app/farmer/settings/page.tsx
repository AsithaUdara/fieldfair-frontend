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
  Menu
} from 'lucide-react';

const FarmerSettingsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(false);

  // Enhanced responsive detection - same as marketplace page
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  // Enhanced responsive detection
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

  // Settings data
  const [settings, setSettings] = useState({
    // General Settings
    general: {
      language: 'en',
      timezone: 'Asia/Colombo',
      dateFormat: 'DD/MM/YYYY',
      currency: 'LKR',
      theme: 'light',
      autoSave: true
    },
    
    // Notification Settings
    notifications: {
      email: {
        newOrders: true,
        paymentReceived: true,
        customerMessages: true,
        weeklyReports: true,
        promotions: false
      },
      push: {
        newOrders: true,
        urgentMessages: true,
        deliveryUpdates: true,
        priceAlerts: false
      },
      sms: {
        orderConfirmations: true,
        paymentAlerts: true,
        emergencyAlerts: true
      },
      sound: true,
      quiet_hours: {
        enabled: true,
        start: '22:00',
        end: '07:00'
      }
    },
    
    // Privacy & Security
    security: {
      twoFactorAuth: true,
      loginAlerts: true,
      sessionTimeout: 30,
      allowDataExport: true,
      profileVisibility: 'public',
      locationSharing: true,
      contactInfoVisible: true
    },
    
    // Payment Settings
    payment: {
      preferredMethod: 'bank_transfer',
      autoWithdraw: false,
      withdrawalDay: 'friday',
      minimumBalance: 5000,
      paymentNotifications: true
    },
    
    // Business Settings
    business: {
      autoAcceptOrders: false,
      maxDailyOrders: 50,
      preparationTime: 24,
      deliveryRadius: 25,
      operatingHours: {
        monday: { open: '08:00', close: '18:00', enabled: true },
        tuesday: { open: '08:00', close: '18:00', enabled: true },
        wednesday: { open: '08:00', close: '18:00', enabled: true },
        thursday: { open: '08:00', close: '18:00', enabled: true },
        friday: { open: '08:00', close: '18:00', enabled: true },
        saturday: { open: '08:00', close: '16:00', enabled: true },
        sunday: { open: '09:00', close: '15:00', enabled: false }
      }
    }
  });

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

  const settingSections = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Privacy', icon: Lock },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'business', label: 'Business', icon: Globe }
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Enhanced Sidebar - Single Component */}
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={screenSize.isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="farmer"
      />

      {/* Main Content - Enhanced Responsive Margin */}
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
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                )}
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {screenSize.isMobile ? 'Settings' : '⚙️ Farmer Settings'}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1 hidden sm:block">
                    {screenSize.isMobile 
                      ? 'Manage preferences' 
                      : 'Manage your account and application preferences'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              {pendingChanges && (
                <div className={`${screenSize.isMobile ? 'hidden' : 'flex'} items-center bg-orange-50 border border-orange-200 rounded-lg px-3 lg:px-4 py-2 text-orange-700`}>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span className="text-sm">{screenSize.isTablet ? 'Unsaved' : 'Unsaved changes'}</span>
                </div>
              )}
              
              <button 
                onClick={saveSettings}
                disabled={!pendingChanges}
                className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors ${
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
            {/* Responsive Layout */}
            <div className={`grid gap-6 ${
              screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'
            }`}>
              {/* Settings Navigation - Responsive */}
              <div className={screenSize.isMobile ? 'order-2' : 'lg:col-span-1'}>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  {screenSize.isMobile ? (
                    // Mobile: Horizontal scrollable tabs
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {settingSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                            activeSection === section.id
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <section.icon className="w-4 h-4" />
                          <span>{section.label.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    // Desktop/Tablet: Vertical navigation
                    <nav className="space-y-2">
                      {settingSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            activeSection === section.id
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <section.icon className="w-5 h-5" />
                          <span className="font-medium">
                            {screenSize.isTablet ? section.label.split(' ')[0] : section.label}
                          </span>
                        </button>
                      ))}
                    </nav>
                  )}
                </div>
              </div>

              {/* Settings Content - Responsive */}
              <div className={`${screenSize.isMobile ? 'order-1' : 'lg:col-span-3'}`}>
                <div className="bg-white rounded-xl border border-gray-200">
                  {/* General Settings */}
                  {activeSection === 'general' && (
                    <div className="p-4 lg:p-6">
                      <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">General Settings</h2>
                      
                      <div className="space-y-6">
                        <div className={`grid gap-4 lg:gap-6 ${
                          screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
                        }`}>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                            <select 
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={settings.general.language}
                              onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                            >
                              <option value="en">English</option>
                              <option value="si">සිංහල</option>
                              <option value="ta">தமிழ்</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                            <select 
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={settings.general.timezone}
                              onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                            >
                              <option value="Asia/Colombo">Asia/Colombo (UTC+5:30)</option>
                              <option value="Asia/Kolkata">Asia/Kolkata (UTC+5:30)</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                            <select 
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={settings.general.dateFormat}
                              onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                            >
                              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                            <select 
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              {settings.general.theme === 'light' ? <Sun className="w-5 h-5 text-orange-500" /> : <Moon className="w-5 h-5 text-blue-500" />}
                              <div>
                                <div className="font-medium text-gray-900">Theme</div>
                                <div className="text-sm text-gray-600 hidden sm:block">Choose your preferred theme</div>
                              </div>
                            </div>
                            <select 
                              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                              value={settings.general.theme}
                              onChange={(e) => handleSettingChange('general', 'theme', e.target.value)}
                            >
                              <option value="light">Light</option>
                              <option value="dark">Dark</option>
                              <option value="auto">Auto</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Database className="w-5 h-5 text-emerald-500" />
                              <div>
                                <div className="font-medium text-gray-900">Auto-save</div>
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
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Settings */}
                  {activeSection === 'notifications' && (
                    <div className="p-4 lg:p-6">
                      <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">Notification Settings</h2>
                      
                      <div className="space-y-6">
                        {/* Email Notifications */}
                        <div>
                          <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Mail className="w-5 h-5 mr-2" />
                            Email Notifications
                          </h3>
                          <div className="space-y-3">
                            {Object.entries(settings.notifications.email).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <div className="font-medium text-gray-900 text-sm lg:text-base capitalize">
                                    {key.replace(/([A-Z])/g, ' $1')}
                                  </div>
                                  <div className="text-xs lg:text-sm text-gray-600 hidden sm:block">
                                    {key === 'newOrders' && 'Get notified when new orders are placed'}
                                    {key === 'paymentReceived' && 'Notification when payments are received'}
                                    {key === 'customerMessages' && 'When customers send you messages'}
                                    {key === 'weeklyReports' && 'Weekly sales and performance reports'}
                                    {key === 'promotions' && 'Marketing and promotional emails'}
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
                          <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Smartphone className="w-5 h-5 mr-2" />
                            Push Notifications
                          </h3>
                          <div className="space-y-3">
                            {Object.entries(settings.notifications.push).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                  <div className="font-medium text-gray-900 text-sm lg:text-base capitalize">
                                    {key.replace(/([A-Z])/g, ' $1')}
                                  </div>
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
                          <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Sound & Timing</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                {settings.notifications.sound ? <Volume2 className="w-5 h-5 text-blue-500" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
                                <div>
                                  <div className="font-medium text-gray-900 text-sm lg:text-base">Notification Sounds</div>
                                  <div className="text-xs lg:text-sm text-gray-600 hidden sm:block">Play sound for notifications</div>
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
                            
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <Clock className="w-5 h-5 text-purple-500" />
                                  <div>
                                    <div className="font-medium text-gray-900 text-sm lg:text-base">Quiet Hours</div>
                                    <div className="text-xs lg:text-sm text-gray-600 hidden sm:block">Disable notifications during specific hours</div>
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
                                <div className={`grid gap-4 mt-3 ${
                                  screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-2'
                                }`}>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                    <input 
                                      type="time"
                                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                      value={settings.notifications.quiet_hours.start}
                                      onChange={(e) => handleNestedSettingChange('notifications', 'quiet_hours', 'start', e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                    <input 
                                      type="time"
                                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
                      <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">Security & Privacy</h2>
                      
                      <div className="space-y-6">
                        {/* Account Security */}
                        <div>
                          <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Shield className="w-5 h-5 text-green-500" />
                                <div>
                                  <div className="font-medium text-gray-900 text-sm lg:text-base">Two-Factor Authentication</div>
                                  <div className="text-xs lg:text-sm text-gray-600 hidden sm:block">Add an extra layer of security to your account</div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`text-sm font-medium ${settings.security.twoFactorAuth ? 'text-green-600' : 'text-gray-500'}`}>
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

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Bell className="w-5 h-5 text-blue-500" />
                                <div>
                                  <div className="font-medium text-gray-900 text-sm lg:text-base">Login Alerts</div>
                                  <div className="text-xs lg:text-sm text-gray-600 hidden sm:block">Get notified of login attempts</div>
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

                            <div className="p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <Clock className="w-5 h-5 text-orange-500" />
                                  <div>
                                    <div className="font-medium text-gray-900 text-sm lg:text-base">Session Timeout</div>
                                    <div className="text-xs lg:text-sm text-gray-600 hidden sm:block">Auto-logout after inactivity</div>
                                  </div>
                                </div>
                                <select 
                                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                          <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <Eye className="w-5 h-5 text-purple-500" />
                                <div>
                                  <div className="font-medium text-gray-900 text-sm lg:text-base">Profile Visibility</div>
                                  <div className="text-xs lg:text-sm text-gray-600 hidden sm:block">Who can see your profile</div>
                                </div>
                              </div>
                              <select 
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                value={settings.security.profileVisibility}
                                onChange={(e) => handleSettingChange('security', 'profileVisibility', e.target.value)}
                              >
                                <option value="public">Public</option>
                                <option value="customers">Customers</option>
                                <option value="private">Private</option>
                              </select>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-red-500" />
                                <div>
                                  <div className="font-medium text-gray-900 text-sm lg:text-base">Location Sharing</div>
                                  <div className="text-xs lg:text-sm text-gray-600 hidden sm:block">Share your farm location with customers</div>
                                </div>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer"
                                  checked={settings.security.locationSharing}
                                  onChange={(e) => handleSettingChange('security', 'locationSharing', e.target.checked)}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Data Management */}
                        <div>
                          <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
                          <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                              <div className="flex items-center space-x-3">
                                <Download className="w-5 h-5 text-blue-600" />
                                <div className="text-left">
                                  <div className="font-medium text-blue-900 text-sm lg:text-base">Export Data</div>
                                  <div className="text-xs lg:text-sm text-blue-700 hidden sm:block">Download all your data</div>
                                </div>
                              </div>
                              <Download className="w-4 h-4 text-blue-600" />
                            </button>

                            <button className="w-full flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                              <div className="flex items-center space-x-3">
                                <Trash2 className="w-5 h-5 text-red-600" />
                                <div className="text-left">
                                  <div className="font-medium text-red-900 text-sm lg:text-base">Delete Account</div>
                                  <div className="text-xs lg:text-sm text-red-700 hidden sm:block">Permanently delete your account and data</div>
                                </div>
                              </div>
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Settings */}
                  {activeSection === 'payment' && (
                    <div className="p-4 lg:p-6">
                      <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">Payment Settings</h2>
                      
                      <div className="space-y-6">
                        <div className={`grid gap-4 lg:gap-6 ${
                          screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
                        }`}>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Payment Method</label>
                            <select 
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={settings.payment.preferredMethod}
                              onChange={(e) => handleSettingChange('payment', 'preferredMethod', e.target.value)}
                            >
                              <option value="bank_transfer">Bank Transfer</option>
                              <option value="mobile_wallet">Mobile Wallet</option>
                              <option value="cash_on_delivery">Cash on Delivery</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Balance (LKR)</label>
                            <input 
                              type="number"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                              value={settings.payment.minimumBalance}
                              onChange={(e) => handleSettingChange('payment', 'minimumBalance', parseInt(e.target.value))}
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <RefreshCw className="w-5 h-5 text-green-500" />
                              <div>
                                <div className="font-medium text-gray-900 text-sm lg:text-base">Auto Withdrawal</div>
                                <div className="text-xs lg:text-sm text-gray-600 hidden sm:block">Automatically withdraw earnings</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer"
                                checked={settings.payment.autoWithdraw}
                                onChange={(e) => handleSettingChange('payment', 'autoWithdraw', e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>

                          {settings.payment.autoWithdraw && (
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Day</label>
                              <select 
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                value={settings.payment.withdrawalDay}
                                onChange={(e) => handleSettingChange('payment', 'withdrawalDay', e.target.value)}
                              >
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Business Settings */}
                  {activeSection === 'business' && (
                    <div className="p-4 lg:p-6">
                      <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6">Business Settings</h2>
                      
                      <div className="space-y-6">
                        {/* Order Management */}
                        <div>
                          <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Order Management</h3>
                          <div className={`grid gap-4 lg:gap-6 ${
                            screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
                          }`}>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                  <div className="font-medium text-gray-900 text-sm lg:text-base">Auto-Accept Orders</div>
                                  <div className="text-xs lg:text-sm text-gray-600 hidden sm:block">Automatically accept incoming orders</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    checked={settings.business.autoAcceptOrders}
                                    onChange={(e) => handleSettingChange('business', 'autoAcceptOrders', e.target.checked)}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Max Daily Orders</label>
                                <input 
                                  type="number"
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                  value={settings.business.maxDailyOrders}
                                  onChange={(e) => handleSettingChange('business', 'maxDailyOrders', parseInt(e.target.value))}
                                />
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Preparation Time (hours)</label>
                                <input 
                                  type="number"
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                  value={settings.business.preparationTime}
                                  onChange={(e) => handleSettingChange('business', 'preparationTime', parseInt(e.target.value))}
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Radius (km)</label>
                                <input 
                                  type="number"
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                  value={settings.business.deliveryRadius}
                                  onChange={(e) => handleSettingChange('business', 'deliveryRadius', parseInt(e.target.value))}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Operating Hours */}
                        <div>
                          <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Operating Hours</h3>
                          <div className="space-y-3">
                            {Object.entries(settings.business.operatingHours).map(([day, hours]) => (
                              <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                      type="checkbox" 
                                      className="sr-only peer"
                                      checked={hours.enabled}
                                      onChange={(e) => handleNestedSettingChange('business', 'operatingHours', day, {...hours, enabled: e.target.checked})}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                  </label>
                                  <span className="font-medium text-gray-900 capitalize text-sm lg:text-base w-16 lg:w-20">
                                    {screenSize.isMobile ? day.slice(0, 3) : day}
                                  </span>
                                </div>
                                
                                {hours.enabled && (
                                  <div className="flex items-center space-x-2">
                                    <input 
                                      type="time"
                                      className="border border-gray-300 rounded px-2 py-1 text-xs lg:text-sm"
                                      value={hours.open}
                                      onChange={(e) => handleNestedSettingChange('business', 'operatingHours', day, {...hours, open: e.target.value})}
                                    />
                                    <span className="text-gray-500 text-xs lg:text-sm">to</span>
                                    <input 
                                      type="time"
                                      className="border border-gray-300 rounded px-2 py-1 text-xs lg:text-sm"
                                      value={hours.close}
                                      onChange={(e) => handleNestedSettingChange('business', 'operatingHours', day, {...hours, close: e.target.value})}
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
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

        {/* Mobile Save Button */}
        {screenSize.isMobile && pendingChanges && (
          <div className="fixed bottom-6 left-4 right-4 z-40">
            <button 
              onClick={saveSettings}
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerSettingsPage;