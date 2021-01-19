import axios from 'axios';
import { extend } from 'umi-request';
import { router } from 'umi';
import { getToken } from './authority';
import {} from '../../config/api';

// const notification = new AdminNotification();

const errorHandler = error => {
  const { data = {} } = error;
  const { response = {} } = error;
  let { status } = response;
  status = parseInt(status, 10);
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
  } else if (status === 400) {
    const res = { status: 'error', message: 'Invalid fields' };
    return res;
  } else if (status === 409) {
    return {
      status: 'error',
      message: data.message,
    };
  }

  // } else
  //   if (status === 413) { return {status: 413} };
  return error;
};

const request = extend({
  errorHandler,
  prefix: BASE_API_URL,
  credentials: 'omit',
});

request.interceptors.request.use((url, options) => {
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

export default request;

export async function uploadToS3(formData, file) {
  const authority = getToken();
  let result;
  if (file === 'cv') {
    try {
      const res = await axios.post(`${BASE_API_URL}/api/file/upload/cv`, formData, {
        headers: {
          Authorization: (authority && `Bearer ${authority}`) || undefined,
        },
      });
      return res;
    } catch (error) {
      if (error.response.status === 413) {
        result = { status: 'error', message: 'File too large' };
      }
    }
  } else {
    try {
      const response = await axios.post(`${BASE_API_URL}/api/contact/upload`, formData, {
        headers: {
          Authorization: (authority && `Bearer ${authority}`) || undefined,
        },
      });
      result = response;
    } catch (error) {
      if (error.response.status === 413) {
        result = { status: 'error', message: 'File too large' };
      }
      if (error.response.status === 400) {
        result = { status: 'error', message: 'Invalid fields' };
      }
    }
  }
  return result;
}
