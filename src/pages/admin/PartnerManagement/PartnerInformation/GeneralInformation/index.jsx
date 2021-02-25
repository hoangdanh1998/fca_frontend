import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import { Button, Descriptions, Badge, Image } from 'antd';
import styles from './index.less';
import EditProfileModal from '../../EditProfileModal/index.jsx';
import { PARTNER_INFORMATION } from '../../../../../../config/seedingData';
import { PARTNER_STATUS } from '../../../../../../config/constants';

// @connect(({ partner, loading }) => {
//   return {
//     partner: partner.partner,
//   };
// })
class GeneralInformation extends React.Component {
  state = {
    visibleChangeProfile: false,
  };

  handleVisibleChangeProfile = () => {
    this.setState({ visibleChangeProfile: true });
  };
  handleHideChangeProfile = () => {
    this.setState({ visibleChangeProfile: false });
  };

  handleStoreStatus = () => {
    switch (this.props.partner.status) {
      case PARTNER_STATUS.APPROVED:
        return 'success';
      case PARTNER_STATUS.REJECTED:
        return 'error';
      case PARTNER_STATUS.PROCESS:
        return 'processing';
    }
  };

  render() {
    const partner = Object.assign({}, this.props.partner);
    return (
      <div>
        <Descriptions
          title={partner.name}
          className={styles.description}
          extra={
            <Button onClick={this.handleVisibleChangeProfile} type="primary">
              Edit
            </Button>
          }
        >
          <Descriptions.Item label="Telephone">
            {partner.phone ? partner.phone : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Badge status={this.handleStoreStatus()} text={partner.status} />
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {Object.assign({}, partner.address).description}
          </Descriptions.Item>
        </Descriptions>
        <Image
          width={'90%'}
          className={styles.image}
          preview={false}
          src={partner.imageLink ? partner.imageLink : PARTNER_INFORMATION.storeImage}
        />
        <EditProfileModal
          visible={this.state.visibleChangeProfile}
          hideModal={this.handleHideChangeProfile}
          partner={partner}
        />
      </div>
    );
  }
}

export default GeneralInformation;
