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
import { LICENSE_LIST } from '../../../../../config/seedingData';
import styles from './index.less';

// @connect(({ order, loading }) => {
//   return {
//     dataList: order.allOrderList,
//     totalOrder: order.totalOrder,
//   };
// })
class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      skip: 0,
      pageSize: PAGE_SIZE,
    };
  }

  componentWillMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'order/getOrderList',
    //   payload: {
    //     createdDate: this.state.createdDate,
    //     status: this.state.status,
    //     phone: this.state.phone,
    //     skip: this.state.skip,
    //     limit: this.state.pageSize,
    //   },
    // });
  }

  onChangePaging = (page, pageSize) => {
    const { dispatch } = this.props;
    this.setState({
      pageIndex: page,
      pageSize: pageSize,
    });
    // dispatch({
    //   type: 'order/getOrderList',
    //   payload: {
    //     createdDate: this.state.createdDate,
    //     status: this.state.status,
    //     phone: this.state.phone,
    //     skip: parseInt((page - 1) * pageSize),
    //     limit: pageSize,
    //   },
    // });
  };

  render() {
    // const { columnList, dataList, totalLicense } = this.props;
    const columnList = this.props.columnList;
    const dataList = LICENSE_LIST;
    const totalLicense = LICENSE_LIST.length;
    return (
      <div>
        <div>
          <div>
            <Table
              className={styles.table}
              dataSource={dataList}
              columns={columnList}
              pagination={{
                current: this.state.page,
                pageSize: this.state.pageSize,
                total: totalLicense,
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
