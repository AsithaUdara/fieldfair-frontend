// src/components/ui/UnifiedLoader.tsx
"use client";

import React from 'react';
import Lottie from 'lottie-react';
import LoadingSpinner from './loading-spinner';
import loaderAnimation from '../../../public/loader-animation2.json';

interface UnifiedLoaderProps {
  loading?: boolean;
  message?: string;
  size?: 'small' | 'medium' | 'large';
  overlay?: boolean;
  className?: string;
  variant?: 'default' | 'minimal' | 'lottie';
  global?: boolean;
}

const UnifiedLoader: React.FC<UnifiedLoaderProps> = ({
  loading = false,
  message = "Loading...",
  size = 'medium',
  overlay = false,
  className = '',
  variant = 'lottie',
  global = false
}) => {
  if (!loading) return null;

  // Global loader (full screen overlay)
  if (global) {
    return (
      <div 
        className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/30 backdrop-blur-sm z-[99999]"
        role="dialog"
        aria-live="polite"
        aria-label="Loading"
      >
        <FieldFairGlobalLoader message={message} />
      </div>
    );
  }

  // Local loader with overlay
  if (overlay) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg z-50">
        <LoadingSpinner size={size} message={message} variant={variant} />
      </div>
    );
  }

  // Simple local loader
  return (
    <div className={`flex justify-center py-4 ${className}`}>
      <LoadingSpinner size={size} message={message} variant={variant} />
    </div>
  );
};

// Global loader with FieldFair branding and Lottie animation
const FieldFairGlobalLoader: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="relative">
      {/* Multiple glow rings */}
      <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-r from-emerald-400/30 to-green-500/30 blur-2xl animate-pulse"></div>
      <div className="absolute inset-2 w-28 h-28 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-400/20 blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Main container */}
      <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg border border-emerald-400/40 shadow-2xl flex items-center justify-center">
        
        {/* Rotating outer ring */}
        <div className="absolute inset-2 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin"></div>
        
        {/* Rotating inner ring */}
        <div className="absolute inset-4 rounded-full border border-green-400/40 border-r-green-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
        
        {/* Center Lottie animation */}
        <div className="relative z-10 w-16 h-16">
          <Lottie 
            animationData={loaderAnimation}
            loop={true}
            autoplay={true}
          />
        </div>
      </div>
      
      {/* FieldFair branding */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-full">
        <div className="text-center">
          <h3 className="text-lg font-bold text-white mb-1">FieldFair</h3>
          <p className="text-sm text-gray-200 font-medium">
            <span className="text-emerald-400">{message}</span>
          </p>
          {/* Loading dots */}
          <div className="flex justify-center mt-2 space-x-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedLoader;