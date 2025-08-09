// File Location: src/app/auth/callback/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const AuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This code runs automatically as soon as the page loads
    const token = searchParams.get('token');
    const userDataString = searchParams.get('user');

    if (token && userDataString) {
      try {
        // Save the user data and token to local storage so the user stays logged in
        localStorage.setItem('token', token);
        localStorage.setItem('user', userDataString);
        
        toast.success('Successfully logged in with Google!');

        const user = JSON.parse(userDataString);

        // Redirect to the correct dashboard based on the user's role
        if (user.role === 'farmer') {
          router.push('/farmer/dashboard');
        } else {
          router.push('/marketplace');
        }
      } catch (error) {
        toast.error('An error occurred during login. Please try again.');
        router.push('/');
      }
    } else {
      // This handles the case where Google login fails for some reason
      toast.error('Google login failed. Please try again.');
      router.push('/'); // Redirect to the homepage
    }
  }, [router, searchParams]);

  // Render a loading state while the logic above runs
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8">
        <p className="text-xl font-semibold text-gray-700">Authenticating with Google...</p>
        <p className="text-gray-500 mt-2">Please wait, we're securely logging you in.</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;