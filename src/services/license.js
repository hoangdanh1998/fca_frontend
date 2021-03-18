import request from '@/utils/request';

export async function getFcaLicenseList(params) {
  return request(`/api/fca-license?skip=${params.skip}&limit=${params.limit}`, {
    method: 'GET',
  });
}

export async function createFcaLicense(params) {
  return request(`/api/fca-license`, {
    method: 'POST',
    data: {
      name: params.name,
      duration: params.duration,
      price: params.price,
      description: params.description,
      startDate: params.startDate,
    },
  });
}
