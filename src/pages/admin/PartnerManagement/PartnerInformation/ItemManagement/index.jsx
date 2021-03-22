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
  CloseOutlined,
} from '@ant-design/icons';
import { convertStringToCamel } from '../../../../../utils/utils';
import DataTable from './DataTable/index.jsx';
import ConfirmationPopup from '../../../../../components/atom/ConfirmationPopup/index.jsx';
import ItemDetailsModal from './ItemDetailsModal/index.jsx';
import {
  PARTNER_ITEM_STATUS,
  REQUESTED_ITEM_STATUS,
  DATE_FORMAT,
  SHOW_ITEMS_OPTIONS,
  PARTNER_STATUS_ITEM_OPTIONS,
} from '../../../../../../config/constants';
import styles from './index.less';
import UpdateItemModal from './UpdateItemModal';

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

  handleVisibleChangeStatus = () => {
    this.setState({
      visibleChangeStatus: true,
      message: {
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
        <Menu.Item key="2">
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
        </Menu.Item>
        <Menu.Item key="3">
          <Space
            onClick={() => {
              this.handleVisibleChangeStatus();
            }}
            direction="horizontal"
            style={{ display: 'flex' }}
          >
            <CloseOutlined
              style={{
                color:
                  this.state.partnerItem.status === PARTNER_ITEM_STATUS.ARCHIVE ? 'green' : 'red',
              }}
            />
            <span
              style={{
                color:
                  this.state.partnerItem.status === PARTNER_ITEM_STATUS.ARCHIVE ? 'green' : 'red',
              }}
            >
              Archive item
            </span>
          </Space>
        </Menu.Item>
      </Menu>
    );
    const allColumns = [
      {
        title: 'No.',
        render: (text, record, index) => (
          // return index + 1;
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <div style={{ textAlign: 'right', width: '100%' }}>{index + 1}</div>
          </Dropdown>
        ),
        align: 'right',
        width: '1%',
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
        width: '20%',
      },
      {
        title: 'Item Price',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
        // render: (text, record, index) => (
        //   <NumberFormat value={record.price} displayType={'text'} thousandSeparator={true} />
        // ),
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <NumberFormat value={record.price} displayType={'text'} thousandSeparator={true} />
          </Dropdown>
        ),
        align: 'right',
      },
      {
        title: 'FCA Group',
        width: '10%',
        // render: (text, record, index) => {
        //   return Object.assign({}, record.fcaItem).name;
        // },
        render: (text, record, index) => (
          <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
            <div style={{ display: 'flex', flex: 1 }}>{Object.assign({}, record.fcaItem).name}</div>
          </Dropdown>
        ),
      },
      {
        title: 'Item Status',
        dataIndex: 'status',
        key: 'status',
        width: '10%',
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
      },
      // {
      //   title: 'Action',
      //   dataIndex: 'action',
      //   key: 'action',
      //   width: '5%',
      //   render: (text, record, index) => (
      //     <Space
      //       onClick={() => {
      //         this.handleViewItemInformation(record);
      //       }}
      //       direction="horizontal"
      //       style={{ display: 'flex' }}
      //     >
      //       <a
      //         // href={`/fca-management/partner-management/partner-information/item-information?id=${record.id}`}
      //         href="#"
      //       >
      //         View
      //       </a>
      //     </Space>
      //   ),
      // },
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
          <ConfirmationPopup
            visible={this.state.visibleChangeStatus}
            message={this.state.message}
            hideModal={this.handleHideModal}
          />
          {/* <ConfirmationPopup
            visible={this.state.visibleFCAGroupChange}
            message={this.state.itemFCAGroup}
            hideModal={this.hideModalFCAGroup}
          /> */}
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
                ? partner.requestItems
                  ? partner.requestItems
                  : []
                : this.state.showItemOption === 'Usable items'
                ? partner.items
                  ? partner.items
                  : []
                : partner.items && partner.requestItems
                ? partner.items.concat(partner.requestItems)
                : []
            }
            totalRecords={
              this.state.showItemOption === 'Requested items'
                ? partner?.requestItems?.length
                : this.state.showItemOption === 'Usable items'
                ? partner?.items?.length
                : partner?.items?.concat(partner?.requestItems)?.length
            }
          />
        </div>
      </>
    );
  }
}

export default ItemManagement;
