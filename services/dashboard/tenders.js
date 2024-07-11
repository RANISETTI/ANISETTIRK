import getHeaders from '../../libs/utils/getHeaders';
import axiosInstance from '../config';

export async function getTendersService(accessToken,apiPath) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.get(apiPath, { headers });
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

export async function getTenderDetailsService(accessToken, id) {
  const headers = getHeaders(accessToken);

  try {
    const data = await axiosInstance.get(`/admin/tenders/${id}`, { headers });
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

export async function createTenderService(
  formData,
  headers,
) {
  try {
    const data = await axiosInstance.post('/admin/tenders/', formData, { headers });
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

export async function editTendersService(
  formData,
  headers,
  tenderId,
) {
  try {
    const data = await axiosInstance.patch(`/admin/tenders/${tenderId}/`, formData, { headers });
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

export async function deleteTenderService(
  accessToken,
  id,
) {
  const headers = getHeaders(accessToken);
  const formData = new FormData();
  formData.append('published', false);
  try {
    const data = await axiosInstance.patch(`/admin/tenders/${id}/`, formData, { headers });
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

export async function getTenderAttachmentService(accessToken, id) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.get(`/admin/tenders/${id}/attachments/`, { headers });
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

export async function createTenderAttachmentService(formData, headers, tenderId) {
  try {
    const data = await axiosInstance.post(`/admin/tenders/${tenderId}/attachments/`, formData, { headers: { ...headers, 'content-type': 'multipart/form-data' } });
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

export async function editTenderAttachmentService(formData, headers, tenderId, attachmentId) {
  try {
    const data = await axiosInstance.patch(`/admin/tenders/${tenderId}/attachments/${attachmentId}/`, formData, { headers: { ...headers, 'content-type': 'multipart/form-data' } });
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

export async function deleteTenderAttachmentService(accessToken, tenderId, id) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/tenders/${tenderId}/attachments/${id}/`, { headers });
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

export async function createTendertype(formData, headers) {
  try {
    const data = await axiosInstance.post(`/admin/tender/types/`, formData, { headers: { ...headers, 'content-type': 'multipart/form-data' } });
    return { data };
  }catch (error) {
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
