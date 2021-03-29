import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Form, Space, Modal, Button, DatePicker, Radio, Tag, Select, Input } from 'antd';
import {
  DATE_FORMAT,
  LICENSE_PACKAGE,
  DATE_FORMAT_CALL_API,
} from '../../../../../../../config/constants';
import styles from './index.less';

class ExpandLicenseModal extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    startDate: this.props.lastLicense
      ? moment(this.props.lastLicense.endDate).add(1, 'day')
      : moment(),
    endDate: this.props.lastLicense
      ? this.props.packages
        ? moment(this.props.lastLicense.endDate)
            .add(1, 'day')
            .add(this.props.packages[0].duration, 'months')
        : moment(this.props.lastLicense.endDate).add(1, 'day')
      : this.props.packages
      ? moment().add(this.props.packages[0].duration, 'months')
      : moment(),
    package: this.props.packages ? this.props.packages[0].value : '',
    price: this.props.packages ? this.props.packages[0].price : 0,
  };

  handleChangePackage = e => {
    // const value = e.target.value;
    const value = e;
    const selectedPackage = this.props.packages.find(p => p.value === value);
    const packagePrice = selectedPackage.price;
    const selectedDuration = selectedPackage.duration;
    this.setState({
      package: value,
      // endDate: moment(this.state.startDate, DATE_FORMAT).add(value, 'months'),
      endDate: moment(this.state.startDate, DATE_FORMAT).add(selectedDuration, 'months'),
      price: packagePrice,
    });
    console.log('statePrice', this.state.price);
  };

  handleChangeStartDate = value => {
    this.setState({
      startDate: value,
      endDate: moment(value, DATE_FORMAT).add(this.state.package, 'months'),
    });
  };

  onSubmit = values => {
    console.log('startDate', this.state.startDate.format(DATE_FORMAT_CALL_API));
    console.log('endDate', this.state.endDate.format(DATE_FORMAT_CALL_API));
    console.log('package', this.state.package);
    console.log('price', this.state.price);
    this.props.submitModal({
      fcaLicenseId: this.state.package,
      startDate: this.state.startDate.format(DATE_FORMAT_CALL_API),
      endDate: this.state.endDate.format(DATE_FORMAT_CALL_API),
      price: this.state.price,
    });
  };

  render() {
    const { lastLicense, hideModal, packages } = this.props;
    console.log('lastLicense', lastLicense);
    const disabledDate = lastLicense ? moment(lastLicense.endDate) : moment().subtract(1, 'day');
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
              from <b>{moment(lastLicense.startDate).format(DATE_FORMAT)}</b> to{' '}
              <b>{moment(lastLicense.endDate).format(DATE_FORMAT)}</b>
            </p>
          </>
        ) : null}
        <Form
          initialValues={{
            startDate: this.state.startDate,
            package: packages ? packages[0].value : '',
            price: this.state.price,
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
                disabledDate={d => !d || d.isSameOrBefore(disabledDate)}
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
          <Form.Item labelCol={{ span: 4 }} name="package" label="Package">
            <Select options={packages ? packages : []} onSelect={this.handleChangePackage} />
          </Form.Item>

          <Form.Item labelCol={{ span: 4 }} name="price" label="Price">
            <div
              style={{
                width: '100%',
                height: 'auto',
              }}
            >
              <Tag style={{ width: '100%', height: 'auto' }} color="default">
                <NumberFormat
                  value={this.state.price}
                  displayType={'text'}
                  thousandSeparator={true}
                />
                {' VND'}
              </Tag>
            </div>
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
