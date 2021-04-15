import React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { router } from 'umi';
import { connect } from 'dva';
import { Select, Radio, Tag, Space, Dropdown, Menu } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { convertStringToCamel } from '../../../../../utils/utils';
import DataTable from './DataTable/index.jsx';
import ConfirmationPopup from '../../../../../components/atom/ConfirmationPopup/index.jsx';
import ItemDetailsModal from './ItemDetailsModal/index.jsx';
import ConsolidateItemModal from './ConsolidateItemModal/index';
import {
  PARTNER_ITEM_STATUS,
  REQUESTED_ITEM_STATUS,
  DATE_FORMAT,
  SHOW_ITEMS_OPTIONS,
} from '../../../../../../config/constants';
import styles from './index.less';
import UpdateItemModal from './UpdateItemModal';

@connect(({ partner, loading }) => ({
  isError: partner.isError,
}))
class ItemManagement extends React.Component {
  state = {
    visibleChangeStatus: false,
    visibleItemModal: false,
    visibleEditModal: false,
    mode: '',
    showItemOption: 'All',
    partnerItem: {},
    message: {},
  };

  getTagStatusColors = record => {
    switch (record.status) {
      case REQUESTED_ITEM_STATUS.APPROVED:
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
        };
      case REQUESTED_ITEM_STATUS.REJECTED:
        return {
          color: 'error',
          icon: <CloseCircleOutlined />,
        };
      case REQUESTED_ITEM_STATUS.PROCESS:
        return {
          color: 'processing',
          icon: <ClockCircleOutlined />,
        };
      case PARTNER_ITEM_STATUS.ACTIVE:
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
        };
      case PARTNER_ITEM_STATUS.ARCHIVE:
        return {
          color: 'error',
          icon: <CloseCircleOutlined />,
        };
    }
  };
  onClickRow = record => {
    this.setState({ partnerItem: record });
  };
  handleChangeTableFilter = event => {
    this.setState({ showItemOption: event.target.value });
  };

  handleViewItemInformation = () => {
    this.setState({ visibleItemModal: true });
  };

  handleVisibleEditItemInformation = () => {
    this.setState({ visibleEditModal: true });
  };
  handleUpdateItem = values => {
    alert(JSON.stringify(values));
  };
  handleConsolidateItem = (partnerItemId, status) => {
    const url = window.location.href;
    const id = url.substring(url.indexOf('=') + 1);
    const params = {
      partnerId: id,
      partnerItemId: partnerItemId,
      status: status,
    };
    this.handleHideModal();
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/updatePartnerItemStatus',
      payload: params,
    });
  };

  handleVisibleChangeStatus = () => {
    this.setState({
      visibleChangeStatus: true,
      message: {
        id: this.state.partnerItem.id,
        name: this.state.partnerItem.name,
        property: "item's status",
        from: this.state.partnerItem.status,
        to: this.state.partnerItem.status,
      },
    });
  };

  handleHideItemInformation = () => {
    this.setState({ partnerItem: {}, visibleItemModal: false });
  };
  handleHideModal = () => {
    this.setState({
      partnerItem: {},
      visibleItemModal: false,
      visibleEditModal: false,
      message: {},
      visibleChangeStatus: false,
    });
  };

  render() {
    const { partner } = this.props;
    const menu = (
      <Menu style={{ width: 200 }}>
        <Menu.Item>
          <Space
            onClick={() => {
              this.handleViewItemInformation();
            }}
            direction="horizontal"
            style={{ display: 'flex' }}
          >
            <EyeOutlined style={{ color: 'black' }} />
            <span style={{ color: 'black' }}>View details</span>
          </Space>
        </Menu.Item>
        {/* <Menu.Item key="2">
          <Space
            onClick={() => {
              this.handleVisibleEditItemInformation();
            }}
            direction="horizontal"
            style={{ display: 'flex' }}
          >
            <EditOutlined style={{ color: 'blue' }} />
            <span style={{ color: 'blue' }}>Update item</span>
          </Space>
        </Menu.Item> */}
        <Menu.Item key="3">
          <Space
            onClick={() => {
              this.state.partnerItem.status === REQUESTED_ITEM_STATUS.PROCESS
                ? this.handleVisibleChangeStatus()
                : null;
            }}
            direction="horizontal"
            style={{ display: 'flex' }}
          >
            <EllipsisOutlined
              style={{
                color:
                  this.state.partnerItem.status === REQUESTED_ITEM_STATUS.PROCESS
                    ? '#1890ff'
                    : 'grey',
              }}
            />
            <span
              style={{
                color:
                  this.state.partnerItem.status === REQUESTED_ITEM_STATUS.PROCESS
                    ? '#1890ff'
                    : 'grey',
              }}
            >
              Verify item
            </span>
          </Space>
        </Menu.Item>
      </Menu>
    );
    const allColumns = [
      {
        title: 'No.',
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <div style={{ textAlign: 'right', width: '100%' }}>{index + 1}</div>
          </Dropdown>
        ),
        align: 'right',
        width: '5%',
      },
      {
        title: 'Item Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <div style={{ display: 'flex', flex: 1 }}>{record.name}</div>
          </Dropdown>
        ),
      },
      {
        title: 'FCA Group',
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <div style={{ display: 'flex', flex: 1 }}>{Object.assign({}, record.fcaItem).name}</div>
          </Dropdown>
        ),
        width: '25%',
      },
      {
        title: 'Item Price',
        dataIndex: 'price',
        key: 'price',
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <NumberFormat value={record.price} displayType={'text'} thousandSeparator={true} />
          </Dropdown>
        ),
        align: 'right',
        width: '10%',
      },

      {
        title: 'Item Status',
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <Tag
              color={this.getTagStatusColors(record).color}
              icon={this.getTagStatusColors(record).icon}
            >
              {convertStringToCamel(record.status)}
            </Tag>
          </Dropdown>
        ),
        width: '15%',
      },
      {
        title: 'Register Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '10%',
        sorter: (a, b) => moment(a.createdAt, DATE_FORMAT) - moment(b.createdAt, DATE_FORMAT),
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <div style={{ width: '100%', textAlign: 'right' }}>
              {moment(record.createdAt).format(DATE_FORMAT)}
            </div>
          </Dropdown>
        ),
        align: 'right',
        width: '15%',
      },
    ];

    return (
      <>
        <div className={styles.applicationManagementContainer}>
          <div>
            <Radio.Group
              style={{ display: 'flex' }}
              defaultValue={this.state.showItemOption}
              options={SHOW_ITEMS_OPTIONS}
              onChange={this.handleChangeTableFilter}
              optionType="button"
            />
            <br />
          </div>
          <ConsolidateItemModal
            visible={this.state.visibleChangeStatus}
            message={this.state.message}
            hideModal={this.handleHideModal}
            onClickOK={(partnerId, partnerItemId, status) => {
              this.handleConsolidateItem(partnerId, partnerItemId, status);
            }}
          />
          <ItemDetailsModal
            visible={this.state.visibleItemModal}
            item={this.state.partnerItem}
            hideModal={this.handleHideModal}
          />
          <UpdateItemModal
            visible={this.state.visibleEditModal}
            item={this.state.partnerItem}
            hideModal={this.handleHideModal}
            onSubmitModal={values => {
              this.handleUpdateItem(values);
            }}
          />
          <DataTable
            onClickRow={this.onClickRow}
            columnList={allColumns}
            dataList={
              this.state.showItemOption === 'Requested items'
                ? partner.items
                  ? partner.items.filter(item => {
                      return item.status !== PARTNER_ITEM_STATUS.ACTIVE;
                    })
                  : []
                : this.state.showItemOption === 'Usable items'
                ? partner.items
                  ? partner.items.filter(item => {
                      return item.status === PARTNER_ITEM_STATUS.ACTIVE;
                    })
                  : []
                : partner.items
                ? partner.items
                : []
            }
          />
        </div>
      </>
    );
  }
}

export default ItemManagement;
