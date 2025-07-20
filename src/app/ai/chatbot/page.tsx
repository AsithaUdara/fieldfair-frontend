"use client";

import React, { useState, useEffect, useRef } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Send,
  Bot,
  User,
  Sparkles,
  Mic,
  Paperclip,
  MoreVertical,
  RefreshCw,
  MessageCircle,
  Lightbulb,
  Zap,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2,
  BookOpen,
  ShoppingCart,
  MapPin,
  Calendar,
  Search,
  TrendingUp,
  Leaf,
  Package,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';

const AIChatbotPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm FieldFair AI, your smart farming and shopping assistant. I can help you with product recommendations, farming advice, weather insights, and much more. How can I assist you today?",
      timestamp: new Date().toISOString(),
      reactions: [],
      suggestions: [
        'Find organic vegetables near me',
        'What should I plant this season?',
        'Show me trending products',
        'Weather forecast for farming'
      ]
    }
  ]);

  // Quick action suggestions
  const quickActions = [
    { icon: Search, label: 'Find Products', query: 'Help me find fresh organic vegetables' },
    { icon: TrendingUp, label: 'Market Trends', query: 'What are the current market trends for vegetables?' },
    { icon: Leaf, label: 'Farming Tips', query: 'Give me organic farming tips for tomatoes' },
    { icon: Calendar, label: 'Seasonal Guide', query: 'What crops should I plant this season?' },
    { icon: MapPin, label: 'Find Farms', query: 'Show me nearby organic farms' },
    { icon: Package, label: 'Order Status', query: 'Check my recent orders' }
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateBotResponse = (userMessage: string) => {
    // Simulate AI processing
    setIsTyping(true);
    
    setTimeout(() => {
      let botResponse = '';
      let suggestions: string[] = [];
      
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('organic') || lowerMessage.includes('vegetables')) {
        botResponse = "I found several organic vegetables from local farmers near you! Here are my top recommendations:\n\n🍅 **Organic Tomatoes** - Rs. 300/kg from Ravi's Organic Farm (2.5km away)\n🥕 **Fresh Carrots** - Rs. 250/kg from Saman Silva (5.2km away)\n🥬 **Green Lettuce** - Rs. 180/kg from Kamala's Garden (8.1km away)\n\nAll these products are certified organic and freshly harvested. Would you like me to add any of these to your cart or show you more details?";
        suggestions = ['Add tomatoes to cart', 'Show farm details', 'Find more organic options', 'Compare prices'];
      } else if (lowerMessage.includes('weather') || lowerMessage.includes('forecast')) {
        botResponse = "🌤️ **Weather Forecast for Farming**\n\n**Today**: Partly cloudy, 28°C, humidity 75%\n**Tomorrow**: Light rain expected, 26°C - Great for watering!\n**This Week**: Mixed conditions, perfect for most crops\n\n**Farming Recommendations**:\n✅ Good time for planting leafy greens\n✅ Tomatoes will benefit from the upcoming rain\n⚠️ Cover sensitive plants if rain gets heavy\n\nWould you like detailed weather for specific crops or your farm location?";
        suggestions = ['Crop-specific weather', 'Set weather alerts', 'Best planting times', 'Rain protection tips'];
      } else if (lowerMessage.includes('plant') || lowerMessage.includes('season') || lowerMessage.includes('crop')) {
        botResponse = "🌱 **Seasonal Planting Guide**\n\nFor the current season (June-July), here are the best crops to plant:\n\n**Vegetables**:\n• Tomatoes (70-80 days to harvest)\n• Carrots (60-70 days)\n• Lettuce (45-55 days)\n• Green beans (50-60 days)\n\n**Best practices**:\n✅ Plant early morning or late evening\n✅ Ensure good drainage with monsoon coming\n✅ Use organic compost for better yields\n\nWhich specific crop would you like detailed guidance for?";
        suggestions = ['Tomato growing guide', 'Organic fertilizer tips', 'Pest control methods', 'Harvesting schedule'];
      } else if (lowerMessage.includes('trend') || lowerMessage.includes('market') || lowerMessage.includes('popular')) {
        botResponse = "📈 **Current Market Trends**\n\n**🔥 Trending This Week**:\n1. Dragon Fruit (+67% orders)\n2. Microgreens (+43% orders)\n3. Organic Herbs (+38% orders)\n\n**💰 Price Trends**:\n• Tomatoes: Stable at Rs. 300-350/kg\n• Leafy greens: Rising due to high demand\n• Root vegetables: Seasonal dip expected\n\n**💡 Opportunity**: High demand for organic herbs - consider growing basil, mint, and coriander!";
        suggestions = ['View trending products', 'Price predictions', 'Growing opportunities', 'Market analysis'];
      } else if (lowerMessage.includes('order') || lowerMessage.includes('delivery')) {
        botResponse = "📦 **Your Recent Orders**\n\n**Order #FF2024-001** (June 25)\n🍅 Organic Tomatoes - 3kg - **Delivered** ✅\n🥕 Fresh Carrots - 2kg - **Delivered** ✅\nTotal: Rs. 2,200\n\n**Order #FF2024-002** (June 23)\n🫘 Green Beans - 4kg - **In Transit** 🚛\nExpected delivery: Today 4:00 PM\n\nWould you like to track your current order or place a new one?";
        suggestions = ['Track current order', 'Reorder favorites', 'Order history', 'Delivery preferences'];
      } else if (lowerMessage.includes('farm') || lowerMessage.includes('visit') || lowerMessage.includes('location')) {
        botResponse = "🚜 **Nearby Farms Available for Visits**\n\n**Ravi's Organic Farm** (2.5km)\n⭐ 4.8 rating • Organic certified\nSpecialty: Tomatoes, herbs\nVisit cost: Rs. 1,500 per person\n\n**Silva Sustainable Farm** (5.2km)\n⭐ 4.6 rating • Farm-to-table experience\nSpecialty: Mixed vegetables\nVisit cost: Rs. 2,000 per person\n\n**Green Valley Farm** (15.7km)\n⭐ 4.9 rating • Mountain organic\nSpecialty: Premium vegetables\nVisit cost: Rs. 2,500 per person\n\nWould you like to book a farm visit or get directions?";
        suggestions = ['Book farm visit', 'Get directions', 'Compare farms', 'View farm details'];
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('help')) {
        botResponse = "Hello! I'm here to help you with all things related to farming and fresh produce. I can assist you with:\n\n🛒 **Shopping**: Find products, compare prices, recommendations\n🌱 **Farming**: Planting guides, weather advice, best practices\n📈 **Market Intel**: Trends, pricing, demand forecasting\n🚜 **Farm Visits**: Nearby farms, booking, directions\n📦 **Orders**: Track deliveries, reorder favorites\n\nWhat would you like to explore today?";
        suggestions = ['Find organic products', 'Farming advice', 'Market trends', 'Book farm visit'];
      } else {
        botResponse = `I understand you're asking about "${userMessage}". Let me help you with that! Based on your query, I can provide information about farming techniques, product recommendations, or market insights. Could you be more specific about what you'd like to know?`;
        suggestions = ['Find products', 'Farming tips', 'Weather info', 'Market trends'];
      }
      
      const newBotMessage = {
        id: messages.length + 1,
        type: 'bot' as const,
        content: botResponse,
        timestamp: new Date().toISOString(),
        reactions: [],
        suggestions
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newUserMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: message,
      timestamp: new Date().toISOString(),
      reactions: []
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Generate bot response
    generateBotResponse(message);
    
    setMessage('');
  };

  const sendQuickMessage = (query: string) => {
    setMessage(query);
    setTimeout(() => sendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const reactToMessage = (messageId: number, reaction: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, reactions: [...(msg.reactions || []), { type: reaction, userId: 'current_user' }] }
        : msg
    ));
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // In real app, implement speech recognition
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
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">FieldFair AI Assistant</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Online • Ready to help</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Chat Container */}
        <div className="flex-1 flex">
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Quick Actions (shown at start) */}
                {messages.length === 1 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => sendQuickMessage(action.query)}
                        className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
                      >
                        <action.icon className="w-5 h-5 text-blue-500 mb-2 group-hover:text-blue-600" />
                        <div className="font-medium text-gray-900 text-sm">{action.label}</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Messages */}
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl ${msg.type === 'user' ? 'ml-12' : 'mr-12'}`}>
                      <div className="flex items-start space-x-3">
                        {msg.type === 'bot' && (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className={`rounded-2xl px-4 py-3 ${
                            msg.type === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-white border border-gray-200 text-gray-900'
                          }`}>
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                          </div>
                          
                          {/* Message Actions */}
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-gray-500">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            
                            {msg.type === 'bot' && (
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => reactToMessage(msg.id, 'like')}
                                  className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => reactToMessage(msg.id, 'dislike')}
                                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                >
                                  <ThumbsDown className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => copyMessage(msg.content)}
                                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                          
                          {/* Suggestions */}
                          {msg.type === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {msg.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => sendQuickMessage(suggestion)}
                                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {msg.type === 'user' && (
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-3xl mr-12">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-end space-x-3">
                  <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about farming, products, or market trends..."
                      className="w-full border border-gray-300 rounded-2xl px-4 py-3 pr-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows={1}
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                    
                    <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                      <button
                        onClick={toggleVoiceInput}
                        className={`p-2 rounded-full transition-colors ${
                          isListening 
                            ? 'bg-red-100 text-red-600' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Mic className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={sendMessage}
                        disabled={!message.trim() || isTyping}
                        className={`p-2 rounded-full transition-colors ${
                          message.trim() && !isTyping
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-2 text-center">
                  FieldFair AI can make mistakes. Please verify important information.
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Chat Features */}
          <div className="w-80 bg-white border-l border-gray-200 overflow-auto hidden lg:block">
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">AI Capabilities</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Smart Shopping</span>
                  </div>
                  <p className="text-sm text-blue-800">Get personalized product recommendations based on your preferences and history.</p>
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-900">Farming Advice</span>
                  </div>
                  <p className="text-sm text-green-800">Expert guidance on planting, harvesting, and organic farming techniques.</p>
                </div>
                
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-900">Market Intelligence</span>
                  </div>
                  <p className="text-sm text-purple-800">Real-time market trends, pricing insights, and demand forecasting.</p>
                </div>
                
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    <span className="font-medium text-orange-900">Local Discovery</span>
                  </div>
                  <p className="text-sm text-orange-800">Find nearby farms, check delivery options, and plan farm visits.</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Suggested Questions</h3>
                <div className="space-y-2">
                  {[
                    'What organic vegetables are in season?',
                    'How do I grow tomatoes organically?',
                    'Which farms offer the best prices?',
                    'What are the weather conditions for farming?',
                    'Show me trending products this week',
                    'How can I reduce my carbon footprint?'
                  ].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => sendQuickMessage(question)}
                      className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbotPage;