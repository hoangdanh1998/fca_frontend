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

  state = { visible: this.props.visible, endDate: this.props.storeLicense.licenseTo, package: 1 };

  handleChangePackage = e => {
    const value = e.target.value;
    console.log('values', value);
    switch (value) {
      case 1:
        console.log('1 month');
        this.setState({
          //   endDate: moment(this.props.storeLicense.licenseTo, DATE_FORMAT)
          //     .add({ days: 1, months: 1 })
          //     .format(DATE_FORMAT),
          package: value,
        });
        break;
      case 3:
        console.log('3 month');
        this.setState({
          //   endDate: moment(this.props.storeLicense.licenseTo, DATE_FORMAT)
          //     .add({ days: 1, months: 3 })
          //     .format(DATE_FORMAT),
          package: value,
        });
        break;
      case 6:
        console.log('6 month');
        this.setState({
          //   endDate: moment(this.props.storeLicense.licenseTo, DATE_FORMAT)
          //     .add({ days: 1, months: 6 })
          //     .format(DATE_FORMAT),
          package: value,
        });
        break;
      case 12:
        console.log('12 month');
        this.setState({
          //   endDate: moment(this.props.storeLicense.licenseTo, DATE_FORMAT)
          //     .add({ days: 1, months: 12 })
          //     .format(DATE_FORMAT),
          package: value,
        });
        break;
      default:
        this.setState({
          //   endDate: moment(this.props.storeLicense.licenseTo, DATE_FORMAT)
          //     .add({ days: 1, months: 1 })
          //     .format(DATE_FORMAT),
          package: 1,
        });
        break;
    }
    // this.setState({ endDate: moment(value).format(DATE_FORMAT) });
    console.log('state', this.state.endDate);
  };

  onSubmit = values => {
    console.log('values', values);
  };

  render() {
    const { storeLicense, hideModal } = this.props;
    return (
      <Modal
        title="CONFIRMATION"
        visible={this.state.visible}
        onOk={hideModal}
        onCancel={hideModal}
        style={{ textAlign: 'center', width: '50%' }}
        footer={null}
      >
        <p style={{ fontSize: 12 }}>
          <b>{storeLicense.storeName}</b> has license
        </p>
        <p style={{ fontSize: 12 }}>
          from <b>{storeLicense.licenseFrom}</b> to <b>{storeLicense.licenseTo}</b>
        </p>
        <Form onFinish={this.onSubmit}>
          <Space
            direction="horizontal"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Form.Item
              //   initialValue={() => {
              //     return moment(storeLicense.licenseFrom, DATE_FORMAT).add(1, 'd');
              //   }}
              style={{ width: '100%' }}
              name="from"
              label="From"
              rules={[{ required: true }]}
            >
              <DatePicker
                format={DATE_FORMAT}
                defaultValue={
                  moment(storeLicense.licenseFrom, DATE_FORMAT).add(1, 'd')
                  //   .format(DATE_FORMAT)
                }
              />
            </Form.Item>
            <Form.Item
              initialValue={moment(storeLicense.licenseFrom, DATE_FORMAT).add({
                days: 1,
                months: 1,
              })}
              style={{ width: '100%' }}
              name="to"
              label="To"
              rules={[{ required: true }]}
            >
              <DatePicker
                format={DATE_FORMAT}
                defaultValue={
                  moment(storeLicense.licenseFrom, DATE_FORMAT).add({
                    days: 1,
                    months: this.state.package,
                  })
                  //   .format(DATE_FORMAT)
                }
              />
            </Form.Item>
          </Space>
          <Form.Item name="orderStatus">
            <Radio.Group
              style={{ width: '100%' }}
              //   size="middle"
              defaultValue={1}
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
