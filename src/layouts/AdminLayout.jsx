import React from 'react';
import { connect } from 'dva';
import { router } from 'umi';
import styles from './AdminLayout.less';

const AdminLayout = props => {
  const { pathname } = window.location;
  const authority = localStorage.getItem('authority');
  if (pathname !== '/admin/signin' && (!authority || !authority.length)) {
    router.push('/admin/signin');
  } else if (window.location.pathname === '/admin') {
    const authorityJson = JSON.parse(authority);
    if (authorityJson && authorityJson.length && authorityJson[0] === 'admin') {
      router.push('/fca-management/dashboard');
    } else if (authorityJson && authorityJson.length && authorityJson[0] === 'application') {
      router.push('/application/dashboard');
    } else {
      router.push('/application/dashboard');
    }
  }

  const { children } = props;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default connect(({ settings }) => ({ ...settings }))(AdminLayout);
