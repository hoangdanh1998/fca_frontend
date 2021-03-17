import { router } from 'umi';
import {
  getPartnerList,
  updatePartnerStatus,
  getPartner,
  createPartnerLicense,
} from '@/services/partner';
import { getFcaLicenseList } from '@/services/license';
import AdminNotification from '../components/Notification';

const notification = new AdminNotification();

const Model = {
  namespace: 'partner',
  state: {
    allPartnerList: [],
    totalPartner: 0,
    partner: {},
    allFcaLicenseList: [],
    totalFcaLicense: 0,
  },
  effects: {
    *getPartnerList({ payload }, { call, put }) {
      const response = yield call(getPartnerList, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return;
      }
      yield put({
        type: 'handleGetPartnerList',
        payload: response.data,
      });
    },

    *getPartner({ payload }, { call, put }) {
      const response = yield call(getPartner, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return;
      }
      yield put({
        type: 'handleGetPartner',
        payload: response.data,
      });
    },

    *updatePartnerStatus({ payload }, { call, put }) {
      const response = yield call(updatePartnerStatus, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return;
      }
      notification.success('Success');
      yield put({
        type: 'handleUpdatePartnerStatus',
        payload: response.data,
      });
    },

    *createPartnerLicense({ payload }, { call, put }) {
      const response = yield call(createPartnerLicense, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return;
      }
      notification.success('Success');
      yield put({
        type: 'handleCreatePartnerLicense',
        payload: response.data,
      });
    },

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
    handleGetPartnerList(state, action) {
      return {
        ...state,
        allPartnerList: action.payload.partners,
        totalPartner: action.payload.count,
      };
    },

    handleGetPartner(state, action) {
      return {
        ...state,
        partner: action.payload.partner,
      };
    },

    handleUpdatePartnerStatus(state, action) {
      return { ...state, partner: action.payload.partner };
    },

    handleCreatePartnerLicense(state, action) {
      const newPartner = state.partner.licenses.unshift(action.payload.license);
      return { ...state, partner: newPartner };
    },

    handleGetFcaLicenseList(state, action) {
      const convertedLicenses =
        action.payload.license.length > 0
          ? action.payload.license.map(license => {
              return {
                label: license.name,
                value: license.id,
                price: license.price,
                duration: license.duration,
              };
            })
          : [];
      console.log('reducer', action.payload.license);
      console.log('reverted-reducer', convertedLicenses);
      return {
        ...state,
        allFcaLicenseList: convertedLicenses,
        totalFcaLicense: action.payload.count,
      };
    },
  },
};

export default Model;
