import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { PAGE_SIZE } from '../../../../../../../config/constants';

// @connect(({ partner, loading }) => {
//   return {
//     dataList: partner.allPartnerList,
//     totalPartner: partner.totalPartner,
//   };
// })
class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 1,
      PAGE_SIZE: PAGE_SIZE,
    };
  }

  componentWillMount() {
    //   const { dispatch } = this.props;
    //   dispatch({
    //     type: 'partner/getPartnerList',
    //     payload: {
    //       name: '',
    //       status: '',
    //       skip: this.state.skip,
    //       limit: this.state.PAGE_SIZE,
    //     },
    //   });
  }

  onChangePaging = page => {
    // const { dispatch } = this.props;
    // this.setState({
    //   skip: page,
    // });
    // dispatch({
    //   type: 'partner/getPartnerList',
    //   payload: {
    //     name: '',
    //     status: '',
    //     skip: this.state.skip,
    //     limit: this.state.PAGE_SIZE,
    //   },
    // });
  };

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
              pagination={{
                current: this.state.skip,
                pageSize: this.state.PAGE_SIZE,
                total: totalRecords,
                onChange: this.onChangePaging,
              }}
              // expandable={{
              //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.imageLink}</p>,
              //   rowExpandable: record => record.name !== 'Not Expandable',
              // }}
              bordered
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DataTable;
