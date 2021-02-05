import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.less';

class InsertButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Button type="primary" className={styles.insertButton} onClick={this.props.onClick}>
        <PlusOutlined size="small" style={{ color: 'white' }} />
        Create
      </Button>
    );
  }
}

export default InsertButton;
