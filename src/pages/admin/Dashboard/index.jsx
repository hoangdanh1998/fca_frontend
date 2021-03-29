import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Skeleton, DatePicker, Button, Divider, Row, Col, Card } from 'antd';
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
    isError: statistics.isError,
    partnerStatistics: statistics.partnerStatistics,
    openingPartnerList: statistics.openingPartnerList,
    openingNormalPartnerList: statistics.openingNormalPartnerList,
    openingAlmostExpiredPartnerList: statistics.openingAlmostExpiredPartnerList,
    closingPartnerList: statistics.closingPartnerList,
    closingNormalPartnerList: statistics.closingNormalPartnerList,
    closingExpiredPartnerList: statistics.closingExpiredPartnerList,

    orderStatistics: statistics.orderStatistics,
    rejectionOrderDetailsList: statistics.rejectionOrderDetailsList,
    cancellationOrderDetailsList: statistics.cancellationOrderDetailsList,
  };
})
class Dashboard extends React.Component {
  state = {
    loading: false,
    calendarStartDate: moment(),
    calendarEndDate: moment(),
    orderColumnListName: 'Cancellation',
    partnerTitle: 'Opening Partners',
    partnerDataList: this.props.openingPartnerList,
    orderDataList: this.props.cancellationOrderDetailsList,
    openCalendar: false,
  };

  async componentWillMount() {
    this.setState({ loading: true });
    const { dispatch } = this.props;
    await dispatch({
      type: 'statistics/getReportStatistics',
      payload: {
        fromDate: this.state.calendarStartDate.format(DATE_FORMAT_CALL_API),
        toDate: this.state.calendarEndDate.add(1, 'day').format(DATE_FORMAT_CALL_API),
      },
    });
    this.setState({
      loading: false,
      partnerDataList: this.props.openingPartnerList,
      orderColumnListName: 'Cancellation',
      orderDataList: this.props.cancellationOrderDetailsList,
    });
  }

  handleChangeDate = async (dates, dateStrings) => {
    if ((dates && !dates[0] && !dates[1]) || !dates) {
      this.setState({
        calendarStartDate: moment(),
        calendarEndDate: moment(),
      });
      return;
    }

    this.setState({
      calendarStartDate: dates ? dates[0] : null,
      calendarEndDate: dates ? dates[1] : null,
    });
    // console.log(`startDate: ${dates ? dates[0] : null} - endDate: ${dates ? dates[1] : null}`);
  };
  handleGetReportWhenChangeDate = async () => {
    this.setState({ loading: true, openCalendar: false });
    const { dispatch } = this.props;
    await dispatch({
      type: 'statistics/getReportStatistics',
      payload: {
        fromDate: this.state.calendarStartDate.format(DATE_FORMAT_CALL_API),
        toDate: this.state.calendarEndDate.format(DATE_FORMAT_CALL_API),
      },
    });
    this.setState({
      orderColumnListName: '',
      partnerTitle: 'Opening Partners',
      partnerDataList: this.props.openingPartnerList,
      orderDataList: this.props.cancellationOrderDetailsList,
      loading: false,
    });
  };

  handleClickBox = action => {
    // alert(action);
    switch (action) {
      case 'Rejection':
        this.setState({
          orderColumnListName: action,
          orderDataList: this.props.rejectionOrderDetailsList,
        });
        break;
      case 'Cancellation':
        this.setState({
          orderColumnListName: action,
          orderDataList: this.props.cancellationOrderDetailsList,
        });
        break;
      case 'Closure':
        this.setState({ orderColumnListName: '' });
        break;
      case 'OPENING':
        this.setState({
          partnerTitle: 'Opening Partners',
          partnerDataList: this.props.openingPartnerList,
        });
        break;
      case 'OPENING_NORMAL_PARTNER':
        this.setState({
          partnerTitle: 'Normal Opening Partners',
          partnerDataList: this.props.openingNormalPartnerList,
        });
        break;
      case 'OPENING_ALMOST_EXPIRED_PARTNER':
        this.setState({
          partnerTitle: 'Almost Expired Opening Partners',
          partnerDataList: this.props.openingAlmostExpiredPartnerList,
        });
        break;
      case 'CLOSING':
        this.setState({
          partnerTitle: 'Closing Partners',
          partnerDataList: this.props.closingPartnerList,
        });
        break;
      case 'CLOSING_NORMAL_PARTNER':
        this.setState({
          partnerTitle: 'Normal Closing Partners',
          partnerDataList: this.props.closingNormalPartnerList,
        });
        break;
      case 'CLOSING_EXPIRED_PARTNER':
        this.setState({
          partnerTitle: 'Expired Partners',
          partnerDataList: this.props.closingExpiredPartnerList,
        });
        break;
      default:
        break;
    }
  };

  render() {
    const { partnerStatistics, orderStatistics } = this.props;
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
        dataIndex: 'expirationDate',
        key: 'expirationDate',
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
        dataIndex: 'partnerName',
        key: 'partnerName',
        width: '70%',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
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
          <Col span={12}></Col>
          <Col span={12}>
            <DatePicker.RangePicker
              open={this.state.openCalendar}
              onFocus={() => {
                this.setState({ openCalendar: true });
              }}
              value={[this.state.calendarStartDate, this.state.calendarEndDate]}
              style={{ width: '100%' }}
              format={DATE_FORMAT}
              onChange={this.handleChangeDate}
              renderExtraFooter={() => (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '1%',
                    marginTop: '1%',
                  }}
                >
                  <Button onClick={this.handleGetReportWhenChangeDate} size="small" type="primary">
                    OK
                  </Button>
                </div>
              )}
            />
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
              data={partnerStatistics}
            />
          </Col>
          <Col span={16}>
            {this.state.partnerTitle ? (
              <Card title={this.state.partnerTitle} style={{ height: '100%' }}>
                <DataTable
                  columnList={partnerColumnList}
                  dataList={this.state.partnerDataList}
                  pageSize={3}
                />
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
              data={orderStatistics}
              pageSize={3}
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
                  dataList={this.state.orderDataList}
                  pageSize={this.state.orderColumnListName === 'Rejection' ? 3 : 2}
                />
              </Card>
            ) : null}
          </Col>
        </Row>
        <Divider />
        {/* ITEM */}
        {/* <Row>
          <Col span={8}>
            <StatisticsBox
              onClick={action => {
                this.handleClickBox(action);
              }}
              subject="item"
            />
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default Dashboard;
