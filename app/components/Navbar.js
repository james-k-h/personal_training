'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);

  let theme = 'light';
  let toggleTheme = () => {};

  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch (error) {
    // Theme provider not ready yet
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset image error when session changes
  useEffect(() => {
    setImageError(false);
  }, [session?.user?.image]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-black dark:text-yellow-400 transition-colors"
            >
              JKH Fitness
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link
                href="/about"
                className="text-black dark:text-white hover:text-gray-600 dark:hover:text-yellow-400 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/pricing"
                className="text-black dark:text-white hover:text-gray-600 dark:hover:text-yellow-400 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/benefits"
                className="text-black dark:text-white hover:text-gray-600 dark:hover:text-yellow-400 transition-colors"
              >
                Benefits
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className="text-black dark:text-white hover:text-gray-600 dark:hover:text-yellow-400 transition-colors"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg
                    className="w-5 h-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
              </button>
            )}

            {session ? (
              <div className="flex items-center gap-3">
                {session.user.image && !imageError ? (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'Profile'}
                      fill
                      sizes="36px"
                      className="object-cover"
                      onError={() => setImageError(true)}
                      priority
                    />
                  </div>
                ) : session.user.name ? (
                  // Fallback: Show initials if image fails to load
                  <div className="w-9 h-9 rounded-full bg-black dark:bg-yellow-400 flex items-center justify-center">
                    <span className="text-white dark:text-black font-semibold text-sm">
                      {session.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ) : null}
                <span className="text-black dark:text-white text-sm font-medium hidden sm:block leading-9">
                  {session.user.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="ml-2 px-4 py-2 text-sm font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-yellow-400 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="px-4 py-2 bg-black dark:bg-yellow-400 text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-yellow-500 font-medium text-sm transition-colors"
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
