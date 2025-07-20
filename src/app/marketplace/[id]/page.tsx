'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  MapPin,
  Shield,
  Leaf,
  Users,
  Share2,
  Camera,
  MessageCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
  Package,
  Calendar,
  Award,
  Info,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Filter,
  SortDesc
} from 'lucide-react';

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Sample product data - in real app, fetch based on params.id
  const product = {
    id: 1,
    name: 'Premium Organic Tomatoes',
    farmer: {
      name: 'Ravi Mahathaya',
      avatar: 'RM',
      verified: true,
      sustainabilityScore: 95,
      totalProducts: 24,
      yearsExperience: 8,
      location: 'Kurunegala'
    },
    location: 'Kurunegala',
    price: 300,
    unit: 'kg',
    rating: 4.8,
    reviews: 127,
    totalSold: 2500,
    images: ['🍅', '🍅', '🍅', '🍅'],
    isOrganic: true,
    inStock: true,
    stockLevel: 45,
    harvestDate: '2024-06-25',
    description: 'Fresh organic tomatoes grown without pesticides using traditional farming methods. These vine-ripened tomatoes are perfect for cooking, salads, and making fresh sauces. Grown in nutrient-rich soil with natural compost and organic fertilizers.',
    longDescription: 'Our premium organic tomatoes are cultivated using sustainable farming practices that have been passed down through generations. Each tomato is carefully tended from seed to harvest, ensuring the highest quality and nutritional value. The rich, volcanic soil of Kurunegala provides the perfect growing conditions, while our commitment to organic methods means no harmful chemicals ever touch your food.',
    tags: ['Organic', 'Fresh', 'Local', 'Pesticide-free'],
    carbonFootprint: 'Low',
    nutritionScore: 'A+',
    category: 'vegetables',
    specifications: {
      'Variety': 'Roma Tomatoes',
      'Growing Method': 'Organic',
      'Harvest Season': 'Year-round',
      'Storage': 'Room temperature',
      'Shelf Life': '7-10 days',
      'Certification': 'Organic Certified'
    },
    nutritionFacts: {
      'Calories': '18 per 100g',
      'Vitamin C': '13mg (21% DV)',
      'Potassium': '237mg',
      'Lycopene': 'High',
      'Fiber': '1.2g',
      'Protein': '0.9g'
    }
  };

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      user: 'Samantha P.',
      avatar: 'SP',
      rating: 5,
      date: '2024-06-20',
      comment: 'Absolutely fresh and delicious! The tomatoes were perfect for my salad. Will definitely order again.',
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      user: 'Kamal S.',
      avatar: 'KS',
      rating: 5,
      date: '2024-06-18',
      comment: 'Best organic tomatoes I\'ve found. Great taste and quality. Delivery was quick too.',
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      user: 'Nisha R.',
      avatar: 'NR',
      rating: 4,
      date: '2024-06-15',
      comment: 'Good quality tomatoes. They were fresh and lasted well. Only minor complaint is the packaging could be better.',
      helpful: 5,
      verified: true
    }
  ];

  // Related products
  const relatedProducts = [
    {
      id: 2,
      name: 'Sweet Rainbow Carrots',
      farmer: 'Saman Silva',
      price: 250,
      rating: 4.6,
      image: '🥕',
      isOrganic: true
    },
    {
      id: 3,
      name: 'Crispy Green Cabbage',
      farmer: 'Kamala Jayawardena',
      price: 180,
      rating: 4.7,
      image: '🥬',
      isOrganic: false
    },
    {
      id: 4,
      name: 'Premium Green Beans',
      farmer: 'Nimal Gunasekara',
      price: 400,
      rating: 4.9,
      image: '🫘',
      isOrganic: true
    }
  ];

  const handleAddToCart = () => {
    console.log(`Added ${quantity} kg of ${product.name} to cart`);
    // Add to cart logic here
  };

  const handleContactFarmer = () => {
    console.log(`Contacting farmer: ${product.farmer.name}`);
    // Contact farmer logic here
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} from ${product.farmer.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const tabs = [
    { id: 'description', label: 'Description', icon: Info },
    { id: 'specifications', label: 'Specifications', icon: Package },
    { id: 'nutrition', label: 'Nutrition', icon: Award },
    { id: 'reviews', label: 'Reviews', icon: MessageCircle, badge: reviews.length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Marketplace</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-200">
              <span className="text-9xl">{product.images[selectedImage]}</span>
            </div>
            
            {/* Image Thumbnails */}
            <div className="flex space-x-4 justify-center">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center transition-all ${
                    selectedImage === index 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 bg-gray-50 hover:border-emerald-300'
                  }`}
                >
                  <span className="text-2xl">{image}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-4">
                    {product.isOrganic && (
                      <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-semibold flex items-center">
                        <Leaf className="w-4 h-4 mr-1" />
                        Organic
                      </span>
                    )}
                    <span className={`text-sm px-3 py-1 rounded-full font-semibold ${
                      product.stockLevel > 20 ? 'bg-green-100 text-green-800' :
                      product.stockLevel > 5 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {product.stockLevel} {product.unit} in stock
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-600">Rs. {product.price}</div>
                  <div className="text-sm text-gray-500">per {product.unit}</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i <= Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{product.totalSold} sold</span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
            </div>

            {/* Farmer Info */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">About the Farmer</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center relative">
                  <span className="text-sm font-bold text-emerald-700">{product.farmer.avatar}</span>
                  {product.farmer.verified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{product.farmer.name}</div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.farmer.location}
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div>{product.farmer.yearsExperience} years experience</div>
                  <div>{product.farmer.totalProducts} products</div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleContactFarmer}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </button>
                <button
                  onClick={handleContactFarmer}
                  className="flex-1 border border-emerald-600 text-emerald-600 py-2 px-4 rounded-xl font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </button>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-semibold text-gray-900">Quantity:</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockLevel, quantity + 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                  <span className="text-gray-500">{product.unit}</span>
                </div>
              </div>

              <div className="text-right text-lg font-bold text-gray-900">
                Total: Rs. {(product.price * quantity).toLocaleString()}
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 px-6 rounded-xl text-lg font-bold transition-all flex items-center justify-center space-x-3 ${
                  product.inStock
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="font-semibold text-blue-800 mb-1">Harvested</div>
                <div className="text-blue-700">{new Date(product.harvestDate).toLocaleDateString()}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="font-semibold text-green-800 mb-1">Carbon Footprint</div>
                <div className="text-green-700">{product.carbonFootprint}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl">
            {activeTab === 'description' && (
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{product.longDescription}</p>
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.tags.map((tag, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-gray-700">{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-900">{key}:</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.nutritionFacts).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-900">{key}:</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <SortDesc className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.slice(0, showAllReviews ? reviews.length : 3).map((review) => (
                    <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-gray-700">{review.avatar}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{review.user}</div>
                            <div className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</div>
                          </div>
                          {review.verified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {[1,2,3,4,5].map(i => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{review.comment}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-emerald-600">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-red-600">
                          <ThumbsDown className="w-4 h-4" />
                          <span>Not helpful</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {reviews.length > 3 && (
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="w-full py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    {showAllReviews ? 'Show Less Reviews' : `Show All ${reviews.length} Reviews`}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/marketplace/${relatedProduct.id}`}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <span className="text-6xl">{relatedProduct.image}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{relatedProduct.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">by {relatedProduct.farmer}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-600">Rs. {relatedProduct.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;