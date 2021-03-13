import React from 'react';
import { router } from 'umi';
import { connect } from 'dva';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Space, Modal, Descriptions, Tag } from 'antd';
import { CloseCircleOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import ViewLicense from './ViewLicenseComponent/index';
import UpdateLicense from './UpdateLicenseComponent/index';
import { LICENSE_STATUS, DATE_FORMAT } from '../../../../../config/constants';
import { convertStringToCamel } from '../../../../utils/utils';

class LicenseDetailModal extends React.Component {
  state = { viewMode: 'view' };
  componentWillMount() {}

  handleUpdateLicense = values => {
    alert(JSON.stringify(values));
  };
  handleChangeMode = mode => {
    this.setState({ viewMode: mode });
  };

  render() {
    const { license, visible } = this.props;
    return (
      <Modal
        visible={visible}
        style={{ textAlign: 'center' }}
        title="LICENSE INFORMATION"
        footer={null}
        bodyStyle={{ textAlign: 'left' }}
        onCancel={() => {
          this.setState({ viewMode: 'view' });
          this.props.hideModal();
        }}
      >
        {this.state.viewMode === 'view' ? (
          <ViewLicense onChangeMode={() => this.handleChangeMode('edit')} license={license} />
        ) : (
          <UpdateLicense
            onUpdateLicense={values => this.handleUpdateLicense(values)}
            onChangeMode={() => this.handleChangeMode('view')}
            license={license}
          />
        )}
      </Modal>
    );
  }
}

export default LicenseDetailModal;
