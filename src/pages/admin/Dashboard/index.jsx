import React from 'react';
import { connect } from 'dva';
import TableDashboard from './TableDashboard/TableDashboard';

import styles from './TalentManagement.less';
import HeaderLayout from '@/components/atom/Header';

@connect(({ admin, loading }) => ({
  admin,
  fetchCurrentAdmin: loading.effects['admin/saveCurrentAdmin'],
}))
class Dashboard extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <HeaderLayout title="Dashboard" />
        <div className={styles.applicationManagementContainer}>
          {/* <TalentForm {...this.state} cancel={() => this.setState({ visible: false })} /> */}{' '}
          <TableDashboard onShowInfor={this.showDrawer} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
