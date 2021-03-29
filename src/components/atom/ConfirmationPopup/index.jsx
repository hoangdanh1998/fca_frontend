import React from 'react';
import { connect } from 'dva';
import { Modal, Space, Button } from 'antd';

class ConfirmationPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSubmitted: false };
  }

  render() {
    const { message, visible } = this.props;
    return (
      <Modal
        title="CONFIRMATION"
        visible={visible}
        onOk={this.props.onClickOK}
        onCancel={this.props.hideModal}
        style={{ textAlign: 'center', width: '50%' }}
        footer={null}
      >
        <p style={{ textAlign: 'center' }}>
          Change <b>{message.name}</b> {message.property}
        </p>
        <p style={{ textAlign: 'center' }}>
          from <b>{message.from}</b> to <b>{message.to}</b>
        </p>
        <Space direction="horizontal">
          <Button onClick={this.props.hideModal}>No</Button>
          <Button
            loading={this.state.isSubmitted}
            onClick={async () => {
              this.setState({ isSubmitted: true });
              await this.props.onClickOK();
              this.setState({ isSubmitted: false });
            }}
            type="primary"
          >
            Yes
          </Button>
        </Space>
      </Modal>
    );
  }
}

export default ConfirmationPopup;
