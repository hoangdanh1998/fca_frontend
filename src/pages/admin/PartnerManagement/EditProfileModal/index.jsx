import React from 'react';
import { connect } from 'dva';
import { Modal, Space, Button, Form, Input, Menu } from 'antd';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class EditProfileModal extends React.Component {
  state = {
    address: {
      lat: 10.8537557,
      lng: 106.6283449,
      description: 'Công viên phần mềm Quang Trung',
    },
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
  };
  onSubmit = values => {
    console.log('values', values);
    console.log('address', this.state.address);
  };
  render() {
    const { partner, visible } = this.props;
    return (
      <Modal visible={visible} style={{ textAlign: 'center' }} title="EDIT PROFILE" footer={null}>
        <Form onFinish={this.onSubmit} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item rules={[{ required: true }]} name="storeName" label="Name">
            <Input defaultValue="Cafe GO CAGO" placeholder="Enter name" value="Cafe Go CAGO" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="phone" label="Phone">
            <Input placeholder="Enter phone" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="address" label="Address">
            <PlacesAutocomplete value={this.state.address} onSelect={this.handleSelect}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <Input
                    defaultValue={this.state.address.description}
                    {...getInputProps({
                      placeholder: 'Enter address',
                      className: 'location-search-input',
                    })}
                  />
                  <Menu className="autocomplete-dropdown-container" style={{ height: 'auto' }}>
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
              <Button htmlType="button">Cancel</Button>
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
