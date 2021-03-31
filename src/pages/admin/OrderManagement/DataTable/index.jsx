import React from 'react';
import { Table, Input, Space, DatePicker, Radio } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import { router } from 'umi';
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
      loading: false,
      createdDate: moment().format(DATE_FORMAT_CALL_API),
      status: '',
      phone: '',
    };
  }

  async componentWillMount() {
    this.setState({ loading: true });
    const { dispatch } = this.props;
    await dispatch({
      type: 'order/getOrderList',
      payload: {
        createdDate: this.state.createdDate,
        status: this.state.status,
        phone: this.state.phone,
        skip: this.state.skip,
        limit: this.state.pageSize,
      },
    });
    this.setState({ loading: false });
  }

  onChangePaging = async (page, pageSize) => {
    const { dispatch } = this.props;
    this.setState({
      pageIndex: page,
      pageSize: pageSize,
      loading: true,
    });
    await dispatch({
      type: 'order/getOrderList',
      payload: {
        createdDate: this.state.createdDate,
        status: this.state.status,
        phone: this.state.phone,
        skip: parseInt((page - 1) * pageSize),
        limit: pageSize,
      },
    });
    this.setState({ loading: false });
  };

  handlePressSearch = async e => {
    this.setState({ phone: e.target.value, loading: true });

    const { dispatch } = this.props;
    await dispatch({
      type: 'order/getOrderList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        createdDate: this.state.createdDate,
        status: this.state.status,
        phone: e.target.value,
      },
    });
    this.setState({ loading: false });
  };
  handleClickSearch = async (value, event) => {
    this.setState({ phone: value, loading: true });

    const { dispatch } = this.props;
    await dispatch({
      type: 'order/getOrderList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        createdDate: this.state.createdDate,
        status: this.state.status,
        phone: value,
      },
    });
    this.setState({ loading: false });
  };
  handleChangeFilter = async e => {
    this.setState({ status: e.target.value === 'ALL' ? '' : e.target.value, loading: true });

    const { dispatch } = this.props;
    await dispatch({
      type: 'order/getOrderList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        createdDate: this.state.createdDate,
        status: e.target.value === 'ALL' ? '' : e.target.value,
        phone: this.state.phone,
      },
    });
    this.setState({ loading: false });
  };
  handleChangeDate = async value => {
    this.setState({
      createdDate: moment(value, DATE_FORMAT).format(DATE_FORMAT_CALL_API),
      loading: true,
    });

    const { dispatch } = this.props;
    await dispatch({
      type: 'order/getOrderList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        createdDate: moment(value, DATE_FORMAT).format(DATE_FORMAT_CALL_API),
        status: this.state.status,
        phone: this.state.phone,
      },
    });
    this.setState({ loading: false });
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
              loading={this.state.loading}
              className={styles.table}
              dataSource={dataList}
              columns={columnList}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    router.push(
                      `/fca-management/order-management/order-information?id=${record.id}`,
                    );
                  },
                };
              }}
              pagination={{
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} records`,
                current: this.state.page,
                pageSize: this.state.pageSize,
                total: totalOrder,
                onChange: this.onChangePaging,
                showSizeChanger: true,
              }}
              bordered
            ></Table>
          </div>
        </div>
      </div>
    );
  }
}

export default DataTable;
