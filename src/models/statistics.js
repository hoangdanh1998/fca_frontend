import { router } from 'umi';
import {
  getOrderStatisticsByPartner,
  filterPartner,
  getReportStatistics,
} from '@/services/statistics';
import AdminNotification from '../components/Notification';
import { message } from 'antd';
import { SPARTNER } from '../../config/seedingData';
import { ORDER_STATUS } from '../../config/constants';

const notification = new AdminNotification();

const Model = {
  namespace: 'statistics',
  state: {
    filteredPartnerList: [],
    isError: false,

    partnerStatistics: {},
    openingPartnerList: [],
    openingNormalPartnerList: [],
    openingAlmostExpiredPartnerList: [],
    closingPartnerList: [],
    closingNormalPartnerList: [],
    closingExpiredPartnerList: [],

    orderStatistics: {},
    rejectionOrderDetailsList: [],
    cancellationOrderDetailsList: [],
  },
  effects: {
    *getReportStatistics({ payload }, { call, put }) {
      const response = yield call(getReportStatistics, payload);

      if (response.type && response.type === 'HttpError') {
        // notification.fail('Something went wrong. Please try again.');
        message.error('Something went wrong. Please try again.');
        yield put({
          type: 'handleError',
          payload: 'true',
        });
        return;
      }
      yield put({
        type: 'handleGetReportStatistics',
        payload: response.data,
      });
    },
    *getOrderStatisticsByPartner({ payload }, { call, put }) {
      const response = yield call(getOrderStatisticsByPartner, payload);

      if (response.type && response.type === 'HttpError') {
        // notification.fail('Something went wrong. Please try again.');
        message.error('Something went wrong. Please try again.');
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
    handleGetReportStatistics(state, action) {
      const data = action.payload;
      console.log('handle-report', data);
      //================================================================PARTNER================================================================
      const partner = data.partner;
      const partnerStatistics = {
        total: partner.total,
        opening: {
          color: '#82B366',
          total: partner.opening.total,
          normal: {
            total: partner.opening.normal.total,
            values: partner.opening.normal.values,
          },
          almostExpired: {
            total: partner.opening.almostExpired.total,
            values: partner.opening.almostExpired.values,
          },
        },
        closing: {
          color: '#B85450',
          total: partner.closing.total,
          normal: {
            total: partner.closing.normal.total,
            values: partner.closing.normal.values,
          },
          expired: {
            total: partner.closing.expired.total,
            values: partner.closing.expired.values,
          },
        },
      };
      const openingNormalPartnerList =
        partner.opening.normal.values.length > 0 ? partner.opening.normal.values : [];
      const openingAlmostExpiredPartnerList =
        partner.opening.almostExpired.values.length > 0 ? partner.opening.almostExpired.values : [];
      const openingPartnerList = [...openingAlmostExpiredPartnerList, ...openingNormalPartnerList];

      const closingNormalPartnerList =
        partner.closing.normal.values.length > 0 ? partner.closing.normal.values : [];
      const closingExpiredPartnerList =
        partner.closing.expired.values.length > 0 ? partner.closing.expired.values : [];
      const closingPartnerList = [...closingExpiredPartnerList, ...closingNormalPartnerList];
      //================================================================ORDER================================================================
      const order = data.order;
      const orderStatistics = {
        total: order.total,
        details: [
          {
            label: 'Closure',
            total: order.closure.total,
            color: '#82B366',
          },
          {
            label: 'Rejection',
            total: order.reject.total,
            color: '#B85450',
          },
          {
            label: 'Cancellation',
            total: order.cancel.total,
            color: 'whitesmoke',
          },
        ],
      };
      const rejectionOrderDetailsList = [];
      if (order.reject.values.length > 0) {
        order.reject.values.forEach(o => {
          const index = rejectionOrderDetailsList.findIndex(r => r.partnerId === o.partner.id);
          if (index >= 0) {
            rejectionOrderDetailsList[index].quantity += 1;
          } else {
            rejectionOrderDetailsList.push({
              partnerId: o.partner.id,
              partnerName: o.partner.name,
              quantity: 1,
            });
          }
        });
      }
      const cancellationOrderDetailsList =
        order.cancel.values.length > 0
          ? order.cancel.values.map(o => {
              return {
                customerPhone: o.customer.phone,
                partnerName: o.partner.name,
                requestBy: o.transaction.find(t => t.toStatus === ORDER_STATUS.CANCELLATION)
                  .requestBy,
                reason: o.transaction.find(t => t.toStatus === ORDER_STATUS.CANCELLATION)
                  .description,
              };
            })
          : [];
      return {
        ...state,
        isError: false,
        partnerStatistics: partnerStatistics,
        openingPartnerList: openingPartnerList,
        openingNormalPartnerList: openingNormalPartnerList,
        openingAlmostExpiredPartnerList: openingAlmostExpiredPartnerList,
        closingPartnerList: closingPartnerList,
        closingNormalPartnerList: closingNormalPartnerList,
        closingExpiredPartnerList: closingExpiredPartnerList,

        orderStatistics: orderStatistics,
        rejectionOrderDetailsList: rejectionOrderDetailsList,
        cancellationOrderDetailsList: cancellationOrderDetailsList,
      };
    },
  },
};

export default Model;
