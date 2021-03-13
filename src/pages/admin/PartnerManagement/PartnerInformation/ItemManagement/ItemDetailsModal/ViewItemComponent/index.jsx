import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Descriptions, Tag, Space, Card } from 'antd';
import Button from 'antd-button-color';
import 'antd-button-color/dist/css/style.less';
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
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
      <Card
        title={
          <Space direction="horizontal">
            {"Item's Information"}
            <EditOutlined style={{ color: '#1890ff' }} onClick={this.props.onChangeMode} />
          </Space>
        }
        extra={
          item.status === REQUESTED_ITEM_STATUS.PROCESS ? (
            <Space direction="horizontal">
              <Button
                type={item.status === PARTNER_ITEM_STATUS.ACTIVE ? 'danger' : 'success'}
                with="ghost"
                icon={<CheckOutlined style={{ fontSize: 15, color: 'green' }} />}
                onClick={() => {
                  alert('Handle Change Status');
                }}
              >
                Approve
              </Button>
              <Button
                type={item.status === PARTNER_ITEM_STATUS.ACTIVE ? 'danger' : 'success'}
                with="ghost"
                icon={<CloseOutlined style={{ fontSize: 15, color: 'red' }} />}
                onClick={() => {
                  alert('Handle Change Status');
                }}
              >
                Reject
              </Button>
            </Space>
          ) : null
        }
      >
        <Descriptions
          column={1}
          contentStyle={{ fontWeight: 'bold' }}
          labelStyle={{ textAlign: 'left', width: '20%' }}
        >
          <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
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
          <Descriptions.Item label="Registration Date">
            {moment(item.createdAt).format(DATE_FORMAT)}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    );
  }
}

export default ViewItem;
