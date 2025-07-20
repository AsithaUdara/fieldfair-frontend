'use client';

import React, { useState, useEffect } from 'react';
import {
  Star, Users, MapPin, Shield, TrendingUp, Play, ArrowRight, Check,
  ChevronLeft, ChevronRight, Sparkles, Zap, Globe, Award, Leaf, Brain,
  Package, DollarSign, ChevronUp
} from 'lucide-react';
import Navbar from '@/components/ui/layout/navbar';
import Footer from '@/components/ui/layout/footer';
import { usePopup } from '@/hooks/use-popup';

const FieldFairLanding = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [highlightedCard, setHighlightedCard] = useState<'farmer' | 'consumer' | null>(null);
  
  const { openPopup } = usePopup();

  const testimonials = [
    {
      name: "Pradeep Silva",
      role: "Organic Farmer, Kandy",
      content:
        "FieldFair transformed my farming business completely. Direct access to customers increased my revenue by 150% within 6 months.",
      rating: 5,
      avatar: "PS",
    },
    {
      name: "Shamali Fernando",
      role: "Consumer, Colombo",
      content:
        "The transparency is incredible. I can see exactly where my vegetables come from, meet the farmers, and taste the difference in quality.",
      rating: 5,
      avatar: "SF",
    },
    {
      name: "Kamal Perera",
      role: "Vegetable Farmer, Matale",
      content:
        "No more exploitation by middlemen. FieldFair's AI insights helped me optimize my crops and connect directly with premium buyers.",
      rating: 5,
      avatar: "KP",
    },
  ];

  const heroSlides = [
    {
      title: "Connecting",
      titleHighlight: " Farmers ",
      titleContinue: "& Consumers",
      titleHighlight2: " Directly",
      description:
        "Experience transparent, fair-priced agriculture with cutting-edge technology. From fresh farm produce to AI-powered insights that revolutionize how Sri Lanka eats and farms.",
      primaryButton: "Start Shopping",
      primaryAction: () => {
        console.log('Hero Start Shopping clicked - setting customer context');
        openPopup('signin', 'customer');
      },
      secondaryButton: "",
      secondaryAction: null,
      showCard: true,
      image: "/hero-slide-1.jpg",
    },
    {
      title: "Supporting",
      titleHighlight: " Farmers ",
      titleContinue: "With Technology &",
      titleHighlight2: " Fair Prices",
      description:
        "Join thousands of farmers who've transformed their lives through direct sales, AI-powered agricultural insights, and transparent pricing that puts farmers first.",
      primaryButton: "Join as Farmer",
      primaryAction: () => openPopup('signin', 'farmer'),
      secondaryButton: "Join as Customer",
      secondaryAction: () => openPopup('signin', 'customer'),
      showCard: false,
      image: "/hero-slide-2.jpg",
    },
    {
      title: "Smart",
      titleHighlight: " Technology ",
      titleContinue: "Meets Traditional",
      titleHighlight2: " Farming",
      description:
        "Harness artificial intelligence for crop forecasting, market insights, and supply chain optimization. Experience the future of sustainable farming today.",
      primaryButton: "Explore AI Features",
      primaryAction: () => openPopup('signin', 'customer'),
      secondaryButton: "",
      secondaryAction: null,
      showCard: false,
      image: "/hero-slide-3.jpg",
    },
  ];

  useEffect(() => {
    if (!isTestimonialHovered) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [testimonials.length, isTestimonialHovered]);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 12000);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle card highlighting from navbar
  const handleCardHighlight = (cardType: 'farmer' | 'consumer' | null) => {
    setHighlightedCard(cardType);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-inter">
      <Navbar onCardHighlight={handleCardHighlight} />

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden h-screen">
        {/* Background Slides Container */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full overflow-hidden">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-all duration-[2000ms] ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
                style={{
                  backgroundImage: `url('${slide.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent" />
        </div>

        {/* Content, padded by navbar height */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center pt-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
            {/* Left */}
            <div className="space-y-8 text-white">
              <div className="space-y-4 animate-slide-in-left">
                <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight">
                  {currentSlideData.title}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 animate-gradient">
                    {currentSlideData.titleHighlight}
                  </span>
                </h1>
                <h2 className="text-3xl lg:text-5xl font-bold leading-tight text-gray-100">
                  {currentSlideData.titleContinue}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 animate-gradient">
                    {currentSlideData.titleHighlight2}
                  </span>
                </h2>
              </div>
              <p className="text-lg lg:text-xl text-gray-200 max-w-2xl leading-relaxed animate-fade-in-up">
                {currentSlideData.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-in-left">
                <button 
                  onClick={currentSlideData.primaryAction}
                  className="group relative bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>{currentSlideData.primaryButton}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </button>
                
                {/* Only render secondary button if it exists and is not empty */}
                {currentSlideData.secondaryButton && currentSlideData.secondaryAction && (
                  <button 
                    onClick={currentSlideData.secondaryAction}
                    className="group relative bg-white text-gray-900 px-8 py-4 rounded-xl font-bold shadow-xl shadow-gray-200/25 hover:shadow-gray-300/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>{currentSlideData.secondaryButton}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gray-900/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </button>
                )}
              </div>
            </div>

            {/* Right */}
            <div className="relative flex justify-center lg:justify-end animate-slide-in-right">
              <div 
                className={`${
                  currentSlideData.showCard ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {currentSlideData.showCard && (
                  <div className="relative group max-w-sm">
                    <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-all duration-700 animate-pulse-glow" />
                   <div className="relative bg-white rounded-2xl p-6 shadow-2xl border border-white/20 transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-700 animate-float-card">
                      {/* Card header */}
                      <div className="flex items-start space-x-3 mb-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                          <span className="text-3xl animate-bounce-gentle">🥕</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-lg text-gray-900 mb-1">Fresh Carrots</h3>
                          <p className="text-gray-600 text-sm font-medium">From Nuwara Eliya Farms</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs text-green-600 font-semibold">Available Now</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-black text-emerald-600 animate-price-highlight">Rs. 180</div>
                          <div className="text-gray-500 text-xs font-medium">per kg</div>
                        </div>
                      </div>
                      {/* Details */}
                      <div className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl p-4 mb-5 group-hover:from-gray-100 group-hover:to-emerald-100 transition-all duration-300">
                        <div className="flex items-center space-x-2 text-gray-700 mb-3">
                          <MapPin className="w-4 h-4 text-emerald-600 animate-pulse" />
                          <span className="text-sm font-medium">2.5 km away</span>
                          <span className="text-gray-400 text-xs">•</span>
                          <div className="flex items-center space-x-1">
                            <Leaf className="w-3 h-3 text-green-600 animate-pulse" />
                            <span className="text-green-600 font-semibold text-xs">Organic Certified</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700 mb-3">
                          <Shield className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">Farm Fresh</span>
                          <span className="text-gray-400 text-xs">•</span>
                          <span className="text-blue-600 font-semibold text-xs">Harvested Today</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            {[1,2,3,4,5].map(i => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-twinkle"
                                style={{ animationDelay: `${i * 100}ms` }}
                              />
                            ))}
                          </div>
                          <span className="text-gray-600 text-sm font-medium">(127 reviews)</span>
                        </div>
                      </div>
                      {/* Action */}
                      <button 
                        onClick={() => {
                          console.log('Card Add to Cart clicked - setting customer context');
                          openPopup('signin', 'customer');
                        }}
                        className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group/btn"
                      >
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          <span>Add to Cart</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500" />
                      </button>
                      {/* Badges */}
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white p-2 rounded-xl shadow-lg animate-bounce-gentle">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div className="absolute -bottom-3 -left-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-xl shadow-lg animate-pulse-gentle">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div className="absolute top-1/2 -left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-2 rounded-xl shadow-lg animate-bounce-gentle transform -translate-y-1/2">
                        <Leaf className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Slide indicators - Bottom center */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-4 h-4 transition-all duration-500 rounded-full ${
                    idx === currentSlide
                      ? 'bg-emerald-400 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Slide controls - At screen edges */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 group p-3 hover:bg-white/15 hover:backdrop-blur-lg transition-all duration-300 z-10 rounded-full"
        >
          <ChevronLeft className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 group p-3 hover:bg-white/15 hover:backdrop-blur-lg transition-all duration-300 z-10 rounded-full"
        >
          <ChevronRight className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.03),transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600">
                FieldFair?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing agriculture with cutting-edge technology, complete transparency, and unwavering trust.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "Direct from Farm",
                description:
                  "Skip the middlemen completely. Get fresh, premium produce directly from verified local farmers with full transparency.",
                gradient: "from-emerald-500 to-green-500",
                bgGradient: "from-emerald-50 to-green-50",
                borderGradient: "from-emerald-200 to-green-200",
              },
              {
                icon: Brain,
                title: "AI-Powered Insights",
                description:
                  "Advanced crop forecasting and comprehensive market insights powered by state-of-the-art artificial intelligence.",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50",
                borderGradient: "from-blue-200 to-cyan-200",
              },
              {
                icon: Package,
                title: "QR Traceability",
                description:
                  "Complete supply chain transparency. Scan QR codes to trace your food's complete journey from farm to table.",
                gradient: "from-purple-500 to-indigo-500",
                bgGradient: "from-purple-50 to-indigo-50",
                borderGradient: "from-purple-200 to-indigo-200",
              },
              {
                icon: DollarSign,
                title: "Fair Pricing",
                description:
                  "Transparent, competitive pricing that creates win-win scenarios for both farmers and consumers.",
                gradient: "from-orange-500 to-red-500",
                bgGradient: "from-orange-50 to-red-50",
                borderGradient: "from-orange-200 to-red-200",
              },
              {
                icon: MapPin,
                title: "Interactive Maps",
                description:
                  "Discover farms in your area with interactive mapping. Plan visits and connect with local producers.",
                gradient: "from-teal-500 to-emerald-500",
                bgGradient: "from-teal-50 to-emerald-50",
                borderGradient: "from-teal-200 to-emerald-200",
              },
              {
                icon: Award,
                title: "Secure & Trusted",
                description:
                  "Rigorously verified farmers, enterprise-grade secure payments, and comprehensive quality assurance.",
                gradient: "from-pink-500 to-rose-500",
                bgGradient: "from-pink-50 to-rose-50",
                borderGradient: "from-pink-200 to-rose-200",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 -z-10`}
                  />
                  <div className="relative">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section (Testimonials) */}
      <section id="about" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.03),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              What Our Community
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600">
                Says About Us
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Real success stories from farmers and consumers across Sri Lanka
            </p>
          </div>
          <div className="max-w-6xl mx-auto overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              onMouseEnter={() => setIsTestimonialHovered(true)}
              onMouseLeave={() => setIsTestimonialHovered(false)}
            >
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-8">
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-lg mx-auto">
                    <div className="flex justify-center space-x-1 mb-6">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-lg mb-6 italic font-medium leading-relaxed text-center text-gray-700">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {testimonial.avatar}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg text-gray-900">{testimonial.name}</div>
                        <div className="text-emerald-600 font-medium text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentTestimonial
                      ? 'bg-emerald-500 scale-125 shadow-md shadow-emerald-500/50'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Join the FieldFair Revolution?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Whether you're a farmer looking to reach more customers or a consumer wanting fresh, traceable produce, FieldFair is your platform.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
{/* Farmer Card */}
<div className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border transition-all duration-500 ${
  highlightedCard === 'farmer' 
    ? 'border-emerald-400 shadow-xl shadow-emerald-500/25 scale-105' 
    : 'border-white/20'
}`}>
  {highlightedCard === 'farmer' && (
    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl opacity-20 animate-pulse"></div>
  )}
  <div className="relative">
    <h3 className="text-2xl font-bold mb-4">For Farmers</h3>
    <ul className="space-y-3 text-left mb-6">
      {['Sell directly to consumers', 'AI-powered crop insights', 'Better profit margins'].map((item,i) => (
        <li key={i} className="flex items-center space-x-2">
          <Check className="w-5 h-5 text-green-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <button 
      onClick={() => openPopup('signin', 'farmer')}
      className="group relative w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 rounded-lg font-bold shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
    >
      <span className="relative z-10 flex items-center justify-center space-x-2">
        <span>Join as Farmer</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>
  </div>
</div>

{/* Consumer Card */}
<div className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 border transition-all duration-500 ${
  highlightedCard === 'consumer' 
    ? 'border-emerald-400 shadow-xl shadow-emerald-500/25 scale-105' 
    : 'border-white/20'
}`}>
  {highlightedCard === 'consumer' && (
    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl opacity-20 animate-pulse"></div>
  )}
  <div className="relative">
    <h3 className="text-2xl font-bold mb-4">For Consumers</h3>
    <ul className="space-y-3 text-left mb-6">
      {['Fresh, local produce', 'Full traceability', 'Fair prices'].map((item,i) => (
        <li key={i} className="flex items-center space-x-2">
          <Check className="w-5 h-5 text-green-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <button 
      onClick={() => {
        console.log('CTA Start Shopping clicked - setting customer context');
        openPopup('signin', 'customer');
      }}
      className="group relative w-full bg-white text-gray-900 py-3 rounded-lg font-bold shadow-xl shadow-gray-200/25 hover:shadow-gray-300/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
    >
      <span className="relative z-10 flex items-center justify-center space-x-2">
        <span>Start Shopping</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gray-900/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group bg-gradient-to-r from-emerald-500 to-green-500 text-white p-3 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
        >
          <ChevronUp className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </button>
      )}

      <Footer />

      <style jsx>{`
        @keyframes float {
          0%,100% {transform:translateY(0px) rotate(0deg);opacity:0.6;}
          33% {transform:translateY(-15px) rotate(5deg);opacity:1;}
          66% {transform:translateY(5px) rotate(-5deg);opacity:0.8;}
        }
        @keyframes float-card {
          0%,100% {transform:translateY(0px);}
          50% {transform:translateY(-10px);}
        }
        @keyframes bounce-gentle {
          0%,100% {transform:translateY(0px);}
          50% {transform:translateY(-5px);}
        }
        @keyframes pulse-gentle {
          0%,100% {opacity:1;transform:scale(1);}
          50% {opacity:0.8;transform:scale(1.05);}
        }
        @keyframes pulse-glow {
          0%,100% {opacity:0.7;}
          50% {opacity:1;}
        }
        @keyframes gradient {
          0%,100% {background-position:0% 50%;}
          50% {background-position:100% 50%;}
        }
        @keyframes fade-in-up {
          from {opacity:0;transform:translateY(30px);}
          to {opacity:1;transform:translateY(0);}
        }
        @keyframes slide-in-left {
          from {opacity:0;transform:translateX(-50px);}
          to {opacity:1;transform:translateX(0);}
        }
        @keyframes slide-in-right {
          from {opacity:0;transform:translateX(50px);}
          to {opacity:1;transform:translateX(0);}
        }
        @keyframes twinkle {
          0%,100% {opacity:1;transform:scale(1);}
          50% {opacity:0.7;transform:scale(0.9);}
        }
        @keyframes price-highlight {
          0%,100% {color:rgb(5,150,105);}
          50% {color:rgb(16,185,129);}
        }
        @keyframes expand {
          0% {width:12px;}
          100% {width:32px;}
        }
        .animate-float {animation:float linear infinite;}
        .animate-float-card {animation:float-card 6s ease-in-out infinite;}
        .animate-bounce-gentle {animation:bounce-gentle 3s ease-in-out infinite;}
        .animate-pulse-gentle {animation:pulse-gentle 2s ease-in-out infinite;}
        .animate-pulse-glow {animation:pulse-glow 3s ease-in-out infinite;}
        .animate-gradient {background-size:200% 200%;animation:gradient 3s ease infinite;}
        .animate-fade-in-up {animation:fade-in-up 0.8s ease-out forwards;}
        .animate-slide-in-left {animation:slide-in-left 0.8s ease-out forwards;}
        .animate-slide-in-right {animation:slide-in-right 0.8s ease-out forwards;}
        .animate-twinkle {animation:twinkle 2s ease-in-out infinite;}
        .animate-price-highlight {animation:price-highlight 2s ease-in-out infinite;}
      `}</style>
    </div>
  );
};

export default FieldFairLanding;