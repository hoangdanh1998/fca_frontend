import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Space, DatePicker } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import DataTable from '../../../../../components/atom/DataTable/index.jsx';
import InsertButton from '../../../../../components/atom/InsertButton/index.jsx';
import styles from './index.less';
import { PARTNER_LICENSE_LIST } from '../../../../../../config/seedingData';
import { DATE_FORMAT } from '../../../../../../config/constants';

@connect(({ admin, loading }) => ({
  fetchCurrentAdmin: loading.effects['admin/saveCurrentAdmin'],
  visibleContact: admin.visibleCreateContact,
}))
class LicenseManagement extends React.Component {
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
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
        width: '25%',
      },
      {
        title: 'End Date',
        dataIndex: 'endDate',
        key: 'endDate',
        width: '25%',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: '25%',
      },
      {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        width: '25%',
      },
    ];
    return (
      <>
        {/* <div className={styles.wrapHeader}>
          <HeaderLayout page="order-management" title="Order Management" />
        </div> */}
        <div className={styles.applicationManagementContainer}>
          <div className={styles.applicationHeader}>
            <InsertButton />
          </div>
          <DataTable columnList={columnList} dataList={PARTNER_LICENSE_LIST} totalRecords={30} />
        </div>
      </>
    );
  }
}

export default LicenseManagement;
