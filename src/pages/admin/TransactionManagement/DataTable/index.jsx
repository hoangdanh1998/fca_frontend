import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Table, Space, Input, DatePicker, Divider } from 'antd';
import { PAGE_SIZE, DATE_FORMAT } from '../../../../../config/constants';
import styles from './index.less';

@connect(({ transaction, loading }) => {
  return {
    dataList: transaction.allTransactionList,
    totalTransaction: transaction.totalTransaction,
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
      search: '',
    };
  }

  async componentWillMount() {
    const { dispatch } = this.props;
    this.setState({ loading: true });
    await dispatch({
      type: 'transaction/getTransactionList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        search: this.state.search,
      },
    });
    this.setState({ loading: false });
  }

  handlePressSearch = async e => {
    this.setState({ search: e.target.value, loading: true });
    const { dispatch } = this.props;
    await dispatch({
      type: 'transaction/getTransactionList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        search: e.target.value,
      },
    });
    this.setState({ loading: false });
  };
  handleClickSearch = async (value, event) => {
    this.setState({ search: value, loading: true });
    const { dispatch } = this.props;
    await dispatch({
      type: 'transaction/getTransactionList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        search: value,
      },
    });
    this.setState({ loading: false });
  };

  onChangePaging = async (page, pageSize) => {
    const { dispatch } = this.props;
    this.setState({
      pageIndex: page,
      pageSize: pageSize,
      loading: true,
    });
    await dispatch({
      type: 'transaction/getTransactionList',
      payload: {
        skip: parseInt((page - 1) * pageSize),
        limit: pageSize,
        search: this.state.search,
      },
    });
    this.setState({ loading: false });
  };

  render() {
    const { dataList, totalTransaction, columnList } = this.props;
    return (
      <div>
        <div>
          <Space direction="horizontal">
            <Input.Search
              onPressEnter={this.handlePressSearch}
              onSearch={this.handleClickSearch}
              style={{ width: 300 }}
              allowClear
              placeholder="Enter phone"
            />
          </Space>
          <br />
          <br />
          <div>
            <Table
              className={styles.table}
              dataSource={dataList}
              columns={columnList}
              pagination={{
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} records`,
                current: this.state.pageIndex,
                pageSize: this.state.pageSize,
                total: totalTransaction,
                onChange: this.onChangePaging,
                showSizeChanger: true,
              }}
              bordered
              loading={this.state.loading}
            ></Table>
          </div>
        </div>
      </div>
    );
  }
}

export default DataTable;
