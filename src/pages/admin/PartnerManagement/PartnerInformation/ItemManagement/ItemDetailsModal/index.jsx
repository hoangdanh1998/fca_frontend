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
import ConfirmationPopup from '../../../../../../components/atom/ConfirmationPopup/index';
import { convertStringToCamel } from '../../../../../../utils/utils';
import { PARTNER_ITEM } from '../../../../../../../config/seedingData';
import { PARTNER_ITEM_STATUS, DATE_FORMAT } from '../../../../../../../config/constants';

@connect(({ partner, loading }) => ({
  partner: partner.partner,
}))
class ItemDetailsModal extends React.Component {
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
  handleChangeMode = mode => {
    this.setState({ viewMode: mode });
  };

  handleVisibleChangeStatus = toStatus => {
    this.setState({
      visibleChangeStatus: true,
      message: {
        name: this.props.item.name,
        property: 'status',
        from: this.props.item.status,
        to: toStatus,
      },
    });
  };

  handleUpdateItem = values => {
    alert(JSON.stringify(values));
  };

  render() {
    const { item, visible } = this.props;
    // const partner = Object.assign({}, this.props.partner);
    return (
      <Modal
        visible={visible}
        style={{ textAlign: 'center' }}
        title="PARTNER'S ITEM"
        footer={null}
        width="80%"
        bodyStyle={{ textAlign: 'left' }}
        onCancel={() => {
          this.setState({ viewMode: 'view' });
          this.props.hideModal();
        }}
      >
        <Row style={{ width: '100%', height: '100%' }}>
          <Col style={{ width: '100%', height: '100%' }} span={8}>
            <Card bordered>
              <Carousel style={{ width: '95%', height: 'auto', marginLeft: '2.5%' }} autoplay>
                <Image height="100%" width="100%" preview={false} src={item.imageLink} />
                <Image height="100%" width="100%" preview={false} src={item.imageLink} />
              </Carousel>
            </Card>
          </Col>
          <Col style={{ width: '100%', height: '100%' }} span={16}>
            {this.state.viewMode === 'view' ? (
              <ViewItem
                item={item}
                onChangeMode={() => this.handleChangeMode('edit')}
                askConfirm={toStatus => {
                  this.handleVisibleChangeStatus(toStatus);
                }}
              />
            ) : (
              <EditItem
                item={item}
                onChangeMode={() => this.handleChangeMode('view')}
                onUpdateItem={values => this.handleUpdateItem(values)}
              />
            )}
          </Col>
        </Row>
        <ConfirmationPopup
          message={this.state.confirmMessage}
          visible={this.state.visibleChangeStatus}
        />
      </Modal>
    );
  }
}

export default ItemDetailsModal;
