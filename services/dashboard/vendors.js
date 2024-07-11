import getHeaders from '../../libs/utils/getHeaders';
import axiosInstance from '../config';

export default async function getVendorOrdersService(accessToken, vendorId, page) {
  const headers = getHeaders(accessToken);
  try {
    const path = page ? `/procurement/vendors/${vendorId}/orders/?page=${page}` : `/procurement/vendors/${vendorId}/orders/`;
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
export async function getVendorOrderDetailService(accessToken, vendorId, orderId) {
  const headers = getHeaders(accessToken);
  try {
    const path = `/procurement/vendors/${vendorId}/orders/${orderId}/`;
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
export async function getVendorOrderHistoryService(accessToken, vendorId, orderId) {
  const headers = getHeaders(accessToken);
  try {
    const path = `/procurement/vendors/${vendorId}/orders/${orderId}/history/`;
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

export async function getVendorProductsService(accessToken, vendorId, page) {
  const headers = getHeaders(accessToken);
  try {
    const path = page ? `/procurement/vendors/${vendorId}/products/page=${page}` : `/procurement/vendors/${vendorId}/products/`;
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

export async function getVendorProductDetailService(accessToken, productId, vendorId) {
  const headers = getHeaders(accessToken);
  try {
    const path = `/procurement/vendors/${vendorId}/products/${productId}/`;
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

