import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Skeleton, DatePicker, Select, Divider } from 'antd';
import LineChart from './LineChart/index';
import PieChart from './PieChart/index';
import StatisticsBox from './StatisticsBox/index';
import PieChartDetails from './PieChartDetails/index';
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
  };
})
class Dashboard extends React.Component {
  state = {
    loading: false,
    orderStartDate: moment(),
    orderEndDate: moment(),
    orderPartnerName: '',
    selectedPointLine: {
      startDate: moment(),
      endDate: moment(),
    },
    searchPartnerList: this.props.filteredPartnerList,
    searchLoading: false,
  };

  async componentWillMount() {
    this.setState({ loading: true });
    const { dispatch } = this.props;
    await dispatch({
      type: 'statistics/getOrderStatisticsByPartner',
      payload: {
        id: '9ceee651-7dea-4a0f-b517-b49166cb6cfb',
        // fromDate: moment().format(DATE_FORMAT_CALL_API),
        // toDate: moment().format(DATE_FORMAT_CALL_API),
        fromDate: '2021-3-25',
        toDate: '2021-3-26',
      },
    });
    await dispatch({
      type: 'statistics/filterPartner',
      payload: {
        search: '',
      },
    });
    this.setState({ searchPartnerList: this.props.filteredPartnerList });
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

  handleSelectPointLine = (point, event) => {
    this.setState({
      selectedPointLine: {
        x: point.data.x,
        y: point.data.y,
        startDate: moment(point.data.value),
        endDate: moment(point.data.value),
      },
    });
  };

  handleSearchPartner = async value => {
    console.log('value', value);
    const searchedList = this.state.searchPartnerList.filter(partner => {
      return partner.label.search(value) != -1;
    });
    if (searchedList.length > 0) {
      this.setState({ searchPartnerList: searchedList });
    } else {
      const { dispatch } = this.props;
      this.setState({ searchLoading: true });
      await dispatch({
        type: 'statistics/filterPartner',
        payload: {
          search: value,
        },
      });
      this.setState({
        searchPartnerList: this.props.filteredPartnerList,
        searchLoading: false,
      });
    }
  };

  render() {
    return this.state.loading ? (
      <Skeleton loading={this.state.loading} />
    ) : (
      <div className={styles.applicationManagementContainer}>
        {/* PARTNER STATISTICS */}
        <div style={{ height: 400, backgroundColor: 'white', width: '100%', float: 'left' }}>
          <div style={{ height: 'auto', width: '95%', marginLeft: '2.5%', paddingTop: '2.5%' }}>
            <h1 style={{ height: 50, fontSize: 25, fontWeight: 'bold' }}>Partner Statistic</h1>
            <div
              style={{
                width: '50%',
                float: 'left',
                height: 350,
              }}
            >
              <StatisticsBox />
            </div>
            <div style={{ width: '50%', float: 'left', height: 350 }}>
              <h3 style={{ height: 50, fontWeight: 'bold', textAlign: 'center' }}>
                Approved Partner
              </h3>
              <div style={{ width: '70%', float: 'left', height: 300 }}>
                <div style={{ height: 250 }}>
                  <PieChart
                    data={PIE_CHART_DATA_PARTNER}
                    legends={{ anchor: 'bottom', direction: 'row' }}
                  />
                </div>
              </div>
              <div style={{ width: '30%', float: 'left', height: 300 }}>
                <div style={{ height: 250 }}>
                  <PieChartDetails mode="partner" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <Divider />
        {/* ORDER STATISTICS */}
        <div style={{ height: 'auto', backgroundColor: 'white', width: '100%', float: 'left' }}>
          <div style={{ height: 'auto', width: '95%', marginLeft: '2.5%', paddingTop: '2.5%' }}>
            {/* SEARCH HEADER _ ORDER */}
            <div style={{ height: 30, width: '100%' }}>
              <div style={{ width: '40%', float: 'left' }}>
                <h1 style={{ fontSize: 25, fontWeight: 'bold' }}>Order Statistic</h1>
                <p>Cà phê sân vườn Mimosa</p>
                <p>
                  {this.state.orderStartDate.isSame(this.state.orderEndDate)
                    ? ` on ${this.state.orderStartDate.format(DATE_FORMAT)}`
                    : ` in ${this.state.orderStartDate?.format(
                        DATE_FORMAT,
                      )} - ${this.state.orderEndDate?.format(DATE_FORMAT)}`}
                </p>
              </div>
              <DatePicker.RangePicker
                onCalendarChange={this.handleChangeOrderDate}
                onChange={this.handleChangeOrderDate}
                style={{ width: '27.5%', float: 'left' }}
              />
              <Select
                showSearch
                loading={this.state.searchLoading}
                style={{ width: '27.5%', float: 'left', marginLeft: '2.5%' }}
                placeholder="Select a partner"
                options={this.state.searchPartnerList}
                optionFilterProp="children"
                onSearch={this.handleSearchPartner}
              ></Select>
            </div>
            {/* LINE CHART */}
            <div
              style={{
                width: '100%',
                float: 'left',
                height: 330,
              }}
            >
              <LineChart
                onClick={(point, event) => {
                  this.handleSelectPointLine(point, event);
                }}
                data={LINE_CHART_DATA}
              />
            </div>
            {/* ORDER STATISTICS DETAILS */}
            <br />
            <div style={{ width: '100%', float: 'left', height: 'auto' }}>
              <br />
              <br />
              <div style={{ width: '100%', float: 'left', height: 'auto' }}>
                <div style={{ height: 300, width: '50%', float: 'left' }}>
                  <PieChart
                    // data={PIE_CHART_DATA_ORDER}
                    data={this.props.orderStatisticsOfOnePartner.orderInChart}
                    legends={{ anchor: 'bottom', direction: 'row' }}
                  />
                </div>
                <div style={{ width: '50%', float: 'left', height: 'auto' }}>
                  <h3
                    style={{ height: 20, fontWeight: 'bold', textAlign: 'center', width: '100%' }}
                  >
                    Order Statistics
                    {this.state.orderStartDate.isSame(this.state.orderEndDate)
                      ? ` on ${this.state.orderStartDate.format(DATE_FORMAT)}`
                      : ` in ${this.state.orderStartDate?.format(
                          DATE_FORMAT,
                        )} - ${this.state.orderEndDate?.format(DATE_FORMAT)}`}
                  </h3>
                  <p style={{ height: 15, textAlign: 'center', width: '100%' }}>
                    {`Total: ${this.props.orderStatisticsOfOnePartner.orderTotal} orders`}
                  </p>
                  <PieChartDetails
                    mode="order"
                    data={this.props.orderStatisticsOfOnePartner.cancelledReasonList}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
