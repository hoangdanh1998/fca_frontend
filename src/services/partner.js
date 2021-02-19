import request from '@/utils/request';

export async function getPartnerList(params) {
  return request(
    `/api/partner?skip=${params.skip}&limit=${params.limit}&name=${params.name}&status=${params.status}`,
    {
      method: 'GET',
    },
  );
}

export async function updatePartnerStatus(params) {
  return request(`/api/partner/${params.id}/status`, {
    method: 'PUT',
    data: { status: params.status },
  }).catch(error => error);
}
