"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Zap,
  Brain,
  TrendingUp,
  Star,
  Heart,
  ShoppingCart,
  MessageCircle,
  Lightbulb,
  Target,
  BarChart3,
  Clock,
  Calendar,
  Leaf,
  Users,
  Package,
  MapPin,
  RefreshCw,
  Filter,
  Sparkles,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Send,
  Bot,
  User,
  Info,
  Settings,
  History,
  Bookmark,
  Share2
} from 'lucide-react';

const AIRecommendationsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('recommendations');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Mock AI recommendations data
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      type: 'seasonal',
      title: 'Perfect for Monsoon Season',
      reason: 'Based on your location and current weather patterns',
      confidence: 95,
      products: [
        {
          id: 1,
          name: 'Fresh Green Beans',
          farmer: 'Nimal Gunasekara',
          price: 400,
          unit: 'kg',
          image: '🫘',
          rating: 4.9,
          inSeason: true,
          distance: '15 km',
          whyRecommended: 'High in nutrients, perfect for rainy season immunity boost'
        },
        {
          id: 2,
          name: 'Organic Ginger',
          farmer: 'Kamala Jayawardena',
          price: 800,
          unit: 'kg',
          image: '🫚',
          rating: 4.8,
          inSeason: true,
          distance: '8 km',
          whyRecommended: 'Natural immunity booster, locally grown this month'
        }
      ]
    },
    {
      id: 2,
      type: 'health',
      title: 'Boost Your Immunity',
      reason: 'AI analysis of your purchase history suggests these health-focused items',
      confidence: 88,
      products: [
        {
          id: 3,
          name: 'Premium Organic Turmeric',
          farmer: 'Ravi Mahathaya',
          price: 1200,
          unit: 'kg',
          image: '🧄',
          rating: 4.9,
          inSeason: false,
          distance: '12 km',
          whyRecommended: 'High curcumin content, anti-inflammatory properties'
        },
        {
          id: 4,
          name: 'Fresh Moringa Leaves',
          farmer: 'Saman Silva',
          price: 300,
          unit: 'bunch',
          image: '🌿',
          rating: 4.7,
          inSeason: true,
          distance: '20 km',
          whyRecommended: 'Superfood with 7x vitamin C of oranges'
        }
      ]
    },
    {
      id: 3,
      type: 'trending',
      title: 'Trending in Your Area',
      reason: 'Popular among customers with similar preferences',
      confidence: 82,
      products: [
        {
          id: 5,
          name: 'Heirloom Cherry Tomatoes',
          farmer: 'Priyanka Fernando',
          price: 450,
          unit: 'kg',
          image: '🍅',
          rating: 4.8,
          inSeason: true,
          distance: '5 km',
          whyRecommended: 'Instagram-worthy, perfect for salads and garnishing'
        },
        {
          id: 6,
          name: 'Purple Cabbage',
          farmer: 'Chandana Rathnayake',
          price: 200,
          unit: 'kg',
          image: '🥬',
          rating: 4.6,
          inSeason: true,
          distance: '18 km',
          whyRecommended: 'Rich in antioxidants, trending in healthy recipes'
        }
      ]
    }
  ]);

  // Mock price predictions
  const [pricePredictions] = useState([
    {
      product: 'Tomatoes',
      currentPrice: 300,
      predictedPrice: 280,
      change: -6.7,
      timeframe: 'Next week',
      confidence: 87,
      factors: ['Harvest season peak', 'Increased supply', 'Weather conditions']
    },
    {
      product: 'Onions',
      currentPrice: 220,
      predictedPrice: 250,
      change: +13.6,
      timeframe: 'Next month',
      confidence: 78,
      factors: ['Transport costs', 'Seasonal demand', 'Export trends']
    },
    {
      product: 'Green Beans',
      currentPrice: 400,
      predictedPrice: 420,
      change: +5.0,
      timeframe: 'Next 2 weeks',
      confidence: 82,
      factors: ['Limited harvest', 'High demand', 'Weather dependency']
    }
  ]);

  // Mock insights
  const [insights] = useState([
    {
      id: 1,
      type: 'spending',
      title: 'Your Monthly Spending Pattern',
      description: 'You typically spend 23% more on organic vegetables during monsoon season',
      action: 'Consider bulk buying organic roots vegetables for better savings',
      icon: TrendingUp,
      color: 'emerald'
    },
    {
      id: 2,
      type: 'nutrition',
      title: 'Nutritional Balance Alert',
      description: 'Your recent purchases are low in Vitamin C sources',
      action: 'Add citrus fruits or leafy greens to your next order',
      icon: Heart,
      color: 'red'
    },
    {
      id: 3,
      type: 'sustainability',
      title: 'Carbon Footprint Achievement',
      description: 'Your local purchases reduced carbon footprint by 15% this month',
      action: 'Continue supporting farmers within 20km radius',
      icon: Leaf,
      color: 'green'
    }
  ]);

  // Handle client-side only logic to prevent hydration errors
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

    // Initialize chat with welcome message
    setChatHistory([
      {
        type: 'bot',
        message: "Hi! I'm your AI farming assistant. I can help you with product recommendations, price predictions, and agricultural insights. What would you like to know?",
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
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

  const sendChatMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMessage = {
      type: 'user',
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setChatMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        message: generateAIResponse(chatMessage),
        timestamp: new Date().toLocaleTimeString()
      };
      setChatHistory(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Based on current market trends, tomato prices are expected to drop by 6.7% next week due to peak harvest season. Would you like specific price predictions for other vegetables?";
    } else if (lowerMessage.includes('organic') || lowerMessage.includes('healthy')) {
      return "For optimal health benefits, I recommend organic turmeric (anti-inflammatory), moringa leaves (vitamin C), and ginger (immunity boost). These are currently in season and available from verified organic farmers in your area.";
    } else if (lowerMessage.includes('season') || lowerMessage.includes('weather')) {
      return "This monsoon season is perfect for green beans, ginger, and leafy greens. These crops thrive in current weather conditions and offer maximum nutritional value. Would you like farm locations for these products?";
    } else if (lowerMessage.includes('farmer') || lowerMessage.includes('local')) {
      return "I found 12 verified farmers within 25km of your location. Top rated: Ravi Mahathaya (4.8★) for organic vegetables, Nimal Gunasekara (4.9★) for highland produce. Would you like their contact details?";
    } else {
      return "I understand you're looking for farming insights. I can help with price predictions, seasonal recommendations, organic certifications, local farmer connections, and nutritional advice. What specific area interests you most?";
    }
  };

  const addToCart = (product) => {
    console.log('Add to cart:', product.name);
  };

  const likeRecommendation = (recommendationId) => {
    console.log('Liked recommendation:', recommendationId);
  };

  const refreshRecommendations = () => {
    console.log('Refreshing recommendations...');
  };

  const tabs = [
    { id: 'recommendations', label: 'Smart Recommendations', icon: Target },
    { id: 'predictions', label: 'Price Predictions', icon: TrendingUp },
    { id: 'insights', label: 'Personal Insights', icon: Lightbulb },
    { id: 'chat', label: 'AI Assistant', icon: MessageCircle }
  ];

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
        isMobile ? 'ml-0' : (sidebarCollapsed ? 'ml-20' : 'ml-72')
      }`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 mr-2"
                >
                  <LayoutGrid className="w-6 h-6" />
                </button>
                <div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl lg:text-2xl font-bold text-gray-900">AI Assistant</h1>
                      <p className="text-sm text-gray-600 mt-1">Personalized recommendations powered by artificial intelligence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <button 
                onClick={refreshRecommendations}
                className="hidden md:flex items-center bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 text-purple-700 hover:bg-purple-100 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh AI
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Smart Recommendations Tab */}
            {activeTab === 'recommendations' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <Sparkles className="w-6 h-6" />
                    <h2 className="text-xl font-bold">AI-Powered Recommendations</h2>
                  </div>
                  <p className="opacity-90">Our AI analyzes your preferences, seasonal trends, and local availability to suggest the best products for you.</p>
                </div>

                {recommendations.map((rec) => (
                  <div key={rec.id} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                        <p className="text-sm text-gray-600">{rec.reason}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-500">
                          {rec.confidence}% confidence
                        </div>
                        <button
                          onClick={() => likeRecommendation(rec.id)}
                          className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                        >
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rec.products.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                              {product.image}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{product.name}</h4>
                              <div className="text-sm text-gray-600">
                                {product.farmer} • {product.distance}
                              </div>
                              <div className="flex items-center space-x-2 mt-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600">{product.rating}</span>
                                {product.inSeason && (
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">In Season</span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">Rs. {product.price}</div>
                              <div className="text-sm text-gray-500">per {product.unit}</div>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <div className="text-xs text-purple-600 font-medium mb-1">AI Insight:</div>
                            <div className="text-sm text-gray-600">{product.whyRecommended}</div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => addToCart(product)}
                              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                            >
                              Add to Cart
                            </button>
                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                              <Heart className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Price Predictions Tab */}
            {activeTab === 'predictions' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <TrendingUp className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Smart Price Predictions</h2>
                  </div>
                  <p className="opacity-90">AI-powered market analysis to predict future prices and help you make informed purchasing decisions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pricePredictions.map((prediction, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{prediction.product}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          prediction.change > 0 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {prediction.change > 0 ? '+' : ''}{prediction.change}%
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Current Price</span>
                          <span className="font-semibold text-gray-900">Rs. {prediction.currentPrice}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Predicted Price</span>
                          <span className={`font-semibold ${
                            prediction.change > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            Rs. {prediction.predictedPrice}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Timeframe</span>
                          <span className="font-medium text-gray-900">{prediction.timeframe}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Confidence</span>
                          <span className="font-medium text-purple-600">{prediction.confidence}%</span>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="text-sm text-gray-600 mb-2">Key Factors:</div>
                        <div className="space-y-1">
                          {prediction.factors.map((factor, idx) => (
                            <div key={idx} className="text-xs text-gray-500 flex items-center">
                              <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                              {factor}
                            </div>
                          ))}
                        </div>
                      </div>

                      <button className={`w-full mt-4 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                        prediction.change < 0
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }`}>
                        {prediction.change < 0 ? 'Good Time to Buy' : 'Consider Waiting'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Personal Insights Tab */}
            {activeTab === 'insights' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <Lightbulb className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Personal Insights</h2>
                  </div>
                  <p className="opacity-90">Personalized insights based on your shopping patterns, nutrition needs, and sustainability goals.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {insights.map((insight) => {
                    const IconComponent = insight.icon;
                    return (
                      <div key={insight.id} className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className={`w-12 h-12 bg-${insight.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                          <IconComponent className={`w-6 h-6 text-${insight.color}-600`} />
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
                        
                        <div className={`p-3 bg-${insight.color}-50 rounded-lg border border-${insight.color}-200`}>
                          <div className="text-xs text-gray-600 mb-1">Recommended Action:</div>
                          <div className={`text-sm font-medium text-${insight.color}-800`}>{insight.action}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Monthly Summary */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month's Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">Rs. 2,340</div>
                      <div className="text-sm text-gray-600">Total Spent</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">87%</div>
                      <div className="text-sm text-gray-600">Local Products</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">15</div>
                      <div className="text-sm text-gray-600">Different Farmers</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">-2.3kg</div>
                      <div className="text-sm text-gray-600">CO2 Reduced</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Chat Tab */}
            {activeTab === 'chat' && (
              <div className="bg-white rounded-xl border border-gray-200 h-96 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">FieldFair AI Assistant</h3>
                      <div className="text-sm text-gray-600">Online • Ready to help</div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.map((chat, index) => (
                    <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        chat.type === 'user' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <div className="text-sm">{chat.message}</div>
                        <div className={`text-xs mt-1 ${
                          chat.type === 'user' ? 'text-purple-200' : 'text-gray-500'
                        }`}>
                          {chat.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      placeholder="Ask about prices, seasons, farmers..."
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={sendChatMessage}
                      disabled={!chatMessage.trim()}
                      className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
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

export default AIRecommendationsPage;