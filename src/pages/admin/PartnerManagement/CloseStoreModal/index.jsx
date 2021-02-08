import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';

class ConfirmationPopup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { partnerId, storeName, undoneOrder, isOpen } = this.props;
    return (
      <Modal
        title="CONFIRMATION"
        visible={true}
        onOk={this.props.hideModal}
        onCancel={this.props.hideModal}
        style={{ textAlign: 'center', width: '50%' }}
        okText="Yes"
        cancelText="No"
      >
        {isOpen ? (
          <p>
            <b>Open {storeName} store</b>
          </p>
        ) : (
          <div>
            <p>
              <b>Close {storeName} store</b>
            </p>
            <p>
              {storeName} has <b>{undoneOrder} incomplete orders</b>
            </p>
            <p>If closing, the system will cancel all incomplete orders</p>
          </div>
        )}
      </Modal>
    );
  }
}

export default ConfirmationPopup;
