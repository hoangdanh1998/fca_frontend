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
      isSubmitted: false,
    };
  }

  handleChangeActor = value => {
    if (value.startsWith('CUSTOMER')) {
      const customerReason = CANCEL_ORDER_REASON.filter(reason => {
        return reason.value.startsWith('CUSTOMER');
      });
      customerReason.push({ label: 'Khác', value: 'OTHER' });
      this.setState({ reasons: customerReason });
    }
    if (value.startsWith('PARTNER')) {
      const partnerReason = CANCEL_ORDER_REASON.filter(reason => {
        return reason.value.startsWith('PARTNER');
      });
      partnerReason.push({ label: 'Khác', value: 'OTHER' });
      this.setState({ reasons: partnerReason });
    }
  };

  render() {
    const { visible, hideModal, order, submitModal } = this.props;
    const requestByList = [
      {
        label: `Cửa hàng - ${order.partnerName}`,
        value: `PARTNER_${order.partnerId}`,
      },
      {
        label: `Khách hàng - ${order.customerPhone}`,
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
        <Form
          onFinish={async values => {
            this.setState({ isSubmitted: true });
            await submitModal(values);
            this.setState({ isSubmitted: false });
          }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
        >
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
          <Space direction="horizontal">
            <Form.Item>
              <Button htmlType="button" onClick={hideModal}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                loading={this.state.isSubmitted}
                htmlType="submit"
                onClick={hideModal}
              >
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
