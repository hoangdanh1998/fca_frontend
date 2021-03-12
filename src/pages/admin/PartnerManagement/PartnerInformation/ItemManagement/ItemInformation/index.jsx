import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import NumberFormat from 'react-number-format';
import { Descriptions, Tag, Image, Space, Switch, Carousel, Layout, Row, Col, Card } from 'antd';
import Button from 'antd-button-color';
import 'antd-button-color/dist/css/style.less';
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { convertStringToCamel } from '../../../../../../utils/utils';
import { PARTNER_ITEM } from '../../../../../../../config/seedingData';
import { PARTNER_ITEM_STATUS } from '../../../../../../../config/constants';

@connect(({ partner, loading }) => ({
  partner: partner.partner,
}))
class ItemInformation extends React.Component {
  componentWillMount() {
    // const { dispatch } = this.props;
    // const url = window.location.href;
    // const id = url.substring(url.indexOf('=') + 1);
    // dispatch({
    //   type: 'partner/getPartner',
    //   payload: {
    //     id: id,
    //   },
    // });
    // const items = this.props.partner.items.concat(this.props.partner.requestItems);
    // const item = items.find(item => item.id === id);
    // this.setState({ item: item });
  }

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

  render() {
    const item = PARTNER_ITEM;
    // const partner = Object.assign({}, this.props.partner);
    return (
      <div className={styles.applicationManagementContainer}>
        <div
          direction="vertical"
          style={{ backgroundColor: 'white', padding: '2.5%', display: 'flex', flex: 1 }}
        >
          <Descriptions
            contentStyle={{ display: 'flex', flex: 1 }}
            title={
              <Space direction="horizontal">
                {item.name}
                <EditOutlined
                  style={{ color: '#1890ff' }}
                  // onClick={this.handleVisibleChangeProfile}
                />
              </Space>
            }
            extra={
              <Button
                type={item.status === PARTNER_ITEM_STATUS.ACTIVE ? 'danger' : 'success'}
                with="ghost"
                icon={
                  item.status === PARTNER_ITEM_STATUS.ACTIVE ? (
                    <CloseOutlined style={{ fontSize: 15, color: 'red' }} />
                  ) : (
                    <CheckOutlined style={{ fontSize: 15, color: 'green' }} />
                  )
                }
                onClick={() => {
                  // this.handleVisibleUpdateStatus(PARTNER_STATUS.APPROVED);
                }}
              >
                {convertStringToCamel(
                  item.status === PARTNER_ITEM_STATUS.ACTIVE
                    ? PARTNER_ITEM_STATUS.ARCHIVE
                    : PARTNER_ITEM_STATUS.ACTIVE,
                )}
              </Button>
            }
          >
            <Descriptions.Item label="FCA Group">{item.fcaItem.name}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag
                color={item.status === PARTNER_ITEM_STATUS.ACTIVE ? 'green' : 'red'}
                icon={
                  item.status === PARTNER_ITEM_STATUS.ACTIVE ? (
                    <CheckCircleOutlined />
                  ) : (
                    <CloseCircleOutlined />
                  )
                }
              >
                {item.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} />
            </Descriptions.Item>
          </Descriptions>
          <Space direction="horizontal" style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flex: 1 }}>
              <Image className={styles.image} preview={false} src={item.imageLink} />
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
              <Image className={styles.image} preview={false} src={item.imageLink} />
            </div>
            <div style={{ display: 'flex', flex: 1 }}>
              <Image className={styles.image} preview={false} src={item.imageLink} />
            </div>
          </Space>
        </div>
      </div>
    );
  }
}

export default ItemInformation;
