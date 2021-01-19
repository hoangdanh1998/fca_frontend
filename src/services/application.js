import request from '@/utils/request';
import noErrorHandlerRequest from '@/utils/no-error-handler-request';

export async function applicationLogin(params) {
  return noErrorHandlerRequest('/api/talent/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function updatePassword(params) {
  return noErrorHandlerRequest('/api/talent/change-password', {
    method: 'PUT',
    data: params,
  });
}

export async function applicationSetPassword(params) {
  return request('/api/talent/store-password', {
    method: 'POST',
    data: params,
  }).catch(error => error);
}

export async function applicationRequestRecover(params) {
  return request('/api/talent/auth/forgot-password', {
    method: 'POST',
    data: params,
  }).catch(error => error);
}

export async function applicationResetPassword(params) {
  return request('/api/talent/auth/reset-password', {
    method: 'POST',
    data: params,
  }).catch(error => error);
}

export async function queryApplications() {
  return request('/api/talent/application');
}

export async function queryEmailByToken(token) {
  return request(`/api/talent/${token}/email`);
}

export async function queryEmailForgotByToken(token) {
  return request(`/api/talent/auth/forgot/${token}/email`);
}

export async function queryApplicationProgressbar(payload) {
  return request(`/api/talent/application/booking/${payload.applicationCode}`);
}

export async function queryGetAvailableSlot(payload) {
  return request(`/api/talent/application/slot/${payload.applicationCode}`);
}

export async function queryApplicationBooking(payload) {
  return request.post('/api/talent/application/booking', {
    data: payload,
  });
}

export async function queryApplicationCantBooking(payload) {
  return request.post('/api/talent/application/noBooking', {
    data: payload,
  });
}

export async function getCVLink(param) {
  return request(`/api/tool/file/link?key=${param}`);
}

export async function queryArticlesGroupedByCategory() {
  return request('/api/talent/article');
}
