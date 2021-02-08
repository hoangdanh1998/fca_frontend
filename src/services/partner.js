import request from '@/utils/request';

export async function getPartnerList(params) {
  return request(`/api/partner?name=${params.name}&status=${params.status}`, {
    method: 'GET',
  });
}
