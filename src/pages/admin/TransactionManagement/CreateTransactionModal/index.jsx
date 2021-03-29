import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Space, Spin } from 'antd';
import { DATE_FORMAT } from '../../../../../config/constants';

@connect(({ transaction, loading }) => {
  return {
    account: transaction.account,
  };
})
class CreateTransactionModal extends React.Component {
  state = {
    isSubmitted: false,
    actionOnAccount: {},
    loadingAccount: false,
  };

  formRef = React.createRef();

  handleGetAccount = async phone => {
    this.setState({ loadingAccount: true });
    const { dispatch } = this.props;
    await dispatch({
      type: 'transaction/getAccount',
      payload: {
        phone: phone,
      },
    });
    this.setState({ actionOnAccount: this.props.account });
    this.setState({ loadingAccount: false });
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
            await onSubmit({ ...values, accountId: this.state.actionOnAccount.id });
            this.setState({ actionOnAccount: {} });
          }}
          ref={this.formRef}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          <Form.Item rules={[{ required: true }]} name="phone" label="Phone">
            <Input
              onBlur={event => {
                if (event.target.value) {
                  this.handleGetAccount(event.target.value);
                }
              }}
              placeholder="Enter phone"
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="accountId"
            label="accountId"
            hidden
            value={this.state.actionOnAccount.id}
          ></Form.Item>
          <Form.Item name="name" label="Name">
            <Spin spinning={this.state.loadingAccount}>
              <Input placeholder="Account name" value={this.state.actionOnAccount.id} disabled />
            </Spin>
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
