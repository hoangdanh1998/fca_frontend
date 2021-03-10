import React from 'react';
import { Table, Input, Space, DatePicker, Radio } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import {
  DATE_FORMAT_CALL_API,
  PAGE_SIZE,
  DATE_FORMAT,
  ORDER_STATUS_FILTER,
} from '../../../../../config/constants';
import styles from './index.less';

@connect(({ order, loading }) => {
  return {
    dataList: order.allOrderList,
    totalOrder: order.totalOrder,
  };
})
class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      skip: 0,
      pageSize: PAGE_SIZE,

      createdDate: moment().format(DATE_FORMAT_CALL_API),
      status: '',
      phone: '',
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/getOrderList',
      payload: {
        createdDate: this.state.createdDate,
        status: this.state.status,
        phone: this.state.phone,
        skip: this.state.skip,
        limit: this.state.pageSize,
      },
    });
  }

  onChangePaging = page => {
    const { dispatch } = this.props;
    this.setState({
      pageIndex: page,
    });
    dispatch({
      type: 'order/getOrderList',
      payload: {
        createdDate: this.state.createdDate,
        status: this.state.status,
        phone: this.state.phone,
        skip: parseInt((page - 1) * PAGE_SIZE),
        limit: this.state.pageSize,
      },
    });
  };

  handlePressSearch = e => {
    this.setState({ phone: e.target.value });

    const { dispatch } = this.props;
    dispatch({
      type: 'order/getOrderList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        createdDate: this.state.createdDate,
        status: this.state.status,
        phone: e.target.value,
      },
    });
  };
  handleClickSearch = (value, event) => {
    this.setState({ phone: value });

    const { dispatch } = this.props;
    dispatch({
      type: 'order/getOrderList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        createdDate: this.state.createdDate,
        status: this.state.status,
        phone: value,
      },
    });
  };
  handleChangeFilter = e => {
    this.setState({ status: e.target.value === 'ALL' ? '' : e.target.value });

    const { dispatch } = this.props;
    dispatch({
      type: 'order/getOrderList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        createdDate: this.state.createdDate,
        status: e.target.value === 'ALL' ? '' : e.target.value,
        phone: this.state.phone,
      },
    });
  };
  handleChangeDate = value => {
    this.setState({ createdDate: moment(value, DATE_FORMAT).format(DATE_FORMAT_CALL_API) });

    const { dispatch } = this.props;
    dispatch({
      type: 'order/getOrderList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        createdDate: moment(value, DATE_FORMAT).format(DATE_FORMAT_CALL_API),
        status: this.state.status,
        phone: this.state.phone,
      },
    });
  };

  render() {
    const { columnList, dataList, totalOrder } = this.props;
    return (
      <div>
        <div>
          {/* SEARCH MODAL */}
          <Space direction="vertical">
            <Space direction="horizontal" style={{ display: 'flex' }}>
              <Input.Search
                ref="input"
                onPressEnter={this.handlePressSearch}
                onSearch={this.handleClickSearch}
                style={{ width: 300 }}
                allowClear
                placeholder="Enter customer phone"
              />
              <DatePicker
                ref="picker"
                style={{ width: 300 }}
                defaultValue={moment()}
                onChange={this.handleChangeDate}
                allowClear={false}
                format={DATE_FORMAT}
              />
            </Space>
            <Radio.Group
              style={{ display: 'flex' }}
              defaultValue={'ALL'}
              options={ORDER_STATUS_FILTER}
              onChange={this.handleChangeFilter}
              optionType="button"
            />
            <br />
          </Space>
          <div>
            <Table
              className={styles.table}
              dataSource={dataList}
              columns={columnList}
              pagination={{
                current: this.state.page,
                pageSize: this.state.pageSize,
                total: totalOrder,
                onChange: this.onChangePaging,
              }}
              bordered
              loading={
                this.props.isLoadingTags ||
                this.props.isLoadingTableContact ||
                this.props.isLoadingGetAllContacts
              }
            ></Table>
          </div>
        </div>
      </div>
    );
  }
}

export default DataTable;
