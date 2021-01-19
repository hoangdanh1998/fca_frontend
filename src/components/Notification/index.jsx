import React from 'react';
import { notification } from 'antd';
import CheckIcon from '../../../public/check-line.svg';
import styles from './styles.less';
// import { Modal } from 'antd';

class AdminNotification {
  // eslint-disable-next-line class-methods-use-this
  success(content) {
    notification.open({
      message: (
        <span className={styles.adminNotificationContent} style={{ color: 'green' }}>
          {content}
        </span>
      ),
      duration: 2,
      icon: <img src={CheckIcon} alt="check-icon" className={styles.checkIcon} />,
      style: {
        marginTop: '-18px',
        width: 385,
        padding: '15px',
        borderRadius: 3,
        backgroundColor: '#fff',
        opacity: 1,
        borderColor: 'green',
        color: 'green',
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  fail(content) {
    notification.open({
      message: (
        <span className={styles.adminNotificationContent} style={{ color: 'red' }}>
          {content}
        </span>
      ),
      duration: 5,
      style: {
        marginTop: '-18px',
        width: 385,
        opacity: 1,
        borderRadius: 3,
        backgroundColor: '#fff',
        borderColor: 'red',
        color: 'red',
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  error(content) {
    notification.open({
      message: (
        <span className={styles.adminNotificationContent} style={{ color: 'red' }}>
          {content}
        </span>
      ),
      duration: 1000,
      style: {
        marginTop: '-18px',
        width: 385,
        opacity: 1,
        borderRadius: 3,
        backgroundColor: '#fff',
        borderColor: 'red',
        color: 'red',
      },
    });
  }
}

export default AdminNotification;
