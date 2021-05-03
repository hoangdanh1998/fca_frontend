import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { PAGE_SIZE } from '../../../../../../../config/constants';

@connect(({ partner, loading }) => {
  return {
    dataList: partner.allTransactionList,
    totalTransaction: partner.totalTransaction,
  };
})
class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      pageSize: PAGE_SIZE,
      loading: false,
    };
  }

  async componentWillMount() {
    this.setState({ loading: true });
    const { dispatch } = this.props;
    await dispatch({
      type: 'partner/getTransactionList',
      payload: {
        search: this.props.phone,
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
      type: 'partner/getTransactionList',
      payload: {
        search: this.props.phone,
        skip: parseInt((page - 1) * pageSize),
        limit: pageSize,
      },
    });
    this.setState({ loading: false });
  };

  render() {
    const { columnList, dataList, totalTransaction } = this.props;
    return (
      <div>
        <div>
          <div>
            <Table
              className={styles.table}
              dataSource={dataList}
              columns={columnList}
              loading={this.state.loading}
              pagination={{
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} records`,
                current: this.state.page,
                pageSize: this.state.PAGE_SIZE,
                total: totalTransaction,
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
