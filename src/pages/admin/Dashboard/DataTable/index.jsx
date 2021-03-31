import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import { router } from 'umi';
import styles from './index.less';
import { PAGE_SIZE } from '../../../../../config/constants';
import DetailsDrawer from '../DetailsDrawer/index';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false,
      drawerContent: {},
    };
  }

  onRowClick = record => {
    this.setState({ drawerVisible: true, drawerContent: record });
  };
  hideModal = () => {
    this.setState({ drawerVisible: false });
  };

  render() {
    const { columnList, dataList, pageSize, mode } = this.props;
    return (
      <div>
        <div>
          <div>
            <Table
              className={styles.table}
              dataSource={dataList}
              columns={columnList}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    event.preventDefault();
                    this.onRowClick(record);
                  },
                };
              }}
              pagination={{
                pageSize: pageSize,
                total: dataList.length,
                showSizeChanger: false,
              }}
              bordered
            ></Table>
            <DetailsDrawer
              visible={this.state.drawerVisible}
              hideModal={this.hideModal}
              data={this.state.drawerContent}
              mode={mode}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DataTable;
