import React from 'react';
import { connect } from 'dva';
import { Space } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import DataTable from '../../../components/atom/DataTable/index';
import SearchText from '../../../components/atom/SearchText/index.jsx';
import HeaderLayout from '@/components/atom/Header';
import CancelOrderModal from '../OrderManagement/CancelOrderModal/index.jsx';
import styles from './index.less';
import { ORDER_LIST } from '../../../../config/seedingData';

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
              <EyeOutlined size="small" />
            </div>
            <div>
              <DeleteOutlined onClick={this.handleVisibleCancelOrder} size="small" />
            </div>
          </Space>
        ),
      },
    ];
    return (
      <>
        <div className={styles.wrapHeader}>
          <HeaderLayout page="partner-management" title="Order Management" />
        </div>
        <div className={styles.applicationManagementContainer}>
          <div className={styles.applicationHeader}>
            <div>
              <SearchText searchKeyword="customer phone, partner name" />
            </div>
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
