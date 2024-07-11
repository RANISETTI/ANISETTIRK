import axios from 'axios';
import getHeaders from '../../libs/utils/getHeaders';
import axiosInstance from '../config';
import Api from '../../config/Api';

export default async function getCartProductsService(accessToken) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance('/procurement/cart/', { headers });
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

export async function editCartProductsService(accessToken, quantity, id) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.patch(`/procurement/cart/${id}/`, { quantity }, { headers });
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
export async function deleteCartProductsService(accessToken, id) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/procurement/cart/${id}/`, { headers });
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

export async function handleCheckout(accessToken, callback) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axios.post(Api.cartCheckout, {}, { headers });
    callback(data.data);
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

export async function addDepartmentAddress(headers, slug, formData) {
  try {
    const data = await axios.post(Api.getOrAddAddress(slug), formData, { headers });
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
