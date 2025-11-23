/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'http://localhost:3000',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/dashboard', '/dashboard/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard', '/dashboard/*'],
      },
    ],
    additionalSitemaps: [
      // Add additional sitemaps if needed
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    // Custom priority for specific pages
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    if (path === '/pricing') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    // Default return
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
