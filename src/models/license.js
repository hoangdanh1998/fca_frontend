import { router } from 'umi';
import { getFcaLicenseList } from '@/services/license';
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
  },

  reducers: {
    handleGetFcaLicenseList(state, action) {
      return {
        ...state,
        allFcaLicenseList: action.payload.license,
        totalFcaLicense: action.payload.count,
      };
    },
  },
};

export default Model;
