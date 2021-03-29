import request from '@/utils/request';

export async function createTransaction(params) {
  return request(`/api/transaction`, {
    method: 'POST',
    data: {
      accountId: params.accountId,
      amount: params.amount,
      description: params.description,
    },
  });
}

export async function getAccount(params) {
  return request(`/api/account?phone=${params.phone}`, {
    method: 'GET',
  });
}
