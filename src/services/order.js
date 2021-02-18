import request from '@/utils/request';

export async function getOrderList(params) {
  return request(
    `/api/order?createdDate=${params.createdDate}&status=${params.status}&phone=${params.phone}`,
    {
      method: 'GET',
    },
  );
}
