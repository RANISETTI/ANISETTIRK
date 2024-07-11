import getHeaders from '../../../libs/utils/getHeaders';
import axiosInstance from '../../config';

export default async function getServices(accessToken, apiPath) {
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

export async function addVendorEmpanelmentService(accessToken, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post('/admin/vendor/categories/', formData, { headers });
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

export async function addVendorCategoryServiceByVendor(accessToken, vendorID, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/vendors/${vendorID}/categories/`, formData, { headers });
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

export async function editVendorEmpanelmentService(accessToken, id, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/vendor/categories/${id}/`, formData, { headers });
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

export async function getVendorEmpanelmentDetailsService(accessToken, id) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.get(`/admin/vendor/categories/${id}/`, { headers });
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

export async function getVendorEmpanelmentDetailsServiceByVendor(accessToken, id, vendorId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.get(`/vendors/${vendorId}/categories/${id}/`, { headers });
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

export async function deleteVendorEmpanelmentService(accessToken, id) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/vendor/categories/${id}/`, { headers });
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

export async function addDocumentsCategoryService(
  accessToken,
  vendorId,
  categoryId,
  formData,
) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/vendors/${vendorId}/categories/${categoryId}/documents/`, formData, { headers });
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

export async function editDocumentsCategoryService(
  accessToken,
  vendorId,
  categoryId,
  documentId,
  formData,
) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/vendors/${vendorId}/categories/${categoryId}/documents/${documentId}/`, formData, { headers });
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

export async function deleteDocumentsCategoryService(
  accessToken,
  vendorId,
  categoryId,
  documentId,
) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/vendors/${vendorId}/categories/${categoryId}/documents/${documentId}/`, { headers });
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
