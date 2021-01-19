import React from 'react';
import { Popover, List } from 'antd';

class ActionContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    const listButton = [
      {
        title: 'Change status',
      },
    ];

    return (
      <Popover
        content={
          <List
            itemLayout="horizontal"
            dataSource={listButton}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta title={<a href="#">{item.title}</a>} />
              </List.Item>
            )}
          />
        }
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        {this.props.children}
      </Popover>
    );
  }
}

export default ActionContact;
