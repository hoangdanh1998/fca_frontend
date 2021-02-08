import { router } from 'umi';
import { getPartnerList } from '@/services/partner';
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
      console.log('getPartnerList');
      const response = yield call(getPartnerList, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try to consolidate application again.');
        return;
      }
      console.log('response.data.partners', response.data.partners);
      yield put({
        type: 'handleGetPartnerList',
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
  },
};

export default Model;
