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
import ConfirmationPopup from '../../../components/atom/ConfirmationPopup/index';
import styles from './index.less';
import { convertStringToCamel } from '../../../utils/utils';
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT_CALL_API,
  LICENSE_STATUS,
} from '../../../../config/constants';

@connect(({ license, loading }) => ({}))
class LicenseManagement extends React.Component {
  state = {
    visibleDetailsModal: false,
    visibleCreateModal: false,
    visibleConfirmationModal: false,
    license: {},
    page: 1,
    mode: '',
    confirmationMessage: {},
  };

  setPage = page => {
    this.setState({ page: page });
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

  handleVisibleDetailsModal = (record, modalMode) => {
    this.setState({
      visibleDetailsModal: true,
      license: record,
      mode: modalMode,
    });
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

  handleVisibleConfirmationModal = record => {
    this.setState({
      visibleConfirmationModal: true,
      license: record,
      confirmationMessage: {
        name: record.name,
        property: "package's status",
        from: LICENSE_STATUS.ACTIVE,
        to: LICENSE_STATUS.ARCHIVE,
      },
    });
  };
  handleChangeLicenseStatus = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'license/updateFcaLicenseStatus',
      payload: {
        id: this.state.license.id,
        status: LICENSE_STATUS.ARCHIVE,
      },
    });
    this.hideModal();
  };

  hideModal = () => {
    this.setState({
      visibleDetailsModal: false,
      visibleCreateModal: false,
      visibleConfirmationModal: false,
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
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => (
          <Space direction="horizontal" style={{ display: 'flex' }}>
            <EyeOutlined
              style={{ color: 'black' }}
              onClick={() => {
                this.handleVisibleDetailsModal(record, 'view');
              }}
            />
            <CopyOutlined
              style={{ color: 'blue' }}
              onClick={() => {
                this.handleVisibleDetailsModal(record, 'clone');
              }}
            />
            <CloseOutlined
              style={{ color: record.status === LICENSE_STATUS.ARCHIVE ? 'grey' : 'red' }}
              onClick={() => {
                if (record.status === LICENSE_STATUS.ACTIVE) {
                  this.handleVisibleConfirmationModal(record);
                }
              }}
            />
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
          <ConfirmationPopup
            visible={this.state.visibleConfirmationModal}
            hideModal={this.hideModal}
            onClickOK={this.handleChangeLicenseStatus}
            message={this.state.confirmationMessage}
          />
        </div>
      </>
    );
  }
}

export default LicenseManagement;
