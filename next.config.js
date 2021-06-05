const generateSitemap = require("./scripts/generate-sitemap");

module.exports = {
  trailingSlash: true,
  future: {
    webpack5: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      generateSitemap();
    }
    return config;
  },
};
