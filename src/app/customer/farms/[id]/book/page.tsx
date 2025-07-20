"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import FieldFairSidebar from '@/components/ui/layout/sidebar';
import { 
  LayoutGrid, 
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  Star,
  Leaf,
  Award,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Camera,
  Utensils,
  Bed,
  Car,
  Wifi,
  Coffee,
  TreePine,
  Sun,
  Moon,
  User,
  Plus,
  Minus,
  CreditCard,
  Shield
} from 'lucide-react';

const FarmVisitBookingPage = () => {
  const params = useParams();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Booking form state
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Contact form state
  const [contactInfo, setContactInfo] = useState({
    name: 'Nimal Perera',
    email: 'nimal.perera@email.com',
    phone: '+94 77 123 4567',
    emergencyContact: '+94 77 987 6543'
  });

  // Mock farm data
  const [farmData] = useState({
    id: 1,
    name: "Ravi's Organic Farm",
    owner: 'Ravi Mahathaya',
    location: 'Kurunegala, North Western Province',
    coordinates: { lat: 7.4818, lng: 80.3609 },
    image: 'RM',
    rating: 4.8,
    reviews: 127,
    phone: '+94 77 296 7477',
    email: 'ravi@organicfarm.lk',
    description: 'Experience authentic organic farming with hands-on activities and fresh farm-to-table meals.',
    farmSize: '2.5 acres',
    established: '2018',
    certifications: ['Organic Certified', 'Fair Trade', 'Eco-Tourism Approved'],
    specialties: ['Tomatoes', 'Carrots', 'Lettuce', 'Herbs'],
    languages: ['Sinhala', 'English'],
    visitingHours: {
      weekdays: '6:00 AM - 6:00 PM',
      weekends: '6:00 AM - 8:00 PM'
    },
    availableDates: [
      '2024-06-28', '2024-06-29', '2024-06-30',
      '2024-07-01', '2024-07-02', '2024-07-05', '2024-07-06'
    ],
    timeSlots: [
      { time: '08:00', label: 'Morning Tour (8:00 AM)', available: true },
      { time: '10:00', label: 'Mid-Morning (10:00 AM)', available: true },
      { time: '14:00', label: 'Afternoon Tour (2:00 PM)', available: true },
      { time: '16:00', label: 'Evening Tour (4:00 PM)', available: false },
      { time: '18:00', label: 'Sunset Experience (6:00 PM)', available: true }
    ],
    packages: [
      {
        id: 'basic',
        name: 'Basic Farm Tour',
        duration: '2 hours',
        price: 1500,
        description: 'Guided tour of the farm with product tasting',
        includes: ['Guided farm tour', 'Product tasting', 'Photo opportunities', 'Take-home samples'],
        maxPeople: 10
      },
      {
        id: 'premium',
        name: 'Premium Experience',
        duration: '4 hours',
        price: 3500,
        description: 'Comprehensive farm experience with meal and activities',
        includes: ['Extended farm tour', 'Hands-on farming activities', 'Farm-to-table lunch', 'Cooking demonstration', 'Product package'],
        maxPeople: 8
      },
      {
        id: 'overnight',
        name: 'Farm Stay Experience',
        duration: '24 hours',
        price: 8500,
        description: 'Full farm immersion with overnight accommodation',
        includes: ['Farm tour', 'All meals', 'Overnight accommodation', 'Morning harvesting', 'Yoga session', 'Campfire experience'],
        maxPeople: 4
      }
    ],
    addOns: [
      { id: 'lunch', name: 'Farm-to-Table Lunch', price: 1200, description: 'Organic meal using farm produce' },
      { id: 'cooking', name: 'Cooking Class', price: 800, description: 'Learn to cook with organic ingredients' },
      { id: 'photography', name: 'Professional Photography', price: 2500, description: 'Photo session with farm backdrop' },
      { id: 'transport', name: 'Transport Service', price: 1500, description: 'Pickup and drop-off from Kurunegala town' },
      { id: 'products', name: 'Product Hamper', price: 2000, description: 'Selection of fresh organic produce' }
    ],
    amenities: [
      { icon: Wifi, name: 'Free WiFi' },
      { icon: Car, name: 'Parking Available' },
      { icon: Coffee, name: 'Refreshments' },
      { icon: Camera, name: 'Photo Spots' },
      { icon: TreePine, name: 'Shaded Areas' },
      { icon: Bed, name: 'Rest Areas' }
    ]
  });

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

  const selectedPackageData = farmData.packages.find(p => p.id === selectedPackage);
  const basePrice = selectedPackageData ? selectedPackageData.price * adultCount + (selectedPackageData.price * 0.5 * childCount) : 0;
  const addOnPrice = selectedAddOns.reduce((total, addOnId) => {
    const addOn = farmData.addOns.find(a => a.id === addOnId);
    return total + (addOn ? addOn.price : 0);
  }, 0);
  const totalPrice = basePrice + addOnPrice;

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleBooking = () => {
    const bookingData = {
      farmId: farmData.id,
      date: selectedDate,
      time: selectedTime,
      package: selectedPackage,
      adults: adultCount,
      children: childCount,
      addOns: selectedAddOns,
      totalPrice,
      contactInfo,
      specialRequests
    };
    
    console.log('Booking submitted:', bookingData);
    
    // In real app, submit to backend and redirect to confirmation
    alert('Booking request submitted successfully! You will receive a confirmation email shortly.');
    router.push('/customer/orders');
  };

  const isBookingValid = selectedDate && selectedTime && selectedPackageData && (adultCount > 0 || childCount > 0);

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
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <LayoutGrid className="w-6 h-6" />
            </button>
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Book Farm Visit</h1>
              <p className="text-sm text-gray-600 mt-1">Schedule your visit to {farmData.name}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Farm Overview */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-emerald-700">{farmData.image}</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900">{farmData.name}</h2>
                      <p className="text-gray-600">{farmData.owner}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{farmData.rating}</span>
                          <span className="text-gray-500">({farmData.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{farmData.location}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{farmData.description}</p>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {farmData.certifications.map((cert, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          <Award className="w-3 h-3 mr-1" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Date & Time Selection */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Choose Date</label>
                      <div className="grid grid-cols-3 gap-2">
                        {farmData.availableDates.map((date) => (
                          <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={`p-3 text-sm rounded-lg border transition-colors ${
                              selectedDate === date
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            <div className="font-medium">
                              {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                            <div className="text-xs">
                              {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Choose Time</label>
                      <div className="space-y-2">
                        {farmData.timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => setSelectedTime(slot.time)}
                            disabled={!slot.available}
                            className={`w-full p-3 text-sm rounded-lg border transition-colors text-left ${
                              selectedTime === slot.time
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                : slot.available
                                ? 'border-gray-200 hover:border-gray-300 text-gray-700'
                                : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <div className="font-medium">{slot.label}</div>
                            {!slot.available && (
                              <div className="text-xs text-red-500">Fully booked</div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Selection */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Experience Package</h3>
                  
                  <div className="space-y-4">
                    {farmData.packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedPackage === pkg.id
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                checked={selectedPackage === pkg.id}
                                onChange={() => setSelectedPackage(pkg.id)}
                                className="text-emerald-600 focus:ring-emerald-500"
                              />
                              <div>
                                <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                                <p className="text-sm text-gray-600">{pkg.description}</p>
                                <p className="text-sm text-gray-500 mt-1">Duration: {pkg.duration} • Max {pkg.maxPeople} people</p>
                              </div>
                            </div>
                            
                            <div className="mt-3 ml-6">
                              <p className="text-sm font-medium text-gray-700 mb-2">Includes:</p>
                              <div className="grid grid-cols-2 gap-1">
                                {pkg.includes.map((item, index) => (
                                  <div key={index} className="flex items-center space-x-1 text-sm text-gray-600">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-emerald-600">Rs. {pkg.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">per adult</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Group Size */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Size</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Adults</label>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setAdultCount(Math.max(0, adultCount - 1))}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center font-medium">
                          {adultCount}
                        </span>
                        <button
                          onClick={() => setAdultCount(adultCount + 1)}
                          disabled={selectedPackageData && (adultCount + childCount >= selectedPackageData.maxPeople)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Children (50% off)</label>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setChildCount(Math.max(0, childCount - 1))}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center font-medium">
                          {childCount}
                        </span>
                        <button
                          onClick={() => setChildCount(childCount + 1)}
                          disabled={selectedPackageData && (adultCount + childCount >= selectedPackageData.maxPeople)}
                          className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {selectedPackageData && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-sm text-blue-800">
                        Maximum {selectedPackageData.maxPeople} people allowed for {selectedPackageData.name}
                      </div>
                    </div>
                  )}
                </div>

                {/* Add-ons */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Services (Optional)</h3>
                  
                  <div className="space-y-3">
                    {farmData.addOns.map((addOn) => (
                      <label key={addOn.id} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAddOns.includes(addOn.id)}
                          onChange={() => handleAddOnToggle(addOn.id)}
                          className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{addOn.name}</div>
                              <div className="text-sm text-gray-600">{addOn.description}</div>
                            </div>
                            <div className="font-bold text-emerald-600">Rs. {addOn.price.toLocaleString()}</div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={contactInfo.name}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                      <input
                        type="tel"
                        value={contactInfo.emergencyContact}
                        onChange={(e) => setContactInfo(prev => ({ ...prev, emergencyContact: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests (Optional)</label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="Any dietary restrictions, accessibility needs, or special arrangements..."
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="space-y-6">
                {/* Price Summary */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  
                  {selectedPackageData && (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{selectedPackageData.name}</span>
                        <span className="font-medium">Rs. {selectedPackageData.price.toLocaleString()}</span>
                      </div>
                      
                      {adultCount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Adults × {adultCount}</span>
                          <span>Rs. {(selectedPackageData.price * adultCount).toLocaleString()}</span>
                        </div>
                      )}
                      
                      {childCount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Children × {childCount} (50% off)</span>
                          <span>Rs. {(selectedPackageData.price * 0.5 * childCount).toLocaleString()}</span>
                        </div>
                      )}
                      
                      {selectedAddOns.length > 0 && (
                        <div className="pt-2 border-t border-gray-100">
                          <div className="text-sm font-medium text-gray-700 mb-2">Add-ons:</div>
                          {selectedAddOns.map(addOnId => {
                            const addOn = farmData.addOns.find(a => a.id === addOnId);
                            return addOn ? (
                              <div key={addOn.id} className="flex justify-between text-sm">
                                <span className="text-gray-500">{addOn.name}</span>
                                <span>Rs. {addOn.price.toLocaleString()}</span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}
                      
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-emerald-600">Rs. {totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {selectedDate && selectedTime && (
                        <div className="pt-4 border-t border-gray-100">
                          <div className="text-sm space-y-1">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span>{new Date(selectedDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span>{farmData.timeSlots.find(s => s.time === selectedTime)?.label}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span>{adultCount + childCount} people</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <button
                        onClick={handleBooking}
                        disabled={!isBookingValid}
                        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                          isBookingValid
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <CreditCard className="w-5 h-5" />
                          <span>Book Now</span>
                        </div>
                      </button>
                      
                      <div className="text-xs text-gray-500 text-center">
                        <Shield className="w-4 h-4 inline mr-1" />
                        Secure booking • Free cancellation up to 24 hours before visit
                      </div>
                    </div>
                  )}
                </div>

                {/* Farm Amenities */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Farm Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {farmData.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <amenity.icon className="w-4 h-4 text-emerald-600" />
                        <span>{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Farm */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Farm</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{farmData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{farmData.email}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      <div className="font-medium mb-1">Visiting Hours:</div>
                      <div>Weekdays: {farmData.visitingHours.weekdays}</div>
                      <div>Weekends: {farmData.visitingHours.weekends}</div>
                    </div>
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

export default FarmVisitBookingPage;