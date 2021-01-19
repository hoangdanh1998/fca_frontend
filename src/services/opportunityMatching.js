import request from '@/utils/request';

export async function getContactMerge(params) {
  return request(`/api/contact/duplicate?search=${params.search}`);
}
