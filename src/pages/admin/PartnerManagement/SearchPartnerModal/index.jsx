import { Button, Form, Input, Space, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DATE_FORMAT, PARTNER_STATUS_ARRAY } from '../../../../../config/constants';

class SearchPartnerModal extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit = values => {
    console.log('values', values);
    // console.log('filterForm', this.handleChangeFilter);
  };

  handleChangeFilter = values => {
    console.log('filter', values);
    this.onSubmit;
  };
  render() {
    return (
      <Form onFinish={this.onSubmit}>
        <Space direction="horizontal" style={{ display: 'flex' }}>
          <Form.Item style={{ width: '100%' }} name="keyword">
            <Input allowClear placeholder="Enter partner store" />
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
            options={PARTNER_STATUS_ARRAY}
            onChange={this.handleChangeFilter}
            optionType="button"
          ></Radio.Group>
        </Form.Item>
      </Form>
    );
  }
}
export default SearchPartnerModal;
