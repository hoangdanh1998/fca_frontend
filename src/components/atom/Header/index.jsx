import React from 'react';
import styles from './header.less';
import { PageHeader } from 'antd';
import { Link } from 'umi';

class HeaderLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.headerlayout}>
        {/* <Link className={styles.Link} to={`/fca-management/${this.props.page}`}>
          {this.props.title}
          {this.props.detail}
        </Link> */}
        <PageHeader
          // className="site-page-header"
          onBack={() => null}
          title={this.props.title}
          subTitle="This is a subtitle"
        />
        ,{/* <div className={styles.child}>{this.props.children}</div> */}
      </div>
    );
  }
}

export default HeaderLayout;
