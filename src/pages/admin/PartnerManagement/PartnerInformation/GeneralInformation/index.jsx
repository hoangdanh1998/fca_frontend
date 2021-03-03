import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import { Descriptions, Badge, Image, Space, Switch } from 'antd';
import Button from 'antd-button-color';
import 'antd-button-color/dist/css/style.less';
import styles from './index.less';
import EditProfileModal from '../../EditProfileModal/index.jsx';
import ConfirmationPopup from '../../../../../components/atom/ConfirmationPopup/index.jsx';
import CloseStoreModal from '../../CloseStoreModal/index.jsx';
import { convertStringToCamel } from '../../../../../utils/utils';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { PARTNER_INFORMATION } from '../../../../../../config/seedingData';
import { PARTNER_STATUS } from '../../../../../../config/constants';

@connect(({ partner, loading }) => ({}))
class GeneralInformation extends React.Component {
  state = {
    visibleChangeProfile: false,
    visibleOpenCloseStore: false,
    visibleUpdateStatus: false,
    updatedPartner: {},
    openedStore: {},
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

  handleVisibleOpenCloseStore = checked => {
    this.setState({
      visibleOpenCloseStore: true,
      openedStore: {
        storeName: this.props.partner.name,
        storeId: this.props.partner.id,
        isOpen: checked,
        undoneOrder: 5,
      },
    });
  };
  handleHideOpenCloseStore = () => {
    this.setState({ visibleOpenCloseStore: false });
  };

  handleVisibleUpdateStatus = status => {
    this.setState({ visibleUpdateStatus: true });
    this.setState({
      updatedPartner: {
        id: this.props.partner.id,
        name: this.props.partner.name,
        from: this.props.partner.status,
        to: status,
        property: 'status',
      },
    });
  };
  handleHideUpdateStatus = () => {
    this.setState({ visibleUpdateStatus: false });
  };
  handleUpdateStatus = () => {
    this.handleHideUpdateStatus();
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/updatePartnerStatus',
      payload: {
        status: this.state.updatedPartner.to,
        id: this.props.partner.id,
      },
    });
  };

  render() {
    const partner = Object.assign({}, this.props.partner);
    return (
      <div>
        <Descriptions
          title={
            <Space direction="horizontal">
              {partner.name}
              <EditOutlined
                style={{ color: '#1890ff' }}
                onClick={this.handleVisibleChangeProfile}
              />
            </Space>
          }
          className={styles.description}
          extra={
            <Space direction="horizontal">
              {partner.status === PARTNER_STATUS.PROCESS ? (
                <>
                  <Button
                    type="success"
                    with="ghost"
                    icon={
                      <CheckOutlined
                        onClick={() => {
                          this.handleVisibleUpdateStatus(PARTNER_STATUS.APPROVED);
                        }}
                        style={{ fontSize: 15, color: 'green' }}
                      />
                    }
                    onClick={() => {
                      this.handleVisibleUpdateStatus(PARTNER_STATUS.APPROVED);
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    type="danger"
                    with="ghost"
                    icon={
                      <CloseOutlined
                        onClick={() => {
                          this.handleVisibleUpdateStatus(PARTNER_STATUS.REJECTED);
                        }}
                        style={{ fontSize: 20, color: 'red' }}
                      />
                    }
                    onClick={() => {
                      this.handleVisibleUpdateStatus(PARTNER_STATUS.REJECTED);
                    }}
                  >
                    Reject
                  </Button>
                </>
              ) : (
                <div
                  style={
                    partner.status === PARTNER_STATUS.APPROVED
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                >
                  <Switch
                    checkedChildren="Open"
                    unCheckedChildren="Close"
                    checked={
                      partner.isOpen !== undefined && partner.isOpen ? partner.isOpen : false
                    }
                    onChange={checked => this.handleVisibleOpenCloseStore(checked)}
                  />
                </div>
              )}
            </Space>
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
        <ConfirmationPopup
          visible={this.state.visibleUpdateStatus}
          message={this.state.updatedPartner}
          hideModal={this.handleHideUpdateStatus}
          onClickOK={this.handleUpdateStatus}
        />
        <CloseStoreModal
          storeName={this.state.openedStore.storeName}
          undoneOrder={this.state.openedStore.undoneOrder}
          isOpen={this.state.openedStore.isOpen}
          visible={this.state.visibleOpenCloseStore}
          hideModal={this.handleHideOpenCloseStore}
        />
      </div>
    );
  }
}

export default GeneralInformation;
