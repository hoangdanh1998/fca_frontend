import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import {
  Image,
  Carousel,
  Row,
  Col,
  Card,
  Modal,
  Descriptions,
  Tag,
  Space,
  Form,
  Input,
  Select,
  InputNumber,
  Button,
} from 'antd';
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { PARTNER_ITEM_STATUS, DATE_FORMAT } from '../../../../../../../config/constants';
import { FCA_ITEM_LIST } from '../../../../../../../config/seedingData';

@connect(({ partner, loading }) => ({
  partner: partner.partner,
}))
class EditItemModal extends React.Component {
  state = { viewMode: 'view', visibleChangeStatus: false, confirmMessage: {} };
  componentWillMount() {
    // const { dispatch } = this.props;
    // const url = window.location.href;
    // const id = url.substring(url.indexOf('=') + 1);
    // dispatch({
    //   type: 'partner/getPartner',
    //   payload: {
    //     id: id,
    //   },
    // });
    // const items = this.props.partner.items.concat(this.props.partner.requestItems);
    // const item = items.find(item => item.id === id);
    // this.setState({ item: item });
  }

  render() {
    const { item, visible } = this.props;
    return (
      <Modal
        visible={visible}
        style={{ textAlign: 'center' }}
        title="PARTNER'S ITEM"
        footer={null}
        bodyStyle={{ textAlign: 'left' }}
        onCancel={() => {
          this.props.hideModal();
        }}
      >
        <Form
          onFinish={values => {
            this.props.onSubmitModal(values);
          }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{
            name: item.id ? item.name : '',
            fcaGroup: item.id ? item.fcaItem.id : '',
            price: item.id ? item.price : '',
          }}
        >
          <Form.Item rules={[{ required: true }]} name="name" label="Name">
            <Input placeholder="Enter name" allowClear />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="fcaGroup" label="FCA Group">
            <Select placeholder="Choose group" allowClear options={FCA_ITEM_LIST}></Select>
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="price" label="Price">
            <InputNumber
              allowClear
              placeholder="Enter price"
              min={0}
              max={1000000}
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Space direction="horizontal" style={{ display: 'flex', justifyContent: 'center' }}>
            <Form.Item>
              <Button htmlType="button" onClick={this.props.hideModal}>
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

export default EditItemModal;
