import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Skeleton, DatePicker, Select, Divider, Result, Button, Space, Row, Col, Card } from 'antd';
import StatisticsBox from './StatisticsBox/index';
import DataTable from './DataTable/index';
import ExceptionBody from '../../../components/ExceptionBody/index';
import styles from './index.less';
import { DATE_FORMAT, DATE_FORMAT_CALL_API } from '../../../../config/constants';
import {
  LINE_CHART_DATA,
  PIE_CHART_DATA_PARTNER,
  PIE_CHART_DATA_ORDER,
} from '../../../../config/seedingData';

@connect(({ statistics, loading }) => {
  return {
    orderStatisticsOfOnePartner: statistics.orderStatisticOfOnePartner,
    filteredPartnerList: statistics.filteredPartnerList,
    partnerStatistics: statistics.partnerStatistics,
    isError: statistics.isError,
  };
})
class Dashboard extends React.Component {
  state = {
    loading: false,
    orderStartDate: moment(),
    orderEndDate: moment(),
    orderColumnListName: '',
    partnerTitle: '',
  };

  async componentWillMount() {
    this.setState({ loading: true });
    // const { dispatch } = this.props;
    // await dispatch({
    //   type: 'statistics/getOrderStatisticsByPartner',
    //   payload: {
    //     id: '9ceee651-7dea-4a0f-b517-b49166cb6cfb',
    //     // fromDate: moment().format(DATE_FORMAT_CALL_API),
    //     // toDate: moment().format(DATE_FORMAT_CALL_API),
    //     fromDate: '2021-3-25',
    //     toDate: '2021-3-26',
    //   },
    // });
    // await dispatch({
    //   type: 'statistics/getPartnerStatistics',
    //   payload: {},
    // });
    // await dispatch({
    //   type: 'statistics/filterPartner',
    //   payload: {
    //     search: '',
    //   },
    // });
    // this.setState({ searchPartnerList: this.props.filteredPartnerList });
    this.setState({ loading: false });
  }

  handleChangeOrderDate = (dates, dateStrings, info) => {
    if ((dates && !dates[0] && !dates[1]) || !dates) {
      this.setState({
        orderStartDate: moment(),
        orderEndDate: moment(),
        selectedPointLine: {
          startDate: moment(),
          endDate: moment(),
        },
      });
      return;
    }
    this.setState({
      orderStartDate: dates ? dates[0] : null,
      orderEndDate: dates ? dates[1] : null,
      selectedPointLine: {
        startDate: dates ? dates[0] : null,
        endDate: dates ? dates[1] : null,
      },
    });
  };

  handleClickBox = action => {
    // alert(action);
    switch (action) {
      case 'Rejection':
        this.setState({ orderColumnListName: action });
        break;
      case 'Cancellation':
        this.setState({ orderColumnListName: action });
        break;
      case 'Closure':
        this.setState({ orderColumnListName: '' });
        break;
      case 'OPENING_NORMAL_PARTNER':
        this.setState({ partnerTitle: 'Normal Opening Partners' });
        break;
      case 'OPENING_ALMOST_EXPIRED_PARTNER':
        this.setState({ partnerTitle: 'Almost Expired Opening Partners' });
        break;
      case 'CLOSING_NORMAL_PARTNER':
        this.setState({ partnerTitle: 'Normal Closing Partners' });
        break;
      case 'CLOSING_EXPIRED_PARTNER':
        this.setState({ partnerTitle: 'Expired Partners' });
        break;
      default:
        break;
    }
  };

  render() {
    const partnerColumnList = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
      },
      {
        title: 'Address',
        dataIndex: ['address', 'description'],
        key: ['address', 'description'],
        width: '50%',
      },
      {
        title: 'Expiration Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'right',
        sorter: (a, b) =>
          moment(a.expirationDate, DATE_FORMAT_CALL_API) -
          moment(b.expirationDate, DATE_FORMAT_CALL_API),
        defaultSortOrder: 'ascend',
        render: (text, record, index) => {
          return record.expirationDate ? moment(record.expirationDate).format(DATE_FORMAT) : '-';
        },
        width: '25%',
      },
    ];
    const rejectionColumnList = [
      {
        title: 'Partner Name',
        dataIndex: 'name',
        key: 'name',
        width: '70%',
      },
      {
        title: 'Quantity',
        dataIndex: 'count',
        key: 'count',
        width: '20%',
        align: 'right',
      },
    ];
    const cancellationColumnList = [
      {
        title: 'Customer Phone',
        dataIndex: 'customerPhone',
        key: 'customerPhone',
        width: '20%',
        align: 'right',
      },
      {
        title: 'Partner Name',
        dataIndex: 'partnerName',
        key: 'partnerName',
        width: '20%',
      },
      {
        title: 'Cancelled By',
        dataIndex: 'requestBy',
        key: 'requestBy',
        width: '20%',
      },
      {
        title: 'Reason',
        dataIndex: 'reason',
        key: 'reason',
        width: '35%',
      },
    ];
    return this.state.loading ? (
      <Skeleton loading={this.state.loading} />
    ) : this.props.isError ? (
      <ExceptionBody />
    ) : (
      <div className={styles.applicationManagementContainer}>
        {/* DATE */}
        <Row>
          <Col span={8}></Col>
          <Col span={8}></Col>
          <Col span={8}>
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Col>
        </Row>
        <br />
        {/* PARTNER */}
        <Row>
          <Col span={8}>
            <StatisticsBox
              onClick={action => {
                this.handleClickBox(action);
              }}
              subject="partner"
            />
          </Col>
          <Col span={16}>
            {this.state.partnerTitle ? (
              <Card title={this.state.partnerTitle} style={{ height: '100%' }}>
                <DataTable columnList={partnerColumnList} />
              </Card>
            ) : null}
          </Col>
        </Row>
        <Divider />
        {/* ORDER */}
        <Row>
          <Col span={8}>
            <StatisticsBox
              onClick={action => {
                this.handleClickBox(action);
              }}
              subject="order"
            />
          </Col>
          <Col span={16}>
            {this.state.orderColumnListName ? (
              <Card
                title={`${this.state.orderColumnListName} Orders Information`}
                style={{ height: '100%' }}
              >
                <DataTable
                  columnList={
                    this.state.orderColumnListName === 'Rejection'
                      ? rejectionColumnList
                      : cancellationColumnList
                  }
                />
              </Card>
            ) : null}
          </Col>
        </Row>
        <Divider />
        {/* ITEM */}
        <Row>
          <Col span={8}>
            <StatisticsBox
              onClick={action => {
                this.handleClickBox(action);
              }}
              subject="item"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
