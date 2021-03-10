import React from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { router } from 'umi';
import { connect } from 'dva';
import { Select, Radio } from 'antd';
import { convertStringToCamel } from '../../../../../utils/utils';
import DataTable from './DataTable/index.jsx';
import ConfirmationPopup from '../../../../../components/atom/ConfirmationPopup/index.jsx';
import {
  PARTNER_ITEM_STATUS,
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
    partner: {},
    itemFCAGroup: {},
    showItemOption: 'All',
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
        width: '5%',
      },
      {
        title: 'Item Name',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
      },
      {
        title: 'Item Price',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
        render: (text, record, index) => (
          <NumberFormat value={record.price} displayType={'text'} thousandSeparator={true} />
        ),
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
          <Select
            size="small"
            defaultValue={convertStringToCamel(record.status)}
            onChange={value => {
              this.handleStatusChange(value, record);
            }}
            style={{ width: '100%' }}
            options={PARTNER_STATUS_ITEM_OPTIONS}
          />
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
      },
    ];
    const itemColumns = allColumns;
    itemColumns.push({
      title: 'Item Image',
      render: (text, record, index) => (
        <a href={record.imageLink ? record.imageLink : IMAGE_ADDRESS} target="_blank">
          <p>Click to view</p>
        </a>
      ),
      width: '10%',
    });
    const requestedItemColumns = [
      {
        title: 'No.',
        render: (text, object, index) => {
          return index + 1;
        },
        width: '5%',
      },
      {
        title: 'Item Name',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
      },
      {
        title: 'Item Price',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
        render: (text, record, index) => (
          <NumberFormat value={record.price} displayType={'text'} thousandSeparator={true} />
        ),
      },
      {
        title: 'FCA Group',
        dataIndex: ['fcaItem', 'name'],
        key: ['fcaItem', 'name'],
        width: '10%',
        render: (text, record, index) => (
          <Select
            size="small"
            defaultValue={record.fcaGroup}
            onChange={value => {
              this.handleFCAGroupChange(value, record);
            }}
            style={{ width: '100%' }}
            options={FCA_ITEM_LIST}
          />
        ),
      },
      {
        title: 'Item Status',
        dataIndex: 'status',
        key: 'status',
        width: '10%',
        render: (text, record, index) => (
          <Select
            size="small"
            defaultValue={record.itemStatus}
            onChange={value => {
              this.handleStatusChange(value, record);
            }}
            style={{ width: '100%' }}
            options={ITEM_STATUS_OPTIONS}
          />
        ),
      },
      {
        title: 'Register Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '10%',
        sorter: (a, b) => moment(a.createdAt, DATE_FORMAT) - moment(b.createdAt, DATE_FORMAT),
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
          <ConfirmationPopup
            visible={this.state.visibleChangeStatus}
            message={this.state.partner}
            hideModal={this.hideModalStatus}
          />
          <ConfirmationPopup
            visible={this.state.visibleFCAGroupChange}
            message={this.state.itemFCAGroup}
            hideModal={this.hideModalFCAGroup}
          />
          {this.state.showItemOption === 'Requested items' ? (
            <DataTable
              columnList={requestedItemColumns}
              dataList={partner.requestItems}
              totalRecords={partner.requestItems.length}
            />
          ) : this.state.showItemOption === 'Usable items' ? (
            <DataTable
              columnList={itemColumns}
              dataList={partner.items}
              totalRecords={partner.items.length}
            />
          ) : (
            <DataTable
              columnList={allColumns}
              dataList={partner.items.concat(partner.requestItems)}
              totalRecords={partner.items.length}
            />
          )}
        </div>
      </>
    );
  }
}

export default ItemManagement;
