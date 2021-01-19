import { extend } from 'umi-request';
import { getToken } from './authority';

const errorHandler = error => {
  return error;
};

const noErrorHandlerRequest = extend({
  errorHandler,
  prefix: BASE_API_URL,
  credentials: 'omit',
});

noErrorHandlerRequest.interceptors.request.use((url, options) => {
  const authority = getToken();
  return {
    url,
    options: {
      ...options,
      headers: {
        Authorization: (authority && `Bearer ${authority}`) || undefined,
        'Content-Type': 'application/json',
      },
    },
  };
});

export default noErrorHandlerRequest;
