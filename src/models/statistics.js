import { router } from 'umi';
import { getOrderStatisticsByPartner, filterPartner, getPartners } from '@/services/statistics';
import AdminNotification from '../components/Notification';
import { SPARTNER } from '../../config/seedingData';

const notification = new AdminNotification();

const Model = {
  namespace: 'statistics',
  state: {
    orderStatisticOfOnePartner: {},
    filteredPartnerList: [],
    isError: false,
    partnerStatistics: {},
  },
  effects: {
    *getPartnerStatistics({ payload }, { call, put }) {
      // const response = yield call(getPartners, payload);

      // if (response.type && response.type === 'HttpError') {
      //   notification.fail('Something went wrong. Please try again.');
      //   yield put({
      //     type: 'handleError',
      //     payload: 'true',
      //   });
      //   return;
      // }
      const response = SPARTNER;
      yield put({
        type: 'handleGetPartnerStatistics',
        payload: response.data,
      });
    },
    *getOrderStatisticsByPartner({ payload }, { call, put }) {
      const response = yield call(getOrderStatisticsByPartner, payload);

      if (response.type && response.type === 'HttpError') {
        notification.fail('Something went wrong. Please try again.');
        yield put({
          type: 'handleError',
          payload: 'true',
        });
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
    handleError(state, action) {
      return {
        ...state,
        isError: true,
      };
    },
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
        isError: false,
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
        isError: false,
        filteredPartnerList: convertedList,
      };
    },
    handleGetPartnerStatistics(state, action) {
      const data = action.payload;
      data.APPROVED = {
        count: data.APPROVED.count,
        details: [
          {
            id: 'Opening',
            label: 'Opening',
            value: data.APPROVED.opening.normal + data.APPROVED.opening.almostExpired,
            // color: '#b3e2cd',
            color: '#3dba6f',
            details: {
              normal: data.APPROVED.opening.normal,
              almostExpired: data.APPROVED.opening.almostExpired,
            },
          },
          {
            id: 'Closing',
            label: 'Closing',
            value: data.APPROVED.closing.normal + data.APPROVED.closing.expired,
            // color: '#dcd6d6',
            // color: '#828282',
            color: '#ff6363',
            details: {
              normal: data.APPROVED.closing.normal,
              expired: data.APPROVED.closing.expired,
            },
          },
        ],
      };
      return {
        ...state,
        isError: false,
        partnerStatistics: data,
      };
    },
  },
};

export default Model;
