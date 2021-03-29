import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { PAGE_SIZE } from '../../../../../../../config/constants';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 1,
      PAGE_SIZE: PAGE_SIZE,
    };
  }

  render() {
    const { columnList, totalRecords, dataList } = this.props;
    return (
      <div>
        <div>
          <div>
            <Table
              className={styles.table}
              dataSource={dataList ? dataList : []}
              columns={columnList}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    this.props.onClickRow(record);
                  },
                };
              }}
              pagination={{
                current: this.state.page,
                pageSize: this.state.PAGE_SIZE,
                total: dataList.length,
                // onChange: this.onChangePaging,
              }}
              bordered
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DataTable;
