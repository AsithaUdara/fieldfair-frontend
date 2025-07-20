// src/providers/loading-provider.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import UnifiedLoader from '@/components/ui/UnifiedLoader';

interface LoadingContextType {
  isLoading: boolean;
  message: string;
  showGlobalLoader: (message?: string, minDuration?: number) => void;
  hideGlobalLoader: () => void;
  withGlobalLoader: <T>(
    asyncFn: () => Promise<T>,
    message?: string,
    minDuration?: number
  ) => Promise<T | null>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: ReactNode;
  defaultMinDuration?: number; // Global minimum duration
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ 
  children, 
  defaultMinDuration = 1500 // Default 1.5 seconds minimum
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Loading...');
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  const showGlobalLoader = (loadingMessage?: string, minDuration?: number) => {
    setMessage(loadingMessage || 'Loading...');
    setIsLoading(true);
    setLoadingStartTime(Date.now());
  };

  const hideGlobalLoader = async (minDuration?: number) => {
    const actualMinDuration = minDuration || defaultMinDuration;
    
    if (loadingStartTime) {
      const elapsed = Date.now() - loadingStartTime;
      const remaining = actualMinDuration - elapsed;
      
      if (remaining > 0) {
        // Wait for remaining time to meet minimum duration
        await new Promise(resolve => setTimeout(resolve, remaining));
      }
    }
    
    setIsLoading(false);
    setLoadingStartTime(null);
  };

  const withGlobalLoader = async <T,>(
    asyncFn: () => Promise<T>,
    loadingMessage?: string,
    minDuration?: number
  ): Promise<T | null> => {
    const actualMinDuration = minDuration || defaultMinDuration;
    const startTime = Date.now();
    
    showGlobalLoader(loadingMessage);
    
    try {
      // Execute the async function
      const result = await asyncFn();
      
      // Calculate elapsed time and ensure minimum duration
      const elapsed = Date.now() - startTime;
      const remaining = actualMinDuration - elapsed;
      
      if (remaining > 0) {
        // Wait for remaining time to meet minimum duration
        await new Promise(resolve => setTimeout(resolve, remaining));
      }
      
      setIsLoading(false);
      setLoadingStartTime(null);
      return result;
    } catch (error) {
      // Even on error, respect minimum duration
      const elapsed = Date.now() - startTime;
      const remaining = actualMinDuration - elapsed;
      
      if (remaining > 0) {
        await new Promise(resolve => setTimeout(resolve, remaining));
      }
      
      setIsLoading(false);
      setLoadingStartTime(null);
      console.error('Global loader error:', error);
      return null;
    }
  };

  const value: LoadingContextType = {
    isLoading,
    message,
    showGlobalLoader,
    hideGlobalLoader: () => hideGlobalLoader(),
    withGlobalLoader,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {/* Global loader component */}
      <UnifiedLoader 
        loading={isLoading} 
        message={message} 
        global={true} 
      />
    </LoadingContext.Provider>
  );
};

// Custom hook to use the loading context
export const useGlobalLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useGlobalLoading must be used within a LoadingProvider');
  }
  return context;
};

// Higher-order component for automatic loading
export function withLoading<P extends object>(
  Component: React.ComponentType<P>,
  defaultMessage?: string,
  duration?: number
) {
  return function WrappedComponent(props: P) {
    const { showGlobalLoader, hideGlobalLoader } = useGlobalLoading();
    
    React.useEffect(() => {
      showGlobalLoader(defaultMessage);
      const timer = setTimeout(() => {
        hideGlobalLoader();
      }, duration || 1000);
      
      return () => clearTimeout(timer);
    }, []);

    return <Component {...props} />;
  };
}

// Utility function for development vs production timing
export const getLoaderDuration = (action: 'quick' | 'medium' | 'long' | 'login' | 'upload'): number => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const durations = {
    development: {
      quick: 1000,   // 1 second
      medium: 2000,  // 2 seconds  
      long: 3000,    // 3 seconds
      login: 2500,   // 2.5 seconds
      upload: 4000   // 4 seconds
    },
    production: {
      quick: 500,    // 0.5 seconds
      medium: 800,   // 0.8 seconds
      long: 1200,    // 1.2 seconds
      login: 1000,   // 1 second
      upload: 1500   // 1.5 seconds
    }
  };
  
  return isDevelopment ? durations.development[action] : durations.production[action];
};