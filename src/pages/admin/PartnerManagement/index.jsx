import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import DrawerForm from '@/components/NewContact/contact';
import TableContact from '@/components/DataTable/index';
import DataTable from '../../../components/atom/DataTable/index';
import ContactModal from '@/components/DataTable';
import HeaderLayout from '@/components/atom/Header';
import styles from './index.less';
import StatusFilter from '../../../components/atom/StatusFilter/index.jsx';
import InsertButton from '../../../components/atom/InsertButton/index.jsx';
import { ORDER_STATUS_ARRAY } from '../../../../config/constants';
import { PARTNER_LIST } from '../../../../config/seedingData';

@connect(({ admin, loading }) => ({
  fetchCurrentAdmin: loading.effects['admin/saveCurrentAdmin'],
  visibleContact: admin.visibleCreateContact,
}))
class PartnerManagement extends React.Component {
  state = { contactID: '', visibleMergeContact: false };

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

  render() {
    const { visibleContact } = this.props;
    const columnList = [
      {
        title: 'Store Name',
        dataIndex: 'storeName',
        key: 'storeName',
      },
      {
        title: 'Store Address',
        dataIndex: 'storeAddress',
        key: 'storeAddress',
      },
      {
        title: 'Status',
        dataIndex: 'storeStatus',
        key: 'storeStatus',
      },
      {
        title: 'Expiration Date',
        dataIndex: 'expirationDate',
        key: 'expirationDate',
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
              <StatusFilter statusList={ORDER_STATUS_ARRAY} searchKeyword="Customer Phone" />
            </div>
            <div className={styles.applicationManagementHeader}>
              <InsertButton onClick={this.showDrawerCreate} />
            </div>
          </div>
          {/* <ContactModal
            {...this.state}
            cancel={() => this.setState({ modalAddVisible: false })}
            onReload={this.onReloadTable}
          />

          {visibleContact ? (
            <DrawerForm
              cancel={this.handleCancel}
              contactID={this.state.contactID}
              deleteID={this.handleHandleID}
            />
          ) : null} */}

          {/* <TableContact onShowInfor={this.showDrawer} getContactID={this.showContactID} /> */}
          <DataTable
            columnList={columnList}
            dataList={PARTNER_LIST}
            totalRecords={30}
            isView={true}
            isEdit={true}
            isDelete={false}
          />
        </div>
      </>
    );
  }
}

export default PartnerManagement;
