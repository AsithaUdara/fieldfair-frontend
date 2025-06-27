"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Sparkles,
  TrendingUp,
  ShoppingCart,
  Heart,
  Star,
  MapPin,
  Leaf,
  Clock,
  Target,
  Brain,
  Zap,
  Eye,
  RefreshCw,
  Filter,
  Settings,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Calendar,
  DollarSign,
  Package,
  Users,
  Award,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  Lightbulb
} from 'lucide-react';

const AIRecommendationsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('personalized');
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock user preferences and history for AI
  const [userProfile] = useState({
    preferences: {
      organic: true,
      local: true,
      maxDistance: 15,
      budgetRange: [200, 800],
      favoriteCategories: ['vegetables', 'fruits', 'herbs'],
      dietaryRestrictions: ['vegetarian'],
      shoppingFrequency: 'weekly'
    },
    history: {
      totalOrders: 24,
      totalSpent: 18500,
      favoriteProducts: ['Organic Tomatoes', 'Fresh Carrots', 'Green Beans'],
      favoriteFarmers: ['Ravi Mahathaya', 'Saman Silva'],
      averageOrderValue: 771,
      lastOrderDate: '2024-06-25'
    },
    aiInsights: {
      personalityType: 'Health-Conscious Explorer',
      seasonalPreference: 'Fresh & Seasonal',
      priceConsciousness: 'Value-Oriented',
      qualityFocus: 'Premium Organic'
    }
  });

  // Mock AI recommendations
  const [recommendations] = useState({
    personalized: [
      {
        id: 1,
        type: 'product',
        title: 'Perfect for Your Organic Preference',
        confidence: 95,
        reasoning: 'Based on your consistent preference for organic produce and recent purchases',
        product: {
          name: 'Organic Baby Spinach',
          farmer: 'Kamala Jayawardena',
          location: 'Kandy',
          distance: '8.1 km',
          price: 180,
          originalPrice: 200,
          rating: 4.8,
          image: '🥬',
          isOrganic: true,
          discount: 10,
          inStock: true
        },
        whyRecommended: [
          'Matches your organic preference',
          'From a highly-rated local farmer',
          'Currently 10% off',
          'High in nutrients you value'
        ],
        aiTags: ['Personalized', 'Organic', 'Local', 'Discount']
      },
      {
        id: 2,
        type: 'bundle',
        title: 'Weekly Essentials Bundle',
        confidence: 88,
        reasoning: 'AI-curated bundle based on your weekly shopping pattern',
        bundle: {
          name: 'Healthy Weekly Mix',
          totalPrice: 650,
          originalPrice: 750,
          savings: 100,
          items: [
            { name: 'Organic Tomatoes', quantity: 2, price: 300, image: '🍅' },
            { name: 'Fresh Carrots', quantity: 1, price: 250, image: '🥕' },
            { name: 'Green Lettuce', quantity: 1, price: 100, image: '🥬' }
          ]
        },
        whyRecommended: [
          'Matches your weekly shopping routine',
          'Includes your most-purchased items',
          'Saves you Rs. 100',
          'All from trusted farmers'
        ],
        aiTags: ['Bundle', 'Weekly', 'Savings', 'Personalized']
      },
      {
        id: 3,
        type: 'farmer',
        title: 'New Farmer Match',
        confidence: 82,
        reasoning: 'This farmer\'s products align with your quality standards and preferences',
        farmer: {
          name: 'Priya Wickramasinghe',
          farm: 'Mountain View Organics',
          location: 'Nuwara Eliya',
          distance: '18.2 km',
          rating: 4.9,
          specialties: ['Organic Herbs', 'Mountain Vegetables'],
          certifications: ['Organic Certified', 'Fair Trade'],
          newProducts: 5,
          avatar: 'PW'
        },
        whyRecommended: [
          'Specializes in organic herbs you love',
          'Mountain-grown premium quality',
          'Fair trade certified',
          'Recently added 5 new products'
        ],
        aiTags: ['New Farmer', 'Organic', 'Premium', 'Herbs']
      }
    ],
    seasonal: [
      {
        id: 4,
        title: 'Peak Season Fresh Picks',
        season: 'Mid-Summer',
        products: [
          { name: 'Ripe Mangoes', farmer: 'Saman Fernando', price: 350, image: '🥭', inSeason: true },
          { name: 'Fresh Corn', farmer: 'Ruwan Perera', price: 150, image: '🌽', inSeason: true },
          { name: 'Watermelon', farmer: 'Nimal Silva', price: 120, image: '🍉', inSeason: true }
        ],
        benefits: [
          'Peak freshness and flavor',
          'Best prices of the year',
          'Locally available',
          'Limited time availability'
        ]
      }
    ],
    trending: [
      {
        id: 5,
        title: 'Popular This Week',
        trendData: {
          weeklyGrowth: 45,
          totalOrders: 234,
          satisfaction: 4.7
        },
        products: [
          { name: 'Dragon Fruit', orders: 89, growth: 67, image: '🐉', price: 450 },
          { name: 'Passion Fruit', orders: 76, growth: 52, image: '🥭', price: 320 },
          { name: 'Microgreens', orders: 69, growth: 43, image: '🌱', price: 280 }
        ]
      }
    ],
    sustainable: [
      {
        id: 6,
        title: 'Eco-Friendly Choices',
        impact: {
          carbonSaved: '2.3 kg CO2',
          waterSaved: '45 liters',
          packagingReduced: '80%'
        },
        products: [
          { 
            name: 'Zero-Waste Vegetables', 
            farmer: 'Green Earth Farm',
            sustainabilityScore: 98,
            image: '🥬',
            price: 200,
            ecoFeatures: ['Biodegradable packaging', 'Carbon neutral', 'Water efficient']
          }
        ]
      }
    ]
  });

  const tabs = [
    { id: 'personalized', label: 'For You', icon: Target, count: 3 },
    { id: 'seasonal', label: 'Seasonal', icon: Calendar, count: 1 },
    { id: 'trending', label: 'Trending', icon: TrendingUp, count: 1 },
    { id: 'sustainable', label: 'Eco-Friendly', icon: Leaf, count: 1 }
  ];

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
        <div className="w-64 bg-emerald-900"></div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  const generateNewRecommendations = () => {
    setIsGenerating(true);
    // Simulate AI recommendation generation
    setTimeout(() => {
      setIsGenerating(false);
      console.log('Generated new recommendations');
    }, 2000);
  };

  const likeRecommendation = (id: number) => {
    console.log('Liked recommendation:', id);
    // In real app, send feedback to AI system
  };

  const dislikeRecommendation = (id: number) => {
    console.log('Disliked recommendation:', id);
    // In real app, send feedback to AI system
  };

  const addToCart = (productId: number) => {
    console.log('Adding to cart:', productId);
  };

  const addToFavorites = (productId: number) => {
    console.log('Adding to favorites:', productId);
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
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">AI Recommendations</h1>
                    <p className="text-sm text-gray-600 mt-1">Personalized suggestions powered by smart algorithms</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={generateNewRecommendations}
                disabled={isGenerating}
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Generating...' : 'Refresh'}</span>
              </button>
              
              <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Preferences</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* AI Insights Banner */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 mb-8 text-white">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-bold mb-2">Your AI Profile</h2>
                  <p className="text-purple-100 mb-4">
                    Based on your shopping patterns, you're a <strong>{userProfile.aiInsights.personalityType}</strong>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{userProfile.aiInsights.seasonalPreference}</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{userProfile.aiInsights.priceConsciousness}</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{userProfile.aiInsights.qualityFocus}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{userProfile.history.totalOrders}</div>
                    <div className="text-purple-200 text-sm">Total Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">Rs. {userProfile.history.averageOrderValue}</div>
                    <div className="text-purple-200 text-sm">Avg. Order</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Brain className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Personalized Recommendations */}
                {activeTab === 'personalized' && (
                  <div className="space-y-6">
                    {recommendations.personalized.map((rec) => (
                      <div key={rec.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                              <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                                <Zap className="w-3 h-3" />
                                <span>{rec.confidence}% match</span>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{rec.reasoning}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {rec.aiTags.map((tag, index) => (
                                <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => likeRecommendation(rec.id)}
                              className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                            >
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => dislikeRecommendation(rec.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Product Recommendation */}
                        {rec.type === 'product' && rec.product && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">{rec.product.image}</span>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="font-semibold text-gray-900">{rec.product.name}</h4>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                      <span>{rec.product.farmer}</span>
                                      <span>•</span>
                                      <span>{rec.product.location}</span>
                                      <span>•</span>
                                      <span>{rec.product.distance}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-1">
                                      <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-medium">{rec.product.rating}</span>
                                      </div>
                                      {rec.product.isOrganic && (
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center">
                                          <Leaf className="w-3 h-3 mr-1" />
                                          Organic
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="text-right">
                                    <div className="text-lg font-bold text-emerald-600">Rs. {rec.product.price}</div>
                                    {rec.product.originalPrice > rec.product.price && (
                                      <div className="text-sm text-gray-500 line-through">Rs. {rec.product.originalPrice}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-2 gap-3">
                              <div>
                                <div className="text-xs font-medium text-gray-700 mb-2">Why recommended:</div>
                                <ul className="text-xs text-gray-600 space-y-1">
                                  {rec.whyRecommended.map((reason, index) => (
                                    <li key={index} className="flex items-center space-x-1">
                                      <CheckCircle className="w-3 h-3 text-green-500" />
                                      <span>{reason}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="flex items-end space-x-2">
                                <button
                                  onClick={() => addToFavorites(rec.product!.id)}
                                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center justify-center"
                                >
                                  <Heart className="w-4 h-4 mr-1" />
                                  Save
                                </button>
                                <button
                                  onClick={() => addToCart(rec.product!.id)}
                                  className="flex-1 bg-emerald-600 text-white py-2 px-3 rounded-lg text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center"
                                >
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Bundle Recommendation */}
                        {rec.type === 'bundle' && rec.bundle && (
                          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold text-gray-900">{rec.bundle.name}</h4>
                              <div className="text-right">
                                <div className="text-lg font-bold text-emerald-600">Rs. {rec.bundle.totalPrice}</div>
                                <div className="text-sm text-gray-500 line-through">Rs. {rec.bundle.originalPrice}</div>
                                <div className="text-xs text-green-600 font-medium">Save Rs. {rec.bundle.savings}</div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-3 mb-4">
                              {rec.bundle.items.map((item, index) => (
                                <div key={index} className="text-center">
                                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <span className="text-xl">{item.image}</span>
                                  </div>
                                  <div className="text-xs font-medium text-gray-900">{item.name}</div>
                                  <div className="text-xs text-gray-600">{item.quantity} kg</div>
                                </div>
                              ))}
                            </div>
                            
                            <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                              Add Bundle to Cart
                            </button>
                          </div>
                        )}

                        {/* Farmer Recommendation */}
                        {rec.type === 'farmer' && rec.farmer && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="font-bold text-blue-700">{rec.farmer.avatar}</span>
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{rec.farmer.name}</h4>
                                <p className="text-sm text-gray-600">{rec.farmer.farm}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className="text-sm font-medium">{rec.farmer.rating}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">{rec.farmer.distance}</span>
                                  </div>
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                    {rec.farmer.newProducts} new products
                                  </span>
                                </div>
                              </div>
                              
                              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                                <Eye className="w-4 h-4 mr-1 inline" />
                                View Farm
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Seasonal Recommendations */}
                {activeTab === 'seasonal' && (
                  <div className="space-y-6">
                    {recommendations.seasonal.map((rec) => (
                      <div key={rec.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <Calendar className="w-5 h-5 text-orange-500" />
                          <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                            {rec.season}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          {rec.products.map((product, index) => (
                            <div key={index} className="bg-orange-50 rounded-lg p-4 text-center">
                              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
                                <span className="text-3xl">{product.image}</span>
                              </div>
                              <h4 className="font-medium text-gray-900">{product.name}</h4>
                              <p className="text-sm text-gray-600">{product.farmer}</p>
                              <p className="text-lg font-bold text-orange-600 mt-2">Rs. {product.price}</p>
                              {product.inSeason && (
                                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mt-2">
                                  Peak Season
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-orange-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-2">Seasonal Benefits:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {rec.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Trending Recommendations */}
                {activeTab === 'trending' && (
                  <div className="space-y-6">
                    {recommendations.trending.map((rec) => (
                      <div key={rec.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <TrendingUp className="w-5 h-5 text-red-500" />
                          <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="bg-red-50 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-red-600">+{rec.trendData.weeklyGrowth}%</div>
                            <div className="text-sm text-gray-600">Weekly Growth</div>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-blue-600">{rec.trendData.totalOrders}</div>
                            <div className="text-sm text-gray-600">Orders This Week</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-green-600">{rec.trendData.satisfaction}</div>
                            <div className="text-sm text-gray-600">Satisfaction</div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {rec.products.map((product, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{product.image}</span>
                                <div>
                                  <div className="font-medium text-gray-900">{product.name}</div>
                                  <div className="text-sm text-gray-600">{product.orders} orders this week</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-emerald-600">Rs. {product.price}</div>
                                <div className="text-sm text-red-600">+{product.growth}% growth</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sustainable Recommendations */}
                {activeTab === 'sustainable' && (
                  <div className="space-y-6">
                    {recommendations.sustainable.map((rec) => (
                      <div key={rec.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <Leaf className="w-5 h-5 text-green-500" />
                          <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="bg-green-50 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-green-600">{rec.impact.carbonSaved}</div>
                            <div className="text-sm text-gray-600">CO₂ Saved</div>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-blue-600">{rec.impact.waterSaved}</div>
                            <div className="text-sm text-gray-600">Water Saved</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-purple-600">{rec.impact.packagingReduced}</div>
                            <div className="text-sm text-gray-600">Less Packaging</div>
                          </div>
                        </div>
                        
                        {rec.products.map((product, index) => (
                          <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{product.image}</span>
                                <div>
                                  <div className="font-medium text-gray-900">{product.name}</div>
                                  <div className="text-sm text-gray-600">{product.farmer}</div>
                                  <div className="flex items-center space-x-1 mt-1">
                                    <Leaf className="w-3 h-3 text-green-500" />
                                    <span className="text-sm text-green-600">Sustainability Score: {product.sustainabilityScore}/100</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-emerald-600">Rs. {product.price}</div>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {product.ecoFeatures.map((feature, idx) => (
                                <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIRecommendationsPage;