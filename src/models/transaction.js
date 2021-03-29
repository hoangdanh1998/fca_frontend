import { router } from 'umi';
import { createTransaction, getAccount } from '@/services/transaction';
import AdminNotification from '../components/Notification';
import { message } from 'antd';
import { ORDER_STATUS } from '../../config/constants';

const notification = new AdminNotification();

const Model = {
  namespace: 'transaction',
  state: {
    transaction: {},
    account: {},
  },
  effects: {
    *createTransaction({ payload }, { call, put }) {
      const response = yield call(createTransaction, payload);

      if (response.type && response.type === 'HttpError') {
        // notification.fail('Something went wrong. Please try again.');
        message.error('Something went wrong. Please try again');
        return;
      } else {
        message.success('Success!');
      }
      yield put({
        type: 'handleCreateTransaction',
        payload: response.data,
      });
    },
    *getAccount({ payload }, { call, put }) {
      const response = yield call(getAccount, payload);
      console.log('response', response);

      if (response.type && response.type === 'HttpError') {
        message.error('This phone does not exist');
        return;
      }
      yield put({
        type: 'handleGetAccount',
        payload: response.data,
      });
    },
  },

  reducers: {
    handleCreateTransaction(state, action) {
      return {
        ...state,
        transaction: {},
      };
    },
    handleGetAccount(state, action) {
      return {
        ...state,
        account: action.payload.account,
      };
    },
  },
};

export default Model;
