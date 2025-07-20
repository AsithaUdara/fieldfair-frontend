"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid,
  QrCode,
  Camera,
  Upload,
  Eye,
  Star,
  Shield,
  Truck,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Phone,
  MessageCircle,
  Plus,
  Share2,
  Download,
  RefreshCw,
  Route,
  Package2,
  Factory,
  Home,
  Navigation,
  Target,
  Scan,
  ScanLine,
  FileText,
  History,
  Clipboard,
  ExternalLink,
  TrendingUp,
  Users as UsersIcon,
  ThumbsUp,
  Timer,
  Sparkles,
  Store,
  ShoppingCart,
  Heart,
  Leaf,
  Sprout,
  MapPin,
  X,
  Menu
} from 'lucide-react';

const CustomerQRScannerPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [scannedProduct, setScannedProduct] = useState(null);
  const [showTraceability, setShowTraceability] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('scan');
  const videoRef = useRef(null);
  
  // Enhanced responsive detection - same as marketplace
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  // Mock product database for QR codes
  const productDatabase = {
    'FF-TOM-001': {
      id: 1,
      name: 'Premium Organic Tomatoes',
      qrCode: 'FF-TOM-001',
      farmer: {
        name: 'Ravi Mahathaya',
        avatar: 'RM',
        verified: true,
        farm: "Ravi's Organic Farm",
        location: 'Kurunegala',
        phone: '+94 77 123 4567',
        rating: 4.8
      },
      price: 300,
      unit: 'kg',
      rating: 4.8,
      reviews: 127,
      image: '🍅',
      isOrganic: true,
      inStock: true,
      stockLevel: 45,
      harvestDate: '2024-06-25',
      packingDate: '2024-06-26',
      expiryDate: '2024-07-05',
      batchNumber: 'BAT-TOM-240625-001',
      description: 'Fresh organic tomatoes grown without pesticides using traditional farming methods',
      certifications: ['Organic Certified', 'Pesticide Free'],
      nutritionScore: 'A+',
      carbonFootprint: 'Low',
      traceabilityJourney: [
        {
          stage: 'Seed Planting',
          date: '2024-04-15',
          location: "Ravi's Organic Farm, Kurunegala",
          description: 'Organic tomato seeds planted in prepared soil',
          icon: Sprout,
          completed: true
        },
        {
          stage: 'Growth & Care',
          date: '2024-04-15 - 2024-06-20',
          location: "Ravi's Organic Farm, Kurunegala",
          description: 'Regular watering, organic fertilizing, and pest management',
          icon: Leaf,
          completed: true
        },
        {
          stage: 'Harvest',
          date: '2024-06-25',
          location: "Ravi's Organic Farm, Kurunegala",
          description: 'Hand-picked at peak ripeness for maximum flavor',
          icon: Calendar,
          completed: true
        },
        {
          stage: 'Quality Check',
          date: '2024-06-25',
          location: "Farm Processing Center",
          description: 'Quality inspection and organic certification verification',
          icon: Shield,
          completed: true
        },
        {
          stage: 'Packaging',
          date: '2024-06-26',
          location: "Farm Processing Center",
          description: 'Cleaned, sorted, and packaged with QR tracking code',
          icon: Package2,
          completed: true
        },
        {
          stage: 'Distribution',
          date: '2024-06-26',
          location: 'FieldFair Marketplace',
          description: 'Listed on FieldFair platform for direct consumer purchase',
          icon: Store,
          completed: true
        },
        {
          stage: 'Consumer Purchase',
          date: 'Pending',
          location: 'Customer Location',
          description: 'Product ready for purchase and delivery',
          icon: Home,
          completed: false
        }
      ]
    },
    'FF-CAR-002': {
      id: 2,
      name: 'Sweet Rainbow Carrots',
      qrCode: 'FF-CAR-002',
      farmer: {
        name: 'Saman Silva',
        avatar: 'SS',
        verified: true,
        farm: "Saman's Fresh Vegetables",
        location: 'Matale',
        phone: '+94 76 987 6543',
        rating: 4.6
      },
      price: 250,
      unit: 'kg',
      rating: 4.6,
      reviews: 89,
      image: '🥕',
      isOrganic: true,
      inStock: true,
      stockLevel: 28,
      harvestDate: '2024-06-24',
      packingDate: '2024-06-25',
      expiryDate: '2024-07-15',
      batchNumber: 'BAT-CAR-240624-002',
      description: 'Sweet and crunchy rainbow carrots perfect for cooking and salads',
      certifications: ['Organic Certified'],
      nutritionScore: 'A',
      carbonFootprint: 'Low',
      traceabilityJourney: [
        {
          stage: 'Seed Planting',
          date: '2024-03-20',
          location: "Saman's Fresh Vegetables, Matale",
          description: 'Rainbow carrot seeds planted in highland soil',
          icon: Sprout,
          completed: true
        },
        {
          stage: 'Growth & Care',
          date: '2024-03-20 - 2024-06-20',
          location: "Saman's Fresh Vegetables, Matale",
          description: 'Organic cultivation in highland climate conditions',
          icon: Leaf,
          completed: true
        },
        {
          stage: 'Harvest',
          date: '2024-06-24',
          location: "Saman's Fresh Vegetables, Matale",
          description: 'Carefully harvested to preserve color and nutrition',
          icon: Calendar,
          completed: true
        },
        {
          stage: 'Quality Check',
          date: '2024-06-24',
          location: "Farm Quality Center",
          description: 'Size grading and quality assessment',
          icon: Shield,
          completed: true
        },
        {
          stage: 'Packaging',
          date: '2024-06-25',
          location: "Farm Processing Center",
          description: 'Washed, sorted by color, and packaged',
          icon: Package2,
          completed: true
        },
        {
          stage: 'Distribution',
          date: '2024-06-25',
          location: 'FieldFair Marketplace',
          description: 'Available for direct consumer purchase',
          icon: Store,
          completed: true
        },
        {
          stage: 'Consumer Purchase',
          date: 'Pending',
          location: 'Customer Location',
          description: 'Ready for purchase and delivery',
          icon: Home,
          completed: false
        }
      ]
    }
  };

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

  // Load scan history
  useEffect(() => {
    if (mounted) {
      const savedHistory = localStorage.getItem('qr-scan-history');
      if (savedHistory) {
        setScanHistory(JSON.parse(savedHistory));
      }
    }
  }, [mounted]);

  const startScanning = async () => {
    setScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setScanning(false);
      alert('Unable to access camera. Please check permissions and try again.');
    }
  };

  const stopScanning = () => {
    setScanning(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const handleManualCodeSubmit = () => {
    if (manualCode.trim()) {
      processQRCode(manualCode.trim());
    }
  };

  const processQRCode = (code) => {
    const product = productDatabase[code];
    if (product) {
      setScannedProduct(product);
      setShowTraceability(true);
      
      // Add to scan history
      const newScan = {
        ...product,
        scannedAt: new Date().toISOString(),
        scanMethod: scanning ? 'camera' : 'manual'
      };
      
      const updatedHistory = [newScan, ...scanHistory.filter(item => item.qrCode !== code)].slice(0, 10);
      setScanHistory(updatedHistory);
      if (mounted) {
        localStorage.setItem('qr-scan-history', JSON.stringify(updatedHistory));
      }
      
      stopScanning();
      setManualCode('');
    } else {
      alert('Product not found. Please check the QR code and try again.');
    }
  };

  const addToCart = (product) => {
    console.log('Add to cart:', product.name);
  };

  const addToFavorites = (product) => {
    console.log('Add to favorites:', product.name);
  };

  const contactFarmer = (farmer) => {
    console.log('Contact farmer:', farmer.name);
    window.open(`tel:${farmer.phone}`, '_self');
  };

  const shareProduct = (product) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this fresh ${product.name} from ${product.farmer.name}!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

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

  // Enhanced margin calculation - same as marketplace
  const getMainContentMargin = () => {
    if (screenSize.isMobile) {
      return 'ml-0'; // No margin on mobile (sidebar overlays)
    } else if (screenSize.isTablet) {
      return 'ml-20'; // Always collapsed margin on tablet
    } else {
      return sidebarCollapsed ? 'ml-20' : 'ml-72'; // User controlled on desktop
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* SINGLE Sidebar Component - Enhanced Responsive */}
      <FieldFairSidebar 
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={screenSize.isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="customer"
      />

      {/* Main Content - Enhanced Responsive Margin */}
      <div className={`flex-1 transition-all duration-300 ${getMainContentMargin()}`}>
        {/* Enhanced Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Mobile menu button - only show on mobile */}
                {screenSize.isMobile && (
                  <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 rounded-lg hover:bg-gray-100 mr-4 transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                )}
                
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    {screenSize.isMobile ? '📱 QR Scanner' : '📱 QR Product Scanner'}
                  </h1>
                  <p className="text-gray-600 hidden sm:block">
                    {screenSize.isMobile 
                      ? 'Track food from farm to table' 
                      : 'Scan QR codes to track your food from farm to table'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Link
                  href="/marketplace"
                  className={`${screenSize.isMobile ? 'p-2' : 'px-4 py-2'} flex items-center bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 hover:bg-emerald-100 transition-colors`}
                >
                  <Store className="w-4 h-4 mr-2" />
                  {!screenSize.isMobile && <span>Browse Marketplace</span>}
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-4 lg:p-6">
          {/* Enhanced Tab Navigation */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('scan')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'scan' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>{screenSize.isMobile ? 'Scan' : 'Scan QR Code'}</span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'history' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                <History className="w-4 h-4" />
                <span>{screenSize.isMobile ? 'History' : 'Scan History'}</span>
                {scanHistory.length > 0 && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-medium">
                    {scanHistory.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Scan Tab */}
          {activeTab === 'scan' && (
            <div className="space-y-6">
              {/* Quick Demo Codes */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Info className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Try Demo QR Codes</h3>
                    <p className="text-sm text-gray-600">Test the scanner with these sample product codes</p>
                  </div>
                </div>
                <div className={`grid gap-4 ${
                  screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-2'
                }`}>
                  <button
                    onClick={() => processQRCode('FF-TOM-001')}
                    className="flex items-center space-x-3 p-4 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-left"
                  >
                    <span className="text-2xl">🍅</span>
                    <div>
                      <div className="font-medium text-gray-900">FF-TOM-001</div>
                      <div className="text-sm text-gray-600">Premium Organic Tomatoes</div>
                    </div>
                  </button>
                  <button
                    onClick={() => processQRCode('FF-CAR-002')}
                    className="flex items-center space-x-3 p-4 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-left"
                  >
                    <span className="text-2xl">🥕</span>
                    <div>
                      <div className="font-medium text-gray-900">FF-CAR-002</div>
                      <div className="text-sm text-gray-600">Sweet Rainbow Carrots</div>
                    </div>
                  </button>
                </div>
              </div>

              <div className={`grid gap-6 ${
                screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
              }`}>
                {/* Camera Scanner */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Camera className="w-6 h-6 text-emerald-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Camera Scanner</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {screenSize.isMobile 
                        ? 'Use camera to scan QR codes'
                        : 'Use your device camera to scan QR codes'
                      }
                    </p>
                  </div>

                  <div className="p-6">
                    {scanning ? (
                      <div className="space-y-4">
                        <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className={`border-2 border-emerald-500 rounded-lg bg-emerald-500/10 ${
                              screenSize.isMobile ? 'w-40 h-40' : 'w-48 h-48'
                            }`}>
                              <div className="w-full h-full border border-dashed border-emerald-400 rounded-lg flex items-center justify-center">
                                <ScanLine className="w-8 h-8 text-emerald-500 animate-pulse" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-4">Position the QR code within the frame</p>
                          <button
                            onClick={stopScanning}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Stop Scanning
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className={`bg-gray-100 rounded-lg mx-auto flex items-center justify-center ${
                          screenSize.isMobile ? 'w-24 h-24' : 'w-32 h-32'
                        }`}>
                          <QrCode className={`text-gray-400 ${screenSize.isMobile ? 'w-12 h-12' : 'w-16 h-16'}`} />
                        </div>
                        <button
                          onClick={startScanning}
                          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 mx-auto"
                        >
                          <Camera className="w-5 h-5" />
                          <span>Start Camera</span>
                        </button>
                        <p className="text-xs text-gray-500">Camera permission required</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Manual Code Entry */}
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Clipboard className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Manual Entry</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {screenSize.isMobile 
                        ? 'Enter QR code manually'
                        : 'Enter QR code manually if scanning isn\'t available'
                      }
                    </p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product QR Code</label>
                        <input
                          type="text"
                          value={manualCode}
                          onChange={(e) => setManualCode(e.target.value)}
                          placeholder="Enter code (e.g., FF-TOM-001)"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          onKeyPress={(e) => e.key === 'Enter' && handleManualCodeSubmit()}
                        />
                      </div>
                      
                      <button
                        onClick={handleManualCodeSubmit}
                        disabled={!manualCode.trim()}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <Scan className="w-5 h-5" />
                        <span>Search Product</span>
                      </button>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Code Format Examples:</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div>• FF-TOM-001 (Tomatoes)</div>
                          <div>• FF-CAR-002 (Carrots)</div>
                          <div>• FF-[PRODUCT]-[NUMBER]</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <History className="w-6 h-6 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Recent Scans</h3>
                  </div>
                  {scanHistory.length > 0 && (
                    <button
                      onClick={() => {
                        setScanHistory([]);
                        localStorage.removeItem('qr-scan-history');
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Clear History
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">Your previously scanned products</p>
              </div>

              <div className="p-6">
                {scanHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No scans yet</h4>
                    <p className="text-gray-500 mb-6">Start scanning QR codes to see your history here</p>
                    <button
                      onClick={() => setActiveTab('scan')}
                      className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Start Scanning
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {scanHistory.map((item, index) => (
                      <div key={index} className={`flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow ${
                        screenSize.isMobile ? 'flex-col space-y-3 space-x-0' : ''
                      }`}>
                        <div className={`bg-gray-100 rounded-lg flex items-center justify-center text-2xl ${
                          screenSize.isMobile ? 'w-16 h-16' : 'w-12 h-12'
                        }`}>
                          {item.image}
                        </div>
                        <div className={`flex-1 ${screenSize.isMobile ? 'text-center' : ''}`}>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <div className="text-sm text-gray-600">
                            {item.farmer.name} • {new Date(item.scannedAt).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            Code: {item.qrCode} • Scanned via {item.scanMethod}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setScannedProduct(item);
                            setShowTraceability(true);
                          }}
                          className={`bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm ${
                            screenSize.isMobile ? 'w-full' : ''
                          }`}
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Product Details Modal */}
          {showTraceability && scannedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className={`bg-white rounded-2xl w-full max-h-[90vh] overflow-y-auto ${
                screenSize.isMobile ? 'max-w-sm' : 'max-w-4xl'
              }`}>
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center space-x-4 ${screenSize.isMobile ? 'flex-col space-y-2 space-x-0' : ''}`}>
                      <div className={`bg-gray-100 rounded-lg flex items-center justify-center text-3xl ${
                        screenSize.isMobile ? 'w-12 h-12' : 'w-16 h-16'
                      }`}>
                        {scannedProduct.image}
                      </div>
                      <div className={screenSize.isMobile ? 'text-center' : ''}>
                        <h2 className={`font-bold text-gray-900 ${screenSize.isMobile ? 'text-xl' : 'text-2xl'}`}>
                          {scannedProduct.name}
                        </h2>
                        <div className={`text-sm text-gray-600 ${screenSize.isMobile ? 'space-y-1' : 'flex items-center space-x-4'}`}>
                          <span>QR: {scannedProduct.qrCode}</span>
                          <span>Batch: {scannedProduct.batchNumber}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowTraceability(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className={`grid gap-6 ${
                    screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'
                  }`}>
                    {/* Product Information */}
                    <div className={`space-y-6 ${screenSize.isMobile ? 'order-2' : 'lg:col-span-1'}`}>
                      {/* Price & Details */}
                      <div className="bg-emerald-50 rounded-xl p-4">
                        <div className="text-2xl font-bold text-emerald-600 mb-2">
                          Rs. {scannedProduct.price} per {scannedProduct.unit}
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex items-center space-x-1">
                            {[1,2,3,4,5].map(i => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i <= Math.floor(scannedProduct.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium text-gray-900">{scannedProduct.rating}</span>
                          <span className="text-gray-500">({scannedProduct.reviews})</span>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Stock:</span>
                            <span className="font-medium text-gray-900">{scannedProduct.stockLevel} {scannedProduct.unit}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Harvested:</span>
                            <span className="font-medium text-gray-900">{new Date(scannedProduct.harvestDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Best Before:</span>
                            <span className="font-medium text-gray-900">{new Date(scannedProduct.expiryDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Farmer Information */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Farm Information</h4>
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center relative">
                            <span className="text-sm font-bold text-emerald-700">{scannedProduct.farmer.avatar}</span>
                            {scannedProduct.farmer.verified && (
                              <Shield className="w-3 h-3 text-blue-500 absolute -top-1 -right-1" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{scannedProduct.farmer.name}</div>
                            <div className="text-sm text-gray-600">{scannedProduct.farmer.farm}</div>
                            <div className="text-sm text-gray-600">{scannedProduct.farmer.location}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900">{scannedProduct.farmer.rating} farmer rating</span>
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="bg-green-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Certifications & Quality</h4>
                        <div className="space-y-2">
                          {scannedProduct.certifications.map((cert, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-gray-700">{cert}</span>
                            </div>
                          ))}
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-sm text-gray-600">Nutrition Score:</span>
                            <span className="font-bold text-green-600">{scannedProduct.nutritionScore}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Carbon Footprint:</span>
                            <span className="font-medium text-green-600">{scannedProduct.carbonFootprint}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <button
                          onClick={() => addToCart(scannedProduct)}
                          className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span>Add to Cart</span>
                        </button>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => addToFavorites(scannedProduct)}
                            className="flex items-center justify-center space-x-1 py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Heart className="w-4 h-4" />
                            <span className="text-xs">Save</span>
                          </button>
                          
                          <button
                            onClick={() => contactFarmer(scannedProduct.farmer)}
                            className="flex items-center justify-center space-x-1 py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            <span className="text-xs">Call</span>
                          </button>
                          
                          <button
                            onClick={() => shareProduct(scannedProduct)}
                            className="flex items-center justify-center space-x-1 py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                            <span className="text-xs">Share</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Traceability Journey */}
                    <div className={`${screenSize.isMobile ? 'order-1' : 'lg:col-span-2'}`}>
                      <h3 className={`font-bold text-gray-900 mb-6 ${screenSize.isMobile ? 'text-lg' : 'text-xl'}`}>
                        🌱 Farm to Table Journey
                      </h3>
                      
                      <div className="space-y-4">
                        {scannedProduct.traceabilityJourney.map((step, index) => {
                          const StepIcon = step.icon;
                          const isLast = index === scannedProduct.traceabilityJourney.length - 1;
                          
                          return (
                            <div key={index} className="relative">
                              {/* Timeline Line */}
                              {!isLast && (
                                <div className={`absolute w-0.5 ${
                                  step.completed ? 'bg-emerald-400' : 'bg-gray-300'
                                } ${screenSize.isMobile ? 'left-5 top-10 h-12' : 'left-6 top-12 h-16'}`} />
                              )}
                              
                              {/* Step Content */}
                              <div className={`flex items-start space-x-4 p-4 rounded-xl border-2 transition-all ${
                                step.completed 
                                  ? 'border-emerald-200 bg-emerald-50' 
                                  : 'border-gray-200 bg-gray-50'
                              }`}>
                                {/* Step Icon */}
                                <div className={`rounded-full flex items-center justify-center ${
                                  step.completed 
                                    ? 'bg-emerald-500 text-white' 
                                    : 'bg-gray-300 text-gray-600'
                                } ${screenSize.isMobile ? 'w-10 h-10' : 'w-12 h-12'}`}>
                                  <StepIcon className={screenSize.isMobile ? 'w-5 h-5' : 'w-6 h-6'} />
                                </div>
                                
                                {/* Step Details */}
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className={`font-semibold ${
                                      step.completed ? 'text-emerald-900' : 'text-gray-700'
                                    } ${screenSize.isMobile ? 'text-sm' : ''}`}>
                                      {step.stage}
                                    </h4>
                                    {step.completed && (
                                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                                    )}
                                  </div>
                                  
                                  <p className={`text-sm mb-2 ${
                                    step.completed ? 'text-emerald-700' : 'text-gray-600'
                                  }`}>
                                    {step.description}
                                  </p>
                                  
                                  <div className={`${
                                    screenSize.isMobile ? 'space-y-1' : 'flex items-center space-x-4'
                                  } text-xs ${
                                    step.completed ? 'text-emerald-600' : 'text-gray-500'
                                  }`}>
                                    <div className="flex items-center space-x-1">
                                      <Calendar className="w-3 h-3" />
                                      <span>{step.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <MapPin className="w-3 h-3" />
                                      <span>{step.location}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Additional Product Info */}
                      <div className="mt-8 bg-gray-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Product Description</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {scannedProduct.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomerQRScannerPage;