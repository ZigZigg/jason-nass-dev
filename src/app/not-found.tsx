'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';

export default function NotFound() {
  const { status } = useSession();
  console.log('🚀 ~ NotFound ~ status:', status);
  const isAuthenticated = status === 'authenticated';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-sm p-8 flex flex-col items-center">
        {/* 404 Image */}
        <div className="mb-12">
          <Image
            src="/images/404.png"
            alt="404 Page Not Found"
            width={600}
            height={300}
            quality={100}
            priority
            className="max-w-full h-auto object-contain"
            sizes="(max-width: 768px) 100vw, 600px"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center">Page Not Found</h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg text-gray-600 text-center">
          Sorry, this page may not exist, or is under development.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {status !== 'loading' && (
            <Link href={isAuthenticated ? '/dashboard' : '/'}>
              <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200 !bg-[#11304E]">
                <ArrowLeftOutlined className="mr-2" />
                {isAuthenticated ? 'Back to Dashboard' : 'Back to NASS Home Page'}
              </button>
            </Link>
          )}
        </div>

        {/* Footer Text */}
        <div className="mt-12 text-center text-gray-500">
          <p>If you believe this is an error, please contact our support team.</p>
        </div>
      </div>
    </div>
  );
}
