import toast from 'react-hot-toast';

import axiosInstance, { baseURL, getHeaders } from './axios';

// Get Service

export async function yadbyadGet(url) {
  const response = await axiosInstance.get(url, {
    headers: getHeaders(),
  });
  return response.data.data;
}

// Post Service

export async function yadbyadPost(url, body) {
  console.log('API Service - POST Request:', { url, body });
  try {
    const response = await axiosInstance.post(url, body, {
      headers: getHeaders(),
    });
    toast.success(response.data.message);
    return response.data.data;
  } catch (err) {
    if (err.response) {
      if (err.response?.status === 500) {
        toast.error('Internal Server Error!');
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message, {
          icon: '⚠️',
          style: {
            background: '#ff9900',
            color: '#fff',
          },
        });
      } else {
        toast.error(err.response.data.message, {
          icon: '👎',
          style: {
            background: '#363636',
            color: '#fff',
          },
        });
      }
    } else {
      toast.error(err.message);
    }
    return null;
  }
}

// Put Service

export async function yadbyadPut(url, body) {
  try {
    const response = await axiosInstance.put(url, body, {
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data',
      },
    });
    toast.success(response.data.message);
    return response.data.data;
  } catch (err) {
    if (err.response) {
      if (err.response?.status === 500) {
        toast.error('Internal Server Error!');
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message, {
          icon: '⚠️',
          style: {
            background: '#ff9900',
            color: '#fff',
          },
        });
      } else {
        toast.error(err.response.data.message, {
          icon: '👎',
          style: {
            background: '#363636',
            color: '#fff',
          },
        });
      }
    } else {
      toast.error(err.message);
    }
    return null;
  }
}

// Delete Service

export async function yadbyadDelete(url, body) {
  try {
    const response = await axiosInstance.delete(url, body, {
      headers: getHeaders(),
    });
    toast.success(response.data.message);
    return response.data.data;
  } catch (err) {
    if (err.response) {
      if (err.response?.status === 500) {
        toast.error('Internal Server Error!');
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message, {
          icon: '⚠️',
          style: {
            background: '#ff9900',
            color: '#fff',
          },
        });
      } else {
        toast.error(err.response.data.message, {
          icon: '👎',
          style: {
            background: '#363636',
            color: '#fff',
          },
        });
      }
    } else {
      toast.error(err.message);
    }
    return null;
  }
}

// Multi Part post service

export async function yadbyadMultiPartPost(url, body) {
  try {
    const response = await fetch(baseURL + url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token_status')}`,
      },
      body,
    });
    const data = await response.json();

    toast.success(data.message);
    return data.data;
  } catch (err) {
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      toast.error('Failed to fetch. Please check your internet connection.');
      return null;
    }

    if (err.data) {
      if (err.data.status === 500) {
        toast.error('Internal Server Error!');
      } else if (err.data.status === 400) {
        toast.error(err.data.message, {
          icon: '⚠️',
          style: {
            background: '#ff9900',
            color: '#fff',
          },
        });
      } else {
        toast.error(err.data.message, {
          icon: '👎',
          style: {
            background: '#363636',
            color: '#fff',
          },
        });
      }
    } else {
      toast.error(err.message);
    }
    return null;
  }
}
