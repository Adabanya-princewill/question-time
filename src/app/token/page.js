'use client'
import React, { useState } from 'react';
import axios from '../lib/axios';
import { useRouter } from 'next/navigation'

const TokenPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleTokenRequest = async () => {
    try {
      const response = await axios.post('/token', { email });
      const token = response.data.token;
      localStorage.setItem('token', token);
      router.push('/');
    } catch (error) {
      setError('Error requesting token');
    }
  };

  return (
    <div>
      <section className="py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Sign In!</h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Login to your account</p>
          </div>
          <div className="relative max-w-md mx-auto mt-8 md:mt-16">
            <div className="overflow-hidden bg-white rounded-md shadow-md">
              <div className="px-4 py-6 sm:px-8 sm:py-7">
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-base font-medium text-gray-900"> Email </label>
                    </div>
                    <div className="mt-2.5 text-gray-400 focus-within:text-gray-600">
                      <div className="pointer-events-none">
                      </div>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="block w-full py-2 p-2 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      />
                    </div>
                  </div>
                  <div>
                    <button type="submit" onClick={handleTokenRequest} className="inline-flex items-center justify-center w-full py-2 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                      Request Token
                    </button>
                  </div>
                </div>
                {error && <p className='text-red-500 py-2'>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TokenPage;
