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
  Form,
  Input,
  InputNumber,
  Select,
  Button as AntdButton,
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
import { PARTNER_ITEM, FCA_ITEM_LIST } from '../../../../../../../../config/seedingData';
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
    const { item } = this.props;
    return (
      <Card title={"Item's Information"}>
        <Form
          onFinish={values => {
            this.props.onUpdateItem(values);
          }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{
            name: item.id ? item.name : '',
            fcaGroup: item.id ? item.fcaItem.id : '',
            price: item.id ? item.price : '',
          }}
        >
          <Form.Item rules={[{ required: true }]} name="name" label="Name">
            <Input placeholder="Enter name" allowClear />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="fcaGroup" label="FCA Group">
            {/* <Input placeholder="" /> */}
            <Select
              placeholder="Choose group"
              //   onChange={this.handleChangeActor}
              allowClear
              options={FCA_ITEM_LIST}
            ></Select>
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="price" label="Price">
            <InputNumber
              allowClear
              placeholder="Enter price"
              min={0}
              max={1000000}
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              //   onChange={onChange}
            />
          </Form.Item>
          <Space direction="horizontal" style={{ display: 'flex', justifyContent: 'center' }}>
            <Form.Item>
              <AntdButton htmlType="button" onClick={this.props.onChangeMode}>
                Cancel
              </AntdButton>
            </Form.Item>
            <Form.Item>
              <AntdButton type="primary" htmlType="submit">
                OK
              </AntdButton>
            </Form.Item>
          </Space>
        </Form>
      </Card>
    );
  }
}

export default ViewItem;