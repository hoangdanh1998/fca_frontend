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
        path: '/administration',
        name: 'Administration',
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
            name: 'Partner Management',
            path: '/administration/contact-management',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__admin__ContactManagement" */ '../admin/ContactManagement'),
                  LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
                    .default,
                })
              : require('../admin/ContactManagement').default,
            iconPath: '/fast.svg',
            authority: ['admin'],
            exact: true,
          },
          {
            name: 'Order Management',
            path: '/administration/order-management',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__admin__OrderManagement" */ '../admin/OrderManagement'),
                  LoadingComponent: require('/Users/pkimanh03/Documents/capstone/fca_frontend/src/components/PageLoading/index')
                    .default,
                })
              : require('../admin/OrderManagement').default,
            iconPath: '/fast.svg',
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
