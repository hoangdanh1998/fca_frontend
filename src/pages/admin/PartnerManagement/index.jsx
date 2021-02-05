import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Select, Tooltip, Space, Switch } from 'antd';
import DataTable from '../../../components/atom/DataTable/index';
import HeaderLayout from '@/components/atom/Header';
import ConfirmationPopup from '../../../components/atom/ConfirmationPopup/index.jsx';
import SearchPartnerModal from '../PartnerManagement/SearchPartnerModal/index.jsx';
import CloseStoreModal from '../PartnerManagement/CloseStoreModal/index.jsx';
import { PARTNER_STATUS_OPTIONS, DATE_FORMAT } from '../../../../config/constants';
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
    visibleChangeOpenClose: false,
    partner: {},
    partnerLicense: {},
    openedStore: {},
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

  handleOpenCloseStore = (checked, record) => {
    this.setState({
      visibleChangeOpenClose: true,
      openedStore: {
        storeName: record.storeName,
        storeId: record.storeName,
        isOpen: checked,
        undoneOrder: 5,
      },
    });
  };
  hideModalOpenCloseStore = () => {
    this.setState({
      visibleChangeOpenClose: false,
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
        title: 'Opening',
        render: (text, record, index) => (
          <Tooltip placement="top" title="Open/Close Store">
            <Switch
              checkedChildren="Open"
              unCheckedChildren="Close"
              checked={true}
              onChange={checked => this.handleOpenCloseStore(checked, record)}
            />
          </Tooltip>
        ),
        // width: '5%',
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
        sorter: (a, b) =>
          moment(a.expirationDate, DATE_FORMAT) - moment(b.expirationDate, DATE_FORMAT),
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: () => (
          <Space direction="horizontal" style={{ display: 'flex' }}>
            <Tooltip placement="top" title="View Partner's details">
              <EyeOutlined className={styles.icon} size="small" onClick={this.handleViewPartner} />
            </Tooltip>
            <Tooltip placement="top" title="Edit Partner">
              <EditOutlined className={styles.icon} size="small" />
            </Tooltip>
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
          {this.state.visibleChangeOpenClose ? (
            <CloseStoreModal
              storeName={this.state.openedStore.storeName}
              undoneOrder={this.state.openedStore.undoneOrder}
              isOpen={this.state.openedStore.isOpen}
              hideModal={this.hideModalOpenCloseStore}
            ></CloseStoreModal>
          ) : null}
          <DataTable columnList={columnList} dataList={PARTNER_LIST} totalRecords={30} />
        </div>
      </>
    );
  }
}

export default PartnerManagement;
