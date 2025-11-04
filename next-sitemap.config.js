/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.bonnmed.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/404'], 
};
