import axiosInstance from '../config';
import getHeaders from '../../libs/utils/getHeaders';

export default async function changePasswordService(
  accessToken,
  oldPassword,
  password,
  confirmPassword,
) {
  console.log(confirmPassword);
  const headers = getHeaders(accessToken);
  try {
    const { data } = await axiosInstance.post('/auth/password/change/', { old_password: oldPassword, new_password: password, new_password2: confirmPassword }, { headers });
    return { data };
  } catch (error) {
    const { response: { data, status, statusText } } = error;
    let errors = {};
    if (status === 400 && data && Object.keys(data).length) {
      errors = data;
    } else {
      errors.nonFieldErrors = [statusText, 'Please try later'];
    }
    return { errors };
  }
}
