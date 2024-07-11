import getHeaders from '../../libs/utils/getHeaders';
import axiosInstance from '../config';

export async function getServices(accessToken, apiPath) {
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

export default async function getOrdersService(
  accessToken,
  page,
  departmentId,
  status,
  startDate,
  endDate,
) {
  const headers = getHeaders(accessToken);
  try {
    const path = page ? `/procurement/orders/?page=${page}` : `/procurement/orders/?department=${departmentId || ''}&status=${status || ''}&start_date=${startDate || ''}&end_date=${endDate || ''}`;
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

export async function updateOrderStatusService(accessToken, orderId, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/procurement/orders/${orderId}/update/status/`, formData, { headers });
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
export async function generatePIService(accessToken, orderId, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/procurement/orders/${orderId}/generate/pi/`, formData, { headers });
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

export async function uploadDocumentService(accessToken, orderId, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/procurement/orders/${orderId}/history/`, formData, { headers });
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

export async function patchMultiVendorsService(accessToken, orderId, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/procurement/orders/${orderId}/history/`, formData, { headers });
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

export async function getOrderStatusService(headers) {
  try {
    const data = await axiosInstance(`/procurement/order/status/`, { headers });
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
