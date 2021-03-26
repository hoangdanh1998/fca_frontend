import request from '@/utils/request';
import { PARTNER_STATUS } from '../../config/constants';

export async function getOrderStatisticsByPartner(params) {
  return request(`/api/partner/${params.id}/report`, {
    method: 'POST',
    data: {
      fromDate: params.fromDate,
      toDate: params.toDate,
    },
  });
}

export async function filterPartner(params) {
  return request(`/api/partner?search=${params.search}&status=${PARTNER_STATUS.APPROVED}`, {
    method: 'GET',
  });
}

export async function getPartners(params) {
  return request(`/api/partner?status=${params.status}`, {
    method: 'GET',
  });
}
