import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import NumberFormat from 'react-number-format';
import { Descriptions, Space, Table, Row, Col, Steps, Skeleton, List, Tag } from 'antd';
import Button from 'antd-button-color';
import 'antd-button-color/dist/css/style.less';
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import CancelOrderModal from '../CancelOrderModal/index';
import ConfirmationPopup from '../../../../components/atom/ConfirmationPopup/index';
import {
  ORDER_STATUS,
  DATE_TIME_FORMAT,
  TIME_FORMAT,
  CANCEL_ORDER_REASON,
} from '../../../../../config/constants';
import { convertStringToCamel } from '../../../../utils/utils';
import styles from './index.less';

@connect(({ order, loading }) => ({
  order: order.order,
}))
class OrderInformation extends React.Component {
  state = {
    visibleCloseOrder: false,
    closeOrder: {},
    visibleCancelOrder: false,
    cancelOrder: {},
    isDone: false,
  };
  componentWillMount() {
    const { dispatch } = this.props;
    const url = window.location.href;
    const id = url.substring(url.indexOf('=') + 1);
    dispatch({
      type: 'order/getOrder',
      payload: {
        id: id,
      },
    });
    this.setState({ isDone: true });
  }

  handleViewTransaction = (transaction = []) => {
    if (this.props.order) {
      const result = Array.from(transaction, t => {
        return (
          <Steps.Step
            status="process"
            title={convertStringToCamel(t.toStatus)}
            subTitle={moment(t.createdAt).format(TIME_FORMAT)}
          />
        );
      });
      return result;
    }
  };
  handleViewReason = (order = {}) => {
    if (order && order != {} && order != null) {
      const cancelledTransaction = order.transaction.find(
        t => t.toStatus === ORDER_STATUS.CANCELLATION,
      );
      if (JSON.parse(cancelledTransaction.description)) {
        const viewedReason = [];
        const reason = JSON.parse(cancelledTransaction.description).reason;
        const note = JSON.parse(cancelledTransaction.description).note
          ? JSON.parse(cancelledTransaction.description).note
          : '';
        const requestBy = JSON.parse(cancelledTransaction.description).requestBy.split('_')[0];
        reason.forEach(r => {
          viewedReason.push(CANCEL_ORDER_REASON.find(e => e.value === r));
        });
        return (
          <List
            dataSource={viewedReason}
            renderItem={item => {
              return item.value !== 'OTHER'
                ? `[${requestBy}] ${item.label}`
                : JSON.parse(cancelledTransaction.description).note
                ? `[${requestBy}] ${note}`
                : `[${requestBy}] Reason`;
            }}
          />
        );
      } else {
        return '-';
      }
    }
  };
  getTagStatusColors = record => {
    switch (record.status) {
      case ORDER_STATUS.RECEPTION:
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
        };
      case ORDER_STATUS.REJECTION:
        return {
          color: 'error',
          icon: <CloseCircleOutlined />,
        };
      case ORDER_STATUS.CANCELLATION:
        return {
          color: 'default',
          icon: <CloseCircleOutlined />,
        };
      case ORDER_STATUS.CLOSURE:
        return {
          color: 'default',
          icon: <CheckCircleOutlined />,
        };
      default:
        return {
          color: 'processing',
          icon: <SyncOutlined spin />,
        };
    }
  };

  handleVisibleCloseOrder = order => {
    this.setState({
      visibleCloseOrder: true,
      closeOrder: {
        id: order.id,
        from: order.status,
        to: ORDER_STATUS.RECEPTION,
        property: "order's status",
        visible: true,
      },
    });
  };
  hideModalCloseOrder = () => {
    this.setState({
      visibleCloseOrder: false,
    });
  };
  handleCloseOrder = () => {
    this.hideModalCloseOrder();
    const { dispatch } = this.props;
    dispatch({
      type: 'order/closeOrder',
      payload: {
        status: ORDER_STATUS.RECEPTION,
        id: this.state.closeOrder.id,
      },
    });
  };

  handleVisibleCancelOrder = order => {
    this.setState({
      visibleCancelOrder: true,
      cancelOrder: {
        order: order,
        id: order.id,
        customerPhone: order.customer.phone,
        partnerName: order.partner.name,
        customerId: order.customer.id,
        partnerId: order.partner.id,
      },
    });
  };
  hideModalCancelOrder = () => {
    this.setState({
      visibleCancelOrder: false,
    });
  };
  handleCancelOrder = values => {
    console.log('values', values);
    this.hideModalCancelOrder();
    const reason = JSON.stringify(values);
    const { dispatch } = this.props;
    dispatch({
      type: 'order/cancelOrder',
      payload: {
        status: ORDER_STATUS.CANCELLATION,
        id: this.state.cancelOrder.id,
        description: reason,
      },
    });
  };

  render() {
    const { order } = this.props;
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
    return this.state.isDone ? (
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
              <Descriptions.Item label="">
                <br />
                <br />
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
            <Descriptions
              column={1}
              contentStyle={{ display: 'flex', flex: 1 }}
              title="Other Information"
            >
              <Descriptions.Item label="Date">
                {moment(order.createdAt).format(DATE_TIME_FORMAT)}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag
                  color={this.getTagStatusColors(order).color}
                  icon={this.getTagStatusColors(order).icon}
                >
                  {convertStringToCamel(order.status)}
                </Tag>
              </Descriptions.Item>
              {order.status === ORDER_STATUS.CANCELLATION ? (
                <Descriptions.Item label="Reason">{this.handleViewReason(order)}</Descriptions.Item>
              ) : (
                <Descriptions.Item label="">
                  <br />
                  <br />
                </Descriptions.Item>
              )}
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
          <br />
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
                      icon={<CheckOutlined style={{ fontSize: 15, color: 'green' }} />}
                      onClick={() => {
                        this.handleVisibleCloseOrder(order);
                      }}
                    >
                      Finish
                    </Button>
                    <Button
                      style={{ width: '100%' }}
                      type="danger"
                      with="ghost"
                      icon={<CloseOutlined style={{ fontSize: 20, color: 'red' }} />}
                      onClick={() => {
                        this.handleVisibleCancelOrder(order);
                      }}
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
        <CancelOrderModal
          visible={this.state.visibleCancelOrder}
          order={this.state.cancelOrder}
          hideModal={this.hideModalCancelOrder}
          submitModal={values => {
            this.handleCancelOrder(values);
          }}
        />
        <ConfirmationPopup
          visible={this.state.visibleCloseOrder}
          message={this.state.closeOrder}
          hideModal={this.hideModalCloseOrder}
          onClickOK={this.handleCloseOrder}
        />
      </div>
    ) : (
      <Skeleton active />
    );
  }
}

export default OrderInformation;
