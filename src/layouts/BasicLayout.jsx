import React from 'react';
import { getPageTitle, getMenuData } from '@ant-design/pro-layout';
import { HelmetProvider, Helmet } from 'react-helmet-async';

import { Link, router } from 'umi';
import { connect } from 'dva';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import { getAuthorityFromRouter } from '@/utils/utils';
import './BasicLayout.less';
import moment from 'moment';
import defaultSettings from '../../config/defaultSettings';

moment.locale('en', {
  week: {
    dow: 6,
  },
});

const noMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/signin">Go to sign in page</Link>
      </Button>
    }
  />
);

const BasicLayout = props => {
  const {
    children,
    location = {
      pathname: '/',
    },
    route,
  } = props;

  const { breadcrumb } = getMenuData(route.routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    title: defaultSettings.title,
  });

  const authority = localStorage.getItem('authority');
  if (!authority || !authority.length) {
    router.push('/admin/signin');
    // } else if (window.location.href.endsWith('/user/signup')) {
    //   router.push('/user/signin');
  } else if (window.location.pathname === '/') {
    const authorityJson = JSON.parse(authority);
    if (authorityJson && authorityJson.length && authorityJson[0] === 'admin') {
      router.push('/fca-management/dashboard');
    }
  }

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <Authorized authority={authorized.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </HelmetProvider>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
