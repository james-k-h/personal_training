export const siteConfig = {
  name: 'JKH Fitness',
  description:
    'Professional personal training, massage therapy, and injury rehabilitation services tailored to your wellness goals',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'localhost:3000',
  ogImage: '/og-image.jpg',
  keywords: [
    'personal training',
    'fitness coach',
    'massage therapy',
    'injury rehabilitation',
    'wellness programs',
    'health and fitness',
    'workout plans',
    'fitness packages',
    'therapeutic massage',
    'rehab services',
  ],
  author: 'JKH',
  siteLanguage: 'en-US',
  //   twitter: '@jkhfitness', // Update with actual handle
  //   facebook: 'jkhfitness', // Update with actual page
  //   instagram: 'jkhfitness', // Update with actual handle
};

export const pageMetadata = {
  home: {
    title: 'JKH Fitness - Transform Your Health & Wellness',
    description:
      'Expert personal training, therapeutic massage, and injury rehabilitation services. Flexible packages designed to help you achieve your fitness and wellness goals.',
    keywords:
      'personal training, fitness coach, massage therapy, injury rehab, wellness center',
  },
  pricing: {
    title: 'Pricing & Packages - JKH Fitness',
    description:
      'Choose from our flexible fitness packages including personal training sessions, massage therapy, and injury rehabilitation programs. Find the perfect plan for your goals.',
    keywords:
      'fitness packages, training prices, massage therapy packages, rehab programs, fitness pricing',
  },
  benefits: {
    title: 'Benefits & Success Stories - JKH Fitness',
    description:
      'Discover the life-changing benefits of personalized fitness training, therapeutic massage, and professional injury rehabilitation. Read real success stories from our clients.',
    keywords:
      'fitness benefits, training results, massage benefits, rehab success stories, client testimonials',
  },
  dashboard: {
    title: 'My Dashboard - JKH Fitness',
    description:
      'Manage your training sessions, massage appointments, and rehabilitation programs all in one place.',
    keywords: 'fitness dashboard, session management, appointment booking',
  },
};

// Generate metadata for pages
export function generateMetadata(page = 'home') {
  const pageData = pageMetadata[page] || pageMetadata.home;

  return {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.siteLanguage,
      url: siteConfig.url,
      title: pageData.title,
      description: pageData.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      creator: siteConfig.twitter,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // Add your verification code
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}
