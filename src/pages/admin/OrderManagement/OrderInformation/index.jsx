import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import NumberFormat from 'react-number-format';
import { Descriptions, Space, Table, Row, Col, Skeleton, Tag, Timeline } from 'antd';
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
import ExceptionBody from '../../../../components/ExceptionBody/index';
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
  isError: order.isError,
}))
class OrderInformation extends React.Component {
  state = {
    visibleCloseOrder: false,
    closeOrder: {},
    visibleCancelOrder: false,
    cancelOrder: {},
    loading: false,
  };

  async componentWillMount() {
    this.setState({ loading: true });
    const { dispatch } = this.props;
    const url = window.location.href;
    const id = url.substring(url.indexOf('=') + 1);
    await dispatch({
      type: 'order/getOrder',
      payload: {
        id: id,
      },
    });
    this.setState({ loading: false });
  }

  handleViewTransaction = (transaction = []) => {
    if (this.props.order) {
      const result = Array.from(transaction, t => {
        return (
          // <Steps.Step
          //   status="process"
          //   title={convertStringToCamel(t.toStatus)}
          //   subTitle={moment(t.createdAt).format(TIME_FORMAT)}
          // />
          <Timeline.Item label={moment(t.createdAt).format(TIME_FORMAT)}>
            {convertStringToCamel(t.toStatus)}
          </Timeline.Item>
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
      if (cancelledTransaction) {
        return cancelledTransaction.description;
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
  handleCloseOrder = async () => {
    this.hideModalCloseOrder();
    const { dispatch } = this.props;
    await dispatch({
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
        customer: order.customer,
        partner: order.partner,
      },
    });
  };
  hideModalCancelOrder = () => {
    this.setState({
      visibleCancelOrder: false,
    });
  };
  handleCancelOrder = async values => {
    // const convertedReason = Array.from(values.reason, r => {
    //   return `${CANCEL_ORDER_REASON.find(tmp => tmp.value === r).label}${
    //     values.note && values.note != '' ? ' - ' + values.note : ''
    //   }`;
    // });
    const convertedReason = `${values.reason}${
      values.note && values.note != '' ? ' - ' + values.note : ''
    }`;
    const description = `[${
      values.requestBy.includes('PARTNER') ? 'Cửa hàng' : 'Khách'
    } huỷ] ${convertedReason}`;
    const requestBy = values.requestBy.includes('PARTNER')
      ? this.state.cancelOrder.partner
      : this.state.cancelOrder.customer;
    const { dispatch } = this.props;
    await dispatch({
      type: 'order/cancelOrder',
      payload: {
        status: ORDER_STATUS.CANCELLATION,
        id: this.state.cancelOrder.id,
        description: description,
        requestBy: JSON.stringify(requestBy),
        reason: values.reason,
      },
    });
    this.hideModalCancelOrder();
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
      },
      {
        title: 'Item',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
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
    return this.props.isError ? (
      <ExceptionBody />
    ) : (
      <div className={styles.applicationManagementContainer}>
        {this.state.loading ? (
          <Skeleton loading={this.state.loading} />
        ) : (
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
                  {Object.assign({}, Object.assign({}, order.partner).account).phone}
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
                <Descriptions.Item label="Reason">{this.handleViewReason(order)}</Descriptions.Item>
              </Descriptions>
            </Space>
            <Space direction="horizontal" style={{ width: '95%' }}>
              <Descriptions column={2} title="Order's items">
                <Descriptions.Item label="">
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
                  />
                </Descriptions.Item>
                <Descriptions.Item label="">
                  <Descriptions
                    column={1}
                    title="Order's Transaction"
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
                      <Timeline reverse style={{ width: '50%' }} mode="left" reverse>
                        {this.handleViewTransaction(order?.transaction)}
                      </Timeline>
                    </Descriptions.Item>
                  </Descriptions>
                </Descriptions.Item>
              </Descriptions>
            </Space>
          </Space>
        )}
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
    );
  }
}

export default OrderInformation;
