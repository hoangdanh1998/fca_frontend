import request from '@/utils/request';

export async function fetchBookings({ slotType, slotDate }) {
  return request('/api/admin/slot/bookings-by-date-type', {
    method: 'GET',
    params: { slotType, slotDate },
  });
}
