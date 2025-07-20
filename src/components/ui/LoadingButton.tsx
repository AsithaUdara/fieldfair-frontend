// src/components/ui/LoadingButton.tsx
"use client";

import React, { ButtonHTMLAttributes } from 'react';
import LoadingSpinner from './loading-spinner';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ 
  loading = false, 
  loadingText = 'Loading...', 
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props 
}) => {
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 shadow-sm hover:shadow-md',
    outline: 'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600'
  };

  const spinnerVariant = variant === 'primary' ? 'minimal' : 'minimal';
  const spinnerSize = size === 'small' ? 'small' : 'small';
  
  return (
    <button 
      className={`
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        rounded-xl font-semibold transition-all duration-300 
        disabled:opacity-50 disabled:cursor-not-allowed
        transform hover:scale-105 hover:-translate-y-1
        flex items-center justify-center space-x-2
        ${className}
      `}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner size={spinnerSize} variant={spinnerVariant} />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;