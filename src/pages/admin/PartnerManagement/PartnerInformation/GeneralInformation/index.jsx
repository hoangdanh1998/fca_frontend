import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import { Descriptions, Tag, Image, Space, Switch, Carousel } from 'antd';
import Button from 'antd-button-color';
import 'antd-button-color/dist/css/style.less';
import styles from './index.less';
import EditProfileModal from '../../EditProfileModal/index.jsx';
import ConfirmationPopup from '../../../../../components/atom/ConfirmationPopup/index.jsx';
import CloseStoreModal from '../../CloseStoreModal/index.jsx';
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
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

  getTagStatusColors = () => {
    switch (this.props.partner.status) {
      case PARTNER_STATUS.APPROVED:
        return 'success';
      case PARTNER_STATUS.REJECTED:
        return 'error';
      case PARTNER_STATUS.PROCESS:
        return 'processing';
    }
  };

  getTagStatusIcons = () => {
    switch (this.props.partner.status) {
      case PARTNER_STATUS.APPROVED:
        return <CheckCircleOutlined />;
      case PARTNER_STATUS.REJECTED:
        return <CloseCircleOutlined />;
      case PARTNER_STATUS.PROCESS:
        return <ClockCircleOutlined />;
    }
  };

  handleVisibleOpenCloseStore = checked => {
    this.setState({
      visibleOpenCloseStore: true,
      openedStore: {
        storeName: this.props.partner.name,
        storeId: this.props.partner.id,
        isOpen: checked,
        undoneOrder: this.props.totalUndoneOrder,
      },
    });
  };
  handleHideOpenCloseStore = () => {
    this.setState({ visibleOpenCloseStore: false });
  };
  handleOpenCloseStore = status => {
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/handleOpenCloseStore',
      payload: {
        isOpen: status,
        id: this.props.partner.id,
      },
    });
    this.handleHideOpenCloseStore();
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
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/updatePartnerStatus',
      payload: {
        status: this.state.updatedPartner.to,
        id: this.props.partner.id,
      },
    });
    this.handleHideUpdateStatus();
  };

  handleImageSlide = () => {
    const images = [];
    if (this.props.partner.imageLink) {
      const imageLinks = [];
      imageLinks.push(this.props.partner.imageLink);
      imageLinks.forEach(image => {
        images.push(
          <div style={{ width: '100%' }}>
            <Image width={'90%'} className={styles.image} preview={false} src={image} />
          </div>,
        );
      });
      return images;
    }
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
            {partner.account ? partner.account.phone : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={this.getTagStatusColors()} icon={this.getTagStatusIcons()}>
              {partner.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {Object.assign({}, partner.address).description}
          </Descriptions.Item>
        </Descriptions>
        <Carousel autoplay={true}>{this.handleImageSlide()}</Carousel>
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
          onClickOK={status => this.handleOpenCloseStore(status)}
        />
      </div>
    );
  }
}

export default GeneralInformation;
