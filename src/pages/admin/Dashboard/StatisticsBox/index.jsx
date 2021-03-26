import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Space, Card, Statistic, Row, Col, List } from 'antd';
import { ShopOutlined, CoffeeOutlined, FileOutlined, EllipsisOutlined } from '@ant-design/icons';
import styles from './index.less';
import { S_APPROVED_PARTNER, S_ORDER, S_ITEM } from '../../../../../config/seedingData';

class StatisticsBox extends React.Component {
  state = {};

  renderGeneralCardCover = () => {
    switch (this.props.subject) {
      case 'partner':
        return <ShopOutlined style={{ fontSize: 50, marginTop: '10%' }} />;
      case 'order':
        return <FileOutlined style={{ fontSize: 50, marginTop: '10%' }} />;
      case 'item':
        return <CoffeeOutlined style={{ fontSize: 50, marginTop: '10%' }} />;
      default:
        return <EllipsisOutlined style={{ fontSize: 50, marginTop: '10%' }} />;
    }
  };

  renderStatistics = () => {
    // const data = this.props.data;
    const subject = this.props.subject;
    let data = S_ORDER;
    switch (this.props.subject) {
      case 'partner':
        data = S_APPROVED_PARTNER;
        return (
          <Statistic
            title="Approved Partners"
            value={data.data.total}
            valueStyle={{ color: 'black', fontSize: 40 }}
          />
        );
      case 'order':
        return (
          <Statistic
            title="Orders"
            value={data.data.total}
            valueStyle={{ color: 'black', fontSize: 40 }}
          />
        );
      case 'item':
        return (
          <Statistic
            title="Items"
            value={data.data.total}
            valueStyle={{ color: 'black', fontSize: 40 }}
          />
        );
      default:
        return <Statistic title="Others" value={0} valueStyle={{ color: 'black', fontSize: 40 }} />;
    }
  };

  renderActions = () => {
    switch (this.props.subject) {
      case 'partner': {
        const seedingData = S_APPROVED_PARTNER;
        return [
          <Card
            style={{
              width: '95%',
              marginLeft: '2.5%',
              textAlign: 'center',
              backgroundColor: seedingData.data.opening.color,
            }}
            bordered={false}
            actions={[
              <Card.Grid
                style={{
                  width: '98%',
                  marginLeft: '1%',
                  textAlign: 'center',
                }}
                bordered={false}
                onClick={() => {
                  this.props.onClick('OPENING_NORMAL_PARTNER');
                }}
              >
                <Statistic
                  title={<p style={{ textAlign: 'center', fontSize: 12, height: 20 }}>Normal</p>}
                  value={seedingData.data.opening.normal}
                  valueStyle={{ color: 'black', fontSize: 20 }}
                />
              </Card.Grid>,
              <Card.Grid
                style={{
                  width: '98%',
                  marginLeft: '1%',
                  textAlign: 'center',
                }}
                bordered={false}
                onClick={() => {
                  this.props.onClick('OPENING_ALMOST_EXPIRED_PARTNER');
                }}
              >
                <Statistic
                  title={
                    <p style={{ textAlign: 'center', fontSize: 12, height: 20 }}>Almost Expired</p>
                  }
                  value={seedingData.data.opening.almostExpired}
                  valueStyle={{ color: 'black', fontSize: 20 }}
                />
              </Card.Grid>,
            ]}
          >
            <Statistic
              title="Opening"
              value={seedingData.data.opening.total}
              valueStyle={{ color: 'black', fontSize: 30 }}
            />
          </Card>,
          <Card
            style={{
              width: '95%',
              marginLeft: '2.5%',
              textAlign: 'center',
              backgroundColor: seedingData.data.closing.color,
            }}
            bordered={false}
            actions={[
              <Card.Grid
                style={{
                  width: '98%',
                  marginLeft: '1%',
                  textAlign: 'center',
                }}
                bordered={false}
              >
                <Statistic
                  title={<p style={{ textAlign: 'center', fontSize: 12, height: 20 }}>Normal</p>}
                  value={seedingData.data.closing.normal}
                  valueStyle={{ color: 'black', fontSize: 20 }}
                />
              </Card.Grid>,
              <Card.Grid
                style={{
                  width: '98%',
                  marginLeft: '1%',
                  textAlign: 'center',
                }}
                bordered={false}
              >
                <Statistic
                  title={<p style={{ textAlign: 'center', fontSize: 12, height: 20 }}>Expired</p>}
                  value={seedingData.data.closing.expired}
                  valueStyle={{ color: 'black', fontSize: 20 }}
                />
              </Card.Grid>,
            ]}
          >
            <Statistic
              title="Closing"
              value={seedingData.data.closing.total}
              valueStyle={{ color: 'black', fontSize: 30 }}
            />
          </Card>,
        ];
      }
      case 'order': {
        const seedingData = S_ORDER;
        return seedingData.data.details.map(i => {
          return (
            <Card.Grid
              bordered={false}
              style={{
                width: '95%',
                marginLeft: '2.5%',
                textAlign: 'center',
                backgroundColor: i.color,
              }}
            >
              <Statistic
                title={i.label}
                value={i.count}
                valueStyle={{ color: 'black', fontSize: 30 }}
              />
            </Card.Grid>
          );
        });
      }
      case 'item': {
        const seedingData = S_ITEM;
        const columns = [
          {
            title: 'No.',
            render: (text, record, index) => {
              return index + 1;
            },
            align: 'right',
          },
        ];
        return [
          <List
            scroll={{ x: 50 }}
            // grid={{ gutter: 16, column: 2 }}
            itemLayout="vertical"
            style={{ width: '95%', marginLeft: '2.5%', height: 'auto' }}
            dataSource={seedingData.data.details}
            renderItem={i => (
              <Card.Grid
                bordered={false}
                style={{
                  width: '98%',
                  marginLeft: '1%',
                  // height: 100,
                  textAlign: 'center',
                  backgroundColor: i.color,
                }}
              >
                <Statistic
                  title={<p style={{ textAlign: 'center', fontSize: 10, height: 20 }}>{i.label}</p>}
                  value={i.count}
                  valueStyle={{ color: 'black', fontSize: 20 }}
                />
              </Card.Grid>
            )}
          ></List>,
        ];
      }
      default: {
        const seedingData = S_ORDER;
        return seedingData.data.details.map(i => {
          return (
            <Card
              bordered={false}
              style={{
                width: '95%',
                marginLeft: '2.5%',
                textAlign: 'center',
                backgroundColor: i.color,
              }}
            >
              <Statistic
                title={i.label}
                value={i.count}
                valueStyle={{ color: 'black', fontSize: 30 }}
              />
            </Card>
          );
        });
      }
    }
  };

  render() {
    const data = this.props.data;

    // const data = STATISTICS_PARTNER;
    return (
      <Card
        style={{
          backgroundColor: '#FFF2CC',
          textAlign: 'center',
          width: '95%',
          marginLeft: '2.5%',
        }}
        cover={this.renderGeneralCardCover()}
        actions={this.renderActions()}
      >
        {this.renderStatistics()}
      </Card>
    );
  }
}

export default StatisticsBox;
