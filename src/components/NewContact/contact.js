import React from 'react';
import { Drawer, Form, Input, Tooltip, Select, Button, Radio, Spin } from 'antd';
import { connect } from 'dva';
import debounce from 'lodash/debounce';
import style from './contact.less';
// import LinkedContact from '../LinkedContact';

const { TextArea } = Input;
const { Option } = Select;

@connect(state => {
  return {
    listContact: state.admin.contact,
    listTags: state.admin.tags,
    isReset: state.admin.resetFields,
    allContact: state.admin.allContact,
    visibleContact: state.admin.visibleCreateContact,
    currentState: state.admin.currentState,
    totalContact: state.admin.totalContact,
    isLoadingUpdateContact: state.loading.effects['admin/updateContact'],
    isLoadingSendNewContact: state.loading.effects['admin/sendNewContact'],
    filteredContactsByFullName: state.admin.filteredContactsByFullName,
    isLoadingFetchFilteredContacts: state.loading.effects['admin/fetchFilteredContactsByFullName'],
  };
})
class ContactForm extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.fetchContactsByFullName = debounce(this.fetchContactsByFullName, 500);
  }

  componentDidMount() {
    const { dispatch, listContact } = this.props;
    const search = listContact.find(contact => contact.id === this.props.contactID);
    dispatch({ type: 'admin/getAllContacts' });
    dispatch({ type: 'admin/getAllTags' });
    dispatch({
      type: 'admin/fetchFilteredContactsByFullName',
      payload: {
        search: search?.referrer?.fullName,
        status: '',
        skip: 1,
        limit: 20,
      },
    });
  }

  handleSubmit = values => {
    const { dispatch } = this.props;
    const newValues = { ...values, status: 'ACTIVE' };
    if (this.props.contactID) {
      const data = { newValues, id: this.props.contactID };
      dispatch({
        type: 'admin/updateContact',
        payload: data,
      });
    } else {
      dispatch({
        type: 'admin/sendNewContact',
        payload: newValues,
      });
    }
  };

  fetchContactsByFullName = textSearch => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/fetchFilteredContactsByFullName',
      payload: {
        search: textSearch,
        status: '',
        skip: 1,
        limit: 20,
      },
    });
  };

  handleCancel = () => {
    this.formRef.current.resetFields();
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/handleVisibleCreateContact',
      payload: false,
    });
  };

  filter = (inputValue, path) => {
    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  };

  render() {
    const {
      listContact,
      listTags,
      isLoadingSendNewContact,
      isLoadingUpdateContact,
      visibleContact,
      filteredContactsByFullName,
      isLoadingFetchFilteredContacts,
    } = this.props;
    const contact = listContact.find(obj => obj.id === this.props.contactID);
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const childrenTags = [];
    for (let i = 0; i < listTags.length; i += 1) {
      childrenTags.push(
        <Option key={listTags[i].id} value={listTags[i].tagName}>
          {listTags[i].tagName}
        </Option>,
      );
    }

    return (
      <>
        <Drawer
          title=" Contact "
          width={720}
          onClose={this.handleCancel}
          visible={visibleContact}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            />
          }
        >
          <Form {...formItemLayout} ref={this.formRef} onFinish={this.handleSubmit}>
            <Form.Item
              label={
                <span>
                  Full Name&nbsp;
                  <Tooltip title="What do you want others to call you?" />
                </span>
              }
              name="name"
              rules={[{ required: true, message: 'Please input your full name' }]}
              initialValue={contact ? contact.fullName : null}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              initialValue={contact ? contact.phone : null}
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!',
                },
                {
                  pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                  message: 'Invalid phone number',
                },
              ]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
              ]}
              initialValue={contact ? contact.email : null}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Other Channel"
              name="otherChannel"
              initialValue={contact ? contact.otherChannel : null}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              initialValue={contact ? contact.gender : 'MALE'}
            >
              <Radio.Group>
                <Radio value="MALE">Male</Radio>
                <Radio value="FEMALE">Female</Radio>
                <Radio value="OTHER">Other</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Tags"
              name="tags"
              rules={[{ type: 'array' }]}
              initialValue={contact ? contact.tags : []}
            >
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Tags Mode"
                onChange={this.handleChangeTags}
              >
                {childrenTags}
              </Select>
            </Form.Item>
            <Form.Item label="Source" name="referrer" initialValue={contact?.referrer?.id}>
              {/* <LinkedContact referrer={contact[0]?.referrer} /> */}
              {this.props.contactID !== '' ? (
                <Select
                  placeholder="Search name"
                  notFoundContent={isLoadingFetchFilteredContacts ? <Spin size="small" /> : null}
                  filterOption={false}
                  onSearch={this.fetchContactsByFullName}
                  showSearch="true"
                  loading={isLoadingFetchFilteredContacts}
                  style={{ width: '100%' }}
                >
                  {filteredContactsByFullName.map(oneContact => (
                    <Option
                      key={oneContact.id}
                      value={oneContact.id}
                    >{`${oneContact.fullName} - ${oneContact.email} - ${oneContact.phone}`}</Option>
                  ))}
                </Select>
              ) : (
                <LinkedContact />
              )}
            </Form.Item>

            <Form.Item
              label="Source Notes"
              name="referrerNotes"
              initialValue={contact ? contact.referrerNotes : null}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="General Notes"
              name="notes"
              initialValue={contact ? contact.notes : null}
            >
              <TextArea />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <div>
                <Button onClick={this.handleCancel} className={style.buttonCancel}>
                  Cancel
                </Button>
                {this.props.contactID ? (
                  <Button type="primary" htmlType="submit" loading={isLoadingUpdateContact}>
                    Update contact
                  </Button>
                ) : (
                  <Button type="primary" htmlType="submit" loading={isLoadingSendNewContact}>
                    Create contact
                  </Button>
                )}
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default ContactForm;
