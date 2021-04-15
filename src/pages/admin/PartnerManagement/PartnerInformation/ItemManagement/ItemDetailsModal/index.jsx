import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Image, Carousel, Row, Col, Card, Modal, Descriptions, Tag, Space } from 'antd';
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import ViewItem from './ViewItemComponent/index';
import EditItem from './EditItemComponent/index';
import ConfirmationPopup from '../../../../../../components/atom/ConfirmationPopup/index';
import {
  PARTNER_ITEM_STATUS,
  DATE_FORMAT,
  REQUESTED_ITEM_STATUS,
} from '../../../../../../../config/constants';

@connect(({ partner, loading }) => ({
  partner: partner.partner,
}))
class ItemDetailsModal extends React.Component {
  state = { viewMode: 'view', visibleChangeStatus: false, confirmMessage: {} };

  getTagStatusColors = status => {
    console.log('get tag style');
    switch (status) {
      case PARTNER_ITEM_STATUS.ACTIVE:
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
        };
      case PARTNER_ITEM_STATUS.ARCHIVE:
        return {
          color: 'error',
          icon: <CloseCircleOutlined />,
        };
      default:
        return {
          color: 'processing',
          icon: <SyncOutlined spin />,
        };
    }
  };
  handleChangeMode = mode => {
    this.setState({ viewMode: mode });
  };

  handleVisibleChangeStatus = toStatus => {
    this.setState({
      visibleChangeStatus: true,
      message: {
        name: this.props.item.name,
        property: 'status',
        from: this.props.item.status,
        to: toStatus,
      },
    });
  };

  handleUpdateItem = values => {
    alert(JSON.stringify(values));
  };

  render() {
    const { item, visible } = this.props;
    return (
      <Modal
        visible={visible}
        style={{ textAlign: 'center' }}
        width="60%"
        title="PARTNER'S ITEM"
        footer={null}
        bodyStyle={{ textAlign: 'left' }}
        onCancel={() => {
          this.props.hideModal();
        }}
      >
        <Row style={{ width: '100%' }}>
          <Col span={8}>
            <Image className={styles.bodyImage} preview={false} src={item.imageLink} />
          </Col>
          <Col span={2}></Col>
          <Col span={14}>
            <Descriptions
              column={1}
              contentStyle={{ fontWeight: 'bold' }}
              labelStyle={{ textAlign: 'left', width: '30%' }}
              title={
                <Space
                  direction="horizontal"
                  style={{
                    justifyContent: 'flex-start',
                    display: 'flex',
                  }}
                >
                  {item.status === REQUESTED_ITEM_STATUS.PROCESS ? null : item.status ===
                    PARTNER_ITEM_STATUS.ACTIVE ? (
                    <CheckCircleOutlined style={{ color: 'green' }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: 'red' }} />
                  )}
                  {item.name}
                </Space>
              }
            >
              <Descriptions.Item label="FCA Group">
                {Object.assign({}, item.fcaItem).name}
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} />
              </Descriptions.Item>
              <Descriptions.Item label="Registration Date">
                {moment(item.createdAt).format(DATE_FORMAT)}
              </Descriptions.Item>
              {/* <Descriptions.Item>
                <Image className={styles.bodyImage} preview={false} src={item.imageLink} />
              </Descriptions.Item> */}
            </Descriptions>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default ItemDetailsModal;
