import { extend } from 'umi-request';
import { router } from 'umi';
import { getToken } from './authority';

const errorHandler = error => {
  const { response = {} } = error;
  const { status } = response;

  if (status === 401) {
    const authority = localStorage.getItem('authority');
    ['token', 'authority'].forEach(e => localStorage.removeItem(e));
    if (!authority) {
      router.push('/');
    } else if (authority.includes('admin')) {
      localStorage.setItem('authority', `["admin"]`);
      router.push('/admin/signin');
    } else {
      localStorage.setItem('authority', `["application"]`);
      router.push('/admin/signin');
    }
  }

  return error;
};

const requestFile = extend({
  errorHandler,
  prefix: BASE_API_URL,
  credentials: 'omit',
});

requestFile.interceptors.request.use((url, options) => {
  const authority = getToken();
  return {
    url,
    options: {
      ...options,
      headers: {
        Authorization: (authority && `Bearer ${authority}`) || undefined,
        'Content-Type': 'multipart/form-data;',
      },
    },
  };
});

export default requestFile;
