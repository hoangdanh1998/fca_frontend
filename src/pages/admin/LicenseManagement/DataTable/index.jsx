import React from 'react';
import { Table, Space, Input, InputNumber } from 'antd';
import { SearchOutlined, SwapRightOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { PAGE_SIZE } from '../../../../../config/constants';
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
      loading: false,
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
    return (
      <div>
        <div>
          {/* SEARCH MODAL */}
          <br />
          <Space direction="horizontal">
            <Input.Search
              // onPressEnter={this.handlePressSearch}
              // onSearch={this.handleClickSearch}
              style={{ width: 300 }}
              allowClear
              placeholder="Enter name"
            />
            <Input.Group>
              <Input style={{ width: 150, textAlign: 'center' }} placeholder="Duration From" />
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                }}
                placeholder="~"
                disabled
              />
              <Input.Search
                className="site-input-right"
                style={{
                  width: 180,
                  textAlign: 'center',
                }}
                placeholder="Duration To"
              />
            </Input.Group>
            <Input.Group compact>
              <Input style={{ width: 150, textAlign: 'center' }} placeholder="Price From" />
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: 'none',
                }}
                placeholder="~"
                disabled
              />
              <Input.Search
                className="site-input-right"
                style={{
                  width: 180,
                  textAlign: 'center',
                }}
                placeholder="Price To"
              />
            </Input.Group>
          </Space>
          <br />
          <br />
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
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} records`,
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
