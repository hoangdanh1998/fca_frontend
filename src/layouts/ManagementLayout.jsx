import React from 'react';
import ProLayout, { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Button, Avatar } from 'antd';
import { Link } from 'umi';
import { connect } from 'dva';
import Authorized from '@/utils/Authorized';
import styles from './ManagementLayout.less';
import AdminSignOut from './LogOut/LogOut';
import HeaderLayout from '../components/atom/Header/index.jsx';
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
    console.log('title', title);
    console.log('this.menuItemRender', this.menuItemRender);
    return (
      <div>
        <ProLayout
          title={defaultSettings.title}
          rightContentRender={() => (
            <>
              <Avatar
                style={{ color: 'black', backgroundColor: 'white' }}
                shape="square"
                size="middle"
              >
                {this.title}
              </Avatar>
              <Button size="middle" style={{ verticalAlign: 'middle' }}>
                Logout
              </Button>
            </>
          )}
          headerContentRender={() => {
            return <div>{this.title}</div>;
          }}
          collapsedButtonRender={false}
          fixedHeader={true}
          siderWidth={240}
          collapsed={false}
          fixSiderbar={true}
          menuItemRender={this.menuItemRender}
          menuDataRender={menuDataRender}
          {...this.props}
        >
          {this.props.children}
        </ProLayout>
        {/* <AdminSignOut /> */}
      </div>
    );
  }
}

export default ManagementLayout;
