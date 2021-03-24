import React from 'react';
import { Space, Card, Form, Input, InputNumber, Select, Button as AntdButton } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { FCA_ITEM_LIST } from '../../../../../../../../config/seedingData';
import { PARTNER_ITEM_STATUS } from '../../../../../../../../config/constants';

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
      <Form
        onFinish={values => {
          this.props.onUpdateItem(values);
        }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
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
          <Select placeholder="Choose group" allowClear options={FCA_ITEM_LIST}></Select>
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
          />
        </Form.Item>
        <Space direction="horizontal" style={{ display: 'flex', justifyContent: 'center' }}>
          <Form.Item>
            <AntdButton htmlType="button" onClick={this.props.hideModal}>
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
    );
  }
}

export default ViewItem;
