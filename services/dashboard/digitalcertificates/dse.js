import getHeaders from '../../../libs/utils/getHeaders';
import axiosInstance from '../../config';

export default async function getDSEServices(accessToken,apiPath) {
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


export async function getDSEbyId(accessToken, id) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.get(`/admin/dsc/${id}/`, { headers });
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

export async function addDesService(formData) {
  try {
    const data = await axiosInstance.post('/dsc/create/', formData);
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

export async function updateStatusService(accessToken, id,status) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/admin/dsc/${id}/update/status/`, status, { headers });
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

export async function approveDSEservice(accessToken, id) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/admin/dsc/${id}/approve/`, { }, { headers });
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

export async function rejectDSEservice(accessToken, id,formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/admin/dsc/${id}/reject/`, formData, { headers });
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

export async function approveVendorCategoryStatusService(accessToken, vendorId, categoryId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/admin/vendors/${vendorId}/categories/${categoryId}/approve/`, { }, { headers });
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

export async function rejectVendorCategoryStatusService(accessToken,vendorId, categoryId,formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/admin/vendors/${vendorId}/categories/${categoryId}/reject/`, formData, { headers });
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

export async function requestForRefund(accessToken,vendorId,categoryId,formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/vendors/${vendorId}/categories/${categoryId}/refunds/`, formData, { headers });
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

export async function deleteDSEervice(accessToken, id) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/dsc/${id}/`, { headers });
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
