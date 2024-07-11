import getHeaders from '../../libs/utils/getHeaders';
import axiosInstance from '../config';

export default async function getdepartmentaddressService(
  accesstoken,
  slug,
  page,
  hodDepartmentType,
) {
  const headers = getHeaders(accesstoken);
  try {
    const path = `/departments/${slug}/addresses/?page=${page || 1}&department=${(hodDepartmentType && hodDepartmentType.id) || ''}`;
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

export async function getAdminDepartmentServices(
  accessToken,
  page,
  hodDepartmentType,
) {
  const headers = getHeaders(accessToken);
  try {
    const path = `/admin/department/addresses/?page=${page || 1}&department=${(hodDepartmentType && hodDepartmentType.id) || ''}`;
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

export async function getAdminDepartmentAddressService(
  accessToken,
  id,
) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.get(`/admin/department/addresses/${id}/`, { headers });
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

export async function addAddress(headers, formData) {
  try {
    const data = await axiosInstance.post('admin/department/addresses/', formData, { headers });
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

export async function editAddress(headers,id,formData) {
  try {
    const data = await axiosInstance.patch(`admin/department/addresses/${id}/`, formData, { headers });
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

export async function deleteAddressByAdmin(headers,id) {
  try {
    const data = await axiosInstance.delete(`admin/department/addresses/${id}/`, { headers });
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
