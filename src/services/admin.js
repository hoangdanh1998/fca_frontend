import request from '@/utils/request';

export async function adminSignIn(params) {
  return request('/api/admin/auth/login', {
    method: 'POST',
    data: params,
  }).catch(error => error);
}
