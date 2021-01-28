import React from 'react';
import { connect } from 'dva';
import { Popconfirm, Modal, Button } from 'antd';

class ConfirmationPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { visible: this.props.message.visible };

  showModal = visible => {
    this.setState({
      visible: visible,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { message } = this.props;
    // this.showModal(message.visible);
    return (
      <Modal
        title="CONFIRMATION"
        visible={this.state.visible}
        onOk={this.hideModal}
        onCancel={this.hideModal}
        style={{ textAlign: 'center', width: '50%' }}
        okText="yes"
        cancelText="no"
      >
        <p style={{ textAlign: 'center' }}>
          Change <b>{message.storeName}</b> {message.title}
        </p>
        <p style={{ textAlign: 'center' }}>
          from <b>{message.from}</b> to <b>{message.to}</b>
        </p>
      </Modal>
    );
  }
}

export default ConfirmationPopup;
