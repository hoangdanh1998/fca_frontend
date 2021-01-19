import React from 'react';
import ProLayout, { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Link } from 'umi';
// import { formatMessage } from 'umi-plugin-react/locale';
// import { Breadcrumb } from 'antd';
import { connect } from 'dva';
import Authorized from '@/utils/Authorized';
import { Helmet } from 'react-helmet-async';
import Logo from '../../public/logo_talaria.svg';
import styles from './ManagementLayout.less';
import AdminSignOut from './LogOut/LogOut';
import defaultSettings from '../../config/defaultSettings';

@connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))
class ManagementLayout extends React.Component {
  handleMenuCollapse = payload => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });
  };

  menuItemRender = (menuItemProps, defaultDom) => {
    if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
      return defaultDom;
    }
    // if (menuItemProps.hidden) return;

    return (
      <Link to={menuItemProps.path}>
        <div className={styles.textInSider}>
          {menuItemProps.iconPath ? (
            <img src={menuItemProps.iconPath} alt="slots logo" className={styles.siderIcon} />
          ) : null}
          <span className={styles.andminSider}>{menuItemProps.name}</span>
        </div>
      </Link>
    );
  };

  render() {
    const { breadcrumb } = getMenuData(this.props.route.routes);
    const title = getPageTitle({
      pathname: this.props.location.pathname,
      breadcrumb,
      title: defaultSettings.title,
    });

    // let currentPageName = '';
    const menuDataRender = menuList =>
      menuList.map(item => {
        if (item.hidden) return;
        const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
        // if (window.location.href.includes(localItem.path)) {
        //   currentPageName = localItem.name;
        // }
        // eslint-disable-next-line consistent-return
        return Authorized.check(item.authority, localItem, null);
      });
    return (
      <div className={styles.adminLayoutContainer}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <ProLayout
          headerRender={() => null}
          // headerRender={() => (
          //   <div className={styles.adminLayoutHeader}>
          //     <span className={styles.pageName}>
          //       {currentPageName
          //         .toLowerCase()
          //         .split(' ')
          //         .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          //         .join(' ')}
          //     </span>
          //     <Breadcrumb>
          //       <Breadcrumb.Item>
          //         <Link to="/dashboard">talent</Link>
          //       </Breadcrumb.Item>
          //     </Breadcrumb>
          //   </div>
          // )}
          menuHeaderRender={() => (
            <div>
              <img src={Logo} alt="talaria logo" className={styles.adminLayoutLogo} />
            </div>
          )}
          // breadcrumbRender={(routers = []) => [
          //   {
          //     path: '/',
          //     breadcrumbName: formatMessage({
          //       id: 'menu.home',
          //     }),
          //   },
          //   {
          //     path: '/',
          //     breadcrumbName: formatMessage({
          //       id: 'menu.home',
          //     }),
          //   },
          //   ...routers,
          // ]}
          siderWidth={240}
          collapsed={false}
          onCollapse={this.handleMenuCollapse}
          menuItemRender={this.menuItemRender}
          menuDataRender={menuDataRender}
          {...this.props}
        >
          {this.props.children}
        </ProLayout>
        <AdminSignOut />
      </div>
    );
  }
}

export default ManagementLayout;
