import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Select, DatePicker, Space } from 'antd';
import DataTable from '../../../components/atom/DataTable/index';
import HeaderLayout from '@/components/atom/Header';
import ConfirmationPopup from '../../../components/atom/ConfirmationPopup/index.jsx';
import SearchPartnerModal from '../PartnerManagement/SearchPartnerModal/index.jsx';
import { PARTNER_STATUS_OPTIONS } from '../../../../config/constants';
import { PARTNER_LIST } from '../../../../config/seedingData';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './index.less';

// @connect(({ admin, loading }) => ({
//   fetchCurrentAdmin: loading.effects['admin/saveCurrentAdmin'],
//   visibleContact: admin.visibleCreateContact,
// }))
class PartnerManagement extends React.Component {
  state = {
    visibleChangeStatus: false,
    visibleChangeExpirationDate: false,
    partner: {},
    partnerLicense: {},
  };

  handleViewPartner = () => {
    router.push('/fca-management/partner-management/partner-information');
  };
  handleStatusChange = (value, record) => {
    this.setState({
      visibleChangeStatus: true,
      partner: {
        storeName: record.storeName,
        from: record.storeStatus,
        to: value,
        title: 'status',
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
        title: 'Name',
        dataIndex: 'storeName',
        key: 'storeName',
        width: '20%',
      },
      {
        title: 'Address',
        dataIndex: 'storeAddress',
        key: 'storeAddress',
        width: '40%',
      },
      {
        title: 'Status',
        dataIndex: 'storeStatus',
        key: 'storeStatus',
        render: (text, record, index) => (
          <Select
            size="small"
            defaultValue={record.storeStatus}
            onChange={value => {
              this.handleStatusChange(value, record);
            }}
            style={{ width: '100%' }}
            options={PARTNER_STATUS_OPTIONS}
          />
        ),
      },
      {
        title: 'Expiration Date',
        dataIndex: 'expirationDate',
        key: 'expirationDate',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: () => (
          <Space direction="horizontal">
            <div>
              <EyeOutlined className={styles.icon} size="small" onClick={this.handleViewPartner} />
            </div>
            <div>
              <EditOutlined className={styles.icon} size="small" />
            </div>
          </Space>
        ),
      },
    ];
    return (
      <>
        {/* <div className={styles.wrapHeader}>
          <HeaderLayout page="partner-management" title="Partner Management" />
        </div> */}
        <div className={styles.applicationManagementContainer}>
          <div className={styles.applicationHeader}>
            <SearchPartnerModal />
          </div>
          {this.state.visibleChangeStatus ? (
            <ConfirmationPopup
              message={this.state.partner}
              hideModal={this.hideModalStatus}
            ></ConfirmationPopup>
          ) : null}
          <DataTable columnList={columnList} dataList={PARTNER_LIST} totalRecords={30} />
        </div>
      </>
    );
  }
}

export default PartnerManagement;
