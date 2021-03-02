import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import DataTable from './DataTable/index.jsx';
import InsertButton from '../../../../../components/atom/InsertButton/index.jsx';
import ExpandLicenseModal from '../LicenseManagment/ExpandLicenseModal/index.jsx';
import styles from './index.less';
import { PARTNER_LICENSE_LIST, PARTNER_LAST_LICENSE } from '../../../../../../config/seedingData';
import { DATE_FORMAT } from '../../../../../../config/constants';

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
    const lastLicense = this.props.lastLicense ? this.props.lastLicense : null;
    const partner = this.props.partner;
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
        sorter: (a, b) => moment(a.createdDate, DATE_FORMAT) - moment(b.createdDate, DATE_FORMAT),
      },
      {
        title: 'End Date',
        dataIndex: 'endDate',
        key: 'endDate',
        width: '25%',
        sorter: (a, b) => moment(a.createdDate, DATE_FORMAT) - moment(b.createdDate, DATE_FORMAT),
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: '25%',
        render: (text, record, index) => (
          <NumberFormat value={record.price} displayType={'text'} thousandSeparator={true} />
        ),
      },
      {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        width: '25%',
        sorter: (a, b) => moment(a.createdDate, DATE_FORMAT) - moment(b.createdDate, DATE_FORMAT),
      },
    ];
    return (
      <>
        <div className={styles.applicationManagementContainer}>
          <div className={styles.applicationHeader}>
            <InsertButton onClick={this.handleChangeExpirationDate} />
          </div>
          {this.state.visibleChangeExpirationDate ? (
            <ExpandLicenseModal
              {...(lastLicense ? (lastLicense = { lastLicense }) : null)}
              hideModal={this.hideModalExpirationDate}
            ></ExpandLicenseModal>
          ) : null}
          <DataTable
            columnList={columnList}
            dataList={partner.licenses ? partner.licenses : []}
            totalRecords={partner.licenses ? partner.licenses.length : 0}
          />
        </div>
      </>
    );
  }
}

export default LicenseManagement;
