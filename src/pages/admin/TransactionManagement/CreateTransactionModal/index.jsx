import { Button, DatePicker, Form, Input, InputNumber, Modal, Space } from 'antd';
import moment from 'moment';
import React from 'react';
import { DATE_FORMAT } from '../../../../../config/constants';

class CreateTransactionModal extends React.Component {
  state = {
    isSubmitted: false,
  };

  formRef = React.createRef();

  handleUpdateLicense = values => {
    alert(JSON.stringify(values));
  };

  render() {
    const { onSubmit, visible, hideModal } = this.props;

    return (
      <Modal
        visible={visible}
        style={{ textAlign: 'center' }}
        title="CREATE TRANSACTION"
        footer={null}
        bodyStyle={{ textAlign: 'left' }}
        onCancel={() => {
          this.props.hideModal();
        }}
      >
        <Form
          onFinish={async values => {
            this.setState({ isSubmitted: true });
            await onSubmit(values);
          }}
          ref={this.formRef}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item rules={[{ required: true }]} name="phone" label="Phone">
            <Input placeholder="Enter phone" allowClear />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="name" label="Name">
            <Input placeholder="Account name" disabled />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="price" label="Price">
            <InputNumber
              allowClear
              placeholder="Enter amount"
              min={-1000000000}
              max={1000000000}
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="description" label="Description">
            <Input.TextArea placeholder="Enter description" allowClear />
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
              <Button type="primary" htmlType="submit" loading={this.state.isSubmitted}>
                OK
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    );
  }
}

export default CreateTransactionModal;
