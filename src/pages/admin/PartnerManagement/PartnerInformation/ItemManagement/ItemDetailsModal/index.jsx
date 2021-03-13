import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import { Image, Carousel, Row, Col, Card, Modal } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import styles from './index.less';
import ViewItem from './ViewItemComponent/index';
import EditItem from './EditItemComponent/index';
import ConfirmationPopup from '../../../../../../components/atom/ConfirmationPopup/index';
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
        <Row className={styles.bodyRow}>
          <Col className={styles.bodyColImage} span={8}>
            <Card>
              <Carousel className={styles.bodyCarousel} autoplay>
                <Image className={styles.bodyImage} preview={false} src={item.imageLink} />
              </Carousel>
            </Card>
          </Col>
          <Col className={styles.bodyColInformation} span={16}>
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
