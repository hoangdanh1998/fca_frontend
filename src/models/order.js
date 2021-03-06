import { router } from 'umi';
import { getOrderList, getOrder, cancelOrder, closeOrder } from '@/services/order';
import AdminNotification from '../components/Notification';

const notification = new AdminNotification();

const Model = {
  namespace: 'order',
  state: {
    allOrderList: [],
    totalOrder: 0,
    order: {},
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

    *getOrder({ payload }, { call, put }) {
      const response = yield call(getOrder, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return;
      }
      yield put({
        type: 'handleGetOrder',
        payload: response.data,
      });
    },

    *cancelOrder({ payload }, { call, put }) {
      const response = yield call(cancelOrder, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return 'fail';
      }
      notification.success('Success');
      yield put({
        type: 'handleChangeOrderStatus',
        // payload: payload,
        payload: response.data,
      });
    },

    *closeOrder({ payload }, { call, put }) {
      const response = yield call(closeOrder, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return 'fail';
      }
      notification.success('Success');
      yield put({
        type: 'handleChangeOrderStatus',
        // payload: payload,
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
    handleGetOrder(state, action) {
      return {
        ...state,
        order: action.payload.order,
      };
    },
    handleChangeOrderStatus(state, action) {
      // const updatedOrderList = Array.from(state.allOrderList, order => {
      //   if (order.id == action.payload.id) {
      //     order.status = action.payload.status;
      //   }
      //   return order;
      // });
      // return {
      //   ...state,
      //   allOrderList: updatedOrderList,
      // };
      return { ...state, order: action.payload.order };
    },
  },
};

export default Model;
