import getHeaders from '../../../libs/utils/getHeaders';
import axiosInstance from '../../config';

export async function createConsignee(accessToken, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post('procurement/quotations/83030e8c/consignees/', formData, { headers });
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
export async function createConsigneeAdminService(accessToken, formData) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.post('/procurement/consignee/', formData, { headers });
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
export async function deleteQuotationConsignee(accessToken, quoteUid, consigneeId) {
  const headers = getHeaders(accessToken);
  try {
    const data = await axiosInstance.delete(`/procurement/quotations/${quoteUid}/consignees/${consigneeId}/`, { headers });
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
