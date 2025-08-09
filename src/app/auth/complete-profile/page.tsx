// File Location: src/app/auth/complete-profile/page.tsx (Corrected)
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import { toast } from 'react-toastify';
// --- FIX: Correctly import 'Sprout' ---
import { User, Building, MapPin, Phone, Home, Sprout } from 'lucide-react';

const CompleteProfilePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [intendedRole, setIntendedRole] = useState<'farmer' | 'customer' | 'general'>('general');
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'customer' | ''>('');
  
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    farmName: '',
    location: ''
  });

  useEffect(() => {
    const urlToken = searchParams.get('token');
    const urlUser = searchParams.get('user');
    const urlIntendedRole = searchParams.get('intended_role') as any;

    if (urlToken && urlUser) {
      setToken(urlToken);
      setUser(JSON.parse(urlUser));
      if (urlIntendedRole === 'farmer' || urlIntendedRole === 'customer') {
        setSelectedRole(urlIntendedRole);
      }
    } else {
      toast.error("Invalid session. Please sign in again.");
      router.push('/');
    }
  }, [searchParams, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error("Please select a role.");
      return;
    }

    const payload = {
      role: selectedRole,
      phone: formData.phone,
      address: selectedRole === 'customer' ? formData.address : undefined,
      farmName: selectedRole === 'farmer' ? formData.farmName : undefined,
      location: selectedRole === 'farmer' ? formData.location : undefined,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/complete-profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      login(data.data.user, token!);
      toast.success("Profile completed successfully!");
      router.push(selectedRole === 'farmer' ? '/farmer/dashboard' : '/marketplace');
      
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  if (!user) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Complete Your Profile</h1>
          <p className="text-lg text-gray-600 mt-2">Welcome, {user.fullName}! Just one more step.</p>
        </div>

        <div className="bg-white py-8 px-10 shadow-lg rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Choose Your Role</label>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setSelectedRole('customer')} className={`p-4 border-2 rounded-lg text-left transition-all ${selectedRole === 'customer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  {/* --- FIX: Use the 'User' icon --- */}
                  <User className="w-6 h-6 mb-2 text-blue-600" /> 
                  <h3 className="font-bold">I'm a Customer</h3>
                  <p className="text-sm text-gray-500">Buy fresh produce.</p>
                </button>
                <button type="button" onClick={() => setSelectedRole('farmer')} className={`p-4 border-2 rounded-lg text-left transition-all ${selectedRole === 'farmer' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <Sprout className="w-6 h-6 mb-2 text-emerald-600" />
                  <h3 className="font-bold">I'm a Farmer</h3>
                  <p className="text-sm text-gray-500">Sell my produce.</p>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700">Phone Number</label>
              <div className="relative mt-1"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="tel" name="phone" onChange={handleInputChange} className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500" required /></div>
            </div>

            {selectedRole === 'customer' && (
              <div>
                <label className="block text-sm font-bold text-gray-700">Delivery Address</label>
                <div className="relative mt-1"><Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" name="address" onChange={handleInputChange} className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500" required /></div>
              </div>
            )}
            {selectedRole === 'farmer' && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700">Farm Name</label>
                  <div className="relative mt-1"><Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" name="farmName" onChange={handleInputChange} className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500" required /></div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700">Farm Location</label>
                  <div className="relative mt-1"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" /><input type="text" name="location" onChange={handleInputChange} className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500" required /></div>
                </div>
              </>
            )}

            <button type="submit" disabled={!selectedRole} className="w-full bg-emerald-600 text-white py-3 rounded-md font-bold hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">Complete Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfilePage;