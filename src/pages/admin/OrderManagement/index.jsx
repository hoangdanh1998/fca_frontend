import React from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import moment from 'moment';
import { Space, Tooltip } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined, EyeOutlined } from '@ant-design/icons';
import DataTable from './DataTable/index';
import CancelOrderModal from '../OrderManagement/CancelOrderModal/index.jsx';
import ConfirmationPopup from '../../../components/atom/ConfirmationPopup/index.jsx';
import styles from './index.less';
import { convertStringToCamel } from '../../../utils/utils';
import { DATE_FORMAT, ORDER_STATUS } from '../../../../config/constants';

@connect(({ order, loading }) => ({}))
class OrderManagement extends React.Component {
  state = { visibleCancelOrder: false, visibleChangeStatus: false, order: {}, page: 1 };

  setPage = page => {
    this.setState({ page: page });
  };

  handleVisibleCancelOrder = (record, index) => {
    this.setState({
      visibleCancelOrder: true,
      order: {
        i: index + 1,
        id: record.id,
        customer: record.customer.phone,
        partner: record.partner.name,
      },
    });
  };

  hideModal = () => {
    this.setState({
      visibleCancelOrder: false,
    });
  };

  handleVisibleCloseOrder = (record, index) => {
    this.setState({
      visibleChangeStatus: true,
      order: {
        name: `#${index + 1}`,
        id: record.id,
        from: record.status,
        to: 'CLOSURE',
        property: "order's status",
        visible: true,
      },
    });
  };
  hideModalCloseOrder = () => {
    this.setState({
      visibleChangeStatus: false,
    });
  };
  handleCloseOrder = () => {
    this.hideModalCloseOrder();
    const { dispatch } = this.props;
    dispatch({
      type: 'order/closeOrder',
      payload: {
        status: ORDER_STATUS.CLOSURE,
        id: this.state.order.id,
      },
    });
  };

  render() {
    const columnList = [
      {
        title: 'No.',
        render: (text, record, index) => {
          return index + 1;
        },
        width: '5%',
      },
      {
        title: 'Customer Phone',
        dataIndex: ['customer', 'phone'],
        key: ['customer', 'phone'],
        width: '20%',
      },
      {
        title: 'Partner Store',
        dataIndex: ['partner', 'name'],
        key: ['partner', 'name'],
        width: '40%',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => {
          return convertStringToCamel(record.status);
        },
      },
      {
        title: 'Order Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: (a, b) => moment(a.createdAt, DATE_FORMAT) - moment(b.createdAt, DATE_FORMAT),
        render: (text, record, index) => {
          return moment(record.createdAt).format(DATE_FORMAT);
        },
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => (
          <Space direction="horizontal" style={{ display: 'flex' }}>
            <Tooltip placement="top" title="View Order's details">
              <EyeOutlined className={styles.icon} size="small" />
            </Tooltip>
            <Tooltip placement="top" title="Complete Order">
              <CheckCircleOutlined
                className={styles.icon}
                size="small"
                style={{ color: 'green' }}
                onClick={() => this.handleVisibleCloseOrder(record, index)}
              />
            </Tooltip>
            <Tooltip placement="top" title="Cancel Order">
              <CloseCircleOutlined
                style={{ color: 'red' }}
                className={styles.icon}
                onClick={() => this.handleVisibleCancelOrder(record, index)}
                size="small"
              />
            </Tooltip>
          </Space>
        ),
      },
    ];
    return (
      <>
        <div direction="horizontal" className={styles.applicationManagementContainer}>
          <CancelOrderModal
            visible={this.state.visibleCancelOrder}
            order={this.state.order}
            hideModal={this.hideModal}
          />
          <ConfirmationPopup
            visible={this.state.visibleChangeStatus}
            message={this.state.order}
            hideModal={this.hideModalCloseOrder}
            onClickOK={this.handleCloseOrder}
          />
          <DataTable columnList={columnList} />
        </div>
      </>
    );
  }
}

export default OrderManagement;
