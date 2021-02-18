import { router } from 'umi';
import { getOrderList } from '@/services/order';
import AdminNotification from '../components/Notification';

const notification = new AdminNotification();

const Model = {
  namespace: 'order',
  state: {
    allOrderList: [],
    totalOrder: 0,
  },
  effects: {
    *getOrderList({ payload }, { call, put }) {
      console.log('getOrderList');
      const response = yield call(getOrderList, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return;
      }
      yield put({
        type: 'handleGetOrderList',
        payload: response.data,
      });
    },
  },

  reducers: {
    handleGetOrderList(state, action) {
      return {
        ...state,
        allOrderList: action.payload.orders,
        totalOrder: action.payload.count,
      };
    },
  },
};

export default Model;
