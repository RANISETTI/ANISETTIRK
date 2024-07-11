import axiosInstance from '../config';

export default async function getSecretariatDepartments(searchText, headers) {
  try {
    const data = await axiosInstance(`/admin/departments/?secretariat_departments=true&active=true&search=${searchText || ''}`, { headers });
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
export async function getHODDepartments(searchText, parentId, headers) {
  try {
    const data = await axiosInstance(`/admin/departments/?hod_departments=true&active=true&search=${searchText || ''}&parent=${parentId || ''}`, { headers });
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

export async function getHODDepartmentsById(id, headers) {
  try {
    const data = await axiosInstance(`/admin/departments/${id}/`, { headers });
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
    const data = await axiosInstance(`/admin/procurement/order/status/`, { headers });
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
