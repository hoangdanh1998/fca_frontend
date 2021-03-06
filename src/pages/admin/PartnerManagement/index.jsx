import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Space, Tag } from 'antd';
import DataTable from '../PartnerManagement/DataTable/index.jsx';
import ConfirmationPopup from '../../../components/atom/ConfirmationPopup/index.jsx';
import { DATE_FORMAT, DATE_FORMAT_CALL_API, PARTNER_STATUS } from '../../../../config/constants';
import { convertStringToCamel } from '../../../utils/utils';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
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
  getTagStatusColors = record => {
    switch (record.status) {
      case PARTNER_STATUS.APPROVED:
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
        };
      case PARTNER_STATUS.REJECTED:
        return {
          color: 'error',
          icon: <CloseCircleOutlined />,
        };
      case PARTNER_STATUS.PROCESS:
        return {
          color: 'processing',
          icon: <ClockCircleOutlined />,
        };
    }
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
        align: 'right',
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
        render: (text, record, index) => {
          return (
            <Tag
              color={this.getTagStatusColors(record).color}
              icon={this.getTagStatusColors(record).icon}
            >
              {convertStringToCamel(record.status)}
            </Tag>
          );
        },
      },
      {
        title: 'Expiration Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'right',
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
          <DataTable columnList={columnList} />
        </div>
      </>
    );
  }
}

export default PartnerManagement;
