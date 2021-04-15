import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Descriptions, Space, Image } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import {
  PARTNER_ITEM_STATUS,
  DATE_FORMAT,
  REQUESTED_ITEM_STATUS,
} from '../../../../../../../../config/constants';

class ViewItem extends React.Component {
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
    const { item } = this.props;
    return (
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
        <Descriptions.Item>
          <Image className={styles.bodyImage} preview={false} src={item.imageLink} />
        </Descriptions.Item>
      </Descriptions>
    );
  }
}

export default ViewItem;
