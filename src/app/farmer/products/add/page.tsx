"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  ArrowLeft,
  Camera,
  Upload,
  Plus,
  X,
  Save,
  Eye,
  Leaf,
  Package,
  DollarSign,
  Calendar,
  FileText,
  MapPin,
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const AddProductPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    category: 'vegetables',
    price: '',
    stock: '',
    unit: 'kg',
    harvestDate: '',
    description: '',
    isOrganic: false,
    isCertified: false,
    farmLocation: '',
    storageInfo: '',
    nutritionInfo: '',
    tags: []
  });

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setUploadedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.name && formData.category && formData.price && formData.stock;
      case 2:
        return formData.harvestDate && formData.description;
      case 3:
        return uploadedImages.length > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Product data:', formData);
    console.log('Images:', uploadedImages);
    // Here you would submit to your API
  };

  const steps = [
    { number: 1, title: 'Basic Info', icon: Package },
    { number: 2, title: 'Details', icon: FileText },
    { number: 3, title: 'Photos', icon: Camera },
    { number: 4, title: 'Review', icon: Eye }
  ];

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <FieldFairSidebar
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={isMobile}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userType="farmer"
      />

      <div className={`flex-1 flex flex-col bg-gray-50 transition-all duration-300 ${
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
                <LayoutGrid className="w-6 h-6" />
              </button>
              
              <Link 
                href="/farmer/products"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Back to Products</span>
              </Link>
              
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Add New Product</h1>
                <p className="text-sm text-gray-600 mt-1">Create a new product listing for your farm</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">Step {currentStep} of 4</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      currentStep >= step.number 
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-gray-300 text-gray-500'
                    }`}>
                      {currentStep > step.number ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className={`ml-3 ${index === steps.length - 1 ? 'hidden' : ''}`}>
                      <div className={`text-sm font-medium ${
                        currentStep >= step.number ? 'text-emerald-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 lg:w-24 h-0.5 mx-4 ${
                        currentStep > step.number ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Basic Product Information</h2>
                    <p className="text-gray-600">Enter the essential details about your product</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g., Organic Roma Tomatoes"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select 
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="vegetables">Vegetables</option>
                        <option value="fruits">Fruits</option>
                        <option value="grains">Grains</option>
                        <option value="herbs">Herbs & Spices</option>
                        <option value="dairy">Dairy Products</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price per Unit (Rs.) *
                      </label>
                      <input 
                        type="number" 
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Stock *
                      </label>
                      <input 
                        type="number" 
                        value={formData.stock}
                        onChange={(e) => handleInputChange('stock', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit of Measurement *
                      </label>
                      <select 
                        value={formData.unit}
                        onChange={(e) => handleInputChange('unit', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="kg">Kilograms (kg)</option>
                        <option value="g">Grams (g)</option>
                        <option value="pieces">Pieces</option>
                        <option value="bunches">Bunches</option>
                        <option value="liters">Liters</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                      <input 
                        type="checkbox" 
                        id="organic"
                        checked={formData.isOrganic}
                        onChange={(e) => handleInputChange('isOrganic', e.target.checked)}
                        className="rounded"
                      />
                      <Leaf className="w-5 h-5 text-green-500" />
                      <div>
                        <label htmlFor="organic" className="text-sm font-medium text-gray-900">Organic Product</label>
                        <p className="text-xs text-gray-500">Grown without synthetic pesticides</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                      <input 
                        type="checkbox" 
                        id="certified"
                        checked={formData.isCertified}
                        onChange={(e) => handleInputChange('isCertified', e.target.checked)}
                        className="rounded"
                      />
                      <Award className="w-5 h-5 text-blue-500" />
                      <div>
                        <label htmlFor="certified" className="text-sm font-medium text-gray-900">Certified Organic</label>
                        <p className="text-xs text-gray-500">Has official organic certification</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Product Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Product Details</h2>
                    <p className="text-gray-600">Provide additional information about your product</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Harvest Date *
                    </label>
                    <input 
                      type="date" 
                      value={formData.harvestDate}
                      onChange={(e) => handleInputChange('harvestDate', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Description *
                    </label>
                    <textarea 
                      rows={4}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Describe your product, growing methods, taste, uses, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Farm Location
                      </label>
                      <input 
                        type="text" 
                        value={formData.farmLocation}
                        onChange={(e) => handleInputChange('farmLocation', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g., Kurunegala District"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Storage Instructions
                      </label>
                      <input 
                        type="text" 
                        value={formData.storageInfo}
                        onChange={(e) => handleInputChange('storageInfo', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g., Store in cool, dry place"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nutrition Information
                    </label>
                    <textarea 
                      rows={3}
                      value={formData.nutritionInfo}
                      onChange={(e) => handleInputChange('nutritionInfo', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g., Rich in Vitamin C, Lycopene, and antioxidants"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Product Photos */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Product Photos</h2>
                    <p className="text-gray-600">Upload high-quality photos of your product</p>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Product Photos</h3>
                    <p className="text-gray-600 mb-4">PNG, JPG up to 10MB each. Upload multiple photos for better visibility.</p>
                    
                    <label className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer transition-colors">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Photos
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Uploaded Photos ({uploadedImages.length})</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {uploadedImages.map((image) => (
                          <div key={image.id} className="relative group">
                            <img 
                              src={image.url} 
                              alt={image.name}
                              className="w-full h-32 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              onClick={() => removeImage(image.id)}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Review & Submit</h2>
                    <p className="text-gray-600">Review your product information before publishing</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Product Information</h3>
                        <div className="space-y-2">
                          <div><span className="text-gray-600">Name:</span> <span className="font-medium">{formData.name}</span></div>
                          <div><span className="text-gray-600">Category:</span> <span className="font-medium">{formData.category}</span></div>
                          <div><span className="text-gray-600">Price:</span> <span className="font-medium">Rs. {formData.price} per {formData.unit}</span></div>
                          <div><span className="text-gray-600">Stock:</span> <span className="font-medium">{formData.stock} {formData.unit}</span></div>
                          <div><span className="text-gray-600">Harvest Date:</span> <span className="font-medium">{formData.harvestDate}</span></div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Additional Details</h3>
                        <div className="space-y-2">
                          <div><span className="text-gray-600">Organic:</span> <span className="font-medium">{formData.isOrganic ? 'Yes' : 'No'}</span></div>
                          <div><span className="text-gray-600">Certified:</span> <span className="font-medium">{formData.isCertified ? 'Yes' : 'No'}</span></div>
                          <div><span className="text-gray-600">Photos:</span> <span className="font-medium">{uploadedImages.length} uploaded</span></div>
                        </div>
                      </div>
                    </div>

                    {formData.description && (
                      <div className="mt-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-700">{formData.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">Before Publishing</h4>
                        <p className="text-blue-700 text-sm">Make sure all information is accurate. You can edit these details later from your products dashboard.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentStep === 1 
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>

                <div className="flex items-center space-x-2">
                  {steps.map((step) => (
                    <div
                      key={step.number}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentStep >= step.number ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                      validateStep(currentStep)
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Publish Product
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProductPage;