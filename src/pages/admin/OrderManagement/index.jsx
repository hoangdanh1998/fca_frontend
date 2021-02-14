import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Space, Tooltip } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined, EyeOutlined } from '@ant-design/icons';
import DataTable from '../../../components/atom/DataTable/index';
import CancelOrderModal from '../OrderManagement/CancelOrderModal/index.jsx';
import SearchOrderModal from '../OrderManagement/SearchOrderModal/index.jsx';
import ConfirmationPopup from '../../../components/atom/ConfirmationPopup/index.jsx';
import styles from './index.less';
import { convertStringToCamel } from '../../../utils/utils';
import { ORDER_LIST } from '../../../../config/seedingData';
import { DATE_FORMAT } from '../../../../config/constants';

@connect(({ admin, loading }) => ({
  fetchCurrentAdmin: loading.effects['admin/saveCurrentAdmin'],
  visibleContact: admin.visibleCreateContact,
}))
class OrderManagement extends React.Component {
  state = { visibleCancelOrder: false };

  handleVisibleCancelOrder = () => {
    this.setState({
      visibleCancelOrder: true,
    });
  };

  hideModal = () => {
    this.setState({
      visibleCancelOrder: false,
    });
  };

  handleStatusChange = record => {
    this.setState({
      visibleChangeStatus: true,
      partner: {
        name: record.customerPhone,
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
        render: (text, object, index) => {
          return index + 1;
        },
        width: '5%',
      },
      {
        title: 'Customer Phone',
        dataIndex: 'customerPhone',
        key: 'customerPhone',
        width: '20%',
      },
      {
        title: 'Partner Store',
        dataIndex: 'partnerStore',
        key: 'partnerStore',
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
        dataIndex: 'createdDate',
        key: 'createdDate',
        sorter: (a, b) => moment(a.createdDate, DATE_FORMAT) - moment(b.createdDate, DATE_FORMAT),
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
                onClick={() => this.handleStatusChange(record)}
              />
            </Tooltip>
            <Tooltip placement="top" title="Cancel Order">
              <CloseCircleOutlined
                style={{ color: 'red' }}
                className={styles.icon}
                onClick={this.handleVisibleCancelOrder}
                size="small"
              />
            </Tooltip>
          </Space>
        ),
      },
    ];
    return (
      <>
        {/* <div className={styles.wrapHeader}>
          <HeaderLayout page="order-management" title="Order Management" />
        </div> */}
        <div direction="horizontal" className={styles.applicationManagementContainer}>
          <div className={styles.applicationHeader}>
            <SearchOrderModal />
          </div>
          {this.state.visibleCancelOrder ? (
            <CancelOrderModal visible={this.state.visibleCancelOrder} hideModal={this.hideModal} />
          ) : null}
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
