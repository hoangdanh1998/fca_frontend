import { Input, Space, Radio } from 'antd';
import { connect } from 'dva';
import { PARTNER_STATUS_FILTER } from '../../../../../config/constants';

@connect(({ admin, loading }) => {
  return {};
})
class SearchPartnerModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePressSearch = e => {
    console.log('press', e.target.value);
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/getPartnerList',
      payload: {
        name: e.target.value,
        status: '',
      },
    });
  };
  handleClickSearch = (value, event) => {
    console.log('click', value);
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/getPartnerList',
      payload: {
        name: value,
        status: '',
      },
    });
  };
  handleChangeFilter = e => {
    console.log('filter', e.target.value);
    const { dispatch } = this.props;
    dispatch({
      type: 'partner/getPartnerList',
      payload: {
        name: '',
        status: e.target.value === 'ALL' ? '' : e.target.value,
      },
    });
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
          placeholder="Enter name"
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
