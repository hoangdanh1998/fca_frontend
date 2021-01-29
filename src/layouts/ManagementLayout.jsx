import React from 'react';
import ProLayout, { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Link } from 'umi';
import { connect } from 'dva';
import Authorized from '@/utils/Authorized';
import { Helmet } from 'react-helmet-async';
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

    const menuDataRender = menuList =>
      menuList.map(item => {
        if (item.hidden) return;
        const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
        return Authorized.check(item.authority, localItem, null);
      });
    return (
      <div className={styles.adminLayoutContainer}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <ProLayout
          headerRender={() => null}
          menuHeaderRender={() => (
            <div>
              <h1 className={styles.adminLayoutLogo}></h1>
              <h1 className={styles.adminLayoutLogo}>Fast Coffee Management</h1>
            </div>
          )}
          siderWidth={240}
          collapsed={false}
          fixSiderbar={true}
          onCollapse={this.handleMenuCollapse}
          menuItemRender={this.menuItemRender}
          menuDataRender={menuDataRender}
          {...this.props}
        >
          {this.props.children}
          {/* <AdminSignOut /> */}
        </ProLayout>
        {/* <AdminSignOut /> */}
      </div>
    );
  }
}

export default ManagementLayout;
