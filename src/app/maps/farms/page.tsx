"use client";

import React, { useState, useEffect } from 'react';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Eye,
  Heart,
  Shield,
  Leaf,
  Award,
  Users,
  Calendar,
  Clock,
  Navigation,
  Map,
  Truck,
  Package,
  TrendingUp,
  CheckCircle,
  Camera,
  Share2,
  ExternalLink,
  X,
  ChevronDown,
  SlidersHorizontal,
  Target,
  Route,
  Compass,
  Building,
  Home,
  Factory,
  TreePine,
  Wheat,
  Apple,
  Mountain,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Info,
  AlertCircle,
  Zap,
  Globe,
  BookOpen,
  Car,
  Bike,
  Bus
} from 'lucide-react';

const FindFarmsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [showFarmDetails, setShowFarmDetails] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    organic: false,
    verified: false,
    visitsAllowed: false,
    delivery: false,
    newFarms: false,
    highRated: false
  });

  // Enhanced farms data
  const [farms] = useState([
    {
      id: 1,
      name: "Ravi's Organic Farm",
      owner: {
        name: 'Ravi Mahathaya',
        avatar: 'RM',
        verified: true,
        phone: '+94 77 123 4567',
        email: 'ravi@organicfarm.lk'
      },
      location: {
        address: 'Pannala Road, Kurunegala',
        district: 'Kurunegala',
        province: 'North Western',
        coordinates: { lat: 7.4863, lng: 80.3647 },
        distance: 2.5
      },
      farmType: 'Organic Vegetables',
      specialties: ['Tomatoes', 'Carrots', 'Cabbage', 'Green Beans'],
      farmSize: '2.5 acres',
      established: 2018,
      rating: 4.8,
      reviews: 127,
      totalCustomers: 156,
      image: '🍅',
      images: ['🍅', '🥕', '🥬', '🌱'],
      description: 'Passionate organic farmer specializing in fresh vegetables grown using sustainable farming practices.',
      longDescription: 'Our farm has been dedicated to organic farming since 2018. We specialize in growing fresh, healthy vegetables without the use of harmful pesticides or chemicals. Our sustainable farming methods ensure the highest quality produce while protecting the environment.',
      isOrganic: true,
      certifications: ['Organic Certified', 'Good Agricultural Practices', 'Fair Trade'],
      services: {
        delivery: true,
        pickup: true,
        farmVisits: true,
        bulkOrders: true,
        customOrders: false
      },
      operatingHours: {
        monday: '8:00 AM - 6:00 PM',
        tuesday: '8:00 AM - 6:00 PM',
        wednesday: '8:00 AM - 6:00 PM',
        thursday: '8:00 AM - 6:00 PM',
        friday: '8:00 AM - 6:00 PM',
        saturday: '8:00 AM - 4:00 PM',
        sunday: 'Closed'
      },
      activeProducts: 24,
      sustainabilityScore: 95,
      category: 'vegetables',
      tags: ['Organic', 'Sustainable', 'Local', 'Fresh', 'Family-owned'],
      socialMedia: {
        website: 'www.raviorganicfarm.lk',
        facebook: 'RaviOrganicFarm',
        instagram: '@raviorganicfarm'
      },
      achievements: ['Best Organic Farm 2023', 'Sustainability Award 2022'],
      farmingMethods: ['Crop rotation', 'Composting', 'Natural pest control', 'Rainwater harvesting'],
      isFavorite: false,
      isNewFarm: false,
      visitInfo: {
        allowed: true,
        bookingRequired: true,
        groupSizeMax: 20,
        duration: '2 hours',
        cost: 'Rs. 500 per person',
        includes: ['Farm tour', 'Harvesting experience', 'Fresh juice tasting']
      }
    },
    {
      id: 2,
      name: "Saman's Fresh Vegetables",
      owner: {
        name: 'Saman Silva',
        avatar: 'SS',
        verified: true,
        phone: '+94 76 987 6543',
        email: 'saman@freshveggies.lk'
      },
      location: {
        address: 'Dambulla Road, Matale',
        district: 'Matale',
        province: 'Central',
        coordinates: { lat: 7.4675, lng: 80.6234 },
        distance: 15.3
      },
      farmType: 'Mixed Vegetables',
      specialties: ['Carrots', 'Green Beans', 'Onions', 'Potatoes'],
      farmSize: '4.2 acres',
      established: 2015,
      rating: 4.6,
      reviews: 89,
      totalCustomers: 203,
      image: '🥕',
      images: ['🥕', '🫘', '🧄', '🥔'],
      description: 'Family-run farm growing a variety of fresh vegetables using traditional and modern farming techniques.',
      longDescription: 'Established in 2015, our family farm combines traditional farming wisdom with modern sustainable practices. We grow a diverse range of vegetables and take pride in delivering the freshest produce to our customers.',
      isOrganic: false,
      certifications: ['Good Agricultural Practices', 'Quality Assurance'],
      services: {
        delivery: true,
        pickup: true,
        farmVisits: true,
        bulkOrders: true,
        customOrders: true
      },
      operatingHours: {
        monday: '7:00 AM - 5:00 PM',
        tuesday: '7:00 AM - 5:00 PM',
        wednesday: '7:00 AM - 5:00 PM',
        thursday: '7:00 AM - 5:00 PM',
        friday: '7:00 AM - 5:00 PM',
        saturday: '7:00 AM - 3:00 PM',
        sunday: 'Closed'
      },
      activeProducts: 18,
      sustainabilityScore: 88,
      category: 'vegetables',
      tags: ['Fresh', 'Family-owned', 'Local', 'Quality', 'Reliable'],
      socialMedia: {
        website: 'www.samanveggies.com',
        facebook: 'SamanFreshVeggies'
      },
      achievements: ['Community Choice Award 2023'],
      farmingMethods: ['Integrated pest management', 'Soil conservation', 'Water-efficient irrigation'],
      isFavorite: true,
      isNewFarm: false,
      visitInfo: {
        allowed: true,
        bookingRequired: false,
        groupSizeMax: 15,
        duration: '1.5 hours',
        cost: 'Rs. 300 per person',
        includes: ['Farm tour', 'Vegetable garden visit', 'Farming tips session']
      }
    },
    {
      id: 3,
      name: "Nimal's Highland Farm",
      owner: {
        name: 'Nimal Gunasekara',
        avatar: 'NG',
        verified: true,
        phone: '+94 71 444 5566',
        email: 'nimal@highlandfarm.lk'
      },
      location: {
        address: 'Hakgala Road, Nuwara Eliya',
        district: 'Nuwara Eliya',
        province: 'Central',
        coordinates: { lat: 6.9497, lng: 80.7891 },
        distance: 45.8
      },
      farmType: 'High-altitude Vegetables',
      specialties: ['Green Beans', 'Leeks', 'Cabbage', 'Carrots'],
      farmSize: '3.8 acres',
      established: 2012,
      rating: 4.9,
      reviews: 78,
      totalCustomers: 94,
      image: '🫘',
      images: ['🫘', '🥬', '🥕', '🌿'],
      description: 'Premium highland farm growing exceptional quality vegetables in the cool climate of Nuwara Eliya.',
      longDescription: 'Located in the beautiful highlands of Nuwara Eliya, our farm takes advantage of the cool climate and fertile soil to produce premium quality vegetables. Our high-altitude farming methods result in vegetables with exceptional taste and nutritional value.',
      isOrganic: true,
      certifications: ['Organic Certified', 'Premium Grade', 'Highland Grown'],
      services: {
        delivery: false,
        pickup: true,
        farmVisits: true,
        bulkOrders: true,
        customOrders: false
      },
      operatingHours: {
        monday: '8:00 AM - 5:00 PM',
        tuesday: '8:00 AM - 5:00 PM',
        wednesday: '8:00 AM - 5:00 PM',
        thursday: '8:00 AM - 5:00 PM',
        friday: '8:00 AM - 5:00 PM',
        saturday: '8:00 AM - 2:00 PM',
        sunday: 'By appointment'
      },
      activeProducts: 12,
      sustainabilityScore: 93,
      category: 'vegetables',
      tags: ['Organic', 'Premium', 'Highland', 'Cool-climate', 'Quality'],
      socialMedia: {
        website: 'www.nimalhighlandfarm.lk'
      },
      achievements: ['Premium Quality Award 2023', 'Organic Excellence 2022'],
      farmingMethods: ['Organic farming', 'Altitude advantage', 'Natural fertilizers', 'Climate-controlled growing'],
      isFavorite: false,
      isNewFarm: false,
      visitInfo: {
        allowed: true,
        bookingRequired: true,
        groupSizeMax: 10,
        duration: '3 hours',
        cost: 'Rs. 750 per person',
        includes: ['Highland farm tour', 'Tea plantation visit', 'Local lunch', 'Scenic views']
      }
    },
    {
      id: 4,
      name: "Fernando's Coconut Estate",
      owner: {
        name: 'Priya Fernando',
        avatar: 'PF',
        verified: true,
        phone: '+94 77 888 9999',
        email: 'priya@coconutestate.lk'
      },
      location: {
        address: 'Chilaw Road, Negombo',
        district: 'Gampaha',
        province: 'Western',
        coordinates: { lat: 7.2083, lng: 79.8358 },
        distance: 8.7
      },
      farmType: 'Coconut Plantation',
      specialties: ['King Coconuts', 'Coconut Oil', 'Coconut Water', 'Copra'],
      farmSize: '12 acres',
      established: 1995,
      rating: 4.5,
      reviews: 234,
      totalCustomers: 567,
      image: '🥥',
      images: ['🥥', '🌴', '🥤', '💧'],
      description: 'Traditional coconut estate producing fresh coconuts and coconut products for over 25 years.',
      longDescription: 'Our coconut estate has been in the Fernando family for over 25 years. We specialize in producing the freshest king coconuts and high-quality coconut products using traditional methods passed down through generations.',
      isOrganic: false,
      certifications: ['Quality Assurance', 'Traditional Methods'],
      services: {
        delivery: true,
        pickup: true,
        farmVisits: true,
        bulkOrders: true,
        customOrders: true
      },
      operatingHours: {
        monday: '6:00 AM - 6:00 PM',
        tuesday: '6:00 AM - 6:00 PM',
        wednesday: '6:00 AM - 6:00 PM',
        thursday: '6:00 AM - 6:00 PM',
        friday: '6:00 AM - 6:00 PM',
        saturday: '6:00 AM - 6:00 PM',
        sunday: '7:00 AM - 4:00 PM'
      },
      activeProducts: 8,
      sustainabilityScore: 85,
      category: 'fruits',
      tags: ['Traditional', 'Family-owned', 'Fresh', 'Natural', 'Coastal'],
      socialMedia: {
        website: 'www.fernandococonut.lk',
        facebook: 'FernandoCoconutEstate'
      },
      achievements: ['Traditional Excellence Award 2023'],
      farmingMethods: ['Traditional harvesting', 'Natural processing', 'Sustainable plantation management'],
      isFavorite: false,
      isNewFarm: false,
      visitInfo: {
        allowed: true,
        bookingRequired: false,
        groupSizeMax: 25,
        duration: '2 hours',
        cost: 'Rs. 400 per person',
        includes: ['Coconut climbing demo', 'Fresh coconut tasting', 'Coconut oil making process']
      }
    },
    {
      id: 5,
      name: "Rathnayake Spice Garden",
      owner: {
        name: 'Chandana Rathnayake',
        avatar: 'CR',
        verified: true,
        phone: '+94 75 333 4444',
        email: 'chandana@spicegarden.lk'
      },
      location: {
        address: 'Dickwella Road, Matara',
        district: 'Matara',
        province: 'Southern',
        coordinates: { lat: 5.9485, lng: 80.5353 },
        distance: 125.4
      },
      farmType: 'Spice Garden',
      specialties: ['Cinnamon', 'Cardamom', 'Pepper', 'Nutmeg'],
      farmSize: '6.5 acres',
      established: 2008,
      rating: 4.9,
      reviews: 203,
      totalCustomers: 445,
      image: '🌶️',
      images: ['🌶️', '🥢', '🌿', '☕'],
      description: 'Authentic Sri Lankan spice garden growing world-famous Ceylon spices using traditional methods.',
      longDescription: 'Our spice garden specializes in growing and processing authentic Ceylon spices that are world-renowned for their quality and aroma. We use traditional cultivation and processing methods to ensure the highest quality spices.',
      isOrganic: true,
      certifications: ['Organic Certified', 'Export Quality', 'Ceylon Spice Certified'],
      services: {
        delivery: true,
        pickup: true,
        farmVisits: true,
        bulkOrders: true,
        customOrders: true
      },
      operatingHours: {
        monday: '8:00 AM - 5:00 PM',
        tuesday: '8:00 AM - 5:00 PM',
        wednesday: '8:00 AM - 5:00 PM',
        thursday: '8:00 AM - 5:00 PM',
        friday: '8:00 AM - 5:00 PM',
        saturday: '8:00 AM - 5:00 PM',
        sunday: '9:00 AM - 3:00 PM'
      },
      activeProducts: 25,
      sustainabilityScore: 96,
      category: 'spices',
      tags: ['Organic', 'Traditional', 'Export Quality', 'Ceylon Spices', 'Authentic'],
      socialMedia: {
        website: 'www.ceylonspicegarden.com',
        facebook: 'RathnayakeSpiceGarden',
        instagram: '@ceylonspices'
      },
      achievements: ['World Spice Excellence 2023', 'Best Ceylon Cinnamon 2022', 'Export Excellence 2021'],
      farmingMethods: ['Traditional spice cultivation', 'Natural processing', 'Heritage preservation', 'Sustainable harvesting'],
      isFavorite: true,
      isNewFarm: false,
      visitInfo: {
        allowed: true,
        bookingRequired: true,
        groupSizeMax: 30,
        duration: '2.5 hours',
        cost: 'Rs. 800 per person',
        includes: ['Spice garden tour', 'Spice processing demo', 'Cooking class', 'Spice tasting', 'Recipe booklet']
      }
    },
    {
      id: 6,
      name: "Green Valley Organic Farm",
      owner: {
        name: 'Kumari Jayasuriya',
        avatar: 'KJ',
        verified: false,
        phone: '+94 72 555 7777',
        email: 'kumari@greenvalley.lk'
      },
      location: {
        address: 'Gampola Road, Kandy',
        district: 'Kandy',
        province: 'Central',
        coordinates: { lat: 7.2906, lng: 80.6337 },
        distance: 18.2
      },
      farmType: 'Mixed Organic',
      specialties: ['Lettuce', 'Spinach', 'Herbs', 'Microgreens'],
      farmSize: '1.8 acres',
      established: 2023,
      rating: 4.3,
      reviews: 15,
      totalCustomers: 28,
      image: '🥬',
      images: ['🥬', '🌿', '🌱', '💚'],
      description: 'New organic farm focusing on leafy greens and herbs using innovative sustainable farming techniques.',
      longDescription: 'Green Valley is a newly established organic farm that focuses on producing high-quality leafy greens and fresh herbs. We use innovative sustainable farming techniques including hydroponics and vertical farming.',
      isOrganic: true,
      certifications: ['Organic Certification Pending'],
      services: {
        delivery: true,
        pickup: true,
        farmVisits: true,
        bulkOrders: false,
        customOrders: true
      },
      operatingHours: {
        monday: '9:00 AM - 5:00 PM',
        tuesday: '9:00 AM - 5:00 PM',
        wednesday: '9:00 AM - 5:00 PM',
        thursday: '9:00 AM - 5:00 PM',
        friday: '9:00 AM - 5:00 PM',
        saturday: '9:00 AM - 2:00 PM',
        sunday: 'Closed'
      },
      activeProducts: 8,
      sustainabilityScore: 92,
      category: 'vegetables',
      tags: ['Organic', 'New', 'Innovative', 'Hydroponics', 'Fresh'],
      socialMedia: {
        facebook: 'GreenValleyOrganic',
        instagram: '@greenvalleykandy'
      },
      achievements: [],
      farmingMethods: ['Hydroponics', 'Vertical farming', 'Organic composting', 'Renewable energy'],
      isFavorite: false,
      isNewFarm: true,
      visitInfo: {
        allowed: true,
        bookingRequired: true,
        groupSizeMax: 8,
        duration: '1 hour',
        cost: 'Rs. 250 per person',
        includes: ['Modern farming tour', 'Hydroponic system demo', 'Fresh herb tasting']
      }
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Farms', count: farms.length, icon: Home, color: 'emerald' },
    { id: 'vegetables', name: 'Vegetable Farms', count: 4, icon: Leaf, color: 'green' },
    { id: 'fruits', name: 'Fruit Farms', count: 1, icon: Apple, color: 'red' },
    { id: 'spices', name: 'Spice Gardens', count: 1, icon: TreePine, color: 'orange' },
    { id: 'organic', name: 'Organic Only', count: 4, icon: Leaf, color: 'emerald' }
  ];

  const quickFilters = [
    { id: 'organic', label: 'Organic Certified', icon: Leaf, color: 'emerald' },
    { id: 'verified', label: 'Verified Farms', icon: Shield, color: 'blue' },
    { id: 'visitsAllowed', label: 'Farm Visits', icon: Eye, color: 'purple' },
    { id: 'delivery', label: 'Home Delivery', icon: Truck, color: 'indigo' },
    { id: 'newFarms', label: 'New Farms', icon: Zap, color: 'yellow' },
    { id: 'highRated', label: '4.5+ Rating', icon: Star, color: 'orange' }
  ];

  const sortOptions = [
    { id: 'distance', name: 'Nearest First', icon: Navigation },
    { id: 'rating', name: 'Highest Rated', icon: Star },
    { id: 'newest', name: 'Newest First', icon: Clock },
    { id: 'name', name: 'Name A-Z', icon: Target },
    { id: 'size', name: 'Farm Size', icon: Mountain },
    { id: 'products', name: 'Most Products', icon: Package }
  ];

  // Search suggestions
  const searchSuggestionsList = [
    'Organic farms near me', 'Vegetable farms', 'Spice gardens', 'Farm visits',
    'Coconut plantations', 'Highland farms', 'Fresh produce', 'Traditional farming'
  ];

  // Filter and sort farms
  const filteredFarms = farms.filter(farm => {
    const matchesSearch = farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         farm.location.district.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = true;
    if (selectedCategory === 'organic') {
      matchesCategory = farm.isOrganic;
    } else if (selectedCategory !== 'all') {
      matchesCategory = farm.category === selectedCategory;
    }

    const matchesFilters = 
      (!selectedFilters.organic || farm.isOrganic) &&
      (!selectedFilters.verified || farm.owner.verified) &&
      (!selectedFilters.visitsAllowed || farm.visitInfo.allowed) &&
      (!selectedFilters.delivery || farm.services.delivery) &&
      (!selectedFilters.newFarms || farm.isNewFarm) &&
      (!selectedFilters.highRated || farm.rating >= 4.5);
    
    return matchesSearch && matchesCategory && matchesFilters;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'distance': return a.location.distance - b.location.distance;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.established - a.established;
      case 'name': return a.name.localeCompare(b.name);
      case 'size': return parseFloat(b.farmSize) - parseFloat(a.farmSize);
      case 'products': return b.activeProducts - a.activeProducts;
      default: return 0;
    }
  });

  // Interactive functions
  const toggleFavorite = (farmId) => {
    setFavorites(prev => 
      prev.includes(farmId) 
        ? prev.filter(id => id !== farmId)
        : [...prev, farmId]
    );
  };

  const openFarmDetails = (farm) => {
    setSelectedFarm(farm);
    setShowFarmDetails(true);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const suggestions = searchSuggestionsList.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const toggleFilter = (filterId) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
  };

  const contactFarm = (farm) => {
    console.log('Contact farm:', farm.name);
  };

  const bookVisit = (farm) => {
    console.log('Book visit to:', farm.name);
  };

  const getDirections = (farm) => {
    const { lat, lng } = farm.location.coordinates;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <FieldFairSidebar 
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        isMobile={false}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        userType="customer"
      />

      {/* Mobile Sidebar */}
      <FieldFairSidebar 
        isCollapsed={false}
        isMobile={true}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        userType="customer"
      />

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-500 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        {/* Enhanced Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 mr-4"
                >
                  <LayoutGrid className="w-6 h-6" />
                </button>
                
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">🗺️ Find Local Farms</h1>
                  <p className="text-gray-600 hidden sm:block">Discover farms near you and connect directly with farmers</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Enhanced Search with Suggestions */}
                <div className="relative">
                  <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 w-full max-w-md">
                    <Search className="w-5 h-5 text-gray-500 mr-3" />
                    <input 
                      type="text" 
                      placeholder="Search farms, locations, crops..."
                      className="bg-transparent text-sm outline-none flex-1"
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                    {searchTerm && (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setShowSuggestions(false);
                        }}
                        className="ml-2 p-1 hover:bg-gray-200 rounded-full"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    )}
                  </div>
                  
                  {/* Search Suggestions */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 max-h-60 overflow-y-auto">
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchTerm(suggestion);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-0"
                        >
                          <Search className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowMap(!showMap)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                      showMap ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Map className="w-4 h-4" />
                    <span className="hidden sm:inline">Map View</span>
                  </button>
                  
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-3 rounded-xl transition-colors ${showFilters ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-3 overflow-x-auto">
              {quickFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedFilters[filter.id]
                      ? `bg-${filter.color}-100 text-${filter.color}-700 border border-${filter.color}-200`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  <span>{filter.label}</span>
                  {selectedFilters[filter.id] && (
                    <CheckCircle className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-4 lg:p-6">
          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Distance Range */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Distance Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="distance"
                        className="text-emerald-600"
                        defaultChecked
                      />
                      <span className="text-sm text-gray-700">Within 10km</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="distance"
                        className="text-emerald-600"
                      />
                      <span className="text-sm text-gray-700">Within 25km</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="distance"
                        className="text-emerald-600"
                      />
                      <span className="text-sm text-gray-700">Within 50km</span>
                    </label>
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Sort By</h4>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>

                {/* Farm Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Farm Features</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Educational Tours</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Pick Your Own</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Farm Store</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Categories */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-bold text-gray-900">Explore Farm Types</h2>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                  {filteredFarms.length} farms found
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 lg:p-6 rounded-2xl text-center transition-all transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-white text-gray-700 border-2 border-gray-100 hover:border-emerald-200 hover:bg-emerald-50'
                  }`}
                >
                  <category.icon className="w-8 h-8 mx-auto mb-3" />
                  <div className="font-semibold text-xs lg:text-sm">{category.name}</div>
                  <div className="text-xs opacity-75 mt-1">({category.count})</div>
                </button>
              ))}
            </div>
          </div>

          {/* Map View */}
          {showMap && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Farm Locations Map</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </button>
              </div>
              <div className="bg-emerald-50 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <p className="text-emerald-700 font-medium">Interactive Farm Map</p>
                  <p className="text-emerald-600 text-sm">Map integration would be implemented here</p>
                </div>
              </div>
            </div>
          )}

          {/* Farms Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFarms.map((farm) => (
                <div key={farm.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                  {/* Farm Header */}
                  <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-green-100 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{farm.image}</span>
                    </div>
                    
                    {/* Farm Badges */}
                    <div className="absolute top-3 left-3 flex flex-col space-y-2">
                      {farm.isOrganic && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center shadow-lg">
                          <Leaf className="w-3 h-3 mr-1" />
                          Organic
                        </span>
                      )}
                      {farm.owner.verified && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center shadow-lg">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      )}
                      {farm.isNewFarm && (
                        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          New Farm
                        </span>
                      )}
                    </div>
                    
                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(farm.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(farm.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                    </button>

                    {/* Distance Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white bg-opacity-90 text-gray-800 text-xs px-2 py-1 rounded-full font-semibold flex items-center">
                        <Navigation className="w-3 h-3 mr-1" />
                        {farm.location.distance}km away
                      </span>
                    </div>
                  </div>
                  
                  {/* Farm Details */}
                  <div className="p-5">
                    {/* Farm Name & Rating */}
                    <div className="mb-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{farm.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          {[1,2,3,4,5].map(i => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i <= Math.floor(farm.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="font-semibold text-sm text-gray-900 ml-1">{farm.rating}</span>
                          <span className="text-sm text-gray-500">({farm.reviews})</span>
                        </div>
                        <span className="text-sm text-gray-600">{farm.totalCustomers} customers</span>
                      </div>
                    </div>
                    
                    {/* Owner Info */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-emerald-700">{farm.owner.avatar}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 text-sm">{farm.owner.name}</div>
                          <div className="flex items-center text-xs text-gray-600">
                            <MapPin className="w-3 h-3 mr-1" />
                            {farm.location.district}, {farm.location.province}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Farm Info */}
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Farm Type:</span>
                        <span className="font-medium text-gray-900">{farm.farmType}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium text-gray-900">{farm.farmSize}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Products:</span>
                        <span className="font-medium text-gray-900">{farm.activeProducts} active</span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-5">
                      <p className="text-sm text-gray-600 mb-2">Specialties:</p>
                      <div className="flex flex-wrap gap-1">
                        {farm.specialties.slice(0, 3).map((specialty, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            {specialty}
                          </span>
                        ))}
                        {farm.specialties.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{farm.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openFarmDetails(farm)}
                          className="flex-1 border-2 border-gray-200 text-gray-700 py-2.5 px-3 rounded-xl text-sm font-semibold hover:border-emerald-300 hover:bg-emerald-50 transition-colors flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        <button
                          onClick={() => getDirections(farm)}
                          className="p-2.5 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                        >
                          <Navigation className="w-4 h-4 text-gray-700" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => contactFarm(farm)}
                          className="flex-1 bg-emerald-600 text-white py-2.5 px-4 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Contact Farm
                        </button>
                        {farm.visitInfo.allowed && (
                          <button
                            onClick={() => bookVisit(farm)}
                            className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredFarms.map((farm) => (
                <div key={farm.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-6">
                    {/* Farm Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-50 to-green-100 rounded-lg flex items-center justify-center text-4xl flex-shrink-0 relative">
                      {farm.image}
                      {farm.isNewFarm && (
                        <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded-full font-semibold">
                          New
                        </span>
                      )}
                    </div>
                    
                    {/* Farm Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{farm.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{farm.rating} ({farm.reviews})</span>
                            </div>
                            <span>{farm.owner.name}</span>
                            <span>{farm.location.district}</span>
                            <span>{farm.location.distance}km away</span>
                          </div>
                          <p className="text-gray-600 text-sm">{farm.description}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          {farm.isOrganic && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                              Organic
                            </span>
                          )}
                          {farm.owner.verified && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-500">Type:</span>
                          <div className="font-medium text-gray-900">{farm.farmType}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Size:</span>
                          <div className="font-medium text-gray-900">{farm.farmSize}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Products:</span>
                          <div className="font-medium text-gray-900">{farm.activeProducts} active</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Since:</span>
                          <div className="font-medium text-gray-900">{farm.established}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-sm text-gray-500 mb-2 block">Specialties:</span>
                        <div className="flex flex-wrap gap-2">
                          {farm.specialties.map((specialty, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{farm.totalCustomers} customers</span>
                          </div>
                          {farm.services.delivery && (
                            <div className="flex items-center space-x-1">
                              <Truck className="w-4 h-4" />
                              <span>Delivery available</span>
                            </div>
                          )}
                          {farm.visitInfo.allowed && (
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>Farm visits</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleFavorite(farm.id)}
                            className="p-2.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                          >
                            <Heart className={`w-5 h-5 ${favorites.includes(farm.id) ? 'text-red-500 fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => getDirections(farm)}
                            className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                          >
                            <Navigation className="w-4 h-4 mr-2" />
                            Directions
                          </button>
                          <button
                            onClick={() => contactFarm(farm)}
                            className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredFarms.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No farms found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters to find farms in your area.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedFilters({
                    organic: false,
                    verified: false,
                    visitsAllowed: false,
                    delivery: false,
                    newFarms: false,
                    highRated: false
                  });
                }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>

        {/* Farm Details Modal */}
        {showFarmDetails && selectedFarm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedFarm.name}</h2>
                <button 
                  onClick={() => setShowFarmDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Farm Images and Info */}
                <div>
                  <div className="aspect-video bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl flex items-center justify-center text-8xl mb-6">
                    {selectedFarm.image}
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {selectedFarm.images.map((img, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {img}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">About This Farm</h4>
                      <p className="text-gray-600">{selectedFarm.longDescription}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Farming Methods</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFarm.farmingMethods.map((method, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedFarm.achievements.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Achievements</h4>
                        <div className="space-y-2">
                          {selectedFarm.achievements.map((achievement, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Award className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm text-gray-700">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Farm Details */}
                <div>
                  <div className="space-y-6">
                    {/* Rating and Contact */}
                    <div>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1">
                          {[1,2,3,4,5].map(i => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i <= Math.floor(selectedFarm.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-900">{selectedFarm.rating}</span>
                        <span className="text-gray-500">({selectedFarm.reviews} reviews)</span>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-emerald-700">{selectedFarm.owner.avatar}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{selectedFarm.owner.name}</div>
                            <div className="text-sm text-gray-600">Farm Owner</div>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => window.open(`tel:${selectedFarm.owner.phone}`, '_self')}
                            className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </button>
                          <button
                            onClick={() => window.open(`mailto:${selectedFarm.owner.email}`, '_self')}
                            className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Email
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Farm Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-emerald-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-emerald-900">{selectedFarm.farmSize}</div>
                        <div className="text-sm text-emerald-700">Farm Size</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-900">{selectedFarm.activeProducts}</div>
                        <div className="text-sm text-blue-700">Products</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-900">{selectedFarm.established}</div>
                        <div className="text-sm text-purple-700">Established</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-orange-900">{selectedFarm.totalCustomers}</div>
                        <div className="text-sm text-orange-700">Customers</div>
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Services Offered</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(selectedFarm.services).map(([service, available]) => (
                          <div key={service} className={`flex items-center justify-between p-3 rounded-lg ${
                            available ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-500'
                          }`}>
                            <span className="text-sm font-medium capitalize">
                              {service.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            {available ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Visit Information */}
                    {selectedFarm.visitInfo.allowed && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Farm Visits</h4>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Duration:</span>
                              <span className="font-medium text-gray-900">{selectedFarm.visitInfo.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Cost:</span>
                              <span className="font-medium text-gray-900">{selectedFarm.visitInfo.cost}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Max Group:</span>
                              <span className="font-medium text-gray-900">{selectedFarm.visitInfo.groupSizeMax} people</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-blue-200">
                            <p className="text-sm text-gray-700 mb-2">Includes:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {selectedFarm.visitInfo.includes.map((item, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <button
                            onClick={() => bookVisit(selectedFarm)}
                            className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                          >
                            Book Farm Visit
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <button
                        onClick={() => getDirections(selectedFarm)}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                      >
                        <Navigation className="w-5 h-5 mr-2" />
                        Get Directions
                      </button>
                      <button
                        onClick={() => toggleFavorite(selectedFarm.id)}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                      >
                        <Heart className={`w-5 h-5 mr-2 ${favorites.includes(selectedFarm.id) ? 'text-red-500 fill-current' : ''}`} />
                        {favorites.includes(selectedFarm.id) ? 'Remove Favorite' : 'Add Favorite'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindFarmsPage;