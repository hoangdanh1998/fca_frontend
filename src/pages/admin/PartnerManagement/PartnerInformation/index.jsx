import React from 'react';
import moment from 'moment';
import { router } from 'umi';
import { connect } from 'dva';
import { Tabs } from 'antd';
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
  async componentWillMount() {
    const { dispatch } = this.props;
    const url = window.location.href;
    const id = url.substring(url.indexOf('=') + 1);
    await dispatch({
      type: 'partner/getPartner',
      payload: {
        id: id,
      },
    });
    dispatch({
      type: 'partner/getFcaLicenseList',
      payload: {
        skip: 0,
        limit: PAGE_SIZE,
      },
    });
  }

  render() {
    const { partner, allFcaLicenseList } = this.props;
    return (
      <div className={styles.applicationManagementContainer}>
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
      </div>
    );
  }
}

export default PartnerInformation;
