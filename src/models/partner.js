import { router } from 'umi';
import {
  getPartnerList,
  updatePartnerStatus,
  getPartner,
  getOrderList,
  createPartnerLicense,
  handleOpenCloseStore,
} from '@/services/partner';
import { getFcaLicenseList } from '@/services/license';
import { message } from 'antd';
import AdminNotification from '../components/Notification';
import { LICENSE_STATUS, ORDER_DONE_STATUS } from '../../config/constants';

const notification = new AdminNotification();

const Model = {
  namespace: 'partner',
  state: {
    allPartnerList: [],
    totalPartner: 0,
    partner: {},
    allFcaLicenseList: [],
    totalFcaLicense: 0,
    createdLicense: {},
    isError: false,
    totalUndoneOrder: 0,
  },
  effects: {
    *getPartnerList({ payload }, { call, put }) {
      const response = yield call(getPartnerList, payload);

      if (response.type && response.type === 'HttpError') {
        message.error('Something went wrong. Please try again.');
        yield put({
          type: 'handleError',
          payload: 'true',
        });
        return;
      }
      yield put({
        type: 'handleGetPartnerList',
        payload: response.data,
      });
    },

    *getPartner({ payload }, { call, put }) {
      const responsePartner = yield call(getPartner, payload);
      const responseOrder = yield call(getOrderList, payload);

      if (
        (responsePartner.type && responsePartner.type === 'HttpError') ||
        (responseOrder.type && responseOrder.type === 'HttpError')
      ) {
        message.error('Something went wrong. Please try again.');
        yield put({
          type: 'handleError',
          payload: 'true',
        });
        return;
      }
      yield put({
        type: 'handleGetPartner',
        payload: responsePartner.data,
      });
      yield put({
        type: 'handleGetOrderList',
        payload: responseOrder.data,
      });
    },

    *updatePartnerStatus({ payload }, { call, put }) {
      const response = yield call(updatePartnerStatus, payload);

      if (response.type && response.type === 'HttpError') {
        message.error('Something went wrong. Please try again.');
        return;
      }
      message.success('Success!');
      yield put({
        type: 'handleUpdatePartnerStatus',
        payload: response.data,
      });
    },

    *createPartnerLicense({ payload }, { call, put }) {
      const response = yield call(createPartnerLicense, payload);

      if (response.type && response.type === 'HttpError') {
        message.error('Something went wrong. Please try again.');
        return;
      }
      message.success('Success!');
      yield put({
        type: 'handleCreatePartnerLicense',
        payload: response.data,
      });
    },

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

    *handleOpenCloseStore({ payload }, { call, put }) {
      const response = yield call(handleOpenCloseStore, payload);

      if (response.type && response.type === 'HttpError') {
        message.error('Something went wrong. Please try again.');
        return;
      }
      message.success('Success!');
      yield put({
        type: 'handleHandleOpenCloseStore',
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

    handleGetPartnerList(state, action) {
      return {
        ...state,
        allPartnerList: action.payload.partners,
        totalPartner: action.payload.count,
      };
    },

    handleGetOrderList(state, action) {
      action.payload.orders.forEach(o => {
        console.log(`include_done_${o.id}`, ORDER_DONE_STATUS.includes(o.status));
      });
      const undoneOrders = action.payload.orders.reduce(
        (sum, { status }) => (ORDER_DONE_STATUS.includes(status) ? sum + 0 : sum + 1),
        0,
      );
      console.log('undoneOrders', undoneOrders);
      return {
        ...state,
        totalUndoneOrder: undoneOrders,
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

    handleHandleOpenCloseStore(state, action) {
      return { ...state, partner: action.payload.partner };
    },

    handleCreatePartnerLicense(state, action) {
      const newPartner = state.partner;
      newPartner.account.balance =
        newPartner.account.balance.valueOf() - action.payload.license.price.valueOf();
      console.log('newPartner', newPartner);
      newPartner.licenses = [...state.partner.licenses, action.payload.license];
      return { ...state, partner: { ...newPartner }, createdLicense: action.payload.license };
    },

    handleGetFcaLicenseList(state, action) {
      const convertedLicenses =
        action.payload.license.length > 0
          ? action.payload.license
              .filter(license => license.status === LICENSE_STATUS.ACTIVE)
              .map(license => {
                return {
                  label: license.name,
                  value: license.id,
                  price: license.price,
                  duration: license.duration,
                };
              })
          : [];
      return {
        ...state,
        allFcaLicenseList: convertedLicenses,
        totalFcaLicense: action.payload.count,
      };
    },
  },
};

export default Model;
