import React from 'react';
import { connect } from 'dva';
import HeaderLayout from '@/components/Header';
import TableGroupCandidate from '@/components/TableGroupCandidate';
import styles from './index.less';

@connect(({ loading }) => ({
  isLoadingDetailCandidate: loading.effects['admin/fetchCandidateById'],
}))
class CardTouchpoint extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/getGroupCandidateById',
      payload: this.props.match.params.id,
    });
  }

  render() {
    return (
      <>
        <HeaderLayout title="Dashboard" detail=" / Group Candidate" page="dashboard" />
        <div className={styles.applicationManagementContainer}>
          <TableGroupCandidate />
        </div>
      </>
    );
  }
}

export default CardTouchpoint;
