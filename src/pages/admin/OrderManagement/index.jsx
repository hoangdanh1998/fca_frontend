import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Space, Tooltip } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined, EyeOutlined } from '@ant-design/icons';
import DataTable from './DataTable/index';
import CancelOrderModal from '../OrderManagement/CancelOrderModal/index.jsx';
import SearchOrderModal from '../OrderManagement/SearchOrderModal/index.jsx';
import ConfirmationPopup from '../../../components/atom/ConfirmationPopup/index.jsx';
import styles from './index.less';
import { convertStringToCamel } from '../../../utils/utils';
import { ORDER_LIST } from '../../../../config/seedingData';
import { DATE_FORMAT } from '../../../../config/constants';

@connect(({ order, loading }) => ({}))
class OrderManagement extends React.Component {
  state = { visibleCancelOrder: false, order: {} };

  handleVisibleCancelOrder = (record, index) => {
    this.setState({
      visibleCancelOrder: true,
      order: {
        i: index + 1,
        customer: record.customer.phone,
        partner: record.partner.phone,
      },
    });
  };

  hideModal = () => {
    this.setState({
      visibleCancelOrder: false,
    });
  };

  handleStatusChange = (record, index) => {
    this.setState({
      visibleChangeStatus: true,
      partner: {
        name: `#${index + 1}`,
        from: record.status,
        to: 'CLOSURE',
        property: "order's status",
        visible: true,
      },
    });
  };
  hideModalStatus = () => {
    this.setState({
      visibleChangeStatus: false,
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
                onClick={() => this.handleStatusChange(record, index)}
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
          <div className={styles.applicationHeader}>
            <SearchOrderModal />
          </div>
          <CancelOrderModal visible={this.state.visibleCancelOrder} hideModal={this.hideModal} />
          {this.state.visibleChangeStatus ? (
            <ConfirmationPopup
              message={this.state.partner}
              hideModal={this.hideModalStatus}
            ></ConfirmationPopup>
          ) : null}
          <DataTable columnList={columnList} dataList={ORDER_LIST} totalRecords={30} />
        </div>
      </>
    );
  }
}

export default OrderManagement;
