import React from 'react';
import { connect } from 'dva';
import { Modal, Space, Button, Radio } from 'antd';
import { REQUESTED_ITEM_STATUS, PARTNER_ITEM_STATUS } from '../../../../../../../config/constants';

class ConsolidateItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSubmitted: false, consolidateResult: '' };
  }

  render() {
    const { message, visible } = this.props;
    return (
      <Modal
        title="CONFIRMATION"
        visible={visible}
        onOk={this.props.onClickOK}
        onCancel={() => {
          this.setState({ consolidateResult: '' });
          this.props.hideModal();
        }}
        style={{ textAlign: 'center', width: '50%' }}
        footer={null}
      >
        <p style={{ textAlign: 'center' }}>
          Change <b>{message.name}</b> {message.property}
        </p>
        <p style={{ textAlign: 'center' }}>
          from <b>{message.from}</b> to{' '}
          <b
            style={{
              color: this.state.consolidateResult === PARTNER_ITEM_STATUS.ACTIVE ? 'green' : 'red',
            }}
          >
            {this.state.consolidateResult}
          </b>
        </p>
        <Space direction="vertical">
          <Space direction="horizontal">
            <Radio.Group
              options={[
                { label: 'Active', value: PARTNER_ITEM_STATUS.ACTIVE },
                { label: 'Archive', value: PARTNER_ITEM_STATUS.ARCHIVE },
              ]}
              onChange={event => {
                this.setState({ consolidateResult: event.target.value });
              }}
              buttonStyle="solid"
              optionType="button"
            />
          </Space>
          {this.state.consolidateResult !== '' ? (
            <Space direction="horizontal">
              <Button
                onClick={() => {
                  this.setState({ consolidateResult: '' });
                  this.props.hideModal();
                }}
              >
                No
              </Button>
              <Button
                loading={this.state.isSubmitted}
                onClick={async () => {
                  this.setState({ isSubmitted: true });
                  this.setState({ consolidateResult: '' });
                  await this.props.onClickOK(this.props.message.id, this.state.consolidateResult);
                  this.setState({ isSubmitted: false });
                }}
                type="primary"
              >
                Yes
              </Button>
            </Space>
          ) : null}
        </Space>
      </Modal>
    );
  }
}

export default ConsolidateItemModal;
