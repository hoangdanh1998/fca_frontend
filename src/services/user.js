import request from '@/utils/request';

export async function queryCurrent() {
  return request('/api/application/auth/me');
}

export async function queryNotices() {
  return request('/api/notices');
}
