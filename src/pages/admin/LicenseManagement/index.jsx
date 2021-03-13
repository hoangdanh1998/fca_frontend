import React from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Space, Tag } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import DataTable from './DataTable/index';
import InsertButton from '../../../components/atom/InsertButton/index';
import LicenseDetailsModal from './LicenseDetailsModal/index';
import CreateLicenseModal from './CreateLicenseModal/index';
import styles from './index.less';
import { convertStringToCamel } from '../../../utils/utils';
import {
  DATE_FORMAT,
  ORDER_STATUS,
  DATE_TIME_FORMAT,
  DATE_TIME_FORMAT_CALL_API,
  LICENSE_STATUS,
} from '../../../../config/constants';

@connect(({ order, loading }) => ({}))
class LicenseManagement extends React.Component {
  state = { visibleDetailsModal: false, visibleCreateModal: false, license: {}, page: 1 };

  setPage = page => {
    this.setState({ page: page });
  };

  handleVisibleDetailsModal = record => {
    this.setState({
      visibleDetailsModal: true,
      license: record,
    });
  };
  handleVisibleCreateModal = () => {
    this.setState({ visibleCreateModal: true });
  };
  handleCreateLicense = values => {
    alert(JSON.stringify(values));
  };
  hideModal = () => {
    this.setState({
      visibleDetailsModal: false,
      visibleCreateModal: false,
      license: {},
    });
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
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        render: (text, record, index) => {
          return `${record.duration} month(s)`;
        },
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text, record, index) => (
          <NumberFormat value={record.price} displayType={'text'} thousandSeparator={true} />
        ),
        align: 'right',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => {
          return (
            <Tag
              color={record.status === LICENSE_STATUS.ACTIVE ? 'green' : 'red'}
              icon={
                record.status === LICENSE_STATUS.ACTIVE ? (
                  <CheckCircleOutlined />
                ) : (
                  <CloseCircleOutlined />
                )
              }
            >
              {convertStringToCamel(record.status)}
            </Tag>
          );
        },
      },
      {
        title: 'Create Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: (a, b) =>
          moment(a.createdAt, DATE_TIME_FORMAT_CALL_API) -
          moment(b.createdAt, DATE_TIME_FORMAT_CALL_API),
        render: (text, record, index) => {
          return moment(record.createdAt).format(DATE_FORMAT);
        },
        align: 'right',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => (
          <Space
            direction="horizontal"
            style={{ display: 'flex' }}
            onClick={() => {
              this.handleVisibleDetailsModal(record);
            }}
          >
            <a href={'#'}>View</a>
          </Space>
        ),
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
          <DataTable columnList={columnList} />
          <LicenseDetailsModal
            visible={this.state.visibleDetailsModal}
            license={this.state.license}
            hideModal={this.hideModal}
          />
          <CreateLicenseModal
            visible={this.state.visibleCreateModal}
            onSubmit={values => {
              this.handleCreateLicense(values);
            }}
            hideModal={this.hideModal}
          />
        </div>
      </>
    );
  }
}

export default LicenseManagement;
