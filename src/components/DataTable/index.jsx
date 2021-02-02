import React from 'react';
import { Table, Tag, message, Popconfirm, Tooltip } from 'antd';
import { connect } from 'dva';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DATE_FORMAT } from '../../../config/constants';

const { Column } = Table;
@connect(({ admin, loading }) => {
  return {
    listContact: admin.contact,
    listContactMerge: admin.listContactMerge,
    tags: admin.tags,
    isLoadingTableContact: loading.effects['admin/queryContacts'],
    isLoadingTags: loading.effects['admin/getAllTags'],
    isLoadingSearchContact: loading.effects['admin/searchContact'],
    isLoadingGetAllContacts: loading.effects['admin/getAllContacts'],
    currentState: admin.currentState,
    totalContact: admin.totalContact,
  };
})
class TableContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 1,
      PAGE_SIZE: 10,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/queryContacts',
      payload: {
        search: '',
        status: this.props.currentState,
        skip: this.state.skip,
        limit: this.state.PAGE_SIZE,
      },
    });
    dispatch({ type: 'admin/getAllTags' });
    dispatch({ type: 'admin/getAllContacts' });
  }

  search = e => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/searchContact',
      payload: {
        keyword: e.target.value,
        status: this.state.currentState,
      },
    });
  };

  handleClickRow = id => {
    this.props.onShowInfor();
    this.props.getContactID(id);
  };

  confirmDelete = record => {
    const { dispatch } = this.props;
    const values = { status: 'ARCHIVE' };
    const data = { values, id: record.id };
    dispatch({ type: 'admin/updateContactStatus', payload: data })
      .then(response => {
        if (response.type && response.type === 'HttpError') {
          message.error(`Failed to archive contact`);
        } else {
          message.success(`Successfully`);
        }
      })
      .catch(error => {
        message.error(`${error.message}`);
      });
  };

  onChangePaging = page => {
    const { dispatch } = this.props;
    this.setState({
      skip: page,
    });
    dispatch({
      type: 'admin/queryContacts',
      payload: {
        search: '',
        status: this.props.currentState,
        skip: page,
        limit: this.state.PAGE_SIZE,
      },
    });
  };

  render() {
    const { listContact, currentState, totalContact } = this.props;
    const renderedListContact = listContact.map(contact => ({ ...contact, key: contact.id }));
    return (
      <div>
        <div>
          {currentState === 'Duplicate' ? (
            <TableMerge />
          ) : (
            <div>
              <Table
                dataSource={renderedListContact}
                pagination={{
                  current: this.state.skip,
                  pageSize: this.state.PAGE_SIZE,
                  total: totalContact,
                  onChange: this.onChangePaging,
                }}
                bordered
                loading={
                  this.props.isLoadingTags ||
                  this.props.isLoadingTableContact ||
                  this.props.isLoadingGetAllContacts
                }
              >
                <Column
                  width={250}
                  title="Full Name"
                  dataIndex="fullName"
                  key="fullName"
                  render={(text, record) => (
                    <a onClick={() => this.handleClickRow(record.id)}>{text}</a>
                  )}
                />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Phone" dataIndex="phone" key="phone" />
                {currentState !== 'ACTIVE' && currentState !== 'ARCHIVE' && (
                  <Column title="Status" dataIndex="status" key="status" />
                )}
                <Column title="Referrer" dataIndex={['referrer', 'fullName']} key="referrer" />
                <Column
                  title="Tags"
                  dataIndex="tags"
                  key="tags"
                  render={tags => (
                    <span>
                      {tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </span>
                  )}
                  filters={this.props.tags}
                  onFilter={(value, record) => {
                    return record.tags != null && record.tags.indexOf(value) >= 0;
                  }}
                />
                <Column
                  title="Last Update"
                  dataIndex="updatedAt"
                  key="updatedAt"
                  sorter={(firstDate, secondDate) => {
                    return moment(firstDate.updatedAt) - moment(secondDate.updatedAt);
                  }}
                  sortDirections={['descend', 'ascend']}
                  render={date => <span>{moment(date).format(DATE_FORMAT)}</span>}
                />
                {currentState !== 'ARCHIVE' && (
                  <Column
                    title="Action"
                    dataIndex="action"
                    key="action"
                    render={(text, record) => (
                      <div>
                        <Tooltip title="Archive contact">
                          <Popconfirm
                            placement="topLeft"
                            title="Confirm to delete this contact"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => {
                              this.confirmDelete(record);
                            }}
                          >
                            <DeleteOutlined style={{ fontSize: '16px', color: '#08c' }} />
                          </Popconfirm>
                        </Tooltip>
                      </div>
                    )}
                  />
                )}
              </Table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TableContact;
