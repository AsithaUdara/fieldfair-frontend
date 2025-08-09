'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Eye, EyeOff, User, Users } from 'lucide-react';
import { usePopup } from '@/hooks/use-popup';
import { useRouter } from 'next/navigation';

const SignInPopup: React.FC = () => {
  const { closePopup, signInContext } = usePopup();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Debug: Log the context when component mounts
  useEffect(() => {
    console.log('SignInPopup mounted with context:', signInContext);
  }, [signInContext]);



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // And use the environment variable for the login endpoint
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed. Please try again.');
    }

    console.log('Login successful:', data);
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
    alert('Login successful!');
    closePopup();

    if (data.data.user.role === 'farmer') {
      router.push('/farmer/dashboard');
    } else {
      router.push('/marketplace');
    }

  } catch (error: any) {
    console.error('Login failed:', error);
    alert(`Login failed: ${error.message}`);
  }
};

  const handleGoogleSignIn = () => {
    console.log('Google sign in');
    closePopup();
  };

  const navigateToPage = (path: string) => {
    console.log(`Attempting to navigate to: ${path}`);
    closePopup();
    
    // First close popup, then navigate
    setTimeout(() => {
      try {
        console.log('Using router.push...');
        router.push(path);
      } catch (error) {
        console.error('Router.push failed:', error);
        console.log('Fallback: Using window.location...');
        window.location.href = path;
      }
    }, 100);
  };

  const handleSignUp = () => {
    console.log('handleSignUp called with context:', signInContext);
    
    if (signInContext === 'farmer') {
      console.log('Direct farmer navigation...');
      navigateToPage('/register/farmer');
    } else if (signInContext === 'customer') {
      console.log('Direct customer navigation...');
      navigateToPage('/register/customer');
    } else {
      console.log('Showing user type selection...');
      setShowUserTypeSelection(true);
    }
  };

  const handleUserTypeSelection = (userType: 'farmer' | 'customer') => {
    console.log('User selected type:', userType);
    
    if (userType === 'farmer') {
      navigateToPage('/register/farmer');
    } else {
      navigateToPage('/register/customer');
    }
  };

  const getContextualText = () => {
    if (signInContext === 'farmer') {
      return {
        title: 'Welcome Back, Farmer',
        subtitle: 'Sign in to manage your farm and products'
      };
    } else if (signInContext === 'customer') {
      return {
        title: 'Welcome Back',
        subtitle: 'Sign in to start shopping fresh produce'
      };
    } else {
      return {
        title: 'Welcome Back',
        subtitle: 'Sign in to your account'
      };
    }
  };

  const contextText = getContextualText();

  // Show user type selection when in general context and user clicked sign up
  if (showUserTypeSelection) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Join FieldFair</h2>
            <p className="text-gray-600 mt-1">Choose your account type</p>
          </div>
          <button
            onClick={closePopup}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* User Type Selection */}
        <div className="space-y-4 mb-6">
          {/* Farmer Option */}
          <button
            onClick={() => handleUserTypeSelection('farmer')}
            className="group w-full p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-100 group-hover:bg-emerald-200 rounded-lg flex items-center justify-center transition-colors duration-300">
                <User className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-900">I'm a Farmer</h3>
                <p className="text-gray-600 text-sm">Sell your produce directly to consumers</p>
              </div>
            </div>
          </button>

          {/* Customer Option */}
          <button
            onClick={() => handleUserTypeSelection('customer')}
            className="group w-full p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-left"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors duration-300">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900">I'm a Customer</h3>
                <p className="text-gray-600 text-sm">Buy fresh produce directly from farmers</p>
              </div>
            </div>
          </button>
        </div>

        {/* Back to Sign In */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => setShowUserTypeSelection(false)}
              className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Show normal sign-in form
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto">
      {/* Debug info - Remove this after testing */}
      <div className="mb-4 p-2 bg-red-100 rounded text-xs border">
        <strong>DEBUG:</strong> Context = "<span className="font-bold text-red-600">{signInContext}</span>"
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{contextText.title}</h2>
          <p className="text-gray-600 mt-1">{contextText.subtitle}</p>
        </div>
        <button
          onClick={closePopup}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Forgot password?
          </button>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="group relative w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 rounded-lg font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
        >
          <span className="relative z-10">Sign In</span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>
      </form>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Google Sign In Button */}


{/* Google Sign In Button - Now an Anchor Tag */}
<a
  href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/google?role=${signInContext}`}
  className="group relative w-full flex items-center justify-center space-x-3 border border-gray-300 rounded-lg py-3 px-4 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:border-gray-400 overflow-hidden mb-6"
>
  <span className="relative z-10 flex items-center space-x-3">
    {/* Google Icon SVG */}
    <svg viewBox="0 0 32 32" className="w-5 h-5" aria-hidden="true">
      <g fill="none">
        <path d="m30.7 16.340875c0-1.0635937-.0954375-2.0863125-.2727187-3.06825h-14.1272813v5.8022813h8.0727188c-.3477188 1.8749999-1.4044688 3.4636874-2.9931563 4.527375v3.7635937h4.8477188c2.8364062-2.6113125 4.4727187-6.4568438 4.4727187-11.025z" fill="#4285f4"/>
        <path d="m16.3 31c4.05 0 7.4454375-1.34325 9.9271875-3.6340312l-4.8477187-3.7635938c-1.3430626.9-3.0613126 1.43175-5.0794688 1.43175-3.9068438 0-7.21363125-2.6386875-8.39323125-6.184125h-5.01135v3.8864063c2.46825 4.9022812 7.54094995 8.2635937 13.40458125 8.2635937z" fill="#34a853"/>
        <path d="m7.90675 18.8499062c-.3-.9-.4704-1.8613125-.4704-2.85s.1704-1.95.4704-2.85v-3.88635933h-5.01135c-1.0158 2.02504693-1.5954 4.31592183-1.5954 6.73635933 0 2.4204376.5796 4.7113126 1.5954 6.7363125z" fill="#fbbc04"/>
        <path d="m16.3 6.96595c2.2021875 0 4.1794688.75675 5.7340313 2.2431l4.3023749-4.3023c-2.5977187-2.4204-5.9932499-3.90675-10.0364062-3.90675-5.8636313 0-10.93633125 3.36135-13.40458125 8.26365l5.01135 3.88635c1.1796-3.5454 4.48638745-6.18405 8.39323125-6.18405z" fill="#e94235"/>
      </g>
    </svg>
    <span className="text-gray-700 font-medium">Continue with Google</span>
  </span>
  {/* These divs provide the cool hover animation */}
  <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
</a>

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={handleSignUp}
            className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInPopup;