/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.mentoteaching.com",
  generateRobotsTxt: true,
  exclude: [
    "/dashboard*",
    "/login",
    "/signup",
    "/icon.png",
    "/resources/privacy", // Exclude privacy page if not needed
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: "*",
        disallow: [
          "/dashboard",
          "/login",
          "/signup",
          "/icon.png",
          "/resources/privacy",
        ],
      },
    ],
  },
};
