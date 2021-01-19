import React from 'react';
import styles from './header.less';
import { Link } from 'umi';

class HeaderLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.headerlayout}>
        <Link className={styles.Link} to={`/administration/${this.props.page}`}>
          {this.props.title}
          {this.props.detail}
        </Link>

        <div className={styles.child}>{this.props.children}</div>
      </div>
    );
  }
}

export default HeaderLayout;
