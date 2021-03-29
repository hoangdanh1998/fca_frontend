import { router } from 'umi';
import { getOrderList, getOrder, cancelOrder, closeOrder } from '@/services/order';
import AdminNotification from '../components/Notification';
import { message } from 'antd';
import { ORDER_STATUS } from '../../config/constants';

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
        // notification.fail('Something went wrong. Please try again.');
        message.error('Something went wrong. Please try again.');
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
        // notification.fail('Something went wrong. Please try again.');
        message.error('Something went wrong. Please try again.');
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
        // notification.fail('Something went wrong. Please try again.');
        message.error('Something went wrong. Please try again.');
        return 'fail';
      }
      // notification.success('Success');
      message.success('Success!');
      yield put({
        type: 'handleChangeOrderStatus',
        payload: response.data,
      });
    },

    *closeOrder({ payload }, { call, put }) {
      const response = yield call(closeOrder, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        message.error('Something went wrong. Please try again.');
        return 'fail';
      }
      // notification.success('Success');
      message.success('Success!');
      yield put({
        type: 'handleChangeOrderStatus',
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
      return { ...state, order: action.payload.order };
    },
  },
};

export default Model;
