import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Space, DatePicker, Select } from 'antd';
import LineChart from './LineChart/index';
import PieChart from './PieChart/index';
import StatisticsBox from './StatisticsBox/index';
import PieChartDetails from './PieChartDetails/index';
import styles from './index.less';

class Dashboard extends React.Component {
  state = {};

  render() {
    return (
      <div className={styles.applicationManagementContainer}>
        <div style={{ height: 400, backgroundColor: 'white', width: '100%' }}>
          <div style={{ height: 'auto', width: '95%', marginLeft: '2.5%', paddingTop: '2.5%' }}>
            <h1 style={{ color: '#1890ff', height: 50, fontSize: 30, fontWeight: 'bold' }}>
              Partner Statistic
            </h1>
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
                  <PieChart />
                </div>
              </div>
              <div style={{ width: '30%', float: 'left', height: 300 }}>
                <div style={{ height: 250 }}>
                  <PieChartDetails />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div style={{ height: 500, backgroundColor: 'white' }}>
          <div style={{ height: 'auto', width: '95%', marginLeft: '2.5%', paddingTop: '2.5%' }}>
            <div style={{ height: 50, width: '100%' }}>
              <div style={{ width: '40%', float: 'left' }}>
                <h1 style={{ color: '#1890ff', fontSize: 30, fontWeight: 'bold' }}>
                  Order Statistic
                </h1>
              </div>
              <DatePicker.RangePicker style={{ width: '27.5%', float: 'left' }} />
              <Select
                style={{ width: '27.5%', float: 'left', marginLeft: '2.5%' }}
                placeholder="Select a partner"
                optionFilterProp="children"
              >
                <Select.Option value="jack">Jack</Select.Option>
                <Select.Option value="lucy">Lucy</Select.Option>
                <Select.Option value="tom">Tom</Select.Option>
              </Select>
            </div>
            <div
              style={{
                width: '60%',
                float: 'left',
                height: 400,
              }}
            >
              <LineChart />
            </div>
            <div style={{ width: '40%', float: 'left', height: 350 }}>
              <h3 style={{ height: 50, fontWeight: 'bold', textAlign: 'center' }}>
                Order Statistics in 20/03/2021
              </h3>
              <div style={{ width: '70%', float: 'left', height: 300 }}>
                <div style={{ height: 250 }}>
                  <PieChart />
                </div>
              </div>
              <div style={{ width: '30%', float: 'left', height: 300 }}>
                <div style={{ height: 250 }}>
                  <PieChartDetails />
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
