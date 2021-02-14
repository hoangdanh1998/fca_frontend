import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import { Button, Descriptions, Badge, Image } from 'antd';
import styles from './index.less';
import { PARTNER_INFORMATION } from '../../../../../../config/seedingData';
import { PARTNER_STATUS } from '../../../../../../config/constants';

// @connect(({ admin, loading }) => ({
//   fetchCurrentAdmin: loading.effects['admin/saveCurrentAdmin'],
//   visibleContact: admin.visibleCreateContact,
// }))
class GeneralInformation extends React.Component {
  handleStoreStatus = () => {
    switch (PARTNER_INFORMATION.storeStatus) {
      case PARTNER_STATUS.APPROVED:
        return 'success';
      case PARTNER_STATUS.REJECTED:
        return 'error';
      case PARTNER_STATUS.PROCESS:
        return 'processing';
    }
  };
  render() {
    return (
      <div>
        <Descriptions
          title="Partner Information"
          className={styles.description}
          extra={<Button type="primary">Edit</Button>}
        >
          <Descriptions.Item label="Store">{PARTNER_INFORMATION.storeName}</Descriptions.Item>
          <Descriptions.Item label="Telephone">{PARTNER_INFORMATION.storePhone}</Descriptions.Item>
          <Descriptions.Item label="Owner">{PARTNER_INFORMATION.storeName}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Badge status={this.handleStoreStatus()} text={PARTNER_INFORMATION.storeStatus} />
          </Descriptions.Item>
          <Descriptions.Item label="Address">{PARTNER_INFORMATION.storeAddress}</Descriptions.Item>
        </Descriptions>
        <Image
          width={'90%'}
          className={styles.image}
          preview={false}
          src={PARTNER_INFORMATION.storeImage}
        />
      </div>
    );
  }
}

export default GeneralInformation;
