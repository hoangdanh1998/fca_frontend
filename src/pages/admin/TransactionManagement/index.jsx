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
  DATE_TIME_FORMAT_CALL_API,
  LICENSE_STATUS,
} from '../../../../config/constants';
import InsertButton from '../../../components/atom/InsertButton/index';
import { convertStringToCamel } from '../../../utils/utils';
import CreateTransactionModal from './CreateTransactionModal/index';
import DataTable from './DataTable/index';
import styles from './index.less';

// @connect(({ license, loading }) => ({}))
class TransactionManagement extends React.Component {
  state = {
    visibleCreateModal: false,
    record: {},
  };

  setPage = page => {
    this.setState({ page: page });
  };
  handleVisibleCreateModal = () => {
    this.setState({ visibleCreateModal: true });
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
        dataIndex: 'phone',
        key: 'phone',
        width: '15%',
        align: 'right',
      },
      {
        title: 'Account Name',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (text, record, index) => (
          <NumberFormat value={record.amount} displayType={'text'} thousandSeparator={true} />
        ),
        align: 'right',
        width: '15%',
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
          moment(a.createdDate, DATE_TIME_FORMAT_CALL_API) -
          moment(b.createdDate, DATE_TIME_FORMAT_CALL_API),
        render: (text, record, index) => {
          return moment(record.createdDate).format(DATE_FORMAT);
        },
        align: 'right',
        width: '15%',
      },
    ];
    return (
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
        <CreateTransactionModal
          visible={this.state.visibleCreateModal}
          hideModal={this.hideModal}
        />
      </>
    );
  }
}

export default TransactionManagement;
