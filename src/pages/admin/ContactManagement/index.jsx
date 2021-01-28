import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import DrawerForm from '@/components/NewContact/contact';
import TableContact from '@/components/TableContact';
import ContactModal from './importFileModal';
import HeaderLayout from '@/components/atom/Header';
import styles from './index.less';
import StatusFilter from '../../../components/atom/StatusFilter/index.jsx';
import InsertButton from '../../../components/atom/InsertButton/index.jsx';

@connect(({ admin, loading }) => ({
  fetchCurrentAdmin: loading.effects['admin/saveCurrentAdmin'],
  visibleContact: admin.visibleCreateContact,
}))
class ContactManagement extends React.Component {
  state = { contactID: '', visibleMergeContact: false };

  showDrawer = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/handleVisibleCreateContact',
      payload: true,
    });
  };

  showDrawerCreate = () => {
    const { dispatch } = this.props;
    this.setState({
      contactID: '',
    });
    dispatch({
      type: 'admin/handleVisibleCreateContact',
      payload: true,
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/handleVisibleCreateContact',
      payload: false,
    });
  };

  showAddModal = () => {
    this.setState({
      modalAddVisible: true,
    });
  };

  showContactID = ID => {
    this.setState({
      contactID: ID,
    });
  };

  handleHandleID = () => {
    this.setState({
      contactID: '',
    });
  };

  mergeContact = () => {
    this.setState({
      visibleMergeContact: true,
    });
  };

  render() {
    const { visibleContact } = this.props;
    return (
      <>
        <div className={styles.wrapHeader}>
          <HeaderLayout page="contact-management" title="Partner Management" />
        </div>
        <div className={styles.applicationManagementContainer}>
          <div className={styles.applicationHeader}>
            <div>
              <StatusFilter filterFor="partner" />
            </div>
            <div className={styles.applicationManagementHeader}>
              {/* <Button
                // style={{ transform: 'translate(6%,-270%)' }}
                style={{ transform: 'translate(6%,-270%)', backgroundColor: '#603a18' }}
                type="primary"
                onClick={this.showDrawerCreate}
              >
                Create
              </Button> */}
              <InsertButton onClick={this.showDrawerCreate} />
            </div>
          </div>
          <ContactModal
            {...this.state}
            cancel={() => this.setState({ modalAddVisible: false })}
            onReload={this.onReloadTable}
          />

          {visibleContact ? (
            <DrawerForm
              cancel={this.handleCancel}
              contactID={this.state.contactID}
              deleteID={this.handleHandleID}
            />
          ) : null}

          <TableContact onShowInfor={this.showDrawer} getContactID={this.showContactID} />
        </div>
      </>
    );
  }
}

export default ContactManagement;
