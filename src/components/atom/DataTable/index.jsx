import React from 'react';
import { Table } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

const { Column } = Table;
@connect(({ admin, loading }) => {
  return {};
})
class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 1,
      PAGE_SIZE: 10,
    };
  }

  render() {
    // const { listContact, currentState, totalContact } = this.props;
    // const renderedListContact = listContact.map(contact => ({ ...contact, key: contact.id }));
    const { columnList, dataList, totalRecords } = this.props;
    return (
      <div>
        <div>
          <div>
            <Table
              className={styles.table}
              dataSource={dataList}
              columns={columnList}
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
            ></Table>
          </div>
        </div>
      </div>
    );
  }
}

export default DataTable;
