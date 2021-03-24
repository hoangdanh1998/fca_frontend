import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Tabs, Skeleton } from 'antd';
import GeneralInformation from '../PartnerInformation/GeneralInformation/index.jsx';
import LicenseManagement from '../PartnerInformation/LicenseManagment/index.jsx';
import ItemManagement from '../PartnerInformation/ItemManagement/index.jsx';
import styles from './index.less';
import { PAGE_SIZE } from '../../../../../config/constants';

@connect(({ partner, loading }) => ({
  partner: partner.partner,
  allFcaLicenseList: partner.allFcaLicenseList,
}))
class PartnerInformation extends React.Component {
  state = { loading: false };
  async componentWillMount() {
    this.setState({ loading: true });
    const { dispatch } = this.props;
    const url = window.location.href;
    const id = url.substring(url.indexOf('=') + 1);
    await dispatch({
      type: 'partner/getPartner',
      payload: {
        id: id,
      },
    });
    this.setState({ loading: false });
    dispatch({
      type: 'partner/getFcaLicenseList',
      payload: {
        skip: 0,
        limit: PAGE_SIZE,
      },
    });
  }

  render() {
    console.log('partner-information', this.props.partner);
    const { partner, allFcaLicenseList } = this.props;
    return (
      <div className={styles.applicationManagementContainer}>
        {this.state.loading ? (
          <Skeleton loading={this.state.loading} />
        ) : (
          <Tabs
            defaultActiveKey="1"
            centered={true}
            style={{
              fontSize: 20,
              color: 'black',
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Tabs.TabPane tab="General Information" key="1">
              <GeneralInformation partner={partner} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Item Management" key="2">
              <ItemManagement partner={partner} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="License Management" key="3">
              <LicenseManagement partner={partner} packages={allFcaLicenseList} />
            </Tabs.TabPane>
          </Tabs>
        )}
      </div>
    );
  }
}

export default PartnerInformation;
