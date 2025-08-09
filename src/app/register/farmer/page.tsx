// src/app/register/farmer/page.tsx

'use client';

import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, Phone, Building, MapPin, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';

const FarmerRegistrationPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '',
    farmName: '', location: '',
  });



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match!");
    return;
  }

  try {
    // Use the environment variable here as well
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register/farmer`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        farmName: formData.farmName,
        location: formData.location,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }
    
    console.log('Registration successful:', data);
    toast.success('Farmer registration successful!');
    router.push('/farmer/dashboard');

  } catch (error: any) {
    console.error('Registration failed:', error);
    toast.error(`Registration failed: ${error.message}`);
  }
};

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const steps = [
    { number: 1, title: 'Personal Details', description: 'Your basic information' },
    { number: 2, title: 'Your Farm', description: 'Tell us about your farm' },
  ];

  const canProceedToNextStep = () => {
    return formData.fullName && formData.email && formData.phone && formData.password && (formData.password === formData.confirmPassword);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <Link href="/" className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 mb-8 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="text-center mb-8">
            {/* THIS IS THE NEW, CONSISTENT ICON HEADER */}
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
                <span className="text-4xl">🌾</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Join as a Farmer
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Connect directly with customers and grow your business.
            </p>
          </div>

          <div className="mb-10">
              <div className="flex items-center justify-center max-w-sm mx-auto">
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                      currentStep >= step.number ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' : 'bg-white/80 border-gray-300 text-gray-500'
                    }`}>
                      {currentStep > step.number ? <CheckCircle className="w-7 h-7" /> : <span className="font-bold text-lg">{step.number}</span>}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-24 h-1.5 mx-3 rounded-full transition-all duration-500 ${currentStep > step.number ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-gray-200'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="text-center mt-6">
                <h3 className="font-bold text-lg text-gray-900">{steps[currentStep - 1].title}</h3>
                <p className="text-gray-600 mt-1">{steps[currentStep - 1].description}</p>
              </div>
          </div>

          <div className="relative bg-white/90 backdrop-blur-xl py-12 px-10 shadow-2xl rounded-3xl border border-white/30">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Step 1 fields remain the same */}
                  <div className="grid md:grid-cols-2 gap-6"><div><label className="block text-sm font-bold text-gray-800 mb-2">Full Name</label><div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500" placeholder="Your Name" required/></div></div><div><label className="block text-sm font-bold text-gray-800 mb-2">Email Address</label><div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500" placeholder="your.email@example.com" required/></div></div></div><div><label className="block text-sm font-bold text-gray-800 mb-2">Phone Number</label><div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500" placeholder="07X XXX XXXX" required/></div></div><div className="grid md:grid-cols-2 gap-6"><div><label className="block text-sm font-bold text-gray-800 mb-2">Password</label><div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500" placeholder="Minimum 8 characters" required/><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"><EyeOff className="w-5 h-5" /></button></div></div><div><label className="block text-sm font-bold text-gray-800 mb-2">Confirm Password</label><div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500" placeholder="Re-type your password" required/><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"><EyeOff className="w-5 h-5" /></button></div></div></div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {/* Step 2 fields remain the same */}
                  <div><label className="block text-sm font-bold text-gray-800 mb-2">Farm Name</label><div className="relative"><Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" value={formData.farmName} onChange={(e) => setFormData({ ...formData, farmName: e.target.value })} className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500" placeholder="e.g., Green Valley Organics" required/></div></div><div><label className="block text-sm font-bold text-gray-800 mb-2">Farm Location</label><div className="relative"><MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500" placeholder="e.g., Kandy, Sri Lanka" required/></div></div>
                </div>
              )}
              <div className="flex items-center justify-between pt-8">
                  {currentStep > 1 ? (<button type="button" onClick={prevStep} className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-semibold">Previous</button>) : ( <div></div> )}
                  {currentStep < 2 ? (<button type="button" onClick={nextStep} disabled={!canProceedToNextStep()} className="group bg-gradient-to-r from-emerald-600 to-green-600 text-white px-10 py-3 rounded-xl font-bold shadow-lg transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed">Continue</button>) : (<button type="submit" className="group bg-gradient-to-r from-emerald-600 to-green-600 text-white px-10 py-3 rounded-xl font-bold shadow-lg transition-all transform hover:scale-105"><span className="flex items-center justify-center space-x-2"><span>Create Account</span><CheckCircle className="w-5 h-5" /></span></button>)}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerRegistrationPage;