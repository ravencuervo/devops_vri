module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com', 'http://localhost:1337'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com', 'http://localhost:1337'],
          'frame-src': ["'self'", 'http://localhost:1337', 'http://localhost:5173'],
          'frame-ancestors': ["'self'", 'http://localhost:5173', 'http://localhost:3000'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
