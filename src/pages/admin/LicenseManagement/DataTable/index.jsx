import React from 'react';
import { Table, Input, Space, DatePicker, Radio } from 'antd';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { connect } from 'dva';
import {
  DATE_FORMAT_CALL_API,
  PAGE_SIZE,
  DATE_FORMAT,
  ORDER_STATUS_FILTER,
} from '../../../../../config/constants';
import styles from './index.less';

@connect(({ license, loading }) => {
  return {
    dataList: license.allFcaLicenseList,
    totalFcaLicense: license.totalFcaLicense,
  };
})
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
    const { dispatch } = this.props;
    await dispatch({
      type: 'license/getFcaLicenseList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
      },
    });
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
    const { dataList, totalFcaLicense, columnList } = this.props;
    console.log('dataList', dataList);
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
                total: totalFcaLicense,
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
