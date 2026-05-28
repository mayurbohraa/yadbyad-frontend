// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

// export const baseURL = 'http://13.126.88.92:9000/api/v1';
export const baseURL = 'http://localhost:9000/api/v1';


export function getHeaders() {
  return {
    Authorization: `Bearer ${localStorage.getItem('token_status')}`,
    'Content-Type': 'application/json',
  };
}

// we need to pass the baseURL as an object
const Axiosinstance = axios.create({
  baseURL,
  headers: getHeaders(),
  validateStatus: (status) => status >= 200 && status < 400,
});

export default Axiosinstance;
