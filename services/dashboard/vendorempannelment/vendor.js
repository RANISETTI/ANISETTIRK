import getHeaders from '../../../libs/utils/getHeaders';
import axiosInstance from '../../config';

export default async function getVendorsServices(accessToken, apiPath) {
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

export async function getVendorbyId(accessToken, id) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.get(`/admin/vendors/${id}`, { headers });
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
export async function addPublicVendorService(formData) {
  try {
    const data = await axiosInstance.post('/vendor/register/',formData);
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

export async function addVendorService(accessToken, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post('/admin/vendors/', formData, { headers });
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

export async function editVendorService(accessToken, id, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/vendors/${id}/`, formData, { headers });
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

export async function editProfileVendor(accessToken, id, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/vendors/${id}/edit/`, formData, { headers });
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


export async function approveOrRejectVendorService(accessToken, id, type, formdata) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/admin/vendors/${id}/${type}/`,formdata ,{ headers });
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


export async function addVendorTurnOverService(accessToken, vendorId, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/admin/vendors/${vendorId}/turnovers/`, formData, { headers });
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

export async function editVendorTurnOverService(accessToken, vendorId,turnoverId, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/vendors/${vendorId}/turnovers/${turnoverId}/`, formData, { headers });
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

export async function getVendorTurnOverService(accessToken, vendorId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.get(`/admin/vendors/${vendorId}/turnovers/`, { headers });
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

export async function getVendorTurnOverServiceForVendor(accessToken, vendorId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.get(`/vendors/${vendorId}/turnovers/`, { headers });
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

export async function addVendorTurnOverServiceByVendor(accessToken, vendorId, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/vendors/${vendorId}/turnovers/`, formData, { headers });
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

export async function editVendorTurnOverServiceByVendor(accessToken, vendorId,turnoverId, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.put(`/vendors/${vendorId}/turnovers/${turnoverId}/`, formData, { headers });
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

export async function deleteVendorService(accessToken, id) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/vendors/${id}`, { headers });
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
