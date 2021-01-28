import React from 'react';
import { Table, Tag, message, Popconfirm, Tooltip } from 'antd';
import { connect } from 'dva';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment';

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
class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 1,
      PAGE_SIZE: 10,
    };
  }

  //   componentDidMount() {
  //     const { dispatch } = this.props;
  //     dispatch({
  //       type: 'admin/queryContacts',
  //       payload: {
  //         search: '',
  //         status: this.props.currentState,
  //         skip: this.state.skip,
  //         limit: this.state.PAGE_SIZE,
  //       },
  //     });
  //     dispatch({ type: 'admin/getAllTags' });
  //     dispatch({ type: 'admin/getAllContacts' });
  //   }

  //   search = e => {
  //     const { dispatch } = this.props;
  //     dispatch({
  //       type: 'admin/searchContact',
  //       payload: {
  //         keyword: e.target.value,
  //         status: this.state.currentState,
  //       },
  //     });
  //   };

  //   handleClickRow = id => {
  //     this.props.onShowInfor();
  //     this.props.getContactID(id);
  //   };

  //   confirmDelete = record => {
  //     const { dispatch } = this.props;
  //     const values = { status: 'ARCHIVE' };
  //     const data = { values, id: record.id };
  //     dispatch({ type: 'admin/updateContactStatus', payload: data })
  //       .then(response => {
  //         if (response.type && response.type === 'HttpError') {
  //           message.error(`Failed to archive contact`);
  //         } else {
  //           message.success(`Successfully`);
  //         }
  //       })
  //       .catch(error => {
  //         message.error(`${error.message}`);
  //       });
  //   };

  //   onChangePaging = page => {
  //     const { dispatch } = this.props;
  //     this.setState({
  //       skip: page,
  //     });
  //     dispatch({
  //       type: 'admin/queryContacts',
  //       payload: {
  //         search: '',
  //         status: this.props.currentState,
  //         skip: page,
  //         limit: this.state.PAGE_SIZE,
  //       },
  //     });
  //   };

  render() {
    // const { listContact, currentState, totalContact } = this.props;
    // const renderedListContact = listContact.map(contact => ({ ...contact, key: contact.id }));
    const { columnList, dataList, totalRecords, isView, isEdit, isDelete } = this.props;
    return (
      <div>
        <div>
          <div>
            <Table
              dataSource={dataList}
              pagination={{
                current: this.state.skip,
                pageSize: this.state.PAGE_SIZE,
                total: totalRecords,
                onChange: this.onChangePaging,
              }}
              bordered
              loading={
                this.props.isLoadingTags ||
                this.props.isLoadingTableContact ||
                this.props.isLoadingGetAllContacts
              }
            >
              {/* {columnList.forEach(column => {
                console.log(column.title);
                <Column title={column.title} dataIndex={column.dataIndex} key={column.key} />;
              })} */}
              <Column title="Store Name" dataIndex="storeName" key="storeName" />;
              <Column
                title="Action"
                dataIndex="action"
                key="action"
                render={() => {
                  <div>
                    <EyeOutlined style={{ visible: { isView } }} />
                    <EditOutlined style={{ visible: { isEdit } }} />
                    <DeleteOutlined style={{ visible: { isDelete } }} />
                  </div>;
                }}
              />
              ;
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default DataTable;
