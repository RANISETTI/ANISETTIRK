import axiosInstance from './config';

export default async function contactService(name, email, subject, message, captcha) {
  try {
    const data = await axiosInstance.post('/contact/', {
      name, email, subject, message, captcha,
    });
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
