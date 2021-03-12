import React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { router } from 'umi';
import { connect } from 'dva';
import { Select, Radio, Tag, Space } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
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
import { IMAGE_ADDRESS } from '../../../../../../config/seedingData';
import styles from './index.less';

class ItemManagement extends React.Component {
  state = {
    visibleChangeStatus: false,
    visibleFCAGroupChange: false,
    visibleViewDetails: false,
    partner: {},
    itemFCAGroup: {},
    showItemOption: 'All',
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

  handleChangeTableFilter = event => {
    this.setState({ showItemOption: event.target.value });
  };

  handleStatusChange = (value, record) => {
    this.setState({
      visibleChangeStatus: true,
      partner: {
        name: record.name,
        from: record.status,
        to: value,
        property: "item's status",
        visible: true,
      },
    });
  };
  hideModalStatus = () => {
    this.setState({
      visibleChangeStatus: false,
    });
  };

  handleFCAGroupChange = (value, record) => {
    this.setState({
      visibleFCAGroupChange: true,
      itemFCAGroup: {
        name: record.itemName,
        from: record.fcaGroup,
        to: value,
        property: 'FCA Group',
        visible: true,
      },
    });
  };
  hideModalFCAGroup = () => {
    this.setState({
      visibleFCAGroupChange: false,
    });
  };

  render() {
    const { partner } = this.props;
    const allColumns = [
      {
        title: 'No.',
        render: (text, object, index) => {
          return index + 1;
        },
        align: 'right',
        width: '1%',
      },
      {
        title: 'Item Name',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
      },
      {
        title: 'Item Price',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
        render: (text, record, index) => (
          <NumberFormat value={record.price} displayType={'text'} thousandSeparator={true} />
        ),
        align: 'right',
      },
      {
        title: 'FCA Group',
        width: '10%',
        render: (text, record, index) => {
          return Object.assign({}, record.fcaItem).name;
        },
      },
      {
        title: 'Item Status',
        dataIndex: 'status',
        key: 'status',
        width: '10%',
        render: (text, record, index) => (
          <Tag
            color={this.getTagStatusColors(record).color}
            icon={this.getTagStatusColors(record).icon}
          >
            {convertStringToCamel(record.status)}
          </Tag>
        ),
      },
      {
        title: 'Register Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '10%',
        sorter: (a, b) => moment(a.createdAt, DATE_FORMAT) - moment(b.createdAt, DATE_FORMAT),
        render: (text, record, index) => {
          return moment(record.createdAt).format(DATE_FORMAT);
        },
        align: 'right',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: '5%',
        render: (text, record, index) => (
          <Space
            onClick={() => {
              this.setState({ visibleViewDetails: true });
            }}
            direction="horizontal"
            style={{ display: 'flex' }}
          >
            <a
              // href={`/fca-management/partner-management/partner-information/item-information?id=${record.id}`}
              href="#"
            >
              View
            </a>
          </Space>
        ),
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
          {/* <ConfirmationPopup
            visible={this.state.visibleChangeStatus}
            message={this.state.partner}
            hideModal={this.hideModalStatus}
          />
          <ConfirmationPopup
            visible={this.state.visibleFCAGroupChange}
            message={this.state.itemFCAGroup}
            hideModal={this.hideModalFCAGroup}
          /> */}
          <ItemDetailsModal visible={this.state.visibleViewDetails} />
          <DataTable
            columnList={allColumns}
            dataList={
              this.state.showItemOption === 'Requested items'
                ? partner.requestItems
                : this.state.showItemOption === 'Usable items'
                ? partner.items
                : partner.items.concat(partner.requestItems)
            }
            totalRecords={
              this.state.showItemOption === 'Requested items'
                ? partner.requestItems.length
                : this.state.showItemOption === 'Usable items'
                ? partner.items.length
                : partner.items.concat(partner.requestItems).length
            }
          />
        </div>
      </>
    );
  }
}

export default ItemManagement;
