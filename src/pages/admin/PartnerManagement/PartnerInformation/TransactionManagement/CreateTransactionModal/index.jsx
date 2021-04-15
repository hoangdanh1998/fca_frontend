import { Button, Form, Input, InputNumber, Modal, Space, Spin } from 'antd';
import { connect } from 'dva';
import React from 'react';

class CreateTransactionModal extends React.Component {
  state = {
    isSubmitted: false,
  };

  formRef = React.createRef();

  render() {
    const { onSubmit, visible, hideModal, partner } = this.props;
    console.log('partner', JSON.stringify(partner));
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
            await onSubmit({ ...values, accountId: partner.account.id });
            this.props.hideModal();
          }}
          ref={this.formRef}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item name="phone" label="Phone">
            <Input placeholder="Account phone" defaultValue={partner.account.phone} disabled />
          </Form.Item>
          <Form.Item name="name" label="Name">
            <Input placeholder="Account name" defaultValue={partner.name} disabled />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="amount" label="Amount">
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
            <Input.TextArea placeholder="Enter description" row={5} allowClear />
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
