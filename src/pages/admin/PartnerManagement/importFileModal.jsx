import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Form, Modal, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import fileTemplate from '../../../../public/Template/ListContact.xlsx';
import styles from './index.less';

const { Dragger } = Upload;

@connect(({ admin }) => ({
  admin,
}))
class ContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
    };
  }

  formRef = React.createRef();

  handleCancel = () => {
    // const { form } = this.props;
    this.props.cancel();
    this.formRef.current.resetFields();
  };

  handleSubmit = values => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/sendFilexlsx',
      payload: values,
    });

    this.formRef.current.resetFields();
    this.props.cancel();
    // });
  };

  changeCheckDisable = key => {
    this.setState({
      isDisabled: key,
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && [e.file];
  };

  render() {
    const { isLoadingUploadFile } = this.props;
    const props = {
      name: 'fileExcel',
      multiple: false,
      onChange: info => {
        const { status } = info.file;
        if (status === 'done') {
          this.changeCheckDisable(false);
          // message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`Error upload ${info.file.name} .`);
        }
      },
    };
    return (
      <>
        <Modal
          closable={false}
          visible={this.props.modalAddVisible}
          footer={null}
          className={styles.adminModal}
          width="auto"
          centered
          wrapClassName="import-file-modal"
          closeIcon={<img src="/Button_close_popup.svgfileList" alt="Close icon" />}
        >
          <div>
            <p className={styles.adminModalTitle} />
            <Form
              layout="inline"
              colon={false}
              className={styles.adminFormInModal}
              ref={this.formRef}
              onFinish={this.handleSubmit}
            >
              {/* <Row gutter={16}> */}
              <Form.Item
                name="file"
                valuePropName="fileList"
                getValueFromEvent={this.normFile}
                style={{ width: '100%' }}
                // noStyle
              >
                <Dragger
                  {...props}
                  accept=".xlsx"
                  multiple={false}
                  onDownload={this.hanldeDownload}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file .xlsx to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company
                    data or other band files
                  </p>
                </Dragger>
              </Form.Item>

              <a href={fileTemplate} download="ListContact.xlsx">
                Download File Template Here
              </a>
              {/* </Row> */}
              <Form.Item className={styles.adminFormButtonActive}>
                <Button className={styles.adminFormButton} onClick={this.handleCancel}>
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  className={`${styles.adminFormButton} ${styles.adminFormSubmitButton}`}
                  disabled={this.state.isDisabled}
                  loading={isLoadingUploadFile}
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </>
    );
  }
}

export default ContactModal;
