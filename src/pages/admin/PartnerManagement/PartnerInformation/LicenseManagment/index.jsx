import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import DataTable from '../../../../../components/atom/DataTable/index.jsx';
import InsertButton from '../../../../../components/atom/InsertButton/index.jsx';
import ExpandLicenseModal from '../LicenseManagment/ExpandLicenseModal/index.jsx';
import styles from './index.less';
import { PARTNER_LICENSE_LIST, PARTNER_LAST_LICENSE } from '../../../../../../config/seedingData';
import { DATE_FORMAT } from '../../../../../../config/constants';

@connect(({ admin, loading }) => ({
  fetchCurrentAdmin: loading.effects['admin/saveCurrentAdmin'],
  visibleContact: admin.visibleCreateContact,
}))
class LicenseManagement extends React.Component {
  state = { visibleChangeExpirationDate: false, partnerLicense: PARTNER_LAST_LICENSE };

  handleChangeExpirationDate = () => {
    this.setState({
      visibleChangeExpirationDate: true,
    });
  };

  hideModalExpirationDate = () => {
    this.setState({
      visibleChangeExpirationDate: false,
    });
  };

  render() {
    console.log('last license', PARTNER_LAST_LICENSE);
    const columnList = [
      {
        title: 'No.',
        render: (text, object, index) => {
          return index + 1;
        },
        width: '5%',
      },
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
            <InsertButton onClick={this.handleChangeExpirationDate} />
          </div>
          {this.state.visibleChangeExpirationDate ? (
            <ExpandLicenseModal
              storeLicense={this.state.partnerLicense}
              hideModal={this.hideModalExpirationDate}
            ></ExpandLicenseModal>
          ) : null}
          <DataTable columnList={columnList} dataList={PARTNER_LICENSE_LIST} totalRecords={30} />
        </div>
      </>
    );
  }
}

export default LicenseManagement;
