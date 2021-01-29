import { Modal } from 'antd';

class GeneralModal extends React.Component {
  render() {
    const { title, visible } = this.props;
    return <Modal style={{ textAlign: 'center' }} title={title} visible={visible} footer={null} />;
  }
}
export default GeneralModal;
