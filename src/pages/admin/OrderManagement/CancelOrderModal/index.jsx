import { connect } from 'dva';
import { router } from 'umi';
import { Modal, Select, Button, Form, Input, Space } from 'antd';
import { ORDER_STATUS } from '../../../../../config/constants';
import { CANCEL_ORDER_REASON } from '../../../../../config/constants';

@connect(({ order, loading }) => ({}))
class CancelOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reasons: CANCEL_ORDER_REASON,
    };
  }

  handleChangeActor = value => {
    console.log('handleChangeActor', value);
    if (value.startsWith('CUSTOMER')) {
      const customerReason = CANCEL_ORDER_REASON.filter(reason => {
        return reason.value.startsWith('CUSTOMER');
      });
      customerReason.push({ label: 'Other', value: 'OTHER' });
      this.setState({ reasons: customerReason });
    }
    if (value.startsWith('PARTNER')) {
      const partnerReason = CANCEL_ORDER_REASON.filter(reason => {
        return reason.value.startsWith('PARTNER');
      });
      partnerReason.push({ label: 'Other', value: 'OTHER' });
      this.setState({ reasons: partnerReason });
    }
  };

  onSubmit = values => {
    console.log('values', values);
    const { dispatch } = this.props;
    dispatch({
      type: 'order/cancelOrder',
      payload: {
        status: ORDER_STATUS.CANCELLATION,
        id: this.props.order.id,
      },
    });
  };

  render() {
    const { visible, hideModal, order } = this.props;
    const requestByList = [
      {
        label: `Partner - ${order.partnerName}`,
        value: `PARTNER_${order.partnerId}`,
      },
      {
        label: `Customer - ${order.customerPhone}`,
        value: `CUSTOMER_${order.customerId}`,
      },
    ];
    return (
      <Modal
        style={{ textAlign: 'center' }}
        title="CANCEL ORDER"
        visible={visible}
        footer={null}
        onCancel={hideModal}
      >
        <p>Cancel order #{order.i}</p>
        <Form onFinish={this.onSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item name="requestBy" label="Request by" rules={[{ required: true }]}>
            <Select
              placeholder=""
              onChange={this.handleChangeActor}
              allowClear
              options={requestByList}
            ></Select>
          </Form.Item>
          <Form.Item name="reason" label="Reason" rules={[{ required: true }]}>
            <Select
              mode="multiple"
              placeholder="Select one or more"
              allowClear
              options={this.state.reasons}
            ></Select>
          </Form.Item>
          <Form.Item name="note" label="Note">
            <Input.TextArea />
          </Form.Item>
          <p style={{ fontSize: 12 }}>
            automatically refund the order amount to the customer if there is no feedback
          </p>
          <Space direction="horizontal">
            <Form.Item>
              <Button htmlType="button" onClick={hideModal}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={hideModal}>
                OK
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    );
  }
}
export default CancelOrderModal;
