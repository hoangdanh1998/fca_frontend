import { router } from 'umi';
import { getOrderList, cancelOrder, closeOrder } from '@/services/order';
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

    *cancelOrder({ payload }, { call, put }) {
      const response = yield call(cancelOrder, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return 'fail';
      }
      yield put({
        type: 'handleChangeOrderStatus',
        payload: payload,
      });
    },

    *closeOrder({ payload }, { call, put }) {
      const response = yield call(closeOrder, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return 'fail';
      }
      yield put({
        type: 'handleChangeOrderStatus',
        payload: payload,
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
    handleChangeOrderStatus(state, action) {
      const updatedOrderList = Array.from(state.allOrderList, order => {
        if (order.id == action.payload.id) {
          order.status = action.payload.status;
        }
        return order;
      });
      return {
        ...state,
        allOrderList: updatedOrderList,
      };
    },
  },
};

export default Model;
