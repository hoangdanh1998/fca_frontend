import moment from 'moment';
import { connect } from 'dva';
import { Input, Space, DatePicker, Radio } from 'antd';
import {
  DATE_FORMAT,
  ORDER_STATUS_FILTER,
  DATE_FORMAT_CALL_API,
} from '../../../../../config/constants';

@connect(({ order, loading }) => {})
class SearchOrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createdDate: moment().format(DATE_FORMAT_CALL_API),
      status: '',
      phone: '',
    };
  }
  handlePressSearch = e => {
    this.setState({ phone: e.target.value });

    const { dispatch } = this.props;
    dispatch({
      type: 'order/getOrderList',
      payload: {
        createdDate: this.state.createdDate,
        status: this.state.status,
        phone: e.target.value,
      },
    });
  };
  handleClickSearch = (value, event) => {
    this.setState({ phone: value });

    const { dispatch } = this.props;
    dispatch({
      type: 'order/getOrderList',
      payload: {
        createdDate: this.state.createdDate,
        status: this.state.status,
        phone: value,
      },
    });
  };
  handleChangeFilter = e => {
    this.setState({ status: e.target.value === 'ALL' ? '' : e.target.value });

    const { dispatch } = this.props;
    dispatch({
      type: 'order/getOrderList',
      payload: {
        createdDate: this.state.createdDate,
        status: e.target.value === 'ALL' ? '' : e.target.value,
        phone: this.state.phone,
      },
    });
  };
  handleChangeDate = value => {
    this.setState({ createdDate: moment(value, DATE_FORMAT).format(DATE_FORMAT_CALL_API) });

    const { dispatch } = this.props;
    dispatch({
      type: 'order/getOrderList',
      payload: {
        createdDate: moment(value, DATE_FORMAT).format(DATE_FORMAT_CALL_API),
        status: this.state.status,
        phone: this.state.phone,
      },
    });
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
            allowClear={false}
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
