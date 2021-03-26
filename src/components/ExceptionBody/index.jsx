import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Result, Button } from 'antd';

class ExceptionBody extends React.Component {
  render() {
    return (
      <Result
        status="warning"
        title="There are some problem with your operation"
        extra={
          <Button
            type="primary"
            onClick={() => {
              window.location.reload();
            }}
          >
            Try again
          </Button>
        }
      />
    );
  }
}

export default ExceptionBody;
