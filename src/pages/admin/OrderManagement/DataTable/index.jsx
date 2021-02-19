import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import { DATE_FORMAT_CALL_API } from '../../../../../config/constants';
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
      skip: 1,
      PAGE_SIZE: 10,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/getOrderList',
      payload: {
        createdDate: moment().format(DATE_FORMAT_CALL_API),
        status: '',
        skip: this.state.skip,
        limit: this.state.PAGE_SIZE,
      },
    });
  }

  onChangePaging = page => {
    const { dispatch } = this.props;
    this.setState({
      skip: page,
    });
    dispatch({
      type: 'order/getOrderList',
      payload: {
        name: '',
        status: '',
        skip: this.state.skip,
        limit: this.state.PAGE_SIZE,
      },
    });
  };

  render() {
    const { columnList, dataList, totalOrder } = this.props;
    return (
      <div>
        <div>
          <div>
            <Table
              className={styles.table}
              dataSource={dataList}
              columns={columnList}
              pagination={{
                current: this.state.skip,
                pageSize: this.state.PAGE_SIZE,
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
