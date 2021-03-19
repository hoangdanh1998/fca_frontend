import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Descriptions, Space } from 'antd';
import moment from 'moment';
import React from 'react';
import NumberFormat from 'react-number-format';
import { DATE_FORMAT, LICENSE_STATUS } from '../../../../../../config/constants';

class ViewLicense extends React.Component {
  render() {
    const { license } = this.props;
    return (
      <Descriptions
        column={2}
        contentStyle={{ fontWeight: 'bold' }}
        labelStyle={{ textAlign: 'left', width: '40%' }}
        title={
          // license.name
          <Space
            direction="horizontal"
            style={{
              justifyContent: 'flex-start',
              display: 'flex',
            }}
          >
            {license.status === LICENSE_STATUS.ACTIVE ? (
              <CheckCircleOutlined style={{ color: 'green' }} />
            ) : (
              <CloseCircleOutlined color="red" />
            )}
            {license.name}
            {/* <Tag
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
            </Tag> */}
            {/* <EditOutlined style={{ color: '#1890ff' }} onClick={this.props.onChangeMode} /> */}
          </Space>
        }
      >
        <Descriptions.Item label="Duration">{`${license.duration} month(s)`}</Descriptions.Item>
        <Descriptions.Item label="Price">
          <NumberFormat value={license.price} displayType={'text'} thousandSeparator={true} />
        </Descriptions.Item>
        {/* <Descriptions.Item label="Status">
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
        </Descriptions.Item> */}
        <Descriptions.Item label="Start Date">
          {moment(license.startDate).format(DATE_FORMAT)}
        </Descriptions.Item>
        <Descriptions.Item label="End Date">
          {license.endDate ? moment(license.endDate).format(DATE_FORMAT) : '-'}
        </Descriptions.Item>
        <Descriptions.Item span={2} labelStyle={{ width: '20%' }} label="Description">
          {license.description}
        </Descriptions.Item>
        <Descriptions.Item span={1} label="Create Date">
          {moment(license.createdAt).format(DATE_FORMAT)}
        </Descriptions.Item>
      </Descriptions>
    );
  }
}

export default ViewLicense;
