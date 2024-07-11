import axiosInstance from '../config';

export default async function forgotPasswordService(email, captcha) {
  try {
    const { data } = await axiosInstance.post('/auth/password/reset/', { email, captcha });
    return { data };
  } catch (error) {
    console.log('file: forgotPassword.js ~ line 8 ~ forgotPasswordService ~ error', error);
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
