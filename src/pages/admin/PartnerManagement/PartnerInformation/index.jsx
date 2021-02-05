import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Tabs } from 'antd';
import GeneralInformation from '../PartnerInformation/GeneralInformation/index.jsx';
import LicenseManagement from '../PartnerInformation/LicenseManagment/index.jsx';
import ItemManagement from '../PartnerInformation/ItemManagement/index.jsx';
import styles from './index.less';

// @connect(({ admin, loading }) => ({
//   fetchCurrentAdmin: loading.effects['admin/saveCurrentAdmin'],
//   visibleContact: admin.visibleCreateContact,
// }))
class PartnerInformation extends React.Component {
  render() {
    return (
      <div className={styles.applicationManagementContainer}>
        <Tabs
          defaultActiveKey="1"
          centered={true}
          style={{
            fontSize: 20,
            color: 'black',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Tabs.TabPane tab="General Information" key="1">
            <GeneralInformation />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Item Management" key="2">
            <ItemManagement />
          </Tabs.TabPane>
          <Tabs.TabPane tab="License Management" key="3">
            <LicenseManagement />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default PartnerInformation;
