import getHeaders from '../../../libs/utils/getHeaders';
import axiosInstance from '../../config';

export default async function getNetworkingDevicesServices(accessToken, apiPath) {
  const headers = getHeaders(accessToken);
  try {
    // const path = page ? `/admin/networking-assets/?page=${page}` : '/admin/networking-assets/';
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

export async function AddNetworkingDeviceService(accessToken, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post('/admin/networking-assets/', formData, { headers });
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

export async function EditNetworkingDeviceService(accessToken, id, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/networking-assets/${id}/`, formData, { headers });
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

export async function DeleteNetworkingDeviceService(accessToken, id) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/networking-assets/${id}/`, { headers });
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
