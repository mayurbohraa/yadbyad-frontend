import toast from 'react-hot-toast';

import axiosInstance, { getHeaders } from './axios';

export async function yadbyadGet(url) {
  const response = await axiosInstance.get(url, { headers: getHeaders() });
  return response.data.data;
}

async function sendRequest(method, url, body, multipart = false) {
  try {
    const response = await axiosInstance.request({
      method,
      url,
      data: body,
      headers: {
        ...getHeaders(),
        // Let Axios/the browser supply the multipart boundary for FormData.
        ...(multipart || body instanceof FormData ? { 'Content-Type': undefined } : {}),
      },
    });
    if (response.data.message) toast.success(response.data.message);
    return response.data.data;
  } catch (error) {
    const serverMessage = error.response?.data?.message;
    const message =
      error.response?.status >= 500
        ? 'The server could not complete your request. Please try again.'
        : (typeof serverMessage === 'string' && serverMessage) ||
          error.message ||
          'Unable to complete the request.';
    toast.error(message);
    return null;
  }
}

export function yadbyadPost(url, body) {
  return sendRequest('post', url, body);
}

export function yadbyadPut(url, body) {
  return sendRequest('put', url, body);
}

export function yadbyadDelete(url, body) {
  return sendRequest('delete', url, body);
}

export function yadbyadMultiPartPost(url, body) {
  return sendRequest('post', url, body, true);
}
