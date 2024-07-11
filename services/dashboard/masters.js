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

export async function postServices(accessToken, apiPath, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(apiPath, formData, { headers });
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

export async function createCategoryService(
  formData,
  headers,
) {
  try {
    const data = await axiosInstance.post('/admin/categories/', formData, { headers });
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
export async function editCategoryService(
  id,
  formData,
  headers,
) {
  try {
    const data = await axiosInstance.patch(`/admin/categories/${id}/`, formData, { headers });
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

export async function createAttributeService(formData, headers, categeoryID) {
  try {
    const data = await axiosInstance.post(`/admin/categories/${categeoryID}/attributes/`, formData, { headers: { ...headers, 'content-type': 'multipart/form-data' } });
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

export async function editAttributeService(formData, headers, categeoryID, attributeID) {
  try {
    const data = await axiosInstance.put(`/admin/categories/${categeoryID}/attributes/${attributeID}/`, formData, { headers: { ...headers, 'content-type': 'multipart/form-data' } });
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
export async function deleteAttributeService(accessToken, categeoryID, attributeID) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/categories/${categeoryID}/attributes/${attributeID}/`, { headers });
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

export async function deleteCategoryService(accessToken, categoryID) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/categories/${categoryID}/`, { headers });
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

export async function addAttributeOptionsService(formData, accessToken, attributeID) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/admin/attributes/${attributeID}/options/`, formData, { headers });
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

export async function editAttributeOptionsService(formData, accessToken, attributeID, optionID) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.put(`/admin/attributes/${attributeID}/options/${optionID}/`, formData, { headers });
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

export async function deleteAttributeOptionsService(accessToken, attributeID, optionID) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/attributes/${attributeID}/options/${optionID}/`, { headers });
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

// add && edit && delete product

export async function addProductService(accessToken, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post('/admin/products/', formData, { headers });
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

export async function editProductService(accessToken, productID, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/products/${productID}/`, formData, { headers });
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

export async function deleteProductService(accessToken, productID) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/products/${productID}/`, { headers });
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

export async function addProductImageService(accessToken, productID, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/admin/products/${productID}/images/`, formData, { headers });
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

export async function editProductImageService(accessToken, productID, imageID, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/products/${productID}/images/${imageID}/`, formData, { headers });
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

export async function deleteProductImageService(accessToken, productID, imageID) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/products/${productID}/images/${imageID}/`, { headers });
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

export async function addProductAttributeService(accessToken, productID, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/admin/products/${productID}/attributes/`, formData, { headers });
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

export async function editProductAttributeService(accessToken, productID, attributeId, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/products/${productID}/attributes/${attributeId}/`, formData, { headers });
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

export async function deleteProductAttributeService(accessToken, productID, attributeId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/products/${productID}/attributes/${attributeId}/`, { headers });
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

export async function addProductVendorServices(accessToken, productID, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/admin/products/${productID}/vendors/`, formData, { headers });
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

export async function editProductVendorServices(accessToken, productID, vendorId, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/products/${productID}/vendors/${vendorId}/`, formData, { headers });
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

export async function deleteProductVendorServices(accessToken, productID, vendorId, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/products/${productID}/vendors/${vendorId}/`, { headers });
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

// Vendors
export async function getVendorsService(accessToken) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.get('/admin/vendors/', { headers });
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

export async function editVendorService(accessToken, vendorID, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/vendors/${vendorID}/`, formData, { headers });
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

export async function deleteVendorService(accessToken, vendorID) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/vendors/${vendorID}/`, { headers });
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

// Departments

export async function addDepartmentService(accessToken, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post('/admin/departments/', formData, { headers });
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

export async function editDepartmentService(accessToken, formData, departmentID) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/departments/${departmentID}/`, formData, { headers });
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

export async function deleteDepartmentService(accessToken, departmentID) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/departments/${departmentID}/`, { headers });
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

// VC Departments

export async function addVcDepartmentService(accessToken, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post('/admin/vc-departments/', formData, { headers });
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

export async function editVcDepartmentService(accessToken, formData, departmentID) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/vc-departments/${departmentID}/`, formData, { headers });
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

export async function deleteVCDepartmentService(accessToken, departmentID) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/vc-departments/${departmentID}/`, { headers });
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

// VC locations
export async function addVcLocationService(accessToken, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post('/admin/vc-locations/', formData, { headers });
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

export async function editVcLocationService(accessToken, formData, locationId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/vc-locations/${locationId}/`, formData, { headers });
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

export async function deleteVClocationService(accessToken, locationId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/vc-locations/${locationId}/`, { headers });
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

// Add Edit Delete  DepartmentUsers

export async function addDepartmentUserService(accessToken, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post('/admin/department/add-member/', formData, { headers });
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

export async function editDepartmentUserService(accessToken, formData, userId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/users/${userId}/`, formData, { headers });
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

export async function deleteDepartmentUserService(accessToken, active, userId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/users/${userId}/`, { headers });
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

// Add Edit Delete VendorUsers

export async function addDepartmentVendorService(accessToken, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post('/admin/vendor/add-member/', formData, { headers });
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

export async function editDepartmentVendorService(accessToken, formData, userId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/vendor/add-member/${userId}/`, formData, { headers });
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

export async function patchUserDetailsService(accessToken, formData, userId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/users/${userId}/edit/`, formData, { headers });
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

export async function deleteDepartmentVendorService(accessToken, userId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/vendor/${userId}/`, { headers });
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

export async function addCategoryDocuments(accessToken,formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post(`/admin/category/required/documents/`, formData, { headers });
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

export async function patchCategoryDocuments(accessToken,formData,documentId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/admin/category/required/documents/${documentId}/`, formData, { headers });
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

export async function deleteCategoryDocument(accessToken,documentId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/admin/category/required/documents/${documentId}/`,{ headers });
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

export async function createDocumentTypeService(accessToken,formData) {
  const headers = getHeaders(accessToken);

  try {
    const data = await axiosInstance.post(`/admin/category/document/types/`, formData, {headers });
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
