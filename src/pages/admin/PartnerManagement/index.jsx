import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Select, Tooltip, Space, Switch } from 'antd';
import DataTable from '../PartnerManagement/DataTable/index.jsx';
import ConfirmationPopup from '../../../components/atom/ConfirmationPopup/index.jsx';
import EditProfileModal from './EditProfileModal/index';
import CloseStoreModal from '../PartnerManagement/CloseStoreModal/index.jsx';
import {
  PARTNER_STATUS_OPTIONS,
  DATE_FORMAT,
  DATE_FORMAT_CALL_API,
  PARTNER_STATUS,
} from '../../../../config/constants';
import { convertStringToCamel } from '../../../utils/utils';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './index.less';

@connect(({ partner, loading }) => ({}))
class PartnerManagement extends React.Component {
  state = {
    visibleChangeStatus: false,
    visibleChangeExpirationDate: false,
    visibleChangeOpenClose: false,
    visibleEditProfile: false,
    partner: {},
    partnerLicense: {},
    partnerProfile: {},
    openedStore: {},
  };

  handleViewPartner = record => {
    router.push(`/fca-management/partner-management/partner-information?id=${record.id}`);
  };

  handleVisibleChangeStatus = (value, record) => {
    this.setState({
      visibleChangeStatus: true,
      partner: {
        id: record.id,
        name: record.name,
        from: record.status,
        to: value,
        property: 'status',
        visible: true,
      },
    });
  };
  hideModalStatus = () => {
    this.setState({
      visibleChangeStatus: false,
    });
  };
  handleChangeStatus = () => {
    this.hideModalStatus();
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/updatePartnerStatus',
      payload: {
        status: this.state.partner.to,
        id: this.state.partner.id,
      },
    });
  };

  handleOpenCloseStore = (checked, record) => {
    this.setState({
      visibleChangeOpenClose: true,
      openedStore: {
        storeName: record.name,
        storeId: record.id,
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

  handleVisibleEditProfile = record => {
    this.setState({
      visibleEditProfile: true,
      partnerProfile: record,
    });
  };
  hideModalEditProfile = () => {
    this.setState({ visibleEditProfile: false });
  };

  render() {
    const columnList = [
      {
        title: 'No.',
        render: (text, record, index) => {
          return index + 1;
        },
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
      },
      {
        title: 'Address',
        dataIndex: ['address', 'description'],
        key: ['address', 'description'],
        width: '40%',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        // render: (text, record, index) => (
        //   <Select
        //     size="small"
        //     onChange={value => {
        //       this.handleVisibleChangeStatus(value, record);
        //     }}
        //     value={record.status}
        //     style={{ width: '100%' }}
        //     options={PARTNER_STATUS_OPTIONS}
        //   />
        // ),
        render: (text, record, index) => {
          return convertStringToCamel(record.status);
        },
      },
      {
        title: 'Expiration Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: (a, b) =>
          moment(a.createdAt, DATE_FORMAT_CALL_API) - moment(b.createdAt, DATE_FORMAT_CALL_API),
        render: (text, record, index) => {
          return moment().format(DATE_FORMAT);
        },
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => (
          <Space direction="horizontal" style={{ display: 'flex' }}>
            <a href={`/fca-management/partner-management/partner-information?id=${record.id}`}>
              View
            </a>
            {/* <Tooltip placement="top" title="View Partner's details">
              <EyeOutlined
                className={styles.icon}
                size="small"
                onClick={() => {
                  this.handleViewPartner(record);
                }}
              />
            </Tooltip> */}
            {/* <Tooltip placement="top" title="Edit Partner's profile">
              <EditOutlined
                className={styles.icon}
                size="small"
                onClick={() => this.handleVisibleEditProfile(record)}
              />
            </Tooltip> */}
            {/* <Tooltip placement="top" title="Open/Close Store">
              <Switch
                checkedChildren="Open"
                unCheckedChildren="Close"
                checked={record.isOpen !== undefined && record.isOpen ? record.isOpen : false}
                onChange={checked => this.handleOpenCloseStore(checked, record)}
              />
            </Tooltip> */}
          </Space>
        ),
      },
    ];
    return (
      <>
        <div className={styles.applicationManagementContainer}>
          <ConfirmationPopup
            visible={this.state.visibleChangeStatus}
            message={this.state.partner}
            hideModal={this.hideModalStatus}
            onClickOK={this.handleChangeStatus}
          />
          {/* {this.state.visibleChangeOpenClose ? (
            <CloseStoreModal
              storeName={this.state.openedStore.storeName}
              undoneOrder={this.state.openedStore.undoneOrder}
              isOpen={this.state.openedStore.isOpen}
              hideModal={this.hideModalOpenCloseStore}
            ></CloseStoreModal>
          ) : null}
          <EditProfileModal
            visible={this.state.visibleEditProfile}
            partner={this.state.partnerProfile}
            hideModal={this.hideModalEditProfile}
          /> */}
          <DataTable columnList={columnList} />
        </div>
      </>
    );
  }
}

export default PartnerManagement;
