import { router } from 'umi';
import {
  getFcaLicenseList,
  createFcaLicense,
  cloneFcaLicense,
  updateFcaLicenseStatus,
} from '@/services/license';
import { message } from 'antd';
import moment from 'moment';
import AdminNotification from '../components/Notification';

const notification = new AdminNotification();

const Model = {
  namespace: 'license',
  state: {
    allFcaLicenseList: [],
    totalFcaLicense: 0,
    createdLicense: {},
    isError: false,
  },
  effects: {
    *getFcaLicenseList({ payload }, { call, put }) {
      const response = yield call(getFcaLicenseList, payload);

      if (response.type && response.type === 'HttpError') {
        message.error('Something went wrong. Please try again.');
        yield put({
          type: 'handleError',
          payload: 'true',
        });
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
        message.error('Something went wrong. Please try again.');
        return;
      }
      message.success('Success!');
      yield put({
        type: 'handleCreateFcaLicense',
        payload: response.data,
      });
    },
    *cloneFcaLicense({ payload }, { call, put }) {
      const response = yield call(cloneFcaLicense, payload);

      if (response.type && response.type === 'HttpError') {
        message.error('Something went wrong. Please try again.');
        return;
      }
      message.success('Success!');
      yield put({
        type: 'handleCreateFcaLicense',
        payload: response.data,
      });
    },
    *updateFcaLicenseStatus({ payload }, { call, put }) {
      const response = yield call(updateFcaLicenseStatus, payload);

      if (response.type && response.type === 'HttpError') {
        message.error('Something went wrong. Please try again.');
        return;
      }
      message.success('Success!');
      yield put({
        type: 'handleUpdateFcaLicenseStatus',
        payload: response.data,
      });
    },
  },

  reducers: {
    handleError(state, action) {
      return {
        ...state,
        isError: true,
      };
    },
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

      return {
        ...state,
        allFcaLicenseList: [...newLicenses],
        totalFcaLicense: newLicenses.length,
        createdLicense: action.payload.license,
      };
    },
    handleUpdateFcaLicenseStatus(state, action) {
      const newLicenses = state.allFcaLicenseList.map(license => {
        if (license.id === action.payload.license.id) {
          license.status = action.payload.license.status;
          license.endDate = moment().toString();
        }
        return license;
      });

      return {
        ...state,
        allFcaLicenseList: newLicenses,
      };
    },
  },
};

export default Model;
