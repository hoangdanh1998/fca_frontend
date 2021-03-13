import request from '@/utils/request';

export async function getOrderList(params) {
  return request(
    `/api/order?skip=${params.skip}&limit=${params.limit}&createdDate=${params.createdDate}&status=${params.status}&customerPhone=${params.phone}`,
    {
      method: 'GET',
    },
  );
}

export async function getOrder(params) {
  return request(`/api/order/${params.id}`, {
    method: 'GET',
  });
}

export async function cancelOrder(params) {
  return request(`/api/order/${params.id}/status`, {
    method: 'PUT',
    data: { status: params.status, description: params.description },
  }).catch(error => error);
}

export async function closeOrder(params) {
  return request(`/api/order/${params.id}/status`, {
    method: 'PUT',
    data: { status: params.status },
  }).catch(error => error);
}
