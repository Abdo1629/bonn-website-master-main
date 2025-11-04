/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.bonnmed.com', 
  generateRobotsTxt: true,
  outDir: './public', 
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/404', '/server-sitemap.xml', '/admin/*'],
  
  additionalPaths: async (config) => {
    const paths = [
      '/',
      '/about',
      '/services',
      '/registration',
      '/contact',
      '/products[slug]',
      'covix%20care',
    ];

    return paths.map((path) => ({
      loc: path,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
