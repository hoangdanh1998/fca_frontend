import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/pkimanh03/Documents/capstone/fca_frontend/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/admin',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__AdminLayout" */ '../../layouts/AdminLayout'),
          LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/AdminLayout').default,
    routes: [
      {
        name: 'Admin Sign In',
        path: '/admin/signin',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__admin__SignIn" */ '../admin/SignIn'),
              LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
                .default,
            })
          : require('../admin/SignIn').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/pkimanh03/Documents/capstone/fca_frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "layouts__BasicLayout" */ '../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/fca-management',
        name: 'FCA Management',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "layouts__ManagementLayout" */ '../../layouts/ManagementLayout'),
              LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
                .default,
            })
          : require('../../layouts/ManagementLayout').default,
        authority: ['admin'],
        routes: [
          {
            path: '/fca-management/dashboard',
            name: 'Dashboard',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__admin__Dashboard__index" */ '../admin/Dashboard/index'),
                  LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
                    .default,
                })
              : require('../admin/Dashboard/index').default,
            authority: ['admin'],
            exact: true,
          },
          {
            path: '/fca-management/partner-management/partner-information',
            name: 'Partner Information',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__admin__PartnerManagement__PartnerInformation__index" */ '../admin/PartnerManagement/PartnerInformation/index'),
                  LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
                    .default,
                })
              : require('../admin/PartnerManagement/PartnerInformation/index')
                  .default,
            authority: ['admin'],
            hidden: true,
            exact: true,
          },
          {
            name: 'Partner Management',
            path: '/fca-management/partner-management',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__admin__PartnerManagement" */ '../admin/PartnerManagement'),
                  LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
                    .default,
                })
              : require('../admin/PartnerManagement').default,
            authority: ['admin'],
            exact: true,
          },
          {
            path: '/fca-management/order-management/order-information',
            name: 'Order Information',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__admin__OrderManagement__OrderInformation__index" */ '../admin/OrderManagement/OrderInformation/index'),
                  LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
                    .default,
                })
              : require('../admin/OrderManagement/OrderInformation/index')
                  .default,
            authority: ['admin'],
            hidden: true,
            exact: true,
          },
          {
            name: 'Order Management',
            path: '/fca-management/order-management',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__admin__OrderManagement" */ '../admin/OrderManagement'),
                  LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
                    .default,
                })
              : require('../admin/OrderManagement').default,
            authority: ['admin'],
            exact: true,
          },
          {
            name: 'FCA License Management',
            path: '/fca-management/license-management',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__admin__LicenseManagement" */ '../admin/LicenseManagement'),
                  LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
                    .default,
                })
              : require('../admin/LicenseManagement').default,
            authority: ['admin'],
            exact: true,
          },
          {
            path: '/fca-management/transaction-management',
            name: 'Transaction Management',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__admin__TransactionManagement__index" */ '../admin/TransactionManagement/index'),
                  LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
                    .default,
                })
              : require('../admin/TransactionManagement/index').default,
            authority: ['admin'],
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/pkimanh03/Documents/capstone/fca_frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ '../404'),
              LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
                .default,
            })
          : require('../404').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('/Users/pkimanh03/Documents/capstone/fca_frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ '../404'),
          LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
            .default,
        })
      : require('../404').default,
    exact: true,
  },
  {
    component: () =>
      React.createElement(
        require('/Users/pkimanh03/Documents/capstone/fca_frontend/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
