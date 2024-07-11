import camelcaseKeys from 'camelcase-keys';
import axiosInstance from '../config';

export default async function registerService(username, password, captcha) {
  try {
    const data = await axiosInstance.post('/auth/vendor/create', { username, password, captcha });
    return { data };
  } catch (error) {
    const { response: { data, status, statusText } } = error;
    let errors = {};
    if (status === 400 && data && Object.keys(data).length) {
      errors = camelcaseKeys(data, { deep: true });
    } else {
      errors.nonFieldErrors = [statusText, 'Please try later'];
    }
    return { errors };
  }
}
