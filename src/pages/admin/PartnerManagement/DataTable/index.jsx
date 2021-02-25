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
      name: '',
      status: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/getPartnerList',
      payload: {
        name: this.state.name,
        status: this.state.status,
        skip: this.state.skip,
        limit: this.state.pageSize,
      },
    });
  }

  onChangePaging = page => {
    const { dispatch } = this.props;
    this.setState({
      pageIndex: page,
    });
    dispatch({
      type: 'partner/getPartnerList',
      payload: {
        name: this.state.name,
        status: this.state.status,
        skip: parseInt((page - 1) * PAGE_SIZE),
        limit: this.state.pageSize,
      },
    });
  };

  handlePressSearch = e => {
    this.setState({ name: e.target.value });
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/getPartnerList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        name: e.target.value,
        status: this.state.status,
      },
    });
  };
  handleClickSearch = (value, event) => {
    this.setState({ name: value });
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/getPartnerList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        name: value,
        status: this.state.status,
      },
    });
  };
  handleChangeFilter = e => {
    this.setState({ status: e.target.value === 'ALL' ? '' : e.target.value });
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/getPartnerList',
      payload: {
        skip: this.state.skip,
        limit: this.state.pageSize,
        name: this.state.name,
        status: e.target.value === 'ALL' ? '' : e.target.value,
      },
    });
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
              placeholder="Enter name"
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
              className={styles.table}
              dataSource={dataList}
              columns={columnList}
              pagination={{
                current: this.state.pageIndex,
                pageSize: this.state.pageSize,
                total: totalPartner,
                onChange: this.onChangePaging,
                showSizeChanger: false,
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
