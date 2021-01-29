import React from 'react';
import { Input } from 'antd';
import { connect } from 'dva';

// @connect(({ admin, loading }) => {
//   return {
//     listContact: admin.contact,
//     listContactMerge: admin.listContactMerge,
//     tags: admin.tags,
//     isLoadingTableContact: loading.effects['admin/queryContacts'],
//     isLoadingTags: loading.effects['admin/getAllTags'],
//     isLoadingSearchContact: loading.effects['admin/searchContact'],
//     currentState: admin.currentState,
//   };
// })
class SearchText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //   search = e => {
  //     const { dispatch, currentState } = this.props;
  //     if (currentState === 'Duplicate') {
  //       dispatch({
  //         type: 'admin/getContactMerge',
  //         payload: {
  //           search: e.target.value,
  //         },
  //       });
  //     } else {
  //       dispatch({
  //         type: 'admin/queryContacts',
  //         payload: {
  //           search: e.target.value,
  //           skip: 1,
  //           limit: 10,
  //           status: currentState,
  //         },
  //       });
  //     }
  //   };

  //   onChangeFilterContact = e => {
  //     const { dispatch } = this.props;
  //     dispatch({
  //       type: 'admin/queryContacts',
  //       payload: {
  //         search: '',
  //         status: e.target.value,
  //         skip: 1,
  //         limit: 10,
  //       },
  //     });
  //     dispatch({
  //       type: 'admin/currentState',
  //       payload: e.target.value,
  //     });
  //   };

  render() {
    const { searchKeyword } = this.props;

    return (
      <div>
        <Input.Search
          allowClear
          placeholder={`Search by ${searchKeyword}`}
          onPressEnter={this.search}
          // className={styles.search}
          style={{ width: '100%' }}
          //   loading={this.props.isLoadingSearchContact}
        />
      </div>
    );
  }
}

export default SearchText;
