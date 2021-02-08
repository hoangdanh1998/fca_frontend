import { Modal } from 'antd';

class PrepareSendSmsModal extends React.Component {
  render() {
    const { visible, partnerPhone, smsContent } = this.props;
    return (
      <Modal style={{ textAlign: 'center' }} title="REVIEW" visible={visible} footer={null}>
        <p>This SMS will be sent to {partnerPhone} automatically</p>
      </Modal>
    );
  }
}
export default PrepareSendSmsModal;
