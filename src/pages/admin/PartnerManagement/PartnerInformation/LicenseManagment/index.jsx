import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import DataTable from './DataTable/index.jsx';
import InsertButton from '../../../../../components/atom/InsertButton/index.jsx';
import ExpandLicenseModal from '../LicenseManagment/ExpandLicenseModal/index.jsx';
import styles from './index.less';
import { PARTNER_LICENSE_LIST, PARTNER_LAST_LICENSE } from '../../../../../../config/seedingData';
import {
  DATE_FORMAT,
  PARTNER_STATUS,
  PAGE_SIZE,
  LICENSE_STATUS,
} from '../../../../../../config/constants';

@connect(({ partner, loading }) => ({
  createdLicense: partner.createdLicense,
}))
class LicenseManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleChangeExpirationDate: false,
      licenses: this.props.partner.licenses ? this.props.partner.licenses : [],
    };
  }

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

  handleCreatePartnerLicense = async values => {
    this.hideModalExpirationDate();
    const { dispatch } = this.props;
    await dispatch({
      type: 'partner/createPartnerLicense',
      payload: {
        partnerId: this.props.partner.id,
        fcaLicenseId: values.fcaLicenseId,
        startDate: values.startDate,
        endDate: values.endDate,
        price: values.price,
      },
    });
    if (this.props.createdLicense.id) {
      const newLicenses = this.state.licenses;
      newLicenses.push(this.props.createdLicense);
      this.setState({
        licenses: newLicenses,
      });
    }
  };

  render() {
    const lastLicense =
      this.props.partner.licenses && this.props.partner.licenses.length > 0
        ? this.props.partner.licenses[this.props.partner.licenses.length - 1].status ===
          LICENSE_STATUS.ACTIVE
          ? this.props.partner.licenses[this.props.partner.licenses.length - 1]
          : null
        : null;
    const partner = this.props.partner;
    const columnList = [
      {
        title: 'No.',
        render: (text, object, index) => {
          return index + 1;
        },
        align: 'right',
      },
      {
        title: 'License Package',
        dataIndex: ['fcaLicense', 'name'],
        key: ['fcaLicense', 'name'],
        width: '35%',
      },
      {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
        width: '15%',
        sorter: (a, b) => moment(a.createdDate, DATE_FORMAT) - moment(b.createdDate, DATE_FORMAT),
        render: (text, record, index) => {
          return moment(record.startDate).format(DATE_FORMAT);
        },
        align: 'right',
      },
      {
        title: 'End Date',
        dataIndex: 'endDate',
        key: 'endDate',
        width: '15%',
        sorter: (a, b) => moment(a.createdDate, DATE_FORMAT) - moment(b.createdDate, DATE_FORMAT),
        render: (text, record, index) => {
          return moment(record.endDate).format(DATE_FORMAT);
        },
        align: 'right',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        width: '15%',
        render: (text, record, index) => (
          <NumberFormat value={record.price} displayType={'text'} thousandSeparator={true} />
        ),
        align: 'right',
      },
      {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        width: '15%',
        align: 'right',
        sorter: (a, b) => moment(a.createdDate, DATE_FORMAT) - moment(b.createdDate, DATE_FORMAT),
        render: (text, record, index) => {
          return moment(record.createdAt).format(DATE_FORMAT);
        },
      },
    ];
    return (
      <>
        <div className={styles.applicationManagementContainer}>
          <div className={styles.applicationHeader}>
            {partner.status === PARTNER_STATUS.APPROVED ? (
              <InsertButton onClick={this.handleChangeExpirationDate} />
            ) : null}
          </div>
          {this.state.visibleChangeExpirationDate ? (
            <ExpandLicenseModal
              packages={this.props.packages}
              lastLicense={lastLicense ? { ...lastLicense, storeName: partner.name } : null}
              hideModal={this.hideModalExpirationDate}
              submitModal={values => {
                this.handleCreatePartnerLicense(values);
              }}
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
