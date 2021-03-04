import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Descriptions, Space } from 'antd';
import Button from 'antd-button-color';
import 'antd-button-color/dist/css/style.less';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  ORDER_STATUS,
  DATE_TIME_FORMAT_CALL_API,
  DATE_TIME_FORMAT,
} from '../../../../../config/constants';
import styles from './index.less';

@connect(({ order, loading }) => ({
  order: order.order,
}))
class OrderInformation extends React.Component {
  componentDidMount() {
    console.log('componentDidMount');
    const { dispatch } = this.props;
    const url = window.location.href;
    const id = url.substring(url.indexOf('=') + 1);
    console.log('id', id);
    dispatch({
      type: 'order/getOrder',
      payload: {
        id: id,
      },
    });
  }

  render() {
    const { order } = this.props;
    console.log('order', order);
    return (
      <div className={styles.applicationManagementContainer}>
        <div
          style={{
            fontSize: 20,
            color: 'black',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Descriptions
            style={{ width: '90%' }}
            title={<Space direction="horizontal">{order.id}</Space>}
            className={styles.description}
            extra={
              <Space direction="horizontal">
                {order.status !== ORDER_STATUS.REJECTION ||
                order.status !== ORDER_STATUS.CANCELLATION ||
                order.status !== ORDER_STATUS.CLOSURE ? (
                  <>
                    <Button
                      style={{ width: '100%' }}
                      type="success"
                      with="ghost"
                      icon={
                        <CheckOutlined
                          onClick={() => {
                            // this.handleVisibleUpdateStatus(PARTNER_STATUS.APPROVED);
                          }}
                          style={{ fontSize: 15, color: 'green' }}
                        />
                      }
                      onClick={() => {
                        // this.handleVisibleUpdateStatus(PARTNER_STATUS.APPROVED);
                      }}
                    >
                      Finish
                    </Button>
                    <Button
                      style={{ width: '100%' }}
                      type="danger"
                      with="ghost"
                      icon={
                        <CloseOutlined
                          onClick={() => {
                            // this.handleVisibleUpdateStatus(PARTNER_STATUS.REJECTED);
                          }}
                          style={{ fontSize: 20, color: 'red' }}
                        />
                      }
                      onClick={() => {
                        // this.handleVisibleUpdateStatus(PARTNER_STATUS.REJECTED);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : null}
              </Space>
            }
          >
            <Descriptions.Item label="Customer">
              {Object.assign({}, order.customer).phone}
            </Descriptions.Item>
            <Descriptions.Item label="Partner">
              {Object.assign({}, order.partner).name}
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {moment(order.createdAt).format(DATE_TIME_FORMAT)}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    );
  }
}

export default OrderInformation;
