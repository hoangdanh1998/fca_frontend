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
  handleUpdateLicense = values => {
    // alert(JSON.stringify(values));
    this.props.submitModal(values);
  };

  render() {
    const { license, visible, mode } = this.props;
    return (
      <Modal
        visible={visible}
        style={{ textAlign: 'center' }}
        title="LICENSE INFORMATION"
        footer={null}
        bodyStyle={{ textAlign: 'left' }}
        onCancel={() => {
          this.props.hideModal();
        }}
      >
        {mode === 'view' ? (
          <ViewLicense license={license} />
        ) : (
          <UpdateLicense
            onUpdateLicense={values => this.handleUpdateLicense(values)}
            onChangeMode={() => this.props.hideModal()}
            license={license}
          />
        )}
      </Modal>
    );
  }
}

export default LicenseDetailModal;
