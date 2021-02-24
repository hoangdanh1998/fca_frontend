import React from 'react';
import { connect } from 'dva';
import { Modal, Space, Button, Form, Input, Menu, AutoComplete } from 'antd';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class EditProfileModal extends React.Component {
  state = {
    address: this.props.partner.id ? this.props.partner.address : {},
  };

  handleSelect = async address => {
    const results = await geocodeByAddress(address);
    const description = results[0].formatted_address;
    const latLng = await getLatLng(results[0]);
    this.setState({
      address: {
        lat: latLng.lat,
        lng: latLng.lng,
        description: description,
      },
    });
    let input = document.getElementById('address-input');
    input.blur();
    input.value = description;
  };
  onSubmit = values => {
    console.log('values', values);
    console.log('address', this.state.address);
    console.log('addressDescription', this.state.addressDescription);
  };
  render() {
    const { partner, visible, hideModal } = this.props;
    return (
      <Modal
        visible={visible}
        style={{ textAlign: 'center' }}
        title="EDIT PROFILE"
        footer={null}
        onCancel={hideModal}
      >
        <Form
          onFinish={this.onSubmit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{
            name: partner.id ? partner.name : '',
            phone: partner.id ? partner.phone : '',
            address: partner.id ? partner.address.description : '',
          }}
        >
          <Form.Item rules={[{ required: true }]} name="name" label="Name">
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="phone" label="Phone">
            <Input placeholder="Enter phone" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="address" label="Address">
            <PlacesAutocomplete onSelect={this.handleSelect}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <Input
                    id="address-input"
                    allowClear
                    {...getInputProps({
                      placeholder: 'Enter address',
                      className: 'location-search-input',
                    })}
                  />
                  <Menu
                    className="autocomplete-dropdown-container"
                    style={{ height: 'auto' }}
                    onSelect={this.handleSelect}
                  >
                    {loading && <Menu.Item>Loading...</Menu.Item>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      const style = suggestion.active
                        ? {
                            backgroundColor: '#ffffff',
                            borderColor: '#1890ff',
                            borderStyle: 'solid',
                            cursor: 'pointer',
                            height: 'auto',
                          }
                        : { backgroundColor: '#ffffff', cursor: 'pointer', height: 'auto' };
                      return (
                        <Menu.Item
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </Menu.Item>
                      );
                    })}
                  </Menu>
                </div>
              )}
            </PlacesAutocomplete>
          </Form.Item>
          <Space direction="horizontal">
            <Form.Item>
              <Button htmlType="button" onClick={hideModal}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                OK
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    );
  }
}

export default EditProfileModal;
