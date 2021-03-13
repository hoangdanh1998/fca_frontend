import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Space, Form, Input, Select, Button, InputNumber } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { LICENSE_STATUS, DATE_FORMAT } from '../../../../../../config/constants';
import { convertStringToCamel } from '../../../../../utils/utils';

class UpdateLicense extends React.Component {
  render() {
    const { license } = this.props;
    return (
      <Form
        onFinish={values => {
          this.props.onUpdateLicense(values);
        }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        initialValues={{
          name: license.id ? license.name : '',
          duration: license.id ? license.duration : '',
          price: license.id ? license.price : '',
          description: license.id ? license.description : '',
        }}
      >
        <Form.Item rules={[{ required: true }]} name="name" label="Name">
          <Input placeholder="Enter name" allowClear />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name="price" label="Price">
          <InputNumber
            allowClear
            placeholder="Enter price"
            min={0}
            max={1000000000}
            style={{ width: '100%' }}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name="duration" label="Duration">
          <InputNumber
            allowClear
            placeholder="Enter duration"
            min={0}
            max={100}
            style={{ width: '100%' }}
            formatter={value => `${value} month(s)`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name="description" label="Description">
          <Input.TextArea autoSize placeholder="Enter description" allowClear />
        </Form.Item>
        <Space direction="horizontal" style={{ display: 'flex', justifyContent: 'center' }}>
          <Form.Item>
            <Button htmlType="button" onClick={this.props.onChangeMode}>
              Cancel
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              OK
            </Button>
          </Form.Item>
        </Space>
      </Form>
    );
  }
}

export default UpdateLicense;
