import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Space, Modal, Button, DatePicker, Radio } from 'antd';
import { DATE_FORMAT, LICENSE_PACKAGE } from '../../../../../../../config/constants';
import styles from './index.less';

class ExpandLicenseModal extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    startDate: this.props.lastLicense
      ? moment(this.props.storeLicense.licenseTo, DATE_FORMAT)
      : moment(),
    endDate: this.props.lastLicense
      ? moment(this.props.storeLicense.licenseTo, DATE_FORMAT).add(1, 'months')
      : moment().add(1, 'months'),
    package: 1,
  };

  handleChangePackage = e => {
    const value = e.target.value;
    this.setState({
      package: value,
      endDate: moment(this.state.startDate, DATE_FORMAT).add(value, 'months'),
    });
  };

  handleChangeStartDate = value => {
    this.setState({
      startDate: value,
      endDate: moment(value, DATE_FORMAT).add(this.state.package, 'months'),
    });
  };

  onSubmit = values => {
    console.log('startDate', this.state.startDate.format(DATE_FORMAT));
    console.log('endDate', this.state.endDate.format(DATE_FORMAT));
    console.log('package', this.state.package);
  };

  render() {
    const { lastLicense, hideModal } = this.props;
    console.log('lastLicense', lastLicense);
    return (
      <Modal
        title="CREATE LICENSE"
        visible={true}
        onOk={hideModal}
        onCancel={hideModal}
        className={styles.modal}
        footer={null}
      >
        {lastLicense ? (
          <>
            <p className={styles.message}>
              <b>{lastLicense.storeName}</b> has license
            </p>
            <p className={styles.message}>
              from <b>{lastLicense.licenseFrom}</b> to <b>{lastLicense.licenseTo}</b>
            </p>
          </>
        ) : null}
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
                disabled={true}
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
                OK
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    );
  }
}

export default ExpandLicenseModal;
