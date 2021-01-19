module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
    BASE_API_URL: true,
    S3_PUBLIC_BUCKET: true,
    REGISTER_URL: true,
    GEEKUP_MAIL: true,
    PRODUCT_URL: true,
    DEV_URL: true,
  },
};
