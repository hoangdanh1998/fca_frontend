import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Space, Card, Statistic, Row, Col } from 'antd';
import styles from './index.less';
import { STATISTICS_PARTNER } from '../../../../../config/seedingData';

class StatisticsBox extends React.Component {
  state = {};

  render() {
    // const data = this.props.data;
    const data = STATISTICS_PARTNER;
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card style={{ backgroundColor: 'whitesmoke', textAlign: 'center' }}>
          <Statistic
            title="Total"
            value={data.TOTAL}
            valueStyle={{ color: 'black', fontSize: 40 }}
          />
        </Card>
        <Row>
          <Col span={8}>
            <Card
              style={{
                width: '95%',
                marginLeft: '2.5%',
                backgroundColor: '#DAE8FC',
                textAlign: 'center',
              }}
            >
              <Statistic
                style={{ color: 'blue' }}
                title="Processing"
                value={data.PROCESSING}
                valueStyle={{ fontSize: 30, color: '#6C8EBF' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{
                width: '95%',
                marginLeft: '2.5%',
                backgroundColor: '#D5E8D4',
                textAlign: 'center',
              }}
            >
              <Statistic
                title="Approved"
                value={data.APPROVED}
                valueStyle={{ fontSize: 30, color: '#82B366' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{
                width: '95%',
                marginLeft: '2.5%',
                backgroundColor: '#F8CECC',
                textAlign: 'center',
              }}
            >
              <Statistic
                title="Rejected"
                value={data.REJECTED}
                valueStyle={{ fontSize: 30, color: '#B85450' }}
              />
            </Card>
          </Col>
        </Row>
      </Space>
    );
  }
}

export default StatisticsBox;
