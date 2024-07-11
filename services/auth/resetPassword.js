import axiosInstance from '../config';

export default async function resetPasswordService(
  password,
  confirmPassword,
  uidb64,
  token,
) {
  try {
    const { data } = await axiosInstance.post(`/auth/password/reset/confirm/${uidb64}/${token}/`, { password, confirm_password: confirmPassword });
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
