export default {
  dev: {
    BASE_API_URL: 'https://api-talaria20.geekup.io',
    // BASE_API_URL: 'http://localhost:3000',
    GEEKUP_MAIL: 'adventure@geekup.vn',
    REGISTER_URL: 'https://geekadventure.vn',
    PRODUCT_URL: 'http://localhost:8000',
    S3_PUBLIC_BUCKET: 'https://talaria-image-dev.s3-ap-southeast-1.amazonaws.com',
  },
  staging: {
    BASE_API_URL: 'https://talaria.geekup.io',
    GEEKUP_MAIL: 'adventure@geekup.vn',
    REGISTER_URL: 'https://geekadventure.vn',
    PRODUCT_URL: 'https://talaria.geekup.io',
    S3_PUBLIC_BUCKET: 'https://talaria-image-dev.s3-ap-southeast-1.amazonaws.com',
  },
  pre: {
    BASE_API_URL: 'https://talaria.geekup.vn',
    GEEKUP_MAIL: 'adventure@geekup.vn',
    REGISTER_URL: 'https://geekadventure.vn',
    PRODUCT_URL: 'https://talaria.geekup.vn',
    SENTRY: 'https://404a5bf1a09548f38f6e050ebfd6da7d@o283878.ingest.sentry.io/5323084',
    S3_PUBLIC_BUCKET: 'https://talaria-image-prod.s3-ap-southeast-1.amazonaws.com',
  },
};
