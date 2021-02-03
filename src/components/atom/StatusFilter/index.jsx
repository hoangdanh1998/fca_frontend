import React from 'react';
import { Radio } from 'antd';
import styles from './index.less';

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
class StatusFilter extends React.Component {
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
    const { statusList } = this.props;

    return (
      // <div className={styles.containerFilter}>
      <Radio.Group
        style={{ display: 'flex' }}
        defaultValue={'ALL'}
        options={statusList}
        onChange={this.onChangeFilterContact}
        optionType="button"
      ></Radio.Group>
      // </div>
    );
  }
}

export default StatusFilter;
