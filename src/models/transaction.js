import { router } from 'umi';
import { createTransaction, getAccount, getTransactionList } from '@/services/transaction';
import AdminNotification from '../components/Notification';
import { message } from 'antd';
import { ORDER_STATUS } from '../../config/constants';

const notification = new AdminNotification();

const Model = {
  namespace: 'transaction',
  state: {
    transaction: {},
    account: {},
    allTransactionList: [],
    totalTransaction: 0,
  },
  effects: {
    *createTransaction({ payload }, { call, put }) {
      const response = yield call(createTransaction, payload);

      if (response.type && response.type === 'HttpError') {
        message.error('Something went wrong. Please try again');
        yield put({
          type: 'handleError',
          payload: 'true',
        });
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

      if (response.type && response.type === 'HttpError') {
        message.error('This phone does not exist');
        return;
      }
      yield put({
        type: 'handleGetAccount',
        payload: response.data,
      });
    },
    *getTransactionList({ payload }, { call, put }) {
      const response = yield call(getTransactionList, payload);

      if (response.type && response.type === 'HttpError') {
        message.error('Something went wrong. Please try again.');
        yield put({
          type: 'handleError',
          payload: 'true',
        });
        return;
      }
      yield put({
        type: 'handleGetTransactionList',
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

    handleCreateTransaction(state, action) {
      return {
        ...state,
        transaction: {},
      };
    },
    handleGetAccount(state, action) {
      return {
        ...state,
        account: action.payload.value,
      };
    },
    handleGetTransactionList(state, action) {
      return {
        ...state,
        allTransactionList: action.payload.transactions,
        totalTransaction: action.payload.count,
      };
    },
  },
};

export default Model;
