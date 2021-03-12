import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import {
  Descriptions,
  Tag,
  Image,
  Space,
  Switch,
  Carousel,
  Layout,
  Row,
  Col,
  Card,
  Modal,
} from 'antd';
import Button from 'antd-button-color';
import 'antd-button-color/dist/css/style.less';
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { convertStringToCamel } from '../../../../../../../utils/utils';
import { PARTNER_ITEM } from '../../../../../../../../config/seedingData';
import { PARTNER_ITEM_STATUS, DATE_FORMAT } from '../../../../../../../../config/constants';

// @connect(({ partner, loading }) => ({
//   partner: partner.partner,
// }))
class ViewItem extends React.Component {
  componentWillMount() {
    // const { dispatch } = this.props;
    // const url = window.location.href;
    // const id = url.substring(url.indexOf('=') + 1);
    // dispatch({
    //   type: 'partner/getPartner',
    //   payload: {
    //     id: id,
    //   },
    // });
    // const items = this.props.partner.items.concat(this.props.partner.requestItems);
    // const item = items.find(item => item.id === id);
    // this.setState({ item: item });
  }

  getTagStatusColors = status => {
    console.log('get tag style');
    switch (status) {
      case PARTNER_ITEM_STATUS.ACTIVE:
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
        };
      case PARTNER_ITEM_STATUS.ARCHIVE:
        return {
          color: 'error',
          icon: <CloseCircleOutlined />,
        };
      default:
        return {
          color: 'processing',
          icon: <SyncOutlined spin />,
        };
    }
  };

  render() {
    const { item, display } = this.props;
    return (
      <Row style={{ width: '100%', height: '100%', display: { display } }}>
        <Col style={{ width: '100%', height: '100%' }} span={8}>
          <Card bordered>
            <Carousel style={{ width: '95%', height: 'auto', marginLeft: '2.5%' }} autoplay>
              <Image height="100%" width="100%" preview={false} src={item.imageLink} />
              <Image height="100%" width="100%" preview={false} src={item.imageLink} />
            </Carousel>
          </Card>
        </Col>
        <Col style={{ width: '100%', height: '100%' }} span={16}>
          <Card
            title={
              <Space direction="horizontal">
                {"Item's Information"}
                <EditOutlined
                  style={{ color: '#1890ff' }}
                  // onClick={this.handleVisibleChangeProfile}
                />
              </Space>
            }
            extra={
              <Button
                type={item.status === PARTNER_ITEM_STATUS.ACTIVE ? 'danger' : 'success'}
                with="ghost"
                icon={
                  item.status === PARTNER_ITEM_STATUS.ACTIVE ? (
                    <CloseOutlined style={{ fontSize: 15, color: 'red' }} />
                  ) : (
                    <CheckOutlined style={{ fontSize: 15, color: 'green' }} />
                  )
                }
                onClick={() => {
                  // this.handleVisibleUpdateStatus(PARTNER_STATUS.APPROVED);
                }}
              >
                {convertStringToCamel(
                  item.status === PARTNER_ITEM_STATUS.ACTIVE
                    ? PARTNER_ITEM_STATUS.ARCHIVE
                    : PARTNER_ITEM_STATUS.ACTIVE,
                )}
              </Button>
            }
          >
            <Descriptions
              column={1}
              contentStyle={{ fontWeight: 'bold' }}
              labelStyle={{ textAlign: 'left', width: '20%' }}
            >
              <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
              <Descriptions.Item label="FCA Group">{item.fcaItem.name}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag
                  color={item.status === PARTNER_ITEM_STATUS.ACTIVE ? 'green' : 'red'}
                  icon={
                    item.status === PARTNER_ITEM_STATUS.ACTIVE ? (
                      <CheckCircleOutlined />
                    ) : (
                      <CloseCircleOutlined />
                    )
                  }
                >
                  {item.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                <NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} />
              </Descriptions.Item>
              <Descriptions.Item label="Registration Date">
                {moment(item.createdAt).format(DATE_FORMAT)}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default ViewItem;
