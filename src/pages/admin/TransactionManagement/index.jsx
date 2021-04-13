import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  CopyOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Space, Tag, Dropdown, Menu, Table } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React from 'react';
import NumberFormat from 'react-number-format';
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  DATE_TIME_FORMAT_CALL_API,
  LICENSE_STATUS,
} from '../../../../config/constants';
import InsertButton from '../../../components/atom/InsertButton/index';
import CreateTransactionModal from './CreateTransactionModal/index';
import DataTable from './DataTable/index';
import ExceptionBody from '../../../components/ExceptionBody/index';
import { convertStringToCamel } from '../../../utils/utils';
import styles from './index.less';

@connect(({ transaction, loading }) => {
  return {
    account: transaction.account,
    isError: transaction.isError,
  };
})
class TransactionManagement extends React.Component {
  state = {
    visibleCreateModal: false,
    record: {},
    actionOnAccount: {},
  };

  handleVisibleCreateModal = () => {
    this.setState({ visibleCreateModal: true });
  };
  handleCreateTransaction = async values => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'transaction/createTransaction',
      payload: {
        accountId: values.accountId,
        amount: values.amount,
        description: values.description,
      },
    });
    this.hideModal();
  };
  hideModal = () => {
    this.setState({ visibleCreateModal: false });
  };

  render() {
    const menu = (
      <Menu style={{ width: 200 }}>
        <Menu.Item>
          <Space
            onClick={() => {
              //   this.handleVisibleDetailsModal(this.state.record, 'view');
            }}
            direction="horizontal"
            style={{ display: 'flex' }}
          >
            <EyeOutlined style={{ color: 'black' }} />
            <span style={{ color: 'black' }}>View details</span>
          </Space>
        </Menu.Item>
        <Menu.Item key="2">
          <Space
            onClick={() => {
              //   this.handleVisibleDetailsModal(this.state.record, 'clone');
            }}
            direction="horizontal"
            style={{ display: 'flex' }}
          >
            <CopyOutlined
              style={{ color: 'blue' }}
              onClick={() => {
                // this.handleVisibleDetailsModal(this.state.record, 'clone');
              }}
            />
            <span style={{ color: 'blue' }}>Clone new license</span>
          </Space>
        </Menu.Item>
        <Menu.Item key="3">
          <Space
            onClick={() => {
              //   if (this.state.record.status === LICENSE_STATUS.ACTIVE) {
              //     this.handleVisibleConfirmationModal(this.state.record);
              //   }
            }}
            direction="horizontal"
            style={{ display: 'flex' }}
          >
            <CloseOutlined
              style={{
                color: this.state.record.status === LICENSE_STATUS.ARCHIVE ? 'grey' : 'red',
              }}
              onClick={() => {
                // if (this.state.record.status === LICENSE_STATUS.ACTIVE) {
                //   this.handleVisibleConfirmationModal(this.state.record);
                // }
              }}
            />
            <span
              style={{
                color: this.state.record.status === LICENSE_STATUS.ARCHIVE ? 'grey' : 'red',
              }}
            >
              Archive license
            </span>
          </Space>
        </Menu.Item>
      </Menu>
    );
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
        key: ['owner', 'phone'],
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
    return this.props.isError ? (
      <ExceptionBody />
    ) : (
      <>
        <div direction="horizontal" className={styles.applicationManagementContainer}>
          <div className={styles.applicationHeader}>
            <InsertButton
              onClick={() => {
                this.handleVisibleCreateModal();
              }}
            />
          </div>
          <br />
          <DataTable
            columnList={columnList}
            onClickRow={record => {
              // this.handleVisibleDetailsModal(record, 'view');
              this.setState({ record: record });
            }}
          />
        </div>
        {this.state.visibleCreateModal ? (
          <CreateTransactionModal
            visible={this.state.visibleCreateModal}
            hideModal={this.hideModal}
            onSubmit={values => {
              this.handleCreateTransaction(values);
            }}
            onBlurPhone={phone => {
              this.handleGetAccount(phone);
            }}
            account={this.state.actionOnAccount}
          />
        ) : null}
      </>
    );
  }
}

export default TransactionManagement;
