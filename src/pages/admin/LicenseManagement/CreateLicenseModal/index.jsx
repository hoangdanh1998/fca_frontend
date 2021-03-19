import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import moment from 'moment';
import { Space, Modal, Form, Input, InputNumber, Button, DatePicker } from 'antd';
import { DATE_FORMAT } from '../../../../../config/constants';

class CreateLicenseModal extends React.Component {
  componentWillMount() {}

  handleUpdateLicense = values => {
    alert(JSON.stringify(values));
  };

  render() {
    const { onSubmit, visible, hideModal } = this.props;
    return (
      <Modal
        visible={visible}
        style={{ textAlign: 'center' }}
        title="CREATE FAST-COFFEE LICENSE"
        footer={null}
        bodyStyle={{ textAlign: 'left' }}
        onCancel={() => {
          this.props.hideModal();
        }}
      >
        <Form
          onFinish={values => {
            onSubmit(values);
            values = {};
          }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
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
          <Form.Item rules={[{ required: true }]} name="startDate" label="Start Date">
            <DatePicker
              showToday
              placeholder="Start Date"
              allowClear={false}
              format={DATE_FORMAT}
              style={{ width: '100%' }}
              disabledDate={d => !d || d.isSameOrBefore(moment().subtract(1, 'day'))}
            />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="description" label="Description">
            <Input.TextArea autoSize placeholder="Enter description" allowClear />
          </Form.Item>
          <Space direction="horizontal" style={{ display: 'flex', justifyContent: 'center' }}>
            <Form.Item>
              <Button
                htmlType="button"
                onClick={values => {
                  hideModal();
                  values = {};
                }}
              >
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
      </Modal>
    );
  }
}

export default CreateLicenseModal;
