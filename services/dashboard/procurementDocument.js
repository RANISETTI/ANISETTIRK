import getHeaders from '../../libs/utils/getHeaders';
import axiosInstance from '../config';

export default async function getProcurementDocumentService(accessToken, apiPath) {
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

export async function createProcurementDocumentService(accessToken, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post('/admin/procurement/documents/', formData, { headers });
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

export async function getProcurementDocumentDetailsService(accessToken, documentId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.get(`/admin/procurement/documents/${documentId}/`, { headers });
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

export async function editgetProcurementDocumentDetailsService(
  accessToken,
  documentId,
  formData,
) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/procurement/documents/${documentId}/`, formData, { headers });
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

export async function deletegetProcurementDocumentDetailsService(accessToken, documentId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/procurement/documents/${documentId}/`, { headers });
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
