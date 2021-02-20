import { router } from 'umi';
import { getPartnerList, updatePartnerStatus } from '@/services/partner';
import AdminNotification from '../components/Notification';

const notification = new AdminNotification();

const Model = {
  namespace: 'partner',
  state: {
    allPartnerList: [],
    totalPartner: 0,
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

    *updatePartnerStatus({ payload }, { call, put }) {
      const response = yield call(updatePartnerStatus, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return;
      }
      yield put({
        type: 'handleUpdatePartnerStatus',
        payload: payload,
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

    handleUpdatePartnerStatus(state, action) {
      const updatedPartnerList = Array.from(state.allPartnerList, partner => {
        if (partner.id == action.payload.id) {
          partner.status = action.payload.status;
        }
        return partner;
      });
      return {
        ...state,
        allPartnerList: updatedPartnerList,
      };
    },
  },
};

export default Model;
