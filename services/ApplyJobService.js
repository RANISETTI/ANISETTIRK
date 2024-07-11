import axiosInstance from './config';

export default async function applyJobService(
  id,
  formData,
) {
  try {
    const data = await axiosInstance.post(`/jobs/${id}/apply/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { data };
  } catch (error) {
    console.log('file: ApplyJobService.js ~ line 21 ~ error', error);
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

export  async function applyTenders(
  formData,
) {
  try {
    const data = await axiosInstance.post(`/create/tender-application/`, formData);
    return { data };
  } catch (error) {
    console.log('file: ApplyJobService.js ~ line 21 ~ error', error);
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
