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
        render: (text, record, index) => (
          // return index + 1;
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <div style={{ textAlign: 'right', width: '100%' }}>{index + 1}</div>
          </Dropdown>
        ),
        align: 'right',
        // width: ''
      },
      {
        title: 'From',
        dataIndex: 'from',
        key: 'from',
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <div style={{ display: 'flex', flex: 1 }}>{record.from}</div>
          </Dropdown>
        ),
        width: '15%',
        align: 'right',
      },
      {
        title: 'To',
        dataIndex: 'to',
        key: 'to',
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <div style={{ display: 'flex', flex: 1 }}>{`${record.to} month(s)`}</div>
          </Dropdown>
        ),
        width: '15%',
        align: 'right',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <NumberFormat value={record.amount} displayType={'text'} thousandSeparator={true} />
          </Dropdown>
        ),
        align: 'right',
        width: '10%',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (text, record, index) => {
          return (
            <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
              {/* <Tag
                color={record.type === LICENSE_type.ACTIVE ? 'green' : 'red'}
                icon={
                  record.type === LICENSE_type.ACTIVE ? (
                    <CheckCircleOutlined />
                  ) : (
                    <CloseCircleOutlined />
                  )
                }
              > */}
              {convertStringToCamel(record.type)}
              {/* </Tag> */}
            </Dropdown>
          );
        },
        width: '10%',
      },
      {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
        render: (text, record, index) => {
          return (
            <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
              {/* <Tag
                color={record.note === LICENSE_note.ACTIVE ? 'green' : 'red'}
                icon={
                  record.note === LICENSE_note.ACTIVE ? (
                    <CheckCircleOutlined />
                  ) : (
                    <CloseCircleOutlined />
                  )
                }
              > */}
              {convertStringToCamel(record.note)}
              {/* </Tag> */}
            </Dropdown>
          );
        },
        width: '30%',
      },
      {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        sorter: (a, b) =>
          moment(a.createdDate, DATE_TIME_FORMAT_CALL_API) -
          moment(b.createdDate, DATE_TIME_FORMAT_CALL_API),
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <div style={{ textAlign: 'right', width: '100%' }}>
              {moment(record.createdDate).format(DATE_FORMAT)}
            </div>
          </Dropdown>
        ),
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
                // this.handleVisibleCreateModal();
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
          {/* <LicenseDetailsModal
            visible={this.state.visibleDetailsModal}
            license={this.state.license}
            hideModal={this.hideModal}
            mode={this.state.mode}
            submitModal={values => {
              this.handleCloneLicense(values);
            }}
          />
          {this.state.visibleCreateModal ? (
            <CreateLicenseModal
              visible={this.state.visibleCreateModal}
              onSubmit={values => {
                this.handleCreateLicense(values);
              }}
              hideModal={this.hideModal}
            />
          ) : null}

          <ConfirmationPopup
            visible={this.state.visibleConfirmationModal}
            hideModal={this.hideModal}
            onClickOK={this.handleChangeLicenseStatus}
            message={this.state.confirmationMessage}
          /> */}
        </div>
      </>
    );
  }
}

export default TransactionManagement;
