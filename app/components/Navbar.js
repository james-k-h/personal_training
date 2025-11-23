'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              FitPro Training
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link
                href="/pricing"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/benefits"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Benefits
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center">
            {session ? (
              <div className="flex items-center gap-3">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    // alt="Profile"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                )}
                <span className="text-gray-700 text-sm font-medium hidden sm:block leading-9">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="ml-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors"
              >
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
