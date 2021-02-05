import moment from 'moment';
import { Button, Form, Input, Space, DatePicker, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DATE_FORMAT, ORDER_STATUS_FILTER } from '../../../../../config/constants';

class SearchOrderModal extends React.Component {
  constructor(props) {
    super(props);
  }
  handlePressSearch = e => {
    console.log('press', e.target.value);
  };
  handleClickSearch = (value, event) => {
    console.log('click', value);
  };
  handleChangeFilter = value => {
    console.log('filter', value.target.value);
  };
  handleChangeDate = value => {
    console.log('date', moment(value, DATE_FORMAT).format(DATE_FORMAT));
  };

  render() {
    return (
      <Space direction="vertical">
        <Space direction="horizontal" style={{ display: 'flex' }}>
          <Input.Search
            onPressEnter={this.handlePressSearch}
            onSearch={this.handleClickSearch}
            style={{ width: 300 }}
            allowClear
            placeholder="Enter customer phone"
          />
          <DatePicker
            style={{ width: 300 }}
            defaultValue={moment()}
            onChange={this.handleChangeDate}
            allowClear
            format={DATE_FORMAT}
          />
        </Space>
        <Radio.Group
          style={{ display: 'flex' }}
          defaultValue={'ALL'}
          options={ORDER_STATUS_FILTER}
          onChange={this.handleChangeFilter}
          optionType="button"
        />
        <br />
      </Space>
    );
  }
}
export default SearchOrderModal;
