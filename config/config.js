import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
import env from './env';
import apiconfigs from './api';
import webpackPlugin from './plugin.config';
import routes from './routes';
import plugins from './plugins';

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env;

const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';

const apiconfig = apiconfigs[REACT_APP_ENV || env.REACT_APP_ENV];
const { BASE_API_URL, REGISTER_URL, GEEKUP_MAIL, PRODUCT_URL, DEV_URL, SENTRY, S3_PUBLIC_BUCKET } = apiconfig;

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  routes: routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'layout-header-background': '#373D48',
    'primary-color': '#33B3AB',
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || env.REACT_APP_ENV,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
    BASE_API_URL,
    S3_PUBLIC_BUCKET,
    REGISTER_URL,
    GEEKUP_MAIL,
    PRODUCT_URL,
    DEV_URL,
    SENTRY,
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    ssePath: '/',
  },
  proxy: {},
  chainWebpack: webpackPlugin,
};
