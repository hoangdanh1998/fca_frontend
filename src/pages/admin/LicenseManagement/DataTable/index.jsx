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
      search: '',
      fromDuration: 0,
      toDuration: '',
      fromPrice: 0,
      toPrice: '',
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
        search: this.state.search,
        fromPrice: this.state.fromPrice,
        toPrice: this.state.toPrice,
        fromDuration: this.state.fromDuration,
        toDuration: this.state.toDuration,
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
        search: this.state.search,
        fromPrice: this.state.fromPrice,
        toPrice: this.state.toPrice,
        fromDuration: this.state.fromDuration,
        toDuration: this.state.toDuration,
      },
    });
    this.setState({ loading: false });
  };

  handlePressSearchName = async e => {
    const { dispatch } = this.props;
    this.setState({ search: e.target.value, loading: true });
    await dispatch({
      type: 'license/getFcaLicenseList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        search: e.target.value,
        fromPrice: this.state.fromPrice,
        toPrice: this.state.toPrice,
        fromDuration: this.state.fromDuration,
        toDuration: this.state.toDuration,
      },
    });
    this.setState({ loading: false });
  };
  handleClickSearchName = async (value, event) => {
    this.setState({ search: value, loading: true });
    const { dispatch } = this.props;
    await dispatch({
      type: 'license/getFcaLicenseList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        search: value,
        fromPrice: this.state.fromPrice,
        toPrice: this.state.toPrice,
        fromDuration: this.state.fromDuration,
        toDuration: this.state.toDuration,
      },
    });
    this.setState({ loading: false });
  };

  handlePressSearchPrice = async e => {
    const { dispatch } = this.props;
    this.setState({ toPrice: e.target.value, loading: true });
    await dispatch({
      type: 'license/getFcaLicenseList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        search: this.state.search,
        fromPrice: this.state.fromPrice,
        toPrice: e.target.value,
        fromDuration: this.state.fromDuration,
        toDuration: this.state.toDuration,
      },
    });
    this.setState({ loading: false });
  };
  handlePressSearchFromPrice = async e => {
    const { dispatch } = this.props;
    this.setState({ fromPrice: e.target.value, loading: true });
    await dispatch({
      type: 'license/getFcaLicenseList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        search: this.state.search,
        fromPrice: e.target.value ? e.target.value : 0,
        toPrice: this.state.fromPrice,
        fromDuration: this.state.fromDuration,
        toDuration: this.state.toDuration,
      },
    });
    this.setState({ loading: false });
  };
  handleClickSearchPrice = async (value, event) => {
    this.setState({ toPrice: value, loading: true });
    const { dispatch } = this.props;
    await dispatch({
      type: 'license/getFcaLicenseList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        search: this.state.search,
        fromPrice: this.state.fromPrice,
        toPrice: value,
        fromDuration: this.state.fromDuration,
        toDuration: this.state.toDuration,
      },
    });
    this.setState({ loading: false });
  };

  handlePressSearchDuration = async e => {
    const { dispatch } = this.props;
    this.setState({ toDuration: e.target.value, loading: true });
    await dispatch({
      type: 'license/getFcaLicenseList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        search: this.state.search,
        fromPrice: this.state.fromPrice,
        toPrice: this.state.toPrice,
        fromDuration: this.state.fromDuration,
        toDuration: e.target.value,
      },
    });
    this.setState({ loading: false });
  };
  handlePressSearchFromDuration = async e => {
    const { dispatch } = this.props;
    this.setState({ fromDuration: e.target.value, loading: true });
    await dispatch({
      type: 'license/getFcaLicenseList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        search: this.state.search,
        fromPrice: this.state.fromPrice,
        toPrice: this.state.toPrice,
        fromDuration: e.target.value,
        toDuration: this.state.toDuration,
      },
    });
    this.setState({ loading: false });
  };
  handleClickSearchDuration = async (value, event) => {
    this.setState({ toDuration: value, loading: true });
    const { dispatch } = this.props;
    await dispatch({
      type: 'license/getFcaLicenseList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        search: this.state.search,
        fromPrice: this.state.fromPrice,
        toPrice: this.state.toPrice,
        fromDuration: this.state.fromDuration,
        toDuration: value,
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
              onPressEnter={this.handlePressSearchName}
              onSearch={this.handleClickSearchName}
              style={{ width: 300 }}
              allowClear
              placeholder="Enter name"
            />
            <Input.Group>
              <Input
                style={{ width: 150, textAlign: 'center' }}
                placeholder="Duration From"
                onPressEnter={this.handlePressSearchFromDuration}
              />
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
                onPressEnter={this.handlePressSearchDuration}
                onSearch={this.handleClickSearchDuration}
              />
            </Input.Group>
            <Input.Group compact>
              <Input
                style={{ width: 150, textAlign: 'center' }}
                placeholder="Price From"
                onPressEnter={this.handlePressSearchFromPrice}
              />
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
                onPressEnter={this.handlePressSearchPrice}
                onSearch={this.handleClickSearchPrice}
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
