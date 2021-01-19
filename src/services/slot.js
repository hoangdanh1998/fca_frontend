import request from '@/utils/request';

export async function fetchCreatedSlots(params) {
  return request(`/api/admin/pic/${params.picId}/slots`, {
    method: 'GET',
  });
}

export async function createSlots(params) {
  return request(`/api/admin/pic/${params.picId}/slots`, {
    method: 'POST',
    data: params.slots,
  });
}

export async function disableSlots(params) {
  return request(`/api/admin/slot/disable-slot-by-date-type`, {
    method: 'PUT',
    params,
  });
}

export async function confirmBooking(params) {
  return request(`/api/admin/booking/confirm-booking`, {
    method: 'POST',
    data: params,
  });
}
