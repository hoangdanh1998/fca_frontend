import request from '@/utils/request';

export async function getFcaLicenseList(params) {
  return request(
    `/api/fca-license?skip=${params.skip}&limit=${params.limit}&search=${params.search}&fromPrice=${params.fromPrice}&toPrice=${params.toPrice}&fromDuration=${params.fromDuration}&toDuration=${params.toDuration}`,
    {
      method: 'GET',
    },
  );
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

export async function cloneFcaLicense(params) {
  return request(`/api/fca-license`, {
    method: 'POST',
    data: {
      basedLicenseId: params.licenseId,
      name: params.name,
      duration: params.duration,
      price: params.price,
      description: params.description,
      startDate: params.startDate,
    },
  });
}

export async function updateFcaLicenseStatus(params) {
  return request(`/api/fca-license/${params.id}`, {
    method: 'PUT',
    data: {
      id: params.id,
      status: params.status,
    },
  });
}
