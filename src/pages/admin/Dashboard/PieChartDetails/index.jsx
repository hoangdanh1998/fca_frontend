import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Badge, Descriptions, Space, Table } from 'antd';
import NumberFormat from 'react-number-format';
import styles from './index.less';

class PieChartDetails extends React.Component {
  state = {};

  render() {
    const mode = this.props.mode;
    const data = this.props.data;
    console.log('pie chart data', data[0]);
    const columnList = [
      {
        title: 'No.',
        render: (text, record, index) => {
          return index + 1;
        },
        align: 'right',
        width: '15%',
      },
      {
        title: 'Reason',
        dataIndex: 'title',
        key: 'title',
        width: '70%',
      },
      {
        title: 'Time',
        dataIndex: 'count',
        key: 'count',
        align: 'right',
        width: '15%',
      },
    ];
    return (
      <>
        {/* PARTNER */}
        <div style={mode === 'partner' ? { display: 'block' } : { display: 'none' }}>
          <Descriptions
            column={1}
            title={
              <Badge
                color={Object.assign({}, data[0]).color}
                text={
                  <span style={{ color: Object.assign({}, data[0]).color }}>
                    {Object.assign({}, data[0]).label}
                  </span>
                }
              />
            }
          >
            <Descriptions.Item labelStyle={{ width: '70%', marginLeft: '5%' }} label="Normal">
              <NumberFormat
                value={Object.assign({}, Object.assign({}, data[0]).details).normal}
                displayType={'text'}
                thousandSeparator={true}
              />
            </Descriptions.Item>
            <Descriptions.Item
              labelStyle={{ width: '70%', marginLeft: '5%' }}
              label="Almost expired"
            >
              <NumberFormat
                value={Object.assign({}, Object.assign({}, data[0]).details).almostExpired}
                displayType={'text'}
                thousandSeparator={true}
              />
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            column={1}
            title={
              <Badge
                color={Object.assign({}, data[1]).color}
                text={
                  <span style={{ color: Object.assign({}, data[1]).color }}>
                    {Object.assign({}, data[1]).label}
                  </span>
                }
              />
            }
          >
            <Descriptions.Item labelStyle={{ width: '70%', marginLeft: '5%' }} label="Normal">
              <NumberFormat
                value={Object.assign({}, Object.assign({}, data[1]).details).normal}
                displayType={'text'}
                thousandSeparator={true}
              />
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{ width: '70%', marginLeft: '5%' }} label="Expired">
              <NumberFormat
                value={Object.assign({}, Object.assign({}, data[1]).details).expired}
                displayType={'text'}
                thousandSeparator={true}
              />
            </Descriptions.Item>
          </Descriptions>
        </div>

        {/* ORDER */}
        {/* <div style={mode === 'order' ? { display: 'block' } : { display: 'none' }}>
          <Space direction="horizontal">
            <Descriptions
              column={2}
              title={
                <Badge color="#b3e2cd" text={<span style={{ color: '#b3e2cd' }}>Reception</span>} />
              }
            ></Descriptions>
            <Descriptions
              column={1}
              title={
                <Badge color="#F8CECC" text={<span style={{ color: '#F8CECC' }}>Rejection</span>} />
              }
            ></Descriptions>
          </Space>
          <Space direction="horizontal">
            <Descriptions
              column={1}
              title={
                <Badge
                  color="#DAE8FC"
                  text={<span style={{ color: '#DAE8FC' }}>Processing</span>}
                />
              }
            >
              <Descriptions.Item label="Normal">450</Descriptions.Item>
              <Descriptions.Item label="Almost expired">100</Descriptions.Item>
            </Descriptions>
            <Descriptions
              column={1}
              title={
                <Badge
                  color="#dcd6d6"
                  text={<span style={{ color: '#dcd6d6' }}>Cancellation</span>}
                />
              }
            >
              <Descriptions.Item label="Normal">50</Descriptions.Item>
              <Descriptions.Item label="Expired">50</Descriptions.Item>
            </Descriptions>
          </Space>
        </div> */}
        <div style={mode === 'order' ? { display: 'block' } : { display: 'none' }}>
          <Table
            className={styles.table}
            columns={columnList}
            dataSource={data}
            pagination={false}
          />
        </div>
      </>
    );
  }
}

export default PieChartDetails;
