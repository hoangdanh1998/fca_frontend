import request from '@/utils/request';

export async function getPartnerList(params) {
  return request(
    `/api/partner?skip=${params.skip}&limit=${params.limit}&search=${params.search}&status=${params.status}`,
    {
      method: 'GET',
    },
  );
}

export async function getPartner(params) {
  return request(`/api/partner/${params.id}`, {
    method: 'GET',
  });
}

export async function getOrderList(params) {
  return request(`/api/order?partner=${params.id}`, {
    method: 'GET',
  });
}

export async function updatePartnerStatus(params) {
  return request(`/api/partner/${params.id}/status`, {
    method: 'PUT',
    data: { status: params.status },
  }).catch(error => error);
}

export async function createPartnerLicense(params) {
  return request(`/api/partner/${params.partnerId}/partner-license`, {
    method: 'POST',
    data: params,
  }).catch(error => error);
}

export async function handleOpenCloseStore(params) {
  return request(`/api/partner/${params.id}/opening`, {
    method: 'PUT',
    data: {
      isOpen: params.isOpen,
    },
  }).catch(error => error);
}
