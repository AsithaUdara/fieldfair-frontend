// src/app/register/customer/page.tsx

'use client';

import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, Phone, Home, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';

const CustomerRegistrationPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  });




const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match!");
    return;
  }

  try {
    // Use the environment variable to build the full API URL
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register/customer`;
    
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
        address: formData.address,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }

    console.log('Registration successful:', data);
    toast.success('Registration successful!');
    router.push('/marketplace');

  } catch (error: any) {
    console.error('Registration failed:', error);
    toast.error(`Registration failed: ${error.message}`);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl">
          <Link href="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors duration-200 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="text-center mb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
              <span className="text-4xl">🛒</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create an Account
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Buy fresh, local produce directly from farmers across Sri Lanka.
            </p>
          </div>
          
          <div className="relative bg-white/90 backdrop-blur-xl py-12 px-10 shadow-2xl rounded-3xl border border-white/30">
            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              {/* Form fields remain the same as the previous version */}
              <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-2">Full Name</label>
                      <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Your Name" required/></div>
                  </div>
                  <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-2">Email Address</label>
                      <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="your.email@example.com" required/></div>
                  </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-2">Phone Number</label>
                      <div className="relative"><Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="07X XXX XXXX" required/></div>
                  </div>
                  <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-2">Primary Address</label>
                      <div className="relative"><Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Your main delivery address" required/></div>
                  </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-2">Password</label>
                      <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Minimum 8 characters" required/>
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                      </div>
                  </div>
                  <div className="group">
                      <label className="block text-sm font-bold text-gray-800 mb-2">Confirm Password</label>
                      <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Re-type your password" required/>
                          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                      </div>
                  </div>
              </div>
              <div className="pt-4">
                <button type="submit" className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold shadow-xl hover:shadow-lg transition-all transform hover:scale-105">
                  <span className="flex items-center justify-center space-x-2"><span>Create My Account</span><CheckCircle className="w-5 h-5" /></span>
                </button>
              </div>
            </form>

            <div className="mt-8 text-center relative z-10">
              <p className="text-gray-600">Already have an account?{' '}<Link href="/" className="text-blue-600 hover:text-blue-700 font-bold transition-colors duration-200 hover:underline">Sign in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegistrationPage;