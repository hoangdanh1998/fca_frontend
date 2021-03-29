import { router } from 'umi';
import { adminSignIn } from '@/services/admin';
import { reloadAuthorized } from '@/utils/Authorized';
import { setAuthority, setToken } from '@/utils/authority';
import AdminNotification from '../components/Notification';

const notification = new AdminNotification();

const Model = {
  namespace: 'admin',
  state: {},
  effects: {
    *signIn({ payload }, { call, put }) {
      const response = yield call(adminSignIn, payload);
      console.log('login', response.admin);
      if (response.message === `http error`) {
        notification.fail('Something went wrong. Please try to sign in again.');
      } else {
        yield put({
          type: 'changeSignInStatus',
          payload: response,
        });
        yield setToken(response.token.accessToken);
        yield setAuthority('admin');
        yield reloadAuthorized();
        localStorage.setItem('account', JSON.stringify(response.admin));
        router.push('/fca-management/dashboard');
      }
    },

    *signOut() {
      const removeKeys = ['token', 'authority'];
      removeKeys.forEach(e => localStorage.removeItem(e));
      if (window.location.pathname !== '/admin/signin') {
        router.push('/admin/signin');
        yield true;
      }
      yield false;
    },
  },

  reducers: {},
};

export default Model;
