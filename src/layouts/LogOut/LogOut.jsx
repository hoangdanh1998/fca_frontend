import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu, Icon, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './LogOut.less';

@connect()
class AdminSignOut extends Component {
  handleQuit = () => {
    this.props.dispatch({
      type: 'admin/signOut',
    });
  };

  render() {
    const content = (
      <div>
        <a target="_blank" rel="noopener noreferrer" onClick={this.handleQuit}>
          <Icon className={styles.iconLogOut} type="logout" />
          Sign Out
        </a>
      </div>
    );
    return (
      <div>
        <Menu mode="vertical" className={styles.dropDownSignOut}>
          <Menu.SubMenu
            key="sub4"
            title={
              <div>
                <Avatar
                  className={styles.adminAvatar}
                  style={{ backgroundColor: '#2AAEB7' }}
                  icon={<UserOutlined styles={{ marginLeft: 10 }} />}
                />
                <span>Admin</span>
              </div>
            }
          >
            <Menu.Item key="log-out">{content}</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    );
  }
}

export default AdminSignOut;
