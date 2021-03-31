import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Space, Card, Statistic, Row, Col, List, Avatar } from 'antd';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {
  ShopOutlined,
  CoffeeOutlined,
  FileOutlined,
  EllipsisOutlined,
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { S_APPROVED_PARTNER, S_ORDER, S_ITEM } from '../../../../../config/seedingData';
import { ORDER_STATUS } from '../../../../../config/constants';

class StatisticsBox extends React.Component {
  state = {};

  // renderGeneralCardCover = () => {
  //   switch (this.props.subject) {
  //     case 'partner':
  //       return <ShopOutlined style={{ fontSize: 70, marginTop: '10%' }} />;
  //     case 'order':
  //       return <FileOutlined style={{ fontSize: 50, marginTop: '10%' }} />;
  //     case 'item':
  //       return <CoffeeOutlined style={{ fontSize: 50, marginTop: '10%' }} />;
  //     default:
  //       return <EllipsisOutlined style={{ fontSize: 50, marginTop: '10%' }} />;
  //   }
  // };
  renderGeneralCardCover = () => {
    const data = this.props.data;
    const subject = this.props.subject;
    switch (subject) {
      case 'partner':
        // return <ShopOutlined style={{ fontSize: 50, marginTop: '10%' }} />;
        return (
          <Statistic
            prefix={<ShopOutlined style={{ fontSize: 50, marginTop: '10%' }} />}
            title="Approved Partners"
            value={data.total}
            valueStyle={{ color: 'black', fontSize: 40 }}
          />
        );
      case 'order':
        // return <FileOutlined style={{ fontSize: 50, marginTop: '10%' }} />;
        return (
          <Statistic
            prefix={<FileOutlined style={{ fontSize: 50, marginTop: '10%' }} />}
            title="Orders"
            value={data.total}
            valueStyle={{ color: 'black', fontSize: 40 }}
          />
        );
      case 'item':
        return <CoffeeOutlined style={{ fontSize: 50, marginTop: '10%' }} />;
      default:
        return <EllipsisOutlined style={{ fontSize: 50, marginTop: '10%' }} />;
    }
  };

  renderStatistics = () => {
    const data = this.props.data;
    const subject = this.props.subject;
    switch (subject) {
      case 'partner':
        return (
          <Statistic
            prefix={<ShopOutlined style={{ fontSize: 50, marginTop: '10%' }} />}
            title="Approved Partners"
            value={data.total}
            valueStyle={{ color: 'black', fontSize: 40 }}
          />
        );
      case 'order':
        return (
          <Statistic
            prefix={<FileOutlined style={{ fontSize: 50, marginTop: '10%' }} />}
            title="Orders"
            value={data.total}
            valueStyle={{ color: 'black', fontSize: 40 }}
          />
        );
      case 'item':
        return (
          <Statistic
            title="Items"
            value={data.total}
            valueStyle={{ color: 'black', fontSize: 40 }}
          />
        );
      default:
        return <Statistic title="Others" value={0} valueStyle={{ color: 'black', fontSize: 40 }} />;
    }
  };

  renderActions = () => {
    const subject = this.props.subject;
    const data = this.props.data;
    switch (subject) {
      case 'partner': {
        return [
          <Card
            size="small"
            style={{
              width: '95%',
              marginLeft: '2.5%',
              textAlign: 'center',
              backgroundColor: data.opening.color,
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
                  value={data.opening.normal.total}
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
                  value={data.opening.almostExpired.total}
                  valueStyle={{ color: 'black', fontSize: 20 }}
                />
              </Card.Grid>,
            ]}
          >
            <div
              onClick={() => {
                this.props.onClick('OPENING');
              }}
            >
              <Statistic
                title="Opening"
                value={data.opening.total}
                valueStyle={{ color: 'black', fontSize: 30 }}
              />
            </div>
          </Card>,
          <Card
            size="small"
            style={{
              width: '95%',
              marginLeft: '2.5%',
              textAlign: 'center',
              backgroundColor: data.closing.color,
            }}
            bordered={false}
            actions={[
              <Card.Grid
                onClick={() => {
                  this.props.onClick('CLOSING_NORMAL_PARTNER');
                }}
                style={{
                  width: '98%',
                  marginLeft: '1%',
                  textAlign: 'center',
                }}
                bordered={false}
              >
                <Statistic
                  title={<p style={{ textAlign: 'center', fontSize: 12, height: 20 }}>Normal</p>}
                  value={data.closing.normal.total}
                  valueStyle={{ color: 'black', fontSize: 20 }}
                />
              </Card.Grid>,
              <Card.Grid
                onClick={() => {
                  this.props.onClick('CLOSING_EXPIRED_PARTNER');
                }}
                style={{
                  width: '98%',
                  marginLeft: '1%',
                  textAlign: 'center',
                }}
                bordered={false}
              >
                <Statistic
                  title={<p style={{ textAlign: 'center', fontSize: 12, height: 20 }}>Expired</p>}
                  value={data.closing.expired.total}
                  valueStyle={{ color: 'black', fontSize: 20 }}
                />
              </Card.Grid>,
            ]}
          >
            <div
              onClick={() => {
                this.props.onClick('CLOSING');
              }}
            >
              <Statistic
                title="Closing"
                value={data.closing.total}
                valueStyle={{ color: 'black', fontSize: 30 }}
              />
            </div>
          </Card>,
        ];
      }
      case 'order': {
        return data.details.map(order => {
          return (
            <Card.Grid
              hoverable={order.label !== 'Closure'}
              size="small"
              onClick={() => {
                this.props.onClick(order.label);
              }}
              bordered={false}
              style={{
                width: '95%',
                marginLeft: '2.5%',
                textAlign: 'center',
                backgroundColor: order.color,
              }}
            >
              <Statistic
                title={order.label}
                value={order.total}
                valueStyle={{ color: 'black', fontSize: 30 }}
              />
            </Card.Grid>
          );
        });
      }
      case 'item': {
        const data = S_ITEM;
        return [
          <ScrollMenu
            style={{ width: ' 100%', height: 'auto' }}
            arrowLeft={<LeftOutlined style={{ color: '#FFF2CC' }} />}
            arrowRight={<RightOutlined style={{ color: '#FFF2CC' }} />}
            itemStyle={{ width: '50%' }}
            menuStyle={{ width: '100%' }}
            hideSingleArrow={true}
            scrollBy={2}
            itemClassActive=""
            data={data.details.map(item => (
              <Card.Grid
                onClick={() => {
                  this.props.onClick(item.label);
                }}
                bordered={false}
                style={{
                  width: '95%',
                  marginLeft: '2.5%',
                  textAlign: 'center',
                  backgroundColor: item.color,
                }}
              >
                <Statistic
                  title={
                    <p style={{ textAlign: 'center', fontSize: 12, height: 20 }}>{item.label}</p>
                  }
                  value={item.total}
                  valueStyle={{ color: 'black', fontSize: 30 }}
                />
              </Card.Grid>
            ))}
          ></ScrollMenu>,
        ];
      }
      default: {
        const data = S_ORDER;
        return data.details.map(i => {
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
                value={i.total}
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
    return (
      <Card
        size="small"
        style={{
          // backgroundColor: '#FFF2CC',
          backgroundColor: '#FFE6CC',
          textAlign: 'center',
          width: '95%',
          marginLeft: '2.5%',
          height: 'auto',
        }}
        // cover={this.renderGeneralCardCover()}
        actions={this.renderActions()}
      >
        {this.renderStatistics()}
      </Card>
    );
  }
}

export default StatisticsBox;
