import { router } from 'umi';
import { getOrderStatisticsByPartner, filterPartner } from '@/services/statistics';
import AdminNotification from '../components/Notification';

const notification = new AdminNotification();

const Model = {
  namespace: 'statistics',
  state: {
    orderStatisticOfOnePartner: {},
    filteredPartnerList: [],
  },
  effects: {
    *getOrderStatisticsByPartner({ payload }, { call, put }) {
      const response = yield call(getOrderStatisticsByPartner, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return;
      }
      yield put({
        type: 'handleGetOrderStatisticsByPartner',
        payload: response.data,
      });
    },
    *filterPartner({ payload }, { call, put }) {
      const response = yield call(filterPartner, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        return;
      }
      yield put({
        type: 'handleFilterPartner',
        payload: response.data,
      });
    },
  },

  reducers: {
    handleGetOrderStatisticsByPartner(state, action) {
      const convertedData = [];
      const cancelledReasonList = [];
      var orderCounter = 0;
      if (action.payload.report.orders.CLOSURE) {
        convertedData.push({
          id: 'Reception',
          label: 'Reception',
          value: action.payload.report.orders.CLOSURE.count,
          color: '#b3e2cd',
        });
        orderCounter += action.payload.report.orders.CLOSURE.count;
      }
      if (action.payload.report.orders.REJECTION) {
        convertedData.push({
          id: 'Rejection',
          label: 'Rejection',
          value: action.payload.report.orders.REJECTION.count,
          color: '#F8CECC',
        });
        orderCounter += action.payload.report.orders.REJECTION.count;
      }
      if (action.payload.report.orders.CANCELLATION) {
        convertedData.push({
          id: 'Cancellation',
          label: 'Cancellation',
          value: action.payload.report.orders.CANCELLATION.count,
          color: '#dcd6d6',
        });
        orderCounter += action.payload.report.orders.CANCELLATION.count;
        if (action.payload.report.orders.CANCELLATION.count > 0) {
          action.payload.report.orders.CANCELLATION.orders.forEach(order => {
            const cancelledReason = order.transaction[order.transaction.length - 1].description;
            if (
              cancelledReasonList.find(reason => {
                reason.title == cancelledReason;
              })
            ) {
              cancelledReasonList.find(reason => {
                reason.title == cancelledReason;
              }).count += 1;
            } else {
              cancelledReasonList.push({
                title: cancelledReason,
                count: 1,
              });
            }
          });
        }
      }
      const result = {
        orderInChart: convertedData,
        orderTotal: orderCounter,
        cancelledReasonList: cancelledReasonList,
      };
      return {
        ...state,
        orderStatisticOfOnePartner: result,
      };
    },
    handleFilterPartner(state, action) {
      const convertedList = Array.from(action.payload.partners, partner => {
        return {
          label: partner.name,
          value: partner.id,
        };
      });
      return {
        ...state,
        filteredPartnerList: convertedList,
      };
    },
  },
};

export default Model;
