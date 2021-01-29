import React from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Select, DatePicker, Space } from 'antd';
import DrawerForm from '@/components/NewContact/contact';
import ContactModal from '@/components/DataTable';
import TableContact from '@/components/DataTable/index';
import DataTable from '../../../components/atom/DataTable/index';
import HeaderLayout from '@/components/atom/Header';
import StatusFilter from '../../../components/atom/StatusFilter/index.jsx';
import InsertButton from '../../../components/atom/InsertButton/index.jsx';
import ConfirmationPopup from '../../../components/atom/ConfirmationPopup/index.jsx';
import { PARTNER_STATUS_ARRAY, PARTNER_STATUS_OPTIONS } from '../../../../config/constants';
import { PARTNER_LIST } from '../../../../config/seedingData';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './index.less';

@connect(({ admin, loading }) => ({
  fetchCurrentAdmin: loading.effects['admin/saveCurrentAdmin'],
  visibleContact: admin.visibleCreateContact,
}))
class PartnerManagement extends React.Component {
  state = {
    contactID: '',
    visibleMergeContact: false,
    visibleChangeStatus: false,
    visibleChangeExpirationDate: false,
    partner: {},
  };

  showDrawer = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/handleVisibleCreateContact',
      payload: true,
    });
  };

  showDrawerCreate = () => {
    const { dispatch } = this.props;
    this.setState({
      contactID: '',
    });
    dispatch({
      type: 'admin/handleVisibleCreateContact',
      payload: true,
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/handleVisibleCreateContact',
      payload: false,
    });
  };

  showAddModal = () => {
    this.setState({
      modalAddVisible: true,
    });
  };

  showContactID = ID => {
    this.setState({
      contactID: ID,
    });
  };

  handleHandleID = () => {
    this.setState({
      contactID: '',
    });
  };

  mergeContact = () => {
    this.setState({
      visibleMergeContact: true,
    });
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
  handleExpirationDateChange = (value, record) => {
    this.setState({
      visibleChangeExpirationDate: true,
      partner: {
        storeName: record.storeName,
        from: record.expirationDate,
        to: moment(value).format('DD/MM/YYYY'),
        title: 'expiration date',
        visible: true,
      },
    });
  };
  hideModalStatus = () => {
    this.setState({
      visibleChangeStatus: false,
    });
  };
  hideModalExpirationDate = () => {
    this.setState({
      visibleChangeExpirationDate: false,
    });
  };

  render() {
    const { visibleContact } = this.props;
    const columnList = [
      {
        title: 'Store Name',
        dataIndex: 'storeName',
        key: 'storeName',
        width: '20%',
      },
      {
        title: 'Store Address',
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
        render: (text, record, index) => (
          <DatePicker
            style={{ width: '100%' }}
            defaultValue={moment(record.expirationDate, 'DD/MM/YYYY')}
            format="DD/MM/YYYY"
            onChange={value => {
              console.log('onchange');
              this.handleExpirationDateChange(value, record);
            }}
          />
        ),
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
              <EditOutlined size="small" />
            </div>
            {/* <DeleteOutlined /> */}
          </Space>
        ),
      },
    ];
    return (
      <>
        <div className={styles.wrapHeader}>
          <HeaderLayout page="partner-management" title="Partner Management" />
        </div>
        <div className={styles.applicationManagementContainer}>
          <div className={styles.applicationHeader}>
            <div>
              <StatusFilter statusList={PARTNER_STATUS_ARRAY} searchKeyword="name, address" />
            </div>
            <div className={styles.applicationManagementHeader}>
              <InsertButton onClick={this.showDrawerCreate} />
            </div>
          </div>
          {this.state.visibleChangeStatus ? (
            <ConfirmationPopup
              message={this.state.partner}
              hideModal={this.hideModalStatus}
            ></ConfirmationPopup>
          ) : null}
          {this.state.visibleChangeExpirationDate ? (
            <ConfirmationPopup
              message={this.state.partner}
              hideModal={this.hideModalExpirationDate}
            ></ConfirmationPopup>
          ) : null}
          <DataTable columnList={columnList} dataList={PARTNER_LIST} totalRecords={30} />
        </div>
      </>
    );
  }
}

export default PartnerManagement;
