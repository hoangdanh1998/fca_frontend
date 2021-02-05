import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Space, Modal, Button, DatePicker, Radio } from 'antd';
import { DATE_FORMAT, LICENSE_PACKAGE } from '../../../../../config/constants';
import styles from './index.less';

class ExpandLicenseModal extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    visible: this.props.visible,
    startDate: moment(this.props.storeLicense.licenseFrom, DATE_FORMAT),
    endDate: moment(this.props.storeLicense.licenseFrom, DATE_FORMAT)
      .add(1, 'months'),
    package: 1,
  };

  handleChangePackage = e => {
    const value = e.target.value;
    this.setState({
      package: value,
      endDate: moment(this.state.startDate, DATE_FORMAT).add(value, 'months')
    });
  };

  handleChangeStartDate = value => {
    console.log('change start date', value.format(DATE_FORMAT));
    this.setState({
      startDate: value,
      endDate: moment(value, DATE_FORMAT).add(this.state.package, 'months') 
    });
  };

  onSubmit = values => {
    console.log('valuesss', values);
  };

  render() {
    const { storeLicense, hideModal } = this.props;
    return (
      <Modal
        title="CONFIRMATION"
        visible={this.state.visible}
        onOk={hideModal}
        onCancel={hideModal}
        className={styles.modal}
        footer={null}
      >
        <p className={styles.message}>
          <b>{storeLicense.storeName}</b> has license
        </p>
        <p className={styles.message}>
          from <b>{storeLicense.licenseFrom}</b> to <b>{storeLicense.licenseTo}</b>
        </p>
        <Form
          initialValues={{
            startDate: this.state.startDate,
            package: 1,
          }}
          onFinish={this.onSubmit}
        >
          <Space direction="horizontal" className={styles.space}>
            <Form.Item
              className={styles.formItem}
              name="startDate"
              label="From"
              rules={[{ required: true }]}
            >
              <DatePicker
                allowClear={false}
                format={DATE_FORMAT}
                onChange={value => {
                  this.handleChangeStartDate(value);
                }}
              />
            </Form.Item>
            <Form.Item className={styles.formItem} label="To">
              <DatePicker
                placeholder="Expiration date"
                allowClear={false}
                value={this.state.endDate}
                open={false}
                inputReadOnly={true}
                format={DATE_FORMAT}
              />
            </Form.Item>
          </Space>
          <Form.Item name="package" label="Package">
            <Radio.Group
              className={styles.radio}
              options={LICENSE_PACKAGE}
              onChange={this.handleChangePackage}
              optionType="button"
            ></Radio.Group>
          </Form.Item>
          <Space direction="horizontal">
            <Form.Item>
              <Button htmlType="button" onClick={hideModal}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    );
  }
}

export default ExpandLicenseModal;
