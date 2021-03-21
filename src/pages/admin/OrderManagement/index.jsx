import React from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import moment from 'moment';
import { Space, Tooltip, Tag } from 'antd';
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import DataTable from './DataTable/index';
import CancelOrderModal from '../OrderManagement/CancelOrderModal/index.jsx';
import ConfirmationPopup from '../../../components/atom/ConfirmationPopup/index.jsx';
import styles from './index.less';
import { convertStringToCamel } from '../../../utils/utils';
import {
  DATE_FORMAT,
  ORDER_STATUS,
  DATE_TIME_FORMAT,
  DATE_TIME_FORMAT_CALL_API,
} from '../../../../config/constants';

@connect(({ order, loading }) => ({}))
class OrderManagement extends React.Component {
  state = { visibleCancelOrder: false, visibleChangeStatus: false, order: {}, page: 1 };

  setPage = page => {
    this.setState({ page: page });
  };

  getTagStatusColors = record => {
    switch (record.status) {
      case ORDER_STATUS.RECEPTION:
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
        };
      case ORDER_STATUS.REJECTION:
        return {
          color: 'error',
          icon: <CloseCircleOutlined />,
        };
      case ORDER_STATUS.CANCELLATION:
        return {
          color: 'default',
          icon: <CloseCircleOutlined />,
        };
      case ORDER_STATUS.CLOSURE:
        return {
          color: 'default',
          icon: <CheckCircleOutlined />,
        };
      default:
        return {
          color: 'processing',
          icon: <SyncOutlined spin />,
        };
    }
  };

  handleVisibleCancelOrder = (record, index) => {
    this.setState({
      visibleCancelOrder: true,
      order: {
        i: index + 1,
        order: record,
        id: record.id,
        customerPhone: record.customer.phone,
        partnerName: record.partner.name,
        customerId: record.customer.id,
        partnerId: record.partner.id,
      },
    });
  };
  hideModal = () => {
    this.setState({
      visibleCancelOrder: false,
    });
  };

  handleVisibleCloseOrder = (record, index) => {
    this.setState({
      visibleChangeStatus: true,
      order: {
        name: `#${index + 1}`,
        id: record.id,
        from: record.status,
        to: ORDER_STATUS.RECEPTION,
        property: "order's status",
        visible: true,
      },
    });
  };
  hideModalCloseOrder = () => {
    this.setState({
      visibleChangeStatus: false,
    });
  };
  handleCloseOrder = () => {
    this.hideModalCloseOrder();
    const { dispatch } = this.props;
    dispatch({
      type: 'order/closeOrder',
      payload: {
        status: ORDER_STATUS.RECEPTION,
        id: this.state.order.id,
      },
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
        title: 'Customer Phone',
        dataIndex: ['customer', 'phone'],
        key: ['customer', 'phone'],
        align: 'right',
      },
      {
        title: 'Partner Store',
        dataIndex: ['partner', 'name'],
        key: ['partner', 'name'],
        width: '40%',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => {
          return (
            <Tag
              color={this.getTagStatusColors(record).color}
              icon={this.getTagStatusColors(record).icon}
            >
              {convertStringToCamel(record.status)}
            </Tag>
          );
        },
      },
      {
        title: 'Order Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: (a, b) =>
          moment(a.createdAt, DATE_TIME_FORMAT_CALL_API) -
          moment(b.createdAt, DATE_TIME_FORMAT_CALL_API),
        render: (text, record, index) => {
          return moment(record.createdAt).format(DATE_TIME_FORMAT);
        },
        align: 'right',
      },
      // {
      //   title: 'Action',
      //   dataIndex: 'action',
      //   key: 'action',
      //   render: (text, record, index) => (
      //     <Space direction="horizontal" style={{ display: 'flex' }}>
      //       <a href={`/fca-management/order-management/order-information?id=${record.id}`}>View</a>
      //     </Space>
      //     //   <EyeOutlined
      //     //   style={{ color: 'black' }}
      //     //   onClick={() => {
      //     //     this.handleViewPartner(record);
      //     //   }}
      //     // />
      //   ),
      // },
    ];
    return (
      <>
        <div direction="horizontal" className={styles.applicationManagementContainer}>
          <CancelOrderModal
            visible={this.state.visibleCancelOrder}
            order={this.state.order}
            hideModal={this.hideModal}
          />
          <ConfirmationPopup
            visible={this.state.visibleChangeStatus}
            message={this.state.order}
            hideModal={this.hideModalCloseOrder}
            onClickOK={this.handleCloseOrder}
          />
          <DataTable columnList={columnList} />
        </div>
      </>
    );
  }
}

export default OrderManagement;
