import React, { Component } from 'react';
import { connect } from 'dva';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import LeftBackGround from '../../public/decoration_left.svg';
import RightBackGround from '../../public/decoration_right.svg';
import styles from './ApplicationLayout.less';
import ModalNotificate from '../components/ModalNotificate/ModalNotificate';

@connect(({ global }) => ({ global }))
class ApplicationLayout extends Component {
  onSetCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/setNotificationCancel',
    });
  };

  onSetRedirect = () => {
    const { global, dispatch } = this.props;
    if (global.applicationUI.notification.type === 'success') {
      global.applicationUI.notification.buttonHandler();
      dispatch({
        type: 'global/setNotificationCancel',
      });
    } else {
      dispatch({
        type: 'global/setNotificationCancel',
      });
    }
  };

  render() {
    const { children, global } = this.props;
    let renderModal;
    if (global.applicationUI.notification)
      renderModal = (
        <ModalNotificate
          type={global.applicationUI.notification.type}
          title={global.applicationUI.notification.title}
          content={global.applicationUI.notification.content}
          textButton={global.applicationUI.notification.buttonText}
          visibleModalNoti={global.applicationUI.notification}
          onReceiveCancel={this.onSetCancel}
          onReceiveRedirect={this.onSetRedirect}
        />
      );
    return (
      <div>
        <div
          className={`${styles.container} ${
            global.backgroundColorApplicationLayout ? 'application-layout-container-success' : ''
          }`}
        >
          {renderModal}
          <div>{children}</div>
          <div className={styles.livechat}>
            <div className="fb-customerchat">
              <MessengerCustomerChat pageId="368930070409200" appId="1678638095724206" />
            </div>
          </div>

          <div className={styles.decorationLeft}>
            <img src={LeftBackGround} alt="decoration-left" />
          </div>
          <div className={styles.decorationRight}>
            <img src={RightBackGround} alt="decoration-right" />
          </div>
        </div>
      </div>
    );
  }
}

export default ApplicationLayout;
