// src/components/ui/SimpleLoader.tsx
"use client";

import React from 'react';
import Lottie from 'lottie-react';
import loaderAnimation from '../../../public/loader-animation2.json';

interface SimpleLoaderProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const SimpleLoader: React.FC<SimpleLoaderProps> = ({ 
  message = 'Loading...', 
  size = 'medium',
  className = ''
}) => {
  const sizeMap = {
    small: { width: 40, height: 40, textSize: 'text-sm', containerSize: 60 },
    medium: { width: 60, height: 60, textSize: 'text-base', containerSize: 80 },
    large: { width: 80, height: 80, textSize: 'text-lg', containerSize: 100 }
  };

  const { width, height, textSize, containerSize } = sizeMap[size];

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      {/* Simple circular background with Lottie animation */}
      <div 
        className="relative flex items-center justify-center bg-emerald-50 rounded-full mb-4 shadow-sm"
        style={{ width: containerSize, height: containerSize }}
      >
        <Lottie 
          animationData={loaderAnimation}
          style={{ width, height }}
          loop={true}
          autoplay={true}
        />
      </div>
      
      {/* Simple loading text */}
      <div className="text-center">
        <p className={`${textSize} text-gray-600 font-medium mb-2`}>
          {message}
        </p>
        
        {/* Simple loading dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SimpleLoader;