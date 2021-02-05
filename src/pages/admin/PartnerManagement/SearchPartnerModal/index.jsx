import { Button, Form, Input, Space, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { PARTNER_STATUS_FILTER } from '../../../../../config/constants';

class SearchPartnerModal extends React.Component {
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
        <Input.Search
          onPressEnter={this.handlePressSearch}
          onSearch={this.handleClickSearch}
          style={{ width: 300 }}
          allowClear
          placeholder="Enter name, address"
        />
        <Radio.Group
          style={{ display: 'flex' }}
          defaultValue={'ALL'}
          options={PARTNER_STATUS_FILTER}
          onChange={this.handleChangeFilter}
          optionType="button"
        />
        <br />
      </Space>
    );
  }
}
export default SearchPartnerModal;
