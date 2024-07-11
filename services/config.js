import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err, 'Error');
    return Promise.reject(err);
  },
);

export default axiosInstance;
