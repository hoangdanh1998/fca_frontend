import request from '@/utils/request';

export async function getOrderList(params) {
  return request(
    `/api/order?createdDate=${params.createdDate}&status=${params.status}&phone=${params.phone}`,
    {
      method: 'GET',
    },
  );
}

export async function cancelOrder(params) {
  return request(`/api/order/${params.id}/status`, {
    method: 'PUT',
    data: { status: params.status },
  }).catch(error => error);
}

export async function closeOrder(params) {
  return request(`/api/order/${params.id}/status`, {
    method: 'PUT',
    data: { status: params.status },
  }).catch(error => error);
}
