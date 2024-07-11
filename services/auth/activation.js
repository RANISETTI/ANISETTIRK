import camelcaseKeys from 'camelcase-keys';
import axiosInstance from '../config';

export async function activateAccountService(token) {
  try {
    const data = await axiosInstance.post(`/auth/activate/${token}/`);
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
