import React from 'react';
import { connect } from 'dva';
import { Space, DatePicker } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import DataTable from '../../../components/atom/DataTable/index';
import SearchText from '../PartnerManagement/SearchPartnerModal/index.jsx';
import HeaderLayout from '@/components/atom/Header';
import StatusFilter from '../../../components/atom/StatusFilter/index.jsx';
import CancelOrderModal from '../OrderManagement/CancelOrderModal/index.jsx';
import SearchOrderModal from '../OrderManagement/SearchOrderModal/index.jsx';
import styles from './index.less';
import { ORDER_LIST } from '../../../../config/seedingData';
import { ORDER_STATUS_FILTER, DATE_FORMAT } from '../../../../config/constants';

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
          <Space direction="vertical" className={styles.applicationHeader}>
            <SearchOrderModal />
          </Space>
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
