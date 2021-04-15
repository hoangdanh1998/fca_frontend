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
  DATE_TIME_FORMAT_CALL_API,
  DATE_TIME_FORMAT,
} from '../../../../../../config/constants';
import CreateTransactionModal from './CreateTransactionModal/index';

@connect(({ partner, loading }) => ({
  createdTransaction: partner.createdTransaction,
}))
class TransactionManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleCreateTransaction: false,
    };
  }

  handleVisibleCreateTransaction = () => {
    this.setState({
      visibleCreateTransaction: true,
    });
  };

  hideCreateTransaction = () => {
    this.setState({
      visibleCreateTransaction: false,
    });
  };

  handleCreateTransaction = async values => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'partner/createTransaction',
      payload: {
        accountId: values.accountId,
        amount: values.amount,
        description: values.description,
      },
    });
  };

  render() {
    const partner = this.props.partner;
    const columnList = [
      {
        title: 'No.',
        render: (text, record, index) => {
          return index + 1;
        },
        align: 'right',
        width: '1%',
      },
      {
        title: 'Account Phone',
        dataIndex: ['owner', 'account', 'phone'],
        key: ['owner', 'account', 'phone'],
        width: '15%',
        align: 'right',
      },
      {
        title: 'Account Name',
        dataIndex: ['owner', 'name'],
        key: ['owner', 'name'],
        width: '20%',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (text, record, index) => (
          <NumberFormat value={record.amount} displayType={'text'} thousandSeparator={true} />
        ),
        align: 'right',
        width: '10%',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        width: '40%',
      },
      {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        sorter: (a, b) =>
          moment(a.createdAt, DATE_TIME_FORMAT_CALL_API) -
          moment(b.createdAt, DATE_TIME_FORMAT_CALL_API),
        render: (text, record, index) => {
          return moment(record.createdAt).format(DATE_TIME_FORMAT);
        },
        align: 'right',
        width: '15%',
      },
    ];
    return (
      <>
        <div className={styles.applicationManagementContainer}>
          <div className={styles.applicationHeader}>
            {partner.status === PARTNER_STATUS.APPROVED ? (
              <InsertButton onClick={this.handleVisibleCreateTransaction} />
            ) : null}
          </div>
          {this.state.visibleCreateTransaction ? (
            <CreateTransactionModal
              visible={this.state.visibleCreateTransaction}
              partner={partner}
              hideModal={() => {
                this.hideCreateTransaction();
              }}
              onSubmit={values => {
                this.handleCreateTransaction(values);
              }}
            ></CreateTransactionModal>
          ) : null}
          <DataTable
            phone={partner?.account?.phone}
            columnList={columnList}
            // dataList={partner.transaction ? partner.transaction : []}
            // totalRecords={partner.transaction ? partner.transaction.length : 0}
          />
        </div>
      </>
    );
  }
}

export default TransactionManagement;
