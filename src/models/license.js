import { router } from 'umi';
import { getFcaLicenseList, createFcaLicense, cloneFcaLicense } from '@/services/license';
import AdminNotification from '../components/Notification';

const notification = new AdminNotification();

const Model = {
  namespace: 'license',
  state: {
    allFcaLicenseList: [],
    totalFcaLicense: 0,
  },
  effects: {
    *getFcaLicenseList({ payload }, { call, put }) {
      const response = yield call(getFcaLicenseList, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return;
      }
      yield put({
        type: 'handleGetFcaLicenseList',
        payload: response.data,
      });
    },
    *createFcaLicense({ payload }, { call, put }) {
      const response = yield call(createFcaLicense, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return;
      }
      notification.success('Success');
      yield put({
        type: 'handleCreateFcaLicense',
        payload: response.data,
      });
    },
    *cloneFcaLicense({ payload }, { call, put }) {
      const response = yield call(cloneFcaLicense, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return;
      }
      notification.success('Success');
      yield put({
        type: 'handleCreateFcaLicense',
        payload: response.data,
      });
    },
  },

  reducers: {
    handleGetFcaLicenseList(state, action) {
      return {
        ...state,
        allFcaLicenseList: action.payload.license,
        totalFcaLicense: action.payload.count,
      };
    },
    handleCreateFcaLicense(state, action) {
      const newLicenses = state.allFcaLicenseList;
      newLicenses.push({ ...action.payload.license, status: 'ACTIVE' });

      console.log('new-licenses', newLicenses);
      return {
        ...state,
        allFcaLicenseList: newLicenses,
        totalFcaLicense: newLicenses.length,
      };
    },
  },
};

export default Model;
