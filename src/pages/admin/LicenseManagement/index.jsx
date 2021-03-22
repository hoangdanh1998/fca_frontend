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
import ConfirmationPopup from '../../../components/atom/ConfirmationPopup/index';
import InsertButton from '../../../components/atom/InsertButton/index';
import { convertStringToCamel } from '../../../utils/utils';
import CreateLicenseModal from './CreateLicenseModal/index';
import DataTable from './DataTable/index';
import styles from './index.less';
import LicenseDetailsModal from './LicenseDetailsModal/index';

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
    record: {},
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
    const menu = (
      <Menu style={{ width: 200 }}>
        <Menu.Item>
          <Space
            onClick={() => {
              this.handleVisibleDetailsModal(this.state.record, 'view');
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
              this.handleVisibleDetailsModal(this.state.record, 'clone');
            }}
            direction="horizontal"
            style={{ display: 'flex' }}
          >
            <CopyOutlined
              style={{ color: 'blue' }}
              onClick={() => {
                this.handleVisibleDetailsModal(this.state.record, 'clone');
              }}
            />
            <span style={{ color: 'blue' }}>Clone new license</span>
          </Space>
        </Menu.Item>
        <Menu.Item key="3">
          <Space
            onClick={() => {
              if (this.state.record.status === LICENSE_STATUS.ACTIVE) {
                this.handleVisibleConfirmationModal(this.state.record);
              }
            }}
            direction="horizontal"
            style={{ display: 'flex' }}
          >
            <CloseOutlined
              style={{
                color: this.state.record.status === LICENSE_STATUS.ARCHIVE ? 'grey' : 'red',
              }}
              onClick={() => {
                if (this.state.record.status === LICENSE_STATUS.ACTIVE) {
                  this.handleVisibleConfirmationModal(this.state.record);
                }
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
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <div style={{ display: 'flex', flex: 1 }}>{record.name}</div>
          </Dropdown>
        ),
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <div style={{ display: 'flex', flex: 1 }}>{`${record.duration} month(s)`}</div>
          </Dropdown>
        ),
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <NumberFormat value={record.price} displayType={'text'} thousandSeparator={true} />
          </Dropdown>
        ),
        align: 'right',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => {
          return (
            <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
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
            </Dropdown>
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
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <div style={{ textAlign: 'right', width: '100%' }}>
              {moment(record.startDate).format(DATE_FORMAT)}
            </div>
          </Dropdown>
        ),
        align: 'right',
      },
      // {
      //   title: 'Action',
      //   dataIndex: 'action',
      //   key: 'action',
      //   render: (text, record, index) => (
      //     <Space direction="horizontal" style={{ display: 'flex' }}>
      //       <EyeOutlined
      //         style={{ color: 'black' }}
      //         onClick={() => {
      //           this.handleVisibleDetailsModal(record, 'view');
      //         }}
      //       />
      //       <CopyOutlined
      //         style={{ color: 'blue' }}
      //         onClick={() => {
      //           this.handleVisibleDetailsModal(record, 'clone');
      //         }}
      //       />
      //       <CloseOutlined
      //         style={{ color: record.status === LICENSE_STATUS.ARCHIVE ? 'grey' : 'red' }}
      //         onClick={() => {
      //           if (record.status === LICENSE_STATUS.ACTIVE) {
      //             this.handleVisibleConfirmationModal(record);
      //           }
      //         }}
      //       />
      //     </Space>
      //   ),
      // },
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
          <DataTable
            columnList={columnList}
            onClickRow={record => {
              // this.handleVisibleDetailsModal(record, 'view');
              this.setState({ record: record });
            }}
          />
          <LicenseDetailsModal
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
          />
        </div>
      </>
    );
  }
}

export default LicenseManagement;
