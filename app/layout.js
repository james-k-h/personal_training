import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/app/components/Navbar';
import Providers from '@/app/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Personal Training - Achieve Your Fitness Goals',
  description: 'Professional personal training services tailored to your needs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
