import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Space, Descriptions, Tag } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { LICENSE_STATUS, DATE_FORMAT } from '../../../../../../config/constants';
import { convertStringToCamel } from '../../../../../utils/utils';

class ViewLicense extends React.Component {
  render() {
    const { license } = this.props;
    return (
      <Descriptions
        column={1}
        contentStyle={{ fontWeight: 'bold' }}
        labelStyle={{ textAlign: 'left', width: '20%' }}
        title={
          <Space direction="horizontal">
            {license.name}
            <EditOutlined style={{ color: '#1890ff' }} onClick={this.props.onChangeMode} />
          </Space>
        }
      >
        <Descriptions.Item label="Duration">{`${license.duration} month(s)`}</Descriptions.Item>
        <Descriptions.Item label="Price">
          <NumberFormat value={license.price} displayType={'text'} thousandSeparator={true} />
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag
            color={license.status === LICENSE_STATUS.ACTIVE ? 'green' : 'red'}
            icon={
              license.status === LICENSE_STATUS.ACTIVE ? (
                <CheckCircleOutlined />
              ) : (
                <CloseCircleOutlined />
              )
            }
          >
            {convertStringToCamel(license.status)}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Create Date">
          {moment(license.createdAt).format(DATE_FORMAT)}
        </Descriptions.Item>
        <Descriptions.Item label="Description">{license.description}</Descriptions.Item>
      </Descriptions>
    );
  }
}

export default ViewLicense;
