import React from 'react';
import { Table, Dropdown, Menu, Icon } from 'antd';
import { connect } from 'dva';
import { PAGE_SIZE } from '../../../../../config/constants';
import styles from './index.less';
import 'antd/dist/antd.css';
import ContextMenu from '../../../../components/atom/ContextMenu/index';

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
      loading: false,
      visibleMenu: false,
      menu: {
        visible: false,
        // x: 0,
        // y: 0,
      },
    };
  }

  async componentWillMount() {
    const { dispatch } = this.props;
    this.setState({ loading: true });
    await dispatch({
      type: 'license/getFcaLicenseList',
      payload: {
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
      type: 'license/getFcaLicenseList',
      payload: {
        skip: parseInt((page - 1) * pageSize),
        limit: pageSize,
      },
    });
    this.setState({ loading: false });
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
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    this.props.onClickRow(record);
                  },
                };
              }}
              pagination={{
                current: this.state.pageIndex,
                pageSize: this.state.pageSize,
                total: totalFcaLicense,
                onChange: this.onChangePaging,
                showSizeChanger: true,
              }}
              bordered
              loading={this.state.loading}
            ></Table>
          </div>
        </div>
      </div>
    );
  }
}

export default DataTable;
