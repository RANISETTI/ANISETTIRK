import getHeaders from '../../libs/utils/getHeaders';
import axiosInstance from '../config';

export async function getJobsService(accessToken,path) {
  const headers = getHeaders(accessToken);

  try {
    // const apiPath = page ? `/admin/jobs/?page=${page}` : '/admin/jobs/';
    const data = await axiosInstance.get(path, { headers });
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

export async function getQualificationsService(headers) {
  try {
    const data = await axiosInstance.get('/admin/qualifications/', { headers });
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

export async function createJobService(formData, headers) {
  try {
    const data = await axiosInstance.post('/admin/jobs/', formData, { headers });
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

export async function editJobService(
  headers,
  jobId,
  formData,
) {
  try {
    const data = await axiosInstance.patch(`/admin/jobs/${jobId}/`, formData, { headers });
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

export async function deleteJobService(accessToken, id) {
  const headers = getHeaders(accessToken);
  const formData = new FormData();
  formData.append('active', false);

  try {
    const data = await axiosInstance.patch(`/admin/jobs/${id}/`, formData, { headers });
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
