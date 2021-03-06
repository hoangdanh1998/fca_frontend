import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import NumberFormat from 'react-number-format';
import { Descriptions, Space, Table, Row, Col, Steps } from 'antd';
import Button from 'antd-button-color';
import 'antd-button-color/dist/css/style.less';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  ORDER_STATUS,
  DATE_TIME_FORMAT_CALL_API,
  DATE_TIME_FORMAT,
  TIME_FORMAT,
} from '../../../../../config/constants';
import { convertStringToCamel } from '../../../../utils/utils';
import styles from './index.less';

@connect(({ order, loading }) => ({
  order: order.order,
}))
class OrderInformation extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const url = window.location.href;
    const id = url.substring(url.indexOf('=') + 1);
    dispatch({
      type: 'order/getOrder',
      payload: {
        id: id,
      },
    });
  }

  handleViewTransaction = (transaction = []) => {
    if (this.props.order) {
      const result = Array.from(transaction, t => {
        return (
          <Steps.Step
            status="finish"
            title={convertStringToCamel(t.toStatus)}
            subTitle={moment(t.createdAt).format(TIME_FORMAT)}
          />
        );
      });
      return result;
    }
  };

  render() {
    const { order } = this.props;
    console.log('transaction', Object.assign({}, order));
    const itemColumns = [
      {
        title: 'No.',
        render: (text, record, index) => {
          return index + 1;
        },
        align: 'right',
        width: '2%',
      },
      {
        title: 'Item',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Unit Price',
        dataIndex: 'price',
        key: 'price',
        render: (text, record, index) => {
          return (
            <NumberFormat value={record.price} displayType={'text'} thousandSeparator={true} />
          );
        },
        align: 'right',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'right',
        width: '2%',
      },
      {
        title: 'Sub-total',
        render: (text, record, index) => {
          return (
            <NumberFormat
              value={record.price * record.quantity}
              displayType={'text'}
              thousandSeparator={true}
            />
          );
        },
        align: 'right',
      },
    ];
    return (
      <div className={styles.applicationManagementContainer}>
        <Space
          direction="vertical"
          style={{
            fontSize: 20,
            color: 'black',
            backgroundColor: 'white',
            display: 'flex',
            padding: '2.5%',
          }}
        >
          <Space direction="horizontal" style={{ display: 'flex', flex: 1 }}>
            <Descriptions column={1} contentStyle={{ display: 'flex', flex: 1 }} title="Customer">
              <Descriptions.Item label="Name">
                {Object.assign({}, order.customer).name}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {Object.assign({}, order.customer).phone}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions column={1} contentStyle={{ display: 'flex', flex: 1 }} title="Partner">
              <Descriptions.Item label="Name">
                {Object.assign({}, order.partner).name}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {Object.assign({}, order.partner).phone}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {Object.assign({}, Object.assign({}, order.partner).address).description}
              </Descriptions.Item>
            </Descriptions>
            <Descriptions column={1} contentStyle={{ display: 'flex', flex: 1 }} title="Date">
              <Descriptions.Item>
                {moment(order.createdAt).format(DATE_TIME_FORMAT)}
              </Descriptions.Item>
            </Descriptions>
          </Space>
          <Table
            className={styles.table}
            dataSource={order.items}
            columns={itemColumns}
            bordered
            pagination={false}
            footer={() => {
              return (
                <Row>
                  <Col flex={3} style={{ textAlign: 'left' }}>
                    Total
                  </Col>
                  <Col flex={1} style={{ textAlign: 'right' }}>
                    <NumberFormat
                      value={order.total}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                  </Col>
                </Row>
              );
            }}
          ></Table>
          <Descriptions
            title="Order Transaction"
            extra={
              <Space direction="horizontal">
                {order.status !== ORDER_STATUS.REJECTION &&
                order.status !== ORDER_STATUS.CANCELLATION &&
                order.status !== ORDER_STATUS.CLOSURE &&
                order.status !== ORDER_STATUS.RECEPTION ? (
                  <>
                    <Button
                      style={{ width: '100%' }}
                      type="success"
                      with="ghost"
                      icon={
                        <CheckOutlined
                          onClick={() => {}}
                          style={{ fontSize: 15, color: 'green' }}
                        />
                      }
                      onClick={() => {}}
                    >
                      Finish
                    </Button>
                    <Button
                      style={{ width: '100%' }}
                      type="danger"
                      with="ghost"
                      icon={
                        <CloseOutlined onClick={() => {}} style={{ fontSize: 20, color: 'red' }} />
                      }
                      onClick={() => {}}
                    >
                      Cancel
                    </Button>
                  </>
                ) : null}
              </Space>
            }
          >
            <Descriptions.Item>
              <br />
              <Steps progressDot>{this.handleViewTransaction(order?.transaction)}</Steps>
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </div>
    );
  }
}

export default OrderInformation;
