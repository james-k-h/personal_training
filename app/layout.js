import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Providers from '@/app/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Personal Training - Achieve Your Fitness Goals',
  description: 'Professional personal training services tailored to your needs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-black dark:text-white transition-colors`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
