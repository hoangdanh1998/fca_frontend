import { router } from 'umi';
import {
  sendNewContact,
  updateContact,
  getAllTags,
  adminSignIn,
  getCurrentAdmin,
  queryContacts,
  searchContact,
  getAllContacts,
} from '@/services/admin';
import { reloadAuthorized } from '@/utils/Authorized';
import { setAuthority, setToken } from '@/utils/authority';
import AdminNotification from '../components/Notification';

const notification = new AdminNotification();

const Model = {
  namespace: 'admin',
  state: {
    currentAdmin: {},
    preSignedUrl: null,
    contact: [],
    fullContact: [],
    searchContact: [],
    allContact: [],
    totalContact: 0,
    filteredContactsByFullName: [],
    visibleCreateContact: false,
    resetFields: false,
  },
  effects: {
    *signIn({ payload }, { call, put }) {
      const response = yield call(adminSignIn, payload);
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
        router.push('/fca-management/partner-management');
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

    *sendNewContact({ payload }, { call, put }) {
      const response = yield call(sendNewContact, payload);
      if (response.meta) {
        if (response.meta.status === 'SUCCESS') {
          notification.success(`Create new contact successfully.`);
          yield put({
            type: 'handleVisibleCreateContact',
            payload: false,
          });
          yield put({
            type: 'admin/queryContacts',
            payload: {
              search: '',
              status: 'ACTIVE',
              skip: 1,
              limit: 10,
            },
          });
        } else {
          notification.fail(`Failed to create new contact`);
        }
      }
    },

    *updateContact({ payload }, { call, put }) {
      const response = yield call(updateContact, payload);
      if (response.meta) {
        if (response.meta.status === 'SUCCESS') {
          notification.success(`Update successfully.`);
          yield put({
            type: 'handleVisibleCreateContact',
            payload: false,
          });
          yield put({
            type: 'admin/queryContacts',
            payload: {
              search: '',
              status: 'ACTIVE',
              skip: 1,
              limit: 10,
            },
          });
        } else {
          notification.fail(`Failed to update contact`);
        }
      }
    },
    *getCurrentAdmin(_, { call, put }) {
      const response = yield call(getCurrentAdmin);
      if (response.type && response.type === 'HttpError') {
        notification.fail(response.data.message);
        return;
      }
      yield put({
        type: 'saveCurrentAdmin',
        payload: response,
      });
    },
    *queryContacts(payload, { call, put }) {
      const response = yield call(queryContacts, payload);
      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try to consolidate application again.');
        return;
      }
      yield put({
        type: 'handleGetContact',
        payload: response.data,
      });
    },

    *getAllContacts(_, { call, put }) {
      const response = yield call(getAllContacts);
      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try to consolidate application again.');
        return;
      }
      yield put({
        type: 'handleGetAllContacts',
        payload: response.data.result,
      });
    },

    *getAllTags(_, { call, put }) {
      const response = yield call(getAllTags);

      yield put({
        type: 'getTags',
        payload: response.data.result,
      });
    },

    *searchContact({ payload }, { call, put }) {
      const response = yield call(searchContact, payload);
      if ((response.type && response.type === 'HttpError') || response.meta.status == null) {
        notification.fail('Something went wrong. Please try to consolidate application again.');
        return;
      }
      yield put({
        type: 'handleGetContact',
        payload: response.data.result,
      });
    },
  },

  reducers: {
    resetFields(state, { payload }) {
      return {
        ...state,
        resetFields: payload,
      };
    },

    saveCurrentAdmin(state, action) {
      return { ...state, currentAdmin: action.payload || {} };
    },

    handleGetContact(state, { payload }) {
      return {
        ...state,
        totalContact: payload.total,
        contact: payload.result,
      };
    },

    handleGetFullContact(state, action) {
      return {
        ...state,
        fullContact: action.payload,
      };
    },

    handleGetAllContacts(state, action) {
      return {
        ...state,
        allContact: action.payload,
      };
    },

    handleFilteredContactsByFullName(state, action) {
      return {
        ...state,
        filteredContactsByFullName: action.payload,
      };
    },
  },
};

export default Model;
