import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import {
  Descriptions,
  Tag,
  Image,
  Space,
  Switch,
  Carousel,
  Layout,
  Row,
  Col,
  Card,
  Modal,
} from 'antd';
import Button from 'antd-button-color';
import 'antd-button-color/dist/css/style.less';
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import ViewItem from './ViewItemComponent/index';
import EditItem from './EditItemComponent/index';
import { convertStringToCamel } from '../../../../../../utils/utils';
import { PARTNER_ITEM } from '../../../../../../../config/seedingData';
import { PARTNER_ITEM_STATUS, DATE_FORMAT } from '../../../../../../../config/constants';

@connect(({ partner, loading }) => ({
  partner: partner.partner,
}))
class ItemDetailsModal extends React.Component {
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

  getTagStatusColors = status => {
    console.log('get tag style');
    switch (status) {
      case PARTNER_ITEM_STATUS.ACTIVE:
        return {
          color: 'success',
          icon: <CheckCircleOutlined />,
        };
      case PARTNER_ITEM_STATUS.ARCHIVE:
        return {
          color: 'error',
          icon: <CloseCircleOutlined />,
        };
      default:
        return {
          color: 'processing',
          icon: <SyncOutlined spin />,
        };
    }
  };

  render() {
    const item = PARTNER_ITEM;
    // const partner = Object.assign({}, this.props.partner);
    return (
      <Modal
        visible={this.props.visible}
        style={{ textAlign: 'center' }}
        title="PARTNER'S ITEM"
        footer={null}
        width="80%"
        bodyStyle={{ textAlign: 'left' }}
      >
        {/* <ViewItem item={item} display="flex" /> */}
        <EditItem item={item} display="flex" />
      </Modal>
    );
  }
}

export default ItemDetailsModal;
