import { Button, Form, Input, Space, DatePicker, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DATE_FORMAT, ORDER_STATUS_FILTER } from '../../../../../config/constants';

class SearchOrderModal extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit = values => {
    console.log('values', values);
  };

  handleChangeFilter = values => {
    console.log('filter', values);
    this.onSubmit;
  };
  render() {
    return (
      <Form onFinish={this.onSubmit}>
        <Space direction="horizontal" style={{ display: 'flex' }}>
          <Form.Item name="keyword">
            <Input
              style={{ width: 300 }}
              allowClear
              placeholder="Enter customer phone, partner store"
            />
          </Form.Item>
          <Form.Item name="orderDate">
            <DatePicker style={{ width: 300 }} allowClear format={DATE_FORMAT} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <SearchOutlined style={{ color: 'white' }} />
            </Button>
          </Form.Item>
        </Space>
        <Form.Item name="orderStatus">
          <Radio.Group
            style={{ display: 'flex' }}
            defaultValue={'ALL'}
            options={ORDER_STATUS_FILTER}
            onChange={this.handleChangeFilter}
            optionType="button"
          ></Radio.Group>
        </Form.Item>
      </Form>
    );
  }
}
export default SearchOrderModal;
