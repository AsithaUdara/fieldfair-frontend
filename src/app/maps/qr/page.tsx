"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  QrCode,
  Download,
  Share2,
  Copy,
  Check,
  Package,
  Leaf,
  MapPin,
  Calendar,
  User,
  Shield,
  Printer,
  Eye,
  RefreshCw,
  Settings,
  Image,
  FileText,
  Smartphone,
  Globe
} from 'lucide-react';

const QRGeneratorPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(1);
  const [qrSize, setQrSize] = useState(256);
  const [includeDetails, setIncludeDetails] = useState({
    productInfo: true,
    farmerInfo: true,
    harvestDate: true,
    certifications: true,
    supplyChain: true,
    nutritionInfo: false
  });
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Mock products data for QR generation
  const [products] = useState([
    {
      id: 1,
      name: 'Organic Tomatoes',
      image: '🍅',
      quantity: '50 kg',
      batchNumber: 'BATCH-2024-0625-A2',
      farmer: {
        name: 'Ravi Mahathaya',
        farm: "Ravi's Organic Farm",
        location: 'Kurunegala, North Western Province',
        phone: '+94 77 296 7477',
        certifications: ['Organic Certified', 'Fair Trade']
      },
      harvest: {
        date: '2024-06-25',
        location: 'Field A - Section 2',
        method: 'Hand-picked',
        quality: 'Grade A'
      },
      processing: {
        date: '2024-06-25',
        location: 'On-farm processing center',
        temperature: '4°C - 8°C',
        packaging: 'Eco-friendly biodegradable bags'
      },
      nutrition: {
        calories: '18 per 100g',
        vitaminC: 'High',
        lycopene: 'Rich source',
        fiber: 'Good source'
      },
      sustainability: {
        carbonFootprint: '0.2 kg CO2e per kg',
        waterUsage: '15 liters per kg',
        organic: true,
        locallyGrown: true
      },
      qrData: {
        productId: 'PRD-2024-001',
        trackingUrl: 'https://fieldfair.com/track/PRD-2024-001',
        verificationCode: 'VF-789456123'
      }
    },
    {
      id: 2,
      name: 'Fresh Carrots',
      image: '🥕',
      quantity: '25 kg',
      batchNumber: 'BATCH-2024-0624-B1',
      farmer: {
        name: 'Saman Silva',
        farm: "Silva Sustainable Farm",
        location: 'Matale, Central Province',
        phone: '+94 81 222 3456',
        certifications: ['Sustainable Farming']
      },
      harvest: {
        date: '2024-06-24',
        location: 'Field B - Section 1',
        method: 'Machine harvested',
        quality: 'Grade A'
      },
      processing: {
        date: '2024-06-24',
        location: 'Central processing facility',
        temperature: '2°C - 6°C',
        packaging: 'Recyclable plastic bags'
      },
      nutrition: {
        calories: '41 per 100g',
        betaCarotene: 'Very high',
        fiber: 'High',
        vitaminK: 'Good source'
      },
      sustainability: {
        carbonFootprint: '0.15 kg CO2e per kg',
        waterUsage: '12 liters per kg',
        organic: false,
        locallyGrown: true
      },
      qrData: {
        productId: 'PRD-2024-002',
        trackingUrl: 'https://fieldfair.com/track/PRD-2024-002',
        verificationCode: 'VF-456789123'
      }
    },
    {
      id: 3,
      name: 'Green Beans',
      image: '🫘',
      quantity: '15 kg',
      batchNumber: 'BATCH-2024-0625-C3',
      farmer: {
        name: 'Nimal Gunasekara',
        farm: "Green Valley Farm",
        location: 'Nuwara Eliya, Central Province',
        phone: '+94 52 222 7890',
        certifications: ['Organic Certified', 'Export Quality']
      },
      harvest: {
        date: '2024-06-25',
        location: 'Greenhouse Section C',
        method: 'Hand-picked',
        quality: 'Premium Grade'
      },
      processing: {
        date: '2024-06-25',
        location: 'Cold storage facility',
        temperature: '1°C - 3°C',
        packaging: 'Vacuum sealed bags'
      },
      nutrition: {
        calories: '35 per 100g',
        vitaminK: 'Excellent',
        folate: 'Good source',
        fiber: 'High'
      },
      sustainability: {
        carbonFootprint: '0.3 kg CO2e per kg',
        waterUsage: '18 liters per kg',
        organic: true,
        locallyGrown: true
      },
      qrData: {
        productId: 'PRD-2024-003',
        trackingUrl: 'https://fieldfair.com/track/PRD-2024-003',
        verificationCode: 'VF-123456789'
      }
    }
  ]);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      generateQR();
    }
  }, [selectedProduct, qrSize, includeDetails]);

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

  const generateQR = () => {
    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    // In a real app, this would generate actual QR code using a library like qrcode
    // For demo purposes, we'll simulate the QR code generation
    const qrData = {
      productId: product.qrData.productId,
      trackingUrl: product.qrData.trackingUrl,
      verificationCode: product.qrData.verificationCode,
      productName: product.name,
      batchNumber: product.batchNumber,
      ...(includeDetails.farmerInfo && { farmer: product.farmer }),
      ...(includeDetails.harvestDate && { harvest: product.harvest }),
      ...(includeDetails.certifications && { certifications: product.farmer.certifications }),
      ...(includeDetails.supplyChain && { processing: product.processing }),
      ...(includeDetails.nutritionInfo && { nutrition: product.nutrition })
    };

    // Simulate QR code generation - in real app, use QR code library
    const qrString = `data:image/svg+xml;base64,${btoa(`
      <svg width="${qrSize}" height="${qrSize}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="white"/>
        <text x="50%" y="30%" text-anchor="middle" font-family="Arial" font-size="14" fill="black">QR Code</text>
        <text x="50%" y="50%" text-anchor="middle" font-family="Arial" font-size="12" fill="black">${product.name}</text>
        <text x="50%" y="65%" text-anchor="middle" font-family="Arial" font-size="10" fill="gray">${product.qrData.productId}</text>
        <text x="50%" y="80%" text-anchor="middle" font-family="Arial" font-size="8" fill="gray">FieldFair Traceability</text>
        <!-- QR pattern simulation -->
        <g fill="black">
          ${Array.from({length: 20}, (_, i) => 
            Array.from({length: 20}, (_, j) => 
              Math.random() > 0.5 ? `<rect x="${10 + i * 10}" y="${10 + j * 10}" width="8" height="8"/>` : ''
            ).join('')
          ).join('')}
        </g>
      </svg>
    `)}`;

    setGeneratedQR(qrString);
  };

  const selectedProductData = products.find(p => p.id === selectedProduct);

  const downloadQR = () => {
    if (!generatedQR) return;
    
    // Create download link
    const link = document.createElement('a');
    link.href = generatedQR;
    link.download = `${selectedProductData?.name.replace(/\s+/g, '_')}_QR.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyQRData = () => {
    if (!selectedProductData) return;
    
    const qrData = JSON.stringify({
      productId: selectedProductData.qrData.productId,
      trackingUrl: selectedProductData.qrData.trackingUrl,
      verificationCode: selectedProductData.qrData.verificationCode
    }, null, 2);
    
    navigator.clipboard.writeText(qrData).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const printQR = () => {
    if (!generatedQR) return;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - ${selectedProductData?.name}</title>
            <style>
              body { margin: 0; padding: 20px; text-align: center; font-family: Arial, sans-serif; }
              .qr-container { margin: 20px auto; }
              .product-info { margin-top: 20px; }
              h1 { font-size: 18px; margin-bottom: 10px; }
              p { margin: 5px 0; font-size: 14px; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <img src="${generatedQR}" alt="QR Code" style="max-width: 100%; height: auto;">
              <div class="product-info">
                <h1>${selectedProductData?.name}</h1>
                <p><strong>Batch:</strong> ${selectedProductData?.batchNumber}</p>
                <p><strong>Farmer:</strong> ${selectedProductData?.farmer.name}</p>
                <p><strong>Harvest Date:</strong> ${selectedProductData?.harvest.date}</p>
                <p><strong>Product ID:</strong> ${selectedProductData?.qrData.productId}</p>
                <p style="font-size: 12px; margin-top: 15px;">Scan to trace the complete journey of this product</p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="customer"
      />

      <div className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 ${
        isMobile ? 'ml-0' : (sidebarCollapsed ? 'ml-16' : 'ml-64')
      }`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <LayoutGrid className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">QR Code Generator</h1>
                <p className="text-sm text-gray-600 mt-1">Generate traceability QR codes for your products</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={generateQR}
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Regenerate</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Product Selection & Settings */}
              <div className="space-y-6">
                {/* Product Selection */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Product</h3>
                  <div className="space-y-3">
                    {products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => setSelectedProduct(product.id)}
                        className={`w-full p-3 rounded-lg border text-left transition-all ${
                          selectedProduct === product.id
                            ? 'border-emerald-300 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl">{product.image}</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-600">{product.quantity} • {product.batchNumber}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* QR Settings */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Size: {qrSize}px
                      </label>
                      <input
                        type="range"
                        min="128"
                        max="512"
                        step="64"
                        value={qrSize}
                        onChange={(e) => setQrSize(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>128px</span>
                        <span>512px</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Include Information</label>
                      <div className="space-y-2">
                        {Object.entries(includeDetails).map(([key, value]) => (
                          <label key={key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => setIncludeDetails(prev => ({
                                ...prev,
                                [key]: e.target.checked
                              }))}
                              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                            />
                            <span className="text-sm text-gray-700 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Preview */}
                {selectedProductData && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Data Preview</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Product ID:</span>
                        <span className="font-medium">{selectedProductData.qrData.productId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Batch:</span>
                        <span className="font-medium">{selectedProductData.batchNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Verification:</span>
                        <span className="font-medium">{selectedProductData.qrData.verificationCode}</span>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="text-gray-600">Tracking URL:</span>
                        <div className="break-all text-blue-600 text-xs mt-1">
                          {selectedProductData.qrData.trackingUrl}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* QR Code Display */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 p-8">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Generated QR Code</h3>
                    
                    {generatedQR ? (
                      <div className="space-y-6">
                        {/* QR Code */}
                        <div className="flex justify-center">
                          <div className="p-6 bg-white border-2 border-gray-200 rounded-xl shadow-sm">
                            <img 
                              src={generatedQR} 
                              alt="Generated QR Code"
                              className="mx-auto"
                              style={{ width: qrSize, height: qrSize }}
                            />
                          </div>
                        </div>

                        {/* Product Info */}
                        {selectedProductData && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-center space-x-3 mb-3">
                              <span className="text-2xl">{selectedProductData.image}</span>
                              <div>
                                <div className="font-semibold text-gray-900">{selectedProductData.name}</div>
                                <div className="text-sm text-gray-600">{selectedProductData.batchNumber}</div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-gray-500" />
                                <span>{selectedProductData.farmer.name}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span>{selectedProductData.harvest.date}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span>{selectedProductData.farmer.location}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Package className="w-4 h-4 text-gray-500" />
                                <span>{selectedProductData.quantity}</span>
                              </div>
                            </div>

                            {selectedProductData.farmer.certifications.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                <div className="flex flex-wrap gap-2">
                                  {selectedProductData.farmer.certifications.map((cert, index) => (
                                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                      <Shield className="w-3 h-3 mr-1" />
                                      {cert}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-center gap-3">
                          <button
                            onClick={downloadQR}
                            className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download SVG</span>
                          </button>
                          
                          <button
                            onClick={printQR}
                            className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Printer className="w-4 h-4" />
                            <span>Print</span>
                          </button>
                          
                          <button
                            onClick={copyQRData}
                            className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            <span>{copied ? 'Copied!' : 'Copy Data'}</span>
                          </button>
                          
                          <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </button>
                        </div>

                        {/* Usage Instructions */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                          <h4 className="font-medium text-blue-900 mb-2">Usage Instructions</h4>
                          <div className="space-y-2 text-sm text-blue-800">
                            <div className="flex items-start space-x-2">
                              <QrCode className="w-4 h-4 mt-0.5 text-blue-600" />
                              <span>Print and attach this QR code to your product packaging</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <Smartphone className="w-4 h-4 mt-0.5 text-blue-600" />
                              <span>Customers can scan to view complete product traceability</span>
                            </div>
                            <div className="flex items-start space-x-2">
                              <Globe className="w-4 h-4 mt-0.5 text-blue-600" />
                              <span>QR code links to online tracking page with real-time updates</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-12">
                        <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Select a product to generate QR code</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QRGeneratorPage;