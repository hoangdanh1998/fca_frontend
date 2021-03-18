import React from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Space, Tag } from 'antd';
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  CopyOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import DataTable from './DataTable/index';
import InsertButton from '../../../components/atom/InsertButton/index';
import LicenseDetailsModal from './LicenseDetailsModal/index';
import CreateLicenseModal from './CreateLicenseModal/index';
import styles from './index.less';
import { convertStringToCamel } from '../../../utils/utils';
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT_CALL_API,
  LICENSE_STATUS,
} from '../../../../config/constants';

@connect(({ license, loading }) => ({}))
class LicenseManagement extends React.Component {
  state = { visibleDetailsModal: false, visibleCreateModal: false, license: {}, page: 1, mode: '' };

  setPage = page => {
    this.setState({ page: page });
  };

  handleVisibleDetailsModal = (record, modalMode) => {
    this.setState({
      visibleDetailsModal: true,
      license: record,
      mode: modalMode,
    });
  };
  handleVisibleCreateModal = () => {
    this.setState({ visibleCreateModal: true });
  };
  handleCreateLicense = async values => {
    // alert(JSON.stringify(values));
    const { dispatch } = this.props;
    await dispatch({
      type: 'license/createFcaLicense',
      payload: {
        name: values.name,
        duration: `${values.duration}`,
        price: `${values.price}`,
        description: values.description,
        startDate: moment(values.startDate).format(DATE_TIME_FORMAT_CALL_API),
      },
    });
    this.hideModal();
  };

  handleCloneLicense = async values => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'license/cloneFcaLicense',
      payload: {
        licenseId: values.licenseId,
        name: values.name,
        duration: `${values.duration}`,
        price: `${values.price}`,
        description: values.description,
        startDate: moment(values.startDate).format(DATE_TIME_FORMAT_CALL_API),
      },
    });
    this.hideModal();
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
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
        sorter: (a, b) =>
          moment(a.startDate, DATE_TIME_FORMAT_CALL_API) -
          moment(b.startDate, DATE_TIME_FORMAT_CALL_API),
        render: (text, record, index) => {
          return moment(record.startDate).format(DATE_FORMAT);
        },
        align: 'right',
      },
      {
        title: 'End Date',
        dataIndex: 'endDate',
        key: 'endDate',
        sorter: (a, b) =>
          moment(a.endDate, DATE_TIME_FORMAT_CALL_API) -
          moment(b.endDate, DATE_TIME_FORMAT_CALL_API),
        render: (text, record, index) => {
          return record.endDate ? moment(record.endDate).format(DATE_FORMAT) : '-';
        },
        align: 'right',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => (
          <Space direction="horizontal" style={{ display: 'flex' }}>
            <EyeOutlined
              onClick={() => {
                this.handleVisibleDetailsModal(record, 'view');
              }}
            />
            <CopyOutlined
              onClick={() => {
                this.handleVisibleDetailsModal(record, 'clone');
              }}
            />
            <CloseOutlined />
          </Space>
        ),
      },
    ];
    console.log('license-management');
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
            mode={this.state.mode}
            submitModal={values => {
              this.handleCloneLicense(values);
            }}
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
