import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { List } from 'antd';
import {
  HomeOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { PARTNER_INFORMATION } from '../../../../../../config/seedingData';

// @connect(({ admin, loading }) => ({
//   fetchCurrentAdmin: loading.effects['admin/saveCurrentAdmin'],
//   visibleContact: admin.visibleCreateContact,
// }))
class GeneralInformation extends React.Component {
  render() {
    return (
      <List itemLayout="horizontal" style={{ textAlign: 'left' }}>
        <List.Item>
          <HomeOutlined className={styles.icon} />
          <p className={styles.title}>Store Name</p>
          <p className={styles.data}>{PARTNER_INFORMATION.storeName}</p>
        </List.Item>
        <List.Item>
          <PhoneOutlined className={styles.icon} />
          <p className={styles.title}>Store Phone</p>
          <p className={styles.data}>{PARTNER_INFORMATION.storePhone}</p>
        </List.Item>
        <List.Item>
          <EnvironmentOutlined className={styles.icon} />
          <p className={styles.title}>Store Address</p>
          <p className={styles.data}>{PARTNER_INFORMATION.storeAddress}</p>
        </List.Item>
        <List.Item>
          <CheckCircleOutlined className={styles.icon} />
          <p className={styles.title}>Store Status</p>
          <p className={styles.data}>{PARTNER_INFORMATION.storeAddress}</p>
        </List.Item>
      </List>
    );
  }
}

export default GeneralInformation;
