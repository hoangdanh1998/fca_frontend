import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import { router } from 'umi';
import styles from './index.less';
import { PAGE_SIZE } from '../../../../../config/constants';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      skip: 0,
      pageSize: PAGE_SIZE,
    };
  }

  async componentWillMount() {
    this.setState({ loading: true });
    // const { dispatch } = this.props;
    // await dispatch({
    //   type: 'order/getOrderList',
    //   payload: {
    //     createdDate: this.state.createdDate,
    //     status: this.state.status,
    //     phone: this.state.phone,
    //     skip: this.state.skip,
    //     limit: this.state.pageSize,
    //   },
    // });
    this.setState({ loading: false });
  }

  onChangePaging = async (page, pageSize) => {
    // const { dispatch } = this.props;
    // this.setState({
    //   pageIndex: page,
    //   pageSize: pageSize,
    //   loading: true,
    // });
    // await dispatch({
    //   type: 'order/getOrderList',
    //   payload: {
    //     createdDate: this.state.createdDate,
    //     status: this.state.status,
    //     phone: this.state.phone,
    //     skip: parseInt((page - 1) * pageSize),
    //     limit: pageSize,
    //   },
    // });
    // this.setState({ loading: false });
  };

  render() {
    const { columnList, dataList, totalData } = this.props;
    return (
      <div>
        <div>
          <div>
            <Table
              //   loading={this.state.loading}
              className={styles.table}
              dataSource={dataList}
              columns={columnList}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    // router.push(
                    //   `/fca-management/order-management/order-information?id=${record.id}`,
                    // );
                  },
                };
              }}
              pagination={{
                current: this.state.page,
                pageSize: this.state.pageSize,
                total: totalData,
                // onChange: this.onChangePaging,
                showSizeChanger: false,
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
