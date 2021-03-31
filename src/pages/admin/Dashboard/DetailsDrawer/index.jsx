import React from 'react';
import moment from 'moment';
import { Descriptions, Drawer, List, Tag, Space } from 'antd';
import NumberFormat from 'react-number-format';
import styles from './index.less';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../../../../config/constants';

class DetailsDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  renderDrawerBody = (mode, data) => {
    switch (mode) {
      case 'partner':
        return (
          <Descriptions
            column={2}
            title={
              <Space direction="horizontal">
                <Tag color={data?.isOpen ? 'green' : 'red'}>
                  {data?.isOpen ? 'Opening' : 'Closing'}
                </Tag>
                <b>{data?.name}</b>
              </Space>
            }
          >
            <Descriptions.Item label="Phone">{data?.phone}</Descriptions.Item>
            <Descriptions.Item label="Expiration Date">
              {moment(data?.expirationDate).format(DATE_FORMAT)}
            </Descriptions.Item>
            <Descriptions.Item label="Address">{data?.address?.description}</Descriptions.Item>
          </Descriptions>
        );
      case 'canceled-order':
        return (
          <Descriptions column={2} title="Canceled Order">
            <Descriptions.Item label="Customer">{data?.customerPhone}</Descriptions.Item>
            <Descriptions.Item label="Partner">{data?.partnerName}</Descriptions.Item>
            <Descriptions.Item label="Cancel Reason">{data?.reason}</Descriptions.Item>
          </Descriptions>
        );
      case 'rejected-order':
        return (
          <List
            dataSource={data.orderList}
            renderItem={order => (
              <List.Item
                actions={[
                  <p>{`Rejected at ${moment(order?.createdAt).format(DATE_TIME_FORMAT)}`}</p>,
                ]}
              >
                <List.Item.Meta
                  title={<b>{order?.customer?.account?.phone}</b>}
                  description={
                    <List
                      dataSource={order?.items}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            description={
                              <Space direction="horizontal">
                                <p>
                                  {`${item?.name}: `}
                                  <NumberFormat
                                    value={item?.price}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                  />
                                  {` x ${item?.quantity}`}
                                </p>
                              </Space>
                            }
                          />
                        </List.Item>
                      )}
                    ></List>
                  }
                />
                <Space direction="horizontal">
                  <p>
                    Total:{' '}
                    <NumberFormat
                      value={order?.total}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                  </p>
                </Space>
              </List.Item>
            )}
          ></List>
        );
      default:
        return <p>No data</p>;
    }
  };

  render() {
    const { visible, data, mode, hideModal } = this.props;
    return (
      <Drawer
        visible={visible}
        onClose={hideModal}
        getContainer={false}
        style={{ position: 'absolute' }}
        placement={mode === 'partner' ? 'top' : 'bottom'}
        height="80%"
      >
        {this.renderDrawerBody(mode, data)}
      </Drawer>
    );
  }
}

export default DetailsDrawer;
