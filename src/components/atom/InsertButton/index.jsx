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
      //   <div>
      <Button type="primary" className={styles.insertButton}>
        <PlusOutlined size="small" />
        Create
      </Button>
      //   </div>
    );
  }
}

export default InsertButton;
