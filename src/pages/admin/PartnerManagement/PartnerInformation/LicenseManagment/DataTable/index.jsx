import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { PAGE_SIZE } from '../../../../../../../config/constants';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      PAGE_SIZE: PAGE_SIZE,
      page: 1,
    };
  }

  render() {
    const { columnList, totalPartner, dataList } = this.props;
    return (
      <div>
        <div>
          <div>
            <Table
              className={styles.table}
              dataSource={dataList}
              columns={columnList}
              pagination={{
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} records`,
                current: this.state.page,
                pageSize: this.state.PAGE_SIZE,
                total: dataList.length,
                // onChange: this.onChangePaging,
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
