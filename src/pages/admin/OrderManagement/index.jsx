import React from 'react';
import { connect } from 'dva';
import { Space, DatePicker } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import DataTable from '../../../components/atom/DataTable/index';
import SearchText from '../../../components/atom/SearchText/index.jsx';
import HeaderLayout from '@/components/atom/Header';
import StatusFilter from '../../../components/atom/StatusFilter/index.jsx';
import CancelOrderModal from '../OrderManagement/CancelOrderModal/index.jsx';
import styles from './index.less';
import { ORDER_LIST } from '../../../../config/seedingData';
import { ORDER_STATUS_ARRAY, DATE_FORMAT } from '../../../../config/constants';

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

  render() {
    const columnList = [
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
      },
      {
        title: 'Order Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: () => (
          <Space direction="horizontal">
            <div>
              <EyeOutlined className={styles.icon} size="small" />
            </div>
            <div>
              <DeleteOutlined
                className={styles.icon}
                onClick={this.handleVisibleCancelOrder}
                size="small"
              />
            </div>
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
          <Space direction="horizontal" className={styles.applicationHeader}>
            <SearchText searchKeyword="customer phone, partner store" />
            {/* <SearchText searchKeyword="customer phone, partner name" /> */}
            <DatePicker style={{ width: '100%' }} format={DATE_FORMAT} />
          </Space>

          <div>
            <StatusFilter statusList={ORDER_STATUS_ARRAY} />
          </div>
          {this.state.visibleCancelOrder ? (
            <CancelOrderModal visible={this.state.visibleCancelOrder} hideModal={this.hideModal} />
          ) : null}
          <DataTable columnList={columnList} dataList={ORDER_LIST} totalRecords={30} />
        </div>
      </>
    );
  }
}

export default OrderManagement;
