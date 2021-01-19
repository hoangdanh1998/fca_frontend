import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import CardTouchpointNew from '@/components/CardTouchpointNew';
import styles from './dashboard.less';

@connect(({ admin, loading }) => {
  return {
    dataDashboard: admin.dataDashboard,
    numOfColumn: admin.numOfColumn,
    isLoadingTouchpoints: loading.effects['admin/getTouchPoints'],
  };
})
class TableDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'admin/getTouchPoints' });
    // I must use this
    setTimeout(() => {
      const table = document.getElementsByClassName('ant-table-body')[0];
      table.scroll({
        top: 0,
        left: 6000,
        behavior: 'smooth',
      });
    }, 1000);
  }

  render() {
    const { dataDashboard, numOfColumn } = this.props;
    const columns = [
      {
        fixed: 'left',
        key: 1,
        width: '150px',
        dataIndex: 'type',
      },
    ];
    for (let i = 0; i < numOfColumn; i += 1) {
      columns.push({
        key: i + 1,
        title: `Touchpoint #${i + 1}`,
        dataIndex: `TP${i + 1}`,
        width: 290,
        render: text => (
          <div style={{ height: '173px' }}>
            {text
              ? text.map(groupCandidate => {
                  return (
                    <CardTouchpointNew status="highPriority" groupCandidate={groupCandidate} />
                  );
                })
              : ''}
          </div>
        ),
      });
    }
    return (
      <Table
        dataSource={dataDashboard}
        columns={columns}
        className={styles.tableDashboard}
        bordered
        sticky
        pagination={false}
        loading={this.props.isLoadingTouchpoints}
        scroll={{ x: 1000, y: 800 }}
      />
    );
  }
}

export default TableDashboard;
