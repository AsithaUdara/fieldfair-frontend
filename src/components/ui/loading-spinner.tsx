// src/components/ui/loading-spinner.tsx
"use client";

import React from 'react';
import Lottie from 'lottie-react';
import loaderAnimation from '../../../public/loader-animation2.json';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
  variant?: 'default' | 'minimal' | 'lottie';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  message,
  variant = 'lottie'
}) => {
  const sizeMap = {
    small: { width: 32, height: 32 },
    medium: { width: 48, height: 48 },
    large: { width: 64, height: 64 }
  };

  const textSizeClass = {
    small: 'text-xs',
    medium: 'text-sm', 
    large: 'text-base'
  };

  const { width, height } = sizeMap[size];

  if (variant === 'minimal') {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full border-2 border-gray-300 border-t-emerald-500" 
             style={{ width, height }} />
        {message && (
          <p className={`mt-3 ${textSizeClass[size]} text-gray-600 font-medium text-center`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'default') {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          {/* Outer glow */}
          <div 
            className="absolute inset-0 rounded-full opacity-30 animate-pulse"
            style={{
              width,
              height,
              background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 60%)',
              filter: 'blur(8px)',
            }}
          />
          
          {/* Main spinner */}
          <div 
            className="relative rounded-full bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm border-2 border-emerald-400/30 shadow-lg flex items-center justify-center"
            style={{ width, height }}
          >
            {/* Rotating border */}
            <div 
              className="absolute inset-1 rounded-full border-2 border-emerald-500/50 border-t-emerald-500 animate-spin"
              style={{ borderTopColor: '#10b981' }}
            />
            
            {/* Center Lottie animation */}
            <div className="z-10" style={{ width: width * 0.6, height: height * 0.6 }}>
              <Lottie 
                animationData={loaderAnimation}
                loop={true}
                autoplay={true}
              />
            </div>
          </div>
        </div>
        
        {message && (
          <p className={`mt-3 ${textSizeClass[size]} text-gray-600 font-medium text-center`}>
            <span className="text-emerald-600">{message}</span>
          </p>
        )}
      </div>
    );
  }

  // Lottie variant (default)
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <Lottie 
          animationData={loaderAnimation}
          style={{ width, height }}
          loop={true}
          autoplay={true}
        />
        
        {/* Simple glow effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 60%)',
            filter: 'blur(8px)',
          }}
        />
      </div>
      
      {message && (
        <p className={`mt-3 ${textSizeClass[size]} text-gray-600 font-medium text-center`}>
          <span className="text-emerald-600">{message}</span>
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;