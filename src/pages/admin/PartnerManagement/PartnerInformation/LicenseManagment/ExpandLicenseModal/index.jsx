import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Form, Space, Modal, Button, DatePicker, Radio, Tag, Select, Input } from 'antd';
import { DATE_FORMAT, LICENSE_PACKAGE } from '../../../../../../../config/constants';
import styles from './index.less';

// @connect(({ license, loading }) => ({}))
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
    price: LICENSE_PACKAGE.find(license => license.value === 1).price,
  };

  handleChangePackage = e => {
    // const value = e.target.value;
    const value = e;
    const packagePrice = this.props.packages.find(license => license.value === value).price;
    const selectedDuration = this.props.packages.find(p => p.id === value).duration;
    console.log('packagePrice', packagePrice);
    this.setState({
      package: value,
      endDate: moment(this.state.startDate, DATE_FORMAT).add(value, 'months'),
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
    console.log('startDate', this.state.startDate.format(DATE_FORMAT));
    console.log('endDate', this.state.endDate.format(DATE_FORMAT));
    console.log('package', this.state.package);
    console.log('price', this.state.price);
  };

  render() {
    const { lastLicense, hideModal, packages } = this.props;
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
            package: packages ? packages[0].value : '',
            price: this.state.price,
          }}
          onFinish={this.onSubmit}
          // style={{ textAlign: 'left' }}
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
          <Form.Item labelCol={{ span: 4 }} name="package" label="Package">
            {/* <Radio.Group
              className={styles.radio}
              // options={LICENSE_PACKAGE}
              options={packages}
              onChange={this.handleChangePackage}
              optionType="button"
              size="small"
            ></Radio.Group> */}
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
