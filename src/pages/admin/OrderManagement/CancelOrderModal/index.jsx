import { Modal, Select, Button, Form, Input, Space } from 'antd';

class CancelOrderModal extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit = values => {
    console.log('values', values);
  };
  render() {
    const requestByList = [
      {
        label: 'partner',
        value: 'partner',
      },
      {
        label: 'customer',
        value: 'customer',
      },
    ];
    const { visible, hideModal } = this.props;
    return (
      <Modal style={{ textAlign: 'center' }} title="CANCEL ORDER" visible={visible} footer={null}>
        <Form onFinish={this.onSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
          <Form.Item name="requestBy" label="Request by" rules={[{ required: true }]}>
            <Select placeholder="" allowClear options={requestByList}></Select>
          </Form.Item>
          <Form.Item name="reason" label="Reason" rules={[{ required: true }]}>
            <Select
              mode="multiple"
              placeholder="Select a option and change input text above"
              allowClear
              options={requestByList}
            ></Select>
          </Form.Item>
          <Form.Item name="note" label="Note">
            <Input.TextArea />
          </Form.Item>
          automatically refund the order amount to the customer if there is no feedback
          <Space direction="horizontal">
            <Form.Item>
              <Button type="primary" style={{ width: '30%', float: 'right' }} htmlType="submit">
                OK
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="button"
                style={{ width: '30%', float: 'right' }}
                onClick={hideModal}
              >
                Cancel
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    );
  }
}
export default CancelOrderModal;
