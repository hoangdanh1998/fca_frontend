import request from '@/utils/request';

export async function getFcaLicenseList(params) {
  return request(`/api/fca-license?skip=${params.skip}&limit=${params.limit}`, {
    method: 'GET',
  });
}
