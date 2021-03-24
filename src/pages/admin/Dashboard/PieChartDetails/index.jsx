import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Badge, Descriptions } from 'antd';
// import styles from './index.less';

class PieChartDetails extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <Descriptions
          column={1}
          title={<Badge color="#b3e2cd" text={<span style={{ color: '#b3e2cd' }}>Opening</span>} />}
        >
          <Descriptions.Item label="Normal">450</Descriptions.Item>
          <Descriptions.Item label="Almost expired">100</Descriptions.Item>
        </Descriptions>
        <Descriptions
          column={1}
          title={<Badge color="#fdcdac" text={<span style={{ color: '#fdcdac' }}>Closing</span>} />}
        >
          <Descriptions.Item label="Normal">50</Descriptions.Item>
          <Descriptions.Item label="Expired">50</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

export default PieChartDetails;
