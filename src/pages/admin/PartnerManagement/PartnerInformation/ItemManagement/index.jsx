import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Select, Card } from 'antd';
import DataTable from '../../../../../components/atom/DataTable/index.jsx';
import ConfirmationPopup from '../../../../../components/atom/ConfirmationPopup/index.jsx';
import { ITEM_STATUS_OPTIONS, DATE_FORMAT } from '../../../../../../config/constants';
import {
  PARTNER_ITEM_LIST,
  IMAGE_ADDRESS,
  FCA_ITEM_LIST,
} from '../../../../../../config/seedingData';
import styles from './index.less';

// @connect(({ admin, loading }) => ({
//   fetchCurrentAdmin: loading.effects['admin/saveCurrentAdmin'],
//   visibleContact: admin.visibleCreateContact,
// }))
class ItemManagement extends React.Component {
  state = {
    visibleChangeStatus: false,
    visibleFCAGroupChange: false,
    partner: {},
    itemFCAGroup: {},
  };

  handleStatusChange = (value, record) => {
    this.setState({
      visibleChangeStatus: true,
      partner: {
        storeName: record.itemName,
        from: record.itemStatus,
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
  handleFCAGroupChange = (value, record) => {
    this.setState({
      visibleFCAGroupChange: true,
      itemFCAGroup: {
        storeName: record.itemName,
        from: record.fcaGroup,
        to: value,
        title: 'FCA Group',
        visible: true,
      },
    });
  };

  hideModalFCAGroup = () => {
    this.setState({
      visibleFCAGroupChange: false,
    });
  };

  render() {
    const columnList = [
      {
        title: 'Item Name',
        dataIndex: 'itemName',
        key: 'itemName',
        width: '25%',
      },
      {
        title: 'Item Price',
        dataIndex: 'itemPrice',
        key: 'itemPrice',
        width: '10%',
      },
      {
        title: 'FCA Group',
        dataIndex: 'fcaGroup',
        key: 'fcaGroup',
        width: '10%',
        render: (text, record, index) => (
          <Select
            size="small"
            defaultValue={record.fcaGroup}
            onChange={value => {
              this.handleFCAGroupChange(value, record);
            }}
            style={{ width: '100%' }}
            options={FCA_ITEM_LIST}
          />
        ),
      },
      {
        title: 'Item Status',
        dataIndex: 'itemStatus',
        key: 'itemStatus',
        width: '10%',
        render: (text, record, index) => (
          <Select
            size="small"
            defaultValue={record.itemStatus}
            onChange={value => {
              this.handleStatusChange(value, record);
            }}
            style={{ width: '100%' }}
            options={ITEM_STATUS_OPTIONS}
          />
        ),
      },

      {
        title: 'Item Image',
        render: () => (
          <a href={IMAGE_ADDRESS}>
            <p>{IMAGE_ADDRESS}</p>
          </a>
        ),
        width: '25%',
      },
      {
        title: 'Register Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        width: '10%',
      },
    ];
    return (
      <>
        <div className={styles.applicationManagementContainer}>
          {this.state.visibleChangeStatus ? (
            <ConfirmationPopup
              message={this.state.partner}
              hideModal={this.hideModalStatus}
            ></ConfirmationPopup>
          ) : null}
          {this.state.visibleFCAGroupChange ? (
            <ConfirmationPopup
              message={this.state.itemFCAGroup}
              hideModal={this.hideModalFCAGroup}
            ></ConfirmationPopup>
          ) : null}
          <DataTable columnList={columnList} dataList={PARTNER_ITEM_LIST} totalRecords={30} />
        </div>
      </>
    );
  }
}

export default ItemManagement;
