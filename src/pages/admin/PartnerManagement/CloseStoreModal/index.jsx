import React from 'react';
import { connect } from 'dva';
import { Modal, Space, Button } from 'antd';

class ConfirmationPopup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { partnerId, storeName, undoneOrder, isOpen, visible } = this.props;
    return (
      <Modal
        title="CONFIRMATION"
        visible={visible}
        onOk={this.props.hideModal}
        onCancel={this.props.hideModal}
        style={{ textAlign: 'center', width: '50%' }}
        footer={null}
      >
        {isOpen ? (
          <p>
            Open <b> {storeName} </b> store
          </p>
        ) : (
          <div>
            <p>
              Close <b> {storeName} </b> store
            </p>
            <p>
              <b>{storeName}</b> has <b>{undoneOrder} incomplete orders</b>
            </p>
            <p>If closing, the system will cancel all incomplete orders</p>
          </div>
        )}
        <Space direction="horizontal">
          <Button onClick={this.props.hideModal}>No</Button>
          <Button onClick={this.props.hideModal} type="primary">
            Yes
          </Button>
        </Space>
      </Modal>
    );
  }
}

export default ConfirmationPopup;
