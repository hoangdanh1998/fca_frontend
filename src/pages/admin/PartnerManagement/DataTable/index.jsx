import React from 'react';
import { Table, Input, Space, Radio } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { PAGE_SIZE, PARTNER_STATUS_FILTER } from '../../../../../config/constants';

@connect(({ partner, loading }) => {
  return {
    dataList: partner.allPartnerList,
    totalPartner: partner.totalPartner,
  };
})
class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      skip: 0,
      pageSize: PAGE_SIZE,
      search: '',
      status: '',
      loading: false,
    };
  }

  async componentWillMount() {
    this.setState({ loading: true });
    const { dispatch } = this.props;
    await dispatch({
      type: 'partner/getPartnerList',
      payload: {
        search: this.state.search,
        status: this.state.status,
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
      type: 'partner/getPartnerList',
      payload: {
        search: this.state.search,
        status: this.state.status,
        skip: parseInt((page - 1) * pageSize),
        limit: pageSize,
      },
    });
    this.setState({ loading: false });
  };

  handlePressSearch = async e => {
    this.setState({ search: e.target.value, loading: true });
    const { dispatch } = this.props;
    await dispatch({
      type: 'partner/getPartnerList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        search: e.target.value,
        status: this.state.status,
      },
    });
    this.setState({ loading: false });
  };
  handleClickSearch = async (value, event) => {
    this.setState({ search: value, loading: true });
    const { dispatch } = this.props;
    await dispatch({
      type: 'partner/getPartnerList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        search: value,
        status: this.state.status,
      },
    });
    this.setState({ loading: false });
  };
  handleChangeFilter = async e => {
    this.setState({ status: e.target.value === 'ALL' ? '' : e.target.value, loading: true });
    const { dispatch } = this.props;
    await dispatch({
      type: 'partner/getPartnerList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        search: this.state.search,
        status: e.target.value === 'ALL' ? '' : e.target.value,
      },
    });
    this.setState({ loading: false });
  };

  render() {
    const { columnList, totalPartner, dataList } = this.props;
    return (
      <div>
        <div>
          {/* SEARCH MODAL */}
          <Space direction="vertical">
            <Input.Search
              onPressEnter={this.handlePressSearch}
              onSearch={this.handleClickSearch}
              style={{ width: 300 }}
              allowClear
              placeholder="Enter name, address"
            />
            <Radio.Group
              style={{ display: 'flex' }}
              defaultValue={'ALL'}
              options={PARTNER_STATUS_FILTER}
              onChange={this.handleChangeFilter}
              optionType="button"
            />
            <br />
          </Space>
          <div>
            <Table
              loading={this.state.loading}
              className={styles.table}
              dataSource={dataList}
              columns={columnList}
              pagination={{
                current: this.state.pageIndex,
                pageSize: this.state.pageSize,
                total: totalPartner,
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
